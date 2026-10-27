<!-- 生成物，勿手改：由 scripts/gen-api-cards.mjs 渲染，改动会在下次再生成时丢失 -->

# u-link API

> 来源：`components/u-link`（uview-pro v0.6.21）
> API 指纹：`sha256:14317a6882952c69e04d602f79a952caeda2c66a6bfa19e57d9ef2388c8106e3`
> 官方文档：https://uviewpro.cn/zh/components/link.html
> 再生成（组件库源码可读时）：`node scripts/gen-api-cards.mjs --lib <uview-pro 路径> --only link`

该组件为超链接组件，在不同平台有不同表现形式：在APP平台会通过plus环境打开内置浏览器，在小程序中把链接复制到粘贴板，同时提示信息，在H5中通过window.open打开链接。

## 用法示例

```vue
<u-link href="https://uviewpro.cn">蜀道难，难于上青天</u-link>
```

## 属性

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `text` | 超链接文字 | `string \| number` | `''` |
| `color` | 文字颜色 | `string` | - |
| `font-size` / `fontSize` | 字体大小，单位rpx | `string \| number` | `28` |
| `under-line` / `underLine` | 是否显示下划线 | `boolean` | `false` |
| `href` | 要跳转的链接 | `string` | `''` |
| `mp-tips` / `mpTips` | 小程序中复制到粘贴板的提示语 | `string` | `''` |
| `line-color` / `lineColor` | 下划线颜色 | `string` | `''` |
| `default-click` / `defaultClick` | 是否默认点击跳转 | `boolean` | `true` |

## 双向绑定（v-model）

该组件无双向绑定。

## 事件

| 事件 | 回调参数 | 说明 |
| --- | --- | --- |
| `@click` | - | 点击链接时触发 |

## 插槽

| 插槽名 | 说明 |
| --- | --- |
| `default` | - |
