<!-- 生成物，勿手改：由 scripts/gen-api-cards.mjs 渲染，改动会在下次再生成时丢失 -->

# ux-step API

> 来源：`components/ux-step`（uview-pro-x v2.0.0）
> API 指纹：`sha256:6d799a05dfd629a58f296b0686671e2376d4be2d82f5f0df758f25248c728887`
> 再生成（组件库源码可读时）：`node scripts/gen-api-cards.mjs --lib <uview-pro-x 路径> --only step`

步骤条子组件，搭配 ux-steps 使用

## 属性

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `custom-style` / `customStyle` | 自定义根节点样式，对象形式 | `JsonObject` | - |
| `custom-class` / `customClass` | 自定义根节点样式类 | `string` | `''` |
| `name` | 步骤名称 | `string` | `''` |
| `desc` | 步骤描述 | `string` | `''` |
| `icon` | 自定义图标 | `string` | `''` |
| `active-color` / `activeColor` | 激活颜色 | `string` | `''` |
| `inactive-color` / `inactiveColor` | 未激活颜色 | `string` | `''` |

## 类型定义

> 本卡引用的自定义类型展开定义（源自组件 types.ts / 全局 types/global.ts），对象字面量可直接赋值。

| 类型 | 定义 |
| --- | --- |
| `JsonObject` | `Record<string, any>`（普通对象，任意键值、可嵌套；全库统一对象类型，含内联样式） |

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
