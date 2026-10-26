<!-- 生成物，勿手改：由 scripts/gen-api-cards.mjs 渲染，改动会在下次再生成时丢失 -->

# ux-count-down API

> 来源：`components/ux-count-down`（uview-pro-x v1.0.0）
> API 指纹：`sha256:4a42e81ad705d4f5eba4b8923117036a780fd6b40409bc9759ce6bf2cd77079b`
> 再生成（组件库源码可读时）：`node scripts/gen-api-cards.mjs --lib <uview-pro-x 路径> --only count-down`

该组件一般使用于某个活动的截止时间上，通过数字的变化，给用户明确的时间感受，提示用户进行某一个行为操作。

## 属性

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `custom-style` / `customStyle` | 自定义根节点样式 | `string \| UTSJSONObject` | - |
| `custom-class` / `customClass` | 自定义根节点样式类 | `string` | `''` |
| `timestamp` | 倒计时的时间，秒为单位 | `number \| string` | `0` |
| `autoplay` | 是否自动开始倒计时，false 时需手动调用 start 方法 | `boolean` | `true` |
| `separator` | 分隔符，colon 为英文冒号，zh 为中文 | `string` | `'colon'` |
| `separator-size` / `separatorSize` | 分隔符的字体大小，单位 px | `number \| string` | `DEFAULT_SEPARATOR_SIZE` |
| `separator-color` / `separatorColor` | 分隔符的颜色 | `string` | `''` |
| `color` | 字体颜色 | `string` | `''` |
| `font-size` / `fontSize` | 字体大小，单位 px | `number \| string` | `DEFAULT_FONT_SIZE` |
| `bg-color` / `bgColor` | 数字背景颜色 | `string` | `''` |
| `height` | 数字框高度（宽度等同此值），单位 px | `number \| string` | `'auto'` |
| `show-border` / `showBorder` | 是否显示数字框 | `boolean` | `false` |
| `border-color` / `borderColor` | 边框颜色 | `string` | `''` |
| `show-seconds` / `showSeconds` | 是否显示秒 | `boolean` | `true` |
| `show-minutes` / `showMinutes` | 是否显示分钟 | `boolean` | `true` |
| `show-hours` / `showHours` | 是否显示小时 | `boolean` | `true` |
| `show-days` / `showDays` | 是否显示“天” | `boolean` | `true` |
| `hide-zero-day` / `hideZeroDay` | 当"天"的部分为0时，不显示 | `boolean` | `false` |
| `millisecond` | 是否按毫秒粒度刷新（默认按秒） | `boolean` | `false` |

## 双向绑定（v-model）

该组件无双向绑定。

## 事件

| 事件 | 回调参数 | 说明 |
| --- | --- | --- |
| `@end` | - | 倒计时结束 |
| `@change` | `value: number` | 每秒触发一次，回调为当前剩余的倒计秒数 |

## 插槽

无插槽。

## 外部样式类

| 名称 | 说明 |
| --- | --- |
| `custom-class` | 自定义根节点样式类 |

## 命令式方法（通过组件 ref 调用）

| 方法 | 说明 |
| --- | --- |
| `start` | - |
| `end` | - |
