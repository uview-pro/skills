<!-- 生成物，勿手改：由 scripts/gen-api-cards.mjs 渲染，改动会在下次再生成时丢失 -->

# ux-form API

> 来源：`components/ux-form`（uview-pro-x v2.0.14）
> API 指纹：`sha256:98d398b5dcd60a31f7166fd19d74716c503d7eaa81352c6ded8f8854c80a4e50`
> 再生成（组件库源码可读时）：`node scripts/gen-api-cards.mjs --lib <uview-pro-x 路径> --only form`

此组件一般用于表单场景，可以配置Input输入框，Select弹出框，进行表单验证等。

## 属性

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `custom-style` / `customStyle` | 自定义根节点样式 | `string \| JsonObject` | - |
| `custom-class` / `customClass` | 自定义根节点样式类 | `string` | `''` |
| `model` | 当前 form 的需要验证字段的集合 | `JsonObject` | - |
| `rules` | 表单验证规则 | `FormRules` | - |
| `error-type` / `errorType` | 有错误时的提示方式，message-提示信息，toast-弹窗，border-边框变红，border-bottom-下边框变红，none-无提示（默认['message', 'toast']） | `FormErrorType[]` | - |
| `border-bottom` / `borderBottom` | 是否显示表单域的下划线边框（默认true） | `boolean` | `true` |
| `label-position` / `labelPosition` | label 的位置，left-左边，top-上边（默认left） | `FormLabelPosition`（`left`｜`top`） | `'left'` |
| `label-width` / `labelWidth` | label 的宽度，单位px（默认45） | `string \| number` | `45` |
| `label-align` / `labelAlign` | label 字体的对齐方式（默认left） | `string` | `'left'` |
| `label-style` / `labelStyle` | label 的样式，对象形式 | `JsonObject` | - |
| `size` | 表单内组件的大小，仅支持预设值 default/small/large（默认default） | `string` | `'default'` |

## 类型定义

> 本卡引用的自定义类型展开定义（源自组件 types.ts / 全局 types/global.ts），对象字面量可直接赋值。

| 类型 | 定义 |
| --- | --- |
| `FormErrorType` | `'message' \| 'border' \| 'border-bottom' \| 'none' \| 'toast'` |
| `FormLabelPosition` | `'left' \| 'top'` |
| `FormRule` | `{ required?: boolean; message?: string; trigger?: string; min?: number; max?: number; pattern?: RegExp; validator?: (value: any \| null) => boolean \| string; }` |
| `FormRules` | `Map<string, FormRule[]>` |
| `JsonObject` | `Record<string, any>`（普通对象，任意键值、可嵌套；全库统一对象类型，含内联样式） |

## 双向绑定（v-model）

该组件无双向绑定。

## 事件

无类型化自定义事件（原生事件不受影响，可直接透传监听）。

## 插槽

| 插槽名 | 说明 |
| --- | --- |
| `default` | 表单内容，放置 ux-form-item |

## 外部样式类

| 名称 | 说明 |
| --- | --- |
| `custom-class` | 自定义根节点样式类 |

## 命令式方法（通过组件 ref 调用）

| 方法 | 说明 |
| --- | --- |
| `setRules` | - |
| `resetFields` | - |
| `validate` | - |
| `addField` | - |
| `removeField` | - |
| `fields` | - |
| `rules` | - |
