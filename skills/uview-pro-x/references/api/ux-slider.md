<!-- 生成物，勿手改：由 scripts/gen-api-cards.mjs 渲染，改动会在下次再生成时丢失 -->

# ux-slider API

> 来源：`components/ux-slider`（uview-pro-x v1.0.0）
> API 指纹：`sha256:35a72f4300321eada253001aaa49e012c5d72613ed8a07428dee16b94788db33`
> 再生成（组件库源码可读时）：`node scripts/gen-api-cards.mjs --lib <uview-pro-x 路径> --only slider`

滑块选择器

## 属性

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `custom-style` / `customStyle` | 自定义根节点样式 | `UTSJSONObject` | - |
| `custom-class` / `customClass` | 自定义根节点样式类 | `string` | `''` |
| `model-value` / `modelValue` | 当前值（默认0） | `number \| string` | `0` |
| `start` | 整体范围起点值（默认0） | `number \| string` | `0` |
| `end` | 整体范围终点值（默认50） | `number \| string` | `100` |
| `min` | 有效拖动最小值（默认0） | `number \| string` | `0` |
| `max` | 有效拖动最大值（默认50） | `number \| string` | `100` |
| `step` | 步长（默认1） | `number \| string` | `1` |
| `block-width` / `blockWidth` | 滑块宽度，高等于宽，单位px（默认15） | `number \| string` | `15` |
| `height` | 滑块条高度，单位px（默认3） | `number \| string` | `3` |
| `active-color` / `activeColor` | 进度条激活部分颜色 | `string` | `''` |
| `inactive-color` / `inactiveColor` | 进度条背景颜色 | `string` | `''` |
| `block-color` / `blockColor` | 滑块颜色 | `string` | `''` |
| `block-style` / `blockStyle` | 滑块自定义样式 | `UTSJSONObject` | - |
| `disabled` | 是否禁用滑块（默认false） | `boolean` | `false` |
| `show-value` / `showValue` | 是否显示当前数值（默认false） | `boolean` | `false` |
| `value-position` / `valuePosition` | 数值显示位置，top-上方，bottom-下方（默认top） | `string` | `'top'` |
| `show-edge-value` / `showEdgeValue` | 是否显示起始和结束数值（默认false） | `boolean` | `false` |
| `edge-value-position` / `edgeValuePosition` | 起始和结束数值显示位置（默认top） | `string` | `'top'` |
| `validate-state` / `validateState` | 是否处于校验错误状态（由父级 form-item 联动，默认false） | `boolean` | `false` |

## 双向绑定（v-model）

| 写法 | 通道 | 说明 |
| --- | --- | --- |
| `v-model` | prop + emit（`update:modelValue`） | `modelValue` 属性，默认 `0` |

## 事件

| 事件 | 回调参数 | 说明 |
| --- | --- | --- |
| `@start` | - | - |
| `@moving` | - | - |
| `@end` | - | - |

## 插槽

| 插槽名 | 说明 |
| --- | --- |
| `default` | - |

## 外部样式类

| 名称 | 说明 |
| --- | --- |
| `custom-class` | 自定义根节点样式类 |

## 命令式方法（通过组件 ref 调用）

| 方法 | 说明 |
| --- | --- |
| `innerValue` | - |
| `updateValue` | - |
