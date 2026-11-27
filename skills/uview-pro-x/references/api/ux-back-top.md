<!-- 生成物，勿手改：由 scripts/gen-api-cards.mjs 渲染，改动会在下次再生成时丢失 -->

# ux-back-top API

> 来源：`components/ux-back-top`（uview-pro-x v2.0.14）
> API 指纹：`sha256:9cb357b89d7f33c62e53e18399883d360dd134e644105861aa8a9229226c8412`
> 再生成（组件库源码可读时）：`node scripts/gen-api-cards.mjs --lib <uview-pro-x 路径> --only back-top`

页面滚动时显示的返回顶部按钮

## 属性

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `custom-style` / `customStyle` | 自定义根节点样式 | `string \| JsonObject` | - |
| `custom-class` / `customClass` | 自定义根节点样式类 | `string` | `''` |
| `shape` | 按钮形状（词表见 global.ts 的 BackTopShape）：square-小圆角(4px，默认) \| circle-正圆；直角请走 custom-style | `BackTopShape`（`square`｜`circle`） | `'square'` |
| `icon` | 自定义图标 | `string` | `'arrow-upward'` |
| `tips` | 提示文字 | `string` | `''` |
| `duration` | 返回顶部滚动时间 | `number \| string` | `100` |
| `scroll-top` / `scrollTop` | 滚动距离 | `number \| string` | `0` |
| `top` | 距离顶部多少距离显示，单位px | `number \| string` | `200` |
| `bottom` | 返回顶部按钮到底部的距离，单位px | `number \| string` | `100` |
| `right` | 返回顶部按钮到右边的距离，单位px | `number \| string` | `20` |
| `parent-id` / `parentId` | App 端 scroll-view 容器的 id，用于容器内返回顶部；缺省时用 uni.pageScrollTo（页面滚动） | `string` | `''` |
| `z-index` / `zIndex` | 层级 | `number \| string` | `'9'` |
| `icon-style` / `iconStyle` | 图标的样式，对象形式 | `JsonObject` | - |

## 类型定义

> 本卡引用的自定义类型展开定义（源自组件 types.ts / 全局 types/global.ts），对象字面量可直接赋值。

| 类型 | 定义 |
| --- | --- |
| `BackTopShape` | `'square' \| 'circle'` |
| `JsonObject` | `Record<string, any>`（普通对象，任意键值、可嵌套；全库统一对象类型，含内联样式） |

## 双向绑定（v-model）

该组件无双向绑定。

## 事件

| 事件 | 回调参数 | 说明 |
| --- | --- | --- |
| `@click` | - | - |

## 插槽

| 插槽名 | 说明 |
| --- | --- |
| `default` | - |

## 外部样式类

| 名称 | 说明 |
| --- | --- |
| `custom-class` | 自定义根节点样式类 |
