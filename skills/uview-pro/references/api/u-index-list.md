<!-- 生成物，勿手改：由 scripts/gen-api-cards.mjs 渲染，改动会在下次再生成时丢失 -->

# u-index-list API

> 来源：`components/u-index-list`（uview-pro v0.6.21）
> API 指纹：`sha256:fdb354661e2f49acb185cd89be646d94b1febab499ab77517b1f1213d8ab96f7`
> 官方文档：https://uviewpro.cn/zh/components/indexList.html#indexanchor-props
> 再生成（组件库源码可读时）：`node scripts/gen-api-cards.mjs --lib <uview-pro 路径> --only index-list`

通过折叠面板收纳内容区域,搭配&lt;u-index-anchor&gt;使用

## 用法示例

```vue
<u-index-list :scrollTop="scrollTop"></u-index-list>
```

## 属性

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `sticky` | 是否开启锚点自动吸顶 | `boolean` | `true` |
| `z-index` / `zIndex` | 锚点吸顶时的层级 | `number \| string` | `''` |
| `scroll-top` / `scrollTop` | 当前滚动高度 | `number \| string` | `0` |
| `offset-top` / `offsetTop` | 锚点自动吸顶时与顶部的距离 | `number \| string` | `0` |
| `index-list` / `indexList` | 索引字符列表 | `string[]` | - |
| `active-color` / `activeColor` | 锚点和右边索引字符高亮颜色 | `string` | - |

## 双向绑定（v-model）

该组件无双向绑定。

## 事件

| 事件 | 回调参数 | 说明 |
| --- | --- | --- |
| `@select` | - | 选中右边索引字符时触发 |

## 插槽

| 插槽名 | 说明 |
| --- | --- |
| `default` | - |

## 命令式方法（通过组件 ref 调用）

| 方法 | 说明 |
| --- | --- |
| `updateData` | - |
| `setRect` | - |
| `onScroll` | - |
| `children` | - |
