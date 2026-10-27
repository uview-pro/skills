<!-- 生成物，勿手改：由 scripts/gen-api-cards.mjs 渲染，改动会在下次再生成时丢失 -->

# u-form-item API

> 来源：`components/u-form-item`（uview-pro v0.6.21）
> API 指纹：`sha256:bc391f5ecb5aa9fc34283943e389ffd36192efd36c56caef66a8d14098ccf873`
> 官方文档：https://uviewpro.cn/zh/components/form.html
> 再生成（组件库源码可读时）：`node scripts/gen-api-cards.mjs --lib <uview-pro 路径> --only form-item`

此组件一般用于表单场景，可以配置Input输入框，Select弹出框，进行表单验证等。

## 用法示例

```vue
<u-form-item label="姓名"><u-input v-model="form.name" /></u-form-item>
```

## 属性

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `custom-style` / `customStyle` | 自定义根节点样式 | `string \| Record<string, any>` | - |
| `custom-class` / `customClass` | 自定义根节点样式类 | `string` | `''` |
| `label` | input的label提示语 | `string` | `''` |
| `prop` | 绑定的值 | `string` | `''` |
| `border-bottom` / `borderBottom` | 是否显示表单域的下划线边框 | `string \| boolean` | `''` |
| `label-position` / `labelPosition` | label的位置，left-左边，top-上边 | `InputLabelPosition`（`left`｜`top`） | `''` |
| `label-width` / `labelWidth` | label的宽度，单位rpx | `string \| number` | `''` |
| `label-style` / `labelStyle` | label的样式，对象形式 | `Record<string, any>` | - |
| `label-align` / `labelAlign` | label字体的对齐方式 | `InputAlign`（`left`｜`center`｜`right`） | `''` |
| `right-icon` / `rightIcon` | 右侧图标 | `string` | `''` |
| `left-icon` / `leftIcon` | 左侧图标 | `string` | `''` |
| `left-icon-prefix` / `leftIconPrefix` | 左侧图标的自定义前缀 | `string` | `'uicon'` |
| `right-icon-prefix` / `rightIconPrefix` | 右侧图标的自定义前缀 | `string` | `'uicon'` |
| `left-icon-style` / `leftIconStyle` | 左侧图标的样式 | `Record<string, any>` | - |
| `right-icon-style` / `rightIconStyle` | 右侧图标的样式 | `Record<string, any>` | - |
| `required` | 是否显示左边的必填星号，只作显示用，具体校验必填的逻辑，请在rules中配置 | `boolean` | `false` |
| `size` | 表单内组件的大小，仅支持预设值 default/small/large | `SizeType \| string` | `''` |

## 双向绑定（v-model）

该组件无双向绑定。

## 事件

无类型化自定义事件（原生事件不受影响，可直接透传监听）。

## 插槽

| 插槽名 | 说明 |
| --- | --- |
| `leftIcon` | - |
| `label` | - |
| `default` | - |
| `rightIcon` | - |
| `right` | - |

## 命令式方法（通过组件 ref 调用）

| 方法 | 说明 |
| --- | --- |
| `validation` | - |
| `resetField` | - |
| `onFormBlur` | - |
| `onFormChange` | - |
