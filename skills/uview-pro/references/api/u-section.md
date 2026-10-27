<!-- 生成物，勿手改：由 scripts/gen-api-cards.mjs 渲染，改动会在下次再生成时丢失 -->

# u-section API

> 来源：`components/u-section`（uview-pro v0.6.21）
> API 指纹：`sha256:4e2801e7801cf6aecaa6395f7617e69c4d3c7622a1bd613ea0e15908d6203aa6`
> 官方文档：https://uviewpro.cn/zh/components/section.html
> 再生成（组件库源码可读时）：`node scripts/gen-api-cards.mjs --lib <uview-pro 路径> --only section`

该组件一般用于分类信息有很多，但是限于篇幅只能列出一部分，让用户通过"查看更多"获得更多信息的场景，实际效果见演示。

## 用法示例

```vue
<u-section title="今日热门" :right="false"></u-section>
```

## 属性

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `custom-style` / `customStyle` | 自定义根节点样式 | `string \| Record<string, any>` | - |
| `custom-class` / `customClass` | 自定义根节点样式类 | `string` | `''` |
| `title` | 标题信息 | `string` | `''` |
| `sub-title` / `subTitle` | 右边副标题内容 | `string` | `''` |
| `right` | 是否显示右边的内容 | `boolean` | `true` |
| `font-size` / `fontSize` | 主标题的字体大小 | `FontSize` | `28` |
| `bold` | 主标题是否加粗 | `boolean` | `true` |
| `color` | 主标题的颜色 | `string` | `'var(--u-main-color)'` |
| `sub-color` / `subColor` | 右边副标题的颜色 | `string` | `'var(--u-tips-color)'` |
| `show-line` / `showLine` | 是否显示左边的竖条 | `boolean` | `true` |
| `line-color` / `lineColor` | 左边竖线的颜色 | `string` | `''` |
| `arrow` | 是否显示右边箭头 | `boolean` | `true` |

## 双向绑定（v-model）

该组件无双向绑定。

## 事件

| 事件 | 回调参数 | 说明 |
| --- | --- | --- |
| `@click` | - | 组件右侧的内容被点击时触发，用于跳转"更多" |

## 插槽

| 插槽名 | 说明 |
| --- | --- |
| `right` | - |
