<!-- 生成物，勿手改：由 scripts/gen-api-cards.mjs 渲染，改动会在下次再生成时丢失 -->

# u-number-box API

> 来源：`components/u-number-box`（uview-pro v0.6.21）
> API 指纹：`sha256:862f976cf23e68ee0fe03644ebc8d7ee470b6a0f414946bfb32e229c13bce7a5`
> 官方文档：https://uviewpro.cn/zh/components/numberBox.html
> 再生成（组件库源码可读时）：`node scripts/gen-api-cards.mjs --lib <uview-pro 路径> --only number-box`

该组件一般用于商城购物选择物品数量的场景。注意：该输入框只能输入大于或等于0的整数，不支持小数输入

## 用法示例

```vue
<u-number-box :min="1" :max="100"></u-number-box>
```

## 属性

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `model-value` / `modelValue` | 输入框初始值（默认1） | `number` | `1` |
| `bg-color` / `bgColor` | 输入框和按钮的背景颜色（默认var(--u-bg-gray-light)） | `string` | `'var(--u-bg-gray-light)'` |
| `min` | 用户可输入的最小值（默认0） | `number` | `0` |
| `max` | 用户可输入的最大值（默认99999） | `number` | `99999` |
| `step` | 步长，每次加或减的值（默认1） | `number` | `1` |
| `disabled` | 是否禁用操作，禁用后无法加减或手动修改输入框的值（默认false） | `boolean` | `false` |
| `size` | 输入框文字和按钮字体大小，单位rpx（默认26） | `number \| string` | `26` |
| `color` | 输入框文字和加减按钮图标的颜色（默认var(--u-main-color)） | `string` | `'var(--u-main-color)'` |
| `input-width` / `inputWidth` | 输入框宽度，单位rpx（默认80） | `number \| string` | `80` |
| `input-height` / `inputHeight` | 输入框和按钮的高度，单位rpx（默认50） | `number \| string` | `50` |
| `index` | 事件回调时用以区分当前发生变化的是哪个输入框 | `number \| string` | `''` |
| `disabled-input` / `disabledInput` | 是否禁止输入框手动输入值（默认false） | `boolean` | `false` |
| `cursor-spacing` / `cursorSpacing` | 指定光标于键盘的距离，避免键盘遮挡输入框，单位rpx（默认100） | `number \| string` | `100` |
| `long-press` / `longPress` | 是否开启长按连续递增或递减(默认true) | `boolean` | `true` |
| `press-time` / `pressTime` | 开启长按触发后，每触发一次需要多久，单位ms(默认250) | `number \| string` | `250` |
| `positive-integer` / `positiveInteger` | 是否只能输入大于或等于0的整数(正整数)（默认true） | `boolean` | `true` |

## 双向绑定（v-model）

| 写法 | 通道 | 说明 |
| --- | --- | --- |
| `v-model` | prop + emit（`update:modelValue`） | `modelValue` 属性，默认 `1` |

## 事件

| 事件 | 回调参数 | 说明 |
| --- | --- | --- |
| `@change` | - | 输入框内容发生变化时触发，对象形式 |
| `@blur` | - | 输入框失去焦点时触发，对象形式 |
| `@focus` | - | 输入框聚焦时触发，对象形式 |
| `@minus` | - | 点击减少按钮时触发(按钮可点击情况下)，对象形式 |
| `@plus` | - | 点击增加按钮时触发(按钮可点击情况下)，对象形式 |

## 插槽

无插槽。
