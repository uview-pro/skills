<!-- 生成物，勿手改：由 scripts/gen-api-cards.mjs 渲染，改动会在下次再生成时丢失 -->

# ux-toast API

> 来源：`components/ux-toast`（uview-pro-x v1.0.0）
> API 指纹：`sha256:132dd4413c406e9a33ce03f17cb22e6ddff77e2ad1af929e4c1e1cdcc166bd64`
> 再生成（组件库源码可读时）：`node scripts/gen-api-cards.mjs --lib <uview-pro-x 路径> --only toast`

此组件表现形式类似uni的uni.showToastAPI，但也有不同的地方。

## 属性

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `custom-style` / `customStyle` | 自定义根节点样式 | `string \| UTSJSONObject` | - |
| `custom-class` / `customClass` | 自定义根节点样式类 | `string` | `''` |
| `z-index` / `zIndex` | 层级 z-index | `string \| number` | `''` |
| `type` | 提示类型，success/warning/error/loading 等 | `primary`｜`info`｜`error`｜`warning`｜`success`｜`default`｜`default` | `'default'` |
| `duration` | 显示时长，单位ms。设为 0 表示不自动关闭，需手动调用 hide/close 方法 | `number` | `2000` |
| `icon` | 是否显示图标 | `boolean` | `true` |
| `position` | 显示位置，center/top/bottom | `ToastPosition`（`top`｜`center`｜`bottom`） | `'center'` |
| `callback` | 关闭时的回调函数 | `() => void` | - |
| `back` | 是否返回上一页 | `boolean` | `false` |
| `is-tab` / `isTab` | 是否为tab页面跳转 | `boolean` | `false` |
| `url` | 跳转的url | `string` | `''` |
| `params` | 跳转参数对象 | `UTSJSONObject` | - |
| `global` | 是否作为全局根部 toast（通常放在 App.vue 中，给 useToast() 使用） | `boolean` | `false` |
| `page` | 是否作为页面级 toast（通常放在页面中，给 useToast({ page: true }) 使用） | `boolean \| string` | `false` |
| `loading` | 是否为loading “常驻” | `boolean` | `false` |

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

## 命令式方法（通过组件 ref 调用）

| 方法 | 说明 |
| --- | --- |
| `show` | - |
| `hide` | - |
| `close` | - |
