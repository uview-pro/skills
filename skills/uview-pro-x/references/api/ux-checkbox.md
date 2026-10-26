<!-- 生成物，勿手改：由 scripts/gen-api-cards.mjs 渲染，改动会在下次再生成时丢失 -->

# ux-checkbox API

> 来源：`components/ux-checkbox`（uview-pro-x v1.0.0）
> API 指纹：`sha256:6378151c1f5c268f9dfa892832a58eaa8db1af9cd22df0c4b069c4a9a06e104d`
> 再生成（组件库源码可读时）：`node scripts/gen-api-cards.mjs --lib <uview-pro-x 路径> --only checkbox`

该组件需要搭配checkboxGroup组件使用，以便用户进行操作时，获得当前复选框组的选中情况。

## 属性

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `custom-style` / `customStyle` | 自定义根节点样式 | `string \| UTSJSONObject` | - |
| `custom-class` / `customClass` | 自定义根节点样式类 | `string` | `''` |
| `label` | checkbox 的标签 | `string` | `''` |
| `name` | checkbox 的标示符（用于 group 收集选中值） | `string \| number` | `''` |
| `value` | checkbox 的值，不传递时为 name 的属性 | `string \| number` | `''` |
| `shape` | 形状，square为方形，circle为圆形 | `circle`｜`square` | - |
| `model-value` / `modelValue` | 是否为选中状态（独立使用时） | `boolean` | `false` |
| `disabled` | 是否禁用 | `boolean` | - |
| `label-disabled` / `labelDisabled` | 是否禁止点击文本操作 checkbox | `boolean` | - |
| `active-color` / `activeColor` | 选中状态下的颜色，如设置此值，将会覆盖 checkboxGroup 的 activeColor 值 | `string` | - |
| `icon-size` / `iconSize` | 图标大小，单位px | `string \| number` | - |
| `label-size` / `labelSize` | label 的字体大小，px 单位 | `string \| number` | `''` |
| `size` | 组件的整体大小 | `string \| number` | - |

## 双向绑定（v-model）

| 写法 | 通道 | 说明 |
| --- | --- | --- |
| `v-model` | prop + emit（`update:modelValue`） | `modelValue` 属性，默认 `false` |

## 事件

| 事件 | 回调参数 | 说明 |
| --- | --- | --- |
| `@change` | `value: boolean` | 某个checkbox状态发生变化时触发，回调为一个对象 |

## 插槽

| 插槽名 | 说明 |
| --- | --- |
| `default` | - |

## 外部样式类

| 名称 | 说明 |
| --- | --- |
| `custom-class` | 自定义根节点样式类 |
