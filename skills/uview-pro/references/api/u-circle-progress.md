<!-- 生成物，勿手改：由 scripts/gen-api-cards.mjs 渲染，改动会在下次再生成时丢失 -->

# u-circle-progress API

> 来源：`components/u-circle-progress`（uview-pro v0.6.21）
> API 指纹：`sha256:461f09cdb041e73da251578a3dba11fb10a27e88b0a94cfacb71fe16441dcdeb`
> 官方文档：https://uviewpro.cn/zh/components/circleProgress.html
> 再生成（组件库源码可读时）：`node scripts/gen-api-cards.mjs --lib <uview-pro 路径> --only circle-progress`

展示操作或任务的当前进度，比如上传文件，是一个圆形的进度条。注意：此组件的percent值只能动态增加，不能动态减少。

## 用法示例

```vue
<u-circle-progress active-color="var(--u-type-primary)" :percent="80"></u-circle-progress>
```

## 属性

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `custom-style` / `customStyle` | 自定义根节点样式 | `string \| Record<string, any>` | - |
| `custom-class` / `customClass` | 自定义根节点样式类 | `string` | `''` |
| `percent` | 圆环进度百分比值 | `number` | `0` |
| `inactive-color` / `inactiveColor` | 底部圆环的颜色（灰色的圆环） | `string` | - |
| `active-color` / `activeColor` | 圆环激活部分的颜色 | `string` | `'var(--u-type-success)'` |
| `border-width` / `borderWidth` | 圆环线条的宽度，单位rpx | `number \| string` | `14` |
| `width` | 整个圆形的宽度，单位rpx | `number \| string` | `200` |
| `duration` | 整个圆环执行一圈的时间，单位ms | `number \| string` | `1500` |
| `type` | 主题类型 | `ThemeType`（`primary`｜`info`｜`error`｜`warning`｜`success`｜`default`） | `''` |
| `bg-color` / `bgColor` | 整个圆环进度区域的背景色 | `string` | `'var(--u-bg-white)'` |

## 双向绑定（v-model）

该组件无双向绑定。

## 事件

无类型化自定义事件（原生事件不受影响，可直接透传监听）。

## 插槽

| 插槽名 | 说明 |
| --- | --- |
| `default` | - |
