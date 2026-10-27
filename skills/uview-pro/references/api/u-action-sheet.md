<!-- 生成物，勿手改：由 scripts/gen-api-cards.mjs 渲染，改动会在下次再生成时丢失 -->

# u-action-sheet API

> 来源：`components/u-action-sheet`（uview-pro v0.6.21）
> API 指纹：`sha256:04e41f4b49c91c3476c9039e7e1e76332de5bf4f3817d7c497867e0cbd70fd8c`
> 官方文档：https://uviewpro.cn/zh/components/actionSheet.html
> 再生成（组件库源码可读时）：`node scripts/gen-api-cards.mjs --lib <uview-pro 路径> --only action-sheet`

本组件用于从底部弹出一个操作菜单，供用户选择并返回结果。本组件功能类似于uni的uni.showActionSheetAPI，配置更加灵活，所有平台都表现一致。

## 用法示例

```vue
<u-action-sheet :list="list" @click="click" v-model="show"></u-action-sheet>
```

## 属性

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `custom-style` / `customStyle` | 自定义根节点样式 | `string \| Record<string, any>` | - |
| `custom-class` / `customClass` | 自定义根节点样式类 | `string` | `''` |
| `mask-close-able` / `maskCloseAble` | 点击遮罩是否可以关闭actionSheet | `boolean` | `true` |
| `list` | 按钮的文字数组，可以自定义颜色和字体大小，字体单位为rpx | `ActionSheetItem[]` | - |
| `tips` | 顶部的提示文字 | `ActionSheetTips` | - |
| `cancel-btn` / `cancelBtn` | 底部的取消按钮 | `boolean` | `true` |
| `safe-area-inset-bottom` / `safeAreaInsetBottom` | 是否开启底部安全区适配，开启的话，会在iPhoneX机型底部添加一定的内边距 | `boolean` | `false` |
| `model-value` / `modelValue` | 通过双向绑定控制组件的弹出与收起 | `boolean` | `false` |
| `border-radius` / `borderRadius` | 弹出的顶部圆角值 | `string \| number` | `0` |
| `z-index` / `zIndex` | 弹出的z-index值 | `string \| number` | `0` |
| `cancel-text` / `cancelText` | 取消按钮的文字提示 | `string` | `''` |
| `color` | 字体颜色 | `string` | - |
| `font-size` / `fontSize` | 字体大小 | `string \| number` | `'32rpx'` |
| `async-close` / `asyncClose` | 是否异步关闭 | `boolean` | `false` |

## 双向绑定（v-model）

| 写法 | 通道 | 说明 |
| --- | --- | --- |
| `v-model` | prop + emit（`update:modelValue`） | `modelValue` 属性，默认 `false` |

## 事件

| 事件 | 回调参数 | 说明 |
| --- | --- | --- |
| `@click` | - | 点击ActionSheet列表项时触发 |
| `@close` | - | 点击取消按钮时触发 |

## 插槽

| 插槽名 | 说明 |
| --- | --- |
| `default` | - |

## 命令式方法（通过组件 ref 调用）

| 方法 | 说明 |
| --- | --- |
| `close` | - |
| `itemClick` | - |
