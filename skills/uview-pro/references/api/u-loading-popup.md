<!-- 生成物，勿手改：由 scripts/gen-api-cards.mjs 渲染，改动会在下次再生成时丢失 -->

# u-loading-popup API

> 来源：`components/u-loading-popup`（uview-pro v0.6.21）
> API 指纹：`sha256:b45543d4ae26c00150a2424192dee7f361123d4a9bde58d5df03f448d8720579`
> 官方文档：https://uviewpro.cn/zh/components/loadingPopup.html
> 再生成（组件库源码可读时）：`node scripts/gen-api-cards.mjs --lib <uview-pro 路径> --only loading-popup`

该组件一般用于展示加载状态的场景，弹出后显示加载动画与提示文字，支持定时自动关闭或点击取消

## 用法示例

```vue
<u-loading-popup v-model="show" text="加载中"></u-loading-popup>
```

## 属性

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `model-value` / `modelValue` | 是否显示加载弹窗 | `boolean` | `false` |
| `text` | 加载提示文本 | `string` | `''` |
| `direction` | 方向，可选 'vertical' \| 'horizontal' | `vertical`｜`horizontal` | `'vertical'` |
| `duration` | 自动关闭的持续时间(ms)，0为不自动关闭 | `number` | `0` |
| `cancel-time` / `cancelTime` | 允许点击遮罩关闭的最短时间(ms) | `number` | `10000` |
| `mode` | 动画的类型 | `LoadingMode` | `'circle'` |
| `color` | 动画的颜色 | `string` | `'var(--u-light-color)'` |
| `size` | 加载图标的大小，单位rpx | `string \| number` | `'48'` |

## 双向绑定（v-model）

| 写法 | 通道 | 说明 |
| --- | --- | --- |
| `v-model` | prop + emit（`update:modelValue`） | `modelValue` 属性，默认 `false` |

## 事件

| 事件 | 回调参数 | 说明 |
| --- | --- | --- |
| `@cancel` | - | 点击取消按钮或到达设定时间自动关闭时触发 |

## 插槽

无插槽。

## 命令式方法（通过组件 ref 调用）

| 方法 | 说明 |
| --- | --- |
| `open` | - |
| `close` | - |
