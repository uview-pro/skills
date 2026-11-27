<!-- 生成物，勿手改：由 scripts/gen-api-cards.mjs 渲染，改动会在下次再生成时丢失 -->

# ux-divider API

> 来源：`components/ux-divider`（uview-pro-x v2.0.14）
> API 指纹：`sha256:e435fcf3a996339c301711cfdece935ee462ea4ab137b9c8aa1dc55ebe919f4c`
> 再生成（组件库源码可读时）：`node scripts/gen-api-cards.mjs --lib <uview-pro-x 路径> --only divider`

区隔内容的分割线，一般用于页面底部"没有更多"的提示。

## 属性

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `custom-style` / `customStyle` | 自定义根节点样式 | `string \| JsonObject` | - |
| `custom-class` / `customClass` | 自定义根节点样式类 | `string` | `''` |
| `half-width` / `halfWidth` | 单一边divider横线的宽度(数值)，单位px。或者百分比 | `string \| number` | `75` |
| `border-color` / `borderColor` | divider横线的颜色，如设置，优先级高于type | `string` | `''` |
| `type` | 主题色，可以是primary\|info\|success\|warning\|error之一值 | `string` | `'primary'` |
| `color` | 文字颜色 | `string` | `''` |
| `font-size` / `fontSize` | 文字大小，单位px | `string \| number` | `DEFAULT_FONT_SIZE` |
| `bg-color` / `bgColor` | 整个divider的背景颜色 | `string` | `''` |
| `height` | 整个divider的高度，单位px | `string \| number` | `'auto'` |
| `margin-top` / `marginTop` | 上边距 | `string \| number` | `0` |
| `margin-bottom` / `marginBottom` | 下边距 | `string \| number` | `0` |
| `use-slot` / `useSlot` | 是否使用slot传入内容，如果不用slot传入内容，中间就不会有空隙 | `boolean` | `true` |

## 类型定义

> 本卡引用的自定义类型展开定义（源自组件 types.ts / 全局 types/global.ts），对象字面量可直接赋值。

| 类型 | 定义 |
| --- | --- |
| `JsonObject` | `Record<string, any>`（普通对象，任意键值、可嵌套；全库统一对象类型，含内联样式） |

## 双向绑定（v-model）

该组件无双向绑定。

## 事件

| 事件 | 回调参数 | 说明 |
| --- | --- | --- |
| `@click` | - | divider组件被点击时触发 |

## 插槽

| 插槽名 | 说明 |
| --- | --- |
| `default` | - |

## 外部样式类

| 名称 | 说明 |
| --- | --- |
| `custom-class` | 自定义根节点样式类 |
