<!-- 生成物，勿手改：由 scripts/gen-api-cards.mjs 渲染，改动会在下次再生成时丢失 -->

# ux-search API

> 来源：`components/ux-search`（uview-pro-x v1.0.0）
> API 指纹：`sha256:ebb308f4c18df346c0f0b4de70809875112d801de5bb18050b51387d2644623d`
> 再生成（组件库源码可读时）：`node scripts/gen-api-cards.mjs --lib <uview-pro-x 路径> --only search`

搜索组件，集成了常见搜索框所需功能，用户可以一键引入，开箱即用。

## 属性

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `custom-style` / `customStyle` | 自定义根节点样式 | `string \| UTSJSONObject` | - |
| `custom-class` / `customClass` | 自定义根节点样式类 | `string` | `''` |
| `shape` | 搜索框形状：square-小圆角 4px（默认），round-胶囊；圆角写在内层 contentStyle 上，根节点 custom-style 覆盖不到，当前无直角通道 | `SearchShape`（`square`｜`round`） | `'square'` |
| `bg-color` / `bgColor` | 搜索框背景颜色 | `string` | `''` |
| `border-color` / `borderColor` | 边框颜色，配置了颜色，才会有边框 | `string` | `''` |
| `placeholder` | 占位文字内容 | `string` | `''` |
| `clearabled` | 是否启用清除控件 | `boolean` | `true` |
| `focus` | 是否自动获得焦点 | `boolean` | `false` |
| `show-action` / `showAction` | 是否显示右侧控件 | `boolean` | `true` |
| `action-text` / `actionText` | 右侧控件文字 | `string` | `''` |
| `action-style` / `actionStyle` | 右侧控件的样式，对象形式 | `UTSJSONObject` | - |
| `input-align` / `inputAlign` | 输入框内容水平对齐方式 | `InputAlign`（`left`｜`center`｜`right`） | `'left'` |
| `input-style` / `inputStyle` | 自定义输入框样式，对象形式 | `UTSJSONObject` | - |
| `disabled` | 是否启用输入框 | `boolean` | `false` |
| `animation` | 是否开启动画，见上方说明 | `boolean` | `false` |
| `search-icon-color` / `searchIconColor` | 搜索图标的颜色，默认同输入框字体颜色 | `string` | `''` |
| `color` | 输入框字体颜色 | `string` | `''` |
| `placeholder-color` / `placeholderColor` | placeholder 的颜色 | `string` | `''` |
| `search-icon` / `searchIcon` | 搜索图标，可以为 uView 图标名称或图片路径 | `string` | `'search'` |
| `margin` | 组件与其他上下左右元素之间的距离，带单位的字符串形式，如"15px" | `string` | `'0'` |
| `height` | 输入框高度，单位 px | `string \| number` | `32` |
| `maxlength` | 输入框最大能输入的长度，-1 为不限制长度 | `string \| number` | `-1` |
| `model-value` / `modelValue` | 输入框的初始化内容 | `string` | `''` |
| `adjust-position` / `adjustPosition` | 弹出键盘时是否自动调节高度 | `boolean` | `true` |

## 双向绑定（v-model）

| 写法 | 通道 | 说明 |
| --- | --- | --- |
| `v-model` | prop + emit（`update:modelValue`） | `modelValue` 属性，默认 `''` |

## 事件

| 事件 | 回调参数 | 说明 |
| --- | --- | --- |
| `@input` | `value: string` | 输入框内容发生变化时触发 |
| `@change` | `value: string` | 输入框内容发生变化时触发 |
| `@search` | `value: string` | 用户确定搜索时触发 |
| `@custom` | `value: string` | 用户点击右侧控件时触发 |
| `@clear` | - | 用户点击清除按钮时触发 |
| `@focus` | `value: string` | 输入框获得焦点时触发 |
| `@blur` | `value: string` | 输入框失去焦点时触发 |
| `@click` | - | 点击搜索框时触发（仅disabled=true时） |

## 插槽

无插槽。

## 外部样式类

| 名称 | 说明 |
| --- | --- |
| `custom-class` | 自定义根节点样式类 |

## 命令式方法（通过组件 ref 调用）

| 方法 | 说明 |
| --- | --- |
| `clear` | - |
| `keyword` | - |
| `focused` | - |
