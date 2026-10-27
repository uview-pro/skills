<!-- 生成物，勿手改：由 scripts/gen-api-cards.mjs 渲染，改动会在下次再生成时丢失 -->

# u-alert-tips API

> 来源：`components/u-alert-tips`（uview-pro v0.6.21）
> API 指纹：`sha256:ffacf7ed7390351223820214201f2ab71eb22d61698ebef523d6deabacd58e3d`
> 官方文档：https://uviewpro.cn/zh/components/alertTips.html
> 再生成（组件库源码可读时）：`node scripts/gen-api-cards.mjs --lib <uview-pro 路径> --only alert-tips`

警告提示，展现需要关注的信息

## 属性

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `custom-style` / `customStyle` | 自定义根节点样式 | `string \| Record<string, any>` | - |
| `custom-class` / `customClass` | 自定义根节点样式类 | `string` | `''` |
| `title` | 显示文字 | `string` | `''` |
| `type` | 主题，success/warning/info/error | `ThemeType`（`primary`｜`info`｜`error`｜`warning`｜`success`｜`default`） | `'warning'` |
| `description` | 辅助性文字 | `string` | `''` |
| `close-able` / `closeAble` | 是否可关闭 | `boolean` | `false` |
| `close-text` / `closeText` | 关闭按钮自定义文本 | `string` | `''` |
| `show-icon` / `showIcon` | 是否显示图标 | `boolean` | `false` |
| `color` | 文字颜色，如果定义了color值，icon会失效 | `string` | `''` |
| `bg-color` / `bgColor` | 背景颜色 | `string` | `''` |
| `border-color` / `borderColor` | 边框颜色 | `string` | `''` |
| `show` | 是否显示 | `boolean` | `true` |
| `icon` | 左边显示的icon | `string` | `''` |
| `icon-style` / `iconStyle` | icon的样式 | `object` | - |
| `title-style` / `titleStyle` | 标题的样式 | `object` | - |
| `desc-style` / `descStyle` | 描述文字的样式 | `object` | - |

## 双向绑定（v-model）

该组件无双向绑定。

> ⚠️ `show` 为单向属性（无 `update:show` 事件），**不支持** `v-model:show`；可见性由父组件 `:show` 绑定控制。

## 事件

| 事件 | 回调参数 | 说明 |
| --- | --- | --- |
| `@click` | - | 点击组件时触发 |
| `@close` | - | 点击关闭按钮时触发 |

## 插槽

无插槽。
