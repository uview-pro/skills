<!-- 生成物，勿手改：由 scripts/gen-api-cards.mjs 渲染，改动会在下次再生成时丢失 -->

# u-mask API

> 来源：`components/u-mask`（uview-pro v0.6.21）
> API 指纹：`sha256:cbb4e2a168716b89fcc5625de0e226314fa31fa20869411f0f98d91e4d7a5437`
> 官方文档：https://uviewpro.cn/zh/components/mask.html
> 再生成（组件库源码可读时）：`node scripts/gen-api-cards.mjs --lib <uview-pro 路径> --only mask`

创建一个遮罩层，用于强调特定的页面元素，并阻止用户对遮罩下层的内容进行操作，一般用于弹窗场景

## 用法示例

```vue
<u-mask :show="show" @click="show = false"></u-mask>
```

## 属性

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `custom-style` / `customStyle` | 自定义根节点样式 | `string \| Record<string, any>` | - |
| `custom-class` / `customClass` | 自定义根节点样式类 | `string` | `''` |
| `show` | 是否显示遮罩 | `boolean` | `false` |
| `z-index` / `zIndex` | 层级z-index | `number \| string` | `''` |
| `zoom` | 遮罩的动画样式，是否使用zoom进行scale进行缩放 | `boolean` | `true` |
| `duration` | 遮罩的过渡时间，单位为ms | `number \| string` | `300` |
| `mask-click-able` / `maskClickAble` | 是否可以通过点击遮罩进行关闭 | `boolean` | `true` |

## 双向绑定（v-model）

该组件无双向绑定。

> ⚠️ `show` 为单向属性（无 `update:show` 事件），**不支持** `v-model:show`；可见性由父组件 `:show` 绑定控制。

## 事件

| 事件 | 回调参数 | 说明 |
| --- | --- | --- |
| `@click` | - | mask-click-able为true时，点击遮罩发送此事件 |

## 插槽

| 插槽名 | 说明 |
| --- | --- |
| `default` | - |
