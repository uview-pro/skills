<!-- 生成物，勿手改：由 scripts/gen-api-cards.mjs 渲染，改动会在下次再生成时丢失 -->

# u-time-line-item API

> 来源：`components/u-time-line-item`（uview-pro v0.6.21）
> API 指纹：`sha256:cf354bb6eaa8b555921b506b0fcbd3b02c1d4577d19aa6cc3e13260285f51ad1`
> 官方文档：https://uviewpro.cn/zh/components/timeLine.html
> 再生成（组件库源码可读时）：`node scripts/gen-api-cards.mjs --lib <uview-pro 路径> --only time-line-item`

时间轴组件一般用于物流信息展示，各种跟时间相关的记录等场景。(搭配u-time-line使用)

## 用法示例

```vue
<u-time-line-item node-top="2">...</u-time-line-item>
```

## 属性

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `custom-style` / `customStyle` | 自定义根节点样式 | `string \| Record<string, any>` | - |
| `custom-class` / `customClass` | 自定义根节点样式类 | `string` | `''` |
| `bg-color` / `bgColor` | 节点的背景颜色 | `string` | `'transparent'` |
| `node-top` / `nodeTop` | 节点左边图标绝对定位的top值，单位rpx | `string \| number` | `''` |

## 双向绑定（v-model）

该组件无双向绑定。

## 事件

无类型化自定义事件（原生事件不受影响，可直接透传监听）。

## 插槽

| 插槽名 | 说明 |
| --- | --- |
| `content` | - |
| `node` | - |
