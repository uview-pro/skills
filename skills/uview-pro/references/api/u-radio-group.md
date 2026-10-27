<!-- 生成物，勿手改：由 scripts/gen-api-cards.mjs 渲染，改动会在下次再生成时丢失 -->

# u-radio-group API

> 来源：`components/u-radio-group`（uview-pro v0.6.21）
> API 指纹：`sha256:f700749ba644c338d2c611757a47791d5a7635b1f1a83e82edd7aa631763a815`
> 官方文档：https://uviewpro.cn/zh/components/radio.html
> 再生成（组件库源码可读时）：`node scripts/gen-api-cards.mjs --lib <uview-pro 路径> --only radio-group`

单选框用于有一个选择，用户只能选择其中一个的场景。搭配u-radio使用

## 用法示例

```vue
<u-radio-group v-model="value"></u-radio-group>
```

## 属性

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `custom-style` / `customStyle` | 自定义根节点样式 | `string \| Record<string, any>` | - |
| `custom-class` / `customClass` | 自定义根节点样式类 | `string` | `''` |
| `disabled` | 是否禁用所有单选框 | `boolean` | `false` |
| `model-value` / `modelValue` | 匹配某一个radio组件，如果某个radio的name值等于此值，那么这个radio就被会选中 | `string \| number` | `''` |
| `active-color` / `activeColor` | 选中状态下的颜色 | `string` | - |
| `size` | 组件的整体大小 | `number \| string` | `''` |
| `label-disabled` / `labelDisabled` | 是否禁止点击提示语选中复选框 | `boolean` | `false` |
| `shape` | 形状，square为方形，circle为原型 | `Shape`（`circle`｜`square`） | `'circle'` |
| `icon-size` / `iconSize` | 图标的大小，单位rpx | `number \| string` | `''` |
| `width` | 每个checkbox占u-checkbox-group的宽度 | `number \| string` | `'auto'` |
| `wrap` | 是否每个checkbox都换行 | `boolean` | `false` |

## 双向绑定（v-model）

| 写法 | 通道 | 说明 |
| --- | --- | --- |
| `v-model` | prop + emit（`update:modelValue`） | `modelValue` 属性，默认 `''` |

## 事件

| 事件 | 回调参数 | 说明 |
| --- | --- | --- |
| `@change` | - | 任一个radio状态发生变化时触发 |

## 插槽

| 插槽名 | 说明 |
| --- | --- |
| `default` | - |

## 命令式方法（通过组件 ref 调用）

| 方法 | 说明 |
| --- | --- |
| `getData` | - |
| `setValue` | - |
