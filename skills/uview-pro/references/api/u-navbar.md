<!-- 生成物，勿手改：由 scripts/gen-api-cards.mjs 渲染，改动会在下次再生成时丢失 -->

# u-navbar API

> 来源：`components/u-navbar`（uview-pro v0.6.21）
> API 指纹：`sha256:a1e1a8f6862be1f3844f749d3907910b97d8b7a10ce8d941f29dace444393b14`
> 官方文档：https://uviewpro.cn/zh/components/navbar.html
> 再生成（组件库源码可读时）：`node scripts/gen-api-cards.mjs --lib <uview-pro 路径> --only navbar`

此组件一般用于在特殊情况下，需要自定义导航栏的时候用到，一般建议使用uniapp自带的导航栏。

## 用法示例

```vue
<u-navbar back-text="返回" title="剑未配妥，出门已是江湖"></u-navbar>
```

## 属性

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `height` | 导航栏高度，单位px，非rpx | `string \| number` | `''` |
| `back-icon-color` / `backIconColor` | 返回箭头的颜色 | `string` | `'var(--u-content-color)'` |
| `back-icon-name` / `backIconName` | 左边返回的图标 | `string` | `'nav-back'` |
| `back-icon-size` / `backIconSize` | 左边返回图标的大小，rpx | `string \| number` | `'44'` |
| `back-text` / `backText` | 返回的文字提示 | `string` | `''` |
| `back-text-style` / `backTextStyle` | 返回的文字的 样式 | `Record<string, any>` | - |
| `title` | 导航栏标题 | `string` | `''` |
| `title-width` / `titleWidth` | 标题的宽度，单位rpx | `string \| number` | `'250'` |
| `title-color` / `titleColor` | 标题的颜色 | `string` | `'var(--u-content-color)'` |
| `title-bold` / `titleBold` | 标题字体是否加粗 | `boolean` | `false` |
| `title-size` / `titleSize` | 标题的字体大小 | `string \| number` | `32` |
| `is-back` / `isBack` | 是否显示导航栏左边返回图标和辅助文字 | `boolean \| string` | `true` |
| `background` | 导航栏背景设置 | `Record<string, any>` | - |
| `is-fixed` / `isFixed` | 导航栏是否固定在顶部 | `boolean` | `true` |
| `immersive` | 是否沉浸式，允许fixed定位后导航栏塌陷，仅fixed定位下生效 | `boolean` | `false` |
| `border-bottom` / `borderBottom` | 是否显示导航栏的下边框 | `boolean` | `true` |
| `z-index` / `zIndex` | 固定在顶部时的z-index值 | `string \| number` | - |
| `custom-back` / `customBack` | 自定义返回逻辑方法 | `() => void` | `null` |

## 双向绑定（v-model）

该组件无双向绑定。

## 事件

无类型化自定义事件（原生事件不受影响，可直接透传监听）。

## 插槽

| 插槽名 | 说明 |
| --- | --- |
| `left` | - |
| `default` | - |
| `right` | - |
