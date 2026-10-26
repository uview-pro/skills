<!-- 生成物，勿手改：由 scripts/gen-api-cards.mjs 渲染，改动会在下次再生成时丢失 -->

# ux-skeleton API

> 来源：`components/ux-skeleton`（uview-pro-x v1.0.0）
> API 指纹：`sha256:3d1f15b8c161209bf35a08c91d201f1038f895c1a4b81aca7175be120088c8f6`
> 再生成（组件库源码可读时）：`node scripts/gen-api-cards.mjs --lib <uview-pro-x 路径> --only skeleton`

骨架屏一般用于页面在请求远程数据尚未完成时，页面用灰色块预显示本来的页面结构，给用户更好的体验。

## 属性

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `custom-style` / `customStyle` | 自定义根节点样式 | `string \| UTSJSONObject` | - |
| `custom-class` / `customClass` | 自定义根节点样式类 | `string` | `''` |
| `loading` | 是否显示骨架占位图，设置为false将会展示子组件内容 | `boolean` | `true` |
| `animate` | 是否开启动画效果 | `boolean` | `true` |
| `rows` | 段落占位图行数 | `string \| number` | `0` |
| `rows-width` / `rowsWidth` | 段落占位图的宽度，可以为百分比、数值、带单位字符串等，可通过数组传入指定每个段落行的宽度 | `string \| number \| string[]` | `'100%'` |
| `rows-height` / `rowsHeight` | 段落的高度 | `string \| number \| string[]` | `18` |
| `title` | 是否展示标题占位图 | `boolean` | `true` |
| `title-width` / `titleWidth` | 标题的宽度 | `string \| number` | `'50%'` |
| `title-height` / `titleHeight` | 标题的高度 | `string \| number` | `18` |
| `avatar` | 是否展示头像占位图 | `boolean` | `false` |
| `avatar-size` / `avatarSize` | 头像占位图大小 | `string \| number` | `32` |
| `avatar-shape` / `avatarShape` | 头像占位图的形状，circle-圆形，square-小圆角 4px 方形 | `string` | `'circle'` |

## 双向绑定（v-model）

该组件无双向绑定。

## 事件

无类型化自定义事件（原生事件不受影响，可直接透传监听）。

## 插槽

| 插槽名 | 说明 |
| --- | --- |
| `default` | - |

## 外部样式类

| 名称 | 说明 |
| --- | --- |
| `custom-class` | 自定义根节点样式类 |
