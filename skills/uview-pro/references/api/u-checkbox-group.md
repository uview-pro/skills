<!-- 生成物，勿手改：由 scripts/gen-api-cards.mjs 渲染，改动会在下次再生成时丢失 -->

# u-checkbox-group API

> 来源：`components/u-checkbox-group`（uview-pro v0.6.21）
> API 指纹：`sha256:47bcd069f17d42f29ecd1c0f4e9aa9bdc60949dcce5d8e53530ce8b683ab7c9d`
> 官方文档：https://uviewpro.cn/zh/components/checkbox.html
> 再生成（组件库源码可读时）：`node scripts/gen-api-cards.mjs --lib <uview-pro 路径> --only checkbox-group`

复选框组件一般用于需要多个选择的场景，该组件功能完整，使用方便

## 用法示例

```vue
<u-checkbox-group v-model="selectedValues">
             <u-checkbox name="apple">苹果</u-checkbox>
             <u-checkbox name="banana">香蕉</u-checkbox>
         </u-checkbox-group>
```

## 属性

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `custom-style` / `customStyle` | 自定义根节点样式 | `string \| Record<string, any>` | - |
| `custom-class` / `customClass` | 自定义根节点样式类 | `string` | `''` |
| `model-value` / `modelValue` | 绑定值，选中的复选框name组成的数组 | `(string \| number)[]` | - |
| `max` | 最多能选中多少个checkbox | `number` | `999` |
| `disabled` | 是否禁用所有复选框 | `boolean` | `false` |
| `name` | 在表单内提交时的标识符 | `boolean \| string` | `''` |
| `label-disabled` / `labelDisabled` | 是否禁止点击提示语选中复选框 | `boolean` | `false` |
| `shape` | 形状，square为方形，circle为原型 | `Shape`（`circle`｜`square`） | `'square'` |
| `active-color` / `activeColor` | 选中状态下的颜色 | `string` | - |
| `size` | 组件的整体大小，单位rpx，默认34rpx | `string \| number` | `''` |
| `width` | 每个checkbox占u-checkbox-group的宽度 | `string` | `'auto'` |
| `wrap` | 是否每个checkbox都换行 | `boolean` | `false` |
| `icon-size` / `iconSize` | 图标的大小，单位rpx，默认20rpx | `string \| number` | `''` |

## 双向绑定（v-model）

| 写法 | 通道 | 说明 |
| --- | --- | --- |
| `v-model` | prop + emit（`update:modelValue`） | `modelValue` 属性，默认 `undefined` |

## 事件

| 事件 | 回调参数 | 说明 |
| --- | --- | --- |
| `@change` | - | 任一个checkbox状态发生变化时触发，回调为选中的name数组 |

## 插槽

| 插槽名 | 说明 |
| --- | --- |
| `default` | - |

## 命令式方法（通过组件 ref 调用）

| 方法 | 说明 |
| --- | --- |
| `emitEvent` | - |
| `setAllChecked` | - |
| `getSelectedValues` | - |
| `validateSelection` | - |
| `syncChildrenSelection` | - |
| `selectedCount` | - |
| `isFull` | - |
| `isEmpty` | - |
| `getChildrenCount` | - |
