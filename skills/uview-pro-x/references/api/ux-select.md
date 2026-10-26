<!-- 生成物，勿手改：由 scripts/gen-api-cards.mjs 渲染，改动会在下次再生成时丢失 -->

# ux-select API

> 来源：`components/ux-select`（uview-pro-x v1.0.0）
> API 指纹：`sha256:b4629cc8a0197781d812f468ff1a4bbe1e3a337323eb798be0ec17bf24e8b631`
> 再生成（组件库源码可读时）：`node scripts/gen-api-cards.mjs --lib <uview-pro-x 路径> --only select`

由 ux-popup 从底部弹出的列选择器，支持 single-column-单列 / mutil-column-多列 / mutil-column-auto-多列联动三种模式；list 项的 label / value / children 字段名可自定义，preserve-selection 开启时再次打开会恢复上次确认的选择

## 属性

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `custom-style` / `customStyle` | 自定义根节点样式，对象形式 | `UTSJSONObject` | - |
| `custom-class` / `customClass` | 自定义根节点样式类 | `string` | `''` |
| `list` | 列数据，外部传入 | `SelectListItem[] \| SelectListItem[][]` | - |
| `model-value` / `modelValue` | v-model 控制弹出与收起 | `boolean` | `false` |
| `cancel-color` / `cancelColor` | 取消按钮颜色 | `string` | `''` |
| `confirm-color` / `confirmColor` | 确认按钮颜色 | `string` | `''` |
| `z-index` / `zIndex` | 弹出 z-index | `number \| string` | `0` |
| `safe-area-inset-bottom` / `safeAreaInsetBottom` | 是否开启底部安全区适配（默认 true，由 ux-popup 在 mode=bottom 时加 padding-bottom） | `boolean` | `true` |
| `mask-close-able` / `maskCloseAble` | 是否允许点击遮罩关闭 | `boolean` | `true` |
| `default-value` / `defaultValue` | 默认选中的下标 | `number[]` | - |
| `preserve-selection` / `preserveSelection` | 是否保留用户上次确认的选择 | `boolean` | `true` |
| `mode` | 模式，single-column-单列，mutil-column-多列，mutil-column-auto-多列联动 | `SelectMode`（`single-column`｜`mutil-column`｜`mutil-column-auto`） | `'single-column'` |
| `value-name` / `valueName` | 自定义 value 属性名 | `string` | `'value'` |
| `label-name` / `labelName` | 自定义 label 属性名 | `string` | `'label'` |
| `child-name` / `childName` | 自定义多列联动模式的 children 属性名 | `string` | `'children'` |
| `title` | 顶部标题 | `string` | `''` |
| `cancel-text` / `cancelText` | 取消按钮文字 | `string` | `''` |
| `confirm-text` / `confirmText` | 确认按钮文字 | `string` | `''` |

## 双向绑定（v-model）

| 写法 | 通道 | 说明 |
| --- | --- | --- |
| `v-model` | prop + emit（`update:modelValue`） | `modelValue` 属性，默认 `false` |

## 事件

| 事件 | 回调参数 | 说明 |
| --- | --- | --- |
| `@confirm` | `value: UTSJSONObject[]` | 点击确认时触发，携带选中项数组（按列的 SelectListItem 列表） |
| `@cancel` | - | 点击取消时触发 |

## 插槽

无插槽。

## 外部样式类

| 名称 | 说明 |
| --- | --- |
| `custom-class` | 自定义根节点样式类 |

## 命令式方法（通过组件 ref 调用）

| 方法 | 说明 |
| --- | --- |
| `close` | - |
