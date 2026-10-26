<!-- 生成物，勿手改：由 scripts/gen-api-cards.mjs 渲染，改动会在下次再生成时丢失 -->

# ux-rate API

> 来源：`components/ux-rate`（uview-pro-x v1.0.0）
> API 指纹：`sha256:e7fb96341b69d27d5e313a476e87f04634df6d2b65878e8357c3a6f3b378fa03`
> 再生成（组件库源码可读时）：`node scripts/gen-api-cards.mjs --lib <uview-pro-x 路径> --only rate`

该组件一般用于满意度调查，星型评分的场景

## 属性

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `custom-style` / `customStyle` | 自定义根节点样式 | `string \| UTSJSONObject` | - |
| `custom-class` / `customClass` | 自定义根节点样式类 | `string` | `''` |
| `model-value` / `modelValue` | v-model双向绑定选中的星星数量 | `number \| string` | `-1` |
| `count` | 要显示的星星数量 | `number \| string` | `5` |
| `current` | 当前需要默认选中的星星(选中的个数) | `number \| string` | `0` |
| `disabled` | 是否不可选中 | `boolean` | `false` |
| `size` | 星星的大小，单位px | `number \| string` | `16` |
| `inactive-color` / `inactiveColor` | 未选中时的颜色 | `string` | `''` |
| `active-color` / `activeColor` | 选中的颜色 | `string` | `''` |
| `gutter` | 星星之间的间距，单位px | `number \| string` | `5` |
| `min-count` / `minCount` | 最少能选择的星星个数 | `number \| string` | `0` |
| `allow-half` / `allowHalf` | 是否允许半星 | `boolean` | `false` |
| `active-icon` / `activeIcon` | 选中时的图标(星星) | `string` | `'star-fill'` |
| `inactive-icon` / `inactiveIcon` | 未选中时的图标(星星) | `string` | `'star'` |
| `custom-prefix` / `customPrefix` | 自定义扩展前缀，方便用户扩展自己的图标库 | `string` | `'uicon'` |
| `colors` | 分段颜色 | `string[]` | - |
| `icons` | 分段图标 | `string[]` | - |

## 双向绑定（v-model）

| 写法 | 通道 | 说明 |
| --- | --- | --- |
| `v-model` | prop + emit（`update:modelValue`） | `modelValue` 属性，默认 `-1` |

## 事件

| 事件 | 回调参数 | 说明 |
| --- | --- | --- |
| `@change` | `value: number` | 选中的星星发生变化时触发 |

## 插槽

无插槽。

## 外部样式类

| 名称 | 说明 |
| --- | --- |
| `custom-class` | 自定义根节点样式类 |
