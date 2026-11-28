<!-- 生成物，勿手改：由 scripts/gen-api-cards.mjs 渲染，改动会在下次再生成时丢失 -->

# ux-full-screen API

> 来源：`components/ux-full-screen`（uview-pro-x v2.0.15）
> API 指纹：`sha256:b2a97c879e0ffc781e9352a728cb521e1c4c20c5c56501c1dee8e9769d51fa81`
> 再生成（组件库源码可读时）：`node scripts/gen-api-cards.mjs --lib <uview-pro-x 路径> --only full-screen`

用于 App 弹窗遮盖导航栏和底部 tabbar，提示新版本升级内容；组件挂载后自动弹起，取消与确认均执行返回上一页，标题不传取本地化默认文案

## 属性

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `custom-style` / `customStyle` | 自定义根节点样式 | `string \| JsonObject` | `''` |
| `custom-class` / `customClass` | 自定义根节点样式类 | `string` | `''` |
| `show` | 是否显示弹窗 | `boolean` | `false` |
| `title` | 弹窗标题 | `string` | `''` |
| `content` | 升级内容，支持富文本 | `string` | `''` |

## 类型定义

> 本卡引用的自定义类型展开定义（源自组件 types.ts / 全局 types/global.ts），对象字面量可直接赋值。

| 类型 | 定义 |
| --- | --- |
| `JsonObject` | `Record<string, any>`（普通对象，任意键值、可嵌套；全库统一对象类型，含内联样式） |

## 双向绑定（v-model）

该组件无双向绑定。

> ⚠️ `show` 为单向属性（无 `update:show` 事件），**不支持** `v-model:show`。

## 事件

无类型化自定义事件（原生事件不受影响，可直接透传监听）。

## 插槽

无插槽。

## 外部样式类

| 名称 | 说明 |
| --- | --- |
| `custom-class` | 自定义根节点样式类 |
