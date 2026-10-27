# uview-pro references 手册

## 本手册是什么

指导在**任意普通 uni-app 项目**（Vue3 + TypeScript，`.vue` 页面）中，使用 `uview-pro` 组件库（`u-*` 前缀）编写页面。覆盖链路：

```
安装接入 → 页面脚本（TS）→ 页面样式（SCSS / 主题）→ 组件使用 → 多端兼容
多语言国际化（spec/06）与多主题 / 暗黑模式（spec/07）为跨环节能力，按需查阅。
```

> **⚠️ 边界声明**：本手册服务普通 uni-app（`.vue` / TS / `u-*` 组件）。uni-app x 项目（`.uvue` / UTS / `ux-*` 组件）不适用——那是 **uview-pro-x** 技能的领域，两者写法完全不同，禁止混用。

## 权威源与优先级

1. **组件库源码** `uni_modules/uview-pro`（install API / `$u` / hooks / 各组件属性定义）——**源码可读时**为最终事实源
2. **API 快照卡片** `api/`（组件属性/取值/事件/v-model/插槽，随技能发货）——源码不可读时即权威
3. 本手册 `spec/`（按主题拆分，一个主题一个文件）
4. 本手册 `recipes/`（照抄写法）
5. 经验

**API 数据源细则**（A+B 双保险）：

- 写任何 `<u-*>` 前先查 `api/u-<name>.md` 卡片（卡上没有的写法不猜）；写完后必须跑 `node scripts/verify-u-usage.mjs <页面>` 至 0 违规。
- 卡片与 `api/model.json` 快照由 `scripts/gen-api-cards.mjs` 在**组件库源码可读时**一次生成、随技能发货（组件库改动后：`scripts/update-api.mjs` 一条命令重生成，流程见 `api/README.md`）；校验器默认零源码依赖。
- 源码可读的项目可传 `--lib <路径>` 现场比对实装库：版本/指纹不一致会提示「快照过旧」，此时**以实装库为准**并按 `api/README.md`「快照更新与版本升级流程」重生成；源码不可读时自动回退内置快照。
- 任何结论与权威源冲突时，以权威源为准。

> 本手册只描述**消费侧**正确用法，不描述组件库内部实现。
> 自增长约定：新踩坑 / 新写法新增独立文件并在下表登记，不并入既有文件。

## 文件索引

| 文件 | 定位 |
|---|---|
| `api/README.md` | 组件 API 卡片索引（组件 → 卡片；含快照再生成与版本升级流程） |
| `spec/01-install-and-setup.md` | 安装与接入：npm / 插件市场双方式、easycom、main.ts 注册、样式接入、Volar、install 选项全表 |
| `spec/02-page-script-ts.md` | 页面脚本：Vue3 组合式 + TS 写法、页面生命周期、`$u` 用法、模板绑定规则 |
| `spec/03-page-style-scss.md` | 页面样式：SCSS、单位、主题取色（CSS 变量 / SCSS 变量）、暗黑模式写法 |
| `spec/04-component-usage.md` | 组件使用约定、全量组件速查表（按分类）、`$u` 工具 / hooks / http 请求速查 |
| `spec/05-cross-platform.md` | 条件编译宏（权威清单）、多端红线表、症状→修法速查 |
| `spec/06-i18n-locale.md` | 多语言国际化：语言包注册与合并语义、locale API、默认语言优先级、组件内置文案联动 |
| `spec/07-theme-dark-mode.md` | 多主题与暗黑模式：主题注册形态、ConfigProvider API、CSS 变量、持久化、跟随系统 |
| `recipes/README.md` | 配方索引与 recipe-first 规则 |
| `recipes/recipe-page-scaffold.md` | 最小页面脚手架（路由注册 + 骨架 + 主题接入） |

## 自包含声明

本技能（`uview-pro/`）可整体复制到任意使用 uview-pro 的普通 uni-app 项目中独立使用。约定：

- `<u-*>` 组件依赖 easycom 免导入（接入见 `spec/01`）
- 不依赖任何特定宿主工程的目录、脚本或约定
- API 卡片与模型快照（`api/`）随技能发货；校验器 `scripts/verify-u-usage.mjs` 默认只读技能内置数据，零源码依赖、零第三方依赖（Node ≥ 18）
