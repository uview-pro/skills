<!-- 生成物，勿手改：由 scripts/gen-api-cards.mjs 渲染，改动会在下次再生成时丢失 -->

# ux-mask API

> 来源：`components/ux-mask`（uview-pro-x v1.0.0）
> API 指纹：`sha256:ba074d412dc8ac5a4ba42633d1f19cbfea231a0a7501e8f87820aeae30922ee9`
> 再生成（组件库源码可读时）：`node scripts/gen-api-cards.mjs --lib <uview-pro-x 路径> --only mask`

创建一个遮罩层，用于强调特定的页面元素，并阻止用户对遮罩下层的内容进行操作，一般用于弹窗场景

## 属性

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `custom-style` / `customStyle` | 自定义根节点样式 | `string \| UTSJSONObject` | - |
| `custom-class` / `customClass` | 自定义根节点样式类 | `string` | `''` |
| `show` | 是否显示遮罩 | `boolean` | `false` |
| `z-index` / `zIndex` | 层级 z-index | `string \| number` | `''` |
| `zoom` | 是否使用 scale 对内容层进行缩放（遮罩背景不缩放） | `boolean` | `true` |
| `duration` | 遮罩的过渡时间，单位为 ms | `string \| number` | `300` |
| `mask-click-able` / `maskClickAble` | 是否可以通过点击遮罩进行关闭 | `boolean` | `true` |

## 双向绑定（v-model）

该组件无双向绑定。

> ⚠️ `show` 为单向属性（无 `update:show` 事件），**不支持** `v-model:show`。

## 事件

| 事件 | 回调参数 | 说明 |
| --- | --- | --- |
| `@click` | - | maskClickAble为true时，点击遮罩发送此事件 |

## 插槽

| 插槽名 | 说明 |
| --- | --- |
| `default` | - |

## 外部样式类

| 名称 | 说明 |
| --- | --- |
| `custom-class` | 自定义根节点样式类 |
