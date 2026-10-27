<!-- 生成物，勿手改：由 scripts/gen-api-cards.mjs 渲染，改动会在下次再生成时丢失 -->

# u-pagination API

> 来源：`components/u-pagination`（uview-pro v0.6.21）
> API 指纹：`sha256:f9546b4dc4e0aa44c77ed9e7525b58bf40236332f0fe976717e4c4feb8299978`
> 官方文档：https://uviewpro.cn/zh/components/pagination.html
> 再生成（组件库源码可读时）：`node scripts/gen-api-cards.mjs --lib <uview-pro 路径> --only pagination`

该组件一般用于内容分页展示的场景，通过总页数与当前页展示页码，支持上一页/下一页与快速跳转

## 用法示例

```vue
<u-pagination :total="50" v-model="current"></u-pagination>
```

## 属性

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `custom-style` / `customStyle` | 自定义根节点样式 | `string \| Record<string, any>` | - |
| `custom-class` / `customClass` | 自定义根节点样式类 | `string` | `''` |
| `prev-text` / `prevText` | 左侧按钮文字 | `string` | `''` |
| `next-text` / `nextText` | 右侧按钮文字 | `string` | `''` |
| `total` | 总条目数 | `number` | - |
| `page-size` / `pageSize` | 每页数据量 | `number` | `10` |
| `show-icon` / `showIcon` | 是否以 icon 形式展示按钮 | `boolean` | `false` |
| `prev-icon` / `prevIcon` | 左侧按钮图标，仅支持内置图标 | `string` | `'arrow-left'` |
| `next-icon` / `nextIcon` | 右侧按钮图标，仅支持内置图标 | `string` | `'arrow-right'` |

## 双向绑定（v-model）

该组件无双向绑定。

## 事件

| 事件 | 回调参数 | 说明 |
| --- | --- | --- |
| `@change` | `payload: PaginationChangePayload` | 页码发生变化时触发，返回改变后的页码 |

## 插槽

| 插槽名 | 说明 |
| --- | --- |
| `default` | - |
