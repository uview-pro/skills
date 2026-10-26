<!-- 生成物，勿手改：由 scripts/gen-api-cards.mjs 渲染，改动会在下次再生成时丢失 -->

# ux-cell-group API

> 来源：`components/ux-cell-group`（uview-pro-x v1.0.0）
> API 指纹：`sha256:31419c4528d329820cc72fe6d39d13c48e9ad7f0d98a4d3b41337423fb6843e5`
> 再生成（组件库源码可读时）：`node scripts/gen-api-cards.mjs --lib <uview-pro-x 路径> --only cell-group`

cell单元格一般用于一组列表的情况，比如个人中心页，设置页等。搭配ux-cell-item

## 属性

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `custom-style` / `customStyle` | 自定义根节点样式 | `string \| UTSJSONObject` | - |
| `custom-class` / `customClass` | 自定义根节点样式类 | `string` | `''` |
| `title` | 分组标题 | `string` | `''` |
| `border` | 是否显示分组list上下边框（默认true） | `boolean` | `true` |
| `title-style` / `titleStyle` | 分组标题的样式，对象形式，注意驼峰属性写法 | `UTSJSONObject` | - |

## 双向绑定（v-model）

该组件无双向绑定。

## 事件

无类型化自定义事件（原生事件不受影响，可直接透传监听）。

## 插槽

| 插槽名 | 说明 |
| --- | --- |
| `default` | - |

## 外部样式类

| 名称 | 说明 |
| --- | --- |
| `custom-class` | 自定义根节点样式类 |
