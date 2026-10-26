<!-- 生成物，勿手改：由 scripts/gen-api-cards.mjs 渲染，改动会在下次再生成时丢失 -->

# ux-checkbox-group API

> 来源：`components/ux-checkbox-group`（uview-pro-x v1.0.0）
> API 指纹：`sha256:800dd3f967441e06ee59a9552794a4289b989a2a03a371aa492fd6039947cfe0`
> 再生成（组件库源码可读时）：`node scripts/gen-api-cards.mjs --lib <uview-pro-x 路径> --only checkbox-group`

复选框组件一般用于需要多个选择的场景，该组件功能完整，使用方便

## 属性

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `custom-style` / `customStyle` | 自定义根节点样式 | `string \| UTSJSONObject` | - |
| `custom-class` / `customClass` | 自定义根节点样式类 | `string` | `''` |
| `model-value` / `modelValue` | 绑定值，选中的复选框 name 组成的数组（支持 v-model 双向绑定） | `(string \| number)[]` | - |
| `max` | 最多能选中多少个 checkbox（默认500） | `number` | `999` |
| `disabled` | 是否禁用所有 checkbox（默认false） | `boolean` | `false` |
| `name` | 在表单内提交时的标识符 | `string \| boolean` | `''` |
| `label-disabled` / `labelDisabled` | 是否禁止点击文本操作 checkbox（默认false） | `boolean` | `false` |
| `shape` | 形状，square为方形，circle为圆形（默认square） | `circle`｜`square` | `'square'` |
| `active-color` / `activeColor` | 选中状态下的颜色，应用到所有子 Checkbox 组件（默认主题色 primary） | `string` | `''` |
| `size` | 组件整体大小，单位px（默认17px） | `string \| number` | `''` |
| `width` | 每个 checkbox 占 u-checkbox-group 的宽度 | `string` | `'auto'` |
| `wrap` | 是否每个 checkbox 都换行（默认false） | `boolean` | `false` |
| `icon-size` / `iconSize` | 图标大小，单位px（默认10px） | `string \| number` | `''` |

## 双向绑定（v-model）

| 写法 | 通道 | 说明 |
| --- | --- | --- |
| `v-model` | prop + emit（`update:modelValue`） | `modelValue` 属性，默认 `(): (string \| number)[] => ([])` |

## 事件

| 事件 | 回调参数 | 说明 |
| --- | --- | --- |
| `@change` | `value: (string \| number)[]` | 任一个checkbox状态发生变化时触发，回调为选中的name数组 |

## 插槽

| 插槽名 | 说明 |
| --- | --- |
| `default` | - |

## 外部样式类

| 名称 | 说明 |
| --- | --- |
| `custom-class` | 自定义根节点样式类 |
