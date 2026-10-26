<!-- 生成物，勿手改：由 scripts/gen-api-cards.mjs 渲染，改动会在下次再生成时丢失 -->

# ux-textarea API

> 来源：`components/ux-textarea`（uview-pro-x v1.0.0）
> API 指纹：`sha256:46e7d65d8a9a708939223763db13128aa5c916411d6d52523fe7e7005ea42e29`
> 再生成（组件库源码可读时）：`node scripts/gen-api-cards.mjs --lib <uview-pro-x 路径> --only textarea`

多行文本输入组件，支持字数统计、自动增高、清除按钮，可配合 ux-form 实现表单校验。

## 属性

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `custom-style` / `customStyle` | 自定义根节点样式，对象形式 | `UTSJSONObject` | - |
| `custom-class` / `customClass` | 自定义根节点样式类 | `string` | `''` |
| `model-value` / `modelValue` | 输入值 | `string \| number` | `''` |
| `placeholder` | 占位文字（默认''） | `string \| number` | `''` |
| `placeholder-class` / `placeholderClass` | 占位符类名（默认'input-placeholder'） | `string` | `'input-placeholder'` |
| `placeholder-style` / `placeholderStyle` | 占位符样式 | `string` | `''` |
| `height` | 高度，单位px（默认''，走 size 预设） | `string \| number` | `''` |
| `confirm-type` / `confirmType` | 键盘右下角按钮文字，如 done/search/next（默认done） | `string` | `'done'` |
| `disabled` | 是否禁用（默认false） | `boolean` | `false` |
| `readonly` | 是否只读（默认false） | `boolean` | `false` |
| `count` | 是否显示字数统计（默认false） | `boolean` | `false` |
| `focus` | 是否自动聚焦（默认false） | `boolean` | `false` |
| `auto-height` / `autoHeight` | 是否自动增高（默认false） | `boolean` | `false` |
| `fixed` | 组件在 position:fixed 区域时须指定（默认false） | `boolean` | `false` |
| `cursor-spacing` / `cursorSpacing` | 光标与键盘的距离，单位px（默认0） | `number` | `0` |
| `cursor` | 聚焦时的光标位置（默认空） | `string \| number` | `''` |
| `show-confirm-bar` / `showConfirmBar` | 是否显示键盘上方的「完成」栏（默认true） | `boolean` | `true` |
| `selection-start` / `selectionStart` | 聚焦时光标起始位置（默认-1，即末尾） | `number` | `-1` |
| `selection-end` / `selectionEnd` | 聚焦时光标结束位置（默认-1，即末尾） | `number` | `-1` |
| `adjust-position` / `adjustPosition` | 键盘弹起时是否自动上推页面（默认true） | `boolean` | `true` |
| `disable-default-padding` / `disableDefaultPadding` | 是否去掉 iOS 下的默认内边距（默认false） | `boolean` | `false` |
| `hold-keyboard` / `holdKeyboard` | 聚焦时点击页面是否不收起键盘（默认false） | `boolean` | `false` |
| `confirm-hold` / `confirmHold` | 点击键盘完成按钮时是否保持键盘不收起（默认false） | `boolean` | `false` |
| `maxlength` | 最大可输入长度（默认140） | `string \| number` | `140` |
| `border` | 边框形态(默认'surround')：'surround'四周边框，'bottom'仅底边框，'none'无边框；true/false 为便捷别名(等价 'surround'/'none') | `boolean \| BorderType` | `'surround'` |
| `ignore-composition-event` / `ignoreCompositionEvent` | 是否忽略文本合成系统事件（默认true） | `boolean` | `true` |
| `size` | 尺寸预设，空时继承 ux-form-item 尺寸（默认''） | `SizeType \| string \| number` | `''` |
| `clearable` | 是否显示清除按钮（默认true） | `boolean` | `true` |
| `validate-state` / `validateState` | 是否显示校验错误状态，可被 ux-form-item 覆盖（默认false） | `boolean` | `false` |

## 双向绑定（v-model）

| 写法 | 通道 | 说明 |
| --- | --- | --- |
| `v-model` | prop + emit（`update:modelValue`） | `modelValue` 属性，默认 `''` |

## 事件

| 事件 | 回调参数 | 说明 |
| --- | --- | --- |
| `@focus` | `value: string` | 获得焦点时触发 |
| `@blur` | `value: string` | 失去焦点时触发 |
| `@linechange` | `e: UniTextareaLineChangeEvent` | - |
| `@input` | `value: string` | 输入内容变化时触发 |
| `@confirm` | `value: string` | 点击键盘完成时触发 |
| `@keyboardheightchange` | `e: UniTextareaKeyboardHeightChangeEvent` | - |
| `@change` | `value: string` | 输入内容变化时触发 |
| `@click` | - | 点击时触发 |

## 插槽

无插槽。

## 外部样式类

| 名称 | 说明 |
| --- | --- |
| `custom-class` | 自定义根节点样式类 |
