<!-- 生成物，勿手改：由 scripts/gen-api-cards.mjs 渲染，改动会在下次再生成时丢失 -->

# u-cell-group API

> 来源：`components/u-cell-group`（uview-pro v0.6.21）
> API 指纹：`sha256:20c7b1d8ab9a071a72c62af4a370591d7bebbdcf63d6a7fb6ebae9dea69d1e27`
> 官方文档：https://uviewpro.cn/zh/components/cell.html
> 再生成（组件库源码可读时）：`node scripts/gen-api-cards.mjs --lib <uview-pro 路径> --only cell-group`

cell单元格一般用于一组列表的情况，比如个人中心页，设置页等。搭配u-cell-item

## 用法示例

```vue
<u-cell-group title="设置喜好">
```

## 属性

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `custom-style` / `customStyle` | 自定义根节点样式 | `string \| Record<string, any>` | - |
| `custom-class` / `customClass` | 自定义根节点样式类 | `string` | `''` |
| `title` | 分组标题 | `string` | `''` |
| `border` | 是否显示分组list上下边框 | `boolean` | `true` |
| `title-style` / `titleStyle` | 分组标题的样式，对象形式，注意驼峰属性写法 | `Record<string, any>` | - |

## 双向绑定（v-model）

该组件无双向绑定。

## 事件

无类型化自定义事件（原生事件不受影响，可直接透传监听）。

## 插槽

| 插槽名 | 说明 |
| --- | --- |
| `default` | - |
