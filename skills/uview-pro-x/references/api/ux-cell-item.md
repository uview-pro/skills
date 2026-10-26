<!-- 生成物，勿手改：由 scripts/gen-api-cards.mjs 渲染，改动会在下次再生成时丢失 -->

# ux-cell-item API

> 来源：`components/ux-cell-item`（uview-pro-x v1.0.0）
> API 指纹：`sha256:73015dcabcc98d55bf1955f5a6402cf65a23bf9206acf6ba06e9bd6190946e8e`
> 再生成（组件库源码可读时）：`node scripts/gen-api-cards.mjs --lib <uview-pro-x 路径> --only cell-item`

cell单元格一般用于一组列表的情况，比如个人中心页，设置页等。搭配ux-cell-group使用

## 属性

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `custom-style` / `customStyle` | 自定义根节点样式 | `string \| UTSJSONObject` | - |
| `custom-class` / `customClass` | 自定义根节点样式类 | `string` | `''` |
| `icon` | 左侧图标名称(只能uView内置图标)，或者图标src | `string` | `''` |
| `title` | 左侧标题 | `string \| number` | `''` |
| `value` | 右侧内容 | `string \| number` | `''` |
| `label` | 标题下方的描述信息 | `string \| number` | `''` |
| `border-bottom` / `borderBottom` | 是否显示下边框（默认true） | `boolean` | `true` |
| `border-top` / `borderTop` | 是否显示上边框（默认false） | `boolean` | `false` |
| `hover-class` / `hoverClass` | 是否开启点击反馈，即点击时cell背景为灰色，none为无效果 | `string` | `'ux-cell--hover'` |
| `arrow` | 是否显示右侧箭头（默认true） | `boolean` | `true` |
| `center` | 内容是否垂直居中（默认false） | `boolean` | `false` |
| `required` | 是否显示左边表示必填的星号（默认false） | `boolean` | `false` |
| `title-width` / `titleWidth` | 标题的宽度，单位px | `number \| string` | `''` |
| `arrow-direction` / `arrowDirection` | 右侧箭头方向，可选值：right\|up\|down，默认为right | `CellItemArrowDirection`（`right`｜`up`｜`down`） | `'right'` |
| `title-style` / `titleStyle` | 控制标题的样式 | `UTSJSONObject` | - |
| `value-style` / `valueStyle` | 右侧显示内容的样式 | `UTSJSONObject` | - |
| `label-style` / `labelStyle` | 描述信息的样式 | `UTSJSONObject` | - |
| `bg-color` / `bgColor` | 背景颜色（默认transparent） | `string` | `'transparent'` |
| `icon-size` / `iconSize` | 左边图标的大小，单位px，只对传入icon字段时有效（默认17） | `number \| string` | `17` |
| `icon-style` / `iconStyle` | 左边图标的样式，对象形式 | `UTSJSONObject` | - |

## 双向绑定（v-model）

该组件无双向绑定。

## 事件

| 事件 | 回调参数 | 说明 |
| --- | --- | --- |
| `@click` | `event: UniEvent` | - |

## 插槽

| 插槽名 | 说明 |
| --- | --- |
| `icon` | - |
| `title` | - |
| `label` | - |
| `default` | - |
| `right-icon` | - |

## 外部样式类

| 名称 | 说明 |
| --- | --- |
| `custom-class` | 自定义根节点样式类 |
