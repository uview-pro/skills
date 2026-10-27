#!/usr/bin/env node
/**
 * uview-pro 组件 API 解析核心（零依赖，Node >= 18）
 * ------------------------------------------------------------------
 * 从 uview-pro 组件库源码提取全量 API 模型（LibraryModel）：
 *   components/u-<name>/u-<name>.vue + types.ts  →  props / events / models / slots /
 *   methods，附 canonical 指纹（apiHash / libHash）与 did-you-mean 工具。
 *
 * 适配 uview-pro 的实际写法（与 uni-app x 版库的差异点）：
 *   - props：types.ts 里的运行时对象 `export const XxxProps = { p: { type, default } }`
 *     （注释为条目上方 /**块注释* / / 行注释，可能带 @description / @deprecated / @default 标签）
 *   - events：两形态——数组式 defineEmits(['a','b']) 与泛型式 defineEmits<{ (e: 'a', x: T): void }>()
 *   - 组件头部 JSDoc：@description / @tutorial / @property（kebab-case）/ @event / @example
 *   - 无 externalClasses（Vue3 组件用 custom-class / custom-style props）
 *
 * 供两个消费者复用：
 *   - gen-api-cards.mjs   卡片生成（author-time 提取 → model.json + references/api/*.md；--audit 审计模式）
 *   - verify-u-usage.mjs  用法校验（消费侧默认读内置快照 model.json，本核心仅在源码可读（--lib）时
 *                         由校验器调用做实时提取比对）
 *
 * 设计约束：
 *   - 只依赖 node 内置模块（fs / path / crypto）；Windows 路径安全（path.join/resolve，输出正斜杠）
 *   - 解析采用「正则 + 引号感知的块切片」：不做 AST，但对本库高度统一的写法已足够，
 *     且能容忍注释/字符串内的括号与分号
 *   - 仅「字符串/数字字面量联合」参与取值校验（kind=literalUnion）；其余一律 kind=opaque 保守放行
 */

import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

/* ================================ 文本与路径 ================================ */

/** 读文本：去 BOM；文件不存在返回 null */
export function readTextSafe(p) {
    if (!fs.existsSync(p)) return null;
    let s = fs.readFileSync(p, 'utf8');
    if (s.charCodeAt(0) === 0xfeff) s = s.slice(1);
    return s;
}

export function toPosix(p) {
    return String(p).replace(/\\/g, '/');
}

/** kebab-case → camelCase：hair-line → hairLine */
export function camelize(s) {
    return String(s).replace(/[-_](\w)/g, (_, c) => c.toUpperCase());
}

/** camelCase → kebab-case：hairLine → hair-line */
export function kebabize(s) {
    return String(s).replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
}

/* ================================ 引号感知扫描器 ================================ */

const CLS_NORMAL = 0;
const CLS_STRING = 1;
const CLS_COMMENT = 2;

/**
 * 逐字符分类：0=结构字符，1=字符串字面量内部，2=注释内部。
 * 用于让括号配对 / 分隔符切分 / 注释剥离都能跳过字符串与注释（含其中的引号、括号、分号）。
 */
function classify(src) {
    const n = src.length;
    const cls = new Uint8Array(n);
    let i = 0;
    while (i < n) {
        const c = src[i];
        if (c === "'" || c === '"' || c === '`') {
            const q = c;
            cls[i] = CLS_STRING;
            i++;
            while (i < n) {
                const d = src[i];
                if (d === '\\') {
                    cls[i] = CLS_STRING;
                    i++;
                    if (i < n) {
                        cls[i] = CLS_STRING;
                        i++;
                    }
                    continue;
                }
                cls[i] = CLS_STRING;
                i++;
                if (d === q) break;
            }
            continue;
        }
        if (c === '/' && src[i + 1] === '/') {
            while (i < n && src[i] !== '\n') {
                cls[i] = CLS_COMMENT;
                i++;
            }
            continue;
        }
        if (c === '/' && src[i + 1] === '*') {
            cls[i] = CLS_COMMENT;
            cls[i + 1] = CLS_COMMENT;
            i += 2;
            while (i < n && !(src[i] === '*' && src[i + 1] === '/')) {
                cls[i] = CLS_COMMENT;
                i++;
            }
            if (i < n) {
                cls[i] = CLS_COMMENT;
                cls[i + 1] = CLS_COMMENT;
                i += 2;
            }
            continue;
        }
        i++;
    }
    return cls;
}

/** 注释剥离（保持字符长度与换行，索引可与原文对齐）：注释字符置空格，换行保留 */
export function stripCommentsSmart(src) {
    const cls = classify(src);
    let out = '';
    for (let i = 0; i < src.length; i++) {
        out += cls[i] === CLS_COMMENT ? (src[i] === '\n' ? '\n' : ' ') : src[i];
    }
    return out;
}

/** 引号/注释感知的配对查找：openIdx 处为 open 字符，返回 { inner, end } */
export function balancedSmart(src, openIdx, open, close) {
    const cls = classify(src);
    let depth = 0;
    for (let i = openIdx; i < src.length; i++) {
        if (cls[i] !== CLS_NORMAL) continue;
        const c = src[i];
        if (c === open) depth++;
        else if (c === close) {
            depth--;
            if (depth === 0) return { inner: src.slice(openIdx + 1, i), end: i };
        }
    }
    return null;
}

/** 泛型尖括号配对（TS 专用）：跳过箭头函数 `=>` 的 `>`，防 payload 里的函数类型提前收口 */
export function balancedAngles(src, openIdx) {
    const cls = classify(src);
    let depth = 0;
    for (let i = openIdx; i < src.length; i++) {
        if (cls[i] !== CLS_NORMAL) continue;
        const c = src[i];
        if (c === '<') depth++;
        else if (c === '>') {
            if (src[i - 1] === '=') continue; // `=>` 不算泛型收口
            depth--;
            if (depth === 0) return { inner: src.slice(openIdx + 1, i), end: i };
        }
    }
    return null;
}

/** 前瞻：i 处 `<` 之后是否存在正常收口 `>`（前字符不为 '='，排除 `=>`/`>=`）；用于与 `<=`、裸比较运算区分 */
function hasClosingAngle(src, cls, i) {
    for (let j = i + 1; j < src.length; j++) {
        if (cls[j] !== CLS_NORMAL) continue;
        if (src[j] === '>' && src[j - 1] !== '=') return true;
    }
    return false;
}

/** 按顶层分隔符切分（跳过字符串、注释、()/[]/{} 嵌套与 <> 泛型嵌套；`<=`/裸比较不算泛型，`=>` 不算收口） */
export function splitTopLevelSmart(src, sep) {
    const cls = classify(src);
    const out = [];
    let depth = 0;
    let angle = 0;
    let cur = '';
    for (let i = 0; i < src.length; i++) {
        const c = src[i];
        if (cls[i] !== CLS_NORMAL) {
            cur += c;
            continue;
        }
        if (c === '(' || c === '{' || c === '[') {
            depth++;
            cur += c;
            continue;
        }
        if (c === ')' || c === '}' || c === ']') {
            depth--;
            cur += c;
            continue;
        }
        if (c === '<' && src[i + 1] !== '=' && hasClosingAngle(src, cls, i)) {
            angle++;
            cur += c;
            continue;
        }
        if (c === '>' && src[i - 1] !== '=') {
            if (angle > 0) angle--;
            cur += c;
            continue;
        }
        if (c === sep && depth === 0 && angle === 0) {
            out.push(cur);
            cur = '';
            continue;
        }
        cur += c;
    }
    out.push(cur);
    return out;
}

/** 顶层（跳过字符串、注释与嵌套括号/泛型）第一个 sep 的位置，找不到返回 -1 */
export function topLevelIndexOf(src, sep) {
    const cls = classify(src);
    let depth = 0;
    let angle = 0;
    for (let i = 0; i < src.length; i++) {
        if (cls[i] !== CLS_NORMAL) continue;
        const c = src[i];
        if (c === '(' || c === '{' || c === '[') depth++;
        else if (c === ')' || c === '}' || c === ']') depth--;
        else if (c === '<' && src[i + 1] !== '=' && hasClosingAngle(src, cls, i)) angle++;
        else if (c === '>' && src[i - 1] !== '=') {
            if (angle > 0) angle--;
        } else if (c === sep && depth === 0 && angle === 0) return i;
    }
    return -1;
}

/* ================================ 指纹与相似度 ================================ */

export function sha256Hex(s) {
    return crypto.createHash('sha256').update(s, 'utf8').digest('hex');
}

/** canonical JSON：对象键递归排序、无空白，保证同内容同串（数组顺序保留） */
export function canonicalJSON(v) {
    if (v === undefined) return 'null';
    if (v === null || typeof v !== 'object') return JSON.stringify(v);
    if (Array.isArray(v)) return '[' + v.map((x) => canonicalJSON(x)).join(',') + ']';
    const keys = Object.keys(v).sort();
    return '{' + keys.map((k) => JSON.stringify(k) + ':' + canonicalJSON(v[k])).join(',') + '}';
}

export function fingerprint(v) {
    return 'sha256:' + sha256Hex(canonicalJSON(v));
}

/** Damerau-Levenshtein 距离（含相邻换位），用于 did-you-mean */
export function editDistance(a, b) {
    a = String(a).toLowerCase();
    b = String(b).toLowerCase();
    const m = a.length;
    const n = b.length;
    if (m === 0) return n;
    if (n === 0) return m;
    const d = new Array(m + 1);
    for (let i = 0; i <= m; i++) {
        d[i] = new Array(n + 1).fill(0);
        d[i][0] = i;
    }
    for (let j = 0; j <= n; j++) d[0][j] = j;
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            const cost = a[i - 1] === b[j - 1] ? 0 : 1;
            d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + cost);
            if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) {
                d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + 1);
            }
        }
    }
    return d[m][n];
}

/** 在候选集中找距离最近的项；超过 maxDist 返回 null */
export function findNearest(name, candidates, maxDist = 2) {
    let best = null;
    let bestD = Infinity;
    for (const c of candidates) {
        const dd = editDistance(name, c);
        if (dd < bestD) {
            bestD = dd;
            best = c;
        }
    }
    return bestD <= maxDist ? best : null;
}

/* ================================ type 解析 ================================ */

const AMBIENT_REFS = new Set([
    'RegExp', 'Promise', 'Array', 'Map', 'Set', 'Function', 'Ref', 'Record', 'Date',
    'number', 'string', 'boolean', 'object', 'any', 'unknown', 'void', 'null', 'undefined',
]);

const OPAQUE = { kind: 'opaque', values: null };

const STR_LIT_RE = /^'([\s\S]*)'$/;
const DQ_STR_LIT_RE = /^"([\s\S]*)"$/;
const NUM_LIT_RE = /^-?\d+(?:\.\d+)?$/;
const IDENT_RE = /^[A-Za-z_$][\w$]*$/;

/**
 * 解析类型文本 → { kind: 'literalUnion' | 'boolean' | 'object' | 'function' | 'opaque', values? }
 * 别名沿 局部 types.ts → types/global.d.ts 逐层展开（局部同名遮蔽全局，最多 8 层，环安全）。
 */
function resolveTypeText(text, ctx) {
    const t = String(text).replace(/\s+/g, ' ').trim();
    if (t === '') return OPAQUE;
    if (t.startsWith('{')) return { kind: 'object', values: null };
    if (t.includes('=>')) return { kind: 'function', values: null };
    const parts = splitTopLevelSmart(t, '|')
        .map((s) => s.trim())
        .filter((s) => s.length > 0);
    if (parts.length === 0) return OPAQUE;

    const atoms = [];
    const values = [];
    for (const p of parts) {
        const sl = p.match(STR_LIT_RE) || p.match(DQ_STR_LIT_RE);
        if (sl) {
            atoms.push('lit');
            values.push(sl[1]);
            continue;
        }
        if (NUM_LIT_RE.test(p)) {
            atoms.push('lit');
            values.push(Number(p));
            continue;
        }
        if (p === 'null' || p === 'undefined') {
            atoms.push('null');
            continue;
        }
        if (p === 'boolean') {
            atoms.push('bool');
            continue;
        }
        if (p === 'number' || p === 'string' || p === 'any' || p === 'unknown' || p.endsWith('[]')) {
            atoms.push('opaque');
            continue;
        }
        if (p.includes('<') || p.includes('{') || p.includes('(')) {
            atoms.push('opaque');
            continue;
        }
        if (IDENT_RE.test(p)) {
            if (ctx.stack.includes(p) || ctx.depth >= 8) {
                atoms.push('opaque');
                continue;
            }
            const rhs = ctx.local.get(p) ?? ctx.global.get(p);
            if (rhs == null) {
                if (!AMBIENT_REFS.has(p)) ctx.unresolved.add(p);
                atoms.push('opaque');
                continue;
            }
            const sub = resolveTypeText(rhs, {
                local: ctx.local,
                global: ctx.global,
                depth: ctx.depth + 1,
                stack: [...ctx.stack, p],
                unresolved: ctx.unresolved,
            });
            if (sub.kind === 'literalUnion') {
                atoms.push('lit');
                values.push(...sub.values);
                continue;
            }
            if (sub.kind === 'boolean') {
                atoms.push('bool');
                continue;
            }
            atoms.push('opaque');
            continue;
        }
        atoms.push('opaque');
    }

    if (atoms.length > 0 && atoms.every((a) => a === 'lit' || a === 'null') && values.length > 0) {
        return { kind: 'literalUnion', values };
    }
    if (atoms.length === 1 && atoms[0] === 'bool') return { kind: 'boolean', values: null };
    return OPAQUE;
}

/** 供外部使用的类型解析入口：需要给定 局部/全局 类型表 */
export function resolveTypeExpr(typeText, localTable, globalTable) {
    return resolveTypeText(typeText, {
        local: localTable || new Map(),
        global: globalTable || new Map(),
        depth: 0,
        stack: [],
        unresolved: new Set(),
    });
}

/** 扫描 export type 别名：name → RHS 原文（注释已剥离）；跳过 ExtractPropTypes 自引用式别名 */
function scanTypeAliases(src) {
    const clean = stripCommentsSmart(src);
    const re = /export\s+type\s+([A-Za-z_$][\w$]*)\s*=\s*/g;
    const marks = [];
    let m;
    while ((m = re.exec(clean))) marks.push({ name: m[1], rhsStart: re.lastIndex, declStart: m.index });
    const out = new Map();
    for (let i = 0; i < marks.length; i++) {
        const end = i + 1 < marks.length ? marks[i + 1].declStart : clean.length;
        const rhs = clean.slice(marks[i].rhsStart, end).replace(/[\s;]+$/, '').trim();
        if (rhs === '') continue;
        if (/^ExtractPropTypes\b/.test(rhs)) continue; // 组件 props 的派生类型别名，无解析价值
        out.set(marks[i].name, rhs);
    }
    return out;
}

/**
 * 扫描 type X = RHS 与 interface X { ... } 定义（注释已剥；`{` 体经引号感知配对，`=` 体截到行尾）。
 * 供 defineEmits<Xxx>() 类型引用式声明展开用；返回 name → RHS 文本。
 */
function scanTypeLikeDefs(src) {
    const clean = stripCommentsSmart(src);
    const out = new Map();
    const re = /\b(?:export\s+)?(type|interface)\s+([A-Za-z_$][\w$]*)\s*(=|\{)/g;
    let m;
    const marks = [];
    while ((m = re.exec(clean))) marks.push({ name: m[2], sig: m[3], bodyStart: re.lastIndex });
    for (const mk of marks) {
        if (mk.sig === '{') {
            const block = balancedSmart(clean, mk.bodyStart - 1, '{', '}');
            if (block) out.set(mk.name, '{' + block.inner + '}');
        } else {
            const rest = clean.slice(mk.bodyStart);
            const lead = rest.match(/^\s*/)[0].length;
            if (rest.charAt(lead) === '{') {
                const block = balancedSmart(clean, mk.bodyStart + lead, '{', '}');
                if (block) out.set(mk.name, '{' + block.inner + '}');
            } else {
                const line = rest.split('\n')[0].replace(/;\s*$/, '').trim();
                if (line !== '' && !/^ExtractPropTypes\b/.test(line)) out.set(mk.name, line);
            }
        }
    }
    return out;
}

/* ================================ JSDoc ================================ */

/** 取锚点（锚点前的最近一段 /** ... *​/ 注释，其间只允许空白），找不到返回 null */
function jsDocBefore(rawSrc, cleanSrc, anchorRe) {
    const am = anchorRe.exec(cleanSrc);
    if (!am) return null;
    const before = rawSrc.slice(0, am.index);
    const end = before.lastIndexOf('*/');
    if (end < 0) return null;
    if (before.slice(end + 2).trim() !== '') return null;
    const start = before.lastIndexOf('/**', end);
    if (start < 0) return null;
    return before.slice(start, end + 2);
}

function compactJsdoc(s) {
    return String(s)
        .replace(/^\s*\*?\s?/gm, '')
        .replace(/\s+/g, ' ')
        .replace(/([；。，、：])\s+/g, '$1')
        .trim();
}

/**
 * 解析组件头 JSDoc：@description / @tutorial / @property / @slot / @event / @example
 *（另收首个 @tag 前的标题行 leading 作描述兜底）。
 * @property 键为 kebab-case（库约定），@event 键为事件名原文，@example 保留原始多行。
 */
function parseJsDoc(block) {
    const out = { description: '', tutorial: '', example: '', leading: '', props: new Map(), slots: [], events: new Map() };
    if (!block) return out;
    const body = block.replace(/^\/\*\*/, '').replace(/\*\/$/, '');
    const lines = body.split('\n').map((l) => l.replace(/^\s*\*?\s?/, '').trimEnd());
    let mode = null;
    let leadingMode = true;
    const desc = [];
    for (const line of lines) {
        const tag = line.match(/^@(\w+)\b\s*(.*)$/);
        if (tag) {
            leadingMode = false;
            const name = tag[1];
            const rest = tag[2];
            if (name === 'description') {
                mode = 'desc';
                desc.push(rest.trim());
            } else if (name === 'tutorial') {
                mode = null;
                out.tutorial = rest.trim();
            } else if (name === 'property') {
                mode = null;
                const p = rest.match(/^\{([^}]+)\}\s+([\w-]+)\s+([\s\S]*)$/);
                if (p) out.props.set(p[2], { type: p[1], desc: p[3].trim() });
            } else if (name === 'slot') {
                mode = null;
                const s = rest.match(/^(\S+)\s+([\s\S]*)$/);
                if (s) out.slots.push({ name: s[1] === '默认插槽' ? 'default' : s[1], desc: s[2].trim() });
            } else if (name === 'event') {
                mode = null;
                const e = rest.match(/^\{[^}]+\}\s+([\w-]+)\s+([\s\S]*)$/);
                if (e) out.events.set(e[1], e[2].trim());
            } else if (name === 'example') {
                mode = 'example';
                out.example = rest.trim();
            } else {
                mode = null;
            }
        } else if (mode === 'desc') {
            desc.push(line.trim());
        } else if (mode === 'example') {
            out.example += (out.example === '' ? '' : '\n') + line;
        } else if (leadingMode && line.trim() !== '') {
            out.leading = out.leading === '' ? line.trim() : out.leading + ' ' + line.trim();
        }
    }
    out.description = desc.join(' ').replace(/\s+/g, ' ').replace(/([；。，、：])\s+/g, '$1').trim();
    return out;
}

/**
 * 组件描述兜底：头部 JSDoc 无 @description 时，采用首个 @tag 前的标题行（库约定风格如「button 按钮」）。
 * 仅当标题行以组件名（u-<name> 或 <name>）开头才采纳并剥去该名。
 */
function resolveDescription(compName, jsdoc) {
    if (jsdoc.description !== '') return jsdoc.description;
    const lead = jsdoc.leading;
    if (!lead) return '';
    const short = compName.replace(/^u-/, '');
    let rest = null;
    if (lead.toLowerCase().startsWith(('u-' + short).toLowerCase())) {
        rest = lead.slice(('u-' + short).length);
    } else {
        const esc = short.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const m = new RegExp('^' + esc + '(?![A-Za-z0-9-])', 'i').exec(lead);
        if (m) rest = lead.slice(m[0].length);
    }
    if (rest == null) return '';
    return rest.replace(/^[\s:：,，.。-]+/, '').trim();
}

/* ================================ 组件级解析 ================================ */

/** 截取 <template>...</template>（首个开标签 → 末个闭标签，防内层 <template #xxx> 提前收口） */
function templateSection(src) {
    const open = /<template(?:\s[^>]*)?>/.exec(src);
    if (!open) return null;
    const start = open.index + open[0].length;
    const end = src.lastIndexOf('</template>');
    return end > start ? src.slice(start, end) : null;
}

/** 提取全部 <script ...>...</script> 块（attrs 保留 setup / module 等标记） */
function scriptBlocks(src) {
    const out = [];
    const re = /<script(\b[^>]*)>([\s\S]*?)<\/script>/g;
    let m;
    while ((m = re.exec(src))) out.push({ attrs: m[1], content: m[2] });
    return out;
}

/**
 * 组件头部 JSDoc 查找：
 * 1) setup 块内：defineEmits / defineProps / const emit / const props 锚点
 * 2) 普通块内：export default 锚点（无 setup 内容的组件，如 u-root-portal）
 */
function findHeadJsDoc(blocks) {
    const setup = blocks.find((b) => /\bsetup\b/.test(b.attrs));
    const normal = blocks.find((b) => !/\bsetup\b/.test(b.attrs) && !/\bmodule=/.test(b.attrs));
    const candidates = [];
    if (setup) {
        const clean = stripCommentsSmart(setup.content);
        candidates.push([setup.content, clean, /defineEmits\s*[<(]/]);
        candidates.push([setup.content, clean, /defineProps\s*[<(]/]);
        candidates.push([setup.content, clean, /const\s+emit\s*=/]);
        candidates.push([setup.content, clean, /const\s+props\s*=/]);
    }
    if (normal) {
        const clean = stripCommentsSmart(normal.content);
        candidates.push([normal.content, clean, /export\s+default\s*\{/]);
    }
    for (const [raw, clean, anchor] of candidates) {
        const b = jsDocBefore(raw, clean, anchor);
        if (b) return b;
    }
    return null;
}

/** 组件名：export default { name: 'u-xxx' } 优先，兜底目录名 */
function resolveComponentName(blocks, dirName) {
    for (const b of blocks) {
        const m = stripCommentsSmart(b.content).match(/name\s*:\s*['"](u-[\w-]+)['"]/);
        if (m) return m[1];
    }
    return dirName;
}

/* --------------------------- props（types.ts 运行时对象） --------------------------- */

/**
 * 定位 props 常量块：优先 setup 块 defineProps(Const) 的引用名，其次 types.ts 内 `export const \w+Props = {`。
 * 返回 { constName, blockInner }（blockInner 为 `{}` 之间原文，含注释）
 */
function extractPropsConstBlock(cleanSetup, rawTypes, cleanTypes, definePropsName) {
    const tryTypes = (nameRe) => {
        if (cleanTypes == null) return null;
        const mm = nameRe.exec(cleanTypes);
        if (!mm) return null;
        const braceIdx = cleanTypes.indexOf('{', mm.index);
        if (braceIdx < 0) return null;
        const block = balancedSmart(cleanTypes, braceIdx, '{', '}');
        if (!block) return null;
        return { constName: mm[1], blockInner: rawTypes.slice(braceIdx + 1, block.end) };
    };
    if (definePropsName) {
        const re = new RegExp('export\\s+const\\s+' + definePropsName + '\\s*=\\s*\\{');
        const hit = tryTypes(re);
        if (hit) return hit;
    }
    return tryTypes(/export\s+const\s+([A-Za-z_$][\w$]*Props)\s*=\s*\{/);
}

/**
 * 内联对象形态的 props 块：`defineProps({ ... })`（无 types.ts 的组件，如 u-time-line）。
 * clean 与 raw 索引对齐（注释剥离保持长度），故用 clean 定位、raw 取内容以保留条目注释。
 */
function extractInlinePropsBlock(cleanSetup, rawSetup) {
    const m = /defineProps\s*\(\s*\{/.exec(cleanSetup);
    if (!m) return null;
    const brIdx = cleanSetup.indexOf('{', m.index);
    if (brIdx < 0) return null;
    const block = balancedSmart(cleanSetup, brIdx, '{', '}');
    if (!block) return null;
    return { constName: null, blockInner: rawSetup.slice(brIdx + 1, block.end) };
}

/** 从条目原文提取前置注释：块注释优先（可能多段连续叠加，全部合并），其次条目名之前连续的 `//` 行注释 */
function extractEntryComment(raw) {
    let entry = raw.trim();
    let comment = '';
    let kind = null;
    // 多段连续块注释（历史叠加的写法，如 u-upload limitType）逐段剥离合并
    while (true) {
        const cm = entry.match(/^\/\*\*([\s\S]*?)\*\//);
        if (!cm) break;
        comment = comment === '' ? cm[1] : comment + '\n' + cm[1];
        entry = entry.slice(cm[0].length).trim();
        kind = 'block';
    }
    if (kind == null) {
        const lines = entry.split('\n');
        const comments = [];
        let idx = 0;
        for (; idx < lines.length; idx++) {
            const t = lines[idx].trim();
            if (t.startsWith('//')) {
                comments.push(t.replace(/^\/\/\s?/, ''));
                continue;
            }
            if (t === '') continue;
            break;
        }
        if (comments.length > 0) {
            comment = comments.join('\n');
            entry = lines.slice(idx).join('\n');
            kind = 'line';
        }
    }
    return { entry, comment: cleanupEntryComment(comment), commentKind: kind };
}

/**
 * 规范化条目注释：处理 @description（收下）/ @default（丢弃，值已在默认值列）/
 * @deprecated（标记「已废弃」）/ 其余 @tag 丢弃。
 */
function cleanupEntryComment(text) {
    if (!text) return '';
    const lines = String(text)
        .split('\n')
        .map((l) => l.replace(/^\s*\*?\s?/, '').trim())
        .filter((l) => l !== '');
    const parts = [];
    let deprecated = false;
    for (const l of lines) {
        const dm = l.match(/^@deprecated\b\s*(.*)$/);
        if (dm) {
            deprecated = true;
            if (dm[1]) parts.push(dm[1]);
            continue;
        }
        const dsc = l.match(/^@description\b\s*(.*)$/);
        if (dsc) {
            if (dsc[1]) parts.push(dsc[1]);
            continue;
        }
        if (l.startsWith('@')) continue;
        parts.push(l);
    }
    let out = parts.join(' ').replace(/\s+/g, ' ').replace(/([；。，、：])\s+/g, '$1').trim();
    if (deprecated) out = out ? out + '（已废弃）' : '（已废弃）';
    return out;
}

/** 规范化 props 的 type 表达式：剥 as PropType<...>，构造器数组映射为小写联合 */
function normalizePropTypeExpr(expr) {
    const t = String(expr).replace(/\s+/g, ' ').trim();
    const m = t.match(/^[\s\S]+?\s+as\s+(?:unknown\s+as\s+)?PropType\s*<\s*([\s\S]*)>\s*$/);
    if (m) return m[1].trim();
    const ctorMap = {
        String: 'string', Number: 'number', Boolean: 'boolean', Object: 'object',
        Array: 'array', Function: 'function', Symbol: 'symbol',
    };
    if (/^\[/.test(t)) {
        const end = t.lastIndexOf(']');
        if (end > 0) {
            const parts = splitTopLevelSmart(t.slice(1, end), ',').map((s) => s.trim());
            return parts.map((p) => ctorMap[p] ?? p).join(' | ');
        }
    }
    if (ctorMap[t]) return ctorMap[t];
    return t;
}

/** 默认值分类：literal（字面量，可展示）/ factory（工厂函数）/ ref（引用表达式，展示原文）/ absent */
function classifyDefaultValue(expr) {
    const t = String(expr).replace(/\s+/g, ' ').trim();
    if (t === '') return { kind: 'absent', display: null };
    if (t.includes('=>') || /^function\b/.test(t)) return { kind: 'factory', display: null };
    if (/^'[\s\S]*'$/.test(t) || /^"[\s\S]*"$/.test(t)) return { kind: 'literal', display: t };
    if (NUM_LIT_RE.test(t)) return { kind: 'literal', display: t };
    if (t === 'true' || t === 'false' || t === 'null') return { kind: 'literal', display: t };
    return { kind: 'ref', display: t };
}

const PROP_DECL_LINE_RE = /^[A-Za-z_$][\w$]*\s*:/;

/** 行级代码扫描（跨行块注释状态感知）：返回各条 { code, commentStart }；code 为去字符串与注释后的结构文本 */
function scanCodeLines(text) {
    const lines = [];
    let inBlock = false;
    for (const rawLine of text.split('\n')) {
        let code = '';
        let i = 0;
        while (i < rawLine.length) {
            if (inBlock) {
                const close = rawLine.indexOf('*/', i);
                if (close < 0) {
                    i = rawLine.length;
                    break;
                }
                inBlock = false;
                i = close + 2;
                continue;
            }
            const c = rawLine[i];
            if (c === '/' && rawLine[i + 1] === '*') {
                inBlock = true;
                i += 2;
                continue;
            }
            if (c === '/' && rawLine[i + 1] === '/') break;
            if (c === "'" || c === '"' || c === '`') {
                const q = c;
                i++;
                while (i < rawLine.length && rawLine[i] !== q) {
                    if (rawLine[i] === '\\') i++;
                    i++;
                }
                i++;
                continue;
            }
            code += c;
            i++;
        }
        lines.push({ code: code.trim(), commentStart: rawLine.trim().startsWith('/**') });
    }
    return lines;
}

function codeDelta(code) {
    let d = 0;
    for (const c of code) {
        if (c === '(' || c === '{' || c === '[') d++;
        else if (c === ')' || c === '}' || c === ']') d--;
    }
    return d;
}

/** 深度 0 的 props 声明行计数（与解析结果对账，防静默漏解析） */
function countPropDeclLines(blockInner) {
    let count = 0;
    let depth = 0;
    for (const { code } of scanCodeLines(blockInner)) {
        if (depth === 0 && PROP_DECL_LINE_RE.test(code)) count++;
        depth += codeDelta(code);
    }
    return count;
}

/** 解析 props 条目：`name: { type: ..., default: ... }`（注释归入条目） */
function parsePropEntries(blockInner) {
    const out = [];
    for (const raw of splitTopLevelSmart(blockInner, ',')) {
        if (raw.trim() === '') continue;
        const { entry, comment, commentKind } = extractEntryComment(raw);
        const m = entry.trim().match(/^([A-Za-z_$][\w$]*)\s*:\s*([\s\S]+)$/);
        if (!m) continue;
        const name = m[1];
        let value = m[2].trim();
        // value 为对象字面量：取配对内层，切顶层 `,` 找 type / default / required
        let typeExpr = '';
        let defaultExpr = '';
        let required = false;
        const bi = value.indexOf('{');
        if (bi >= 0) {
            const obj = balancedSmart(value, bi, '{', '}');
            if (obj) {
                for (const part of splitTopLevelSmart(obj.inner, ',')) {
                    const pi = part.trim();
                    if (pi === '') continue;
                    const ci = topLevelIndexOf(pi, ':');
                    const key = (ci >= 0 ? pi.slice(0, ci) : pi).trim();
                    const val = ci >= 0 ? pi.slice(ci + 1).trim() : '';
                    if (key === 'type') typeExpr = val;
                    else if (key === 'default') defaultExpr = val;
                    else if (key === 'required') required = val === 'true';
                }
            }
        } else if (
            /^\[/.test(value) ||
            (/^[A-Za-z_$][\w$.]*$/.test(value) && !/^(?:null|true|false|undefined)$/.test(value))
        ) {
            // 简写形态 `name: Number` / `name: [String, Number]`——value 即类型表达式
            typeExpr = value;
        }
        out.push({ name, typeExpr: typeExpr.replace(/\s+/g, ' '), defaultExpr, required, comment, commentKind });
    }
    return out;
}

/* --------------------------- events（两形态 defineEmits） --------------------------- */

/**
 * 解析 defineEmits（三形态 + 类型引用展开）：
 *  - 泛型签名式 defineEmits<{ (e: 'click'): void; (e: 'change', v: number): void }>()
 *  - 泛型对象式 defineEmits<{ change: [index: number]; 'theme-change': [n: string] }>()（Vue 3.3+ 短语法）
 *  - 类型引用式 defineEmits<CalendarEmits>()（经 resolveTypeRef 查本地 type/interface 定义后展开，最多 3 层链）
 *  - 数组式 defineEmits(['click', 'change'])
 * 返回 { events, updates, typed, declared, opaque }；opaque=true 表示声明存在但类型无法解析（调用审计需保守放行）
 */
function parseEmits(cleanSetup, resolveTypeRef) {
    const typed = /defineEmits\s*</.exec(cleanSetup);
    if (typed) {
        const ltIdx = cleanSetup.indexOf('<', typed.index);
        const ang = balancedAngles(cleanSetup, ltIdx);
        if (ang) {
            let body = ang.inner.trim();
            for (let hop = 0; hop < 3; hop++) {
                if (!/^[A-Za-z_$][\w$]*$/.test(body)) break;
                const rhs = resolveTypeRef ? resolveTypeRef(body) : null;
                if (rhs == null) return { events: [], updates: [], typed: true, declared: true, opaque: true };
                body = rhs.trim();
            }
            const events = [];
            const updates = [];
            const sigRe = /\(\s*e\s*:/g;
            let m;
            while ((m = sigRe.exec(body))) {
                const paren = balancedSmart(body, m.index, '(', ')');
                if (!paren) break;
                const sig = paren.inner.replace(/\s+/g, ' ').trim();
                const nm = sig.match(/^e\s*:\s*(?:'([^']+)'|"([^"]+)")\s*(?:,\s*([\s\S]*))?$/);
                if (nm) {
                    const name = nm[1] != null ? nm[1] : nm[2];
                    const payload = nm[3] ? nm[3].trim() : '';
                    if (name.startsWith('update:')) updates.push({ name: name.slice('update:'.length), payload });
                    else events.push({ name, payload });
                }
                sigRe.lastIndex = paren.end;
            }
            // 对象短语法：{ change: [index: number]; 'theme-change': [name: string] }
            if (events.length + updates.length === 0) {
                for (const part of splitTopLevelSmart(body.replace(/^\{|\}$/g, ''), ';')) {
                    const pi = part.trim();
                    if (pi === '') continue;
                    const ci = topLevelIndexOf(pi, ':');
                    if (ci < 0) continue;
                    const key = pi.slice(0, ci).trim().replace(/^['"]|['"]$/g, '');
                    if (!/^[\w:-]+$/.test(key)) continue;
                    if (key.startsWith('update:')) updates.push({ name: key.slice('update:'.length), payload: '' });
                    else events.push({ name: key, payload: '' });
                }
            }
            // 展开后仍非对象体（链式引用未解析等）→ 标记 opaque，防「未声明」误报
            if (body.charAt(0) !== '{') {
                return { events: [], updates: [], typed: true, declared: true, opaque: true };
            }
            return { events, updates, typed: true, declared: true, opaque: false };
        }
    }
    const arrCall = /defineEmits\s*\(/.exec(cleanSetup);
    if (arrCall) {
        const pIdx = cleanSetup.indexOf('(', arrCall.index);
        const paren = balancedSmart(cleanSetup, pIdx, '(', ')');
        if (paren) {
            const events = [];
            const updates = [];
            for (const mm of paren.inner.matchAll(/['"]([^'"]+)['"]/g)) {
                const name = mm[1];
                if (name.startsWith('update:')) updates.push({ name: name.slice('update:'.length), payload: '' });
                else events.push({ name, payload: '' });
            }
            return { events, updates, typed: false, declared: true, opaque: false };
        }
    }
    return { events: [], updates: [], typed: false, declared: false, opaque: false };
}

/**
 * 扫描组件 emit 调用（emit / emits 别名；$emit 属全局事件总线，明确排除）：
 *  - 取「首实参」内全部字符串字面量——覆盖 emit('close')、三元 emit(a ? 'open' : 'close')、
 *    类型断言联合 emit(ev as 'confirm' | 'cancel') 三种写法
 *  - 首实参无字面量（如 emit(type, ...) 透传变量）→ dynamic=true，调用审计需保守放行
 * 返回 { names, dynamic }
 */
function parseEmitCalls(cleanSrc) {
    const names = [];
    const seen = new Set();
    let dynamic = false;
    const re = /(?<![\w$.])emits?\s*\(/g;
    let m;
    while ((m = re.exec(cleanSrc))) {
        const pIdx = cleanSrc.indexOf('(', m.index);
        const par = balancedSmart(cleanSrc, pIdx, '(', ')');
        if (!par) break;
        const firstArg = splitTopLevelSmart(par.inner, ',')[0].trim();
        let found = false;
        for (const lit of firstArg.matchAll(/'([^'\\]*)'|"([^"\\]*)"/g)) {
            const name = lit[1] != null ? lit[1] : lit[2];
            if (name === '' || !/^[\w:$.-]+$/.test(name)) continue;
            found = true;
            if (!seen.has(name)) {
                seen.add(name);
                names.push(name);
            }
        }
        if (!found) dynamic = true;
        re.lastIndex = par.end;
    }
    return { names, dynamic };
}

/**
 * 组装 v-model 模型：modelValue（prop+emit）/ update:xxx / show（prop-only 可见性开关）。
 * ① uview-pro 用标准 Vue3 modelValue；② show 为经典可见性 prop，单独记录以便卡片提示。
 */
function buildModels(props, updates) {
    const models = [];
    const seen = new Set();
    const mv = props.find((p) => p.name === 'modelValue');
    const mvUpd = updates.find((u) => u.name === 'modelValue');
    if (mv || mvUpd) {
        const channels = [];
        if (mv) channels.push('prop');
        if (mvUpd) channels.push('emit');
        models.push({
            name: 'modelValue',
            channels,
            propName: 'modelValue',
            updateEvent: mvUpd ? 'update:modelValue' : null,
            default: mv ? mv.default : null,
        });
        seen.add('modelValue');
    }
    for (const u of updates) {
        if (seen.has(u.name)) continue;
        const p = props.find((x) => x.name === u.name);
        models.push({
            name: u.name,
            channels: p ? ['prop', 'emit'] : ['emit'],
            propName: u.name,
            updateEvent: 'update:' + u.name,
            default: p ? p.default : null,
        });
        seen.add(u.name);
    }
    for (const p of props) {
        if (p.name !== 'show' || seen.has('show')) continue;
        models.push({ name: 'show', channels: ['prop'], propName: 'show', updateEvent: null, default: p.default });
        seen.add('show');
    }
    return models;
}

/* --------------------------- slots / methods --------------------------- */

/** 模板插槽扫描（HTML 注释已剥；动态 name 跳过） */
function parseTemplateSlots(rawTemplate) {
    const src = rawTemplate.replace(/<!--[\s\S]*?-->/g, '');
    const out = [];
    const seen = new Set();
    const re = /<slot\b([^>]*)>/g;
    let m;
    while ((m = re.exec(src))) {
        const attr = m[1];
        const nm = attr.match(/(?:^|\s):?name\s*=\s*"([^"]+)"/) || attr.match(/(?:^|\s):?name\s*=\s*'([^']+)'/);
        const name = nm ? nm[1] : 'default';
        if (name.includes('{') || name.includes('(')) continue;
        if (!seen.has(name)) {
            seen.add(name);
            out.push({ name });
        }
    }
    return out;
}

/** defineExpose 解析（支持 defineExpose({...}) 与 defineExpose<Type>({...})；排除 props / emit） */
function parseExposedMethods(cleanSetup) {
    const idx = cleanSetup.indexOf('defineExpose');
    if (idx < 0) return [];
    let from = idx + 'defineExpose'.length;
    // 跳过可选泛型
    const lt = cleanSetup.indexOf('<', from);
    const pi = cleanSetup.indexOf('(', from);
    if (pi < 0) return [];
    if (lt >= 0 && lt < pi) {
        const ang = balancedAngles(cleanSetup, lt);
        if (!ang) return [];
        from = ang.end + 1;
    }
    const parenIdx = cleanSetup.indexOf('(', from);
    if (parenIdx < 0) return [];
    const args = balancedSmart(cleanSetup, parenIdx, '(', ')');
    if (!args) return [];
    const inner = args.inner.trim();
    if (!inner.startsWith('{')) return [];
    const obj = balancedSmart(inner, inner.indexOf('{'), '{', '}');
    if (!obj) return [];
    const out = [];
    for (const raw of splitTopLevelSmart(obj.inner, ',')) {
        let e = raw.trim();
        if (!e || e.startsWith('...')) continue;
        const ci = topLevelIndexOf(e, ':');
        let key = ci >= 0 ? e.slice(0, ci).trim() : e;
        key = key.replace(/^['"]|['"]$/g, '');
        if (key === 'props' || key === 'emit') continue;
        if (!IDENT_RE.test(key)) continue;
        out.push({ name: key });
    }
    return out;
}

/* ================================ 组件提取 ================================ */

function extractComponent(libAbs, compName, globalTable, keepAudit) {
    const dirRel = toPosix(path.join('components', compName));
    const dirAbs = path.join(libAbs, 'components', compName);
    const vuePath = path.join(dirAbs, compName + '.vue');
    const typesPath = path.join(dirAbs, 'types.ts');
    const warnings = [];
    if (!fs.existsSync(vuePath)) throw new Error(`缺少组件主文件：${compName}.vue`);

    const rawAll = readTextSafe(vuePath) || '';
    const rawTemplate = templateSection(rawAll) ?? '';
    const blocks = scriptBlocks(rawAll);
    const setupBlock = blocks.find((b) => /\bsetup\b/.test(b.attrs));
    const rawSetup = setupBlock ? setupBlock.content : '';
    const cleanSetup = stripCommentsSmart(rawSetup);
    const rawTypes = readTextSafe(typesPath);
    const cleanTypes = rawTypes == null ? null : stripCommentsSmart(rawTypes);
    const hasTypesFile = rawTypes != null;

    const componentName = resolveComponentName(blocks, compName);
    const jsdocBlock = findHeadJsDoc(blocks);
    const jsdoc = parseJsDoc(jsdocBlock);
    const description = resolveDescription(componentName, jsdoc);

    // ---- props ----（三形态：types.ts 常量引用 → .vue 内联对象 → 首个 *Props 常量兜底）
    const dpMatch = cleanSetup.match(/defineProps\s*\(\s*([A-Za-z_$][\w$]*)\s*\)/);
    if (!dpMatch && /defineProps\s*</.test(cleanSetup)) {
        warnings.push('defineProps 为泛型内联写法（库约定为 types.ts 常量形态），未能提取 props');
    }
    let propsBlock = dpMatch ? extractPropsConstBlock(cleanSetup, rawTypes, cleanTypes, dpMatch[1]) : null;
    if (propsBlock == null && /defineProps\s*\(\s*\{/.test(cleanSetup)) {
        propsBlock = extractInlinePropsBlock(cleanSetup, rawSetup);
    }
    if (propsBlock == null) {
        propsBlock = extractPropsConstBlock(cleanSetup, rawTypes, cleanTypes, null);
    }
    if (propsBlock == null) {
        if (hasTypesFile) warnings.push('未找到 props 常量块（export const XxxProps = {...}）');
    } else {
        const declCount = countPropDeclLines(propsBlock.blockInner);
        const entriesRaw = parsePropEntries(propsBlock.blockInner);
        if (declCount !== entriesRaw.length) {
            warnings.push(`props 条目数对账不一致：声明行 ${declCount} 条 vs 解析 ${entriesRaw.length} 条`);
        }
    }
    const entries = propsBlock == null ? [] : parsePropEntries(propsBlock.blockInner);

    const unresolved = new Set();
    const localTable = rawTypes != null ? scanTypeAliases(rawTypes) : new Map();
    const props = entries.map((e) => {
        const jp = jsdoc.props.get(kebabize(e.name)) ?? jsdoc.props.get(e.name) ?? null;
        let desc = '';
        let descFrom = null;
        if (e.comment) {
            desc = e.comment;
            descFrom = 'types';
        } else if (jp && jp.desc) {
            desc = jp.desc;
            descFrom = 'jsdoc';
        }
        const type = normalizePropTypeExpr(e.typeExpr);
        const defaultValue = classifyDefaultValue(e.defaultExpr);
        const typeResolved = resolveTypeText(type, {
            local: localTable,
            global: globalTable,
            depth: 0,
            stack: [],
            unresolved,
        });
        return {
            name: e.name,
            kebab: kebabize(e.name),
            type,
            typeResolved,
            default: defaultValue.display,
            defaultKind: defaultValue.kind,
            required: e.required,
            desc,
            descFrom,
            commentKind: e.commentKind,
        };
    });

    // ---- events ----（defineEmits 多形态 + 类型引用展开；emit 调用识别别名与动态形态）
    const vueTypeDefs = new Map();
    for (const b of blocks) {
        if (/\bmodule=/.test(b.attrs)) continue;
        for (const [k, v] of scanTypeLikeDefs(b.content)) if (!vueTypeDefs.has(k)) vueTypeDefs.set(k, v);
    }
    const typesTypeDefs = rawTypes != null ? scanTypeLikeDefs(rawTypes) : new Map();
    const resolveTypeRef = (name) => vueTypeDefs.get(name) ?? typesTypeDefs.get(name) ?? null;
    const emits = parseEmits(cleanSetup, resolveTypeRef);
    const emitCallsRes = parseEmitCalls(cleanSetup);
    const emitCalls = emitCallsRes.names;
    if (!emits.declared && emitCalls.length > 0) {
        warnings.push('存在 emit 调用但未找到 defineEmits 声明（事件校验保守放行）');
    }
    const events = emits.events.map((e) => {
        const jd =
            jsdoc.events.get(e.name) ??
            jsdoc.events.get(kebabize(e.name)) ??
            jsdoc.events.get(camelize(e.name)) ??
            '';
        return { name: e.name, payload: e.payload, desc: jd };
    });
    const models = buildModels(props, emits.updates);

    // ---- slots / methods ----
    const slotMap = new Map();
    const slots = [];
    for (const s of jsdoc.slots) {
        if (slotMap.has(s.name)) continue;
        slotMap.set(s.name, true);
        slots.push({ name: s.name, desc: s.desc });
    }
    for (const s of parseTemplateSlots(rawTemplate)) {
        if (slotMap.has(s.name)) continue;
        slotMap.set(s.name, true);
        slots.push({ name: s.name, desc: '' });
    }
    const methods = parseExposedMethods(cleanSetup);

    // ---- 审计数据（仅 --audit 使用） ----
    let audit = null;
    if (keepAudit) {
        const declaredEventNames = new Set([...events.map((e) => e.name), ...emits.updates.map((u) => 'update:' + u.name)]);
        const callSet = new Set(emitCalls);
        const typesPropKebab = new Set(props.map((p) => p.kebab));
        const jsdocPropKeys = [...jsdoc.props.keys()];
        // 动态 emit（透传变量）或 opaque 声明（无法展开的类型引用）时，对账不可靠，保守放行
        const callAuditOk = !emitCallsRes.dynamic && !emits.opaque;
        audit = {
            hasTypesFile,
            hasDescription: description !== '',
            hasTutorial: jsdoc.tutorial !== '',
            propsTotal: props.length,
            propsNoDesc: props.filter((p) => p.desc === '').map((p) => p.name),
            propsTypesNoComment: props.filter((p) => p.descFrom === 'jsdoc').map((p) => p.name),
            jsdocPropsNotInTypes: jsdocPropKeys.filter((k) => !typesPropKebab.has(k) && !props.some((p) => p.name === k)),
            typesPropsNotInJsdoc: props.filter((p) => !jsdoc.props.has(p.kebab) && !jsdoc.props.has(p.name)).map((p) => p.name),
            eventsTotal: events.length + emits.updates.length,
            eventsNoDesc: events.filter((e) => e.desc === '').map((e) => e.name),
            hasDefineEmits: emits.declared,
            emitsOpaque: !!emits.opaque,
            emitCallsDynamic: emitCallsRes.dynamic,
            emitsNotDeclared: callAuditOk ? emitCalls.filter((n) => !declaredEventNames.has(n)) : [],
            emitsDeclaredNotCalled: callAuditOk ? [...declaredEventNames].filter((n) => !callSet.has(n)) : [],
            jsdocEventsNotInEmits: [...jsdoc.events.keys()].filter((k) => !declaredEventNames.has(k) && !declaredEventNames.has(camelize(k))),
        };
    }

    const hashInput = {
        props: props.map((p) => [
            p.name,
            p.kebab,
            p.type,
            p.typeResolved.kind,
            p.typeResolved.values ?? null,
            p.default ?? null,
            p.defaultKind,
            p.required,
        ]),
        events: events.map((e) => [e.name, e.payload]),
        models: models.map((m) => [m.name, m.channels.join('+'), m.updateEvent, m.default ?? null]),
        slots: slots.map((s) => s.name),
        methods: methods.map((m) => m.name),
    };

    return {
        name: compName,
        componentName,
        dir: dirRel,
        description,
        docUrl: jsdoc.tutorial || '',
        example: jsdoc.example || '',
        props,
        events,
        models,
        slots,
        methods,
        warnings,
        audit,
        unresolved: [...unresolved].sort(),
        apiHash: fingerprint(hashInput),
    };
}

/* ================================ 库加载 ================================ */

/**
 * 加载组件库全量 API 模型。
 * @param libRoot 组件库根目录（含 components/ 与 package.json，包名须为 uview-pro）
 * @param opts    { keepAudit?: boolean } --audit 模式保留组件审计数据
 * @returns LibraryModel：
 *   { libVersion, libHash, components: { name: ComponentApi }, symbols, errors, stats, unresolvedRefs }
 */
export function loadLibraryModel(libRoot, opts = {}) {
    const libAbs = path.resolve(libRoot);
    const pkgPath = path.join(libAbs, 'package.json');
    const pkg = readTextSafe(pkgPath);
    if (pkg == null) throw new Error(`组件库路径无效（缺少 package.json）：${libAbs}`);
    let pkgJson;
    try {
        pkgJson = JSON.parse(pkg);
    } catch (e) {
        throw new Error(`package.json 解析失败：${pkgPath}`);
    }
    if (pkgJson.name !== 'uview-pro') {
        throw new Error(`package.json 包名不是 uview-pro（实际：${pkgJson.name}）：${libAbs}`);
    }
    const componentsDir = path.join(libAbs, 'components');
    if (!fs.existsSync(componentsDir)) throw new Error(`组件库缺少 components/ 目录：${libAbs}`);

    const globalPath = path.join(libAbs, 'types', 'global.d.ts');
    const globalTable = fs.existsSync(globalPath) ? scanTypeAliases(readTextSafe(globalPath) || '') : new Map();

    const symbols = {};
    for (const [name, rhs] of [...globalTable.entries()].sort((a, b) => (a[0] < b[0] ? -1 : 1))) {
        const resolved = resolveTypeText(rhs, {
            local: new Map(),
            global: globalTable,
            depth: 0,
            stack: [name],
            unresolved: new Set(),
        });
        symbols[name] = resolved.kind === 'literalUnion'
            ? { kind: resolved.kind, values: resolved.values }
            : { kind: resolved.kind };
    }

    const dirs = fs
        .readdirSync(componentsDir, { withFileTypes: true })
        .filter((d) => d.isDirectory() && /^u-/.test(d.name))
        .map((d) => d.name)
        .sort();

    const components = {};
    const errors = [];
    const unresolvedRefs = new Set();
    for (const name of dirs) {
        try {
            const comp = extractComponent(libAbs, name, globalTable, !!opts.keepAudit);
            for (const r of comp.unresolved) unresolvedRefs.add(r);
            delete comp.unresolved;
            if (!opts.keepAudit) delete comp.audit;
            components[name] = comp;
        } catch (e) {
            errors.push({ component: name, message: e instanceof Error ? e.message : String(e) });
        }
    }

    const names = Object.keys(components).sort();
    const libHash = fingerprint(names.map((n) => [n, components[n].apiHash]));
    const stats = {
        components: names.length,
        props: names.reduce((n, k) => n + components[k].props.length, 0),
        events: names.reduce((n, k) => n + components[k].events.length, 0),
        models: names.reduce((n, k) => n + components[k].models.length, 0),
        slots: names.reduce((n, k) => n + components[k].slots.length, 0),
        methods: names.reduce((n, k) => n + components[k].methods.length, 0),
        warnings: names.reduce((n, k) => n + components[k].warnings.length, 0),
        requested: dirs.length,
    };

    return {
        libVersion: pkgJson.version || '0.0.0',
        libHash,
        components,
        symbols,
        errors,
        stats,
        unresolvedRefs: [...unresolvedRefs].sort(),
    };
}
