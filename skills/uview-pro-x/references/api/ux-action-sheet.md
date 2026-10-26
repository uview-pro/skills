<!-- 生成物，勿手改：由 scripts/gen-api-cards.mjs 渲染，改动会在下次再生成时丢失 -->

# ux-action-sheet API

> 来源：`components/ux-action-sheet`（uview-pro-x v1.0.0）
> API 指纹：`sha256:dda801ffe9c0a29e48978e1349599dbc6869a66f8e2b5e433187cdd2d6e27d3a`
> 再生成（组件库源码可读时）：`node scripts/gen-api-cards.mjs --lib <uview-pro-x 路径> --only action-sheet`

由 ux-popup 从底部弹出的操作菜单：tips 提示 + list 菜单项 + 取消按钮的组合，list 为空时可改用默认插槽自定义内容；点击菜单项默认自动收起（async-close 为 true 时保持展开，由调用方关闭）

## 属性

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `custom-style` / `customStyle` | 自定义根节点样式，对象形式 | `UTSJSONObject` | - |
| `custom-class` / `customClass` | 自定义根节点样式类 | `string` | `''` |
| `mask-close-able` / `maskCloseAble` | 是否允许点击遮罩关闭，默认 true | `boolean` | `true` |
| `list` | 菜单项数组，每项 { text, subText?, color?, fontSize?, disabled? }，默认 [] | `ActionSheetItem[]` | - |
| `tips` | 顶部提示，{ text, color?, fontSize? }，默认 { text: '', color: '', fontSize: '13px' } | `ActionSheetTips` | - |
| `cancel-btn` / `cancelBtn` | 是否显示取消按钮，默认 true | `boolean` | `true` |
| `safe-area-inset-bottom` / `safeAreaInsetBottom` | 是否开启底部安全区适配，默认 true | `boolean` | `true` |
| `model-value` / `modelValue` | v-model 控制弹出与收起，默认 false | `boolean` | `false` |
| `border-radius` / `borderRadius` | 弹层圆角，单位px，默认 0 | `string \| number` | `0` |
| `z-index` / `zIndex` | 弹出层级，不传时自动取全局 popup 层级，默认 0 | `string \| number` | `0` |
| `cancel-text` / `cancelText` | 取消按钮文字，不传取本地化默认文案 | `string` | `''` |
| `color` | 菜单项文字颜色，不传时取全局主文字色 | `string` | `''` |
| `font-size` / `fontSize` | 菜单项文字大小，单位px，默认 16px | `string \| number` | `'16px'` |
| `async-close` / `asyncClose` | 是否异步关闭，为 true 时点击菜单项后不自动收起，默认 false | `boolean` | `false` |

## 双向绑定（v-model）

| 写法 | 通道 | 说明 |
| --- | --- | --- |
| `v-model` | prop + emit（`update:modelValue`） | `modelValue` 属性，默认 `false` |

## 事件

| 事件 | 回调参数 | 说明 |
| --- | --- | --- |
| `@click` | `index: number` | 点击菜单项时触发，携带 index |
| `@close` | - | 点击取消按钮时触发 |

## 插槽

| 插槽名 | 说明 |
| --- | --- |
| `default` | list 为空时的自定义菜单内容 |

## 外部样式类

| 名称 | 说明 |
| --- | --- |
| `custom-class` | 自定义根节点样式类 |

## 命令式方法（通过组件 ref 调用）

| 方法 | 说明 |
| --- | --- |
| `close` | - |
| `itemClick` | - |
