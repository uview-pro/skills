<!-- 生成物，勿手改：由 scripts/gen-api-cards.mjs 渲染，改动会在下次再生成时丢失 -->

# ux-top-tips API

> 来源：`components/ux-top-tips`（uview-pro-x v1.0.0）
> API 指纹：`sha256:0a8e0677d08182cc2dee25a75ce2f83620b5322d6109432cf279d3257bf149d3`
> 再生成（组件库源码可读时）：`node scripts/gen-api-cards.mjs --lib <uview-pro-x 路径> --only top-tips`

顶部提示条，通过组件实例的 show() 弹出，支持导航栏高度适配与 z-index 定制，到时自动收起

## 属性

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `custom-style` / `customStyle` | 自定义根节点样式 | `string` | `''` |
| `custom-class` / `customClass` | 自定义根节点样式类 | `string` | `''` |
| `navbar-height` / `navbarHeight` | 顶部避让总高度(包含状态栏高度在内)，单位 PX；0 时自动取「状态栏 + 平台默认导航栏高度」 | `number \| string` | `0` |
| `z-index` / `zIndex` | z-index 值 | `number \| string` | - |

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

## 命令式方法（通过组件 ref 调用）

| 方法 | 说明 |
| --- | --- |
| `show` | - |
