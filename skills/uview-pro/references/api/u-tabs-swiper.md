<!-- 生成物，勿手改：由 scripts/gen-api-cards.mjs 渲染，改动会在下次再生成时丢失 -->

# u-tabs-swiper API

> 来源：`components/u-tabs-swiper`（uview-pro v0.6.21）
> API 指纹：`sha256:e5da1403914fc7380e4d08c9b4ce66bb66cc1c40a90bea62b154f6533a458070`
> 官方文档：https://uviewpro.cn/zh/components/tabsSwiper.html
> 再生成（组件库源码可读时）：`node scripts/gen-api-cards.mjs --lib <uview-pro 路径> --only tabs-swiper`

该组件内部实现主要依托于uniapp的scroll-view和swiper组件，主要特色是切换过程中，tabsSwiper文字的颜色可以渐变，底部滑块可以 跟随式滑动，活动tab滚动居中等。应用场景可以用于需要左右切换页面，比如商城的订单中心(待收货-待付款-待评价-已退货)等应用场景。

## 用法示例

```vue
<u-tabs-swiper ref="tabs" :list="list" :is-scroll="false"></u-tabs-swiper>
```

## 属性

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `custom-style` / `customStyle` | 自定义根节点样式 | `string \| Record<string, any>` | - |
| `custom-class` / `customClass` | 自定义根节点样式类 | `string` | `''` |
| `is-scroll` / `isScroll` | tabs是否可以左右拖动 | `boolean` | `true` |
| `list` | 标签数组，元素为对象，如[{name: '推荐'}] | `Array<TabsSwiperListItem>` | - |
| `current` | 指定哪个tab为激活状态 | `number \| string` | `0` |
| `height` | 导航栏的高度，单位rpx | `number \| string` | `80` |
| `font-size` / `fontSize` | tab文字大小，单位rpx | `number \| string` | `30` |
| `swiper-width` / `swiperWidth` | tabs组件外部swiper的宽度，单位rpx | `number \| string` | `750` |
| `active-color` / `activeColor` | 滑块和激活tab文字的颜色 | `string` | - |
| `inactive-color` / `inactiveColor` | tabs文字颜色 | `string` | - |
| `bar-width` / `barWidth` | 滑块宽度，单位rpx | `number \| string` | `40` |
| `bar-height` / `barHeight` | 滑块高度，单位rpx | `number \| string` | `6` |
| `gutter` | 单个tab标签的左右内边距之和，单位rpx | `number \| string` | `40` |
| `z-index` / `zIndex` | z-index 层级 | `number \| string` | `1` |
| `bg-color` / `bgColor` | tabs导航栏的背景颜色 | `string` | `'var(--u-bg-white)'` |
| `auto-center-mode` / `autoCenterMode` | 居中模式，window/组件宽度 | `TabsSwiperAutoCenterMode`（`window`） | `'window'` |
| `name` | 组件内部读取的list参数中的属性名（tab名称） | `string` | `'name'` |
| `count` | 组件内部读取的list参数中的属性名（badge徽标数） | `string` | `'count'` |
| `offset` | 设置badge徽标数的位置偏移，格式为 [x, y]，单位rpx | `[number, number]` | - |
| `bold` | 激活选项的字体是否加粗 | `boolean` | `true` |
| `active-item-style` / `activeItemStyle` | 活动tabs item的样式，对象形式 | `Record<string, any>` | - |
| `show-bar` / `showBar` | 是否显示底部的滑块 | `boolean` | `true` |
| `bar-style` / `barStyle` | 底部滑块的样式，对象形式 | `Record<string, any>` | - |

## 双向绑定（v-model）

该组件无双向绑定。

## 事件

| 事件 | 回调参数 | 说明 |
| --- | --- | --- |
| `@change` | - | 点击标签时触发 |

## 插槽

无插槽。

## 命令式方法（通过组件 ref 调用）

| 方法 | 说明 |
| --- | --- |
| `init` | - |
| `setDx` | - |
| `setFinishCurrent` | - |
| `setTabColor` | - |
| `setScrollViewToCenter` | - |
