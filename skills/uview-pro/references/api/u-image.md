<!-- 生成物，勿手改：由 scripts/gen-api-cards.mjs 渲染，改动会在下次再生成时丢失 -->

# u-image API

> 来源：`components/u-image`（uview-pro v0.6.21）
> API 指纹：`sha256:2114b58ef1f4699286650e64774e563ddb0c90cf54944a6b19ebe99438209de6`
> 官方文档：https://uviewpro.cn/zh/components/image.html
> 再生成（组件库源码可读时）：`node scripts/gen-api-cards.mjs --lib <uview-pro 路径> --only image`

此组件为uni-app的image组件的加强版，在继承了原有功能外，还支持淡入动画、加载中、加载失败提示、圆角值和形状等。

## 用法示例

```vue
<u-image width="100%" height="300rpx" :src="src"></u-image>
```

## 属性

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `custom-style` / `customStyle` | 自定义根节点样式 | `string \| Record<string, any>` | - |
| `custom-class` / `customClass` | 自定义根节点样式类 | `string` | `''` |
| `src` | 图片地址 | `string` | `''` |
| `mode` | 裁剪模式 | `ImgMode`（`aspectFit`｜`aspectFill`｜`widthFix`｜`top`｜`bottom`｜`center`｜`scaleToFill`） | `'aspectFill'` |
| `width` | 宽度，单位任意，如果为数值，则为rpx单位（默认100%） | `string \| number` | `'100%'` |
| `height` | 高度，单位任意，如果为数值，则为rpx单位（默认 auto） | `string \| number` | `'auto'` |
| `shape` | 图片形状，circle-圆形，square-方形（默认square） | `Shape`（`circle`｜`square`） | `'square'` |
| `border-radius` / `borderRadius` | 圆角值，单位任意，如果为数值，则为rpx单位（默认 0） | `string \| number` | `0` |
| `lazy-load` / `lazyLoad` | 是否懒加载，仅微信小程序、App、百度小程序、字节跳动小程序有效（默认 true） | `boolean` | `true` |
| `show-menu-by-longpress` / `showMenuByLongpress` | 是否开启长按图片显示识别小程序码菜单，仅微信小程序有效（默认 true） | `boolean` | `true` |
| `loading-icon` / `loadingIcon` | 加载中的图标，或者小图片（默认 photo） | `string` | `'photo'` |
| `error-icon` / `errorIcon` | 加载失败的图标，或者小图片（默认 error-circle） | `string` | `'error-circle'` |
| `show-loading` / `showLoading` | 是否显示加载中的图标或者自定义的slot（默认 true） | `boolean` | `true` |
| `show-error` / `showError` | 是否显示加载错误的图标或者自定义的slot（默认 true） | `boolean` | `true` |
| `fade` | 是否需要淡入效果（默认 true） | `boolean` | `true` |
| `webp` | 只支持网络资源，只对微信小程序有效（默认 false） | `boolean` | `false` |
| `duration` | 搭配fade参数的过渡时间，单位ms（默认 500） | `string \| number` | `500` |
| `bg-color` / `bgColor` | 背景颜色，用于深色页面加载图片时，为了和背景色融合（默认 var(--u-bg-color)） | `string` | `'var(--u-bg-color)'` |
| `use-slots` / `useSlots` | 使用插槽名称对象，用于自定义插槽，默认 undefined，当动态切换slot隐藏时，需要使用useSlots使用，兼容头条小程序 | `Record<string, boolean>` | - |

## 双向绑定（v-model）

该组件无双向绑定。

## 事件

| 事件 | 回调参数 | 说明 |
| --- | --- | --- |
| `@click` | - | 点击图片时触发 |
| `@error` | `err: any` | 图片加载失败时触发 |
| `@load` | - | 图片加载成功时触发 |

## 插槽

| 插槽名 | 说明 |
| --- | --- |
| `loading` | - |
| `error` | - |

## 命令式方法（通过组件 ref 调用）

| 方法 | 说明 |
| --- | --- |
| `changeStatus` | - |
