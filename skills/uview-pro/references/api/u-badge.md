<!-- 生成物，勿手改：由 scripts/gen-api-cards.mjs 渲染，改动会在下次再生成时丢失 -->

# u-badge API

> 来源：`components/u-badge`（uview-pro v0.6.21）
> API 指纹：`sha256:a9d451e11c402344577e3190f4b2efd94245e85e9e99aaf6a05f35bf3782f689`
> 官方文档：https://uviewpro.cn/zh/components/badge.html
> 再生成（组件库源码可读时）：`node scripts/gen-api-cards.mjs --lib <uview-pro 路径> --only badge`

本组件一般用于展示头像的地方，如个人中心，或者评论列表页的用户头像展示等场所。

## 用法示例

```vue
<u-badge type="error" count="7"></u-badge>
```

## 属性

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `custom-style` / `customStyle` | 自定义根节点样式 | `string \| Record<string, any>` | - |
| `custom-class` / `customClass` | 自定义根节点样式类 | `string` | `''` |
| `type` | 使用预设的背景颜色 primary,warning,success,error,info | `ThemeType`（`primary`｜`info`｜`error`｜`warning`｜`success`｜`default`） | `'error'` |
| `size` | Badge的尺寸，default, mini | `BadgeSize`（`default`｜`mini`） | `'default'` |
| `is-dot` / `isDot` | 是否是圆点 | `boolean` | `false` |
| `count` | 显示的数值内容 | `number \| string` | - |
| `overflow-count` / `overflowCount` | 展示封顶的数字值 | `number` | `99` |
| `show-zero` / `showZero` | 当数值为 0 时，是否展示 Badge | `boolean` | `false` |
| `offset` | 位置偏移 [number, number] | `[number, number]` | - |
| `absolute` | 是否开启绝对定位，开启了offset才会起作用 | `boolean` | `true` |
| `font-size` / `fontSize` | 字体大小 | `string \| number` | `'24'` |
| `color` | 字体颜色 | `string` | `'var(--u-white-color)'` |
| `bg-color` / `bgColor` | badge的背景颜色 | `string` | `''` |
| `is-center` / `isCenter` | 是否让badge组件的中心点和父组件右上角重合，配置的话，offset将会失效 | `boolean` | `false` |

## 双向绑定（v-model）

该组件无双向绑定。

## 事件

无类型化自定义事件（原生事件不受影响，可直接透传监听）。

## 插槽

无插槽。
