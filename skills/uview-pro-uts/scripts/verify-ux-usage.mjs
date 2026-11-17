#!/usr/bin/env node
/**
 * verify-ux-usage.mjs —— uview-pro-x 页面组件用法校验（消费侧）
 * ------------------------------------------------------------------
 * 默认零源码依赖：数据源为技能内置快照 references/api/model.json（随技能发货，
 * 组件库源码加密/不可读的项目同样可用）。
 *   --lib <路径> 可读时：改用实装库现场提取的模型校验，并与快照比对
 *     （版本 / 指纹不一致 → 顶部提示「快照过旧」，不阻断）；
 *   --lib 不可读（缺结构 / 加密）时：回退内置快照并提示。
 *
 * 用法：
 *   node scripts/verify-ux-usage.mjs [paths...] [--json] [--lib <dir>]
 *        [--lax-events] [--strict-events] [--ignore-attr <name>]... [--baseline <file>]
 *   paths 缺省 <cwd>/pages；目录递归扫 *.uvue（跳过 uni_modules / node_modules / unpackage / .git 与隐藏目录）
 *
 * 退出码：0 = 0 error（warn 不失败）；1 = 有 error 或环境错误
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { readTextSafe, toPosix, camelize, findNearest, loadLibraryModel } from './lib/ux-api-core.mjs';

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const SKILL_ROOT = path.resolve(SCRIPT_DIR, '..');
const SNAPSHOT_PATH = path.join(SKILL_ROOT, 'references', 'api', 'model.json');

const SKIP_DIRS = new Set(['uni_modules', 'node_modules', 'unpackage', '.git']);

/** 通用属性白名单（全组件放行；已按 camel 归一的小写比较键） */
const ATTR_WHITELIST = new Set([
    'class', 'style', 'id', 'key', 'ref', 'is', 'slot',
    'role', 'tabindex', 'hidden', 'title',
    'customStyle', 'customClass',
]);
/** 通用指令白名单（原样比较，不做 camel 归一） */
const DIRECTIVE_WHITELIST = new Set([
    'v-if', 'v-else', 'v-else-if', 'v-for', 'v-show', 'v-text', 'v-html', 'v-once', 'v-pre', 'v-memo',
]);
/** 透传事件集合（未声明但原生可冒泡/框架透传，按 camel 小写比较键） */
const EVENT_PASSTHROUGH = new Set([
    'click', 'tap', 'longpress', 'longtap', 'touchstart', 'touchmove', 'touchend', 'touchcancel',
    'transitionend', 'animationstart', 'animationend', 'animationiteration',
]);

/* ================================ CLI ================================ */

function usage() {
    console.error('用法：node scripts/verify-ux-usage.mjs [paths...] [--json] [--lib <dir>]' +
        ' [--lax-events] [--strict-events] [--ignore-attr <name>]... [--baseline <file>]');
}

function parseArgs(argv) {
    const opts = {
        paths: [], lib: null, json: false, laxEvents: false, strictEvents: false,
        ignoreAttrs: new Set(), baseline: null,
    };
    for (let i = 0; i < argv.length; i++) {
        const a = argv[i];
        if (a === '--lib') opts.lib = argv[++i];
        else if (a === '--json') opts.json = true;
        else if (a === '--lax-events') opts.laxEvents = true;
        else if (a === '--strict-events') opts.strictEvents = true;
        else if (a === '--ignore-attr') opts.ignoreAttrs.add(camelize(argv[++i] ?? ''));
        else if (a === '--baseline') opts.baseline = argv[++i];
        else if (a.startsWith('--')) {
            console.error(`未知参数：${a}`);
            usage();
            process.exit(2);
        } else opts.paths.push(a);
    }
    if (opts.laxEvents && opts.strictEvents) {
        console.error('--lax-events 与 --strict-events 互斥');
        process.exit(2);
    }
    return opts;
}

/* ================================ 模型加载 ================================ */

function loadSnapshot() {
    const text = readTextSafe(SNAPSHOT_PATH);
    if (text == null) return null;
    try {
        return JSON.parse(text);
    } catch {
        return null;
    }
}

/** 尝试从 --lib 现场提取；结构不符 / 读不出（可能加密）返回 null */
function tryLoadLib(libRoot) {
    try {
        if (!libRoot || !fs.existsSync(path.join(libRoot, 'components'))) return null;
        const model = loadLibraryModel(libRoot);
        if (!model || !model.components || model.errors?.length > 0) return null;
        return model;
    } catch {
        return null;
    }
}

/* ================================ 文件收集 ================================ */

function collectUvue(inputs, cwd) {
    const files = [];
    const envErrors = [];
    const walk = (abs) => {
        let entries;
        try {
            entries = fs.readdirSync(abs, { withFileTypes: true });
        } catch {
            envErrors.push(`无法读取路径：${abs}`);
            return;
        }
        for (const e of entries.sort((x, y) => x.name.localeCompare(y.name))) {
            const p = path.join(abs, e.name);
            if (e.isDirectory()) {
                if (SKIP_DIRS.has(e.name) || e.name.startsWith('.')) continue;
                walk(p);
            } else if (e.isFile() && /\.uvue$/i.test(e.name)) {
                files.push(p);
            }
        }
    };
    for (const input of inputs) {
        const abs = path.resolve(cwd, input);
        if (!fs.existsSync(abs)) {
            envErrors.push(`路径不存在：${abs}`);
            continue;
        }
        const st = fs.statSync(abs);
        if (st.isDirectory()) walk(abs);
        else if (/\.uvue$/i.test(abs)) files.push(abs);
    }
    const uniq = [...new Set(files)];
    uniq.sort((a, b) => toPosix(a).localeCompare(toPosix(b)));
    return { files: uniq, envErrors };
}

/* ================================ 扫描器 ================================ */

/**
 * 标签扫描：在 [start, end) 原文区间内找标签，返回
 * { name, attrsText, tagOffset }（attOffset 为属性区在原文的起点）。
 * 注释、引号内尖括号、非标签的裸 `<` 全部跳过。
 */
function scanTags(src, start, end) {
    const tags = [];
    let i = start;
    while (i < end) {
        const lt = src.indexOf('<', i);
        if (lt < 0 || lt >= end) break;
        if (src.startsWith('<!--', lt)) {
            const close = src.indexOf('-->', lt + 4);
            i = close < 0 ? end : close + 3;
            continue;
        }
        const c = src[lt + 1] ?? '';
        if (c === '/') {
            i = skipToTagEnd(src, lt + 2, end) + 1;
            continue;
        }
        if (!/[A-Za-z]/.test(c)) {
            i = lt + 1;
            continue;
        }
        let j = lt + 1;
        while (j < end && /[-\w]/.test(src[j])) j++;
        const name = src.slice(lt + 1, j);
        const gt = skipToTagEnd(src, j, end);
        tags.push({ name, attrsText: src.slice(j, gt < 0 ? end : gt), tagOffset: lt, attrsOffset: j });
        i = gt < 0 ? end : gt + 1;
    }
    return tags;
}

/** 引号感知地找到标签结束的 '>'，返回其下标；找不到返回 -1 */
function skipToTagEnd(src, from, end) {
    let i = from;
    while (i < end) {
        const ch = src[i];
        if (ch === '"' || ch === "'") {
            const q = ch;
            i++;
            while (i < end && src[i] !== q) i++;
            i++;
            continue;
        }
        if (ch === '>') return i;
        i++;
    }
    return -1;
}

/** 属性 tokenizer：返回 [{ raw, value, hasValue, offset }]（offset 为属性名在原文下标） */
function tokenizeAttrs(attrsText, baseOffset) {
    const out = [];
    let i = 0;
    const n = attrsText.length;
    while (i < n) {
        while (i < n && /\s/.test(attrsText[i])) i++;
        if (i >= n) break;
        if (attrsText[i] === '/' && (attrsText[i + 1] === '>' || i + 1 >= n || /\s/.test(attrsText[i + 1] ?? ''))) {
            i++;
            continue;
        }
        const nameStart = i;
        while (i < n && !/[\s=]/.test(attrsText[i])) i++;
        const raw = attrsText.slice(nameStart, i);
        while (i < n && /\s/.test(attrsText[i])) i++;
        let value = null;
        let hasValue = false;
        if (attrsText[i] === '=') {
            i++;
            while (i < n && /\s/.test(attrsText[i])) i++;
            const q = attrsText[i];
            if (q === '"' || q === "'") {
                i++;
                const vStart = i;
                while (i < n && attrsText[i] !== q) i++;
                value = attrsText.slice(vStart, i);
                i++;
            } else {
                const vStart = i;
                while (i < n && !/\s/.test(attrsText[i])) i++;
                value = attrsText.slice(vStart, i);
            }
            hasValue = true;
        }
        if (raw !== '') out.push({ raw, value, hasValue, offset: baseOffset + nameStart });
    }
    return out;
}

/** 原文偏移 → { line, col }（1 基） */
function offsetToLineCol(src, offset) {
    let line = 1;
    let last = -1;
    for (let i = 0; i < offset && i < src.length; i++) {
        if (src[i] === '\n') {
            line++;
            last = i;
        }
    }
    return { line, col: offset - last };
}

/* ================================ 校验 ================================ */

function normalizeEventKey(name) {
    return name.toLowerCase().replace(/-/g, '');
}

function shortList(values, max = 8) {
    const shown = values.slice(0, max).join('｜');
    return values.length > max ? `${shown}｜…（共 ${values.length} 个）` : shown;
}

function validateTag(compModel, tag, attrs, src, relFile, opts, issues) {
    const props = new Map(compModel.props.map((p) => [p.name, p]));
    const propNames = [...props.keys()];
    const eventsNorm = new Map();
    for (const e of compModel.events) eventsNorm.set(normalizeEventKey(e.name), e.name);
    const eventNames = [...eventsNorm.values()];
    const modelsByName = new Map(compModel.models.map((m) => [m.name, m]));
    const slotNames = compModel.slots.map((s) => s.name);
    const extClasses = new Set(compModel.externalClasses.map((x) => camelize(x)));

    const push = (severity, rule, offset, attr, value, message, suggestion) => {
        const { line, col } = offsetToLineCol(src, offset);
        issues.push({ file: relFile, line, col, tag: tag.name, rule, attr, value, message, suggestion: suggestion ?? null, severity });
    };

    for (const a of attrs) {
        const raw = a.raw;
        let kind = 'plain';
        let name = raw;
        if (raw === 'v-bind' || raw.startsWith('v-bind=')) {
            push('warn', 'v-bind-spread', a.offset, 'v-bind', null,
                '存在 v-bind 展开（整对象绑定），该标签属性跳过静态校验');
            continue;
        }
        if (raw.startsWith('v-model')) {
            kind = 'model';
            const rest = raw.slice('v-model'.length);
            if (rest === '' || rest.startsWith('.')) name = 'modelValue';
            else if (rest.startsWith(':')) name = rest.slice(1);
            else name = rest;
            name = name.split('.')[0];
        } else if (raw.startsWith('v-bind:')) {
            kind = 'bound';
            name = raw.slice('v-bind:'.length).split('.')[0];
        } else if (raw.startsWith(':')) {
            kind = 'bound';
            name = raw.slice(1).split('.')[0];
        } else if (raw.startsWith('v-on:')) {
            kind = 'event';
            name = raw.slice('v-on:'.length).split('.')[0];
        } else if (raw.startsWith('@')) {
            kind = 'event';
            name = raw.slice(1).split('.')[0];
        } else if (raw.startsWith('v-slot:')) {
            kind = 'slot';
            name = raw.slice('v-slot:'.length);
        } else if (raw === 'v-slot') {
            continue;
        } else if (raw.startsWith('#')) {
            kind = 'slot';
            name = raw.slice(1);
        } else if (raw.startsWith('v-')) {
            if (DIRECTIVE_WHITELIST.has(raw)) continue;
            continue;
        }

        const camel = camelize(name);
        if (opts.ignoreAttrs.has(camel)) continue;

        if (kind === 'plain') {
            if (raw.startsWith('data-') || raw.startsWith('aria-')) continue;
            if (ATTR_WHITELIST.has(camel)) continue;
            if (extClasses.has(camel)) continue;
            const p = props.get(camel);
            if (p) {
                if (!a.hasValue) {
                    // 联合类型含 boolean（如 boolean | BorderType）时裸属性合法：赋值 true 语义
                    const booleanish = p.typeResolved?.kind === 'boolean' || /\bboolean\b/.test(p.type ?? '');
                    if (booleanish) continue;
                    push('warn', 'bare-attr', a.offset, camel, null,
                        `属性「${camel}」为 ${p.type || '非布尔'} 类型，却以裸属性（无取值）书写；仅布尔属性可省略取值`);
                } else if (p.typeResolved?.kind === 'literalUnion' && Array.isArray(p.typeResolved.values)) {
                    const vals = p.typeResolved.values.map(String);
                    if (!vals.includes(a.value)) {
                        const sug = findNearest(a.value, vals, 2);
                        push('error', 'enum-value', a.offset, camel, a.value,
                            `属性「${camel}」取值「${a.value}」不在枚举内` +
                            (sug ? `；最接近「${sug}」` : '') +
                            `；可选：${shortList(vals)}`,
                            sug);
                    }
                }
                continue;
            }
            const sug = findNearest(camel, propNames, 2);
            if (sug) {
                push('error', 'unknown-prop', a.offset, camel, a.hasValue ? a.value : null,
                    `属性「${name}」不存在；最接近「${sug}」；完整可用属性见 references/api/${tag.name}.md`, sug);
            } else {
                push('warn', 'unknown-prop', a.offset, camel, a.hasValue ? a.value : null,
                    `属性「${name}」不在组件 API 内（远距离未知，可能为透传/宿主扩展）`);
            }
            continue;
        }

        if (kind === 'bound') {
            if (ATTR_WHITELIST.has(camel)) continue;
            if (extClasses.has(camel)) continue;
            if (props.has(camel)) continue;
            const sug = findNearest(camel, propNames, 2);
            if (sug) {
                push('error', 'unknown-prop', a.offset, camel, null,
                    `属性「:${name}」不存在；最接近「${sug}」；完整可用属性见 references/api/${tag.name}.md`, sug);
            }
            continue;
        }

        if (kind === 'event') {
            const key = normalizeEventKey(name);
            if (eventsNorm.has(key) || EVENT_PASSTHROUGH.has(key)) continue;
            const sug = findNearest(key, [...eventsNorm.keys()], 2);
            const nearby = sug != null;
            let severity = nearby ? 'error' : 'warn';
            if (opts.laxEvents) severity = 'warn';
            if (opts.strictEvents) severity = 'error';
            push(severity, 'unknown-event', a.offset, name, null,
                `事件「@${name}」未在该组件声明` +
                (nearby ? `；最接近「@${eventsNorm.get(sug)}」` : '') +
                (!nearby ? '；远距离未知事件（可能为透传），如确认可忽略' : ''),
                nearby ? eventsNorm.get(sug) : null);
            continue;
        }

        if (kind === 'slot') {
            if (name === 'default') continue;
            if (slotNames.includes(name)) continue;
            const sug = findNearest(name, slotNames, 2);
            const severity = sug != null ? 'error' : 'warn';
            push(severity, 'unknown-slot', a.offset, name, null,
                `插槽「#${name}」不存在` +
                (sug ? `；最接近「#${sug}」` : '') +
                (slotNames.length > 0 ? `；可用插槽：${shortList(slotNames)}` : '；该组件无具名插槽'),
                sug);
            continue;
        }

        if (kind === 'model') {
            const m = modelsByName.get(name);
            if (m) {
                const writable = (m.channels ?? []).some((c) => c === 'emit' || c === 'defineModel');
                if (writable) continue;
                push('warn', 'unknown-model', a.offset, name, null,
                    `属性「${name}」不支持 v-model（组件未声明 update:${name} 回写事件，单向 prop）`);
                continue;
            }
            const p = props.get(camel);
            if (p) {
                push('warn', 'unknown-model', a.offset, name, null,
                    `属性「${name}」不支持 v-model（组件未声明 update:${name} 回写事件）`);
                continue;
            }
            const modelNames = [...modelsByName.keys()];
            const sug = findNearest(name, modelNames, 2);
            if (sug != null) {
                push('error', 'unknown-model', a.offset, name, null,
                    `v-model:${name} 无效；最接近「v-model:${sug}」`, sug);
            } else if (modelNames.length === 0) {
                push('error', 'unknown-model', a.offset, name, null,
                    `该组件不支持 v-model（未声明任何双向绑定）`);
            } else {
                push('warn', 'unknown-model', a.offset, name, null,
                    `v-model:${name} 未匹配到双向绑定；组件可用：${shortList(modelNames.map((m) => `v-model:${m}`))}`);
            }
            continue;
        }
    }
}

/* ================================ 主流程 ================================ */

function main() {
    const opts = parseArgs(process.argv.slice(2));
    const cwd = process.cwd();
    const notices = [];
    const envErrors = [];

    const snapshot = loadSnapshot();
    let model = snapshot;
    let usedLibrary = false;
    if (opts.lib) {
        const libModel = tryLoadLib(opts.lib);
        if (libModel) {
            model = libModel;
            usedLibrary = true;
            if (snapshot && (libModel.libVersion !== snapshot.libVersion || libModel.libHash !== snapshot.libHash)) {
                notices.push(`技能快照（v${snapshot.libVersion}，${String(snapshot.libHash).slice(0, 16)}…）` +
                    `与实装库（v${libModel.libVersion}，${String(libModel.libHash).slice(0, 16)}…）不一致：` +
                    `已按实装库校验；建议依 references/api/README.md 流程重生成技能快照`);
            }
        } else {
            if (!snapshot) {
                envErrors.push(`--lib 源码不可读（可能已加密），且技能内置快照缺失：${SNAPSHOT_PATH}`);
            } else {
                notices.push(`--lib 源码不可读（可能已加密或结构不符）：改用技能内置快照（v${snapshot.libVersion}）校验`);
            }
        }
    } else if (!snapshot) {
        envErrors.push(`技能内置快照缺失：${SNAPSHOT_PATH}（可传 --lib 从源码现场提取）`);
    }
    if (!model) {
        for (const e of envErrors) console.error(`[verify-ux-usage] 错误：${e}`);
        process.exit(1);
    }

    const inputs = opts.paths.length > 0 ? opts.paths : [path.join(cwd, 'pages')];
    const { files, envErrors: pathErrors } = collectUvue(inputs, cwd);
    envErrors.push(...pathErrors);

    const baseline = new Set();
    if (opts.baseline) {
        const text = readTextSafe(path.resolve(cwd, opts.baseline));
        if (text == null) {
            envErrors.push(`基线文件不存在：${opts.baseline}`);
        } else {
            try {
                const data = JSON.parse(text);
                const arr = Array.isArray(data) ? data : data.fingerprints ?? [];
                for (const f of arr) baseline.add(String(f));
            } catch {
                envErrors.push(`基线文件不是合法 JSON：${opts.baseline}`);
            }
        }
    }

    let pageCount = 0;
    let uxTagCount = 0;
    const issues = [];
    let suppressed = 0;

    for (const abs of files) {
        pageCount++;
        const src = readTextSafe(abs) || '';
        const tmpl = /<template(?:\s[^>]*)?>/.exec(src);
        if (!tmpl) continue;
        const tmplStart = tmpl.index + tmpl[0].length;
        const endIdx = src.lastIndexOf('</template>');
        const tmplEnd = endIdx > tmplStart ? endIdx : src.length;
        const relFile = toPosix(path.relative(cwd, abs).startsWith('..') ? abs : path.relative(cwd, abs));
        const tags = scanTags(src, tmplStart, tmplEnd);
        for (const tag of tags) {
            if (!tag.name.startsWith('ux-')) continue;
            uxTagCount++;
            const comp = model.components[tag.name];
            if (!comp) {
                const all = Object.keys(model.components);
                const sug = findNearest(tag.name, all, 2);
                const { line, col } = offsetToLineCol(src, tag.tagOffset);
                issues.push({
                    file: relFile, line, col, tag: tag.name, rule: 'unknown-component',
                    attr: null, value: null, suggestion: sug ?? null, severity: 'error',
                    message: `未知组件「${tag.name}」` + (sug ? `；最接近「${sug}」` : '') +
                        `；全量组件见 references/api/README.md`,
                });
                continue;
            }
            const attrs = tokenizeAttrs(tag.attrsText, tag.attrsOffset);
            validateTag(comp, tag, attrs, src, relFile, opts, issues);
        }
    }

    let finalIssues = issues;
    if (baseline.size > 0) {
        finalIssues = [];
        for (const it of issues) {
            const fp = [it.rule, it.tag, it.attr ?? '', it.value ?? '', it.message].join('|');
            it.fingerprint = fp;
            if (baseline.has(fp)) suppressed++;
            else finalIssues.push(it);
        }
    } else {
        for (const it of issues) {
            it.fingerprint = [it.rule, it.tag, it.attr ?? '', it.value ?? '', it.message].join('|');
        }
    }

    const errors = finalIssues.filter((x) => x.severity === 'error').length;
    const warns = finalIssues.filter((x) => x.severity === 'warn').length;
    const filesWithIssues = new Set(finalIssues.map((x) => x.file)).size;

    if (opts.json) {
        const payload = {
            scanned: { pages: pageCount, uxTags: uxTagCount, filesWithIssues },
            counts: { error: errors, warn: warns, suppressed },
            source: usedLibrary ? 'lib' : 'snapshot',
            notices,
            envErrors,
            issues: finalIssues.sort((a, b) => a.file.localeCompare(b.file) || a.line - b.line || a.col - b.col),
        };
        console.log(JSON.stringify(payload, null, 2));
        process.exit(errors > 0 || envErrors.length > 0 ? 1 : 0);
    }

    for (const n of notices) console.error(`[verify-ux-usage] 提示：${n}`);
    for (const e of envErrors) console.error(`[verify-ux-usage] 错误：${e}`);

    const byFile = new Map();
    for (const it of finalIssues) {
        if (!byFile.has(it.file)) byFile.set(it.file, []);
        byFile.get(it.file).push(it);
    }
    for (const f of [...byFile.keys()].sort()) {
        console.log(f);
        const list = byFile.get(f).sort((a, b) => a.line - b.line || a.col - b.col);
        for (const it of list) {
            const mark = it.severity === 'error' ? '✗' : '⚠';
            console.log(`  ${mark} ${it.line}:${it.col} <${it.tag}> ${it.message}`);
        }
    }
    console.log(`[verify-ux-usage] 扫描 ${pageCount} 个页面 / ${uxTagCount} 个 ux 标签，` +
        `${filesWithIssues} 个文件 ${finalIssues.length} 处（error ${errors} / warn ${warns}）` +
        (suppressed > 0 ? `（基线忽略 ${suppressed} 处）` : '') +
        (usedLibrary ? '（实装库）' : '（技能快照）'));
    process.exit(errors > 0 || envErrors.length > 0 ? 1 : 0);
}

main();
