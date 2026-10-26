<!-- 生成物，勿手改：由 scripts/gen-api-cards.mjs 渲染，改动会在下次再生成时丢失 -->

# ux-card API

> 来源：`components/ux-card`（uview-pro-x v1.0.0）
> API 指纹：`sha256:41a501ce648e8a457eee2f10ad3e4feda8380eac83123d0364d73ed4ad7df795`
> 再生成（组件库源码可读时）：`node scripts/gen-api-cards.mjs --lib <uview-pro-x 路径> --only card`

卡片组件一般用于多个列表条目，且风格统一的场景

## 属性

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `custom-style` / `customStyle` | 自定义根节点样式 | `UTSJSONObject` | - |
| `custom-class` / `customClass` | 自定义根节点样式类 | `string` | `''` |
| `full` | 卡片与屏幕两侧是否留空隙 | `boolean` | `false` |
| `title` | 头部左边的标题 | `string` | `''` |
| `title-color` / `titleColor` | 标题颜色 | `string` | `''` |
| `title-size` / `titleSize` | 标题字体大小，单位 px | `string \| number` | `'15'` |
| `sub-title` / `subTitle` | 头部右边的副标题 | `string` | `''` |
| `sub-title-color` / `subTitleColor` | 副标题颜色 | `string` | `''` |
| `sub-title-size` / `subTitleSize` | 副标题字体大小，单位 px | `string \| number` | `'13'` |
| `border` | 是否显示外部边框 | `boolean` | `false` |
| `index` | 用于标识点击了第几个卡片 | `CardIndex` | `''` |
| `box-shadow` / `boxShadow` | 卡片外围阴影，字符串形式 | `string` | `'none'` |
| `margin` | 卡片与上下左右元素的间距，需带单位，如 "15px 10px" | `string` | `'15px'` |
| `border-radius` / `borderRadius` | 卡片整体的圆角值，单位 px | `string \| number` | `'8'` |
| `head-style` / `headStyle` | 头部自定义样式 | `UTSJSONObject` | - |
| `body-style` / `bodyStyle` | 主体自定义样式 | `UTSJSONObject` | - |
| `foot-style` / `footStyle` | 底部自定义样式 | `UTSJSONObject` | - |
| `head-border-bottom` / `headBorderBottom` | 头部是否显示下边框 | `boolean` | `true` |
| `foot-border-top` / `footBorderTop` | 底部是否显示上边框 | `boolean` | `true` |
| `show-head` / `showHead` | 是否显示头部 | `boolean` | `true` |
| `show-foot` / `showFoot` | 是否显示尾部 | `boolean` | `true` |
| `thumb` | 标题左边缩略图路径 | `string` | `''` |
| `thumb-width` / `thumbWidth` | 缩略图宽度和高度，单位 px | `string \| number` | `'30'` |
| `thumb-circle` / `thumbCircle` | 缩略图是否为圆形 | `boolean` | `false` |
| `padding` | 头部/主体/底部的内边距，单位 px | `string \| number` | `'15'` |

## 双向绑定（v-model）

该组件无双向绑定。

## 事件

| 事件 | 回调参数 | 说明 |
| --- | --- | --- |
| `@click` | `index: CardIndex` | 整个卡片任意位置被点击时触发 |
| `@head-click` | `index: CardIndex` | 卡片头部被点击时触发 |
| `@body-click` | `index: CardIndex` | 卡片主体部分被点击时触发 |
| `@foot-click` | `index: CardIndex` | 卡片底部部分被点击时触发 |

## 插槽

| 插槽名 | 说明 |
| --- | --- |
| `head` | - |
| `default` | - |
| `body` | - |
| `foot` | - |

## 外部样式类

| 名称 | 说明 |
| --- | --- |
| `custom-class` | 自定义根节点样式类 |
