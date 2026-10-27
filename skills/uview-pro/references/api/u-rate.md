<!-- 生成物，勿手改：由 scripts/gen-api-cards.mjs 渲染，改动会在下次再生成时丢失 -->

# u-rate API

> 来源：`components/u-rate`（uview-pro v0.6.21）
> API 指纹：`sha256:4d1e23ee2e22ce540976b0262bac4883bf52d541a8e79433fec79a5e23bde15b`
> 官方文档：https://uviewpro.cn/zh/components/rate.html
> 再生成（组件库源码可读时）：`node scripts/gen-api-cards.mjs --lib <uview-pro 路径> --only rate`

该组件一般用于满意度调查，星型评分的场景

## 用法示例

```vue
<u-rate :count="count" :current="2"></u-rate>
```

## 属性

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `custom-style` / `customStyle` | 自定义根节点样式 | `string \| Record<string, any>` | - |
| `custom-class` / `customClass` | 自定义根节点样式类 | `string` | `''` |
| `model-value` / `modelValue` | v-model双向绑定选中的星星数量 | `number \| string` | `-1` |
| `count` | 要显示的星星数量 | `number \| string` | `5` |
| `current` | 当前需要默认选中的星星(选中的个数) | `number \| string` | `0` |
| `disabled` | 是否不可选中 | `boolean` | `false` |
| `size` | 星星的大小，单位rpx | `number \| string` | `32` |
| `inactive-color` / `inactiveColor` | 未选中时的颜色 | `string` | `'var(--u-light-color)'` |
| `active-color` / `activeColor` | 选中的颜色 | `string` | `'var(--u-type-error)'` |
| `gutter` | 星星之间的间距，单位rpx | `number \| string` | `10` |
| `min-count` / `minCount` | 最少能选择的星星个数 | `number \| string` | `0` |
| `allow-half` / `allowHalf` | 是否允许半星 | `boolean` | `false` |
| `active-icon` / `activeIcon` | 选中时的图标(星星) | `string` | `'star-fill'` |
| `inactive-icon` / `inactiveIcon` | 未选中时的图标(星星) | `string` | `'star'` |
| `custom-prefix` / `customPrefix` | 自定义扩展前缀，方便用户扩展自己的图标库 | `string` | `'uicon'` |
| `colors` | 分段颜色 | `string[]` | - |
| `icons` | 分段图标 | `string[]` | - |

## 双向绑定（v-model）

| 写法 | 通道 | 说明 |
| --- | --- | --- |
| `v-model` | prop + emit（`update:modelValue`） | `modelValue` 属性，默认 `-1` |

## 事件

| 事件 | 回调参数 | 说明 |
| --- | --- | --- |
| `@change` | - | 选中的星星发生变化时触发 |

## 插槽

无插槽。
