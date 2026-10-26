<!-- 生成物，勿手改：由 scripts/gen-api-cards.mjs 渲染，改动会在下次再生成时丢失 -->

# ux-circle-progress API

> 来源：`components/ux-circle-progress`（uview-pro-x v1.0.0）
> API 指纹：`sha256:4f36502edae1e5dc1aa18c49b1edf2eed0583f55b2812e26b7b3689c5a250cd4`
> 再生成（组件库源码可读时）：`node scripts/gen-api-cards.mjs --lib <uview-pro-x 路径> --only circle-progress`

展示操作或任务的当前进度，是一个圆形的进度条。

## 属性

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `custom-style` / `customStyle` | 自定义根节点样式 | `UTSJSONObject` | - |
| `custom-class` / `customClass` | 自定义根节点样式类 | `string` | `''` |
| `percent` | 圆环进度百分比，0-100 | `number` | `0` |
| `inactive-color` / `inactiveColor` | 圆环的底色，默认分隔线颜色 | `string` | `''` |
| `active-color` / `activeColor` | 圆环激活部分颜色（type 有值时失效） | `string` | `''` |
| `width` | 整个圆环组件的宽度，高度=宽度，单位 px | `number \| string` | `100` |
| `border-width` / `borderWidth` | 圆环的边框宽度，单位 px | `number \| string` | `7` |
| `duration` | 整个圆环画一圈的时间，单位 ms | `number \| string` | `1500` |
| `type` | 主题类型：primary\|success\|warning\|error\|info，设置后 activeColor 失效 | `string` | `''` |
| `bg-color` / `bgColor` | 整个组件背景颜色 | `string` | `''` |

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
