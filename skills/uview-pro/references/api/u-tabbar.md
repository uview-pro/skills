<!-- 生成物，勿手改：由 scripts/gen-api-cards.mjs 渲染，改动会在下次再生成时丢失 -->

# u-tabbar API

> 来源：`components/u-tabbar`（uview-pro v0.6.21）
> API 指纹：`sha256:40711bfc5cc857f9439bdec1691e1cdf45a3016662ce3435fa0f71a04af52649`
> 官方文档：https://uviewpro.cn/zh/components/tabbar.html
> 再生成（组件库源码可读时）：`node scripts/gen-api-cards.mjs --lib <uview-pro 路径> --only tabbar`

底部导航栏

## 属性

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `custom-style` / `customStyle` | 自定义根节点样式 | `string \| Record<string, any>` | - |
| `custom-class` / `customClass` | 自定义根节点样式类 | `string` | `''` |
| `show` | 是否显示tabbar | `boolean` | `true` |
| `model-value` / `modelValue` | v-model绑定当前激活项的值 | `string \| number` | `0` |
| `bg-color` / `bgColor` | tabbar背景色 | `string` | `'var(--u-bg-white)'` |
| `height` | tabbar高度，单位任意，数值默认rpx | `string \| number` | `'50px'` |
| `icon-size` / `iconSize` | 非凸起图标的大小，单位任意，数值默认rpx | `string \| number` | `40` |
| `mid-button-size` / `midButtonSize` | 凸起图标的大小，单位任意，数值默认rpx | `string \| number` | `100` |
| `text-size` / `textSize` | 文本大小，单位任意，数值默认rpx | `string \| number` | `26` |
| `active-color` / `activeColor` | 激活时的颜色 | `string` | `'var(--u-main-color)'` |
| `inactive-color` / `inactiveColor` | 未激活时的颜色 | `string` | `'var(--u-content-color)'` |
| `mid-button` / `midButton` | 是否显示中部凸起按钮 | `boolean` | `false` |
| `list` | tabbar配置项数组 | `TabbarItem[]` | - |
| `before-switch` / `beforeSwitch` | 切换前回调，返回true或Promise | `((index: number) => boolean \| Promise<any>) \| null` | `null` |
| `border-top` / `borderTop` | 是否显示顶部横线 | `boolean` | `true` |
| `hide-tab-bar` / `hideTabBar` | 是否隐藏原生tabbar | `boolean` | `true` |
| `z-index` / `zIndex` | z-index层级 | `string \| number` | - |
| `gap` | icon和text的间距，单位任意，数值默认rpx | `string \| number` | `8` |

## 双向绑定（v-model）

| 写法 | 通道 | 说明 |
| --- | --- | --- |
| `v-model` | prop + emit（`update:modelValue`） | `modelValue` 属性，默认 `0` |

> ⚠️ `show` 为单向属性（无 `update:show` 事件），**不支持** `v-model:show`；可见性由父组件 `:show` 绑定控制。

## 事件

| 事件 | 回调参数 | 说明 |
| --- | --- | --- |
| `@change` | `index: number` | 点击tab切换选中值时触发，返回切换后的索引 |

## 插槽

无插槽。
