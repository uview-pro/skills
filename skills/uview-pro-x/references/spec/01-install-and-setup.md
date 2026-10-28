# 01 安装与接入

## 环境前提

- HBuilderX（建议较新版本）+ **uni-app x** 项目（Vue3 + UTS，页面文件为 `.uvue`）
- uview-pro-x 以 uni_modules 形式分发：仅支持通过 **DCloud 插件市场**导入，不支持 npm 安装
- 插件市场地址：`https://ext.dcloud.net.cn/plugin?name=uview-pro-x`（uView Pro X）

## 第一步：导入组件库

1. 打开插件市场地址，点击「导入到 HBuilderX」
2. 选择目标 uni-app x 项目，完成导入
3. 组件库自动落到项目的 `uni_modules/uview-pro-x` 目录，无需手动拷贝

安装后项目结构：

```
your-project/
├─ uni_modules/
│  └─ uview-pro-x/
│     ├─ components/        # 全部 ux-* 组件
│     ├─ libs/              # $u 工具、hooks、config、styles
│     ├─ locale/            # 内置语言包（zh-CN / en-US）
│     ├─ types/             # 类型定义
│     ├─ index.uts          # 库入口（install）
│     ├─ index.scss         # 样式统一入口
│     └─ theme.scss         # 主题变量
├─ pages.json
├─ main.uts
└─ uni.scss
```

## 第二步：配置 easycom（pages.json）

让 `ux-*` 组件免手动 import，模板中直接使用：

```json
{
  "easycom": {
    "autoscan": true,
    "custom": {
      "^ux-(.*)": "@/uni_modules/uview-pro-x/components/ux-$1/ux-$1.uvue"
    }
  }
}
```

规则含义：模板中的 `<ux-button>` 自动解析到 `uni_modules/uview-pro-x/components/ux-button/ux-button.uvue`。组件按需编译，未使用的组件不进入产物。

## 第三步：注册组件库（main.uts）

```ts
import App from './App.uvue'
// 必须用命名导入：加密版插件的入口由云端编译生成，固定为 `export * from './index'` + 组件命名导出，
// `export *` 不转发 default，写 `import uViewProX from '...'` 会在加密版上报
// "does not provide an export named 'default'"。命名导入在源码版 / 加密版均可用。
import { uViewProX } from './uni_modules/uview-pro-x'
import { createSSRApp } from 'vue'

export function createApp() {
    const app = createSSRApp(App)
    app.use(uViewProX, {
        // 以下两项配置均可省略
        locale: { defaultLocale: 'zh-CN' }    // 语言初始化（完整能力见 spec/06）
        // theme: { primary: '#7c3aed' },     // 单主题覆盖：只传要改的 token（见 spec/07）
    })
    return { app }
}
```

> `app.use(uViewProX)` 不带任何参数也能工作：语言取内置 `zh-CN`，主题取内置官方蓝。
>
> 库入口同时导出了 `install` 函数，等价写法：`import { install } from '@/uni_modules/uview-pro-x'` + `app.use(install, options)`。

### install 选项全表

**locale**（语言初始化）

| 字段 | 类型 | 说明 |
|---|---|---|
| `locales` | `Locale[]` | 自定义语言包数组，项为 `{ name, label, locale, ...命名空间 }`。**传入非空数组即为完整注册集合，内置包不会自动追加**——要保留组件内置文案，须把库内置包（`zhCN` / `enUS`）一并传入；数组内同名语言包深合并（后传覆盖先传）。详见 `spec/06` |
| `defaultLocale` | `string` | 默认语言名；内置 `zh-CN` / `en-US` |
| `isForce` | `boolean` | 为 `true` 时忽略已保存的语言选择，强制使用 `defaultLocale` |

**theme**（三种形态）

| 形态 | 示例 | 效果 |
|---|---|---|
| 单主题覆盖 | `{ primary: '#7c3aed' }` | 只把指定 token 合并进内置官方蓝 |
| 多主题数组 | `[{ name: 'purple', label: '紫', color: { primary: '#7c3aed' } }]` | 与内置主题合并（同名覆盖），运行时可切换 |
| 多主题 + 默认配置 | `{ themes: [...], defaultTheme: 'purple', defaultDarkMode: 'auto', isForce: true }` | 追加默认主题与默认暗黑模式 |

`Theme` 结构：`{ name, label?, description?, color, darkColor?, css?, darkCss? }`；`darkColor` 不传时按亮色自动生成暗色变体（结构色直接取暗色基础值，语义色按比例混合）。

> 四种注册形态逐项说明、暗色板生成细则、运行时切换（`useTheme`）与页面联动见 [07-theme-dark-mode](07-theme-dark-mode.md)。

> 运行期通过 `setLocale` / `setTheme` / `setDarkMode` 做的选择会自动持久化到本地存储，下次启动自动恢复；`isForce` 可强制忽略已保存状态（语言见 `spec/06`，主题见 `spec/07`）。

## 第四步：样式接入（uni.scss）

在项目 `uni.scss` 末尾追加：

```scss
@import '@/uni_modules/uview-pro-x/theme.scss';
```

引入后，全项目（页面与组件的 `<style lang="scss">`）均可使用 `$u-*` 主题变量：文字色、背景色、边框色、5 组语义色 × 4 态等（完整变量表见 `spec/03`）。

补充说明：

- `theme.scss` 是**必需**接入项：不引入则页面样式中的 `$u-*` 变量编译报错。
- `index.scss` 是样式统一入口（三分类：主题变量 + 全局共用样式 + 全局 mixins），需要全局能力时可在页面/组件中 `@import '@/uni_modules/uview-pro-x/index.scss';` 一次拿全。
- SCSS `@import` 不去重：**不要同时引入统一入口与其内部的叶子文件**（如 `libs/styles/mixins/hairline.scss` 细边框 mixin），重复引入会触发 mixin 重复定义。
- 库内组件各自引用主题变量，组件本身开箱即用；页面样式要用 `$u-*` 时依赖本步的 `uni.scss` 全局注入即可，通常无需在页面内单独再引 `theme.scss`。

## 第五步：验证接入

最小页面（如 `pages/index/index.uvue`，需在 pages.json 的 `pages` 中注册路由）：

```vue
<template>
    <view class="page">
        <ux-button text="主要按钮" type="primary" @click="onClick" />
        <ux-tag text="标签" type="success" />
    </view>
</template>

<script setup lang="uts">
function onClick(): void {
    uni.showToast({ title: '点击了按钮', icon: 'none' })
}
</script>

<style lang="scss">
.page {
    display: flex;
    flex-direction: column;
    padding: 16px;
}
</style>
```

三端运行（HBuilderX 菜单）：

- **H5**：「运行 → 运行到浏览器」
- **App**：连接真机或模拟器，「运行 → 运行到手机或模拟器」
- **微信小程序**：先在 `manifest.json` 配置小程序 appid，再「运行 → 运行到小程序模拟器」

按钮正常渲染且可点击，即接入完成。

## 下一步

- 起页面骨架：[recipe-page-scaffold](../recipes/recipe-page-scaffold.md)
- 写脚本：[02-page-script-uts](02-page-script-uts.md)；写样式：[03-page-style-ucss](03-page-style-ucss.md)
- 选组件：[04-component-usage](04-component-usage.md)；三端自查：[05-cross-platform](05-cross-platform.md)
- 多语言国际化：[06-i18n-locale](06-i18n-locale.md)；多主题与暗黑模式：[07-theme-dark-mode](07-theme-dark-mode.md)
