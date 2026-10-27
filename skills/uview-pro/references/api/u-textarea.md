<!-- 生成物，勿手改：由 scripts/gen-api-cards.mjs 渲染，改动会在下次再生成时丢失 -->

# u-textarea API

> 来源：`components/u-textarea`（uview-pro v0.6.21）
> API 指纹：`sha256:164581f10ceb400a064867f7d93e9f191c1fb2c99634ba750b5a91488b5c5632`
> 官方文档：https://uviewpro.cn/zh/components/textarea.html
> 再生成（组件库源码可读时）：`node scripts/gen-api-cards.mjs --lib <uview-pro 路径> --only textarea`

文本域此组件满足了可能出现的表单信息补充，编辑等实际逻辑的功能，内置了字数校验等

## 用法示例

```vue
<u-textarea v-model="value1" placeholder="请输入内容" ></u-textarea>
```

## 属性

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `custom-style` / `customStyle` | 自定义根节点样式 | `string \| Record<string, any>` | - |
| `custom-class` / `customClass` | 自定义根节点样式类 | `string` | `''` |
| `model-value` / `modelValue` | 输入框的内容 | `string \| number` | - |
| `placeholder` | 输入框为空时占位符 | `string \| number` | - |
| `placeholder-class` / `placeholderClass` | 指定placeholder的样式类，注意页面或组件的style中写了scoped时，需要在类名前写/deep/ | `string` | - |
| `placeholder-style` / `placeholderStyle` | 指定placeholder的样式 | `string \| Record<string, any>` | - |
| `height` | 输入框高度 | `string \| number` | - |
| `confirm-type` / `confirmType` | 设置键盘右下角按钮的文字，仅微信小程序，App-vue和H5有效 | `string` | - |
| `disabled` | 是否禁用 | `boolean` | - |
| `readonly` | 是否只读，禁止输入但可点击，样式不变，可触发click事件 | `boolean` | `false` |
| `count` | 是否显示统计字数 | `boolean` | - |
| `focus` | 是否自动获取焦点，nvue不支持，H5取决于浏览器的实现 | `boolean` | - |
| `auto-height` / `autoHeight` | 是否自动增加高度 | `boolean` | - |
| `fixed` | 如果textarea是在一个position:fixed的区域，需要显示指定属性fixed为true | `boolean` | - |
| `cursor-spacing` / `cursorSpacing` | 指定光标与键盘的距离 | `number` | - |
| `cursor` | 指定focus时的光标位置 | `string \| number` | - |
| `show-confirm-bar` / `showConfirmBar` | 是否显示键盘上方带有”完成“按钮那一栏， | `boolean` | - |
| `selection-start` / `selectionStart` | 光标起始位置，自动聚焦时有效，需与selection-end搭配使用 | `number` | - |
| `selection-end` / `selectionEnd` | 光标结束位置，自动聚焦时有效，需与selection-start搭配使用 | `number` | - |
| `adjust-position` / `adjustPosition` | 键盘弹起时，是否自动上推页面 | `boolean` | - |
| `disable-default-padding` / `disableDefaultPadding` | 是否去掉 iOS 下的默认内边距，只微信小程序有效 | `boolean` | - |
| `hold-keyboard` / `holdKeyboard` | focus时，点击页面的时候不收起键盘，只微信小程序有效 | `boolean` | - |
| `confirm-hold` / `confirmHold` | 点击完成按钮时是否保持键盘不收起 | `boolean` | - |
| `maxlength` | 最大输入长度，设置为 -1 的时候不限制最大长度 | `string \| number` | - |
| `border` | 边框类型，surround-四周边框，bottom-底部边框 | `TextareaBorder \| boolean` | - |
| `formatter` | 用于处理或者过滤输入框内容的方法 | `((val: any) => any) \| null` | - |
| `ignore-composition-event` / `ignoreCompositionEvent` | 是否忽略组件内对文本合成系统事件的处理 | `boolean` | `true` |
| `size` | 文本域文字大小(默认default)，支持 small/default/large 预设值，也支持 16/16px/16rpx 等自定义值 | `SizeType \| string \| number` | - |
| `clearable` | 是否可清空(默认true) | `boolean` | `true` |
| `validate-state` / `validateState` | 输入框的验证状态，用于错误时，边框是否改为红色 | `boolean` | `false` |

## 双向绑定（v-model）

| 写法 | 通道 | 说明 |
| --- | --- | --- |
| `v-model` | prop + emit（`update:modelValue`） | `modelValue` 属性，默认 `textarea.value` |

## 事件

| 事件 | 回调参数 | 说明 |
| --- | --- | --- |
| `@focus` | - | 输入框聚焦时触发，event.detail = { value, height }，height 为键盘高度 |
| `@blur` | - | 输入框失去焦点时触发，event.detail = {value, cursor} |
| `@linechange` | - | 输入框行数变化时调用，event.detail = {height: 0, heightRpx: 0, lineCount: 0} |
| `@input` | - | 当键盘输入时，触发 input 事件 |
| `@confirm` | - | 点击完成时， 触发 confirm 事件 |
| `@keyboardheightchange` | - | 键盘高度发生变化的时候触发此事件 |
| `@change` | - | 输入框内容发生变化时触发 |
| `@click` | - | 点击输入框时触发 |

## 插槽

无插槽。

## 命令式方法（通过组件 ref 调用）

| 方法 | 说明 |
| --- | --- |
| `onFormItemError` | - |
