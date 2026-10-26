<!-- 生成物，勿手改：由 scripts/gen-api-cards.mjs 渲染，改动会在下次再生成时丢失 -->

# ux-car-keyboard API

> 来源：`components/ux-car-keyboard`（uview-pro-x v1.0.0）
> API 指纹：`sha256:648c0a03412b9c74a370bec6a866f3c394c7dabe3eaf5660e2d259999fa76c9f`
> 再生成（组件库源码可读时）：`node scripts/gen-api-cards.mjs --lib <uview-pro-x 路径> --only car-keyboard`

车牌号键盘：省份简称与字母数字两套按键，按「中 / 英」按钮切换；支持 long press 长按退格连续删除（250ms 间隔）与 random 按键乱序

## 属性

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `custom-style` / `customStyle` | 自定义根节点样式 | `UTSJSONObject` | - |
| `custom-class` / `customClass` | 自定义根节点样式类 | `string` | `''` |
| `random` | 是否打乱键盘按键的顺序 | `boolean` | `false` |

## 双向绑定（v-model）

该组件无双向绑定。

## 事件

| 事件 | 回调参数 | 说明 |
| --- | --- | --- |
| `@change` | `value: string` | 点击按键时触发，携带按键内容 |
| `@backspace` | - | 点击退格键时触发；长按会以 250ms 间隔连续触发 |

## 插槽

无插槽。

## 外部样式类

| 名称 | 说明 |
| --- | --- |
| `custom-class` | 自定义根节点样式类 |
