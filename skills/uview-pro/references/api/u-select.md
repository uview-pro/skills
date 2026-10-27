<!-- 生成物，勿手改：由 scripts/gen-api-cards.mjs 渲染，改动会在下次再生成时丢失 -->

# u-select API

> 来源：`components/u-select`（uview-pro v0.6.21）
> API 指纹：`sha256:c1fd4fcfca6c1ea56055c74f4b48411d03db548436cba7e47860337340e79fe6`
> 官方文档：https://uviewpro.cn/zh/components/select.html
> 再生成（组件库源码可读时）：`node scripts/gen-api-cards.mjs --lib <uview-pro 路径> --only select`

此选择器用于单列，多列，多列联动的选择场景。(从1.3.0版本起，不建议使用Picker组件的单列和多列模式，Select组件是专门为列选择而构造的组件，更简单易用。)

## 用法示例

```vue
<u-select v-model="show" :list="list"></u-select>
```

## 属性

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `custom-style` / `customStyle` | 自定义根节点样式 | `string \| Record<string, any>` | - |
| `custom-class` / `customClass` | 自定义根节点样式类 | `string` | `''` |
| `list` | 列数据 | `SelectListItem[] \| SelectListItem[][]` | - |
| `border` | 是否显示边框 | `boolean` | `true` |
| `model-value` / `modelValue` | 通过双向绑定控制组件的弹出与收起 | `boolean` | `false` |
| `cancel-color` / `cancelColor` | "取消"按钮的颜色 | `string` | - |
| `confirm-color` / `confirmColor` | "确定"按钮的颜色 | `string` | - |
| `z-index` / `zIndex` | 弹出的z-index值 | `string \| number` | `0` |
| `safe-area-inset-bottom` / `safeAreaInsetBottom` | 是否开启底部安全区适配 | `boolean` | `false` |
| `mask-close-able` / `maskCloseAble` | 是否允许通过点击遮罩关闭Picker | `boolean` | `true` |
| `default-value` / `defaultValue` | 提供的默认选中的下标 | `number[]` | - |
| `preserve-selection` / `preserveSelection` | 是否保留用户上次确认的选择（true：优先使用已保存的选择；false：优先使用外部传入的 defaultValue） | `boolean` | `true` |
| `mode` | 模式选择，single-column-单列，mutil-column-多列，mutil-column-auto-多列联动 | `SelectMode`（`single-column`｜`mutil-column`｜`mutil-column-auto`） | `'single-column'` |
| `value-name` / `valueName` | 自定义value属性名 | `string` | `'value'` |
| `label-name` / `labelName` | 自定义label属性名 | `string` | `'label'` |
| `child-name` / `childName` | 自定义多列联动模式的children属性名 | `string` | `'children'` |
| `title` | 顶部标题 | `string` | `''` |
| `cancel-text` / `cancelText` | 取消按钮的文字 | `string` | `''` |
| `confirm-text` / `confirmText` | 确认按钮的文字 | `string` | `''` |

## 双向绑定（v-model）

| 写法 | 通道 | 说明 |
| --- | --- | --- |
| `v-model` | prop + emit（`update:modelValue`） | `modelValue` 属性，默认 `false` |

## 事件

| 事件 | 回调参数 | 说明 |
| --- | --- | --- |
| `@confirm` | - | 点击确定按钮，返回当前选择的值 |
| `@cancel` | - | 点击取消按钮时触发 |
| `@click` | - | 点击选项时触发，返回选中的选项 |

## 插槽

无插槽。
