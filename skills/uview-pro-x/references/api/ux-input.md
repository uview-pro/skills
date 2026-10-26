<!-- 生成物，勿手改：由 scripts/gen-api-cards.mjs 渲染，改动会在下次再生成时丢失 -->

# ux-input API

> 来源：`components/ux-input`（uview-pro-x v1.0.0）
> API 指纹：`sha256:eb3bf6852930d224c7747af1904e011aa57017bbacdab5f3bd64506536fb7534`
> 再生成（组件库源码可读时）：`node scripts/gen-api-cards.mjs --lib <uview-pro-x 路径> --only input`

此组件为一个输入框，默认没有边框和样式，是专门为配合表单组件ux-form而设计的，利用它可以快速实现表单验证，输入内容，下拉选择等功能。

## 属性

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `custom-style` / `customStyle` | 自定义根节点样式 | `string \| UTSJSONObject` | - |
| `custom-class` / `customClass` | 自定义根节点样式类 | `string` | `''` |
| `model-value` / `modelValue` | 用于双向绑定输入框的值 | `string \| number` | `''` |
| `type` | 输入框的类型，textarea，text，number | `InputType`（`text`｜`number`｜`idcard`｜`digit`｜`password`｜`textarea`｜`phone`｜`url`｜`email`｜`safe-password`｜`name`｜`nickname`｜`bank-card`｜`tel`｜`select`） | `'text'` |
| `input-align` / `inputAlign` | 输入框文字的对齐方式(默认left) | `InputAlign`（`left`｜`center`｜`right`） | `'left'` |
| `size` | 输入框整体尺寸(默认default)，仅支持预设 small/default/large，或空字符串继承表单 size；字号单独用 fontSize 配置 | `default`｜`small`｜`large`｜`''` | `''` |
| `font-size` / `fontSize` | 输入内容的字体大小，如"14px"或14，不传时走 size 预设 | `string \| number` | `''` |
| `placeholder` | placeholder显示值(默认 '请输入内容') | `string` | `''` |
| `disabled` | 是否禁用输入框(默认false) | `boolean` | `false` |
| `readonly` | 是否只读，禁止输入但可点击，样式不变，可触发click事件(默认false) | `boolean` | `false` |
| `maxlength` | 输入框的最大可输入长度(默认140) | `number \| string` | `140` |
| `count` | 是否显示统计字数，仅textarea有效 | `boolean` | `false` |
| `cursor-color` / `cursorColor` | 光标颜色，如"#07c160"，默认跟随系统 | `string` | `''` |
| `placeholder-style` / `placeholderStyle` | placeholder的样式，字符串形式，如"color: red;"(默认空，占位颜色由组件内联 theme 浅色 token 提供) | `string` | `''` |
| `confirm-type` / `confirmType` | 设置键盘右下角按钮的文字，仅在type为text时生效(默认done) | `InputConfirmType`（`send`｜`search`｜`next`｜`go`｜`done`） | `'done'` |
| `fixed` | 如果 textarea 是在一个 position:fixed 的区域，需要显示指定属性 fixed 为 true | `boolean` | `false` |
| `focus` | 是否自动获得焦点(默认false) | `boolean` | `false` |
| `password-icon` / `passwordIcon` | 密码类型时，是否显示右侧的密码图标(默认true) | `boolean` | `true` |
| `border` | 边框形态(默认'none')：'surround'四周边框，'bottom'仅底边框，'none'无边框；true/false 为便捷别名(等价 'surround'/'none') | `boolean \| BorderType` | `'none'` |
| `border-color` / `borderColor` | 输入框的边框颜色(默认var(--u-border-color)) | `string` | `''` |
| `auto-height` / `autoHeight` | 是否自动增高输入区域，type为textarea时有效(默认true) | `boolean` | `true` |
| `select-open` / `selectOpen` | type=select时，旋转右侧的图标，标识当前处于打开还是关闭select的状态 | `boolean` | `false` |
| `height` | 高度，单位px | `number \| string` | `''` |
| `clearable` | 是否可清空(默认true) | `boolean` | `true` |
| `cursor-spacing` / `cursorSpacing` | 指定光标与键盘的距离，单位 px(默认0) | `number \| string` | `0` |
| `selection-start` / `selectionStart` | 光标起始位置，自动聚焦时有效，需与selection-end搭配使用（默认-1） | `number \| string` | `-1` |
| `selection-end` / `selectionEnd` | 光标结束位置，自动聚焦时有效，需与selection-start搭配使用（默认-1） | `number \| string` | `-1` |
| `trim` | 是否自动去除两端的空格(默认true) | `boolean` | `true` |
| `show-confirmbar` / `showConfirmbar` | 是否显示键盘上方带有”完成“按钮那一栏(默认true) | `boolean` | `true` |
| `adjust-position` / `adjustPosition` | 弹出键盘时是否自动调节高度，uni-app默认值是true | `boolean` | `true` |
| `confirm-hold` / `confirmHold` | 点击键盘右下角按钮时是否保持键盘不收起（默认false） | `boolean` | `false` |
| `validate-state` / `validateState` | 输入框的验证状态，用于错误时，边框是否改为红色 | `boolean` | `false` |

## 双向绑定（v-model）

| 写法 | 通道 | 说明 |
| --- | --- | --- |
| `v-model` | prop + emit（`update:modelValue`） | `modelValue` 属性，默认 `''` |

## 事件

| 事件 | 回调参数 | 说明 |
| --- | --- | --- |
| `@input` | `value: string` | 输入内容时触发 |
| `@change` | `value: string` | - |
| `@blur` | `value: string` | 输入框失去焦点时触发 |
| `@focus` | `value: string` | 输入框获得焦点时触发 |
| `@confirm` | `value: string` | 点击完成按钮时触发 |
| `@click` | `event: UniEvent` | 点击输入框时触发 |
| `@clear` | `event: UniEvent` | 点击清空图标时触发 |

## 插槽

| 插槽名 | 说明 |
| --- | --- |
| `prefix` | - |

## 外部样式类

| 名称 | 说明 |
| --- | --- |
| `custom-class` | 自定义根节点样式类 |
