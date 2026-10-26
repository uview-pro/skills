<!-- 生成物，勿手改：由 scripts/gen-api-cards.mjs 渲染，改动会在下次再生成时丢失 -->

# ux-step API

> 来源：`components/ux-step`（uview-pro-x v1.0.0）
> API 指纹：`sha256:3b913a2e8376fb666b04a367ae20acc274a37c355694d815c62615912acefda2`
> 再生成（组件库源码可读时）：`node scripts/gen-api-cards.mjs --lib <uview-pro-x 路径> --only step`

步骤条子组件，搭配 ux-steps 使用

## 属性

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `custom-style` / `customStyle` | 自定义根节点样式，对象形式 | `UTSJSONObject` | - |
| `custom-class` / `customClass` | 自定义根节点样式类 | `string` | `''` |
| `name` | 步骤名称 | `string` | `''` |
| `desc` | 步骤描述 | `string` | `''` |
| `icon` | 自定义图标 | `string` | `''` |
| `active-color` / `activeColor` | 激活颜色 | `string` | `''` |
| `inactive-color` / `inactiveColor` | 未激活颜色 | `string` | `''` |

## 双向绑定（v-model）

该组件无双向绑定。

## 事件

无类型化自定义事件（原生事件不受影响，可直接透传监听）。

## 插槽

无插槽。

## 外部样式类

| 名称 | 说明 |
| --- | --- |
| `custom-class` | 自定义根节点样式类 |
