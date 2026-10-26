<!-- 生成物，勿手改：由 scripts/gen-api-cards.mjs 渲染，改动会在下次再生成时丢失 -->

# ux-section API

> 来源：`components/ux-section`（uview-pro-x v1.0.0）
> API 指纹：`sha256:fbef7e39168eb74d6862c567fdde319a2cc607def2632e9e4fc22d1f62243da9`
> 再生成（组件库源码可读时）：`node scripts/gen-api-cards.mjs --lib <uview-pro-x 路径> --only section`

该组件一般用于分类信息有很多，但是限于篇幅只能列出一部分，让用户通过"查看更多"获得更多信息的场景，实际效果见演示。

## 属性

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `custom-style` / `customStyle` | 自定义根节点样式 | `UTSJSONObject` | - |
| `custom-class` / `customClass` | 自定义根节点样式类 | `string` | `''` |
| `title` | 标题信息 | `string` | `''` |
| `sub-title` / `subTitle` | 右边副标题内容 | `string` | `''` |
| `right` | 是否显示右边的内容 | `boolean` | `true` |
| `font-size` / `fontSize` | 主标题的字体大小 | `string \| number` | `DEFAULT_FONT_SIZE` |
| `bold` | 主标题是否加粗 | `boolean` | `true` |
| `color` | 主标题的颜色 | `string` | `''` |
| `sub-color` / `subColor` | 右边副标题的颜色 | `string` | `''` |
| `show-line` / `showLine` | 是否显示左边的竖条 | `boolean` | `true` |
| `line-color` / `lineColor` | 左边竖线的颜色 | `string` | `''` |
| `arrow` | 是否显示右边箭头 | `boolean` | `true` |

## 双向绑定（v-model）

该组件无双向绑定。

## 事件

| 事件 | 回调参数 | 说明 |
| --- | --- | --- |
| `@click` | - | - |

## 插槽

| 插槽名 | 说明 |
| --- | --- |
| `right` | - |

## 外部样式类

| 名称 | 说明 |
| --- | --- |
| `custom-class` | 自定义根节点样式类 |
