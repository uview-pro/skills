<!-- 生成物，勿手改：由 scripts/gen-api-cards.mjs 渲染，改动会在下次再生成时丢失 -->

# u-divider API

> 来源：`components/u-divider`（uview-pro v0.6.21）
> API 指纹：`sha256:b722643d6b3e72405f99e82f3b5698af951a05026c123e52ad55400273ced81b`
> 官方文档：https://uviewpro.cn/zh/components/divider.html
> 再生成（组件库源码可读时）：`node scripts/gen-api-cards.mjs --lib <uview-pro 路径> --only divider`

区隔内容的分割线，一般用于页面底部"没有更多"的提示。

## 用法示例

```vue
<u-divider color="var(--u-type-error)">长河落日圆</u-divider>
```

## 属性

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `custom-style` / `customStyle` | 自定义根节点样式 | `string \| Record<string, any>` | - |
| `custom-class` / `customClass` | 自定义根节点样式类 | `string` | `''` |
| `half-width` / `halfWidth` | 单一边divider横线的宽度(数值)，单位rpx。或者百分比 | `number \| string` | `150` |
| `border-color` / `borderColor` | divider横线的颜色，如设置 | `string` | `'var(--u-border-color)'` |
| `type` | 主题色，可以是primary\|info\|success\|warning\|error之一值 | `ThemeType`（`primary`｜`info`｜`error`｜`warning`｜`success`｜`default`） | `'primary'` |
| `color` | 文字颜色 | `string` | `'var(--u-tips-color)'` |
| `font-size` / `fontSize` | 文字大小，单位rpx | `number \| string` | `26` |
| `bg-color` / `bgColor` | 整个divider的背景颜色 | `string` | `'var(--u-bg-white)'` |
| `height` | 整个divider的高度单位rpx | `number \| string` | `'auto'` |
| `margin-top` / `marginTop` | 上边距 | `string \| number` | `0` |
| `margin-bottom` / `marginBottom` | 下边距 | `string \| number` | `0` |
| `use-slot` / `useSlot` | 是否使用slot传入内容，如果不用slot传入内容，先的中间就不会有空隙 | `boolean` | `true` |
| `dashed` | 是否虚线 | `boolean` | `false` |

## 双向绑定（v-model）

该组件无双向绑定。

## 事件

| 事件 | 回调参数 | 说明 |
| --- | --- | --- |
| `@click` | - | divider组件被点击时触发 |

## 插槽

| 插槽名 | 说明 |
| --- | --- |
| `default` | - |
