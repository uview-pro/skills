<!-- 生成物，勿手改：由 scripts/gen-api-cards.mjs 渲染，改动会在下次再生成时丢失 -->

# ux-radio API

> 来源：`components/ux-radio`（uview-pro-x v1.0.0）
> API 指纹：`sha256:0b713654effd399038d87f78e7560d252eecece36bff818fc52690703241dfc3`
> 再生成（组件库源码可读时）：`node scripts/gen-api-cards.mjs --lib <uview-pro-x 路径> --only radio`

单选框用于有一个选择，用户只能选择其中一个的场景。搭配 ux-radio-group 使用

## 属性

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `custom-style` / `customStyle` | 自定义根节点样式 | `string \| UTSJSONObject` | - |
| `custom-class` / `customClass` | 自定义根节点样式类 | `string` | `''` |
| `label` | radio 的标签 | `string` | `''` |
| `name` | radio 的标示符（用于 group 收集选中值） | `string \| number` | `''` |
| `value` | radio 的值，不传递时为 name 的属性 | `string \| number` | `''` |
| `shape` | 形状，circle为圆形，square为方形 | `circle`｜`square` | - |
| `disabled` | 是否禁用 | `boolean` | - |
| `label-disabled` / `labelDisabled` | 是否禁止点击文本操作 radio | `boolean` | - |
| `active-color` / `activeColor` | 选中状态下的颜色，如设置此值，将会覆盖 radioGroup 的 activeColor 值 | `string` | - |
| `icon-size` / `iconSize` | 图标大小，单位px | `string \| number` | - |
| `label-size` / `labelSize` | label 的字体大小，px 单位 | `string \| number` | `''` |
| `size` | 组件的整体大小 | `string \| number` | - |

## 双向绑定（v-model）

该组件无双向绑定。

## 事件

| 事件 | 回调参数 | 说明 |
| --- | --- | --- |
| `@change` | `value: string \| number` | 某个radio状态发生变化时触发，回调为选中的值 |

## 插槽

| 插槽名 | 说明 |
| --- | --- |
| `default` | 自定义 label 内容（默认显示 label 文本） |

## 外部样式类

| 名称 | 说明 |
| --- | --- |
| `custom-class` | 自定义根节点样式类 |
