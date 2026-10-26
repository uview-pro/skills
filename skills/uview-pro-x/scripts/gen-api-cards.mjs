#!/usr/bin/env node
/**
 * gen-api-cards.mjs — uview-pro-x 组件 API 卡片生成器（零依赖，Node >= 18）
 * ------------------------------------------------------------------
 * 数据源二选一：
 *   --lib <dir>    从组件库源码现场提取（author-time / 库升级后再生成时用），随之写出 model.json
 *   --model <file> 从既有模型渲染（默认读技能内置 references/api/model.json）
 *
 * 产物（默认写入 <技能根>/references/api/）：
 *   model.json          机器可读 API 快照（校验器 verify-ux-usage.mjs 的数据源）
 *   ux-<name>.md        每组件一张人读卡片（属性/取值/事件/v-model/插槽/外部类/方法）
 *   README.md           索引：7 分类列表 + 快照更新流程
 *
 * 用法：
 *   node scripts/gen-api-cards.mjs --lib uni_modules/uview-pro-x                 # 全量生成
 *   node scripts/gen-api-cards.mjs --lib uni_modules/uview-pro-x --only button --stdout
 *   node scripts/gen-api-cards.mjs --model references/api/model.json             # 仅重渲染卡片
 *   node scripts/gen-api-cards.mjs --check                                       # 只比对不落盘（有漂移 exit 1）
 *
 * 日常更新推荐 scripts/update-api.mjs：一条命令封装「重生成 → --check 一致性核对 → 语料回归」。
 * 说明：消费侧（组件库源码加密/不可读）无需运行本脚本——全部产物随技能发货，脚本仅服务库维护者。
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadLibraryModel, readTextSafe, kebabize } from './lib/ux-api-core.mjs';

const SKILL_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DEFAULT_OUT = path.join(SKILL_ROOT, 'references', 'api');
const GEN_BY = 'scripts/gen-api-cards.mjs';

/**
 * 组件→分类映射（7 分类，真源为 references/spec/04-component-usage.md 的组件速查表）。
 * 未收录的新组件落入「未分组」，保证扩展库时生成不会漏组件。
 */
const GROUPS = [
    ['基础', ['ux-icon', 'ux-image', 'ux-button', 'ux-cell-item', 'ux-cell-group', 'ux-badge', 'ux-tag', 'ux-text', 'ux-avatar']],
    ['表单', ['ux-form', 'ux-form-item', 'ux-input', 'ux-textarea', 'ux-select', 'ux-picker', 'ux-rate', 'ux-search', 'ux-number-box', 'ux-checkbox', 'ux-checkbox-group', 'ux-radio', 'ux-radio-group', 'ux-switch', 'ux-slider', 'ux-keyboard', 'ux-number-keyboard', 'ux-car-keyboard']],
    ['数据展示', ['ux-line-progress', 'ux-circle-progress', 'ux-count-to', 'ux-count-down', 'ux-swiper']],
    ['反馈', ['ux-action-sheet', 'ux-toast', 'ux-notice-bar', 'ux-column-notice', 'ux-row-notice', 'ux-collapse', 'ux-collapse-item', 'ux-popup', 'ux-swipe-action', 'ux-modal', 'ux-mask', 'ux-overlay', 'ux-loading', 'ux-loadmore', 'ux-empty', 'ux-no-network', 'ux-alert-tips', 'ux-top-tips']],
    ['布局', ['ux-line', 'ux-card', 'ux-grid', 'ux-grid-item', 'ux-divider', 'ux-row', 'ux-col', 'ux-section', 'ux-gap', 'ux-safe-bottom', 'ux-status-bar']],
    ['导航', ['ux-tabbar', 'ux-back-top', 'ux-navbar', 'ux-tabs', 'ux-subsection', 'ux-steps', 'ux-step', 'ux-link', 'ux-pagination']],
    ['其他', ['ux-transition', 'ux-skeleton', 'ux-config-provider', 'ux-full-screen']],
];

/**
 * 消费侧隐藏清单：源码保留但暂不暴露（不进卡片 / 索引 / model / 校验）。
 * 当前隐藏 ux-sticky、ux-waterfall（暂不提供示例页与对外支持）；恢复 = 移除条目后重跑本脚本。
 */
const HIDDEN = new Set(['ux-sticky', 'ux-waterfall']);

/* ------------------------------- 渲染工具 ------------------------------- */

const IDENT_RE = /^[A-Za-z_$][\w$]*$/;

/** 代码列：反引号包裹（管道符仍须转义以防断表；换行压成空格） */
function code(s) {
    return '`' + String(s).replace(/\|/g, '\\|').replace(/\s+/g, ' ').trim() + '`';
}

/** 散文列：管道符转义、裸 < > 转实体（防被当 HTML 标签吃掉）、换行压平 */
function escText(s) {
    return String(s ?? '')
        .replace(/\|/g, '\\|')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/\s+/g, ' ')
        .trim();
}

/** 枚举取值展示：'' 显示为 ''，其余原样 */
function litLabel(v) {
    const s = String(v);
    return s === '' ? "''" : s;
}

/** 类型列：字面量联合展开为取值清单（具名别名保留别名） */
function typeCell(p) {
    const t = p.typeResolved;
    if (t.kind === 'literalUnion' && Array.isArray(t.values) && t.values.length > 0) {
        const vals = t.values.map((v) => code(litLabel(v))).join('｜');
        return IDENT_RE.test(p.type) ? `${code(p.type)}（${vals}）` : vals;
    }
    return code(p.type);
}

/** 默认值列：必填 → 必填；工厂函数 → -；未声明 → - */
function defaultCell(p) {
    if (p.required) return '必填';
    if (p.default == null || p.defaultKind !== 'literal') return '-';
    return code(p.default);
}

/** 组件短名：ux-button → button */
function shortName(name) {
    return String(name).replace(/^ux-/, '');
}

/** 可写 v-model 通道（emit / defineModel）；仅 prop 通道不算 */
function writableModels(comp) {
    return comp.models.filter((m) => m.channels.includes('emit') || m.channels.includes('defineModel'));
}

/** v-model 写法：modelValue → v-model，其余 → v-model:<name> */
function modelUsage(m) {
    return m.name === 'modelValue' ? 'v-model' : 'v-model:' + m.name;
}

/* ------------------------------- 卡片渲染 ------------------------------- */

function renderCard(comp, model) {
    const L = [];
    L.push(`<!-- 生成物，勿手改：由 ${GEN_BY} 渲染，改动会在下次再生成时丢失 -->`);
    L.push('');
    L.push(`# ${comp.name} API`);
    L.push('');
    L.push(`> 来源：\`${comp.dir}\`（uview-pro-x v${model.libVersion}）`);
    L.push(`> API 指纹：\`${comp.apiHash}\``);
    L.push(`> 再生成（组件库源码可读时）：\`node ${GEN_BY} --lib <uview-pro-x 路径> --only ${shortName(comp.name)}\``);
    L.push('');
    if (comp.description) {
        L.push(escText(comp.description));
        L.push('');
    }

    // ---- 属性 ----
    L.push('## 属性');
    L.push('');
    if (comp.props.length === 0) {
        L.push('无属性。');
    } else {
        L.push('| 属性 | 说明 | 类型 | 默认值 |');
        L.push('| --- | --- | --- | --- |');
        for (const p of comp.props) {
            const nameCell = p.kebab !== p.name ? `${code(p.kebab)} / ${code(p.name)}` : code(p.name);
            L.push(`| ${nameCell} | ${escText(p.desc) || '-'} | ${typeCell(p)} | ${defaultCell(p)} |`);
        }
    }
    L.push('');

    // ---- v-model ----
    L.push('## 双向绑定（v-model）');
    L.push('');
    const writable = writableModels(comp);
    const propOnly = comp.models.filter((m) => !writable.includes(m));
    if (writable.length === 0) {
        L.push('该组件无双向绑定。');
        L.push('');
    } else {
        L.push('| 写法 | 通道 | 说明 |');
        L.push('| --- | --- | --- |');
        for (const m of writable) {
            const via = m.channels.includes('emit')
                ? `prop + emit（${code(m.updateEvent)}）`
                : 'defineModel（组件内可直接改写）';
            L.push(`| ${code(modelUsage(m))} | ${via} | ${code(m.propName)} 属性，默认 ${m.default == null ? '-' : code(m.default)} |`);
        }
        L.push('');
    }
    for (const m of propOnly) {
        L.push(`> ⚠️ ${code(m.name)} 为单向属性（无 ${code('update:' + m.name)} 事件），**不支持** ${code(modelUsage(m))}。`);
        L.push('');
    }

    // ---- 事件 ----
    L.push('## 事件');
    L.push('');
    if (comp.events.length === 0) {
        L.push('无类型化自定义事件（原生事件不受影响，可直接透传监听）。');
        L.push('');
    } else {
        L.push('| 事件 | 回调参数 | 说明 |');
        L.push('| --- | --- | --- |');
        for (const e of comp.events) {
            L.push(`| ${code('@' + e.name)} | ${e.payload ? code(e.payload) : '-'} | ${escText(e.desc) || '-'} |`);
        }
        L.push('');
    }

    // ---- 插槽 ----
    L.push('## 插槽');
    L.push('');
    if (comp.slots.length === 0) {
        L.push('无插槽。');
        L.push('');
    } else {
        L.push('| 插槽名 | 说明 |');
        L.push('| --- | --- |');
        for (const s of comp.slots) {
            L.push(`| ${code(s.name)} | ${escText(s.desc) || '-'} |`);
        }
        L.push('');
    }

    // ---- 外部样式类 ----
    L.push('## 外部样式类');
    L.push('');
    if (comp.externalClasses.length === 0) {
        L.push('无。');
        L.push('');
    } else {
        L.push('| 名称 | 说明 |');
        L.push('| --- | --- |');
        for (const c of comp.externalClasses) {
            L.push(`| ${code(c)} | ${c === 'custom-class' ? '自定义根节点样式类' : '-'} |`);
        }
        L.push('');
    }

    // ---- 命令式方法（有则出） ----
    if (comp.methods.length > 0) {
        L.push('## 命令式方法（通过组件 ref 调用）');
        L.push('');
        L.push('| 方法 | 说明 |');
        L.push('| --- | --- |');
        for (const m of comp.methods) {
            L.push(`| ${code(m.name)} | ${escText(m.desc) || '-'} |`);
        }
        L.push('');
    }

    if (comp.warnings.length > 0) {
        L.push('## 解析提示');
        L.push('');
        for (const w of comp.warnings) L.push(`- ${escText(w)}`);
        L.push('');
    }

    return L.join('\n');
}

/* ------------------------------- 索引渲染 ------------------------------- */

/** 一句话：截到第一个分句（；/。/换行） */
function firstClause(s) {
    const t = String(s || '').trim();
    if (!t) return '';
    const cut = t.split(/[；。\n]/, 1)[0];
    return escText(cut);
}

function renderReadme(model, names) {
    const comps = model.components;
    const byGroup = new Map(GROUPS.map(([g]) => [g, []]));
    const rest = [];
    for (const n of names) {
        const g = GROUPS.find(([, list]) => list.includes(n));
        if (g) byGroup.get(g[0]).push(n);
        else rest.push(n);
    }

    const L = [];
    L.push(`<!-- 生成物，勿手改：由 ${GEN_BY} 渲染，改动会在下次再生成时丢失 -->`);
    L.push('');
    L.push('# 组件 API 卡片索引');
    L.push('');
    L.push(`> uview-pro-x v${model.libVersion} ｜ 全库 API 指纹 \`${model.libHash}\` ｜ ${model.stats.components} 个组件`);
    L.push('>');
    L.push('> 写任何 `<ux-*>` 前先查对应卡片（属性/取值/事件/v-model/插槽一页俱全）；卡上没有的写法不要猜。');
    L.push('> 本索引与 `model.json` 随技能发货，消费侧不依赖项目内组件库源码（源码加密场景同样可用）。');
    L.push('');

    const emitGroup = (title, list) => {
        if (list.length === 0) return;
        L.push(`## ${title}`);
        L.push('');
        L.push('| 组件 | 说明 | v-model | 事件数 |');
        L.push('| --- | --- | --- | --- |');
        for (const n of list) {
            const c = comps[n];
            const mv = writableModels(c).map((m) => code(modelUsage(m))).join('、') || '—';
            L.push(`| [${n}](./${n}.md) | ${firstClause(c.description) || '-'} | ${mv} | ${c.events.length} |`);
        }
        L.push('');
    };
    for (const [g, list] of byGroup) emitGroup(g, list.sort());
    emitGroup('未分组', rest.sort());

    L.push('## 快照更新与版本升级流程');
    L.push('');
    L.push('组件库改动（新增组件 / 变更 props·枚举·事件）后，在项目根目录执行**一条命令**完成全部更新：');
    L.push('');
    L.push('```bash');
    L.push('node <技能目录>/scripts/update-api.mjs');
    L.push('```');
    L.push('');
    L.push('- 默认读取 `<cwd>/uni_modules/uview-pro-x` 与 `<cwd>/pages`（`--lib` / `--verify <dir>` 可指定，`--no-verify` 跳过语料回归）；');
    L.push('- 内部依次执行：重提取 + 重生成（`' + GEN_BY + ' --lib …`）→ 一致性核对（`--check`，应 0 漂移）→ 语料回归（`scripts/verify-ux-usage.mjs`，应 0 error）；');
    L.push('- 结束后输出变更报告：库版本 / 全库指纹 / 组件新增·移除·API 变更清单；');
    L.push('- 校验器 `scripts/verify-ux-usage.mjs` 默认读取本目录 `model.json`；传 `--lib` 且实装库源码可解析时会现场提取比对，快照过旧会在报表顶部提示；');
    L.push('- 消费侧无需本流程——快照与卡片随技能发货，源码加密的项目同样可用。');
    L.push('');
    return L.join('\n');
}

/* ------------------------------- 主流程 ------------------------------- */

function usage() {
    console.error('用法: node scripts/gen-api-cards.mjs [--lib <组件库目录> | --model <model.json>] [--out <目录>] [--only <组件名...>] [--stdout] [--check] [--verbose]');
}

function main() {
    const argv = process.argv.slice(2);
    const opts = { lib: null, model: null, out: null, only: [], stdout: false, check: false, verbose: false };
    for (let i = 0; i < argv.length; i++) {
        const a = argv[i];
        if (a === '--lib') opts.lib = argv[++i];
        else if (a === '--model') opts.model = argv[++i];
        else if (a === '--out') opts.out = argv[++i];
        else if (a === '--only') {
            while (i + 1 < argv.length && !argv[i + 1].startsWith('--')) opts.only.push(argv[++i]);
        } else if (a === '--stdout') opts.stdout = true;
        else if (a === '--check') opts.check = true;
        else if (a === '--verbose') opts.verbose = true;
        else {
            console.error(`未知参数：${a}`);
            usage();
            process.exit(2);
        }
    }

    const outDir = opts.out ? path.resolve(opts.out) : DEFAULT_OUT;
    const fromLib = opts.lib != null;

    // ---- 加载模型 ----
    let model;
    if (fromLib) {
        model = loadLibraryModel(opts.lib);
        if (model.errors.length > 0) {
            for (const e of model.errors) console.error(`[gen-api-cards] 解析错误：${e.component} — ${e.message}`);
            console.error(`[gen-api-cards] 提取存在 ${model.errors.length} 个错误，不允许带伤发货（exit 1）`);
            process.exit(1);
        }
    } else {
        const src = opts.model ? path.resolve(opts.model) : path.join(DEFAULT_OUT, 'model.json');
        const text = readTextSafe(src);
        if (text == null) {
            console.error(`[gen-api-cards] 模型文件不存在：${src}（可传 --lib 从源码提取）`);
            process.exit(2);
        }
        model = JSON.parse(text);
    }

    // ---- 应用隐藏清单（源码保留、消费侧不暴露；统计重算保持自洽） ----
    let hiddenApplied = 0;
    for (const n of HIDDEN) {
        if (model.components[n] != null) {
            delete model.components[n];
            hiddenApplied++;
        }
    }
    if (hiddenApplied > 0) {
        const names = Object.keys(model.components);
        model.stats = {
            components: names.length,
            props: names.reduce((s, k) => s + model.components[k].props.length, 0),
            events: names.reduce((s, k) => s + model.components[k].events.length, 0),
            models: names.reduce((s, k) => s + model.components[k].models.length, 0),
            slots: names.reduce((s, k) => s + model.components[k].slots.length, 0),
            methods: names.reduce((s, k) => s + model.components[k].methods.length, 0),
            warnings: names.reduce((s, k) => s + model.components[k].warnings.length, 0),
            requested: model.stats.requested
        };
    }

    // ---- 确定目标组件 ----
    const allNames = Object.keys(model.components).sort();
    let targets = allNames;
    if (opts.only.length > 0) {
        targets = opts.only.map((n) => {
            const raw = String(n).trim();
            const key = raw.startsWith('ux-') ? raw : 'ux-' + kebabize(raw);
            if (!model.components[key]) {
                console.error(`[gen-api-cards] 组件不存在：${raw}（模型内 ${allNames.length} 个组件）`);
                process.exit(2);
            }
            return key;
        });
    }

    if (opts.verbose) {
        const s = model.stats;
        console.log(`[gen-api-cards] 模型：${s.components}/${s.requested} 组件，props ${s.props}｜events ${s.events}｜models ${s.models}｜slots ${s.slots}｜methods ${s.methods}｜warnings ${s.warnings}`);
        if (model.unresolvedRefs && model.unresolvedRefs.length > 0) {
            console.log(`[gen-api-cards] 未解析类型引用（保守按 opaque 处理）：${model.unresolvedRefs.join(', ')}`);
        }
        for (const n of targets) {
            for (const w of model.components[n].warnings) console.log(`[gen-api-cards] 提示：${n} — ${w}`);
        }
    }

    // ---- 渲染 ----
    const readmeText = renderReadme(model, allNames);
    const cardTexts = new Map();
    for (const n of targets) cardTexts.set(n, renderCard(model.components[n], model));
    const modelText = fromLib ? JSON.stringify(model, null, 2) + '\n' : null;

    // ---- 输出 ----
    if (opts.stdout) {
        if (opts.only.length === 0) {
            console.log(`────── references/api/README.md ──────\n`);
            console.log(readmeText);
            console.log();
        }
        for (const [n, text] of cardTexts) {
            console.log(`────── references/api/${n}.md ──────\n`);
            console.log(text);
            console.log();
        }
        return;
    }

    if (opts.check) {
        const drift = [];
        const checkOne = (file, expected) => {
            const actual = readTextSafe(file);
            if (actual == null) drift.push(`${toRel(file)}（缺失）`);
            else if (actual !== expected) drift.push(toRel(file));
        };
        if (modelText != null) checkOne(path.join(outDir, 'model.json'), modelText);
        checkOne(path.join(outDir, 'README.md'), readmeText);
        for (const [n, text] of cardTexts) checkOne(path.join(outDir, n + '.md'), text);
        if (drift.length > 0) {
            for (const d of drift) console.error(`[gen-api-cards] 漂移：${d} 与生成结果不一致`);
            console.error(`[gen-api-cards] 检查 ${cardTexts.size + 1 + (modelText != null ? 1 : 0)} 个文件，${drift.length} 处漂移（exit 1）`);
            process.exit(1);
        }
        console.log(`[gen-api-cards] 检查 ${cardTexts.size + 1 + (modelText != null ? 1 : 0)} 个文件，0 漂移`);
        return;
    }

    fs.mkdirSync(outDir, { recursive: true });
    if (modelText != null) fs.writeFileSync(path.join(outDir, 'model.json'), modelText);
    for (const [n, text] of cardTexts) fs.writeFileSync(path.join(outDir, n + '.md'), text);
    fs.writeFileSync(path.join(outDir, 'README.md'), readmeText);
    const rel = toRel(outDir);
    if (modelText != null) console.log(`[gen-api-cards] 写出：${rel}/model.json（uview-pro-x v${model.libVersion}，${model.stats.components} 组件）`);
    console.log(`[gen-api-cards] 写出：${rel}/ux-*.md × ${cardTexts.size}${targets.length < allNames.length ? `（仅 --only 指定，全库共 ${allNames.length}）` : ''}`);
    console.log(`[gen-api-cards] 写出：${rel}/README.md`);
}

/** 相对技能根展示路径（正斜杠）；技能目录外则原样展示 */
function toRel(p) {
    const rel = path.relative(SKILL_ROOT, p);
    return String(!rel || rel.startsWith('..') ? p : rel).replace(/\\/g, '/');
}

main();
