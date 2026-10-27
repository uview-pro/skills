<!-- 生成物，勿手改：由 scripts/gen-api-cards.mjs 渲染，改动会在下次再生成时丢失 -->

# u-lazy-load API

> 来源：`components/u-lazy-load`（uview-pro v0.6.21）
> API 指纹：`sha256:022eeda31f528ec127d78c5bb440b9916ead266b0f2b141676fff85a6756a7ad`
> 官方文档：https://uviewpro.cn/zh/components/lazyLoad.html
> 再生成（组件库源码可读时）：`node scripts/gen-api-cards.mjs --lib <uview-pro 路径> --only lazy-load`

懒加载使用的场景为：页面有很多图片时，APP会同时加载所有的图片，导致页面卡顿，各个位置的图片出现前后不一致等.

## 用法示例

```vue
<u-lazy-load :image="image" :loading-img="loadingImg" :error-img="errorImg"></u-lazy-load>
```

## 属性

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `index` | 用户自定义值，在事件触发时回调，用以区分是哪个图片 | `number \| string` | - |
| `image` | 要显示的图片 | `string` | `''` |
| `img-mode` / `imgMode` | 图片裁剪模式 | `ImgMode`（`aspectFit`｜`aspectFill`｜`widthFix`｜`top`｜`bottom`｜`center`｜`scaleToFill`） | `'widthFix'` |
| `loading-img` / `loadingImg` | 占位图片路径 | `string` | `'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAZAAAAGQCAMAAAC3Ycb+AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1zbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1zbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OUM0QjNBQjkyQUQ2MTFFQTlCNUQ4RTIzNDE5RUIxNjciIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OUM0QjNBQkEyQUQ2MTFFQTlCNUQ4RTIzNDE5RUIxNjciPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo5QzRCM0FCNzJBRDYxMUVBOUI1RDhFMjM0MTlFQjE2NyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo5QzRCM0FCODJBRDYxMUVBOUI1RDhFMjM0MTlFQjE2NyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PtRHfPcAAAAzUExURZWVldfX18PD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'` |
| `error-img` / `errorImg` | 加载失败的错误占位图 | `string` | - |
| `threshold` | 图片进入可见区域前多少像素时，单位rpx，开始加载图片 | `string \| number` | `100` |
| `duration` | 淡入淡出动画的过渡时间 | `string \| number` | `500` |
| `effect` | 渡效果的速度曲线 | `Effect`（`linear`｜`ease`｜`ease-in`｜`ease-in-out`｜`ease-out`｜`step-start`｜`step-end`） | `'ease-in-out'` |
| `is-effect` / `isEffect` | 是否使用过渡效果 | `boolean` | `true` |
| `border-radius` / `borderRadius` | 圆角值 | `string \| number` | `0` |
| `height` | 图片高度，单位rpx | `string \| number` | `450` |

## 双向绑定（v-model）

该组件无双向绑定。

## 事件

| 事件 | 回调参数 | 说明 |
| --- | --- | --- |
| `@click` | - | 点击图片时触发 |
| `@load` | - | 图片加载成功时触发 |
| `@error` | - | 图片加载失败时触发 |

## 插槽

无插槽。
