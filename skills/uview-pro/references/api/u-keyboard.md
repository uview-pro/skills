<!-- 生成物，勿手改：由 scripts/gen-api-cards.mjs 渲染，改动会在下次再生成时丢失 -->

# u-keyboard API

> 来源：`components/u-keyboard`（uview-pro v0.6.21）
> API 指纹：`sha256:038eef942d27fd88e76c40ddae8db0a36d3a6e0365aa3ad0c2eef6e173d10d53`
> 官方文档：https://uviewpro.cn/zh/components/keyboard.html
> 再生成（组件库源码可读时）：`node scripts/gen-api-cards.mjs --lib <uview-pro 路径> --only keyboard`

此为uViw自定义的键盘面板，内含了数字键盘，车牌号键，身份证号键盘3中模式，都有可以打乱按键顺序的选项。

## 用法示例

```vue
<u-keyboard mode="number" v-model="show"></u-keyboard>
```

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
| `safe-area-inset-bottom` / `safeAreaInsetBottom` | 是否开启底部安全区适配 | `boolean` | `false` |
| `mask-close-able` / `maskCloseAble` | 是否允许通过点击遮罩关闭键盘 | `boolean` | `true` |
| `model-value` / `modelValue` | 通过双向绑定控制键盘的弹出与收起 | `boolean` | `false` |
| `mask` | 是否显示遮罩 | `boolean` | `true` |
| `z-index` / `zIndex` | z-index值 | `string \| number` | `''` |
| `cancel-text` / `cancelText` | 取消按钮的文字 | `string` | `''` |
| `confirm-text` / `confirmText` | 确认按钮的文字 | `string` | `''` |

## 双向绑定（v-model）

| 写法 | 通道 | 说明 |
| --- | --- | --- |
| `v-model` | prop + emit（`update:modelValue`） | `modelValue` 属性，默认 `false` |

## 事件

| 事件 | 回调参数 | 说明 |
| --- | --- | --- |
| `@change` | - | 按键被点击(不包含退格键被点击) |
| `@confirm` | - | 键盘顶部工具条右边的"完成"按钮被点击 |
| `@cancel` | - | 键盘顶部工具条左边的"取消"按钮被点击 |
| `@backspace` | - | 键盘退格键被点击 |

## 插槽

| 插槽名 | 说明 |
| --- | --- |
| `default` | - |
