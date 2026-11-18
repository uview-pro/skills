<!-- 生成物，勿手改：由 scripts/gen-api-cards.mjs 渲染，改动会在下次再生成时丢失 -->

# ux-gap API

> 来源：`components/ux-gap`（uview-pro-x v2.0.0）
> API 指纹：`sha256:e69b38e981c684df34f308da647022a92e610a50ba5b5820603eb931e0aa391f`
> 再生成（组件库源码可读时）：`node scripts/gen-api-cards.mjs --lib <uview-pro-x 路径> --only gap`

该组件一般用于内容块之间的用一个灰色块隔开的场景，方便用户风格统一，减少工作量

## 属性

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `custom-style` / `customStyle` | 自定义根节点样式 | `string \| JsonObject` | - |
| `custom-class` / `customClass` | 自定义根节点样式类 | `string` | `''` |
| `bg-color` / `bgColor` | 背景颜色 | `string` | `'transparent'` |
| `height` | 高度 | `string \| number` | `15` |
| `margin-top` / `marginTop` | 与上一个组件的距离 | `string \| number` | `0` |
| `margin-bottom` / `marginBottom` | 与下一个组件的距离 | `string \| number` | `0` |

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
