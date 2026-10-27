<!-- 生成物，勿手改：由 scripts/gen-api-cards.mjs 渲染，改动会在下次再生成时丢失 -->

# u-count-down API

> 来源：`components/u-count-down`（uview-pro v0.6.21）
> API 指纹：`sha256:3e0fe34104841eab0e3ee40f5e04dd8e0f54ccee8d80ef8a50f209262c3576cf`
> 官方文档：https://uviewpro.cn/zh/components/countDown.html
> 再生成（组件库源码可读时）：`node scripts/gen-api-cards.mjs --lib <uview-pro 路径> --only count-down`

该组件一般使用于某个活动的截止时间上，通过数字的变化，给用户明确的时间感受，提示用户进行某一个行为操作。

## 用法示例

```vue
<u-count-down ref="uCountDown" :timestamp="86400" :autoplay="false"></u-count-down>
```

## 属性

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `custom-style` / `customStyle` | 自定义根节点样式 | `string \| Record<string, any>` | - |
| `custom-class` / `customClass` | 自定义根节点样式类 | `string` | `''` |
| `timestamp` | 倒计时的时间，秒为单位 | `number \| string` | `0` |
| `autoplay` | 是否自动开始倒计时 | `boolean` | `true` |
| `separator` | 分隔符 | `string` | `'colon'` |
| `separator-size` / `separatorSize` | 分隔符的大小，单位rpx | `number \| string` | `30` |
| `separator-color` / `separatorColor` | 分隔符颜色 | `string` | `'var(--u-main-color)'` |
| `color` | 字体颜色 | `string` | `'var(--u-main-color)'` |
| `font-size` / `fontSize` | 字体大小，单位rpx | `number \| string` | `30` |
| `bg-color` / `bgColor` | 背景颜色 | `string` | `'var(--u-bg-white)'` |
| `height` | 数字框高度，单位rpx | `number \| string` | `'auto'` |
| `show-border` / `showBorder` | 是否显示数字框 | `boolean` | `false` |
| `border-color` / `borderColor` | 边框颜色 | `string` | `'var(--u-main-color)'` |
| `show-seconds` / `showSeconds` | 是否显示秒 | `boolean` | `true` |
| `show-minutes` / `showMinutes` | 是否显示分钟 | `boolean` | `true` |
| `show-hours` / `showHours` | 是否显示小时 | `boolean` | `true` |
| `show-days` / `showDays` | 是否显示“天” | `boolean` | `true` |
| `hide-zero-day` / `hideZeroDay` | 当"天"的部分为0时，不显示 | `boolean` | `false` |

## 双向绑定（v-model）

该组件无双向绑定。

## 事件

| 事件 | 回调参数 | 说明 |
| --- | --- | --- |
| `@end` | - | 倒计时结束 |
| `@change` | - | 每秒触发一次，回调为当前剩余的倒计秒数 |

## 插槽

无插槽。

## 命令式方法（通过组件 ref 调用）

| 方法 | 说明 |
| --- | --- |
| `start` | - |
| `end` | - |
| `destroy` | - |
