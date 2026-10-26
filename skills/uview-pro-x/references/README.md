# uview-pro-x references 手册

## 本手册是什么

指导在**任意 uni-app x 项目**中，使用 `uview-pro-x` 组件库编写页面。覆盖链路：

```
安装接入 → 页面脚本（UTS）→ 页面样式（UCSS / 主题）→ 组件使用 → 三端兼容
多语言国际化（spec/06）与多主题 / 暗黑模式（spec/07）为跨环节能力，按需查阅。
```

## 权威源与优先级

1. **组件库源码** `uni_modules/uview-pro-x`（install API / `$u` / hooks / 各组件属性定义）——**源码可读时**为最终事实源
2. **API 快照卡片** `api/`（77 组件属性/取值/事件/v-model/插槽，随技能发货）——**源码不可读（加密）时即权威**
3. 本手册 `spec/`（按主题拆分，一个主题一个文件）
4. 本手册 `recipes/`（照抄写法）
5. 经验

**API 数据源细则**（A+B 双保险）：

- 写任何 `<ux-*>` 前先查 `api/ux-<name>.md` 卡片（卡上没有的写法不猜）；写完后必须跑 `node scripts/verify-ux-usage.mjs <页面>` 至 0 违规。
- 卡片与 `api/model.json` 快照由 `scripts/gen-api-cards.mjs` 在**组件库源码可读时**一次生成、随技能发货（组件库改动后：`scripts/update-api.mjs` 一条命令重生成，流程见 `api/README.md`）；校验器默认零源码依赖（源码加密的项目全功能可用）。
- 源码可读的项目可传 `--lib <路径>` 现场比对实装库：版本/指纹不一致会提示「快照过旧」，此时**以实装库为准**并按 `api/README.md`「快照更新与版本升级流程」重生成；源码不可读时自动回退内置快照。
- 任何结论与权威源冲突时，以权威源为准。

> 本手册只描述**消费侧**正确用法，不描述组件库内部实现。
> 自增长约定：新踩坑 / 新写法新增独立文件并在下表登记，不并入既有文件。

## 文件索引

| 文件 | 定位 |
|---|---|
| `api/README.md` | 组件 API 卡片索引（77 组件 → 卡片；含快照再生成与版本升级流程） |
| `spec/01-install-and-setup.md` | 安装与接入：插件市场导入、easycom、main.uts 注册、样式接入、install 选项全表 |
| `spec/02-page-script-uts.md` | 页面脚本：组合式写法、UTS 类型陷阱 ❌/✅、模板绑定规则、页面生命周期 |
| `spec/03-page-style-ucss.md` | 页面样式：UCSS 红线、布局陷阱、文本省略双轨、主题变量表、暗黑模式 |
| `spec/04-component-usage.md` | 组件使用约定、全量组件速查表（按 7 类）、$u 工具与 hooks 速查、常用示例 |
| `spec/05-cross-platform.md` | 条件编译宏（权威清单）、三端红线表、症状→修法速查 |
| `spec/06-i18n-locale.md` | 多语言国际化：语言包注册（传入即注册全集）、useLocale API、默认语言优先级、16 个组件内置文案联动 |
| `spec/07-theme-dark-mode.md` | 多主题与暗黑模式：主题注册四形态、ThemeColor token、暗色板自动生成、useTheme API、cssVars 页面联动 |
| `recipes/README.md` | 配方索引与 recipe-first 规则 |
| `recipes/recipe-page-scaffold.md` | 最小页面脚手架（注册 + 骨架 + 主题绑定） |
| `recipes/recipe-page-scroll.md` | 三端滚动监听与返回顶部绑定 |

## 自包含声明

本技能（`uview-pro-x/`）可整体复制到任意使用 uview-pro-x 的 uni-app x 项目中独立使用。约定：

- 所有导入以 `@/uni_modules/uview-pro-x` 为前缀
- `<ux-*>` 组件依赖 easycom 免导入（接入见 `spec/01`）
- 不依赖任何特定宿主工程的目录、脚本或约定
- API 卡片与模型快照（`api/`）随技能发货；校验器 `scripts/verify-ux-usage.mjs` 默认只读技能内置数据，零源码依赖、零第三方依赖（Node ≥ 18）
