<!-- 生成物，勿手改：由 scripts/gen-api-cards.mjs 渲染，改动会在下次再生成时丢失 -->

# ux-loadmore API

> 来源：`components/ux-loadmore`（uview-pro-x v1.0.0）
> API 指纹：`sha256:53d46ce0948be395305cbbadcbdc004191e572c230717bd4c1a2d645d2703311`
> 再生成（组件库源码可读时）：`node scripts/gen-api-cards.mjs --lib <uview-pro-x 路径> --only loadmore`

此组件一般用于标识页面底部加载数据时的状态。

## 属性

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `custom-style` / `customStyle` | 自定义根节点样式 | `UTSJSONObject` | - |
| `custom-class` / `customClass` | 自定义根节点样式类 | `string` | `''` |
| `bg-color` / `bgColor` | 组件背景色 | `string` | `''` |
| `icon` | 是否显示加载中的图标（默认true） | `boolean` | `true` |
| `font-size` / `fontSize` | 字体大小 | `string` | `'14'` |
| `color` | 字体颜色 | `string` | `''` |
| `status` | 组件状态，loadmore-加载前，loading-加载中，nomore-没有更多（默认loadmore） | `string` | `'loadmore'` |
| `icon-type` / `iconType` | 加载中状态的图标，flower-花朵状，circle-圆圈状（默认circle） | `string` | `'circle'` |
| `load-text` / `loadText` | 显示的文字 | `LoadmoreText` | - |
| `is-dot` / `isDot` | 在"没有更多"状态下，是否显示粗点（默认false） | `boolean` | `false` |
| `icon-color` / `iconColor` | 加载中显示圆圈动画时，动画的颜色 | `string` | `''` |
| `margin-top` / `marginTop` | 上边距 | `number \| string` | `0` |
| `margin-bottom` / `marginBottom` | 下边距 | `number \| string` | `0` |
| `height` | 高度，单位px | `number \| string` | `'auto'` |

## 双向绑定（v-model）

该组件无双向绑定。

## 事件

| 事件 | 回调参数 | 说明 |
| --- | --- | --- |
| `@loadmore` | - | status为loadmore时，点击组件会发出此事件 |

## 插槽

无插槽。

## 外部样式类

| 名称 | 说明 |
| --- | --- |
| `custom-class` | 自定义根节点样式类 |
