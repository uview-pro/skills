<!-- 生成物，勿手改：由 scripts/gen-api-cards.mjs 渲染，改动会在下次再生成时丢失 -->

# ux-keyboard API

> 来源：`components/ux-keyboard`（uview-pro-x v1.0.0）
> API 指纹：`sha256:d5921c3bf5663365fa218d4f430ce4694431124515c77e376ed0ce49801142f7`
> 再生成（组件库源码可读时）：`node scripts/gen-api-cards.mjs --lib <uview-pro-x 路径> --only keyboard`

自定义键盘面板，按 mode 内置数字 / 身份证 / 车牌号三种键盘，以底部弹层承载；顶部工具条提供取消与确认，支持点击遮罩关闭、底部安全区适配与工具条文案定制

## 属性

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `mode` | 键盘的类型，number-数字键盘，card-身份证键盘，car-车牌号键盘 | `string` | `'number'` |
| `dot-enabled` / `dotEnabled` | 是否显示键盘的"."符号 | `boolean` | `true` |
| `tooltip` | 是否显示顶部工具条 | `boolean` | `true` |
| `show-tips` / `showTips` | 是否显示工具条中间的提示 | `boolean` | `true` |
| `tips` | 工具条中间的提示文字 | `string` | `''` |
| `cancel-btn` / `cancelBtn` | 是否显示工具条左边的"取消"按钮 | `boolean` | `true` |
| `confirm-btn` / `confirmBtn` | 是否显示工具条右边的"完成"按钮 | `boolean` | `true` |
| `random` | 是否打乱键盘按键的顺序 | `boolean` | `false` |
| `safe-area-inset-bottom` / `safeAreaInsetBottom` | 是否开启底部安全区适配（默认 true，由 ux-popup 在 mode=bottom 时加 padding-bottom） | `boolean` | `true` |
| `mask-close-able` / `maskCloseAble` | 是否允许通过点击遮罩关闭键盘 | `boolean` | `true` |
| `model-value` / `modelValue` | 通过双向绑定控制键盘的弹出与收起 | `boolean` | `false` |
| `mask` | 是否显示遮罩 | `boolean` | `true` |
| `z-index` / `zIndex` | z-index值 | `string \| number` | - |
| `cancel-text` / `cancelText` | 取消按钮的文字 | `string` | `''` |
| `confirm-text` / `confirmText` | 确认按钮的文字 | `string` | `''` |
| `custom-class` / `customClass` | 自定义根节点样式类 | `string` | `''` |
| `custom-style` / `customStyle` | 自定义根节点样式 | `string \| UTSJSONObject` | - |

## 双向绑定（v-model）

| 写法 | 通道 | 说明 |
| --- | --- | --- |
| `v-model` | prop + emit（`update:modelValue`） | `modelValue` 属性，默认 `false` |

## 事件

| 事件 | 回调参数 | 说明 |
| --- | --- | --- |
| `@change` | `value: string \| number` | 点击按键时触发，携带按键内容 |
| `@confirm` | - | 点击工具条「完成」时触发 |
| `@cancel` | - | 点击工具条「取消」时触发 |
| `@backspace` | - | 点击退格键时触发；长按会连续触发 |

## 插槽

| 插槽名 | 说明 |
| --- | --- |
| `default` | 键盘工具条下方、按键区上方的自定义内容 |

## 外部样式类

| 名称 | 说明 |
| --- | --- |
| `custom-class` | 自定义根节点样式类 |
