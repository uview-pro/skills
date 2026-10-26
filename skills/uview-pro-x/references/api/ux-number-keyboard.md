<!-- 生成物，勿手改：由 scripts/gen-api-cards.mjs 渲染，改动会在下次再生成时丢失 -->

# ux-number-keyboard API

> 来源：`components/ux-number-keyboard`（uview-pro-x v1.0.0）
> API 指纹：`sha256:36f464c9859f966a3f01c8a2d448b0266073fd043de5d644374a132bba56cd4a`
> 再生成（组件库源码可读时）：`node scripts/gen-api-cards.mjs --lib <uview-pro-x 路径> --only number-keyboard`

数字 / 身份证键盘面板，支持小数点、按键乱序与长按退格连续删除

## 属性

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `mode` | 键盘的类型，number-数字键盘，card-身份证键盘 | `string` | `'number'` |
| `dot-enabled` / `dotEnabled` | 是否显示键盘的"."符号 | `boolean` | `true` |
| `random` | 是否打乱键盘按键的顺序 | `boolean` | `false` |

## 双向绑定（v-model）

该组件无双向绑定。

## 事件

| 事件 | 回调参数 | 说明 |
| --- | --- | --- |
| `@change` | `value: string \| number` | 点击按键时触发，携带按键内容 |
| `@backspace` | - | 点击退格键时触发；长按会以 250ms 间隔连续触发 |

## 插槽

无插槽。

## 外部样式类

无。
