<!-- 生成物，勿手改：由 scripts/gen-api-cards.mjs 渲染，改动会在下次再生成时丢失 -->

# u-field API

> 来源：`components/u-field`（uview-pro v0.6.21）
> API 指纹：`sha256:a3b828cdd41635fb6d817242948ce707074843a75fb9b82cc9fe920574f74280`
> 官方文档：https://uviewpro.cn/zh/components/field.html
> 再生成（组件库源码可读时）：`node scripts/gen-api-cards.mjs --lib <uview-pro 路径> --only field`

借助此组件，可以实现表单的输入，有"text"和"textarea"类型的，此外，借助uView的picker和actionSheet组件可以快速实现上拉菜单，时间，地区选择等，为表单解决方案的利器。

## 用法示例

```vue
<u-field v-model="mobile" label="手机号" required :error-message="errorMessage"></u-field>
```

## 属性

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `custom-style` / `customStyle` | 自定义根节点样式 | `string \| Record<string, any>` | - |
| `custom-class` / `customClass` | 自定义根节点样式类 | `string` | `''` |
| `icon` | label左边的图标，限uView的图标名称 | `string` | `''` |
| `right-icon` / `rightIcon` | 输入框右边的图标名称，限uView的图标名称（默认false） | `string` | `''` |
| `arrow-direction` / `arrowDirection` | 方向属性 | `string` | `'right'` |
| `required` | 是否必填，左边显示红色"*"号（默认false） | `boolean` | `false` |
| `label` | 输入框左边的文字提示 | `string` | `''` |
| `password` | 是否密码输入方式(用点替换文字)，type为text时有效（默认false） | `boolean` | `false` |
| `clearable` | 是否显示右侧清空内容的图标控件（默认true） | `boolean` | `true` |
| `label-width` / `labelWidth` | label的宽度，单位rpx（默认130） | `string \| number` | `130` |
| `label-align` / `labelAlign` | label的文字对齐方式（默认left） | `InputAlign`（`left`｜`center`｜`right`） | `'left'` |
| `input-align` / `inputAlign` | 输入框内容对齐方式（默认left） | `InputAlign`（`left`｜`center`｜`right`） | `'left'` |
| `icon-color` / `iconColor` | 左边通过icon配置的图标的颜色（默认var(--u-content-color)） | `string` | `'var(--u-content-color)'` |
| `auto-height` / `autoHeight` | 是否自动增高输入区域，type为textarea时有效（默认true） | `boolean` | `true` |
| `error-message` / `errorMessage` | 显示的错误提示内容，如果为空字符串或者false，则不显示错误信息 | `string \| boolean` | `''` |
| `placeholder` | 输入框的提示文字 | `string` | `''` |
| `placeholder-style` / `placeholderStyle` | placeholder的样式(内联样式，字符串)，如"color: var(--u-divider-color)" | `string` | `''` |
| `focus` | 是否自动获得焦点（默认false） | `boolean` | `false` |
| `fixed` | 如果type为textarea，且在一个"position:fixed"的区域，需要指明为true（默认false） | `boolean` | `false` |
| `model-value` / `modelValue` | 输入框绑定值 | `number \| string` | - |
| `type` | 输入框类型（text/textarea/password等，默认text） | `InputType`（`text`｜`number`｜`idcard`｜`digit`｜`password`｜`textarea`｜`phone`｜`url`｜`email`｜`safe-password`｜`name`｜`nickname`｜`bank-card`｜`tel`｜`select`） | `'text'` |
| `disabled` | 是否不可输入（默认false） | `boolean` | `false` |
| `readonly` | 是否只读，禁止输入但可点击，样式不变，可触发click事件（默认false） | `boolean` | `false` |
| `maxlength` | 最大输入长度，设置为 -1 的时候不限制最大长度（默认140） | `string \| number` | `140` |
| `confirm-type` / `confirmType` | 设置键盘右下角按钮的文字，仅在type="text"时生效（默认done） | `InputConfirmType`（`send`｜`search`｜`next`｜`go`｜`done`） | `'done'` |
| `label-position` / `labelPosition` | label位置（默认left）left-左边，top-上边 | `InputLabelPosition`（`left`｜`top`） | `'left'` |
| `field-style` / `fieldStyle` | 自定义输入框的样式，对象形式 | `Record<string, any>` | - |
| `clear-size` / `clearSize` | 清除图标的大小，单位rpx（默认30） | `string \| number` | `30` |
| `icon-style` / `iconStyle` | 左侧图标样式 | `Record<string, any>` | - |
| `border-top` / `borderTop` | 是否显示field的上边框（默认false） | `boolean` | `false` |
| `border-bottom` / `borderBottom` | 是否显示field的下边框（默认true） | `boolean` | `true` |
| `trim` | 是否自动去除输入内容首尾空格（默认true） | `boolean` | `true` |

## 双向绑定（v-model）

| 写法 | 通道 | 说明 |
| --- | --- | --- |
| `v-model` | prop + emit（`update:modelValue`） | `modelValue` 属性，默认 - |

## 事件

| 事件 | 回调参数 | 说明 |
| --- | --- | --- |
| `@input` | - | 输入框内容发生变化时触发 |
| `@focus` | - | 输入框获得焦点时触发 |
| `@blur` | - | 输入框失去焦点时触发 |
| `@confirm` | - | 点击完成按钮时触发 |
| `@right-icon-click` | - | 通过right-icon生成的图标被点击时触发 |
| `@click` | - | 输入框被点击或者通过right-icon生成的图标被点击时触发，这样设计是考虑到传递右边的图标，一般都为需要弹出"picker"等操作时的场景，点击倒三角图标，理应发出此事件，见上方说明 |

## 插槽

| 插槽名 | 说明 |
| --- | --- |
| `icon` | - |
| `right` | - |
