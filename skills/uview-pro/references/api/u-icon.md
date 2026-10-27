<!-- 生成物，勿手改：由 scripts/gen-api-cards.mjs 渲染，改动会在下次再生成时丢失 -->

# u-icon API

> 来源：`components/u-icon`（uview-pro v0.6.21）
> API 指纹：`sha256:fea1ef3e47346677fec8503d642081442d02a5eb481d8ce34f3943001700a189`
> 官方文档：https://uviewpro.cn/zh/components/icon.html
> 再生成（组件库源码可读时）：`node scripts/gen-api-cards.mjs --lib <uview-pro 路径> --only icon`

基于字体的图标集，包含了大多数常见场景的图标。

## 用法示例

```vue
<u-icon name="photo" color="var(--u-type-primary)" size="28"></u-icon>
```

## 属性

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `custom-style` / `customStyle` | 自定义根节点样式 | `string \| Record<string, any>` | - |
| `custom-class` / `customClass` | 自定义根节点样式类 | `string` | `''` |
| `name` | 图标名称，见示例图标集 | `string` | `''` |
| `color` | 图标颜色，可接受主题色 | `string` | `''` |
| `size` | 字体大小，单位rpx（默认32） | `string \| number` | `'inherit'` |
| `bold` | 是否显示粗体 | `boolean` | `false` |
| `index` | 点击图标的时候传递事件出去的index（用于区分点击了哪一个） | `string \| number` | `''` |
| `hover-class` / `hoverClass` | 触摸图标时的类名 | `string` | `''` |
| `custom-prefix` / `customPrefix` | 自定义扩展前缀，方便用户扩展自己的图标库 | `string` | `'uicon'` |
| `label` | 图标右边或者下面的文字 | `string \| number` | `''` |
| `label-pos` / `labelPos` | label的位置，只能右边或者下边 | `IconLabelPosition`（`left`｜`top`｜`right`｜`bottom`） | `'right'` |
| `label-size` / `labelSize` | label的大小，单位rpx（默认28） | `string \| number` | `'28'` |
| `label-color` / `labelColor` | label的颜色 | `string` | `'var(--u-content-color)'` |
| `margin-left` / `marginLeft` | label与图标的距离(横向排列)，单位rpx（默认6） | `string \| number` | `'6'` |
| `margin-top` / `marginTop` | label与图标的距离(竖向排列)，单位rpx（默认6） | `string \| number` | `'6'` |
| `margin-right` / `marginRight` | label与图标的距离(竖向排列)，单位rpx（默认6） | `string \| number` | `'6'` |
| `margin-bottom` / `marginBottom` | label与图标的距离(竖向排列)，单位rpx（默认6） | `string \| number` | `'6'` |
| `space` | label与图标的距离，单位rpx，权重高于 margin | `string \| number` | `''` |
| `img-mode` / `imgMode` | 图片的mode，参考uni-app image组件 | `ImgMode`（`aspectFit`｜`aspectFill`｜`widthFix`｜`top`｜`bottom`｜`center`｜`scaleToFill`） | `'widthFix'` |
| `width` | 用于显示图片小图标时，图片的宽度，单位rpx | `string \| number` | `''` |
| `height` | 用于显示图片小图标时，图片的高度，单位rpx | `string \| number` | `''` |
| `top` | 用于解决某些情况下，让图标垂直居中的用途，单位rpx | `string \| number` | `0` |
| `show-decimal-icon` / `showDecimalIcon` | 是否为DecimalIcon | `boolean` | `false` |
| `inactive-color` / `inactiveColor` | 背景颜色，可接受主题色，仅Decimal时有效 | `string` | `'var(--u-divider-color)'` |
| `percent` | 显示的百分比，仅Decimal时有效 | `string \| number` | `'50'` |

## 双向绑定（v-model）

该组件无双向绑定。

## 事件

| 事件 | 回调参数 | 说明 |
| --- | --- | --- |
| `@click` | `index: string \| number` | 点击图标时触发 |
| `@touchstart` | `index: string \| number` | 图标触摸时触发 |

## 插槽

无插槽。
