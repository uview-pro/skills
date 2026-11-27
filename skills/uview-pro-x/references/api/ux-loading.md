<!-- 生成物，勿手改：由 scripts/gen-api-cards.mjs 渲染，改动会在下次再生成时丢失 -->

# ux-loading API

> 来源：`components/ux-loading`（uview-pro-x v2.0.14）
> API 指纹：`sha256:8a47c84d88a2be8a704cf037271660384b36009dfba3dc26288d15d670003479`
> 再生成（组件库源码可读时）：`node scripts/gen-api-cards.mjs --lib <uview-pro-x 路径> --only loading`

此组件为一个小动画，目前用在 ux-loadmore 加载更多和 ux-switch 开关等组件的正在加载状态场景

## 属性

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `custom-style` / `customStyle` | 自定义根节点样式 | `string \| JsonObject` | - |
| `custom-class` / `customClass` | 自定义根节点样式类 | `string` | `''` |
| `mode` | 动画的类型，circle-圆圈，flower-花朵 | `LoadingMode`（`circle`｜`flower`） | `'circle'` |
| `color` | 动画活动区域的颜色，只对 mode = circle 模式有效 | `string` | `''` |
| `inactive-color` / `inactiveColor` | 圆环非活动边（静止三边）的颜色，默认主题 divider 色，只对 mode = circle 模式有效 | `string` | `''` |
| `size` | 加载图标的大小，单位px | `string \| number` | `'17'` |
| `show` | 是否显示动画 | `boolean` | `true` |

## 类型定义

> 本卡引用的自定义类型展开定义（源自组件 types.ts / 全局 types/global.ts），对象字面量可直接赋值。

| 类型 | 定义 |
| --- | --- |
| `JsonObject` | `Record<string, any>`（普通对象，任意键值、可嵌套；全库统一对象类型，含内联样式） |
| `LoadingMode` | `'circle' \| 'flower'` |

## 双向绑定（v-model）

该组件无双向绑定。

> ⚠️ `show` 为单向属性（无 `update:show` 事件），**不支持** `v-model:show`。

## 事件

无类型化自定义事件（原生事件不受影响，可直接透传监听）。

## 插槽

无插槽。

## 外部样式类

| 名称 | 说明 |
| --- | --- |
| `custom-class` | 自定义根节点样式类 |
