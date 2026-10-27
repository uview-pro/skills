<!-- 生成物，勿手改：由 scripts/gen-api-cards.mjs 渲染，改动会在下次再生成时丢失 -->

# u-popup API

> 来源：`components/u-popup`（uview-pro v0.6.21）
> API 指纹：`sha256:1a151884122919f423c598d65d6c7c85b0a57f7a07bce4af1b36e9effd7d2503`
> 官方文档：https://uviewpro.cn/zh/components/popup.html
> 再生成（组件库源码可读时）：`node scripts/gen-api-cards.mjs --lib <uview-pro 路径> --only popup`

弹出层容器，用于展示弹窗、信息提示等内容，支持上、下、左、右和中部弹出。组件只提供容器，内部内容由用户自定义

## 用法示例

```vue
<u-popup mode="inline"><view>直接插入页面内容</view></u-popup>
```

## 属性

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `custom-style` / `customStyle` | 自定义根节点样式 | `string \| Record<string, any>` | - |
| `custom-class` / `customClass` | 自定义根节点样式类 | `string` | `''` |
| `show` | 显示状态 | `boolean` | `false` |
| `mode` | 弹出方向，left\|right\|top\|bottom\|center | `PopupMode`（`left`｜`right`｜`top`｜`bottom`｜`center`｜`inline`） | `'left'` |
| `mask` | 是否显示遮罩 | `boolean` | `true` |
| `length` | 抽屉的宽度(mode=left\|right)，或者高度(mode=top\|bottom)，单位rpx，或者"auto"，或者百分比"50%"，表示由内容撑开高度或者宽度 | `number \| string` | `'auto'` |
| `zoom` | 是否开启缩放动画，只在mode=center时有效 | `boolean` | `true` |
| `safe-area-inset-bottom` / `safeAreaInsetBottom` | 是否开启底部安全区适配，开启的话，会在iPhoneX机型底部添加一定的内边距 | `boolean` | `false` |
| `mask-close-able` / `maskCloseAble` | 是否可以通过点击遮罩进行关闭 | `boolean` | `true` |
| `model-value` / `modelValue` | v-model 控制弹窗显示 | `boolean` | `false` |
| `popup` | 内部参数，解决多层调用报错不能修改props值的问题 | `boolean` | `true` |
| `border-radius` / `borderRadius` | 圆角 | `number \| string` | `0` |
| `z-index` / `zIndex` | 弹窗z-index | `number \| string` | - |
| `closeable` | 是否显示关闭图标 | `boolean` | `false` |
| `close-icon` / `closeIcon` | 关闭图标的名称，只能uView的内置图标 | `string` | `'close'` |
| `close-icon-pos` / `closeIconPos` | 自定义关闭图标位置，top-left为左上角，top-right为右上角，bottom-left为左下角，bottom-right为右下角 | `PopupCloseIconPos`（`top-left`｜`top-right`｜`bottom-left`｜`bottom-right`） | `'top-right'` |
| `close-icon-color` / `closeIconColor` | 关闭图标的颜色 | `string` | `'var(--u-tips-color)'` |
| `close-icon-size` / `closeIconSize` | 关闭图标的大小，单位rpx | `number \| string` | `'30'` |
| `width` | 弹窗宽度 | `string` | `''` |
| `height` | 弹窗高度 | `string` | `''` |
| `negative-top` / `negativeTop` | 负top定位，支持rpx/px/百分比 | `number \| string` | `0` |
| `mask-custom-style` / `maskCustomStyle` | 遮罩自定义样式 | `Record<string, any>` | - |
| `duration` | 动画时长，单位ms | `number \| string` | `250` |

## 双向绑定（v-model）

| 写法 | 通道 | 说明 |
| --- | --- | --- |
| `v-model` | prop + emit（`update:modelValue`） | `modelValue` 属性，默认 `false` |

> ⚠️ `show` 为单向属性（无 `update:show` 事件），**不支持** `v-model:show`；可见性由父组件 `:show` 绑定控制。

## 事件

| 事件 | 回调参数 | 说明 |
| --- | --- | --- |
| `@open` | - | 弹出层打开 |
| `@close` | - | 弹出层收起 |

## 插槽

| 插槽名 | 说明 |
| --- | --- |
| `default` | - |
