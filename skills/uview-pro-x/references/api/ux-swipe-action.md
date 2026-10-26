<!-- 生成物，勿手改：由 scripts/gen-api-cards.mjs 渲染，改动会在下次再生成时丢失 -->

# ux-swipe-action API

> 来源：`components/ux-swipe-action`（uview-pro-x v1.0.0）
> API 指纹：`sha256:c1fbe361a4348bfe230131c9a3049c8b2f12d0f2d74f111577d0f42cfe7fb1a4`
> 再生成（组件库源码可读时）：`node scripts/gen-api-cards.mjs --lib <uview-pro-x 路径> --only swipe-action`

该组件一般用于左滑唤出操作菜单的场景，用的最多的是左滑删除操作

## 属性

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `custom-style` / `customStyle` | 自定义根节点样式，对象形式 | `UTSJSONObject` | - |
| `custom-class` / `customClass` | 自定义根节点样式类 | `string` | `''` |
| `index` | 标识符，点击时候用于区分点击了哪一个 | `number \| string` | `''` |
| `btn-width` / `btnWidth` | 按钮宽度，单位px（默认90） | `number \| string` | `90` |
| `disabled` | 是否禁止滑动（默认false） | `boolean` | `false` |
| `show` | 打开或者关闭组件（默认false） | `boolean` | `false` |
| `bg-color` / `bgColor` | 整个组件背景颜色 | `string` | `''` |
| `vibrate-short` / `vibrateShort` | 是否使手机发生短促震动（默认false） | `boolean` | `false` |
| `options` | 数组形式，可以配置背景颜色和文字 | `SwipeActionOption[]` | - |

## 双向绑定（v-model）

该组件无双向绑定。

> ⚠️ `show` 为单向属性（无 `update:show` 事件），**不支持** `v-model:show`。

## 事件

| 事件 | 回调参数 | 说明 |
| --- | --- | --- |
| `@click` | `index: number \| string, btnIndex: number` | 点击按钮时触发 |
| `@close` | `index: number \| string` | 组件关闭时触发 |
| `@content-click` | `index: number \| string` | 点击内容时触发 |
| `@open` | `index: number \| string` | 组件打开时触发 |

## 插槽

| 插槽名 | 说明 |
| --- | --- |
| `default` | - |

## 外部样式类

| 名称 | 说明 |
| --- | --- |
| `custom-class` | 自定义根节点样式类 |

## 命令式方法（通过组件 ref 调用）

| 方法 | 说明 |
| --- | --- |
| `open` | - |
| `close` | - |
| `isOpen` | - |
