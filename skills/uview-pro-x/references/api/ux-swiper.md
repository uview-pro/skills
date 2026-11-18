<!-- 生成物，勿手改：由 scripts/gen-api-cards.mjs 渲染，改动会在下次再生成时丢失 -->

# ux-swiper API

> 来源：`components/ux-swiper`（uview-pro-x v2.0.0）
> API 指纹：`sha256:3daf112ea262d5b736c206e26a398d8e50bf9d6dc5d350bfa64e402a97318e64`
> 再生成（组件库源码可读时）：`node scripts/gen-api-cards.mjs --lib <uview-pro-x 路径> --only swiper`

该组件一般用于导航轮播，广告展示等场景，可开箱即用

## 属性

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `custom-style` / `customStyle` | 自定义根节点样式 | `string \| JsonObject` | - |
| `custom-class` / `customClass` | 自定义根节点样式类 | `string` | `''` |
| `list` | 轮播数据列表，数组对象 | `any[]` | - |
| `title` | 是否显示标题 | `boolean` | `false` |
| `border-radius` / `borderRadius` | 圆角，单位px | `string \| number` | `4` |
| `interval` | 自动切换时间间隔，单位ms | `string \| number` | `3000` |
| `mode` | 指示器类型 round/dot/rect/number/none | `SwiperMode`（`round`｜`dot`｜`rect`｜`number`｜`none`） | `'round'` |
| `height` | 轮播高度，单位px | `string \| number` | `125` |
| `indicator-pos` / `indicatorPos` | 指示器位置 | `SwiperIndicatorPosition`（`topLeft`｜`topCenter`｜`topRight`｜`bottomLeft`｜`bottomCenter`｜`bottomRight`） | `'bottomCenter'` |
| `effect3d` | 是否开启3D效果 | `boolean` | `false` |
| `effect3d-previous-margin` / `effect3dPreviousMargin` | 3D模式下前一项的边距，单位px | `string \| number` | `25` |
| `autoplay` | 是否自动播放 | `boolean` | `true` |
| `duration` | 切换动画时长，单位ms | `string \| number` | `500` |
| `circular` | 是否循环播放 | `boolean` | `true` |
| `img-mode` / `imgMode` | 图片裁剪模式 | `ImgMode`（`aspectFit`｜`aspectFill`｜`widthFix`｜`top`｜`bottom`｜`center`｜`scaleToFill`） | `'aspectFill'` |
| `name` | 轮播项对象的图片字段名 | `string` | `'image'` |
| `bg-color` / `bgColor` | 轮播背景色 | `string` | `''` |
| `current` | 当前激活项索引 | `string \| number` | `0` |
| `title-style` / `titleStyle` | 标题样式对象 | `JsonObject` | - |

## 类型定义

> 本卡引用的自定义类型展开定义（源自组件 types.ts / 全局 types/global.ts），对象字面量可直接赋值。

| 类型 | 定义 |
| --- | --- |
| `ImgMode` | `'aspectFit' \| 'aspectFill' \| 'widthFix' \| 'top' \| 'bottom' \| 'center' \| 'scaleToFill'` |
| `JsonObject` | `Record<string, any>`（普通对象，任意键值、可嵌套；全库统一对象类型，含内联样式） |
| `SwiperIndicatorPosition` | `\| 'topLeft' \| 'topCenter' \| 'topRight' \| 'bottomLeft' \| 'bottomCenter' \| 'bottomRight'` |
| `SwiperMode` | `'round' \| 'dot' \| 'rect' \| 'number' \| 'none'` |

## 双向绑定（v-model）

该组件无双向绑定。

## 事件

| 事件 | 回调参数 | 说明 |
| --- | --- | --- |
| `@click` | `index: number` | 点击轮播图时触发，参数：index（当前点击项索引） |
| `@change` | `current: number` | 轮播项切换时触发，参数：current（当前激活项索引） |

## 插槽

无插槽。

## 外部样式类

| 名称 | 说明 |
| --- | --- |
| `custom-class` | 自定义根节点样式类 |

## 命令式方法（通过组件 ref 调用）

| 方法 | 说明 |
| --- | --- |
| `change` | - |
| `animationfinish` | - |
