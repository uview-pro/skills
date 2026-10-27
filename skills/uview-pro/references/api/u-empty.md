<!-- 生成物，勿手改：由 scripts/gen-api-cards.mjs 渲染，改动会在下次再生成时丢失 -->

# u-empty API

> 来源：`components/u-empty`（uview-pro v0.6.21）
> API 指纹：`sha256:c0355841929b63bad8ba3ac8baf6edf485702c081cca9b161fa556c328808c22`
> 官方文档：https://uviewpro.cn/zh/components/empty.html
> 再生成（组件库源码可读时）：`node scripts/gen-api-cards.mjs --lib <uview-pro 路径> --only empty`

该组件用于需要加载内容，但是加载的第一页数据就为空，提示一个"没有内容"的场景，我们精心挑选了十几个场景的图标，方便您使用。

## 用法示例

```vue
<u-empty text="所谓伊人，在水一方" mode="list"></u-empty>
```

## 属性

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `custom-style` / `customStyle` | 自定义根节点样式 | `string \| Record<string, any>` | - |
| `custom-class` / `customClass` | 自定义根节点样式类 | `string` | `''` |
| `src` | 图标路径 | `string` | `''` |
| `text` | 提示文字 | `string` | `''` |
| `color` | 文字颜色 | `string` | `'var(--u-light-color)'` |
| `icon-color` / `iconColor` | 图标的颜色 | `string` | `'var(--u-light-color)'` |
| `icon-size` / `iconSize` | 图标的大小 | `string \| number` | `120` |
| `font-size` / `fontSize` | 文字大小，单位rpx | `string \| number` | `26` |
| `mode` | 选择预置的图标类型 | `string` | `'data'` |
| `img-width` / `imgWidth` | 图标宽度，单位rpx | `string \| number` | `120` |
| `img-height` / `imgHeight` | 图标高度，单位rpx | `string \| number` | `'auto'` |
| `show` | 是否显示组件 | `boolean` | `true` |
| `margin-top` / `marginTop` | 组件距离上一个元素之间的距离 | `string \| number` | `0` |
| `icon-style` / `iconStyle` | 图标自定义样式 | `Record<string, any>` | - |

## 双向绑定（v-model）

该组件无双向绑定。

> ⚠️ `show` 为单向属性（无 `update:show` 事件），**不支持** `v-model:show`；可见性由父组件 `:show` 绑定控制。

## 事件

无类型化自定义事件（原生事件不受影响，可直接透传监听）。

## 插槽

| 插槽名 | 说明 |
| --- | --- |
| `bottom` | - |
