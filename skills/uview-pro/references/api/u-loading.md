<!-- 生成物，勿手改：由 scripts/gen-api-cards.mjs 渲染，改动会在下次再生成时丢失 -->

# u-loading API

> 来源：`components/u-loading`（uview-pro v0.6.21）
> API 指纹：`sha256:7b7dcfd1e559b6818b010e4d497cfd3fd6eb8e0cbe112beb4f3b6b42f172aade`
> 官方文档：https://uviewpro.cn/zh/components/loading.html
> 再生成（组件库源码可读时）：`node scripts/gen-api-cards.mjs --lib <uview-pro 路径> --only loading`

此组件为一个小动画，目前用在uView的loadmore加载更多和switch开关等组件的正在加载状态场景。

## 用法示例

```vue
<u-loading mode="circle"></u-loading>
```

## 属性

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `custom-style` / `customStyle` | 自定义根节点样式 | `string \| Record<string, any>` | - |
| `custom-class` / `customClass` | 自定义根节点样式类 | `string` | `''` |
| `mode` | 动画的类型 | `LoadingMode` | `'circle'` |
| `color` | 动画的颜色 | `string` | `'var(--u-light-color)'` |
| `size` | 加载图标的大小，单位rpx | `string \| number` | `'34'` |
| `show` | 是否显示动画 | `boolean` | `true` |

## 双向绑定（v-model）

该组件无双向绑定。

> ⚠️ `show` 为单向属性（无 `update:show` 事件），**不支持** `v-model:show`；可见性由父组件 `:show` 绑定控制。

## 事件

无类型化自定义事件（原生事件不受影响，可直接透传监听）。

## 插槽

无插槽。
