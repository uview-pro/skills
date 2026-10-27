<!-- 生成物，勿手改：由 scripts/gen-api-cards.mjs 渲染，改动会在下次再生成时丢失 -->

# u-line API

> 来源：`components/u-line`（uview-pro v0.6.21）
> API 指纹：`sha256:39c21f914ea978ad3cd1cc5c23085f068a470cf15fe6148c82b87e3e6e11ed60`
> 官方文档：https://uviewpro.cn/zh/components/line.html
> 再生成（组件库源码可读时）：`node scripts/gen-api-cards.mjs --lib <uview-pro 路径> --only line`

此组件一般用于显示一根线条，用于分隔内容块，有横向和竖向两种模式，且能设置0.5px线条，使用也很简单

## 用法示例

```vue
<u-line color="red"></u-line>
```

## 属性

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `color` | 线条的颜色 | `string` | `'var(--u-border-color)'` |
| `length` | 长度，竖向时表现为高度，横向时表现为长度，可以为百分比，带rpx单位的值等 | `string` | `'100%'` |
| `direction` | 线条方向，col-竖向，row-横向 | `LineDirection`（`row`｜`column`） | `'row'` |
| `hair-line` / `hairLine` | 是否显示细边框 | `boolean` | `true` |
| `margin` | 线条与上下左右元素的间距，字符串形式，如"30rpx"、"20rpx 30rpx" | `string` | `'0'` |
| `border-style` / `borderStyle` | 线条的类型，solid-实线，dashed-方形虚线，dotted-圆点虚线 | `LineBorderStyle`（`solid`｜`dashed`｜`dotted`） | `'solid'` |

## 双向绑定（v-model）

该组件无双向绑定。

## 事件

无类型化自定义事件（原生事件不受影响，可直接透传监听）。

## 插槽

无插槽。
