<!-- 生成物，勿手改：由 scripts/gen-api-cards.mjs 渲染，改动会在下次再生成时丢失 -->

# ux-number-box API

> 来源：`components/ux-number-box`（uview-pro-x v1.0.0）
> API 指纹：`sha256:adf867dff71a20cdf2a6b3d2ea460cfa6b0b875965ef5782901e58b31c1e0634`
> 再生成（组件库源码可读时）：`node scripts/gen-api-cards.mjs --lib <uview-pro-x 路径> --only number-box`

该组件一般用于商城购物选择物品数量的场景。

## 属性

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `custom-style` / `customStyle` | 自定义根节点样式 | `UTSJSONObject` | - |
| `custom-class` / `customClass` | 自定义根节点样式类 | `string` | `''` |
| `model-value` / `modelValue` | 输入框初始值（默认1） | `number` | `1` |
| `bg-color` / `bgColor` | 输入框和按钮的背景颜色 | `string` | `''` |
| `min` | 用户可输入的最小值（默认0） | `number` | `0` |
| `max` | 用户可输入的最大值（默认50000） | `number` | `99999` |
| `step` | 步长，每次加或减的值（默认1） | `number` | `1` |
| `disabled` | 是否禁用操作（默认false） | `boolean` | `false` |
| `size` | 输入框文字和按钮字体大小，单位px（默认13） | `number \| string` | `13` |
| `color` | 输入框文字和加减按钮图标的颜色 | `string` | `''` |
| `input-width` / `inputWidth` | 输入框宽度，单位px（默认40） | `number \| string` | `40` |
| `input-height` / `inputHeight` | 输入框和按钮的高度，单位px（默认25） | `number \| string` | `25` |
| `index` | 事件回调时用以区分当前发生变化的是哪个输入框 | `number \| string` | `''` |
| `disabled-input` / `disabledInput` | 是否禁止输入框手动输入值（默认false） | `boolean` | `false` |
| `cursor-spacing` / `cursorSpacing` | 指定光标于键盘的距离（默认50） | `number \| string` | `100` |
| `long-press` / `longPress` | 是否开启长按连续递增或递减（默认true） | `boolean` | `true` |
| `press-time` / `pressTime` | 开启长按触发后，每触发一次需要多久，单位ms（默认125） | `number \| string` | `250` |
| `positive-integer` / `positiveInteger` | 是否只能输入正整数（默认true） | `boolean` | `true` |
| `validate-state` / `validateState` | 校验错误状态，用于错误时边框是否改为红色 | `boolean` | `false` |

## 双向绑定（v-model）

| 写法 | 通道 | 说明 |
| --- | --- | --- |
| `v-model` | prop + emit（`update:modelValue`） | `modelValue` 属性，默认 `1` |

## 事件

| 事件 | 回调参数 | 说明 |
| --- | --- | --- |
| `@change` | `value: UTSJSONObject` | 输入框内容发生变化时触发 |
| `@blur` | `value: UTSJSONObject` | 输入框失去焦点时触发 |
| `@focus` | - | - |
| `@minus` | `value: UTSJSONObject` | 点击减少按钮时触发 |
| `@plus` | `value: UTSJSONObject` | 点击增加按钮时触发 |

## 插槽

无插槽。

## 外部样式类

| 名称 | 说明 |
| --- | --- |
| `custom-class` | 自定义根节点样式类 |

## 命令式方法（通过组件 ref 调用）

| 方法 | 说明 |
| --- | --- |
| `inputVal` | - |
