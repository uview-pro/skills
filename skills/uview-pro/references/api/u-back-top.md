<!-- 生成物，勿手改：由 scripts/gen-api-cards.mjs 渲染，改动会在下次再生成时丢失 -->

# u-back-top API

> 来源：`components/u-back-top`（uview-pro v0.6.21）
> API 指纹：`sha256:ab62dc5feee7eeda8f0e12652881b1437df848e258ab25409d475058e511ccc1`
> 官方文档：https://uviewpro.cn/zh/components/backTop.html
> 再生成（组件库源码可读时）：`node scripts/gen-api-cards.mjs --lib <uview-pro 路径> --only back-top`

页面滚动时显示的返回顶部按钮

## 属性

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `custom-style` / `customStyle` | 自定义根节点样式 | `string \| Record<string, any>` | - |
| `custom-class` / `customClass` | 自定义根节点样式类 | `string` | `''` |
| `mode` | 返回顶部的形状，circle-圆形，square-方形 | `Shape`（`circle`｜`square`） | `'circle'` |
| `icon` | 自定义图标 | `string` | `'arrow-upward'` |
| `tips` | 提示文字 | `string` | `''` |
| `duration` | 返回顶部滚动时间 | `number \| string` | `100` |
| `scroll-top` / `scrollTop` | 滚动距离 | `number \| string` | `0` |
| `top` | 距离顶部多少距离显示，单位rpx | `number \| string` | `400` |
| `bottom` | 返回顶部按钮到底部的距离，单位rpx | `number \| string` | `200` |
| `right` | 返回顶部按钮到右边的距离，单位rpx | `number \| string` | `40` |
| `z-index` / `zIndex` | 层级 | `number \| string` | `'9'` |
| `icon-style` / `iconStyle` | 图标的样式，对象形式 | `Record<string, any>` | - |

## 双向绑定（v-model）

该组件无双向绑定。

## 事件

无类型化自定义事件（原生事件不受影响，可直接透传监听）。

## 插槽

| 插槽名 | 说明 |
| --- | --- |
| `default` | - |
