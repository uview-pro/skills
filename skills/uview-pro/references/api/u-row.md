<!-- 生成物，勿手改：由 scripts/gen-api-cards.mjs 渲染，改动会在下次再生成时丢失 -->

# u-row API

> 来源：`components/u-row`（uview-pro v0.6.21）
> API 指纹：`sha256:517671b76f76a8d3e770c858524b5c418a8bdb5f1be0f8255728578128cb376b`
> 官方文档：https://uviewpro.cn/zh/components/layout.html#row-props
> 再生成（组件库源码可读时）：`node scripts/gen-api-cards.mjs --lib <uview-pro 路径> --only row`

通过基础的 12 分栏，迅速简便地创建布局。

## 用法示例

```vue
<u-row gutter="16"></u-row>
```

## 属性

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `custom-style` / `customStyle` | 自定义根节点样式 | `string \| Record<string, any>` | - |
| `custom-class` / `customClass` | 自定义根节点样式类 | `string` | `''` |
| `gutter` | 给col添加间距，左右边距各占一半 | `number \| string` | `20` |
| `justify` | 水平排列方式，可选值为`start`(或`flex-start`)、`end`(或`flex-end`)、`center`、`around`(或`space-around`)、`between`(或`space-between`) | `RowJustify`（`start`｜`flex-start`｜`end`｜`flex-end`｜`center`｜`around`｜`space-around`｜`between`｜`space-between`） | `'start'` |
| `align` | 垂直对齐方式，可选值为top、center、bottom | `RowAlign`（`top`｜`center`｜`bottom`） | `'center'` |
| `stop` | 是否阻止事件传播 | `boolean` | `true` |

## 双向绑定（v-model）

该组件无双向绑定。

## 事件

| 事件 | 回调参数 | 说明 |
| --- | --- | --- |
| `@click` | - | 点击行布局时触发 |

## 插槽

| 插槽名 | 说明 |
| --- | --- |
| `default` | - |
