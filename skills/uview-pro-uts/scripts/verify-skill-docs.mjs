#!/usr/bin/env node
/**
 * verify-skill-docs.mjs —— uview-pro-x 技能文档结构门禁（零依赖 Node >= 18）
 * ------------------------------------------------------------------
 * 组件 API 由 gen-api-cards.mjs 生成；spec / recipes 是手写内容，本脚本只做
 * 「确定性检查」，不判断内容对错：
 *   ① 链接可解析：所有 md 相对链接指向的文件必须存在
 *   ② 登记双向一致：spec / recipes 文件必须在 SKILL.md + references/README.md 登记，
 *      配方还要在 recipes/README.md 登记
 *   ③ 代码围栏语言白名单：只允许 vue / ts / json / bash / scss / css / 无语言
 *   ④ 名单一致性（warn）：spec/04 组件速查表覆盖 model.json 全部组件；
 *      hooks 表覆盖 libs/hooks 导出；$u 表覆盖 UVIEWPROXUTIL 字段；
 *      文档里的「N 个组件 / N 个 hooks」计数与源码一致
 *
 * 用法：
 *   node scripts/verify-skill-docs.mjs [--lib <组件库目录>] [--strict] [--json]
 *
 *   --lib <dir>  组件库目录（默认 <cwd>/uni_modules/uview-pro-x）；不存在时跳过 ④
 *   --strict     warn 也视为失败（退出码 1）
 *   --json       输出 JSON 报告
 *
 * 退出码：0 = 无 error；1 = 有 error（或 --strict 下有 warn）；2 = 参数错误
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const SKILL_ROOT = path.resolve(SCRIPT_DIR, '..');
const SPEC_DIR = path.join(SKILL_ROOT, 'references', 'spec');
const RECIPE_DIR = path.join(SKILL_ROOT, 'references', 'recipes');
const API_DIR = path.join(SKILL_ROOT, 'references', 'api');

const ALLOWED_FENCE = new Set(['', 'vue', 'ts', 'json', 'bash', 'sh', 'scss', 'css', 'text']);
const SKIP_DIRS = new Set(['node_modules', '.git', 'unpackage']);

function parseArgs(argv) {
    const opts = { lib: null, strict: false, json: false };
    for (let i = 0; i < argv.length; i++) {
        const a = argv[i];
        if (a === '--lib') opts.lib = argv[++i];
        else if (a === '--strict') opts.strict = true;
        else if (a === '--json') opts.json = true;
        else {
            console.error(`未知参数：${a}`);
            console.error('用法：node scripts/verify-skill-docs.mjs [--lib <dir>] [--strict] [--json]');
            process.exit(2);
        }
    }
    return opts;
}

function walk(dir, out) {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
        const p = path.join(dir, e.name);
        if (e.isDirectory()) {
            if (!SKIP_DIRS.has(e.name) && !e.name.startsWith('.')) walk(p, out);
        } else if (e.isFile() && e.name.endsWith('.md')) {
            out.push(p);
        }
    }
    return out;
}

/** 解析代码围栏：返回 blocks（起始行号、语言、内容行范围），闭合判定要求同字符且长度不短于开始 */
function parseFences(lines) {
    const blocks = [];
    let open = null;
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (open == null) {
            const m = line.match(/^ {0,3}(`{3,}|~{3,})(.*)$/);
            if (m != null) {
                const info = m[2].trim();
                open = { char: m[1][0], len: m[1].length, lang: info == '' ? '' : info.split(/\s+/)[0], start: i };
            }
        } else {
            const m = line.match(/^ {0,3}(`{3,}|~{3,})\s*$/);
            if (m != null && m[1][0] == open.char && m[1].length >= open.len) {
                blocks.push({ lang: open.lang, start: open.start, end: i });
                open = null;
            }
        }
    }
    if (open != null) blocks.push({ lang: open.lang, start: open.start, end: lines.length - 1, unclosed: true });
    return blocks;
}

/** 相对链接提取（跳过围栏内与外部链接） */
function extractLinks(lines, fences) {
    const inFence = new Set();
    for (const b of fences) {
        for (let i = b.start; i <= b.end; i++) inFence.add(i);
    }
    const links = [];
    for (let i = 0; i < lines.length; i++) {
        if (inFence.has(i)) continue;
        const re = /\[[^\]]*\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g;
        let m;
        while ((m = re.exec(lines[i])) != null) {
            links.push({ raw: m[1], line: i + 1 });
        }
    }
    return links;
}

function isExternal(target) {
    return /^(https?:|mailto:|tel:|data:|#)/i.test(target);
}

function resolveTarget(fromFile, raw) {
    let t = raw.replace(/^<|>$/g, '');
    t = t.split('#')[0].split('?')[0];
    if (t === '') return null;
    try {
        return path.resolve(path.dirname(fromFile), decodeURI(t));
    } catch {
        return path.resolve(path.dirname(fromFile), t);
    }
}

function readText(file) {
    return fs.readFileSync(file, 'utf8');
}

/* ============================ 检查 ① 链接 ============================ */

function checkLinks(files, errors) {
    for (const file of files) {
        const lines = readText(file).split(/\r?\n/);
        const fences = parseFences(lines);
        for (const link of extractLinks(lines, fences)) {
            if (isExternal(link.raw)) continue;
            const target = resolveTarget(file, link.raw);
            if (target == null) continue;
            if (!fs.existsSync(target)) {
                errors.push({ file, line: link.line, message: `链接指向不存在的文件：${link.raw}` });
            }
        }
    }
}

/* ======================= 检查 ② 登记双向一致 ======================= */

/**
 * 索引里登记文档有两种写法：markdown 链接 `[..](path)` 与表格里的行内代码 `` `path` ``。
 * 两者都要认，否则纯表格索引会被整体误判成「未登记」。
 * 只收录真实存在的文件，存在性由检查 ① 负责。
 */
function collectLinkTargets(indexFile) {
    const lines = readText(indexFile).split(/\r?\n/);
    const fences = parseFences(lines);
    const inFence = new Set();
    for (const b of fences) {
        for (let i = b.start; i <= b.end; i++) inFence.add(i);
    }
    const set = new Set();
    const add = (raw) => {
        if (isExternal(raw)) return;
        const target = resolveTarget(indexFile, raw.replace(/:\d+$/, ''));
        if (target != null && fs.existsSync(target)) set.add(path.normalize(target));
    };
    for (const link of extractLinks(lines, fences)) add(link.raw);
    for (let i = 0; i < lines.length; i++) {
        if (inFence.has(i)) continue;
        for (const m of lines[i].matchAll(/`([^`\n]+)`/g)) {
            const token = m[1].trim();
            if (!/\.md$/i.test(token)) continue;
            add(token);
        }
    }
    return set;
}

function checkRegistration(errors) {
    const skillIndex = path.join(SKILL_ROOT, 'SKILL.md');
    const refIndex = path.join(SKILL_ROOT, 'references', 'README.md');
    const recipeIndex = path.join(RECIPE_DIR, 'README.md');

    const indexes = [skillIndex, refIndex, recipeIndex].filter((f) => fs.existsSync(f));
    const targets = new Map(indexes.map((f) => [f, collectLinkTargets(f)]));

    const docs = [
        ...fs.readdirSync(SPEC_DIR).filter((n) => n.endsWith('.md')).map((n) => path.join(SPEC_DIR, n)),
        ...fs.readdirSync(RECIPE_DIR).filter((n) => n.endsWith('.md') && n != 'README.md').map((n) => path.join(RECIPE_DIR, n))
    ];

    for (const doc of docs) {
        const norm = path.normalize(doc);
        const required = [skillIndex, refIndex];
        if (path.dirname(doc) == RECIPE_DIR) required.push(recipeIndex);
        for (const index of required) {
            if (!indexes.includes(index)) continue;
            if (!targets.get(index).has(norm)) {
                errors.push({
                    file: index,
                    line: 0,
                    message: `未登记文档：${path.relative(SKILL_ROOT, doc).split(path.sep).join('/')}`
                });
            }
        }
    }

    // 反向：索引里列了 spec / recipes 文件却不存在（链接检查已覆盖存在性，这里补“目录外引用”的误登记）
    for (const index of indexes) {
        for (const target of targets.get(index)) {
            const rel = path.relative(SKILL_ROOT, target);
            if (rel.startsWith('..')) continue;
            const isDocDir = target.startsWith(SPEC_DIR) || (target.startsWith(RECIPE_DIR) && path.basename(target) != 'README.md');
            if (isDocDir && !fs.existsSync(target)) {
                errors.push({ file: index, line: 0, message: `索引登记了不存在的文件：${rel.split(path.sep).join('/')}` });
            }
        }
    }
}

/* ======================= 检查 ③ 代码围栏语言 ======================= */

function checkFences(files, errors, warns) {
    for (const file of files) {
        const lines = readText(file).split(/\r?\n/);
        for (const b of parseFences(lines)) {
            if (b.unclosed == true) {
                errors.push({ file, line: b.start + 1, message: '代码围栏未闭合' });
                continue;
            }
            if (!ALLOWED_FENCE.has(b.lang.toLowerCase())) {
                warns.push({ file, line: b.start + 1, message: `代码围栏语言不在白名单：${b.lang}（允许 vue / ts / json / bash / scss / css / 无语言）` });
            }
        }
    }
}

/* ======================= 检查 ④ 名单一致性 ======================= */

function findSpecFile(prefix) {
    if (!fs.existsSync(SPEC_DIR)) return null;
    const hit = fs.readdirSync(SPEC_DIR).find((n) => n.startsWith(prefix) && n.endsWith('.md'));
    return hit == null ? null : path.join(SPEC_DIR, hit);
}

function sectionText(lines, heading) {
    const start = lines.findIndex((l) => l.trim() == heading);
    if (start < 0) return '';
    let end = lines.length;
    for (let i = start + 1; i < lines.length; i++) {
        if (/^##\s+/.test(lines[i])) { end = i; break; }
    }
    return lines.slice(start + 1, end).join('\n');
}

function checkRoster(libDir, warns) {
    const spec04 = findSpecFile('04-');
    if (spec04 == null) return;
    const specLines = readText(spec04).split(/\r?\n/);
    const specText = specLines.join('\n');

    // 组件：model.json 全量 → spec/04 组件速查表
    const modelPath = path.join(API_DIR, 'model.json');
    if (fs.existsSync(modelPath)) {
        const model = JSON.parse(readText(modelPath));
        const components = Object.keys(model.components ?? {});
        const table = sectionText(specLines, '## 组件速查表');
        const mentioned = new Set(Array.from(table.matchAll(/ux-[a-z0-9-]+/g), (m) => m[0]));
        const missing = components.filter((c) => !mentioned.has(c));
        if (missing.length > 0) {
            warns.push({ file: spec04, line: 0, message: `组件速查表未覆盖 ${missing.length} 个组件：${missing.slice(0, 8).join('、')}${missing.length > 8 ? ' 等' : ''}` });
        }
        // 计数：SKILL.md / references/README.md 里的「N 个组件」
        for (const f of [path.join(SKILL_ROOT, 'SKILL.md'), path.join(SKILL_ROOT, 'references', 'README.md')]) {
            const lines = readText(f).split(/\r?\n/);
            for (let i = 0; i < lines.length; i++) {
                const m = lines[i].match(/(\d+)\s*个(?:公开)?组件(?!内置)/);
                if (m != null && Number(m[1]) != components.length) {
                    warns.push({ file: f, line: i + 1, message: `组件计数 ${m[1]} 与 model.json（${components.length}）不一致` });
                }
            }
        }
    }

    // hooks：libs/hooks/index.uts 导出 → spec/04 全文提及
    const hooksIndex = path.join(libDir, 'libs', 'hooks', 'index.uts');
    if (fs.existsSync(hooksIndex)) {
        const exports = Array.from(readText(hooksIndex).matchAll(/export\s+\*\s+from\s+'\.\/(use[A-Za-z0-9_]+)'/g), (m) => m[1]);
        const mentioned = new Set(Array.from(specText.matchAll(/\b(use[A-Z][A-Za-z0-9_]*)\b/g), (m) => m[1]));
        const missing = exports.filter((h) => !mentioned.has(h));
        if (missing.length > 0) {
            warns.push({ file: spec04, line: 0, message: `hooks 速查未覆盖 ${missing.length} 个导出：${missing.join('、')}` });
        }
        for (let i = 0; i < specLines.length; i++) {
            const m = specLines[i].match(/(\d+)\s*个\s*hooks?/);
            if (m != null && Number(m[1]) != exports.length) {
                warns.push({ file: spec04, line: i + 1, message: `hooks 计数 ${m[1]} 与 libs/hooks 导出（${exports.length}）不一致` });
            }
        }
    }

    // $u：libs/index.uts 的 UViewProXUtil 字段 → spec/04 全文 $u.xxx
    const libIndex = path.join(libDir, 'libs', 'index.uts');
    if (fs.existsSync(libIndex)) {
        const src = readText(libIndex);
        const start = src.indexOf('export type UViewProXUtil');
        if (start >= 0) {
            const body = src.slice(start).split(/\r?\n/);
            const fields = [];
            let end = body.findIndex((l) => /^\}\s*;?\s*$/.test(l));
            if (end < 0) end = body.length;
            for (const line of body.slice(0, end)) {
                const m = line.match(/^\s{1,}([A-Za-z_$][\w$]*)\s*:/);
                if (m != null) fields.push(m[1]);
            }
            const mentioned = new Set(Array.from(specText.matchAll(/\$u\.([A-Za-z_$][\w$]*)/g), (m) => m[1]));
            const missing = fields.filter((f) => !mentioned.has(f));
            if (missing.length > 0) {
                warns.push({ file: spec04, line: 0, message: `$u 工具表未覆盖 ${missing.length} 个字段：${missing.join('、')}` });
            }
        }
    }
}

/* ================================ main ================================ */

function main() {
    const opts = parseArgs(process.argv.slice(2));
    const files = walk(SKILL_ROOT, []);
    const errors = [];
    const warns = [];

    checkLinks(files, errors);
    checkRegistration(errors);
    checkFences(files, errors, warns);

    const libDir = path.resolve(process.cwd(), opts.lib ?? path.join('uni_modules', 'uview-pro-x'));
    let rosterSkipped = false;
    if (fs.existsSync(path.join(libDir, 'components'))) {
        checkRoster(libDir, warns);
    } else {
        rosterSkipped = true;
    }

    const rel = (f) => path.relative(SKILL_ROOT, f).split(path.sep).join('/');
    const line = (item) => `  ${rel(item.file)}${item.line > 0 ? ':' + item.line : ''}  ${item.message}`;

    if (opts.json) {
        console.log(JSON.stringify({ files: files.length, errors, warns, rosterSkipped }, null, 2));
    } else {
        console.log(`[verify-skill-docs] 扫描 ${files.length} 个 md 文件${rosterSkipped ? '（组件库源码不可读，跳过名单检查）' : ''}`);
        if (errors.length > 0) {
            console.log(`\nerror ${errors.length}：`);
            for (const item of errors) console.log(line(item));
        }
        if (warns.length > 0) {
            console.log(`\nwarn ${warns.length}：`);
            for (const item of warns) console.log(line(item));
        }
        console.log(`\n[verify-skill-docs] error ${errors.length} / warn ${warns.length}`);
    }

    const failed = errors.length > 0 || (opts.strict && warns.length > 0);
    process.exit(failed ? 1 : 0);
}

main();
