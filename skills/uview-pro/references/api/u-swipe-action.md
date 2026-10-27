<!-- 生成物，勿手改：由 scripts/gen-api-cards.mjs 渲染，改动会在下次再生成时丢失 -->

# u-swipe-action API

> 来源：`components/u-swipe-action`（uview-pro v0.6.21）
> API 指纹：`sha256:44bcfe1edbcd234ef79577e8d07f179f9e2f3d6a8a6c0d6f55271b1f8b9fc354`
> 官方文档：https://uviewpro.cn/zh/components/swipeAction.html
> 再生成（组件库源码可读时）：`node scripts/gen-api-cards.mjs --lib <uview-pro 路径> --only swipe-action`

该组件一般用于左滑唤出操作菜单的场景，用的最多的是左滑删除操作。

## 用法示例

```vue
<u-swipe-action btn-text="收藏">...</u-swipe-action>
```

## 属性

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `custom-style` / `customStyle` | 自定义根节点样式 | `string \| Record<string, any>` | - |
| `custom-class` / `customClass` | 自定义根节点样式类 | `string` | `''` |
| `index` | index值，用于得知点击删除的是哪个按钮 | `string \| number` | `''` |
| `btn-width` / `btnWidth` | 滑动按钮的宽度，单位为rpx | `string \| number` | `180` |
| `disabled` | 是否禁止某个action滑动 | `boolean` | `false` |
| `show` | 打开或者关闭组件 | `boolean` | `false` |
| `bg-color` / `bgColor` | 组件背景颜色 | `string` | `'var(--u-bg-white)'` |
| `vibrate-short` / `vibrateShort` | 是否使手机发生短促震动，目前只在iOS的微信小程序有效(2020-05-06) | `boolean` | `false` |
| `options` | 按钮操作参数 | `SwipeActionOption[]` | - |

## 双向绑定（v-model）

该组件无双向绑定。

> ⚠️ `show` 为单向属性（无 `update:show` 事件），**不支持** `v-model:show`；可见性由父组件 `:show` 绑定控制。

## 事件

| 事件 | 回调参数 | 说明 |
| --- | --- | --- |
| `@click` | - | 点击组件时触发 |
| `@close` | - | 组件触发关闭状态时 |
| `@content-click` | - | 点击内容时触发 |
| `@open` | - | 组件触发打开状态时 |

## 插槽

| 插槽名 | 说明 |
| --- | --- |
| `default` | - |
