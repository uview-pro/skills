<!-- 生成物，勿手改：由 scripts/gen-api-cards.mjs 渲染，改动会在下次再生成时丢失 -->

# u-swiper API

> 来源：`components/u-swiper`（uview-pro v0.6.21）
> API 指纹：`sha256:e7bae9c8cf56743cfc55522be91d385bf36c8d679b803a68ded30ef228f83c0a`
> 官方文档：https://uviewpro.cn/zh/components/swiper.html
> 再生成（组件库源码可读时）：`node scripts/gen-api-cards.mjs --lib <uview-pro 路径> --only swiper`

该组件一般用于导航轮播，广告展示等场景,可开箱即用

## 用法示例

```vue
<u-swiper :list="list" mode="dot" indicator-pos="bottomRight"></u-swiper>
```

## 属性

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `custom-style` / `customStyle` | 自定义根节点样式 | `string \| Record<string, any>` | - |
| `custom-class` / `customClass` | 自定义根节点样式类 | `string` | `''` |
| `list` | 轮播数据列表，数组对象 | `Array<Record<string, any>>` | - |
| `title` | 是否显示标题 | `boolean` | `false` |
| `indicator` | 指示器配置对象 | `Record<string, any>` | - |
| `border-radius` / `borderRadius` | 圆角，单位rpx | `number \| string` | `8` |
| `interval` | 自动切换时间间隔，单位ms | `number \| string` | `3000` |
| `mode` | 指示器类型，round/dot/line等 | `SwiperMode`（`round`｜`dot`｜`rect`｜`number`｜`none`） | `'round'` |
| `height` | 轮播高度，单位rpx | `number \| string` | `250` |
| `indicator-pos` / `indicatorPos` | 指示器位置 | `SwiperIndicatorPosition`（`topLeft`｜`topCenter`｜`topRight`｜`bottomLeft`｜`bottomCenter`｜`bottomRight`） | `'bottomCenter'` |
| `effect3d` | 是否开启3D效果 | `boolean` | `false` |
| `effect3d-previous-margin` / `effect3dPreviousMargin` | 3D模式下前一项的边距，单位rpx | `number \| string` | `50` |
| `autoplay` | 是否自动播放 | `boolean` | `true` |
| `duration` | 切换动画时长，单位ms | `number \| string` | `500` |
| `circular` | 是否循环播放 | `boolean` | `true` |
| `img-mode` / `imgMode` | 图片裁剪模式 | `ImgMode`（`aspectFit`｜`aspectFill`｜`widthFix`｜`top`｜`bottom`｜`center`｜`scaleToFill`） | `'aspectFill'` |
| `name` | 轮播项对象的图片字段名 | `string` | `'image'` |
| `bg-color` / `bgColor` | 轮播背景色 | `string` | `'var(--u-bg-color)'` |
| `current` | 当前激活项索引 | `number \| string` | `0` |
| `title-style` / `titleStyle` | 标题样式对象 | `Record<string, any>` | - |

## 双向绑定（v-model）

该组件无双向绑定。

## 事件

| 事件 | 回调参数 | 说明 |
| --- | --- | --- |
| `@click` | - | 点击轮播图时触发 |
| `@change` | - | 轮播切换时触发，返回当前索引 |

## 插槽

无插槽。

## 命令式方法（通过组件 ref 调用）

| 方法 | 说明 |
| --- | --- |
| `listClick` | - |
| `change` | - |
| `animationfinish` | - |
