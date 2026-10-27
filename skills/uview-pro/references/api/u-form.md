<!-- 生成物，勿手改：由 scripts/gen-api-cards.mjs 渲染，改动会在下次再生成时丢失 -->

# u-form API

> 来源：`components/u-form`（uview-pro v0.6.21）
> API 指纹：`sha256:4332d944bb3a9741c1b16fe93982ce06b75dd542b850abb72d920f6853ebc804`
> 官方文档：https://uviewpro.cn/zh/components/form.html
> 再生成（组件库源码可读时）：`node scripts/gen-api-cards.mjs --lib <uview-pro 路径> --only form`

此组件一般用于表单场景，可以配置Input输入框，Select弹出框，进行表单验证等。

## 用法示例

```vue
<u-form :model="form" ref="uForm"></u-form>
```

## 属性

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `custom-style` / `customStyle` | 自定义根节点样式 | `string \| Record<string, any>` | - |
| `custom-class` / `customClass` | 自定义根节点样式类 | `string` | `''` |
| `model` | 当前form的需要验证字段的集合 | `Record<string, any>` | - |
| `rules` | 表单验证规则 | `FormRules` | - |
| `error-type` / `errorType` | 有错误时的提示方式，message-提示信息，border-如果input设置了边框，变成呈红色，border-bottom-下边框呈现红色，none-无提示 | `FormErrorType[]` | - |
| `border-bottom` / `borderBottom` | 是否显示表单域的下划线边框 | `boolean` | `true` |
| `label-position` / `labelPosition` | label的位置，left-左边，top-上边 | `InputLabelPosition`（`left`｜`top`） | `'left'` |
| `label-width` / `labelWidth` | label的宽度，单位rpx | `string \| number` | `90` |
| `label-align` / `labelAlign` | label字体的对齐方式 | `InputAlign`（`left`｜`center`｜`right`） | `'left'` |
| `label-style` / `labelStyle` | label的样式，对象形式 | `Record<string, any>` | - |
| `size` | 表单内组件的大小，仅支持预设值 default/small/large（默认 default） | `SizeType`（`default`｜`small`｜`large`） | `'default'` |

## 双向绑定（v-model）

该组件无双向绑定。

## 事件

无类型化自定义事件（原生事件不受影响，可直接透传监听）。

## 插槽

| 插槽名 | 说明 |
| --- | --- |
| `default` | - |

## 命令式方法（通过组件 ref 调用）

| 方法 | 说明 |
| --- | --- |
| `setRules` | - |
| `resetFields` | - |
| `validate` | - |
| `validateField` | - |
| `fields` | - |
| `rules` | - |
| `model` | - |
