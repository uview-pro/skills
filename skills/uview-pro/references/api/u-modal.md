<!-- 生成物，勿手改：由 scripts/gen-api-cards.mjs 渲染，改动会在下次再生成时丢失 -->

# u-modal API

> 来源：`components/u-modal`（uview-pro v0.6.21）
> API 指纹：`sha256:b6467d9538b7a57533977187ffacbc8aa09cf71a47c93e9eaf803dc71ef0e0fb`
> 官方文档：https://uviewpro.cn/zh/components/modal.html
> 再生成（组件库源码可读时）：`node scripts/gen-api-cards.mjs --lib <uview-pro 路径> --only modal`

弹出模态框，常用于消息提示、消息确认、在当前页面内完成特定的交互操作

## 用法示例

```vue
<u-modal :src="title" :content="content"></u-modal>
```

## 属性

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `custom-style` / `customStyle` | 自定义根节点样式 | `string \| Record<string, any>` | - |
| `custom-class` / `customClass` | 自定义根节点样式类 | `string` | `''` |
| `model-value` / `modelValue` | 是否显示模态框 | `boolean` | `false` |
| `z-index` / `zIndex` | 层级z-index | `number \| string` | `''` |
| `title` | 标题 | `string` | `''` |
| `width` | 弹窗宽度 | `number \| string` | `600` |
| `content` | 弹窗内容 | `string` | `''` |
| `show-title` / `showTitle` | 是否显示标题 | `boolean` | `true` |
| `show-confirm-button` / `showConfirmButton` | 是否显示确认按钮 | `boolean` | `true` |
| `show-cancel-button` / `showCancelButton` | 是否显示取消按钮 | `boolean` | `false` |
| `confirm-text` / `confirmText` | 确认文案 | `string` | `''` |
| `cancel-text` / `cancelText` | 取消文案 | `string` | `''` |
| `confirm-color` / `confirmColor` | 确认按钮颜色 | `string` | - |
| `cancel-color` / `cancelColor` | 取消文字颜色 | `string` | - |
| `border-radius` / `borderRadius` | 圆角值 | `number \| string` | `16` |
| `title-style` / `titleStyle` | 标题的样式 | `Record<string, any>` | - |
| `content-style` / `contentStyle` | 内容的样式 | `Record<string, any>` | - |
| `cancel-style` / `cancelStyle` | 取消按钮的样式 | `Record<string, any>` | - |
| `confirm-style` / `confirmStyle` | 确定按钮的样式 | `Record<string, any>` | - |
| `zoom` | 是否开启缩放效果 | `boolean` | `true` |
| `async-close` / `asyncClose` | 是否异步关闭，只对确定按钮有效 | `boolean` | `false` |
| `mask-close-able` / `maskCloseAble` | 是否允许点击遮罩关闭modal | `boolean` | `false` |
| `negative-top` / `negativeTop` | 给一个负的margin-top，往上偏移，避免和键盘重合的情况 | `number \| string` | `0` |
| `global` | 是否作为全局根部 modal（通常放在 App.vue 中，给 useModal() 使用） | `boolean` | `false` |
| `page` | 是否作为页面级 modal（通常放在页面中，给 useModal({ page: true }) 使用） | `boolean \| string` | `false` |

## 双向绑定（v-model）

| 写法 | 通道 | 说明 |
| --- | --- | --- |
| `v-model` | prop + emit（`update:modelValue`） | `modelValue` 属性，默认 `false` |

## 事件

| 事件 | 回调参数 | 说明 |
| --- | --- | --- |
| `@confirm` | - | 确认按钮被点击 |
| `@cancel` | - | 取消按钮被点击 |

## 插槽

| 插槽名 | 说明 |
| --- | --- |
| `default` | - |
| `confirm-button` | - |

## 命令式方法（通过组件 ref 调用）

| 方法 | 说明 |
| --- | --- |
| `clearLoading` | - |
