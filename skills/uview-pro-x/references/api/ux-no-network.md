<!-- 生成物，勿手改：由 scripts/gen-api-cards.mjs 渲染，改动会在下次再生成时丢失 -->

# ux-no-network API

> 来源：`components/ux-no-network`（uview-pro-x v1.0.0）
> API 指纹：`sha256:9a52e8968900a624483d890c2d36930db0c8f77310738d3a97649ffc76e35706`
> 再生成（组件库源码可读时）：`node scripts/gen-api-cards.mjs --lib <uview-pro-x 路径> --only no-network`

监听网络状态自动显隐的无网络提示页，支持自定义图片、提示语与层级；App 端额外提供系统设置入口，重试成功后自动隐藏并以 toast 反馈

## 属性

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `tips` | 页面文字提示 | `string` | `''` |
| `z-index` / `zIndex` | 一个z-index值，用于设置没有网络这个组件的层次 | `number \| string` | - |
| `image` | 没有网络的图片提示 | `string` | `''` |

## 双向绑定（v-model）

该组件无双向绑定。

## 事件

| 事件 | 回调参数 | 说明 |
| --- | --- | --- |
| `@retry` | - | 点击「重试」按钮时触发 |

## 插槽

无插槽。

## 外部样式类

无。

## 命令式方法（通过组件 ref 调用）

| 方法 | 说明 |
| --- | --- |
| `retry` | - |
| `openSettings` | - |
