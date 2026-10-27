<!-- 生成物，勿手改：由 scripts/gen-api-cards.mjs 渲染，改动会在下次再生成时丢失 -->

# u-count-to API

> 来源：`components/u-count-to`（uview-pro v0.6.21）
> API 指纹：`sha256:50b95556bd79221241237e21e63e5dc16e699196fbf5da852746b0343a5fa9ff`
> 官方文档：https://uviewpro.cn/zh/components/countTo.html
> 再生成（组件库源码可读时）：`node scripts/gen-api-cards.mjs --lib <uview-pro 路径> --only count-to`

该组件一般用于需要滚动数字到某一个值的场景，目标要求是一个递增的值。

## 用法示例

```vue
<u-count-to ref="uCountTo" :end-val="endVal" :autoplay="autoplay"></u-count-to>
```

## 属性

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `custom-style` / `customStyle` | 自定义根节点样式 | `string \| Record<string, any>` | - |
| `custom-class` / `customClass` | 自定义根节点样式类 | `string` | `''` |
| `start-val` / `startVal` | 开始的数值，默认从0增长到某一个数 | `number \| string` | `0` |
| `end-val` / `endVal` | 要滚动的目标数值，必须 | `number \| string` | 必填 |
| `duration` | 滚动到目标数值的动画持续时间，单位为毫秒（ms） | `number \| string` | `2000` |
| `autoplay` | 设置数值后是否自动开始滚动 | `boolean` | `true` |
| `decimals` | 要显示的小数位数 | `number \| string` | `0` |
| `use-easing` / `useEasing` | 是否在即将到达目标数值的时候，使用缓慢滚动的效果 | `boolean` | `true` |
| `decimal` | 十进制分割符号 | `number \| string` | `'.'` |
| `color` | 字体颜色 | `string` | `'var(--u-main-color)'` |
| `font-size` / `fontSize` | 字体大小 | `number \| string` | `50` |
| `bold` | 是否加粗字体 | `boolean` | `false` |
| `separator` | 千位分隔符，类似金额的分割(￥23,321.05中的",") | `string` | `''` |

## 双向绑定（v-model）

该组件无双向绑定。

## 事件

| 事件 | 回调参数 | 说明 |
| --- | --- | --- |
| `@end` | - | 数值滚动到目标值时触发 |

## 插槽

无插槽。

## 命令式方法（通过组件 ref 调用）

| 方法 | 说明 |
| --- | --- |
| `start` | - |
| `stop` | - |
| `reStart` | - |
| `resume` | - |
| `reset` | - |
