<!-- 生成物，勿手改：由 scripts/gen-api-cards.mjs 渲染，改动会在下次再生成时丢失 -->

# u-city-select API

> 来源：`components/u-city-select`（uview-pro v0.6.21）
> API 指纹：`sha256:53d19c5afdd7c87ad4dff3ee14b9549e7e7091b9f82fd5379b440c45bc16626e`
> 再生成（组件库源码可读时）：`node scripts/gen-api-cards.mjs --lib <uview-pro 路径> --only city-select`

用于选择省、市、区三级行政区域，支持回显和自定义初始值。

## 用法示例

```vue
<u-city-select v-model="show" :defaultRegion="['山东省', '青岛市', '崂山区']" @city-change="onChange"></u-city-select>
```

## 属性

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `custom-style` / `customStyle` | 自定义根节点样式 | `string \| Record<string, any>` | - |
| `custom-class` / `customClass` | 自定义根节点样式类 | `string` | `''` |
| `model-value` / `modelValue` | 控制弹窗显示与隐藏（v-model） | `boolean` | `false` |
| `default-region` / `defaultRegion` | 默认选中的省市区名称数组 | `string[]` | - |
| `area-code` / `areaCode` | 默认选中的省市区编码数组 | `string[]` | - |
| `mask-close-able` / `maskCloseAble` | 是否允许点击遮罩关闭弹窗 | `boolean` | `true` |
| `z-index` / `zIndex` | 弹窗层级 | `string \| number` | `0` |

## 双向绑定（v-model）

| 写法 | 通道 | 说明 |
| --- | --- | --- |
| `v-model` | prop + emit（`update:modelValue`） | `modelValue` 属性，默认 `false` |

## 事件

| 事件 | 回调参数 | 说明 |
| --- | --- | --- |
| `@city-change` | - | 选择省市区后触发，返回选中的省市区对象 |

## 插槽

无插槽。
