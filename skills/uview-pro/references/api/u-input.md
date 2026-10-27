<!-- 生成物，勿手改：由 scripts/gen-api-cards.mjs 渲染，改动会在下次再生成时丢失 -->

# u-input API

> 来源：`components/u-input`（uview-pro v0.6.21）
> API 指纹：`sha256:370c76a33eff79e7c43a94baecb73c8c0b92effb023aaac9530abde3d67c2301`
> 官方文档：https://uviewpro.cn/zh/components/input.html
> 再生成（组件库源码可读时）：`node scripts/gen-api-cards.mjs --lib <uview-pro 路径> --only input`

该组件一般用于各类文本输入场景，支持前后图标、清空按钮、密码模式、边框样式、前后插槽等常见能力

## 用法示例

```vue
<u-input v-model="value" placeholder="请输入内容"></u-input>
```

## 属性

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `custom-style` / `customStyle` | 自定义根节点样式 | `string \| Record<string, any>` | - |
| `custom-class` / `customClass` | 自定义根节点样式类 | `string` | `''` |
| `model-value` / `modelValue` | 用于双向绑定输入框的值 | `string \| number` | `''` |
| `type` | 输入框的类型，textarea，text，number | `InputType`（`text`｜`number`｜`idcard`｜`digit`｜`password`｜`textarea`｜`phone`｜`url`｜`email`｜`safe-password`｜`name`｜`nickname`｜`bank-card`｜`tel`｜`select`） | `'text'` |
| `input-align` / `inputAlign` | 输入框文字的对齐方式(默认left) | `InputAlign`（`left`｜`center`｜`right`） | `'left'` |
| `size` | 输入框文字的大小(默认default)，支持 small/default/large 预设值，也支持 16/16px/16rpx 等自定义值 | `SizeType \| string \| number` | `''` |
| `placeholder` | placeholder显示值(默认 '请输入内容') | `string` | `''` |
| `disabled` | 是否禁用输入框(默认false) | `boolean` | `false` |
| `readonly` | 是否只读，禁止输入但可点击，样式不变，可触发click事件(默认false) | `boolean` | `false` |
| `maxlength` | 输入框的最大可输入长度(默认140) | `number \| string` | `140` |
| `count` | 是否显示统计字数，仅textarea有效 | `boolean` | `false` |
| `placeholder-style` / `placeholderStyle` | placeholder的样式，字符串形式，如"color: red;"(默认 "color: var(--u-light-color);") | `string` | `'color: var(--u-light-color);'` |
| `confirm-type` / `confirmType` | 设置键盘右下角按钮的文字，仅在type为text时生效(默认done) | `InputConfirmType`（`send`｜`search`｜`next`｜`go`｜`done`） | `'done'` |
| `fixed` | 如果 textarea 是在一个 position:fixed 的区域，需要显示指定属性 fixed 为 true | `boolean` | `false` |
| `focus` | 是否自动获得焦点(默认false) | `boolean` | `false` |
| `password-icon` / `passwordIcon` | 密码类型时，是否显示右侧的密码图标(默认true) | `boolean` | `true` |
| `border` | input\|textarea是否显示边框(默认false) | `boolean` | `false` |
| `border-color` / `borderColor` | 输入框的边框颜色(默认var(--u-border-color)) | `string` | `'var(--u-border-color)'` |
| `auto-height` / `autoHeight` | 是否自动增高输入区域，type为textarea时有效(默认true) | `boolean` | `true` |
| `select-open` / `selectOpen` | type=select时，旋转右侧的图标，标识当前处于打开还是关闭select的状态 | `boolean` | `false` |
| `height` | 高度，单位rpx | `number \| string` | `''` |
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
| `@input` | - | 输入框内容变化时触发，返回输入框当前的值 |
| `@blur` | - | 输入框失去焦点时触发 |
| `@focus` | - | 输入框获得焦点时触发 |
| `@confirm` | - | 点击输入法右下角确认按钮时触发 |
| `@click` | - | 点击输入框时触发 |
| `@clear` | - | 点击清空按钮时触发 |

## 插槽

| 插槽名 | 说明 |
| --- | --- |
| `prefix` | - |

## 命令式方法（通过组件 ref 调用）

| 方法 | 说明 |
| --- | --- |
| `onFormItemError` | - |
