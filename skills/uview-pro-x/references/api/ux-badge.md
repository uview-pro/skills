<!-- 生成物，勿手改：由 scripts/gen-api-cards.mjs 渲染，改动会在下次再生成时丢失 -->

# ux-badge API

> 来源：`components/ux-badge`（uview-pro-x v1.0.0）
> API 指纹：`sha256:e88306c72d8c9533b2b214d998d0e5d3906081b87c23c37160010897020df351`
> 再生成（组件库源码可读时）：`node scripts/gen-api-cards.mjs --lib <uview-pro-x 路径> --only badge`

本组件一般用于展示头像的地方，如个人中心，或者评论列表页的用户头像展示等场所。

## 属性

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `custom-style` / `customStyle` | 自定义根节点样式 | `string \| UTSJSONObject` | - |
| `custom-class` / `customClass` | 自定义根节点样式类 | `string` | `''` |
| `type` | 使用预设的背景颜色 | `ThemeType`（`primary`｜`info`｜`error`｜`warning`｜`success`｜`default`） | `'error'` |
| `size` | Badge的尺寸 | `BadgeSize`（`default`｜`mini`） | `'default'` |
| `is-dot` / `isDot` | 是否是圆点 | `boolean` | `false` |
| `count` | 显示的数值内容 | `string \| number` | `null` |
| `overflow-count` / `overflowCount` | 展示封顶数字值 | `number` | `99` |
| `show-zero` / `showZero` | 当数值为 0 时是否展示 | `boolean` | `false` |
| `offset` | 位置偏移 | `number[]` | - |
| `absolute` | 是否开启绝对定位 | `boolean` | `true` |
| `font-size` / `fontSize` | 字体大小 | `string \| number` | `DEFAULT_FONT_SIZE` |
| `color` | 字体颜色 | `string` | `''` |
| `bg-color` / `bgColor` | 背景颜色 | `string` | `''` |
| `is-center` / `isCenter` | 中心点是否重合 | `boolean` | `false` |

## 双向绑定（v-model）

该组件无双向绑定。

## 事件

无类型化自定义事件（原生事件不受影响，可直接透传监听）。

## 插槽

| 插槽名 | 说明 |
| --- | --- |
| `default` | - |
| `content` | - |

## 外部样式类

| 名称 | 说明 |
| --- | --- |
| `custom-class` | 自定义根节点样式类 |
