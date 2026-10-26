<!-- 生成物，勿手改：由 scripts/gen-api-cards.mjs 渲染，改动会在下次再生成时丢失 -->

# ux-tabs API

> 来源：`components/ux-tabs`（uview-pro-x v1.0.0）
> API 指纹：`sha256:85cd9c912033a985faaaf6ef8a538c5fc11634ec070bda0ad35b571bbd7a17a7`
> 再生成（组件库源码可读时）：`node scripts/gen-api-cards.mjs --lib <uview-pro-x 路径> --only tabs`

该组件是一个 tabs 标签组件，标签多时可配置左右滑动，标签少时可禁止滑动。配置为滚动模式时，激活的 tab 会自动移动到组件的中间位置。

## 属性

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `custom-style` / `customStyle` | 自定义根节点样式 | `string \| UTSJSONObject` | - |
| `custom-class` / `customClass` | 自定义根节点样式类 | `string` | `''` |
| `is-scroll` / `isScroll` | tabs 是否可左右拖动 | `boolean` | `true` |
| `list` | 标签数组 | `TabsItem[]` | - |
| `current` | 当前活动 tab 的索引 | `string \| number` | `0` |
| `height` | 导航栏的高度和行高 | `string \| number` | `40` |
| `font-size` / `fontSize` | 字体大小，单位px | `string \| number` | `15` |
| `duration` | 过渡动画时长，单位s | `string \| number` | `0.5` |
| `active-color` / `activeColor` | 选中项的主题颜色 | `string` | `''` |
| `inactive-color` / `inactiveColor` | 未选中项的颜色 | `string` | `''` |
| `bar-width` / `barWidth` | 菜单底部移动 bar 的宽度，单位px | `string \| number` | `20` |
| `bar-height` / `barHeight` | 移动 bar 的高度，单位px | `string \| number` | `3` |
| `gutter` | 单个 tab 的左右内边距之和，单位px | `string \| number` | `20` |
| `bg-color` / `bgColor` | 导航栏的背景颜色 | `string` | `''` |
| `name` | 读取传入的数组对象的属性（tab名称） | `string` | `'name'` |
| `count` | 读取传入的数组对象的属性（徽标数） | `string` | `'count'` |
| `offset` | 徽标数位置偏移 | `number[]` | - |
| `is-dot` / `isDot` | 徽标是否是圆点 | `boolean` | `false` |
| `bold` | 活动 tab 字体是否加粗 | `boolean` | `true` |
| `active-item-style` / `activeItemStyle` | 当前活动 tab item 的样式 | `UTSJSONObject` | - |
| `show-bar` / `showBar` | 是否显示底部的滑块 | `boolean` | `true` |
| `bar-style` / `barStyle` | 底部滑块的自定义样式 | `UTSJSONObject` | - |
| `item-width` / `itemWidth` | 标签的宽度 | `string \| number` | `'auto'` |

## 双向绑定（v-model）

该组件无双向绑定。

## 事件

| 事件 | 回调参数 | 说明 |
| --- | --- | --- |
| `@change` | `index: number` | 点击标签时触发，参数：index（点击的标签索引） |

## 插槽

无插槽。

## 外部样式类

| 名称 | 说明 |
| --- | --- |
| `custom-class` | 自定义根节点样式类 |

## 命令式方法（通过组件 ref 调用）

| 方法 | 说明 |
| --- | --- |
| `init` | - |
| `clickTab` | - |
