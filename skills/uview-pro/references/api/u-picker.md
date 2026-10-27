<!-- 生成物，勿手改：由 scripts/gen-api-cards.mjs 渲染，改动会在下次再生成时丢失 -->

# u-picker API

> 来源：`components/u-picker`（uview-pro v0.6.21）
> API 指纹：`sha256:805bff70f7aaac4751d28d8754f3cfe70acdcf015bcdc9107b7fdc1f38907ab7`
> 官方文档：https://uviewpro.cn/zh/components/picker.html
> 再生成（组件库源码可读时）：`node scripts/gen-api-cards.mjs --lib <uview-pro 路径> --only picker`

此选择器有两种弹出模式：一是时间模式，可以配置年，日，月，时，分，秒参数 二是地区模式，可以配置省，市，区参数

## 用法示例

```vue
<u-picker v-model="show" mode="time"></u-picker>
```

## 属性

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `custom-style` / `customStyle` | 自定义根节点样式 | `string \| Record<string, any>` | - |
| `custom-class` / `customClass` | 自定义根节点样式类 | `string` | `''` |
| `params` | picker中需要显示的参数 | `PickerParams` | - |
| `range` | 当mode=selector或者mode=multiSelector时，提供的数组 | `any[]` | - |
| `default-selector` / `defaultSelector` | 当mode=selector或者mode=multiSelector时，提供的默认选中的下标 | `any[]` | - |
| `preserve-selection` / `preserveSelection` | 是否保留用户上次确认的选择（true：优先使用已保存选择；false：优先使用外部传入的 defaultSelector/defaultTime/defaultRegion） | `boolean` | `true` |
| `range-key` / `rangeKey` | 当 range 是一个 Array&lt;Object&gt; 时，通过 range-key 来指定 Object 中 key 的值作为选择器显示内容 | `string` | `''` |
| `mode` | 模式选择，region-地区类型，time-时间类型，selector-单列模式，multiSelector-多列模式 | `PickerMode`（`region`｜`time`｜`selector`｜`multiSelector`） | `'time'` |
| `start-year` / `startYear` | 年份开始时间 | `number \| string` | `1950` |
| `end-year` / `endYear` | 年份结束时间 | `number \| string` | `2050` |
| `cancel-color` / `cancelColor` | "取消"按钮的颜色 | `string` | - |
| `confirm-color` / `confirmColor` | "确定"按钮的颜色 | `string` | - |
| `default-time` / `defaultTime` | 默认显示的时间，2025-07-02 \|\| 2025-07-02 13:01:00 \|\| 2025/07/02 | `string` | `''` |
| `default-region` / `defaultRegion` | 默认显示的地区，可传类似["河北省", "秦皇岛市", "北戴河区"] | `any[]` | - |
| `show-time-tag` / `showTimeTag` | 时间模式时，是否显示后面的年月日中文提示 | `boolean` | `true` |
| `area-code` / `areaCode` | 默认显示地区的编码，defaultRegion和areaCode同时存在，areaCode优先，可传类似["13", "1303", "130304"] | `any[]` | - |
| `safe-area-inset-bottom` / `safeAreaInsetBottom` | 是否开启底部安全区适配 | `boolean` | `false` |
| `mask-close-able` / `maskCloseAble` | 是否允许通过点击遮罩关闭Picker | `boolean` | `true` |
| `model-value` / `modelValue` | 通过双向绑定控制组件的弹出与收起 | `any` | `false` |
| `z-index` / `zIndex` | 弹出的z-index值 | `number \| string` | - |
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
| `@cancel` | - | 点击取消按钮，返回当前选择的值 |
| `@columnchange` | - | 滚动某一列时触发 |

## 插槽

| 插槽名 | 说明 |
| --- | --- |
| `title` | - |
