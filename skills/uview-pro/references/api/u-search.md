<!-- 生成物，勿手改：由 scripts/gen-api-cards.mjs 渲染，改动会在下次再生成时丢失 -->

# u-search API

> 来源：`components/u-search`（uview-pro v0.6.21）
> API 指纹：`sha256:be757e3d0cfe3589218886f9e2e477656a6c9ec0b4b04dbc7e255676b81d5cb8`
> 官方文档：https://uviewpro.cn/zh/components/search.html
> 再生成（组件库源码可读时）：`node scripts/gen-api-cards.mjs --lib <uview-pro 路径> --only search`

搜索组件，集成了常见搜索框所需功能，用户可以一键引入，开箱即用。

## 用法示例

```vue
<u-search placeholder="日照香炉生紫烟" v-model="keyword"></u-search>
```

## 属性

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `custom-style` / `customStyle` | 自定义根节点样式 | `string \| Record<string, any>` | - |
| `custom-class` / `customClass` | 自定义根节点样式类 | `string` | `''` |
| `shape` | 搜索框形状，round-圆形，square-方形 | `SearchShape`（`round`｜`square`） | `'round'` |
| `bg-color` / `bgColor` | 搜索框背景色，默认值var(--u-bg-gray-light) | `string` | `'var(--u-bg-gray-light)'` |
| `placeholder` | 占位提示文字 | `string` | `''` |
| `clearabled` | 是否启用清除控件 | `boolean` | `true` |
| `focus` | 是否自动聚焦 | `boolean` | `false` |
| `show-action` / `showAction` | 是否在搜索框右侧显示取消按钮 | `boolean` | `true` |
| `action-style` / `actionStyle` | 右边控件的样式 | `Record<string, any>` | - |
| `action-text` / `actionText` | 取消按钮文字 | `string` | `''` |
| `input-align` / `inputAlign` | 输入框内容对齐方式，可选值为 left\|center\|right | `InputAlign`（`left`｜`center`｜`right`） | `'left'` |
| `disabled` | 是否启用输入框 | `boolean` | `false` |
| `animation` | 开启showAction时，是否在input获取焦点时才显示 | `boolean` | `false` |
| `border-color` / `borderColor` | 边框颜色，只要配置了颜色，才会有边框 | `string` | `'none'` |
| `model-value` / `modelValue` | 输入框的初始化内容 | `string` | `''` |
| `height` | 搜索框高度，单位rpx | `number \| string` | `64` |
| `input-style` / `inputStyle` | input输入框的样式，可以定义文字颜色，大小等，对象形式 | `Record<string, any>` | - |
| `maxlength` | 输入框最大能输入的长度，-1为不限制长度(来自uniapp文档) | `number \| string` | `'-1'` |
| `search-icon-color` / `searchIconColor` | 搜索图标的颜色，默认同输入框字体颜色 | `string` | `''` |
| `color` | 输入框字体颜色 | `string` | `'var(--u-content-color)'` |
| `placeholder-color` / `placeholderColor` | placeholder的颜色 | `string` | `'var(--u-tips-color)'` |
| `margin` | 组件与其他上下左右元素之间的距离，带单位的字符串形式，如"30rpx"、"30rpx 20rpx"等写法 | `string` | `'0'` |
| `search-icon` / `searchIcon` | 左边输入框的图标，可以为uView图标名称或图片路径 | `string` | `'search'` |
| `adjust-position` / `adjustPosition` | 弹出键盘时是否自动调节高度，uni-app默认值是true | `boolean` | `true` |

## 双向绑定（v-model）

| 写法 | 通道 | 说明 |
| --- | --- | --- |
| `v-model` | prop + emit（`update:modelValue`） | `modelValue` 属性，默认 `''` |

## 事件

| 事件 | 回调参数 | 说明 |
| --- | --- | --- |
| `@input` | - | 输入框输入时触发 |
| `@change` | - | 输入框内容发生变化时触发 |
| `@search` | - | 用户确定搜索时触发，用户按回车键，或者手机键盘右下角的"搜索"键时触发 |
| `@custom` | - | 用户点击右侧控件时触发 |
| `@clear` | - | 用户点击清除按钮时触发 |
| `@focus` | - | 输入框聚焦时触发 |
| `@blur` | - | 输入框失去焦点时触发 |
| `@click` | - | 点击输入框时触发 |

## 插槽

无插槽。
