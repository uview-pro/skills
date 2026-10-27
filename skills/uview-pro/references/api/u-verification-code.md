<!-- 生成物，勿手改：由 scripts/gen-api-cards.mjs 渲染，改动会在下次再生成时丢失 -->

# u-verification-code API

> 来源：`components/u-verification-code`（uview-pro v0.6.21）
> API 指纹：`sha256:0c680bc21473adeff97cc7b4aa89832473130b2df6796b0163f7133e20118bcd`
> 官方文档：https://uviewpro.cn/zh/components/verificationCode.html
> 再生成（组件库源码可读时）：`node scripts/gen-api-cards.mjs --lib <uview-pro 路径> --only verification-code`

考虑到用户实际发送验证码的场景，可能是一个按钮，也可能是一段文字，提示语各有不同，所以本组件不提供界面显示，只提供提示语，由用户将提示语嵌入到具体的场景

## 用法示例

```vue
<u-verification-code :seconds="seconds" @end="end" @start="start" ref="uCode" />
```

## 属性

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `custom-style` / `customStyle` | 自定义根节点样式 | `string \| Record<string, any>` | - |
| `custom-class` / `customClass` | 自定义根节点样式类 | `string` | `''` |
| `seconds` | 倒计时时长，单位秒 | `string \| number` | `60` |
| `start-text` / `startText` | 开始时按钮文字 | `string` | `''` |
| `change-text` / `changeText` | 倒计时进行中按钮文字，X为剩余秒数 | `string` | `''` |
| `end-text` / `endText` | 结束时按钮文字 | `string` | `''` |
| `keep-running` / `keepRunning` | 是否保持倒计时不中断（如页面切换） | `boolean` | `false` |
| `unique-key` / `uniqueKey` | 唯一标识key，用于区分多个验证码组件 | `string` | `''` |

## 双向绑定（v-model）

该组件无双向绑定。

## 事件

| 事件 | 回调参数 | 说明 |
| --- | --- | --- |
| `@change` | - | 倒计时期间，每秒触发一次 |
| `@start` | - | 开始倒计时触发 |
| `@end` | - | 结束倒计时触发 |

## 插槽

无插槽。

## 命令式方法（通过组件 ref 调用）

| 方法 | 说明 |
| --- | --- |
| `start` | - |
| `reset` | - |
| `canGetCode` | - |
