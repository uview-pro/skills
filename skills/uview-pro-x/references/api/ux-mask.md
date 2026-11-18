<!-- 生成物，勿手改：由 scripts/gen-api-cards.mjs 渲染，改动会在下次再生成时丢失 -->

# ux-mask API

> 来源：`components/ux-mask`（uview-pro-x v2.0.0）
> API 指纹：`sha256:306bf37a9fa0a123104aaa8088b09fc8d9eb4b45288b9798ea800ef0b354775d`
> 再生成（组件库源码可读时）：`node scripts/gen-api-cards.mjs --lib <uview-pro-x 路径> --only mask`

创建一个遮罩层，用于强调特定的页面元素，并阻止用户对遮罩下层的内容进行操作，一般用于弹窗场景

## 属性

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `custom-style` / `customStyle` | 自定义根节点样式 | `string \| JsonObject` | - |
| `custom-class` / `customClass` | 自定义根节点样式类 | `string` | `''` |
| `show` | 是否显示遮罩 | `boolean` | `false` |
| `z-index` / `zIndex` | 层级 z-index | `string \| number` | `''` |
| `zoom` | 是否使用 scale 对内容层进行缩放（遮罩背景不缩放） | `boolean` | `true` |
| `duration` | 遮罩的过渡时间，单位为 ms | `string \| number` | `300` |
| `mask-click-able` / `maskClickAble` | 是否可以通过点击遮罩进行关闭 | `boolean` | `true` |

## 类型定义

> 本卡引用的自定义类型展开定义（源自组件 types.ts / 全局 types/global.ts），对象字面量可直接赋值。

| 类型 | 定义 |
| --- | --- |
| `JsonObject` | `Record<string, any>`（普通对象，任意键值、可嵌套；全库统一对象类型，含内联样式） |

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
