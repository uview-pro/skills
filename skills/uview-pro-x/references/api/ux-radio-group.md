<!-- 生成物，勿手改：由 scripts/gen-api-cards.mjs 渲染，改动会在下次再生成时丢失 -->

# ux-radio-group API

> 来源：`components/ux-radio-group`（uview-pro-x v1.0.0）
> API 指纹：`sha256:59aaa1974ac7f868882a98e3d7f7643bfce4594435973a9d90ccfb5d161a8d27`
> 再生成（组件库源码可读时）：`node scripts/gen-api-cards.mjs --lib <uview-pro-x 路径> --only radio-group`

单选框用于有一个选择，用户只能选择其中一个的场景。搭配 ux-radio 使用

## 属性

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `custom-style` / `customStyle` | 自定义根节点样式 | `string \| UTSJSONObject` | - |
| `custom-class` / `customClass` | 自定义根节点样式类 | `string` | `''` |
| `model-value` / `modelValue` | 绑定值，选中的 radio 的 name/value（支持 v-model 双向绑定） | `string \| number` | `''` |
| `disabled` | 是否禁用所有 radio（默认false） | `boolean` | `false` |
| `label-disabled` / `labelDisabled` | 是否禁止点击文本操作 radio（默认false） | `boolean` | `false` |
| `shape` | 形状，circle为圆形，square为方形（默认circle） | `circle`｜`square` | `'circle'` |
| `active-color` / `activeColor` | 选中状态下的颜色，应用到所有子 Radio 组件（默认主题色 primary） | `string` | `''` |
| `size` | 组件整体大小，单位px（默认17px） | `string \| number` | `''` |
| `icon-size` / `iconSize` | 图标大小，单位px（默认10px） | `string \| number` | `''` |
| `width` | 每个 radio 占 u-radio-group 的宽度 | `string` | `'auto'` |
| `wrap` | 是否每个 radio 都换行（默认false） | `boolean` | `false` |

## 双向绑定（v-model）

| 写法 | 通道 | 说明 |
| --- | --- | --- |
| `v-model` | prop + emit（`update:modelValue`） | `modelValue` 属性，默认 `''` |

## 事件

| 事件 | 回调参数 | 说明 |
| --- | --- | --- |
| `@change` | `value: string \| number` | 任一个radio状态发生变化时触发，回调为选中的值 |

## 插槽

| 插槽名 | 说明 |
| --- | --- |
| `default` | 放置 ux-radio 子组件 |

## 外部样式类

| 名称 | 说明 |
| --- | --- |
| `custom-class` | 自定义根节点样式类 |
