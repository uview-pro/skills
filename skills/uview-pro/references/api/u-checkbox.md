<!-- 生成物，勿手改：由 scripts/gen-api-cards.mjs 渲染，改动会在下次再生成时丢失 -->

# u-checkbox API

> 来源：`components/u-checkbox`（uview-pro v0.6.21）
> API 指纹：`sha256:2f32df9e2652a2e0c9b9e45a23514ffe884e210e5efd7d3189e4c0dc9c552908`
> 官方文档：https://uviewpro.cn/zh/components/checkbox.html
> 再生成（组件库源码可读时）：`node scripts/gen-api-cards.mjs --lib <uview-pro 路径> --only checkbox`

该组件需要搭配checkboxGroup组件使用，以便用户进行操作时，获得当前复选框组的选中情况。

## 用法示例

```vue
<u-checkbox v-model="checked" :disabled="false">天涯</u-checkbox>
```

## 属性

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `custom-style` / `customStyle` | 自定义根节点样式 | `string \| Record<string, any>` | - |
| `custom-class` / `customClass` | 自定义根节点样式类 | `string` | `''` |
| `label` | checkbox的标签 | `string` | `''` |
| `name` | checkbox的值 | `string \| number` | `''` |
| `value` | checkbox的值，不传递时为name的属性 | `string \| number` | `''` |
| `shape` | 形状，square为方形，circle为原型 | `Shape`（`circle`｜`square`） | `''` |
| `model-value` / `modelValue` | 是否为选中状态 | `boolean` | `false` |
| `disabled` | 是否禁用 | `string \| boolean` | `''` |
| `label-disabled` / `labelDisabled` | 是否禁止点击提示语选中复选框 | `string \| boolean` | `''` |
| `active-color` / `activeColor` | 选中状态下的颜色，如设置此值，将会覆盖checkboxGroup的activeColor值 | `string` | `''` |
| `icon-size` / `iconSize` | 图标的大小，单位rpx | `string \| number` | `''` |
| `label-size` / `labelSize` | label的字体大小，rpx单位 | `string \| number` | `''` |
| `size` | 组件的整体大小 | `SizeType \| string \| number` | `''` |

## 双向绑定（v-model）

| 写法 | 通道 | 说明 |
| --- | --- | --- |
| `v-model` | prop + emit（`update:modelValue`） | `modelValue` 属性，默认 `false` |

## 事件

| 事件 | 回调参数 | 说明 |
| --- | --- | --- |
| `@change` | - | 某个checkbox状态发生变化时触发，回调为一个对象 |

## 插槽

| 插槽名 | 说明 |
| --- | --- |
| `default` | - |

## 命令式方法（通过组件 ref 调用）

| 方法 | 说明 |
| --- | --- |
| `isChecked` | - |
| `label` | - |
| `name` | - |
| `value` | - |
| `setValue` | - |
| `emitEvent` | - |
| `setChecked` | - |
