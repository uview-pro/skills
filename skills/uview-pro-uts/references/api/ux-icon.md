<!-- 生成物，勿手改：由 scripts/gen-api-cards.mjs 渲染，改动会在下次再生成时丢失 -->

# ux-icon API

> 来源：`components/ux-icon`（uview-pro-x v1.0.24）
> API 指纹：`sha256:0747ab67b0f4784047dd3bbcd804091d10bf95018192a268a837c528e2ed9438`
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
| `custom-prefix` / `customPrefix` | 字体图标库前缀（约定：前缀即图标类名前缀与 font-family 名，需在应用入口声明同名 @font-face；内置前缀 uxicon-iconfont，传空串也走内置库。其余库下 name 可传已登记码点表的图标名，也可直接传四位十六进制码点，字符还可由默认插槽直传） | `string` | `BUILTIN_ICON_PREFIX` |
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

| 插槽名 | 说明 |
| --- | --- |
| `默认插槽，可直传自定义字体图标的` | unicode 字符；传入插槽时优先用插槽内容，未传时按 name 检索码点表渲染 |
| `default` | - |

## 外部样式类

| 名称 | 说明 |
| --- | --- |
| `custom-class` | 自定义根节点样式类 |
