<!-- 生成物，勿手改：由 scripts/gen-api-cards.mjs 渲染，改动会在下次再生成时丢失 -->

# u-td API

> 来源：`components/u-td`（uview-pro v0.6.21）
> API 指纹：`sha256:5c08b5437d08725574fa13cda5529f88bde1eef85eb7c6015aa481a7f43e04ed`
> 官方文档：https://uviewpro.cn/zh/components/table.html#td-props
> 再生成（组件库源码可读时）：`node scripts/gen-api-cards.mjs --lib <uview-pro 路径> --only td`

表格组件一般用于展示大量结构化数据的场景（搭配u-table使用）

## 用法示例

```vue
<u-td>二年级</u-td>
```

## 属性

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `custom-style` / `customStyle` | 自定义根节点样式 | `string \| Record<string, any>` | - |
| `custom-class` / `customClass` | 自定义根节点样式类 | `string` | `''` |
| `width` | 宽度，百分比或者具体带单位的值，如30%，200rpx等，一般使用百分比 | `number \| string` | `'auto'` |

## 双向绑定（v-model）

该组件无双向绑定。

## 事件

无类型化自定义事件（原生事件不受影响，可直接透传监听）。

## 插槽

| 插槽名 | 说明 |
| --- | --- |
| `default` | - |
