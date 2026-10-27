<!-- 生成物，勿手改：由 scripts/gen-api-cards.mjs 渲染，改动会在下次再生成时丢失 -->

# u-waterfall API

> 来源：`components/u-waterfall`（uview-pro v0.6.21）
> API 指纹：`sha256:6c52229cab0e7e884789e1fa2457a5f5bdfb0124f1f2e00ab786e5676c040695`
> 官方文档：https://uviewpro.cn/zh/components/waterfall.html
> 再生成（组件库源码可读时）：`node scripts/gen-api-cards.mjs --lib <uview-pro 路径> --only waterfall`

这是一个瀑布流形式的组件，内容分为左右两列，结合uView的懒加载组件效果更佳。相较于某些只是奇偶数左右分别，或者没有利用vue作用域插槽的做法，uView的瀑布流实现了真正的 组件化，搭配LazyLoad 懒加载和loadMore 加载更多组件，让您开箱即用，眼前一亮。

## 用法示例

```vue
<u-waterfall v-model="flowList"></u-waterfall>
```

## 属性

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `custom-style` / `customStyle` | 自定义根节点样式 | `string \| Record<string, any>` | - |
| `custom-class` / `customClass` | 自定义根节点样式类 | `string` | `''` |
| `model-value` / `modelValue` | 瀑布流数据数组，必填 | `any[]` | 必填 |
| `add-time` / `addTime` | 新增数据的动画间隔，单位ms | `number \| string` | `200` |
| `id-key` / `idKey` | 数据项的唯一标识key | `string` | `'id'` |

## 双向绑定（v-model）

| 写法 | 通道 | 说明 |
| --- | --- | --- |
| `v-model` | prop + emit（`update:modelValue`） | `modelValue` 属性，默认 - |

## 事件

无类型化自定义事件（原生事件不受影响，可直接透传监听）。

## 插槽

| 插槽名 | 说明 |
| --- | --- |
| `left` | - |
| `right` | - |

## 命令式方法（通过组件 ref 调用）

| 方法 | 说明 |
| --- | --- |
| `clear` | - |
| `remove` | - |
| `modify` | - |
