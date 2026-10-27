<!-- 生成物，勿手改：由 scripts/gen-api-cards.mjs 渲染，改动会在下次再生成时丢失 -->

# u-grid-item API

> 来源：`components/u-grid-item`（uview-pro v0.6.21）
> API 指纹：`sha256:91bc7052e44f630dd93ec1c0bf7669e6e7e1054a8298909c89f57941fee35d93`
> 官方文档：https://uviewpro.cn/zh/components/grid.html
> 再生成（组件库源码可读时）：`node scripts/gen-api-cards.mjs --lib <uview-pro 路径> --only grid-item`

宫格组件一般用于同时展示多个同类项目的场景，可以给宫格的项目设置徽标组件(badge)，或者图标等，也可以扩展为左右滑动的轮播形式。搭配u-grid使用

## 用法示例

```vue
<u-grid-item></u-grid-item>
```

## 属性

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `custom-style` / `customStyle` | 自定义根节点样式 | `string \| Record<string, any>` | - |
| `custom-class` / `customClass` | 自定义根节点样式类 | `string` | `''` |
| `bg-color` / `bgColor` | 背景颜色 | `string` | `'var(--u-bg-white)'` |
| `index` | 点击时返回的index | `string \| number` | `''` |

## 双向绑定（v-model）

该组件无双向绑定。

## 事件

| 事件 | 回调参数 | 说明 |
| --- | --- | --- |
| `@click` | - | 点击宫格触发 |

## 插槽

| 插槽名 | 说明 |
| --- | --- |
| `default` | - |

## 命令式方法（通过组件 ref 调用）

| 方法 | 说明 |
| --- | --- |
| `click` | - |
