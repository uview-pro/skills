<!-- 生成物，勿手改：由 scripts/gen-api-cards.mjs 渲染，改动会在下次再生成时丢失 -->

# ux-picker API

> 来源：`components/ux-picker`（uview-pro-x v2.0.0）
> API 指纹：`sha256:cd4898881a26c26acbc12e28eba0d5258856a71b655354452dd4e35777d58dc1`
> 再生成（组件库源码可读时）：`node scripts/gen-api-cards.mjs --lib <uview-pro-x 路径> --only picker`

由 ux-popup 从底部弹出的滚动选择器，支持 selector-单列 / multiSelector-多列 / cascade-级联联动三种模式；列数据全部由 columns 传入，cascade 模式通过 children 逐级展开，滚动上级列自动刷新下级列

## 属性

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `custom-style` / `customStyle` | 自定义根节点样式，对象形式 | `JsonObject` | - |
| `custom-class` / `customClass` | 自定义根节点样式类 | `string` | `''` |
| `model-value` / `modelValue` | v-model 控制弹出与收起 | `boolean` | `false` |
| `columns` | 列数据，全部由外部传入：selector 传 [[a, b, c]]；multiSelector 传 [[a, b], [c, d]]；cascade 传 [[根节点]]，通过 children 展开联动 | `PickerOption[][]` | - |
| `mode` | 模式，selector-单列，multiSelector-多列，cascade-级联联动 | `PickerMode`（`selector`｜`multiSelector`｜`cascade`） | `'selector'` |
| `default-index` / `defaultIndex` | 默认选中的下标 | `number[]` | - |
| `title` | 顶部标题 | `string` | `''` |
| `cancel-text` / `cancelText` | 取消按钮文字 | `string` | `''` |
| `confirm-text` / `confirmText` | 确认按钮文字 | `string` | `''` |
| `cancel-color` / `cancelColor` | 取消按钮颜色 | `string` | `''` |
| `confirm-color` / `confirmColor` | 确认按钮颜色 | `string` | `''` |
| `mask-close-able` / `maskCloseAble` | 是否允许点击遮罩关闭 | `boolean` | `true` |
| `safe-area-inset-bottom` / `safeAreaInsetBottom` | 是否开启底部安全区适配（默认 true，由 ux-popup 在 mode=bottom 时加 padding-bottom） | `boolean` | `true` |
| `z-index` / `zIndex` | 弹出 z-index | `number \| string` | `0` |

## 类型定义

> 本卡引用的自定义类型展开定义（源自组件 types.ts / 全局 types/global.ts），对象字面量可直接赋值。

| 类型 | 定义 |
| --- | --- |
| `JsonObject` | `Record<string, any>`（普通对象，任意键值、可嵌套；全库统一对象类型，含内联样式） |
| `PickerMode` | `'selector' \| 'multiSelector' \| 'cascade'` |
| `PickerOption` | `{ text: string; value?: string \| number; disabled?: boolean; children?: PickerOption[]; }` |

## 双向绑定（v-model）

| 写法 | 通道 | 说明 |
| --- | --- | --- |
| `v-model` | prop + emit（`update:modelValue`） | `modelValue` 属性，默认 `false` |

## 事件

| 事件 | 回调参数 | 说明 |
| --- | --- | --- |
| `@confirm` | `event: JsonObject` | 点击确认时触发，携带 { selectedIndex, selectedValues, selectedOptions } |
| `@cancel` | - | 点击取消时触发 |
| `@change` | `event: JsonObject` | 滚动选中变化时触发，携带 { selectedIndex, selectedValues, selectedOptions } |

## 插槽

| 插槽名 | 说明 |
| --- | --- |
| `title` | 自定义顶部标题 |

## 外部样式类

| 名称 | 说明 |
| --- | --- |
| `custom-class` | 自定义根节点样式类 |

## 命令式方法（通过组件 ref 调用）

| 方法 | 说明 |
| --- | --- |
| `close` | - |
