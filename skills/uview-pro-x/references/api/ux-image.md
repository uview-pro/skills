<!-- 生成物，勿手改：由 scripts/gen-api-cards.mjs 渲染，改动会在下次再生成时丢失 -->

# ux-image API

> 来源：`components/ux-image`（uview-pro-x v1.0.0）
> API 指纹：`sha256:119930825a08183aa9653775f1182a034a05b9a3ed9bfe61cb967442df6b4dc3`
> 再生成（组件库源码可读时）：`node scripts/gen-api-cards.mjs --lib <uview-pro-x 路径> --only image`

此组件为uni-app的image组件的加强版，在继承了原有功能外，还支持淡入动画、加载中、加载失败提示、圆角值和形状等。

## 属性

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `custom-style` / `customStyle` | 自定义根节点样式 | `string \| UTSJSONObject` | - |
| `custom-class` / `customClass` | 自定义根节点样式类 | `string` | `''` |
| `src` | 图片地址 | `string` | `''` |
| `mode` | 裁剪模式 | `ImgMode`（`aspectFit`｜`aspectFill`｜`widthFix`｜`top`｜`bottom`｜`center`｜`scaleToFill`） | `'aspectFit'` |
| `width` | 宽度，单位任意，如果为数值，则为px单位（默认100%） | `string \| number` | `'100%'` |
| `height` | 高度，单位任意，如果为数值，则为px单位（默认 auto） | `string \| number` | `'auto'` |
| `shape` | 图片形状：square-小圆角 4px（默认），circle-正圆；真直角不在此档，传 :border-radius="0" | `ImageShape`（`square`｜`circle`） | `'square'` |
| `border-radius` / `borderRadius` | 圆角值，单位任意，如果为数值，则为px单位，一经传入即优先于 shape 预设；默认 '' 作哨兵表示未设置，传 0 即真直角（根节点与内层 image / overlay 同时落 0px） | `string \| number` | `''` |
| `lazy-load` / `lazyLoad` | 是否懒加载（默认 true） | `boolean` | `true` |
| `show-menu-by-longpress` / `showMenuByLongpress` | 是否开启长按图片显示识别小程序码菜单（默认 true） | `boolean` | `true` |
| `loading-icon` / `loadingIcon` | 加载中的图标 | `string` | `'photo'` |
| `error-icon` / `errorIcon` | 加载失败的图标 | `string` | `'error-circle'` |
| `show-loading` / `showLoading` | 是否显示加载中的图标或者自定义的slot（默认 true） | `boolean` | `true` |
| `show-error` / `showError` | 是否显示加载错误的图标或者自定义的slot（默认 true） | `boolean` | `true` |
| `fade` | 是否需要淡入效果（默认 true） | `boolean` | `true` |
| `webp` | 只支持网络资源，只对微信小程序有效（默认 false） | `boolean` | `false` |
| `duration` | 搭配fade参数的过渡时间，单位ms（默认250） | `string \| number` | `500` |
| `bg-color` / `bgColor` | 背景颜色 | `string` | `''` |

## 双向绑定（v-model）

该组件无双向绑定。

## 事件

| 事件 | 回调参数 | 说明 |
| --- | --- | --- |
| `@click` | - | 点击图片时触发 |
| `@error` | `err: UniImageErrorEvent` | 图片加载失败时触发 |
| `@load` | - | 图片加载成功时触发 |

## 插槽

| 插槽名 | 说明 |
| --- | --- |
| `loading` | - |
| `error` | - |

## 外部样式类

| 名称 | 说明 |
| --- | --- |
| `custom-class` | 自定义根节点样式类 |

## 命令式方法（通过组件 ref 调用）

| 方法 | 说明 |
| --- | --- |
| `changeStatus` | - |
