---
name: "uview-pro"
description: "UView Pro 页面编写规范（消费侧自包含技能）——在任意普通 uni-app 项目中，用 uview-pro 组件库（u-* 前缀，Vue3 + TypeScript）编写页面：npm/uni_modules 安装接入、页面脚本 TS 写法、页面样式 SCSS 与主题取色、组件/$u/hooks/请求速查、多端兼容避错、多语言国际化、多主题与暗黑模式。写任何 u-* 组件前先查随技能发货的 API 卡片（references/api/，不依赖组件库源码）；写完页面必须跑 scripts/verify-u-usage.mjs 校验至 0 违规。规范正文按主题拆分在 references/spec/，照抄配方在 references/recipes/。⚠️ 本技能服务普通 uni-app 项目（.vue 页面 / TS / u-* 组件）；uni-app x 项目（.uvue / UTS / ux-* 组件）请改用 uview-pro-x 技能。当用户要求使用 uview-pro 编写或修改页面、规范 TS/SCSS 写法、接入多语言/换肤/暗黑模式、排查多端兼容与运行报错时使用。"
---

# UView Pro 页面编写规范（uview-pro）

> **本技能是「使用 uview-pro 组件库编写普通 uni-app 页面」的唯一权威入口。** 规范正文唯一权威源在 `references/`：
> `references/README.md`（手册索引）→ `references/spec/`（按主题拆分：接入 / TS / SCSS / 组件 / 多端 / 国际化 / 主题）+ `references/recipes/`（照抄写法）。
> 本技能面向**消费者**（使用组件库的项目），指导「页面怎么写」；不涉及组件库自身实现与开发流程。

## ⚠️ 适用边界（第一红线：不要与 uni-app x 混淆）

| | 本技能 uview-pro | 另一个技能 uview-pro-x |
|---|---|---|
| 项目类型 | 普通 uni-app（Vue3 + TS） | uni-app x（Vue3 + UTS） |
| 组件前缀 | `u-*`（uview-pro） | `ux-*`（uview-pro-x） |
| 页面文件 | `.vue` | `.uvue` |
| 语言 / 样式 | TypeScript / SCSS（全量 CSS） | UTS（强类型）/ UCSS（子集） |

- 目标项目是普通 uni-app → 本技能；目标项目是 uni-app x → 立即改用 **uview-pro-x** 技能（两者写法完全不同，禁止混用）。
- 识别信号：项目中存在 `.uvue` 文件、`UTSJSONObject`、`ux-*` 组件、`main.uts` 时，说明这是 uni-app x 项目，本技能不适用。

## 适用场景

- 在普通 uni-app 项目（Vue3 + TS，`.vue` 页面）中使用 `u-*` 组件编写业务页面
- 需要 TS/SCSS 页面写法规范、多端（App / H5 / 微信等小程序）兼容、不出现运行期报错
- 不适用：修改组件库源码本身（那是另一个技能域的职责）；uni-app x 项目（见上表）

## 强制机制（动手前必读）

1. **单一权威源**：规范正文只在本技能 `references/`；组件 API 以 `references/api/` 快照卡片为准。组件库源码可读时可 `--lib` 比对（冲突以源码为准并重生成快照）；**源码不可读时快照即权威**（优先级细则见 `references/README.md`）。
2. **自包含**：本技能可整体复制到任意使用 uview-pro 的普通 uni-app 项目中独立使用；不依赖任何特定宿主工程的目录、脚本或约定；API 快照与卡片随技能发货，校验器零源码依赖。
3. **recipe-first**：`references/recipes/` 中已有对应场景的配方时**必须采用**，禁止自造写法。
4. **取色走主题**：所有颜色取自 `$u.color.*`、CSS 变量 `var(--u-*)` 或 SCSS 变量 `$u-*`，不硬编码色值（多主题与暗黑模式才能生效）。
5. **多端红线自查**：收尾时逐条核对 `references/spec/05-cross-platform.md` 的红线表与症状速查表。
6. **写前查卡片**：写任何 `<u-*>` 前先查 `references/api/u-<name>.md` 卡片（属性/取值/事件/v-model/插槽一页俱全，**随技能发货、不依赖项目内组件库源码**）；卡上没有的写法不猜。
7. **写后必校验**：页面写完/改动后必须运行 `node scripts/verify-u-usage.mjs <页面文件或目录>`，**0 违规才算完成**；报 error 逐条改到 0 再交付。

## references 结构索引

| 文件 | 职责 |
|---|---|
| `references/spec/01-install-and-setup.md` | 安装（npm / uni_modules 双方式）、easycom、main.ts 注册、样式接入、Volar、install 选项全表 |
| `references/spec/02-page-script-ts.md` | 页面脚本 TS：Vue3 组合式写法、页面生命周期、`$u` 用法、模板绑定规则 |
| `references/spec/03-page-style-scss.md` | 页面样式 SCSS：单位、主题取色（CSS 变量 / SCSS 变量）、暗黑模式写法 |
| `references/spec/04-component-usage.md` | 组件使用约定、全量组件速查表、`$u` 工具 / hooks / http 请求速查、常用示例 |
| `references/spec/05-cross-platform.md` | 条件编译宏清单（权威）、多端红线表、症状→修法速查 |
| `references/spec/06-i18n-locale.md` | 多语言国际化：语言包注册与合并语义、locale API、默认语言优先级、组件内置文案联动 |
| `references/spec/07-theme-dark-mode.md` | 多主题与暗黑模式：主题注册形态、ConfigProvider API、CSS 变量、持久化、跟随系统 |
| `references/recipes/recipe-page-scaffold.md` | 消费者视角最小页面（路由注册 + 骨架 + 主题接入） |
| `references/api/README.md` | 组件 API 卡片索引（含快照再生成与版本升级流程） |
| `scripts/gen-api-cards.mjs` | API 快照/卡片生成器（组件库源码可读时重生成；生成物随技能发货） |
| `scripts/update-api.mjs` | 一条命令更新快照与卡片：重生成 → 一致性核对（库维护者用，消费侧不需要） |
| `scripts/verify-u-usage.mjs` | 页面写法校验器（默认读内置快照，写后 0 违规门禁） |

## 工作流

1. 读 `spec/01` 完成接入（安装 / easycom / 注册 / 样式）
2. 参照 `recipe-page-scaffold` 起页面骨架
3. 写每个 `<u-*>` 前查 `references/api/u-<name>.md` 卡片，核对属性/取值/事件/v-model/插槽
4. 按 `spec/04` 选组件与工具、按 `spec/02` 写脚本、按 `spec/03` 写样式
5. 收尾按 `spec/05` 红线与症状表自查
6. 运行 `node scripts/verify-u-usage.mjs <页面文件>` 校验至 **0 违规**（error 必须清零）

> 全部示例均为消费者视角：`<u-*>` 组件依赖 easycom 免手动 import（接入见 `spec/01`）。
