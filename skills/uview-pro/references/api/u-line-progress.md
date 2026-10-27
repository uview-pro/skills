<!-- 生成物，勿手改：由 scripts/gen-api-cards.mjs 渲染，改动会在下次再生成时丢失 -->

# u-line-progress API

> 来源：`components/u-line-progress`（uview-pro v0.6.21）
> API 指纹：`sha256:805a84759f407ed66f7cd4ca52d11f4eb8fe241455553c1443c938f8d2bc05ba`
> 官方文档：https://uviewpro.cn/zh/components/lineProgress.html
> 再生成（组件库源码可读时）：`node scripts/gen-api-cards.mjs --lib <uview-pro 路径> --only line-progress`

展示操作或任务的当前进度，比如上传文件，是一个线形的进度条。

## 用法示例

```vue
<u-line-progress :percent="70" :show-percent="true"></u-line-progress>
```

## 属性

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `round` | 两端是否显示半圆形 | `boolean` | `true` |
| `type` | 主题颜色 | `string` | `''` |
| `active-color` / `activeColor` | 激活部分的颜色 | `string` | `'var(--u-type-success)'` |
| `inactive-color` / `inactiveColor` | 进度条的底色 | `string` | `'var(--u-divider-color)'` |
| `percent` | 进度百分比，数值 | `number \| string` | `0` |
| `show-percent` / `showPercent` | 是否在进度条内部显示百分比的值 | `boolean` | `true` |
| `height` | 进度条的高度，单位rpx | `number \| string` | `28` |
| `striped` | 是否显示条纹 | `boolean` | `false` |
| `striped-active` / `stripedActive` | 条纹是否显示活动状态 | `boolean` | `false` |

## 双向绑定（v-model）

该组件无双向绑定。

## 事件

无类型化自定义事件（原生事件不受影响，可直接透传监听）。

## 插槽

| 插槽名 | 说明 |
| --- | --- |
| `default` | - |
