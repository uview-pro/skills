<!-- 生成物，勿手改：由 scripts/gen-api-cards.mjs 渲染，改动会在下次再生成时丢失 -->

# u-cell-item API

> 来源：`components/u-cell-item`（uview-pro v0.6.21）
> API 指纹：`sha256:e631789127a4087d3b6594112cd63c10825619d689e77209dcdb3405d8d70d7b`
> 官方文档：https://uviewpro.cn/zh/components/cell.html
> 再生成（组件库源码可读时）：`node scripts/gen-api-cards.mjs --lib <uview-pro 路径> --only cell-item`

cell单元格一般用于一组列表的情况，比如个人中心页，设置页等。搭配u-cell-group使用

## 用法示例

```vue
<u-cell-item icon="integral-fill" title="会员等级" value="新版本"></u-cell-item>
```

## 属性

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `custom-style` / `customStyle` | 自定义根节点样式 | `string \| Record<string, any>` | - |
| `custom-class` / `customClass` | 自定义根节点样式类 | `string` | `''` |
| `icon` | 左侧图标名称(只能uView内置图标)，或者图标src | `string` | `''` |
| `title` | 左侧标题 | `string \| number` | `''` |
| `value` | 右侧内容 | `string \| number` | `''` |
| `label` | 标题下方的描述信息 | `string \| number` | `''` |
| `border-bottom` / `borderBottom` | 是否显示下边框 | `boolean` | `true` |
| `border-top` / `borderTop` | 是否显示上边框 | `boolean` | `false` |
| `hover-class` / `hoverClass` | 是否开启点击反馈，即点击时cell背景为灰色，none为无效果 | `string` | `'u-cell-hover'` |
| `arrow` | 是否显示右侧箭头 | `boolean` | `true` |
| `center` | 内容是否垂直居中 | `boolean` | `false` |
| `required` | 是否显示左边表示必填的星号 | `boolean` | `false` |
| `title-width` / `titleWidth` | 标题的宽度，单位rpx | `number \| string` | `''` |
| `arrow-direction` / `arrowDirection` | 右侧箭头方向，可选值：right\|up\|down，默认为right | `CellItemArrowDirection`（`right`｜`up`｜`down`） | `'right'` |
| `title-style` / `titleStyle` | 控制标题的样式 | `CellItemStyle` | - |
| `value-style` / `valueStyle` | 右侧显示内容的样式 | `CellItemStyle` | - |
| `label-style` / `labelStyle` | 描述信息的样式 | `CellItemStyle` | - |
| `bg-color` / `bgColor` | 背景颜色 | `string` | `'transparent'` |
| `index` | 用于识别被点击的是第几个cell | `CellItemIndex` | `''` |
| `use-label-slot` / `useLabelSlot` | 是否使用label插槽 | `boolean` | `false` |
| `icon-size` / `iconSize` | 左边图标的大小，单位rpx，只对传入icon字段时有效 | `number \| string` | `34` |
| `icon-style` / `iconStyle` | 左边图标的样式，对象形式 | `CellItemStyle` | - |

## 双向绑定（v-model）

该组件无双向绑定。

## 事件

| 事件 | 回调参数 | 说明 |
| --- | --- | --- |
| `@click` | `index: string \| number` | 点击单元格时触发 |

## 插槽

| 插槽名 | 说明 |
| --- | --- |
| `icon` | - |
| `title` | - |
| `label` | - |
| `default` | - |
| `right-icon` | - |
