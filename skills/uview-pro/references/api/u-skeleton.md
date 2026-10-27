<!-- 生成物，勿手改：由 scripts/gen-api-cards.mjs 渲染，改动会在下次再生成时丢失 -->

# u-skeleton API

> 来源：`components/u-skeleton`（uview-pro v0.6.21）
> API 指纹：`sha256:505d47d6d765e6c8a3f5e11287c5c46abf747134f1d444d3507f85db404544b0`
> 官方文档：https://uviewpro.cn/zh/components/skeleton.html
> 再生成（组件库源码可读时）：`node scripts/gen-api-cards.mjs --lib <uview-pro 路径> --only skeleton`

骨架屏一般用于页面在请求远程数据尚未完成时，页面用灰色块预显示本来的页面结构，给用户更好的体验。

## 用法示例

```vue
<u-skeleton rows="3" title loading></u-skeleton>
```

## 属性

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `custom-style` / `customStyle` | 自定义根节点样式 | `string \| Record<string, any>` | - |
| `custom-class` / `customClass` | 自定义根节点样式类 | `string` | `''` |
| `loading` | 是否展示骨架组件 | `boolean` | - |
| `animate` | 是否开启动画效果 | `boolean` | - |
| `rows` | 段落占位图行数 | `string \| number` | - |
| `rows-width` / `rowsWidth` | 段落占位图的宽度 | `string \| number \| array` | - |
| `rows-height` / `rowsHeight` | 段落占位图的高度 | `string \| number \| array` | - |
| `title` | 是否展示标题占位图 | `boolean` | - |
| `title-width` / `titleWidth` | 段落标题的宽度 | `string \| number` | - |
| `title-height` / `titleHeight` | 段落标题的高度 | `string \| number` | - |
| `avatar` | 是否展示头像占位图 | `boolean` | - |
| `avatar-size` / `avatarSize` | 头像占位图大小 | `string \| number` | - |
| `avatar-shape` / `avatarShape` | 头像占位图的形状，circle-圆形，square-方形 | `string` | - |

## 双向绑定（v-model）

该组件无双向绑定。

## 事件

无类型化自定义事件（原生事件不受影响，可直接透传监听）。

## 插槽

| 插槽名 | 说明 |
| --- | --- |
| `default` | - |
