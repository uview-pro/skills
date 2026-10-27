<!-- 生成物，勿手改：由 scripts/gen-api-cards.mjs 渲染，改动会在下次再生成时丢失 -->

# u-switch API

> 来源：`components/u-switch`（uview-pro v0.6.21）
> API 指纹：`sha256:fcaa74375d40f5c16ecda02d2c3bc2460dc7e2b42a49451fb0086cf86357ca04`
> 官方文档：https://uviewpro.cn/zh/components/switch.html
> 再生成（组件库源码可读时）：`node scripts/gen-api-cards.mjs --lib <uview-pro 路径> --only switch`

选择开关一般用于只有两个选择，且只能选其一的场景。

## 用法示例

```vue
<u-switch v-model="checked" active-color="red" inactive-color="var(--u-divider-color)"></u-switch>
```

## 属性

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `custom-style` / `customStyle` | 自定义根节点样式 | `string \| Record<string, any>` | - |
| `custom-class` / `customClass` | 自定义根节点样式类 | `string` | `''` |
| `loading` | 是否显示加载中状态 | `boolean` | `false` |
| `disabled` | 是否禁用 | `boolean` | `false` |
| `size` | 开关尺寸，单位rpx | `number \| string \| SizeType` | `''` |
| `active-color` / `activeColor` | 打开时的颜色 | `string` | `'var(--u-type-primary)'` |
| `inactive-color` / `inactiveColor` | 关闭时的颜色 | `string` | `'var(--u-white-color)'` |
| `model-value` / `modelValue` | v-model 绑定值，开关状态值 | `number \| string \| boolean` | `false` |
| `vibrate-short` / `vibrateShort` | 是否开启轻微震动反馈 | `boolean` | `false` |
| `active-value` / `activeValue` | 打开时的值 | `number \| string \| boolean` | `true` |
| `inactive-value` / `inactiveValue` | 关闭时的值 | `number \| string \| boolean` | `false` |

## 双向绑定（v-model）

| 写法 | 通道 | 说明 |
| --- | --- | --- |
| `v-model` | prop + emit（`update:modelValue`） | `modelValue` 属性，默认 `false` |

## 事件

| 事件 | 回调参数 | 说明 |
| --- | --- | --- |
| `@change` | - | 在switch打开或关闭时触发 |

## 插槽

无插槽。
