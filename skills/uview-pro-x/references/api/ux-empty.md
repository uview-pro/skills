<!-- 生成物，勿手改：由 scripts/gen-api-cards.mjs 渲染，改动会在下次再生成时丢失 -->

# ux-empty API

> 来源：`components/ux-empty`（uview-pro-x v1.0.0）
> API 指纹：`sha256:60f746de850813392d61b8a4a3aaa254ffef6e80065601db013a3df563f4239e`
> 再生成（组件库源码可读时）：`node scripts/gen-api-cards.mjs --lib <uview-pro-x 路径> --only empty`

该组件用于需要加载内容，但是加载的第一页数据就为空，提示一个"没有内容"的场景，我们精心挑选了十几个场景的图标，方便您使用。

## 属性

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `custom-style` / `customStyle` | 自定义根节点样式 | `string \| UTSJSONObject` | - |
| `custom-class` / `customClass` | 自定义根节点样式类 | `string` | `''` |
| `src` | 图标路径 | `string` | `''` |
| `text` | 提示文字 | `string` | `''` |
| `color` | 文字颜色 | `string` | `''` |
| `icon-color` / `iconColor` | 图标的颜色 | `string` | `''` |
| `icon-size` / `iconSize` | 图标的大小 | `string \| number` | `DEFAULT_ICON_SIZE` |
| `font-size` / `fontSize` | 文字大小，单位px | `string \| number` | `DEFAULT_FONT_SIZE` |
| `mode` | 选择预置的图标类型 | `EmptyMode`（`car`｜`page`｜`search`｜`address`｜`wifi`｜`order`｜`coupon`｜`favor`｜`permission`｜`history`｜`news`｜`message`｜`list`｜`data`） | `'data'` |
| `img-width` / `imgWidth` | 图标宽度，单位px | `string \| number` | `60` |
| `img-height` / `imgHeight` | 图标高度，单位px | `string \| number` | `'auto'` |
| `show` | 是否显示组件 | `boolean` | `true` |
| `margin-top` / `marginTop` | 组件距离上一个元素之间的距离 | `string \| number` | `10` |

## 双向绑定（v-model）

该组件无双向绑定。

> ⚠️ `show` 为单向属性（无 `update:show` 事件），**不支持** `v-model:show`。

## 事件

无类型化自定义事件（原生事件不受影响，可直接透传监听）。

## 插槽

| 插槽名 | 说明 |
| --- | --- |
| `bottom` | - |

## 外部样式类

| 名称 | 说明 |
| --- | --- |
| `custom-class` | 自定义根节点样式类 |
