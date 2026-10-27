<!-- 生成物，勿手改：由 scripts/gen-api-cards.mjs 渲染，改动会在下次再生成时丢失 -->

# u-dropdown-item API

> 来源：`components/u-dropdown-item`（uview-pro v0.6.21）
> API 指纹：`sha256:7e38fd8b0b9e6ccf76fefed06ddfd6db92bf0f3315f2b9b2231a1ff71fcc2cd7`
> 官方文档：https://uviewpro.cn/zh/components/dropdown.html
> 再生成（组件库源码可读时）：`node scripts/gen-api-cards.mjs --lib <uview-pro 路径> --only dropdown-item`

该组件一般用于向下展开菜单，同时可切换多个选项卡的场景

## 用法示例

```vue
<u-dropdown-item title="标题"></u-dropdown-item>
```

## 属性

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `custom-style` / `customStyle` | 自定义根节点样式 | `string \| Record<string, any>` | - |
| `custom-class` / `customClass` | 自定义根节点样式类 | `string` | `''` |
| `model-value` / `modelValue` | 当前选中项的value值 | `number \| string \| any[]` | `''` |
| `title` | 菜单项标题 | `string \| number` | `''` |
| `options` | 选项数据，如果传入了默认slot，此参数无效 | `OptionType[]` | - |
| `disabled` | 是否禁用此菜单项 | `boolean` | `false` |
| `height` | 下拉弹窗的高度 | `number \| string` | `'auto'` |
| `show` | 控制是否显示菜单项 | `boolean` | `true` |

## 双向绑定（v-model）

| 写法 | 通道 | 说明 |
| --- | --- | --- |
| `v-model` | prop + emit（`update:modelValue`） | `modelValue` 属性，默认 `''` |

> ⚠️ `show` 为单向属性（无 `update:show` 事件），**不支持** `v-model:show`；可见性由父组件 `:show` 绑定控制。

## 事件

| 事件 | 回调参数 | 说明 |
| --- | --- | --- |
| `@change` | - | 选中菜单项后触发 |

## 插槽

| 插槽名 | 说明 |
| --- | --- |
| `default` | - |

## 命令式方法（通过组件 ref 调用）

| 方法 | 说明 |
| --- | --- |
| `cellClick` | - |
| `setActive` | - |
