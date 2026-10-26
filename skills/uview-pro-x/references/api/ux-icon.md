<!-- 生成物，勿手改：由 scripts/gen-api-cards.mjs 渲染，改动会在下次再生成时丢失 -->

# ux-icon API

> 来源：`components/ux-icon`（uview-pro-x v1.0.0）
> API 指纹：`sha256:269ea4bcc357495ee2e9577ad437820802b4152afb0d5d877415ec5e7756c63b`
> 再生成（组件库源码可读时）：`node scripts/gen-api-cards.mjs --lib <uview-pro-x 路径> --only icon`

基于字体的图标集，包含了大多数常见场景的图标。

## 属性

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `custom-style` / `customStyle` | 自定义根节点样式 | `string \| UTSJSONObject` | - |
| `custom-class` / `customClass` | 自定义根节点样式类 | `string` | `''` |
| `name` | 图标名称，见示例图标集 | `string` | `''` |
| `type` | 图标类型，控制主题色，可选 default \| primary \| success \| error \| warning \| info | `string` | `''` |
| `color` | 自定义颜色，为任意色值；传入时优先于 type 的主题色 | `string` | `''` |
| `size` | 字体大小，单位px（默认inherit） | `string \| number` | `'inherit'` |
| `bold` | 是否显示粗体 | `boolean` | `false` |
| `custom-prefix` / `customPrefix` | 自定义扩展前缀，方便用户扩展自己的图标库 | `string` | `'uicon'` |
| `img-mode` / `imgMode` | 图片的mode，参考uni-app image组件 | `ImgMode`（`aspectFit`｜`aspectFill`｜`widthFix`｜`top`｜`bottom`｜`center`｜`scaleToFill`） | `'widthFix'` |
| `width` | 用于显示图片小图标时，图片的宽度，单位px | `string \| number` | `''` |
| `height` | 用于显示图片小图标时，图片的高度，单位px | `string \| number` | `''` |
| `top` | 用于解决某些情况下，让图标垂直居中的用途，单位px | `string \| number` | `0` |

## 双向绑定（v-model）

该组件无双向绑定。

## 事件

| 事件 | 回调参数 | 说明 |
| --- | --- | --- |
| `@click` | `event: UniPointerEvent` | 点击图标时触发 |
| `@touchstart` | `event: UniTouchEvent` | 图标触摸时触发 |

## 插槽

无插槽。

## 外部样式类

| 名称 | 说明 |
| --- | --- |
| `custom-class` | 自定义根节点样式类 |
