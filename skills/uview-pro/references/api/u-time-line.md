<!-- 生成物，勿手改：由 scripts/gen-api-cards.mjs 渲染，改动会在下次再生成时丢失 -->

# u-time-line API

> 来源：`components/u-time-line`（uview-pro v0.6.21）
> API 指纹：`sha256:0b3cfab2e67ef4eb61d97b89b6a8c38b028e318a784b04ff505b078b568f2238`
> 官方文档：https://uviewpro.cn/zh/components/timeLine.html
> 再生成（组件库源码可读时）：`node scripts/gen-api-cards.mjs --lib <uview-pro 路径> --only time-line`

时间轴组件一般用于物流信息展示，各种跟时间相关的记录等场景。

## 用法示例

```vue
<u-time-line></u-time-line>
```

## 属性

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `custom-style` / `customStyle` | 自定义根节点样式 | `string \| Record<string, any>` | - |
| `custom-class` / `customClass` | 自定义根节点样式类 | `string` | `''` |

## 双向绑定（v-model）

该组件无双向绑定。

## 事件

无类型化自定义事件（原生事件不受影响，可直接透传监听）。

## 插槽

| 插槽名 | 说明 |
| --- | --- |
| `default` | - |
