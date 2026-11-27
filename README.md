# uView Pro · Agent Skills

面向 [uView Pro](https://uviewpro.cn/) 系列组件库的 [Agent Skills](https://github.com/vercel-labs/skills) 集合：让 AI 编程助手按本项目的真实规范写代码，而不是凭训练记忆猜写法。

> 尚未在全部客户端充分测试，欢迎反馈和贡献。

## 安装

```bash
pnpx skills add uview-pro/skills
```

技能会落到 AI 客户端的技能目录，加载后由 `SKILL.md` 的 `description` 自动触发。支持 Agent Skills 的客户端（Qoder、Claude Code、Cursor 等）通用；命令不可用时可克隆本仓库，把 `skills/<name>/` 手动放进客户端的技能目录。

CLI 用法见 [vercel-labs/skills](https://github.com/vercel-labs/skills)。

## 技能一览

### 组件库技能

面向「在项目里用组件库写页面」，不涉及组件库自身的实现。写任何 `<u-*>` / `<ux-*>` 前先查随技能发货的 API 卡片，写完用对应校验器校到 0 违规。

| 技能 | 适用项目 | 覆盖 | API 卡片 | 校验脚本 | 文档站 |
|---|---|---|---|---|---|
| [uview-pro](skills/uview-pro) | 普通 uni-app（Vue3 + TS，`.vue` / SCSS / `u-*`） | 接入、页面脚本、SCSS 与主题、组件与 `$u` / hooks / 请求速查、多端兼容、多语言、多主题与暗黑 | 99 张 | `verify-u-usage.mjs` | [uviewpro.cn](https://uviewpro.cn/) |
| [uview-pro-x](skills/uview-pro-x) | uni-app x 2.0（TypeScript，`.uvue` / UCSS / `ux-*`） | 上述能力 + HTTP 请求（`http` / `useRequest`）、pinia 状态管理、自定义图标字体 | 71 张 | `verify-ux-usage.mjs` | [x.uviewpro.cn](https://x.uviewpro.cn/) |
| [uview-pro-x-uts](skills/uview-pro-x-uts) | uni-app x 1.x（UTS，`.uvue` / UCSS / `ux-*`） | 同 uview-pro-x，页面脚本为 UTS 写法 | 72 张 | `verify-ux-usage.mjs` | [uts.uviewpro.cn](https://uts.uviewpro.cn/) |

> `uview-pro` 与 `uview-pro-x` / `uview-pro-x-uts` 是两套完全不同的写法（`.vue` + TS + `u-*` 对 `.uvue` + UTS/TS + `ux-*`），不要混用。uView Pro X 的 TS 版与 UTS 版 **API 完全一致**，仅语言与组件前缀实现不同。

## 目录结构

```
skills/<name>/
├─ SKILL.md              # 入口：触发条件与工作流（frontmatter 含 name / description）
├─ references/
│  ├─ README.md          # 手册索引与权威源优先级
│  ├─ spec/              # 规范正文，一主题一文件（NN-主题.md）
│  ├─ recipes/           # 照抄配方（页面脚手架、滚动监听、请求实例等）
│  └─ api/               # 组件 API 卡片 + model.json 快照
└─ scripts/              # 校验与生成脚本，零第三方依赖（Node ≥ 18）
```

## 校验与维护

消费侧（在项目根执行，`<skill-dir>` 为技能目录）：

```bash
node <skill-dir>/scripts/verify-u-usage.mjs pages/    # u-* 页面用法
node <skill-dir>/scripts/verify-ux-usage.mjs pages/   # ux-* 页面用法
# 常用参数：--lib <组件库目录> 现场比对实装库｜--json 机器可读输出｜--baseline <file> 存量基线
```

维护侧（组件库源码可读时）：

```bash
node <skill-dir>/scripts/update-api.mjs --lib <组件库目录>   # 重生成 API 卡片 → 一致性核对 → 语料回归
node <skill-dir>/scripts/verify-skill-docs.mjs --strict      # 技能文档结构门禁（链接 / 登记 / 围栏语言 / 名单一致性）
```

- 消费侧技能自包含：API 快照随技能发货，项目里的组件库加密也照常可用；组件库源码可读时以实装库为准，快照过旧会提示重生成。
- 技能正文按主题拆在 `references/` 下，新增踩坑 / 新写法独立成文件并登记索引，不并入既有文件。
- 语义以组件库源码与各版本文档站为准；技能只描述消费侧或维护侧的正确做法，不复述组件库内部实现。

## 反馈与贡献

问题与建议欢迎到 [uview-pro/skills](https://github.com/uview-pro/skills) 提 Issue / PR。