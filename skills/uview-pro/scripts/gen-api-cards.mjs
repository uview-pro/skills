#!/usr/bin/env node
/**
 * gen-api-cards.mjs — uview-pro 组件 API 卡片生成器（零依赖，Node >= 18）
 * ------------------------------------------------------------------
 * 数据源二选一：
 *   --lib <dir>    从 uview-pro 组件库源码现场提取（author-time / 库升级后再生成时用），随之写出 model.json
 *   --model <file> 从既有模型渲染（默认读技能内置 references/api/model.json）
 *
 * 产物（默认写入 <技能根>/references/api/）：
 *   model.json          机器可读 API 快照（校验器 verify-u-usage.mjs 的数据源）
 *   u-<name>.md         每组件一张人读卡片（属性/取值/事件/v-model/插槽/方法/示例）
 *   README.md           索引：7 分类列表 + 快照更新流程
 *
 * 审计（--audit，需与 --lib 同用）：
 *   不改任何产物，只输出「源码 JSDoc 质量审计报告」（stdout 或 --out <文件.md>）：
 *   props/事件描述缺失、JSDoc 幽灵项、emit 调用未声明、组件头缺失等，附 P0/P1/P2 分级
 *   与修正定界三原则，用于圈定修源范围；修正后复跑应收敛，再执行全量生成。
 *
 * 用法：
 *   node scripts/gen-api-cards.mjs --lib uni_modules/uview-pro                        # 全量生成
 *   node scripts/gen-api-cards.mjs --lib uni_modules/uview-pro --audit --out 审计.md   # 只出审计报告
 *   node scripts/gen-api-cards.mjs --lib uni_modules/uview-pro --only button --stdout
 *   node scripts/gen-api-cards.mjs --model references/api/model.json                  # 仅重渲染卡片
 *   node scripts/gen-api-cards.mjs --check                                            # 只比对不落盘（有漂移 exit 1）
 *
 * 日常更新推荐 scripts/update-api.mjs：一条命令封装「重生成 → --check 一致性核对 → 用法语料回归」。
 * 说明：消费侧（使用 uview-pro 写 uni-app 项目的环境）无需运行本脚本——全部产物随技能发货，脚本仅服务技能维护者。
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadLibraryModel, readTextSafe, kebabize } from './lib/u-api-core.mjs';

const SKILL_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DEFAULT_OUT = path.join(SKILL_ROOT, 'references', 'api');
const GEN_BY = 'scripts/gen-api-cards.mjs';

/**
 * 组件→分类映射（7 分类，真源为 references/spec/04 的组件速查表）。
 * 覆盖 uview-pro 全部 99 个组件目录；未收录的新组件落入「未分组」，保证库升级时生成不会漏组件。
 */
const GROUPS = [
    ['基础', ['u-icon', 'u-image', 'u-button', 'u-text', 'u-cell-item', 'u-cell-group', 'u-avatar', 'u-badge', 'u-tag']],
    ['表单', ['u-form', 'u-form-item', 'u-field', 'u-input', 'u-textarea', 'u-search', 'u-select', 'u-picker', 'u-city-select', 'u-calendar', 'u-rate', 'u-slider', 'u-switch', 'u-checkbox', 'u-checkbox-group', 'u-radio', 'u-radio-group', 'u-number-box', 'u-keyboard', 'u-number-keyboard', 'u-car-keyboard', 'u-message-input', 'u-verification-code', 'u-upload']],
    ['数据展示', ['u-line-progress', 'u-circle-progress', 'u-count-to', 'u-count-down', 'u-swiper', 'u-waterfall', 'u-table', 'u-td', 'u-tr', 'u-th', 'u-time-line', 'u-time-line-item', 'u-lazy-load', 'u-index-list', 'u-index-anchor']],
    ['反馈', ['u-action-sheet', 'u-action-sheet-item', 'u-toast', 'u-notice-bar', 'u-column-notice', 'u-row-notice', 'u-collapse', 'u-collapse-item', 'u-popup', 'u-swipe-action', 'u-modal', 'u-mask', 'u-loading', 'u-loading-popup', 'u-loadmore', 'u-empty', 'u-no-network', 'u-alert-tips', 'u-top-tips', 'u-skeleton', 'u-read-more']],
    ['布局', ['u-row', 'u-col', 'u-grid', 'u-grid-item', 'u-card', 'u-divider', 'u-line', 'u-section', 'u-gap', 'u-safe-bottom', 'u-status-bar', 'u-sticky']],
    ['导航', ['u-navbar', 'u-tabbar', 'u-tabs', 'u-tabs-swiper', 'u-subsection', 'u-steps', 'u-step', 'u-back-top', 'u-link', 'u-pagination', 'u-dropdown', 'u-dropdown-item', 'u-fab']],
    ['其他', ['u-config-provider', 'u-root-portal', 'u-transition', 'u-avatar-cropper', 'u-full-screen']],
];

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

/** 组件短名：u-button → button */
function shortName(name) {
    return String(name).replace(/^u-/, '');
}

/** 可写 v-model 通道（uview-pro 为 prop + update:xxx emit 两段式）；仅 prop 通道不算 */
function writableModels(comp) {
    return comp.models.filter((m) => m.channels.includes('emit'));
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
    L.push(`> 来源：\`${comp.dir}\`（uview-pro v${model.libVersion}）`);
    L.push(`> API 指纹：\`${comp.apiHash}\``);
    if (comp.docUrl) L.push(`> 官方文档：${comp.docUrl}`);
    L.push(`> 再生成（组件库源码可读时）：\`node ${GEN_BY} --lib <uview-pro 路径> --only ${shortName(comp.name)}\``);
    L.push('');
    if (comp.description) {
        L.push(escText(comp.description));
        L.push('');
    }
    if (comp.example) {
        L.push('## 用法示例');
        L.push('');
        L.push('```vue');
        L.push(comp.example.replace(/^\n+|\n+$/g, ''));
        L.push('```');
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
            const via = m.channels.includes('prop')
                ? `prop + emit（${code('update:' + m.name)}）`
                : `emit（${code('update:' + m.name)}，无同名 prop）`;
            L.push(`| ${code(modelUsage(m))} | ${via} | ${code(m.propName)} 属性，默认 ${m.default == null ? '-' : code(m.default)} |`);
        }
        L.push('');
    }
    for (const m of propOnly) {
        L.push(`> ⚠️ ${code(m.name)} 为单向属性（无 ${code('update:' + m.name)} 事件），**不支持** ${code(modelUsage(m))}；可见性由父组件 ${code(':' + m.name)} 绑定控制。`);
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
    L.push(`> uview-pro v${model.libVersion} ｜ 全库 API 指纹 \`${model.libHash}\` ｜ ${model.stats.components} 个组件`);
    L.push('>');
    L.push('> 写任何 `<u-*>` 前先查对应卡片（属性/取值/事件/v-model/插槽一页俱全）；卡上没有的写法不要猜。');
    L.push('> 本索引与 `model.json` 随技能发货，消费侧不必依赖项目内组件库源码。');
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
    L.push('- 默认读取 `<cwd>/uni_modules/uview-pro`（`--lib` 可指定，`--no-verify` 跳过用法语料回归）；');
    L.push('- 内部依次执行：重提取 + 重生成（`' + GEN_BY + ' --lib …`）→ 一致性核对（`--check`，应 0 漂移）→ 用法语料回归（`scripts/verify-u-usage.mjs`，应 0 error）；');
    L.push('- 结束后输出变更报告：库版本 / 全库指纹 / 组件新增·移除·API 变更清单；');
    L.push('- 若卡片出现内容退化（描述变 `-`、事件缺失），先跑 `' + GEN_BY + ' --lib … --audit --out 审计.md` 定位源码 JSDoc 问题，修源后再重生成；');
    L.push('- 校验器 `scripts/verify-u-usage.mjs` 默认读取本目录 `model.json`；传 `--lib` 且组件库源码可读时会现场提取比对，快照过旧会在报表顶部提示；');
    L.push('- 消费侧无需本流程——快照与卡片随技能发货。');
    L.push('');
    return L.join('\n');
}

/* ------------------------------- 审计渲染 ------------------------------- */

/** 建议的官方文档 URL（kebab → camelCase 路径；需与官方文档核对） */
function suggestTutorialUrl(name) {
    const short = shortName(name);
    const camel = short.replace(/-(\w)/g, (_, c) => c.toUpperCase());
    return `https://uviewpro.cn/zh/components/${camel}.html`;
}

/** 明细区：标题 + 每组件一行清单（组件按命中数降序） */
function detailSection(L, title, rows, emptyText, note) {
    L.push(`## ${title}`);
    L.push('');
    if (rows.length === 0) {
        L.push(emptyText);
        L.push('');
        if (note) {
            L.push(note.replace(/^\n+/, ''));
            L.push('');
        }
        return;
    }
    if (note) {
        L.push(note);
        L.push('');
    }
    for (const r of rows) {
        L.push(`### ${r.name}（${r.list.length} 条）`);
        L.push('');
        L.push('- ' + r.list.map((x) => '`' + x + '`').join('、'));
        L.push('');
    }
}

/** 参考区：标题 + 组件/条数两列表 */
function countTableSection(L, title, rows, emptyText, note) {
    L.push(`## ${title}`);
    L.push('');
    if (rows.length === 0) {
        L.push(emptyText);
        L.push('');
        if (note) {
            L.push(note.replace(/^\n+/, ''));
            L.push('');
        }
        return;
    }
    if (note) {
        L.push(note);
        L.push('');
    }
    L.push('| 组件 | 条数 |');
    L.push('| --- | --- |');
    for (const r of rows) L.push(`| ${r.name} | ${r.list.length} |`);
    L.push('');
}

function renderAudit(model, names) {
    const comps = model.components;
    const A = (n) => comps[n].audit;

    /** 收集 { name, list } 行（仅非空，按条数降序、组件名次之） */
    const rowsOf = (listFn) =>
        names
            .map((n) => ({ name: n, list: listFn(A(n)) }))
            .filter((r) => r.list.length > 0)
            .sort((a, b) => b.list.length - a.list.length || (a.name < b.name ? -1 : 1));

    const rows = {
        noTypes: names.filter((n) => !A(n).hasTypesFile).map((n) => ({ name: n, list: ['无 types.ts'] })),
        p0Props: rowsOf((a) => a.propsNoDesc),
        p0Events: rowsOf((a) => a.eventsNoDesc),
        p1GhostProps: rowsOf((a) => a.jsdocPropsNotInTypes),
        p1GhostEvents: rowsOf((a) => a.jsdocEventsNotInEmits),
        p1Undeclared: rowsOf((a) => a.emitsNotDeclared),
        p2NotCalled: rowsOf((a) => a.emitsDeclaredNotCalled),
        p2NoComment: rowsOf((a) => a.propsTypesNoComment),
        p2NotInJsdoc: rowsOf((a) => a.typesPropsNotInJsdoc),
        warnings: names.filter((n) => comps[n].warnings.length > 0).map((n) => ({ name: n, list: comps[n].warnings })),
    };
    const noDesc = names.filter((n) => !A(n).hasDescription);
    const noTutorial = names.filter((n) => !A(n).hasTutorial);
    const noEmitsDecl = names.filter((n) => !A(n).hasDefineEmits);
    const headerMissing = [...new Set([...noDesc, ...noTutorial])].sort();

    const total = (rs) => rs.reduce((s, r) => s + r.list.length, 0);
    const sum = (fn) => names.reduce((s, n) => s + fn(A(n)), 0);
    const cell = (count, count2) => (count2 == null ? `${count} 条` : `${count} 条 / ${count2} 个组件`);

    const L = [];
    L.push(`<!-- 生成物，勿手改：由 ${GEN_BY} --audit 渲染，供修正范围圈定；非发货产物 -->`);
    L.push('');
    L.push('# uview-pro 源码 JSDoc 审计报告');
    L.push('');
    L.push(`> uview-pro v${model.libVersion} ｜ 组件 ${model.stats.components}/${model.stats.requested} ｜ 全库 API 指纹 \`${model.libHash}\``);
    L.push('>');
    L.push('> 本报告只读源码、不动源码：用于圈定修正范围（修正后复跑本报告应收敛）。');
    L.push('');

    // ---- 总账 ----
    L.push('## 总账');
    L.push('');
    L.push('| # | 检查项 | 命中 | 级别 |');
    L.push('| --- | --- | --- | --- |');
    L.push(`| ① | 缺 types.ts（props 无法提取） | ${rows.noTypes.length} 个组件 | 看说明 |`);
    L.push(`| ② | props 无任何描述（卡片显示 \`-\`） | ${cell(total(rows.p0Props), rows.p0Props.length)} | P0 必修 |`);
    L.push(`| ③ | 事件无描述 | ${cell(total(rows.p0Events), rows.p0Events.length)} | P0 必修 |`);
    L.push(`| ④ | JSDoc 幽灵属性（@property 不在 types.ts） | ${cell(total(rows.p1GhostProps), rows.p1GhostProps.length)} | P1 建议修 |`);
    L.push(`| ⑤ | JSDoc 幽灵事件（@event 不在 defineEmits） | ${cell(total(rows.p1GhostEvents), rows.p1GhostEvents.length)} | P1 建议修 |`);
    L.push(`| ⑥ | emit 调用未声明（defineEmits 缺声明） | ${cell(total(rows.p1Undeclared), rows.p1Undeclared.length)} | P1 建议修 |`);
    L.push(`| ⑦ | 组件头缺 @description / @tutorial | ${noDesc.length} / ${noTutorial.length} 个组件 | P1 建议修 |`);
    L.push(`| ⑧ | types.ts 无注释但 JSDoc 有描述（卡片已有描述） | ${cell(total(rows.p2NoComment), rows.p2NoComment.length)} | P2 参考 |`);
    L.push(`| ⑨ | types 有但 JSDoc 未列 @property | ${cell(total(rows.p2NotInJsdoc), rows.p2NotInJsdoc.length)} | P2 参考 |`);
    L.push(`| ⑩ | defineEmits 声明未调用 | ${cell(total(rows.p2NotCalled), rows.p2NotCalled.length)} | P2 参考 |`);
    L.push(`| ⑪ | 无 defineEmits 声明（事件校验保守放行） | ${noEmitsDecl.length} 个组件 | 看说明 |`);
    L.push(`| ⑫ | 解析器告警 | ${cell(total(rows.warnings), rows.warnings.length)} | 看说明 |`);
    L.push(`| ⑬ | 组件提取错误 | ${model.errors.length} 条 | 阻塞 |`);
    L.push('');
    L.push(`库存基数：props ${sum((a) => a.propsTotal)} 条 ｜ 事件 ${sum((a) => a.eventsTotal)} 条。`);
    L.push('');

    // ---- 修正定界 ----
    L.push('## 修正定界（三原则）');
    L.push('');
    L.push('1. **只动 JSDoc 与注释**：不改运行时逻辑、不改 props/事件名与取值（API 表面冻结，修正前后 `apiHash` 除描述外不得变化）；');
    L.push('2. **props 权威源 = `types.ts`**：描述优先补在 types.ts 条目上方的 `/** */`；头部 JSDoc `@property` 仅作兜底与参考；');
    L.push('3. **events 权威源 = `defineEmits` + `emit()` 调用**：JSDoc `@event` 与代码冲突时以代码为准。');
    L.push('');
    L.push('排序约定：**P0 必修**（②③，直接决定卡片质量）→ **P1 建议修**（④⑤⑥⑦，文档幽灵项/缺失）→ **P2 参考**（⑧⑨⑩，不影响卡片产出）→ **看说明**（①⑪⑫⑬，多为合法形态，逐条判定）。');
    L.push('');

    // ---- ① ----
    detailSection(
        L,
        '① 缺 types.ts（props 无法提取）',
        rows.noTypes,
        '无命中。',
        '无 props 的组件（如纯传送根节点）可忽略；.vue 内联 defineProps 对象会被自动提取；其余组件需补 types.ts 才能进入卡片。',
    );

    // ---- ② ----
    detailSection(
        L,
        '② props 无任何描述（P0）',
        rows.p0Props,
        '无命中——所有 props 均有描述。',
        '修法：在 types.ts 对应条目上方补 `/** 说明 */`（可参考同名 @property 描述或相邻组件措辞）；补注释不影响 apiHash 的属性部分。',
    );

    // ---- ③ ----
    detailSection(
        L,
        '③ 事件无描述（P0）',
        rows.p0Events,
        '无命中——所有事件均有描述。',
        '修法：在组件头 JSDoc 补 `@event {Function} <name> 说明`（事件名与 defineEmits 一致）。',
    );

    // ---- ④ ----
    detailSection(
        L,
        '④ JSDoc 幽灵属性：@property 不在 types.ts（P1）',
        rows.p1GhostProps,
        '无命中——头部 @property 与 types.ts 一致。',
        '修法二选一：已废弃 → 删除该 @property 行；确实支持 → 在 types.ts 补对应 prop（属 API 变更，需谨慎）。',
    );

    // ---- ⑤ ----
    detailSection(
        L,
        '⑤ JSDoc 幽灵事件：@event 不在 defineEmits（P1）',
        rows.p1GhostEvents,
        '无命中——头部 @event 与 defineEmits 一致。',
        '修法二选一：已废弃/笔误 → 删除或改正该 @event 行；确实存在 → 补进 defineEmits 与 emit 调用。',
    );

    // ---- ⑥ ----
    const skippedEmitAudit = names.filter((n) => A(n).emitCallsDynamic || A(n).emitsOpaque);
    const skipNote =
        skippedEmitAudit.length > 0
            ? `\n\n> 保守跳过 ${skippedEmitAudit.length} 个组件（动态 emit 透传或无法展开的类型引用，对账不可靠）：${skippedEmitAudit.map((n) => '`' + n + '`').join('、')}。`
            : '';
    detailSection(
        L,
        '⑥ emit 调用未声明（P1）',
        rows.p1Undeclared,
        '无命中——所有 emit 调用均有 defineEmits 声明。',
        '运行时会告警且父组件监听不稳定；修法：把该事件名补进 defineEmits（属代码修复，逐一确认后执行）。' + skipNote,
    );

    // ---- ⑦ ----
    L.push('## ⑦ 组件头缺失 @description / @tutorial（P1）');
    L.push('');
    if (headerMissing.length === 0) {
        L.push('无命中——所有组件头均含 @description 与 @tutorial。');
        L.push('');
    } else {
        L.push('| 组件 | 缺 @description | 缺 @tutorial | 建议 tutorial URL（需与官方核对） |');
        L.push('| --- | --- | --- | --- |');
        for (const n of headerMissing) {
            const d = A(n).hasDescription ? '—' : '是';
            const t = A(n).hasTutorial ? '—' : '是';
            const u = A(n).hasTutorial ? '—' : `\`${suggestTutorialUrl(n)}\``;
            L.push(`| ${n} | ${d} | ${t} | ${u} |`);
        }
        L.push('');
        L.push('修法：组件头 JSDoc 补 `@description <一句话>` / `@tutorial <官方文档 URL>`。');
        L.push('');
    }

    // ---- ⑧⑨⑩ 参考区 ----
    L.push('---');
    L.push('');
    L.push('> 以下为参考区：不影响卡片产出，过目后决定是否一并处理。');
    L.push('');
    countTableSection(
        L,
        '⑧ types.ts 无注释但 JSDoc 有描述（P2 参考）',
        rows.p2NoComment,
        '无命中。',
        '卡片已取到描述（来源 JSDoc @property）；若希望描述随 types.ts 就近维护，可把 JSDoc 描述搬进条目注释。',
    );
    countTableSection(
        L,
        '⑨ types 有但 JSDoc 未列 @property（P2 参考）',
        rows.p2NotInJsdoc,
        '无命中。',
        '头部文档不完整；卡片不受影响（props 以 types.ts 为准）。若要求头部 JSDoc 完整，需按 types.ts 逐条补 @property。',
    );
    detailSection(
        L,
        '⑩ defineEmits 声明未调用（P2 参考）',
        rows.p2NotCalled,
        '无命中。',
        '可能是转发/预留事件；若确认死事件可删除声明，否则保留。' + skipNote,
    );

    // ---- ⑪⑫⑬ 看说明区 ----
    L.push('---');
    L.push('');
    L.push('> 以下为「看说明」区：多为合法形态，逐条判定后再动手。');
    L.push('');
    L.push('## ⑪ 无 defineEmits 声明（看说明）');
    L.push('');
    if (noEmitsDecl.length === 0) {
        L.push('无命中。');
        L.push('');
    } else {
        L.push('- ' + noEmitsDecl.map((n) => '`' + n + '`').join('、'));
        L.push('');
        L.push('若组件确实无自定义事件（如纯容器），可忽略；若有 emit 调用则属⑥同类问题。');
        L.push('');
    }
    detailSection(
        L,
        '⑫ 解析器告警（看说明）',
        rows.warnings,
        '无命中。',
        '解析器的保守告警（如条目数对账不一致），逐条判定；多数属可接受形态。',
    );
    detailSection(
        L,
        '⑬ 组件提取错误（阻塞）',
        model.errors.map((e) => ({ name: e.component, list: [e.message] })),
        '无命中。',
        '提取失败的组件不会进入卡片；必须修复后才能全量生成。',
    );

    L.push('---');
    L.push('');
    L.push('## 复跑命令');
    L.push('');
    L.push('```bash');
    L.push(`node ${GEN_BY} --lib <uview-pro 路径> --audit --out <本报告路径>`);
    L.push('```');
    L.push('');
    L.push('修正收敛后执行全量生成：');
    L.push('');
    L.push('```bash');
    L.push(`node ${GEN_BY} --lib <uview-pro 路径>`);
    L.push('```');
    L.push('');
    return L.join('\n');
}

/* ------------------------------- 主流程 ------------------------------- */

function usage() {
    console.error('用法: node scripts/gen-api-cards.mjs [--lib <组件库目录> | --model <model.json>] [--out <目录>] [--only <组件名...>] [--stdout] [--check] [--verbose]');
    console.error('      node scripts/gen-api-cards.mjs --lib <组件库目录> --audit [--out <报告文件.md>] [--only <组件名...>]');
}

function parseArgv(argv) {
    const opts = { lib: null, model: null, out: null, only: [], stdout: false, check: false, verbose: false, audit: false };
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
        else if (a === '--audit') opts.audit = true;
        else {
            console.error(`未知参数：${a}`);
            usage();
            process.exit(2);
        }
    }
    return opts;
}

/** --only 归一化：button / u-button / cellItem 均可 → 模型键 */
function resolveOnly(only, model, allNames) {
    return only.map((n) => {
        const raw = String(n).trim();
        const key = raw.startsWith('u-') ? raw : 'u-' + kebabize(raw);
        if (!model.components[key]) {
            console.error(`[gen-api-cards] 组件不存在：${raw}（模型内 ${allNames.length} 个组件）`);
            process.exit(2);
        }
        return key;
    });
}

function main() {
    const opts = parseArgv(process.argv.slice(2));

    if (opts.audit && opts.check) {
        console.error('[gen-api-cards] --audit 与 --check 互斥');
        process.exit(2);
    }
    if (opts.audit && opts.lib == null) {
        console.error('[gen-api-cards] --audit 需与 --lib 同用（审计对象是源码 JSDoc）');
        process.exit(2);
    }

    // ---- 审计模式：只读源码出报告，不动任何产物 ----
    if (opts.audit) {
        const model = loadLibraryModel(opts.lib, { keepAudit: true });
        const allNames = Object.keys(model.components).sort();
        const targets = opts.only.length > 0 ? resolveOnly(opts.only, model, allNames) : allNames;
        const report = renderAudit(model, targets);
        if (opts.out) {
            const outFile = path.resolve(opts.out);
            fs.mkdirSync(path.dirname(outFile), { recursive: true });
            fs.writeFileSync(outFile, report);
            console.log(`[gen-api-cards] 审计报告写出：${toRel(outFile)}（uview-pro v${model.libVersion}，${targets.length} 个组件）`);
            const p0Props = targets.reduce((s, n) => s + model.components[n].audit.propsNoDesc.length, 0);
            const p0Events = targets.reduce((s, n) => s + model.components[n].audit.eventsNoDesc.length, 0);
            console.log(`[gen-api-cards] 总账：props 无描述 ${p0Props} 条 ｜ 事件无描述 ${p0Events} 条 ｜ 提取错误 ${model.errors.length} 条`);
        } else {
            console.log(report);
        }
        if (model.errors.length > 0) {
            for (const e of model.errors) console.error(`[gen-api-cards] 解析错误：${e.component} — ${e.message}`);
            process.exit(1);
        }
        return;
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

    // ---- 确定目标组件 ----
    const allNames = Object.keys(model.components).sort();
    const targets = opts.only.length > 0 ? resolveOnly(opts.only, model, allNames) : allNames;

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
    if (modelText != null) console.log(`[gen-api-cards] 写出：${rel}/model.json（uview-pro v${model.libVersion}，${model.stats.components} 组件）`);
    console.log(`[gen-api-cards] 写出：${rel}/u-*.md × ${cardTexts.size}${targets.length < allNames.length ? `（仅 --only 指定，全库共 ${allNames.length}）` : ''}`);
    console.log(`[gen-api-cards] 写出：${rel}/README.md`);
}

/** 相对技能根展示路径（正斜杠）；技能目录外则原样展示 */
function toRel(p) {
    const rel = path.relative(SKILL_ROOT, p);
    return String(!rel || rel.startsWith('..') ? p : rel).replace(/\\/g, '/');
}

main();
