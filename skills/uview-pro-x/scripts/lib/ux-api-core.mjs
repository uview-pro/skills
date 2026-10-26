#!/usr/bin/env node
/**
 * uview-pro-x 组件 API 解析核心（零依赖，Node >= 18）
 * ------------------------------------------------------------------
 * 从 uview-pro-x 组件库源码提取全量 API 模型（LibraryModel）：
 *   components/ux-<name>/ux-<name>.uvue + types.uts  →  props / events / models / slots /
 *   externalClasses / methods，附 canoical 指纹（apiHash / libHash）与 did-you-mean 工具。
 *
 * 供两个消费者复用：
 *   - gen-api-cards.mjs   卡片生成（author-time 提取 → model.json + references/api/*.md）
 *   - verify-ux-usage.mjs 用法校验（消费侧默认读内置快照 model.json，本核心仅在
 *                         源码可读（--lib）时由校验器调用做实时提取比对）
 *
 * 设计约束：
 *   - 只依赖 node 内置模块（fs / path / crypto）；Windows 路径安全（path.join/resolve，输出正斜杠）
 *   - 解析采用「正则 + 引号感知的块切片」：不做 AST，但对本库高度统一的写法（100% export type
 *     XxxProps + withDefaults + 行式 defineEmits）已足够，且能容忍注释/字符串内的括号与分号
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

/** 按顶层分隔符切分（跳过字符串、注释与 ()/[]/{} 嵌套） */
export function splitTopLevelSmart(src, sep) {
    const cls = classify(src);
    const out = [];
    let depth = 0;
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
        if (c === sep && depth === 0) {
            out.push(cur);
            cur = '';
            continue;
        }
        cur += c;
    }
    out.push(cur);
    return out;
}

/** 顶层（跳过字符串、注释与嵌套括号）第一个 sep 的位置，找不到返回 -1 */
export function topLevelIndexOf(src, sep) {
    const cls = classify(src);
    let depth = 0;
    for (let i = 0; i < src.length; i++) {
        if (cls[i] !== CLS_NORMAL) continue;
        const c = src[i];
        if (c === '(' || c === '{' || c === '[') depth++;
        else if (c === ')' || c === '}' || c === ']') depth--;
        else if (c === sep && depth === 0) return i;
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
    'UTSJSONObject', 'RegExp', 'Promise', 'Array', 'Map', 'Set', 'Function', 'Ref',
    'UniEvent', 'UniTouchEvent', 'UniScrollEvent', 'UniElement', 'UniButtonElement',
    'UniInputElement', 'UniTextareaElement', 'UniImageElement', 'UniVideoElement',
    'DateTime', 'Date', 'Record',
]);

const OPAQUE = { kind: 'opaque', values: null };

const STR_LIT_RE = /^'([\s\S]*)'$/;
const DQ_STR_LIT_RE = /^"([\s\S]*)"$/;
const NUM_LIT_RE = /^-?\d+(?:\.\d+)?$/;
const IDENT_RE = /^[A-Za-z_$][\w$]*$/;

/**
 * 解析类型文本 → { kind: 'literalUnion' | 'boolean' | 'object' | 'function' | 'opaque', values? }
 * 别名沿 局部 types.uts → types/global.uts 逐层展开（局部同名遮蔽全局，最多 8 层，环安全）。
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

/** 扫描 export type 别名：name → RHS 原文（注释已剥离） */
function scanTypeAliases(src) {
    const clean = stripCommentsSmart(src);
    const re = /export\s+type\s+([A-Za-z_$][\w$]*)\s*=\s*/g;
    const marks = [];
    let m;
    // 切片终点必须用「下一条声明的起笔位置 declStart」，不能用 re.lastIndex
    // （lastIndex 已越过下一条的 `export type Xxx = `，会把其前缀混进上一条的 RHS，导致别名退化为 opaque）
    while ((m = re.exec(clean))) marks.push({ name: m[1], rhsStart: re.lastIndex, declStart: m.index });
    const out = new Map();
    for (let i = 0; i < marks.length; i++) {
        const end = i + 1 < marks.length ? marks[i + 1].declStart : clean.length;
        const rhs = clean.slice(marks[i].rhsStart, end).replace(/[\s;]+$/, '').trim();
        if (rhs !== '') out.set(marks[i].name, rhs);
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

/** 解析组件头 JSDoc：@description / @property / @slot / @event（另收首个 @tag 前的标题行 leading 作描述兜底） */
function parseJsDoc(block) {
    const out = { description: '', leading: '', props: new Map(), slots: [], events: new Map() };
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
            } else {
                mode = null;
            }
        } else if (mode === 'desc') {
            desc.push(line.trim());
        } else if (leadingMode && line.trim() !== '') {
            out.leading = out.leading === '' ? line.trim() : out.leading + ' ' + line.trim();
        }
    }
    // 多行 description 拼接：中文标点（；。，、：）后的连接空格去掉，避免「效果； 纯文字」式空档
    out.description = desc.join(' ').replace(/\s+/g, ' ').replace(/([；。，、：])\s+/g, '$1').trim();
    return out;
}

/**
 * 组件描述兜底：头部 JSDoc 无 @description 时，采用首个 @tag 前的标题行（库约定风格如「navbar 自定义导航栏」，
 * 见合规样板 ux-navbar）。仅当标题行以组件名（ux-<name> 或 <name>）开头才采纳并剥去该名——
 * 以此排除恰好悬在 defineOptions 上方的错位杂注释（如「根节点样式」「z-index」「显示顶部提示」）。
 */
function resolveDescription(compName, jsdoc) {
    if (jsdoc.description !== '') return jsdoc.description;
    const lead = jsdoc.leading;
    if (!lead) return '';
    const short = compName.replace(/^ux-/, '');
    let rest = null;
    if (lead.toLowerCase().startsWith(('ux-' + short).toLowerCase())) {
        rest = lead.slice(('ux-' + short).length);
    } else {
        const esc = short.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const m = new RegExp('^' + esc + '(?![A-Za-z0-9-])', 'i').exec(lead);
        if (m) rest = lead.slice(m[0].length);
    }
    if (rest == null) return '';
    return rest.replace(/^[\s:：,，.。-]+/, '').trim();
}

/* ================================ 组件级解析 ================================ */

/**
 * 截取文件中的某个 <tag ...>...</tag> 区段（uvue 的 template / script），不含则返回 null。
 * template 用「首个开标签 → 末个闭标签」定位：模板内嵌 <template #xxx> / v-if 块会让非贪婪匹配
 * 在首个内层 </template> 处提前收口，导致其后的 <slot> 漏扫
 */
function section(src, tag) {
    if (tag === 'template') {
        const open = new RegExp('<' + tag + '(?:\\s[^>]*)?>').exec(src);
        if (!open) return null;
        const start = open.index + open[0].length;
        const end = src.lastIndexOf('</' + tag + '>');
        return end > start ? src.slice(start, end) : null;
    }
    const re = new RegExp('<' + tag + '(?:\\s[^>]*)?>([\\s\\S]*?)</' + tag + '>');
    const m = src.match(re);
    if (!m) return null;
    return m[1];
}

/**
 * 解析 props 类型块（优先 defineProps 泛型名对应的 export type，其次内联对象）。
 * 定位在「剥注释文本」上做（括号配对天然跳过注释干扰），但返回的 block 内容从**原文**切片——
 * stripCommentsSmart 保持长度，故 clean 上算出的索引在原文同样有效；若直接切 clean 文本，
 * 属性上方的 /** 说明注释会全部变成空格，types.uts 里的 desc 永远取不到。
 */
function extractPropsBlock(cleanScript, rawScript, cleanTypes, rawTypes) {
    const named = cleanScript.match(/defineProps\s*<\s*([A-Za-z_$][\w$]*)\s*>/);
    if (named) {
        const typeName = named[1];
        const re = new RegExp('export\\s+type\\s+' + typeName + '\\s*=\\s*\\{');
        const pairs = [];
        if (cleanTypes != null) pairs.push([cleanTypes, rawTypes]);
        pairs.push([cleanScript, rawScript]);
        for (const [clean, raw] of pairs) {
            const mm = re.exec(clean);
            if (!mm) continue;
            const braceIdx = clean.indexOf('{', mm.index);
            const block = balancedSmart(clean, braceIdx, '{', '}');
            if (block) return { typeName, block: raw.slice(braceIdx + 1, block.end) };
        }
        return { typeName, block: null };
    }
    const inline = cleanScript.match(/defineProps\s*<\s*\{/);
    if (inline) {
        const braceIdx = cleanScript.indexOf('{', inline.index);
        const block = balancedSmart(cleanScript, braceIdx, '{', '}');
        if (block) return { typeName: null, block: rawScript.slice(braceIdx + 1, block.end) };
    }
    return { typeName: null, block: null };
}

const PROP_ENTRY_RE = /^([A-Za-z_$][\w$]*)\s*(\??)\s*:\s*([\s\S]+)$/;
/** 属性声明行起点：标识符 + 可选 ? + :（如 `customStyle?: UTSJSONObject`） */
const PROP_START_RE = /^[A-Za-z_$][\w$]*\s*\??\s*:/;

/**
 * 行级代码扫描（跨行块注释状态感知）：每行给出
 *   code —— 去掉字符串与注释后的结构文本（供声明行判定与括号计数）
 *   commentStart —— 该行以 /** 开头（行首 JSDoc，归入其后的属性条目）
 * 字符串按行内闭合处理（库内为单行字面量）；块注释状态跨行传递，
 * 多行注释续行内的任何括号都不会污染深度计数。
 */
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

/** 结构文本的括号深度增量（用于跨行类型的行级深度跟踪） */
function codeDelta(code) {
    let d = 0;
    for (const c of code) {
        if (c === '(' || c === '{' || c === '[') d++;
        else if (c === ')' || c === '}' || c === ']') d--;
    }
    return d;
}

/**
 * 块内按「新属性起点」切分，兼容两种书写风格：
 *   - 分号风格（`foo?: string;` 逐条，外层 splitTopLevelSmart(';') 后每块即单条）
 *   - 换行风格（`foo?: string` 逐行无分号，如 ux-alert-tips/types.uts —— 仅按 ';' 切会整块粘成一条，静默漏解析）
 * 行首 JSDoc 注释归入其后一条属性；多行类型（联合/对象字面量/函数签名）不误切。
 */
function splitByPropStarts(chunk) {
    const out = [];
    let buf = [];
    let bufHasDecl = false;
    let depth = 0;
    const flush = () => {
        if (buf.length > 0 && bufHasDecl) out.push(buf.join('\n'));
        buf = [];
        bufHasDecl = false;
    };
    const rawLines = chunk.split('\n');
    const scanned = scanCodeLines(chunk);
    for (let li = 0; li < rawLines.length; li++) {
        const { code, commentStart } = scanned[li];
        const atTop = depth === 0;
        const isDecl = atTop && PROP_START_RE.test(code);
        const isCommentStart = atTop && commentStart;
        if ((isDecl || isCommentStart) && bufHasDecl) flush();
        if (isDecl) bufHasDecl = true;
        buf.push(rawLines[li]);
        depth += codeDelta(code);
    }
    flush();
    return out;
}

/** 深度 0 的属性声明行计数（与解析结果对账，防静默漏解析） */
function countPropDeclLines(blockInner) {
    let count = 0;
    let depth = 0;
    for (const { code } of scanCodeLines(blockInner)) {
        if (depth === 0 && PROP_START_RE.test(code)) count++;
        depth += codeDelta(code);
    }
    return count;
}

function parsePropEntries(blockInner) {
    const out = [];
    const chunks = [];
    for (const big of splitTopLevelSmart(blockInner, ';')) chunks.push(...splitByPropStarts(big));
    for (const raw of chunks) {
        let entry = raw.trim();
        if (!entry) continue;
        let comment = '';
        const cm = entry.match(/^\/\*\*([\s\S]*?)\*\/\s*/);
        if (cm) {
            comment = compactJsdoc(cm[1]);
            entry = entry.slice(cm[0].length).trim();
        }
        entry = stripCommentsSmart(entry).trim();
        const m = entry.match(PROP_ENTRY_RE);
        if (!m) continue;
        out.push({
            name: m[1],
            required: m[2] !== '?',
            type: m[3].trim().replace(/\s+/g, ' ').replace(/;$/, '').trim(),
            comment,
        });
    }
    return out;
}

/** 找 withDefaults(defineProps<...>(), {...}) 的实参括号 */
function findWithDefaultsCall(cleanScript) {
    let from = 0;
    while (true) {
        const wi = cleanScript.indexOf('withDefaults', from);
        if (wi < 0) return null;
        const pi = cleanScript.indexOf('(', wi);
        if (pi < 0) return null;
        const paren = balancedSmart(cleanScript, pi, '(', ')');
        if (!paren) return null;
        if (paren.inner.includes('defineProps')) return paren;
        from = wi + 1;
    }
}

/**
 * 解析 withDefaults 的默认值。入参须为**原文**（非剥注释文本）：
 * 内部扫描器皆注释感知，而属性上方的 /** 说明注释需原样保留以便收录为 desc 兜底源。
 */
function parseDefaults(rawScript) {
    const out = new Map();
    const call = findWithDefaultsCall(rawScript);
    if (!call) return out;
    const inner = call.inner;
    const dpi = inner.indexOf('defineProps');
    if (dpi < 0) return out;
    let afterProps = -1;
    const lt = inner.indexOf('<', dpi);
    if (lt >= 0) {
        const generic = balancedSmart(inner, lt, '<', '>');
        if (!generic) return out;
        afterProps = generic.end;
    } else {
        afterProps = dpi;
    }
    const pIdx = inner.indexOf('(', afterProps);
    if (pIdx < 0) return out;
    const callParen = balancedSmart(inner, pIdx, '(', ')');
    if (!callParen) return out;
    const braceIdx = inner.indexOf('{', callParen.end);
    if (braceIdx < 0) return out;
    const obj = balancedSmart(inner, braceIdx, '{', '}');
    if (!obj) return out;
    for (const raw of splitTopLevelSmart(obj.inner, ',')) {
        let entry = raw.trim();
        if (!entry) continue;
        let comment = '';
        const cm = entry.match(/^\/\*\*([\s\S]*?)\*\/\s*/);
        if (cm) {
            comment = compactJsdoc(cm[1]);
            entry = entry.slice(cm[0].length).trim();
        }
        entry = stripCommentsSmart(entry).trim();
        const ci = topLevelIndexOf(entry, ':');
        if (ci < 0) continue;
        const key = entry.slice(0, ci).trim();
        const value = entry.slice(ci + 1).trim().replace(/\s+/g, ' ');
        if (!IDENT_RE.test(key) || value === '') continue;
        out.set(key, { comment, value });
    }
    return out;
}

/** 解析 defineEmits 的类型化签名：返回 { events, updates, typed } */
function parseEmits(cleanScript) {
    const typedStart = cleanScript.match(/defineEmits\s*</);
    if (!typedStart) return { events: [], updates: [], typed: false };
    const braceIdx = cleanScript.indexOf('{', typedStart.index);
    if (braceIdx < 0) return { events: [], updates: [], typed: false };
    const block = balancedSmart(cleanScript, braceIdx, '{', '}');
    if (!block) return { events: [], updates: [], typed: false };
    const events = [];
    const updates = [];
    const startRe = /\(\s*e\s*:/g;
    let m;
    while ((m = startRe.exec(block.inner))) {
        const paren = balancedSmart(block.inner, m.index, '(', ')');
        if (!paren) break;
        const sig = paren.inner.replace(/\s+/g, ' ').trim();
        const nm = sig.match(/^e\s*:\s*(?:'([^']+)'|"([^"]+)")\s*(?:,\s*([\s\S]*))?$/);
        if (nm) {
            const name = nm[1] != null ? nm[1] : nm[2];
            const payload = nm[3] ? nm[3].trim() : '';
            if (name.startsWith('update:')) updates.push({ name: name.slice('update:'.length), payload });
            else events.push({ name, payload });
        }
        startRe.lastIndex = paren.end;
    }
    return { events, updates, typed: true };
}

/** 解析 defineModel 调用：返回 [{ name, default }] */
function parseDefineModels(cleanScript) {
    const out = [];
    const re = /defineModel\s*(?:<[^<>]*>)?\s*\(/g;
    let m;
    while ((m = re.exec(cleanScript))) {
        const parenIdx = m.index + m[0].length - 1;
        const args = balancedSmart(cleanScript, parenIdx, '(', ')');
        if (!args) continue;
        const parts = splitTopLevelSmart(args.inner, ',');
        const first = (parts[0] || '').trim();
        let name = 'modelValue';
        let def = null;
        if (first.startsWith("'") || first.startsWith('"')) name = first.slice(1, -1);
        const opts = parts.slice(1).join(',').trim();
        if (opts.startsWith('{')) {
            const nm = opts.match(/name\s*:\s*'([^']+)'/) || opts.match(/name\s*:\s*"([^"]+)"/);
            if (nm) name = nm[1];
            const dm = opts.match(/default\s*:\s*([^,}]+)/);
            if (dm) def = dm[1].trim();
        }
        out.push({ name, default: def });
    }
    return out;
}

function buildModels(props, updates, defineModels) {
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
            updateEvent: 'update:modelValue',
            default: mv ? mv.default : null,
        });
        seen.add('modelValue');
    }
    for (const dm of defineModels) {
        if (seen.has(dm.name)) continue;
        models.push({
            name: dm.name,
            channels: ['defineModel'],
            propName: dm.name,
            updateEvent: 'update:' + dm.name,
            default: dm.default,
        });
        seen.add(dm.name);
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
    // ③ 可见性开关 prop（全库约定名 show，除 overlay/popup 走 defineModel 外均为单向 prop）：
    //    记 channels=['prop']、updateEvent=null，卡片与校验器据此提示「该 prop 不支持 v-model」
    for (const p of props) {
        if (p.name !== 'show' || seen.has('show')) continue;
        models.push({
            name: 'show',
            channels: ['prop'],
            propName: 'show',
            updateEvent: null,
            default: p.default,
        });
        seen.add('show');
    }
    return models;
}

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
            out.push({ name, fromTemplate: true });
        }
    }
    return out;
}

function parseExternalClasses(cleanScript) {
    const m = cleanScript.match(/externalClasses\s*:\s*\[([\s\S]*?)\]/);
    if (!m) return [];
    return [...m[1].matchAll(/['"]([^'"]+)['"]/g)].map((x) => x[1]);
}

function parseExposedMethods(cleanScript) {
    const idx = cleanScript.indexOf('defineExpose');
    if (idx < 0) return [];
    const pi = cleanScript.indexOf('(', idx);
    if (pi < 0) return [];
    const args = balancedSmart(cleanScript, pi, '(', ')');
    if (!args) return [];
    const inner = args.inner.trim();
    if (!inner.startsWith('{')) return [];
    const oi = inner.indexOf('{');
    const obj = balancedSmart(inner, oi, '{', '}');
    if (!obj) return [];
    const out = [];
    for (const raw of splitTopLevelSmart(obj.inner, ',')) {
        let e = raw.trim();
        if (!e || e.startsWith('...')) continue;
        const ci = topLevelIndexOf(e, ':');
        let key = ci >= 0 ? e.slice(0, ci).trim() : e;
        key = key.replace(/^['"]|['"]$/g, '');
        if (key === 'props') continue;
        if (!IDENT_RE.test(key)) continue;
        out.push({ name: key });
    }
    return out;
}

/* ================================ 组件提取 ================================ */

const PROPS_BLOCK_MISSING = 'props-type-block-missing';

function extractComponent(libAbs, compName, globalTable) {
    const dirRel = toPosix(path.join('components', compName));
    const dirAbs = path.join(libAbs, 'components', compName);
    const uvuePath = path.join(dirAbs, compName + '.uvue');
    const typesPath = path.join(dirAbs, 'types.uts');
    const warnings = [];
    if (!fs.existsSync(uvuePath)) throw new Error(`缺少组件主文件：${compName}.uvue`);

    const rawAll = readTextSafe(uvuePath) || '';
    const rawTemplate = section(rawAll, 'template') ?? rawAll;
    const rawScript = section(rawAll, 'script') ?? rawAll;
    const cleanScript = stripCommentsSmart(rawScript);
    const rawTypes = readTextSafe(typesPath);
    const cleanTypes = rawTypes == null ? null : stripCommentsSmart(rawTypes);

    const jsdocBlock =
        jsDocBefore(rawScript, cleanScript, /defineOptions\s*\(/) ??
        jsDocBefore(rawScript, cleanScript, /withDefaults\s*\(/) ??
        jsDocBefore(rawScript, cleanScript, /defineProps\s*</);
    const jsdoc = parseJsDoc(jsdocBlock);
    const description = resolveDescription(compName, jsdoc);

    const propsBlock = extractPropsBlock(cleanScript, rawScript, cleanTypes, rawTypes);
    if (propsBlock.typeName && propsBlock.block == null) {
        warnings.push(`未找到 props 类型块「${propsBlock.typeName}」`);
    }
    const entries = propsBlock.block != null ? parsePropEntries(propsBlock.block) : [];
    if (propsBlock.block != null) {
        // 对账自检：声明行数与解析条目数不一致即告警（防「整块粘成一条」式静默漏解析在库演进中回归）
        const declCount = countPropDeclLines(propsBlock.block);
        if (declCount !== entries.length) {
            warnings.push(`props 条目数对账不一致：声明行 ${declCount} 条 vs 解析 ${entries.length} 条`);
        }
    }
    const defaults = parseDefaults(rawScript);

    const unresolved = new Set();
    const localTable = rawTypes != null ? scanTypeAliases(rawTypes) : new Map();
    const props = entries.map((e) => {
        const d = defaults.get(e.name);
        const jpKebab = jsdoc.props.get(kebabize(e.name));
        const jpCamel = jsdoc.props.get(e.name);
        const jp = jpKebab ?? jpCamel ?? null;
        let desc = '';
        let descFrom = null;
        // 优先 types.uts：它是属性声明契约，且实证更新最及时（withDefaults 内联注释常为滞后复制）；
        // defaults / jsdoc 依次兜底，保证无 types 注释的属性仍能拿到说明
        if (e.comment) {
            desc = e.comment;
            descFrom = 'types';
        } else if (d && d.comment) {
            desc = d.comment;
            descFrom = 'defaults';
        } else if (jp && jp.desc) {
            desc = jp.desc;
            descFrom = 'jsdoc';
        }
        const rawDefault = d ? d.value : null;
        const defaultKind =
            rawDefault == null ? 'absent' : rawDefault.includes('=>') || rawDefault.startsWith('(') ? 'factory' : 'literal';
        const typeResolved = resolveTypeText(e.type, {
            local: localTable,
            global: globalTable,
            depth: 0,
            stack: [],
            unresolved,
        });
        return {
            name: e.name,
            kebab: kebabize(e.name),
            type: e.type,
            typeResolved,
            default: rawDefault,
            defaultKind,
            required: e.required,
            desc,
            descFrom,
        };
    });

    const emits = parseEmits(cleanScript);
    if (!emits.typed && /\bemit\s*\(/.test(cleanScript)) {
        warnings.push('无类型化 defineEmits 声明（事件校验保守放行）');
    }
    const events = emits.events.map((e) => {
        const jd =
            jsdoc.events.get(e.name) ??
            jsdoc.events.get(kebabize(e.name)) ??
            jsdoc.events.get(camelize(e.name)) ??
            '';
        return { name: e.name, payload: e.payload, desc: jd };
    });
    const models = buildModels(props, emits.updates, parseDefineModels(cleanScript));

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

    const externalClasses = parseExternalClasses(cleanScript);
    const methods = parseExposedMethods(cleanScript);

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
        externalClasses,
        methods: methods.map((m) => m.name),
    };

    return {
        name: compName,
        dir: dirRel,
        description,
        props,
        events,
        models,
        slots,
        externalClasses,
        methods,
        warnings,
        unresolved: [...unresolved].sort(),
        apiHash: fingerprint(hashInput),
    };
}

/* ================================ 库加载 ================================ */

/**
 * 加载组件库全量 API 模型。
 * @param libRoot 组件库根目录（含 components/ 与 package.json，包名须为 uview-pro-x）
 * @returns LibraryModel：
 *   { libVersion, libHash, components: { name: ComponentApi }, symbols, errors, stats, unresolvedRefs }
 */
export function loadLibraryModel(libRoot) {
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
    if (pkgJson.name !== 'uview-pro-x') {
        throw new Error(`package.json 包名不是 uview-pro-x（实际：${pkgJson.name}）：${libAbs}`);
    }
    const componentsDir = path.join(libAbs, 'components');
    if (!fs.existsSync(componentsDir)) throw new Error(`组件库缺少 components/ 目录：${libAbs}`);

    const globalPath = path.join(libAbs, 'types', 'global.uts');
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
        .filter((d) => d.isDirectory() && /^ux-/.test(d.name))
        .map((d) => d.name)
        .sort();

    const components = {};
    const errors = [];
    const unresolvedRefs = new Set();
    for (const name of dirs) {
        try {
            const comp = extractComponent(libAbs, name, globalTable);
            for (const r of comp.unresolved) unresolvedRefs.add(r);
            delete comp.unresolved;
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
