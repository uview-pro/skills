<!-- 生成物，勿手改：由 scripts/gen-api-cards.mjs 渲染，改动会在下次再生成时丢失 -->

# u-table API

> 来源：`components/u-table`（uview-pro v0.6.21）
> API 指纹：`sha256:11339852b1d80b2a50a976c20aa0826720c816d69205ff2105730f2680552a5e`
> 官方文档：https://uviewpro.cn/zh/components/table.html
> 再生成（组件库源码可读时）：`node scripts/gen-api-cards.mjs --lib <uview-pro 路径> --only table`

表格组件一般用于展示大量结构化数据的场景

## 用法示例

```vue
<u-table></u-table>
```

## 属性

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `custom-style` / `customStyle` | 自定义根节点样式 | `string \| Record<string, any>` | - |
| `custom-class` / `customClass` | 自定义根节点样式类 | `string` | `''` |
| `border-color` / `borderColor` | 表格边框的颜色 | `string` | `'var(--u-border-color)'` |
| `align` | 单元格的内容对齐方式，作用类似css的text-align | `TextAlign`（`left`｜`center`｜`right`） | `'center'` |
| `padding` | 单元格的内边距，同css的padding写法 | `string` | `'10rpx 6rpx'` |
| `font-size` / `fontSize` | 单元格字体大小，单位rpx | `number \| string` | `28` |
| `color` | 单元格字体颜色 | `string` | `'var(--u-content-color)'` |
| `th-style` / `thStyle` | th单元格的样式，对象形式(将th所需参数放在table组件，是为了避免每一个th组件要写一遍） | `Record<string, any>` | - |
| `bg-color` / `bgColor` | 表格的背景颜色 | `string` | `'var(--u-bg-white)'` |

## 双向绑定（v-model）

该组件无双向绑定。

## 事件

无类型化自定义事件（原生事件不受影响，可直接透传监听）。

## 插槽

| 插槽名 | 说明 |
| --- | --- |
| `default` | - |

## 命令式方法（通过组件 ref 调用）

| 方法 | 说明 |
| --- | --- |
| `tableStyle` | - |
