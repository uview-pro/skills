<!-- 生成物，勿手改：由 scripts/gen-api-cards.mjs 渲染，改动会在下次再生成时丢失 -->

# u-car-keyboard API

> 来源：`components/u-car-keyboard`（uview-pro v0.6.21）
> API 指纹：`sha256:f8ad4c39583cddee864dc7088af71d4fed27f80e780007bb0da1f5690078f96d`
> 再生成（组件库源码可读时）：`node scripts/gen-api-cards.mjs --lib <uview-pro 路径> --only car-keyboard`

车牌号输入专用键盘，支持省份简称和字母数字切换，支持按键顺序打乱。

## 属性

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `custom-style` / `customStyle` | 自定义根节点样式 | `string \| Record<string, any>` | - |
| `custom-class` / `customClass` | 自定义根节点样式类 | `string` | `''` |
| `random` | 是否打乱键盘按键的顺序 | `boolean` | `false` |

## 双向绑定（v-model）

该组件无双向绑定。

## 事件

| 事件 | 回调参数 | 说明 |
| --- | --- | --- |
| `@change` | - | 按键被点击 |
| `@backspace` | - | 退格键被点击 |

## 插槽

无插槽。
