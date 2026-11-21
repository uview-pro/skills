<!-- 生成物，勿手改：由 scripts/gen-api-cards.mjs 渲染，改动会在下次再生成时丢失 -->

# ux-line API

> 来源：`components/ux-line`（uview-pro-x v2.0.2）
> API 指纹：`sha256:21f2476228675d73848995fe7daa710ce9ec524a29aefde3d588fe5693b503fb`
> 再生成（组件库源码可读时）：`node scripts/gen-api-cards.mjs --lib <uview-pro-x 路径> --only line`

此组件一般用于显示一根线条，用于分隔内容块，有横向和竖向两种模式，且能设置0.5px线条，使用也很简单

## 属性

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `custom-style` / `customStyle` | 自定义根节点样式 | `string \| JsonObject` | - |
| `custom-class` / `customClass` | 自定义根节点样式类 | `string` | `''` |
| `color` | 线条的颜色 | `string` | `''` |
| `length` | 长度，竖向时表现为高度，横向时表现为长度，可以为百分比，带px单位的值等 | `string` | `'100%'` |
| `direction` | 线条方向，row-横向，col-竖向 | `string` | `'row'` |
| `hair-line` / `hairLine` | 是否显示细线条 | `boolean` | `true` |
| `margin` | 线条与上下左右元素的间距，字符串形式，如"15px" | `string` | `'0'` |
| `border-style` / `borderStyle` | 线条的类型，solid-实线，dashed-方形虚线，dotted-圆点虚线 | `string` | `'solid'` |

## 类型定义

> 本卡引用的自定义类型展开定义（源自组件 types.ts / 全局 types/global.ts），对象字面量可直接赋值。

| 类型 | 定义 |
| --- | --- |
| `JsonObject` | `Record<string, any>`（普通对象，任意键值、可嵌套；全库统一对象类型，含内联样式） |

## 双向绑定（v-model）

该组件无双向绑定。

## 事件

无类型化自定义事件（原生事件不受影响，可直接透传监听）。

## 插槽

无插槽。

## 外部样式类

| 名称 | 说明 |
| --- | --- |
| `custom-class` | 自定义根节点样式类 |
