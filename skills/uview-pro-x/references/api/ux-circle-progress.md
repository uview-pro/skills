<!-- 生成物，勿手改：由 scripts/gen-api-cards.mjs 渲染，改动会在下次再生成时丢失 -->

# ux-circle-progress API

> 来源：`components/ux-circle-progress`（uview-pro-x v2.0.7）
> API 指纹：`sha256:36322c3d467401818a1f957ba1443b185a7958b655f00bc868b6e6aed9dc922d`
> 再生成（组件库源码可读时）：`node scripts/gen-api-cards.mjs --lib <uview-pro-x 路径> --only circle-progress`

展示操作或任务的当前进度，是一个圆形的进度条。

## 属性

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `custom-style` / `customStyle` | 自定义根节点样式 | `string \| JsonObject` | - |
| `custom-class` / `customClass` | 自定义根节点样式类 | `string` | `''` |
| `percent` | 圆环进度百分比，0-100 | `number` | `0` |
| `inactive-color` / `inactiveColor` | 圆环的底色，默认分隔线颜色 | `string` | `''` |
| `active-color` / `activeColor` | 圆环激活部分颜色（type 有值时失效） | `string` | `''` |
| `width` | 整个圆环组件的宽度，高度=宽度，单位 px | `number \| string` | `100` |
| `border-width` / `borderWidth` | 圆环的边框宽度，单位 px | `number \| string` | `7` |
| `duration` | 整个圆环画一圈的时间，单位 ms | `number \| string` | `1500` |
| `type` | 主题类型：primary\|success\|warning\|error\|info，设置后 activeColor 失效 | `string` | `''` |
| `bg-color` / `bgColor` | 整个组件背景颜色 | `string` | `''` |

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

| 插槽名 | 说明 |
| --- | --- |
| `default` | - |

## 外部样式类

| 名称 | 说明 |
| --- | --- |
| `custom-class` | 自定义根节点样式类 |
