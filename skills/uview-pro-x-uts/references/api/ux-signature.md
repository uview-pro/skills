<!-- 生成物，勿手改：由 scripts/gen-api-cards.mjs 渲染，改动会在下次再生成时丢失 -->

# ux-signature API

> 来源：`components/ux-signature`（uview-pro-x-uts v1.1.13）
> API 指纹：`sha256:d50d8f20ea0a6a623801995d1abda1950f3f6b0d1cfb0010234b9cd343bad086`
> 再生成（组件库源码可读时）：`node scripts/gen-api-cards.mjs --lib <uview-pro-x-uts 路径> --only signature`

基于 canvas 2D 的手写签名板，支持笔迹书写、撤销、清空与图片导出（base64 dataURL）；笔迹按落笔时的颜色与粗细保留，撤销通道按平台区分（鸿蒙重绘笔画，其它端还原像素快照）

## 属性

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `custom-style` / `customStyle` | 自定义根节点样式 | `string \| UTSJSONObject` | - |
| `custom-class` / `customClass` | 自定义根节点样式类 | `string` | `''` |
| `width` | 组件宽度，支持数字(px)/百分比/带单位字符串（默认 100%） | `number \| string` | `'100%'` |
| `height` | 画布区域高度，单位 px（默认 200） | `number \| string` | `200` |
| `export-format` / `exportFormat` | 导出格式：png \| jpeg（默认 png；jpeg 透明背景会变黑，需同时设置 exportBgColor） | `string` | `'png'` |
| `quality` | jpeg 导出质量，0-1（默认 0.8） | `number` | `0.8` |
| `disabled` | 是否禁用书写（默认 false） | `boolean` | `false` |
| `show-tips` / `showTips` | 是否显示提示层（默认 true） | `boolean` | `true` |
| `tips` | 提示文案，为空时回退组件语料 | `string` | `''` |
| `tips-size` / `tipsSize` | 提示字号，单位 px（默认 24） | `number \| string` | `24` |
| `tips-color` / `tipsColor` | 提示文字颜色，为空时回退半透明水印色 | `string` | `''` |
| `line-color` / `lineColor` | 笔迹颜色，为空时回退主题主文字色 | `string` | `''` |
| `line-width` / `lineWidth` | 笔迹宽度，单位 px（默认 3） | `number` | `3` |
| `bg-color` / `bgColor` | 签名区容器底色，为空时回退主题白底（只影响屏幕，不写入导出图） | `string` | `''` |
| `export-bg-color` / `exportBgColor` | 画布填充底色（写入导出图），为空时透明 | `string` | `''` |
| `export-grid` / `exportGrid` | 导出是否保留格线（默认 true，取不到时按 true）；描红只作屏幕提示、不导出；false 时导出仅「底色 + 笔迹」 | `boolean` | `true` |
| `grid-type` / `gridType` | 书写格格线类型：空串关闭；tian 田字格 \| mi 米字格 \| nine 九宫格 | `string` | `''` |
| `grid-size` / `gridSize` | 格子边长，单位 px（默认 56，内部钳制 24-120） | `number` | `56` |
| `grid-color` / `gridColor` | 网格线颜色，为空时回退参考线红 | `string` | `''` |
| `guide-text` / `guideText` | 描红文字，逐格绘制，超出可视格数截断 | `string` | `''` |
| `guide-color` / `guideColor` | 描红文字颜色，为空时回退半透明红 | `string` | `''` |
| `grid-align` / `gridAlign` | 格线垂直对齐：center 居中（默认）\| top 顶对齐；块高度接近画布高度时两者差异很小 | `string` | `'center'` |
| `show-clear` / `showClear` | 是否显示清空按钮（默认 true） | `boolean` | `true` |
| `show-revoke` / `showRevoke` | 是否显示撤销按钮（默认 false） | `boolean` | `false` |
| `show-confirm` / `showConfirm` | 是否显示确定按钮（默认 true） | `boolean` | `true` |
| `clear-text` / `clearText` | 清空按钮文案，为空时回退组件语料 | `string` | `''` |
| `revoke-text` / `revokeText` | 撤销按钮文案，为空时回退组件语料 | `string` | `''` |
| `confirm-text` / `confirmText` | 确定按钮文案，为空时回退组件语料 | `string` | `''` |

## 双向绑定（v-model）

该组件无双向绑定。

## 事件

| 事件 | 回调参数 | 说明 |
| --- | --- | --- |
| `@start` | - | 落笔时触发 |
| `@signing` | - | 书写过程中持续触发 |
| `@end` | - | 抬笔或触摸取消时触发 |
| `@submit` | `image: string` | 点击确定时触发，回传 base64 dataURL；未落笔为空串 |

## 插槽

| 插槽名 | 说明 |
| --- | --- |
| `tips` | 自定义提示层内容，覆盖在画布上方且不拦截书写事件 |

## 外部样式类

| 名称 | 说明 |
| --- | --- |
| `custom-class` | 自定义根节点样式类 |

## 命令式方法（通过组件 ref 调用）

| 方法 | 说明 |
| --- | --- |
| `clear` | - |
| `revoke` | - |
| `done` | - |
| `resize` | - |
