# 01 安装与接入

## 环境前提

- 普通 **uni-app（Vue3 + TypeScript）** 项目（页面文件为 `.vue`）——❌ 不是 uni-app x（`.uvue` / UTS）项目
- HBuilderX（建议 ≥ 4.07）或 CLI（Vite）工程均可
- uview-pro **v0.6.21**，支持 `npm` 与 `uni_modules` 两种安装方式，配置方式高度一致

> ⚠️ 本技能只服务普通 uni-app。若项目中出现 `.uvue`、`UTSJSONObject`、`ux-*` 组件，请改用 uview-pro-x 技能。

## 第一步：安装组件库

**方式 A：npm（CLI / HBuilderX 均可）**

```bash
npm install uview-pro
# 或 yarn add uview-pro / pnpm add uview-pro
```

**方式 B：uni_modules（HBuilderX 插件市场）**

打开插件市场页面 `https://ext.dcloud.net.cn/plugin?name=uview-pro`，点击「导入到 HBuilderX」选择目标项目，组件库自动落到 `uni_modules/uview-pro`。

安装后项目结构（以 uni_modules 方式为例）：

```
your-project/
├─ uni_modules/
│  └─ uview-pro/
│     ├─ components/        # 全部 u-* 组件
│     ├─ libs/              # $u 工具、hooks、config、request
│     ├─ locale/            # 内置语言包（zh-CN / en-US）
│     ├─ plugins/           # vite-plugin-uni-root（可选）
│     ├─ types/             # 类型定义
│     ├─ index.ts           # 库入口（install）
│     ├─ index.scss         # 样式统一入口（App.vue 引入）
│     └─ theme.scss         # 主题变量（uni.scss 引入）
├─ pages.json
├─ main.ts（或 main.js）
└─ uni.scss
```

## 第二步：配置 easycom（pages.json）

让 `u-*` 组件免手动 import，模板中直接使用：

```json
{
  "easycom": {
    "autoscan": true,
    "custom": {
      "^u-(.*)": "uview-pro/components/u-$1/u-$1.vue"
    }
  },
  "pages": []
}
```

- **npm 方式**：路径如上；
- **uni_modules 方式**：路径改为 `"@/uni_modules/uview-pro/components/u-$1/u-$1.vue"`。

规则含义：模板中的 `<u-button>` 自动解析到 `components/u-button/u-button.vue`。组件按需编译，未使用的组件不进入产物。

**注意**：

1. 修改 easycom 规则后需**重启 HBuilderX 或重新编译项目**；
2. 请确保 `pages.json` 中只有一个 `easycom` 字段，多个规则请合并到一个 `custom` 对象内；
3. 规则必须放在 `custom` 内，否则无效。

## 第三步：注册组件库（main.ts）

```ts
import { createSSRApp } from 'vue'
// npm 方式
import uViewPro from 'uview-pro'
// uni_modules 方式
// import uViewPro from '@/uni_modules/uview-pro'
import App from './App.vue'

export function createApp() {
    const app = createSSRApp(App)
    app.use(uViewPro, {
        // 以下三项均可省略
        locale: 'zh-CN'                       // 语言初始化（完整能力见 spec/06）
        // theme: { primary: '#7c3aed' },     // 单主题覆盖：只传要改的 token（见 spec/07）
        // debugMode: false                   // 调试输出开关
    })
    return { app }
}
```

> 注册后 `$u` 同时挂到 `uni.$u` 与 `app.config.globalProperties.$u`，页面中可直接 `uni.$u.addUnit(...)`；也可以 `import { $u } from 'uview-pro'` 按需引入（等价对象）。

### install 选项全表

| 字段 | 类型 | 说明 |
|---|---|---|
| `theme` | `ThemeColor \| Theme[] \| Themes` | 主题配置：**单主题覆盖**（`{ primary: '#7c3aed' }`）／**多主题数组**／**多主题 + 默认配置**（`{ themes, defaultTheme, defaultDarkMode, isForce }`）。三种形态语义与暗色板生成细则见 [07-theme-dark-mode](07-theme-dark-mode.md) |
| `locale` | `string \| Locale[] \| Locales` | 语言初始化：**默认语言名**（`'zh-CN'`）／**自定义语言包数组**／**完整配置对象**（`{ locales, defaultLocale, isForce }`）。合并语义见 [06-i18n-locale](06-i18n-locale.md) |
| `debugMode` | `boolean \| 'log' \| 'warn' \| 'error' \| 'info' \| DebugMode[]` | 调试输出开关；数组表示只放开指定级别（如 `['warn','error']`） |

> `app.use(uViewPro)` 不带任何参数也能工作：主题取内置「默认蓝」、语言取内置 `zh-CN`、暗黑模式默认 `light`；运行期通过 `setTheme` / `setDarkMode` / `setLocale` 做的选择会自动持久化到本地 Storage，下次启动自动恢复（`isForce: true` 可强制忽略已保存状态）。

## 第四步：样式接入（两处，缺一不可）

**4.1 项目 `uni.scss` 末尾追加**（引入主题变量）：

```scss
/* npm 方式 */
@import 'uview-pro/theme.scss';
/* uni_modules 方式 */
/* @import "@/uni_modules/uview-pro/theme.scss"; */
```

引入后全项目（页面与组件的 `<style lang="scss">`）均可使用 `$u-*` 主题变量（变量全表见 `spec/03`）。

**4.2 项目 `App.vue` 首行引入**（引入基础样式与全局工具类）：

```scss
<style lang="scss">
/* npm 方式 */
@import "uview-pro/index.scss";
/* uni_modules 方式 */
/* @import "@/uni_modules/uview-pro/index.scss"; */
</style>
```

- ⚠️ `App.vue` 的 style 标签**必须带 `lang="scss"`**——否则运行时会报 scss 变量相关错误（如 `u-line-1` 控制台报错提示的正是这一点）；
- `index.scss` 引入后可用的全局工具类（`u-flex`、`u-font-*`、`u-m-*` / `u-p-*`、`u-line-1~5`、`u-border-*`、`u-type-*` 色彩类等）见 `spec/03`；
- 组件自身样式开箱即用：组件内已各自 import 其依赖的公共样式，页面无需为组件单独引样式。

## 第五步（可选）：Volar 类型提示

CLI（Vite）项目如需在 Volar 中获得全局类型提示，在 `tsconfig.json` 添加：

```json
{
  "compilerOptions": {
    // npm 方式
    "types": ["uview-pro/types"]
    // uni_modules 方式
    // "types": ["@/uni_modules/uview-pro/types"]
  }
}
```

> HBuilderX 项目暂不支持 `tsconfig.json` 的 `types` 配置，CLI 项目推荐配置以获得最佳 TS 体验。

## 第六步（可选）：vite-plugin-uni-root（页面根组件自动包裹）

`u-config-provider` / `u-toast` / `u-modal` 等「需要在每个页面根部存在」的组件（`global` / `page` 模式的函数式调用依赖它们），手动在每个页面添加维护成本高。`vite-plugin-uni-root` 可在构建时自动为每个页面模板包裹 `<global-root-view>` 根组件：

- 工作原理：构建时把页面 `<template>` 包裹进 `<global-root-view>`，运行时渲染为 `App.root.vue` 中的内容——在其中统一放置 `u-config-provider` / `u-toast` / `u-modal` 等全局组件；
- 仅适用于 **CLI（Vite）项目**，用法见 `uni_modules/uview-pro/plugins/root/README.md`；
- 不接入插件时的替代写法：不适用 global 承接时，函数式调用自动降级——在每个页面手动放一个 `<u-toast page />` / `<u-modal page />` 即可（详见 `spec/04` 的「函数式调用」节）。

## 第七步：验证接入

最小页面（如 `pages/index/index.vue`，需在 pages.json 的 `pages` 中注册路由）：

```vue
<template>
    <view class="page">
        <u-button type="primary" text="主要按钮" @click="onClick" />
        <u-tag text="标签" type="success" />
    </view>
</template>

<script setup lang="ts">
function onClick() {
    uni.showToast({ title: '点击了按钮', icon: 'none' })
}
</script>

<style lang="scss" scoped>
.page {
    display: flex;
    flex-direction: column;
    padding: 32rpx;
}
</style>
```

多端运行（HBuilderX 菜单）：

- **H5**：「运行 → 运行到浏览器」
- **App**：连接真机或模拟器，「运行 → 运行到手机或模拟器」
- **微信小程序**：先在 `manifest.json` 配置小程序 appid，再「运行 → 运行到小程序模拟器」

按钮正常渲染且可点击，即接入完成。

## 接入常见问题

| 症状 | 原因 / 修法 |
|---|---|
| 模板里的 `<u-button>` 不渲染、控制台提示未知组件 | easycom 未生效：检查规则是否在 `custom` 内、改后是否重启 HBuilderX / 重新编译 |
| 控制台报 scss 变量（`$u-main-color` 等）未定义 | `uni.scss` 未引入 `theme.scss`，或引错路径 |
| 运行时样式错乱、控制台提示需要在 App.vue 加 `lang="scss"` | `App.vue` 的 `<style>` 漏了 `lang="scss"` 或漏引 `index.scss` |
| npm 安装后编译报 `uview-pro` 相关解析错误 | 依赖未安装完整：重新 `npm install`；uni_modules 方式请确认目录名为 `uview-pro` |
| Volar 报 `$u` 属性不存在 | CLI 项目未在 tsconfig 配置 `types`（见第五步） |

## 下一步

- 起页面骨架：[recipe-page-scaffold](../recipes/recipe-page-scaffold.md)
- 写脚本：[02-page-script-ts](02-page-script-ts.md)；写样式：[03-page-style-scss](03-page-style-scss.md)
- 选组件：[04-component-usage](04-component-usage.md)；多端自查：[05-cross-platform](05-cross-platform.md)
- 多语言国际化：[06-i18n-locale](06-i18n-locale.md)；多主题与暗黑模式：[07-theme-dark-mode](07-theme-dark-mode.md)
