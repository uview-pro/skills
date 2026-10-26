<!-- 生成物，勿手改：由 scripts/gen-api-cards.mjs 渲染，改动会在下次再生成时丢失 -->

# ux-navbar API

> 来源：`components/ux-navbar`（uview-pro-x v1.0.0）
> API 指纹：`sha256:f32c1096a5eea846cb936d7e63ac09ae474ae02d94e20ac7157edbccb70cd314`
> 再生成（组件库源码可读时）：`node scripts/gen-api-cards.mjs --lib <uview-pro-x 路径> --only navbar`

此组件一般用于在特殊情况下，需要自定义导航栏的时候用到，一般建议使用 uni-app 自带的导航栏。

## 属性

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `height` | 导航栏高度，单位 px，非 px | `string \| number` | `''` |
| `back-icon-color` / `backIconColor` | 返回箭头的颜色 | `string` | `''` |
| `back-icon-name` / `backIconName` | 左边返回的图标 | `string` | `'nav-back'` |
| `back-icon-size` / `backIconSize` | 左边返回图标的大小，px | `string \| number` | `'18'` |
| `back-text` / `backText` | 返回的文字提示 | `string` | `''` |
| `back-text-color` / `backTextColor` | 返回文字的颜色 | `string` | `''` |
| `back-text-style` / `backTextStyle` | 返回文字的样式 | `UTSJSONObject` | - |
| `title` | 导航栏标题 | `string` | `''` |
| `title-width` / `titleWidth` | 标题的宽度，单位 px | `string \| number` | `'180'` |
| `title-color` / `titleColor` | 标题的颜色 | `string` | `''` |
| `title-bold` / `titleBold` | 标题字体是否加粗 | `boolean` | `false` |
| `title-size` / `titleSize` | 标题的字体大小 | `string \| number` | `16` |
| `is-back` / `isBack` | 是否显示导航栏左边返回图标和辅助文字 | `boolean \| string` | `true` |
| `background` | 导航栏背景设置 | `UTSJSONObject` | - |
| `is-fixed` / `isFixed` | 导航栏是否固定在顶部 | `boolean` | `true` |
| `immersive` | 是否沉浸式，允许 fixed 定位后导航栏塌陷，仅 fixed 定位下生效 | `boolean` | `false` |
| `border-bottom` / `borderBottom` | 是否显示导航栏的下边框 | `boolean` | `true` |
| `z-index` / `zIndex` | 固定在顶部时的 z-index 值 | `string \| number` | `''` |
| `custom-back` / `customBack` | 自定义返回逻辑方法 | `() => void` | - |
| `custom-class` / `customClass` | 自定义类名 | `string` | `''` |
| `custom-style` / `customStyle` | 自定义样式 | `string \| UTSJSONObject` | - |

## 双向绑定（v-model）

该组件无双向绑定。

## 事件

无类型化自定义事件（原生事件不受影响，可直接透传监听）。

## 插槽

| 插槽名 | 说明 |
| --- | --- |
| `left` | 导航栏左侧自定义内容区（位于返回区之后、标题之前） |
| `default` | 导航栏中间内容区（位于标题之后、右侧插槽之前，可用于自定义标题以外的居中内容） |
| `right` | 导航栏右侧自定义内容区（位于导航栏最右端） |

## 外部样式类

| 名称 | 说明 |
| --- | --- |
| `custom-class` | 自定义根节点样式类 |
