<!-- 生成物，勿手改：由 scripts/gen-api-cards.mjs 渲染，改动会在下次再生成时丢失 -->

# u-avatar API

> 来源：`components/u-avatar`（uview-pro v0.6.21）
> API 指纹：`sha256:0d7405db85d5670a3b113d3842d0f8ad76937fbb95d5a9684f0d6e6ecea89231`
> 官方文档：https://uviewpro.cn/zh/components/avatar.html
> 再生成（组件库源码可读时）：`node scripts/gen-api-cards.mjs --lib <uview-pro 路径> --only avatar`

本组件一般用于展示头像的地方，如个人中心，或者评论列表页的用户头像展示等场所。

## 用法示例

```vue
<u-avatar :src="src"></u-avatar>
```

## 属性

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `custom-style` / `customStyle` | 自定义根节点样式 | `string \| Record<string, any>` | - |
| `custom-class` / `customClass` | 自定义根节点样式类 | `string` | `''` |
| `bg-color` / `bgColor` | 背景颜色 | `string` | `'transparent'` |
| `src` | 头像路径 | `string` | `''` |
| `size` | 尺寸，large-大，default-中等，mini-小，如果为数值，则单位为rpx，宽度等于高度 | `string \| number` | `'default'` |
| `mode` | 头像模型，square-带圆角方形，circle-圆形 | `string` | `'circle'` |
| `text` | 文字内容 | `string` | `''` |
| `img-mode` / `imgMode` | 图片的裁剪模型 | `ImgMode`（`aspectFit`｜`aspectFill`｜`widthFix`｜`top`｜`bottom`｜`center`｜`scaleToFill`） | `'aspectFill'` |
| `index` | 标识符 | `string \| number` | `''` |
| `sex-icon` / `sexIcon` | 右上角性别角标，man-男，woman-女 | `man`｜`woman` | `'man'` |
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
| `@click` | - | 头像被点击 |

## 插槽

| 插槽名 | 说明 |
| --- | --- |
| `default` | - |
