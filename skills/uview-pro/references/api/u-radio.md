<!-- 生成物，勿手改：由 scripts/gen-api-cards.mjs 渲染，改动会在下次再生成时丢失 -->

# u-radio API

> 来源：`components/u-radio`（uview-pro v0.6.21）
> API 指纹：`sha256:971c53981b6d6529a07a970d07ca82f326413b54a6d9885a5fc92bb88b1bd42b`
> 官方文档：https://uviewpro.cn/zh/components/radio.html
> 再生成（组件库源码可读时）：`node scripts/gen-api-cards.mjs --lib <uview-pro 路径> --only radio`

单选框用于有一个选择，用户只能选择其中一个的场景。搭配u-radio-group使用

## 用法示例

```vue
<u-radio :label-disabled="false">门掩黄昏，无计留春住</u-radio>
```

## 属性

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `custom-style` / `customStyle` | 自定义根节点样式 | `string \| Record<string, any>` | - |
| `custom-class` / `customClass` | 自定义根节点样式类 | `string` | `''` |
| `label` | 单选框显示的文字说明 | `string` | `''` |
| `value` | 单选框的值，用于与 u-radio-group 的 v-model 比对标识选中状态 | `string \| number` | `''` |
| `name` | radio的名称 | `string \| number` | `''` |
| `shape` | 形状，square为方形，circle为圆形 | `Shape`（`circle`｜`square`） | `''` |
| `disabled` | 是否禁用 | `string \| boolean` | `''` |
| `label-disabled` / `labelDisabled` | 是否禁止点击提示语选中复选框 | `string \| boolean` | `''` |
| `active-color` / `activeColor` | 选中状态下的颜色，如设置此值，将会覆盖parent的activeColor值 | `string` | `''` |
| `icon-size` / `iconSize` | 图标的大小，单位rpx | `number \| string` | `''` |
| `label-size` / `labelSize` | label的字体大小，rpx单位 | `number \| string` | `''` |
| `size` | 组件的整体大小 | `SizeType \| string \| number` | `''` |

## 双向绑定（v-model）

该组件无双向绑定。

## 事件

| 事件 | 回调参数 | 说明 |
| --- | --- | --- |
| `@change` | - | 某个radio状态发生变化时触发(选中状态) |

## 插槽

| 插槽名 | 说明 |
| --- | --- |
| `default` | - |
