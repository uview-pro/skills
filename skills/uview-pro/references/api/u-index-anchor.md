<!-- 生成物，勿手改：由 scripts/gen-api-cards.mjs 渲染，改动会在下次再生成时丢失 -->

# u-index-anchor API

> 来源：`components/u-index-anchor`（uview-pro v0.6.21）
> API 指纹：`sha256:92715d5e5288fe66da21970da9717451416abc8a2d0f81b2fad4ff34696ed8bb`
> 官方文档：https://uviewpro.cn/zh/components/indexList.html#indexanchor-props
> 再生成（组件库源码可读时）：`node scripts/gen-api-cards.mjs --lib <uview-pro 路径> --only index-anchor`

通过折叠面板收纳内容区域,搭配&lt;u-index-anchor&gt;使用

## 用法示例

```vue
<u-index-anchor :index="item" />
```

## 属性

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `custom-style` / `customStyle` | 自定义根节点样式 | `string \| Record<string, any>` | - |
| `custom-class` / `customClass` | 自定义根节点样式类 | `string` | `''` |
| `use-slot` / `useSlot` | 是否使用自定义内容的插槽 | `boolean` | `false` |
| `index` | 索引字符，如果定义了use-slot，此参数自动失效 | `string` | `''` |

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
| `top` | - |
| `height` | - |
| `active` | - |
| `wrapperStyle` | - |
| `anchorStyle` | - |
| `setTop` | - |
| `setHeight` | - |
| `setActive` | - |
| `setAnchorStyle` | - |
| `setWrapperStyle` | - |
