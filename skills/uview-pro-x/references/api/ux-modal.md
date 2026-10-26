<!-- 生成物，勿手改：由 scripts/gen-api-cards.mjs 渲染，改动会在下次再生成时丢失 -->

# ux-modal API

> 来源：`components/ux-modal`（uview-pro-x v1.0.0）
> API 指纹：`sha256:9e429e94be2c145dcec4c5199438e0256e7ee9123616a2d1f19603d518cf0d53`
> 再生成（组件库源码可读时）：`node scripts/gen-api-cards.mjs --lib <uview-pro-x 路径> --only modal`

弹出模态框，常用于消息提示、消息确认、在当前页面内完成特定的交互操作

## 属性

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `custom-style` / `customStyle` | 自定义根节点样式 | `string \| UTSJSONObject` | - |
| `custom-class` / `customClass` | 自定义根节点样式类 | `string` | `''` |
| `model-value` / `modelValue` | 是否显示模态框 | `boolean` | `false` |
| `z-index` / `zIndex` | 层级 z-index | `string \| number` | `''` |
| `title` | 标题 | `string` | `''` |
| `width` | 弹窗宽度 | `string \| number` | `300` |
| `content` | 弹窗内容 | `string` | `''` |
| `show-title` / `showTitle` | 是否显示标题 | `boolean` | `true` |
| `show-confirm-button` / `showConfirmButton` | 是否显示确认按钮 | `boolean` | `true` |
| `show-cancel-button` / `showCancelButton` | 是否显示取消按钮 | `boolean` | `false` |
| `confirm-text` / `confirmText` | 确认文案 | `string` | `''` |
| `cancel-text` / `cancelText` | 取消文案 | `string` | `''` |
| `confirm-color` / `confirmColor` | 确认按钮颜色 | `string` | `''` |
| `cancel-color` / `cancelColor` | 取消文字颜色 | `string` | `''` |
| `border-radius` / `borderRadius` | 圆角值 | `string \| number` | `8` |
| `title-style` / `titleStyle` | 标题的样式 | `UTSJSONObject` | - |
| `content-style` / `contentStyle` | 内容的样式 | `UTSJSONObject` | - |
| `cancel-style` / `cancelStyle` | 取消按钮的样式 | `UTSJSONObject` | - |
| `confirm-style` / `confirmStyle` | 确定按钮的样式 | `UTSJSONObject` | - |
| `zoom` | 是否开启缩放效果 | `boolean` | `true` |
| `async-close` / `asyncClose` | 是否异步关闭，只对确定按钮有效 | `boolean` | `false` |
| `mask-close-able` / `maskCloseAble` | 是否允许点击遮罩关闭 modal | `boolean` | `false` |
| `margin-top` / `marginTop` | 纵向偏移量：正值下移、负值上移（避开键盘时传负值），透传给 ux-popup 的 margin-top | `string \| number` | `0` |
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

## 外部样式类

| 名称 | 说明 |
| --- | --- |
| `custom-class` | 自定义根节点样式类 |

## 命令式方法（通过组件 ref 调用）

| 方法 | 说明 |
| --- | --- |
| `clearLoading` | - |
