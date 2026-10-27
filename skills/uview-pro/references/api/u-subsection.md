<!-- 生成物，勿手改：由 scripts/gen-api-cards.mjs 渲染，改动会在下次再生成时丢失 -->

# u-subsection API

> 来源：`components/u-subsection`（uview-pro v0.6.21）
> API 指纹：`sha256:9b77e2340bd22ff617ff8abfa4f49f7356a0f18774008389b52937213232f900`
> 官方文档：https://uviewpro.cn/zh/components/subsection.html
> 再生成（组件库源码可读时）：`node scripts/gen-api-cards.mjs --lib <uview-pro 路径> --only subsection`

该分段器一般用于用户从几个选项中选择某一个的场景

## 用法示例

```vue
<u-subsection active-color="var(--u-type-warning)"></u-subsection>
```

## 属性

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `custom-style` / `customStyle` | 自定义根节点样式 | `string \| Record<string, any>` | - |
| `custom-class` / `customClass` | 自定义根节点样式类 | `string` | `''` |
| `list` | tab的数据 | `Array<string \| SubsectionListItem>` | - |
| `current` | 当前活动的tab的index | `number \| string` | `0` |
| `active-color` / `activeColor` | 激活的颜色 | `string` | `'var(--u-main-color)'` |
| `inactive-color` / `inactiveColor` | 未激活的颜色 | `string` | `'var(--u-content-color)'` |
| `mode` | 模式选择，mode=button为按钮形式，mode=subsection时为分段模式 | `SubsectionMode`（`button`｜`subsection`） | `'button'` |
| `font-size` / `fontSize` | 字体大小，单位rpx | `number \| string` | `28` |
| `animation` | 是否开启动画效果 | `boolean` | `true` |
| `height` | 组件的高度，单位rpx | `number \| string` | `70` |
| `bold` | 激活tab的字体是否加粗 | `boolean` | `true` |
| `bg-color` / `bgColor` | mode=button时，组件背景颜色 | `string` | `'var(--u-divider-color)'` |
| `button-color` / `buttonColor` | mode = button时，滑块背景颜色 | `string` | `'var(--u-bg-white)'` |
| `vibrate-short` / `vibrateShort` | 在切换分段器的时候，是否让设备震一下 | `boolean` | `false` |

## 双向绑定（v-model）

该组件无双向绑定。

## 事件

| 事件 | 回调参数 | 说明 |
| --- | --- | --- |
| `@change` | `index: number` | 分段器选项发生改变时触发 |

## 插槽

无插槽。
