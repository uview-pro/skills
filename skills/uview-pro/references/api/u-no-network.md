<!-- 生成物，勿手改：由 scripts/gen-api-cards.mjs 渲染，改动会在下次再生成时丢失 -->

# u-no-network API

> 来源：`components/u-no-network`（uview-pro v0.6.21）
> API 指纹：`sha256:cd1c0ebf215a247d387d1f8f3db9123a38c3941d41f1d92109b6fae69cb0d331`
> 官方文档：https://uviewpro.cn/zh/components/noNetwork.html
> 再生成（组件库源码可读时）：`node scripts/gen-api-cards.mjs --lib <uview-pro 路径> --only no-network`

该组件无需任何配置，引入即可，内部自动处理所有功能和事件。

## 用法示例

```vue
<u-no-network></u-no-network>
```

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
| `@retry` | - | 用户点击页面的"重试"按钮时触发 |

## 插槽

无插槽。

## 命令式方法（通过组件 ref 调用）

| 方法 | 说明 |
| --- | --- |
| `retry` | - |
| `openSettings` | - |
| `openAppSettings` | - |
