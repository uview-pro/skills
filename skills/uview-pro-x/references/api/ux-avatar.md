<!-- 生成物，勿手改：由 scripts/gen-api-cards.mjs 渲染，改动会在下次再生成时丢失 -->

# ux-avatar API

> 来源：`components/ux-avatar`（uview-pro-x v1.0.0）
> API 指纹：`sha256:ccc98252fe79717e0e3610fd9d248e8179b2021587a607e25392dd120028f9c1`
> 再生成（组件库源码可读时）：`node scripts/gen-api-cards.mjs --lib <uview-pro-x 路径> --only avatar`

本组件一般用于展示头像的地方，如个人中心，或者评论列表页的用户头像展示等场所。

## 属性

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `custom-style` / `customStyle` | 自定义根节点样式 | `string \| UTSJSONObject` | - |
| `custom-class` / `customClass` | 自定义根节点样式类 | `string` | `''` |
| `bg-color` / `bgColor` | 背景颜色 | `string` | `'transparent'` |
| `src` | 头像路径，如加载失败，将会显示默认头像 | `string` | `''` |
| `size` | 尺寸，large-大，default-中等，small-小，如果为数值，则单位为px，宽度等于高度 | `string \| number` | `'default'` |
| `shape` | 头像形状（词表见 global.uts 的 Shape）：square-小圆角 4px 方形，circle-正圆；原 mode 参数，已更名 shape 与全库词表对齐（默认 circle）；直角可走 custom-style 但仅限文字/背景头像，图片头像的圆角写在内层 imgStyle，覆盖不到 | `square`｜`circle` | `'circle'` |
| `text` | 文字内容 | `string` | `''` |
| `img-mode` / `imgMode` | 图片的裁剪模型 | `ImgMode`（`aspectFit`｜`aspectFill`｜`widthFix`｜`top`｜`bottom`｜`center`｜`scaleToFill`） | `'aspectFill'` |
| `index` | 标识符 | `string \| number` | `''` |
| `sex-icon` / `sexIcon` | 右上角性别角标，man-男，woman-女 | `string` | `'man'` |
| `level-icon` / `levelIcon` | 右下角的等级图标 | `string` | `'level'` |
| `level-bg-color` / `levelBgColor` | 右下角等级图标背景颜色 | `string` | `''` |
| `sex-bg-color` / `sexBgColor` | 右上角性别图标的背景颜色 | `string` | `''` |
| `show-sex` / `showSex` | 是否显示性别图标 | `boolean` | `false` |
| `show-level` / `showLevel` | 是否显示等级图标 | `boolean` | `false` |

## 双向绑定（v-model）

该组件无双向绑定。

## 事件

| 事件 | 回调参数 | 说明 |
| --- | --- | --- |
| `@click` | `index: string \| number` | 头像被点击 |

## 插槽

| 插槽名 | 说明 |
| --- | --- |
| `default` | - |

## 外部样式类

| 名称 | 说明 |
| --- | --- |
| `custom-class` | 自定义根节点样式类 |
