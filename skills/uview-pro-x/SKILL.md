---
name: "uview-pro-x"
description: "UView Pro X 页面编写规范（消费侧自包含技能）——在任意 uni-app x 项目中，用 uview-pro-x 组件库编写页面：安装接入、页面脚本 UTS 规范、页面样式 UCSS 与主题、组件/$u/hooks 速查、多语言国际化、多主题与暗黑模式、三端兼容避错。写任何 ux-* 组件前先查随技能发货的 API 卡片（references/api/，不依赖组件库源码）；写完页面必须跑 scripts/verify-ux-usage.mjs 校验至 0 违规。规范正文按主题拆分在 references/spec/，照抄配方在 references/recipes/。当用户要求使用 uview-pro-x 编写或修改页面、规范 UTS/UCSS 写法、接入多语言/换肤/暗黑模式、排查三端兼容与运行报错时使用。"
---

# UView Pro X 页面编写规范（uview-pro-x）

> **本技能是「使用 uview-pro-x 组件库编写页面」的唯一权威入口。** 规范正文唯一权威源在 `references/`：
> `references/README.md`（手册索引）→ `references/spec/`（按主题拆分：接入 / UTS / UCSS / 组件 / 三端）+ `references/recipes/`（照抄写法）。
> 本技能面向**消费者**（使用组件库的项目），指导「页面怎么写」；不涉及组件库自身实现与开发流程。

## 适用场景

- 在 uni-app x 项目（Vue3 + UTS，`.uvue` 页面）中使用 `ux-*` 组件编写业务页面
- 需要 UTS/UCSS 写法规避高频陷阱、三端（App / H5 / 小程序）兼容、不出现运行期报错
- 不适用：修改组件库源码本身（那是另一个技能域的职责）

## 强制机制（动手前必读）

1. **单一权威源**：规范正文只在本技能 `references/`；组件 API 以 `references/api/` 快照卡片为准。组件库源码可读时可 `--lib` 比对（冲突以源码为准并重生成快照）；**源码不可读（加密）时快照即权威**（优先级细则见 `references/README.md`）。
2. **自包含**：本技能可整体复制到任意使用 uview-pro-x 的 uni-app x 项目中独立使用；不依赖任何特定宿主工程的目录、脚本或约定；API 快照与卡片随技能发货，校验器零源码依赖。
3. **recipe-first**：`references/recipes/` 中已有对应场景的配方时**必须采用**，禁止自造写法。
4. **取色走主题**：所有颜色取自 `$u-*` SCSS 变量或 `$u.color.*`，不硬编码色值（暗黑模式与换肤才能生效）。
5. **三端红线自查**：收尾时逐条核对 `references/spec/05-cross-platform.md` 的红线表与症状速查表。
6. **写前查卡片**：写任何 `<ux-*>` 前先查 `references/api/ux-<name>.md` 卡片（属性/取值/事件/v-model/插槽一页俱全，**随技能发货、不依赖项目内组件库源码**，源码加密的项目同样可用）；卡上没有的写法不猜。
7. **写后必校验**：页面写完/改动后必须运行 `node scripts/verify-ux-usage.mjs <页面文件或目录>`，**0 违规才算完成**；报 error 逐条改到 0 再交付（默认用技能内置 API 快照；组件库源码可读的项目可加 `--lib` 用实装库比对）。

## references 结构索引

| 文件 | 职责 |
|---|---|
| `references/spec/01-install-and-setup.md` | 安装、easycom、main.uts 注册、样式接入、install 选项全表 |
| `references/spec/02-page-script-uts.md` | 页面脚本 UTS：组合式写法、类型陷阱 ❌/✅、模板绑定规则、生命周期 |
| `references/spec/03-page-style-ucss.md` | 页面样式 UCSS：选择器/属性红线、布局陷阱、文本省略双轨、主题取色、暗黑模式 |
| `references/spec/04-component-usage.md` | 组件使用约定、全量组件速查表、$u 工具与 hooks 速查、常用示例 |
| `references/spec/05-cross-platform.md` | 条件编译宏清单（权威）、三端红线、症状→修法速查 |
| `references/spec/06-i18n-locale.md` | 多语言国际化：语言包注册、useLocale API、默认语言优先级、组件内置文案联动 |
| `references/spec/07-theme-dark-mode.md` | 多主题与暗黑模式：注册四形态、Theme 结构、暗色板自动生成、useTheme API、页面联动 |
| `references/recipes/recipe-page-scaffold.md` | 消费者视角最小页面（路由注册 + 骨架 + 主题绑定） |
| `references/recipes/recipe-page-scroll.md` | 三端滚动监听与返回顶部绑定 |
| `references/api/README.md` | 组件 API 卡片索引（77 组件 → 卡片；含快照再生成与版本升级流程） |
| `scripts/gen-api-cards.mjs` | API 快照/卡片生成器（组件库源码可读时重生成；生成物随技能发货） |
| `scripts/update-api.mjs` | 一条命令更新快照与卡片：重生成 → 一致性核对 → 语料回归（库维护者用，消费侧不需要） |
| `scripts/verify-ux-usage.mjs` | 页面写法校验器（默认读内置快照，写后 0 违规门禁） |

## 工作流

1. 读 `spec/01` 完成接入（安装 / easycom / 注册 / 样式）
2. 参照 `recipe-page-scaffold` 起页面骨架
3. 写每个 `<ux-*>` 前查 `references/api/ux-<name>.md` 卡片，核对属性/取值/事件/v-model/插槽
4. 按 `spec/04` 选组件与工具、按 `spec/02` 写脚本、按 `spec/03` 写样式
5. 收尾按 `spec/05` 红线与症状表自查
6. 运行 `node scripts/verify-ux-usage.mjs <页面文件>` 校验至 **0 违规**（error 必须清零）

> 全部示例均为消费者视角：导入以 `@/uni_modules/uview-pro-x` 为前缀，`<ux-*>` 组件依赖 easycom 免手动 import。
