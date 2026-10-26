<!-- 生成物，勿手改：由 scripts/gen-api-cards.mjs 渲染，改动会在下次再生成时丢失 -->

# ux-form-item API

> 来源：`components/ux-form-item`（uview-pro-x v1.0.0）
> API 指纹：`sha256:ded84cd82c9c0411410d7f89532aa331a7694818928d48f784274c1fb88652f7`
> 再生成（组件库源码可读时）：`node scripts/gen-api-cards.mjs --lib <uview-pro-x 路径> --only form-item`

此组件一般用于表单场景，可以配置Input输入框，Select弹出框，进行表单验证等。

## 属性

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `custom-style` / `customStyle` | 自定义根节点样式 | `string \| UTSJSONObject` | - |
| `custom-class` / `customClass` | 自定义根节点样式类 | `string` | `''` |
| `label` | input 的 label 提示语 | `string` | `''` |
| `prop` | 绑定的值 | `string` | `''` |
| `border-bottom` / `borderBottom` | 是否显示表单域的下划线边框 | `string \| boolean` | `''` |
| `label-position` / `labelPosition` | label 的位置，left-左边，top-上边 | `string` | `''` |
| `label-width` / `labelWidth` | label 的宽度，单位px | `string \| number` | `''` |
| `label-style` / `labelStyle` | label 的样式，对象形式 | `UTSJSONObject` | - |
| `label-align` / `labelAlign` | label 字体的对齐方式 | `string` | `''` |
| `right-icon` / `rightIcon` | 右侧图标 | `string` | `''` |
| `left-icon` / `leftIcon` | 左侧图标 | `string` | `''` |
| `left-icon-prefix` / `leftIconPrefix` | 左侧图标的自定义前缀 | `string` | `'uicon'` |
| `right-icon-prefix` / `rightIconPrefix` | 右侧图标的自定义前缀 | `string` | `'uicon'` |
| `left-icon-style` / `leftIconStyle` | 左侧图标的样式 | `UTSJSONObject` | - |
| `right-icon-style` / `rightIconStyle` | 右侧图标的样式 | `UTSJSONObject` | - |
| `required` | 是否显示左边的必填星号，只作显示用，具体校验必填的逻辑，请在 rules 中配置（默认false） | `boolean` | `false` |
| `size` | 表单内组件的大小，仅支持预设值 default/small/large | `string` | `''` |

## 双向绑定（v-model）

该组件无双向绑定。

## 事件

无类型化自定义事件（原生事件不受影响，可直接透传监听）。

## 插槽

| 插槽名 | 说明 |
| --- | --- |
| `leftIcon` | 自定义左侧图标 |
| `label` | 自定义 label 内容 |
| `default` | 表单项内容，放置输入类组件（如 ux-input） |
| `rightIcon` | 自定义右侧图标 |
| `right` | 自定义右侧内容 |

## 外部样式类

| 名称 | 说明 |
| --- | --- |
| `custom-class` | 自定义根节点样式类 |

## 命令式方法（通过组件 ref 调用）

| 方法 | 说明 |
| --- | --- |
| `validation` | - |
| `resetField` | - |
| `onFieldBlur` | - |
| `onFieldChange` | - |
