<!-- 生成物，勿手改：由 scripts/gen-api-cards.mjs 渲染，改动会在下次再生成时丢失 -->

# u-slider API

> 来源：`components/u-slider`（uview-pro v0.6.21）
> API 指纹：`sha256:0b69ae9a12ee93fa45c1bb8c081e82a15b8ec72251df85d2089fbbeca2cca653`
> 官方文档：https://uviewpro.cn/zh/components/slider.html
> 再生成（组件库源码可读时）：`node scripts/gen-api-cards.mjs --lib <uview-pro 路径> --only slider`

滑块选择器

## 用法示例

```vue
<u-slider v-model="value" />
```

## 属性

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `custom-style` / `customStyle` | 自定义根节点样式 | `string \| Record<string, any>` | - |
| `custom-class` / `customClass` | 自定义根节点样式类 | `string` | `''` |
| `model-value` / `modelValue` | 当前进度百分比值，范围0-100 | `number \| string` | `0` |
| `disabled` | 是否禁用滑块 | `boolean` | `false` |
| `block-width` / `blockWidth` | 滑块宽度，高等于宽，单位rpx | `number \| string` | `30` |
| `start` | 滑块总体范围起点值 | `number \| string` | `0` |
| `end` | 滑块总体范围终点值 | `number \| string` | `100` |
| `min` | 最小值 | `number \| string` | `0` |
| `max` | 最大值 | `number \| string` | `100` |
| `step` | 步进值 | `number \| string` | `1` |
| `height` | 滑块条高度，单位rpx | `number \| string` | `6` |
| `active-color` / `activeColor` | 进度条的激活部分颜色 | `string` | - |
| `inactive-color` / `inactiveColor` | 进度条的背景颜色 | `string` | - |
| `block-color` / `blockColor` | 滑块的背景颜色 | `string` | `'var(--u-bg-white)'` |
| `block-style` / `blockStyle` | 用户对滑块的自定义颜色 | `Record<string, any>` | - |
| `show-value` / `showValue` | 是否在滑块上方/下方显示当前数值 | `boolean` | `false` |
| `value-position` / `valuePosition` | 滑块数值显示位置，top-上方，bottom-下方 | `top`｜`bottom` | `'top'` |
| `show-edge-value` / `showEdgeValue` | 是否在起始和结束位置显示数值 | `boolean` | `false` |
| `edge-value-position` / `edgeValuePosition` | 起始和结束数值显示位置，top-上方，bottom-下方 | `top`｜`bottom` | `'top'` |

## 双向绑定（v-model）

| 写法 | 通道 | 说明 |
| --- | --- | --- |
| `v-model` | prop + emit（`update:modelValue`） | `modelValue` 属性，默认 `0` |

## 事件

| 事件 | 回调参数 | 说明 |
| --- | --- | --- |
| `@start` | - | 滑动触发 |
| `@moving` | - | 正在滑动中 |
| `@end` | - | 滑动结束 |

## 插槽

| 插槽名 | 说明 |
| --- | --- |
| `default` | - |
