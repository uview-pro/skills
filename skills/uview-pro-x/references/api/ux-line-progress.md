<!-- 生成物，勿手改：由 scripts/gen-api-cards.mjs 渲染，改动会在下次再生成时丢失 -->

# ux-line-progress API

> 来源：`components/ux-line-progress`（uview-pro-x v1.0.0）
> API 指纹：`sha256:b68936f1d7b7e51c13d3b3e2cbfb25d2f4146670f2a07928e6a1969ba0b458f2`
> 再生成（组件库源码可读时）：`node scripts/gen-api-cards.mjs --lib <uview-pro-x 路径> --only line-progress`

展示操作或任务的当前进度，比如上传文件，是一个线形的进度条。

## 属性

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `custom-style` / `customStyle` | 自定义根节点样式 | `string \| UTSJSONObject` | - |
| `custom-class` / `customClass` | 自定义根节点样式类 | `string` | `''` |
| `shape` | 进度条形状：round-两端胶囊（默认，等价旧 boolean round: true），square-小圆角 3px（平头）；方角请走 custom-style | `square`｜`round` | `'round'` |
| `type` | 主题颜色，primary\|success\|warning\|error\|info，设置后 activeColor 失效 | `string` | `''` |
| `active-color` / `activeColor` | 激活部分的颜色 | `string` | `''` |
| `inactive-color` / `inactiveColor` | 进度条的底色 | `string` | `''` |
| `percent` | 进度百分比，0-100 | `number \| string` | `0` |
| `show-percent` / `showPercent` | 是否在进度条内部显示百分比值 | `boolean` | `true` |
| `height` | 进度条的高度，单位px | `number \| string` | `DEFAULT_HEIGHT` |
| `striped` | 是否显示条纹 | `boolean` | `false` |
| `striped-active` / `stripedActive` | 条纹是否具有动态效果 | `boolean` | `false` |

## 双向绑定（v-model）

该组件无双向绑定。

## 事件

无类型化自定义事件（原生事件不受影响，可直接透传监听）。

## 插槽

| 插槽名 | 说明 |
| --- | --- |
| `default` | - |

## 外部样式类

| 名称 | 说明 |
| --- | --- |
| `custom-class` | 自定义根节点样式类 |
