<!-- 生成物，勿手改：由 scripts/gen-api-cards.mjs 渲染，改动会在下次再生成时丢失 -->

# u-number-keyboard API

> 来源：`components/u-number-keyboard`（uview-pro v0.6.21）
> API 指纹：`sha256:0465a622a60271be5026ae2d16d788750155d72eb0e5f182e07e5b38d2b38d77`
> 再生成（组件库源码可读时）：`node scripts/gen-api-cards.mjs --lib <uview-pro 路径> --only number-keyboard`

支持数字、身份证、带小数点等多种模式，支持乱序，支持长按退格。

## 属性

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `mode` | 键盘的类型，number-数字键盘，card-身份证键盘 | `NumberKeyboardMode`（`number`｜`card`） | `'number'` |
| `dot-enabled` / `dotEnabled` | 是否显示键盘的"."符号 | `boolean` | `true` |
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
