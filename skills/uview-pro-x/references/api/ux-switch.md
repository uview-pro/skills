<!-- 生成物，勿手改：由 scripts/gen-api-cards.mjs 渲染，改动会在下次再生成时丢失 -->

# ux-switch API

> 来源：`components/ux-switch`（uview-pro-x v1.0.0）
> API 指纹：`sha256:39293c5afd516966e8a8094ca5123a48151091edfcae6a204e63d77c2782d9b9`
> 再生成（组件库源码可读时）：`node scripts/gen-api-cards.mjs --lib <uview-pro-x 路径> --only switch`

选择开关一般用于只有两个选择，且只能选其一的场景。形态：轨道为 50:28 胶囊、**无描边**，白色滑块四周内缩（默认档 3px）且**恒垂直居中**，位移由「一侧内缩」到「轨道宽 - 滑块径 - 一侧内缩」；size 只描述轨道高度，宽/内缩/滑块径随之等比推导。

## 属性

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `custom-style` / `customStyle` | 自定义根节点样式 | `string \| UTSJSONObject` | - |
| `custom-class` / `customClass` | 自定义根节点样式类 | `string` | `''` |
| `loading` | 是否显示加载中状态 | `boolean` | `false` |
| `disabled` | 是否禁用 | `boolean` | `false` |
| `size` | 开关尺寸（轨道高度），small-22px，default-28px，large-34px，或自定义数值（单位px）；宽度按 50:28、四周内缩按 3:28 等比推导，滑块直径 = 轨道高 - 2×内缩（保证滑块始终垂直居中） | `string \| number` | `''` |
| `active-color` / `activeColor` | 打开时的颜色 | `string` | `''` |
| `inactive-color` / `inactiveColor` | 关闭时的颜色（默认 borderColor：亮 #dcdfe6 / 暗 #3a4251） | `string` | `''` |
| `model-value` / `modelValue` | v-model 绑定值，开关状态值 | `boolean \| number \| string` | `false` |
| `vibrate-short` / `vibrateShort` | 是否开启轻微震动反馈 | `boolean` | `false` |
| `active-value` / `activeValue` | 打开时的值 | `boolean \| number \| string` | `true` |
| `inactive-value` / `inactiveValue` | 关闭时的值 | `boolean \| number \| string` | `false` |
| `validate-state` / `validateState` | 输入框的验证状态，用于错误时，边框是否改为红色 | `boolean` | `false` |

## 双向绑定（v-model）

| 写法 | 通道 | 说明 |
| --- | --- | --- |
| `v-model` | prop + emit（`update:modelValue`） | `modelValue` 属性，默认 `false` |

## 事件

| 事件 | 回调参数 | 说明 |
| --- | --- | --- |
| `@change` | `value: boolean \| number \| string` | 在switch打开或关闭时触发 |

## 插槽

无插槽。

## 外部样式类

| 名称 | 说明 |
| --- | --- |
| `custom-class` | 自定义根节点样式类 |
