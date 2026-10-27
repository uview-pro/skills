<!-- 生成物，勿手改：由 scripts/gen-api-cards.mjs 渲染，改动会在下次再生成时丢失 -->

# u-message-input API

> 来源：`components/u-message-input`（uview-pro v0.6.21）
> API 指纹：`sha256:5f461111cc9f365070bc113eac716c408bdc2dbbae4e78a83cf8201675c433b6`
> 官方文档：https://uviewpro.cn/zh/components/messageInput.html
> 再生成（组件库源码可读时）：`node scripts/gen-api-cards.mjs --lib <uview-pro 路径> --only message-input`

该组件一般用于验证用户短信验证码的场景，也可以结合uView的键盘组件使用

## 用法示例

```vue
<u-message-input mode="bottomLine"></u-message-input>
```

## 属性

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `custom-style` / `customStyle` | 自定义根节点样式 | `string \| Record<string, any>` | - |
| `custom-class` / `customClass` | 自定义根节点样式类 | `string` | `''` |
| `type` | 输入框的类型，textarea，text，number | `InputType`（`text`｜`number`｜`idcard`｜`digit`｜`password`｜`textarea`｜`phone`｜`url`｜`email`｜`safe-password`｜`name`｜`nickname`｜`bank-card`｜`tel`｜`select`） | `'number'` |
| `maxlength` | 最大输入长度 | `number \| string` | `4` |
| `dot-fill` / `dotFill` | 是否用圆点填充 | `boolean` | `false` |
| `mode` | 显示模式，box-盒子，bottomLine-底部横线，middleLine-中部横线 | `MessageInputMode`（`box`｜`bottomLine`｜`middleLine`） | `'box'` |
| `value` | 预置值 | `string \| number` | `''` |
| `breathe` | 当前激活输入item，是否带有呼吸效果 | `boolean` | `true` |
| `focus` | 是否自动获取焦点 | `boolean` | `false` |
| `bold` | 字体是否加粗 | `boolean` | `false` |
| `font-size` / `fontSize` | 字体大小 | `string \| number` | `60` |
| `active-color` / `activeColor` | 激活样式 | `string` | - |
| `inactive-color` / `inactiveColor` | 未激活的样式 | `string` | - |
| `width` | 输入框的大小，单位rpx，宽等于高 | `number \| string` | `'80'` |
| `disabled-keyboard` / `disabledKeyboard` | 是否隐藏原生键盘 | `boolean` | `false` |

## 双向绑定（v-model）

该组件无双向绑定。

## 事件

| 事件 | 回调参数 | 说明 |
| --- | --- | --- |
| `@change` | - | 输入内容发生改变时触发，具体见官网说明 |
| `@finish` | - | 输入字符个数达maxlength值时触发，见官网说明 |

## 插槽

无插槽。
