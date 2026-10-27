<!-- 生成物，勿手改：由 scripts/gen-api-cards.mjs 渲染，改动会在下次再生成时丢失 -->

# u-tabs API

> 来源：`components/u-tabs`（uview-pro v0.6.21）
> API 指纹：`sha256:e34406bf56c0439356448694b31a57fda8deac393fa202029c22ce8d42436a5b`
> 官方文档：https://uviewpro.cn/zh/components/tabs.html
> 再生成（组件库源码可读时）：`node scripts/gen-api-cards.mjs --lib <uview-pro 路径> --only tabs`

该组件，是一个tabs标签组件，在标签多的时候，可以配置为左右滑动，标签少的时候，可以禁止滑动。该组件的一个特点是配置为滚动模式时，激活的tab会自动移动到组件的中间位置。

## 用法示例

```vue
<u-tabs ref="tabs" :list="list" :is-scroll="false"></u-tabs>
```

## 属性

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `custom-style` / `customStyle` | 自定义根节点样式 | `string \| Record<string, any>` | - |
| `custom-class` / `customClass` | 自定义根节点样式类 | `string` | `''` |
| `is-scroll` / `isScroll` | tabs是否可以左右拖动 | `boolean` | `true` |
| `list` | 标签数组 | `Array<TabsItem>` | - |
| `current` | 当前活动tab的索引 | `number \| string` | `0` |
| `height` | 导航栏的高度和行高 | `number \| string` | `80` |
| `font-size` / `fontSize` | 字体大小 | `number \| string` | `30` |
| `duration` | 过渡动画时长, 单位s | `number \| string` | `0.5` |
| `active-color` / `activeColor` | 选中项的主题颜色 | `string` | - |
| `inactive-color` / `inactiveColor` | 未选中项的颜色 | `string` | - |
| `bar-width` / `barWidth` | 菜单底部移动的bar的宽度，单位rpx | `number \| string` | `40` |
| `bar-height` / `barHeight` | 移动bar的高度 | `number \| string` | `6` |
| `gutter` | 单个tab的左右内边距之和，单位rpx | `number \| string` | `30` |
| `bg-color` / `bgColor` | 导航栏的背景颜色 | `string` | `'var(--u-bg-white)'` |
| `name` | 读取传入的数组对象的属性(tab名称) | `string` | `'name'` |
| `count` | 读取传入的数组对象的属性(徽标数) | `string` | `'count'` |
| `offset` | 徽标数位置偏移 | `[number, number]` | - |
| `is-dot` / `isDot` | 徽标是否是圆点 | `boolean` | `false` |
| `bold` | 活动tab字体是否加粗 | `boolean` | `true` |
| `active-item-style` / `activeItemStyle` | 当前活动tab item的样式 | `Record<string, any>` | - |
| `show-bar` / `showBar` | 是否显示底部的滑块 | `boolean` | `true` |
| `bar-style` / `barStyle` | 底部滑块的自定义样式 | `Record<string, any>` | - |
| `item-width` / `itemWidth` | 标签的宽度 | `number \| string` | `'auto'` |

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
| `clickTab` | - |
| `scrollByIndex` | - |
