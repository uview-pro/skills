<!-- 生成物，勿手改：由 scripts/gen-api-cards.mjs 渲染，改动会在下次再生成时丢失 -->

# u-root-portal API

> 来源：`components/u-root-portal`（uview-pro v0.6.21）
> API 指纹：`sha256:98e66a3536a2ac3bf8b45f7aee6595143e93baac89b16cbdede6c51b43a5e66c`
> 官方文档：https://uviewpro.cn/zh/components/rootPortal.html
> 再生成（组件库源码可读时）：`node scripts/gen-api-cards.mjs --lib <uview-pro 路径> --only root-portal`

该组件一般用于使整个子树从页面中脱离出来，类似于在 CSS 中使用 fixed position 的效果。主要用于制作弹窗、弹出层等。

## 用法示例

```vue
<u-root-portal><view class="modal">这是一个全局弹窗</view></u-root-portal>
```

## 属性

无属性。

## 双向绑定（v-model）

该组件无双向绑定。

## 事件

无类型化自定义事件（原生事件不受影响，可直接透传监听）。

## 插槽

| 插槽名 | 说明 |
| --- | --- |
| `default` | - |
