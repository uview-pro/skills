<!-- 生成物，勿手改：由 scripts/gen-api-cards.mjs 渲染，改动会在下次再生成时丢失 -->

# u-full-screen API

> 来源：`components/u-full-screen`（uview-pro v0.6.21）
> API 指纹：`sha256:61147ddbe8f631627b53c9ad877c16bd199ac5a3a8a02bcf5e639a8ce28b4071`
> 官方文档：https://uviewpro.cn/zh/components/fullScreen.html
> 再生成（组件库源码可读时）：`node scripts/gen-api-cards.mjs --lib <uview-pro 路径> --only full-screen`

用于APP弹窗遮盖导航栏和底部tabbar，提示新版本升级内容

## 属性

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `custom-style` / `customStyle` | 自定义根节点样式 | `string \| Record<string, any>` | - |
| `custom-class` / `customClass` | 自定义根节点样式类 | `string` | `''` |
| `show` | 是否显示弹窗 | `boolean` | `false` |
| `title` | 弹窗标题 | `string` | `''` |
| `content` | 升级内容，支持富文本 | `string` | `''` |

## 双向绑定（v-model）

该组件无双向绑定。

> ⚠️ `show` 为单向属性（无 `update:show` 事件），**不支持** `v-model:show`；可见性由父组件 `:show` 绑定控制。

## 事件

无类型化自定义事件（原生事件不受影响，可直接透传监听）。

## 插槽

无插槽。
