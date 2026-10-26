<!-- 生成物，勿手改：由 scripts/gen-api-cards.mjs 渲染，改动会在下次再生成时丢失 -->

# ux-notice-bar API

> 来源：`components/ux-notice-bar`（uview-pro-x v1.0.0）
> API 指纹：`sha256:0b7d1741989cb3d0136021c06516c1788a2bc659e8353829916ce56ec5d0d333`
> 再生成（组件库源码可读时）：`node scripts/gen-api-cards.mjs --lib <uview-pro-x 路径> --only notice-bar`

该组件用于滚动通告场景，有多种模式可供选择

## 属性

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `custom-style` / `customStyle` | 自定义根节点样式，对象形式 | `UTSJSONObject` | - |
| `custom-class` / `customClass` | 自定义根节点样式类 | `string` | `''` |
| `list` | 滚动内容，数组形式 | `string[]` | - |
| `type` | 显示的主题（默认warning） | `primary`｜`info`｜`error`｜`warning`｜`success`｜`default`｜`none` | `'warning'` |
| `volume-icon` / `volumeIcon` | 是否显示小喇叭图标（默认true） | `boolean` | `true` |
| `volume-size` / `volumeSize` | 左边喇叭的大小（默认17） | `number \| string` | `17` |
| `more-icon` / `moreIcon` | 是否显示右边的向右箭头（默认false） | `boolean` | `false` |
| `close-icon` / `closeIcon` | 是否显示关闭图标（默认false） | `boolean` | `false` |
| `autoplay` | 是否自动播放（默认true） | `boolean` | `true` |
| `color` | 文字颜色 | `string` | `''` |
| `bg-color` / `bgColor` | 背景颜色 | `string` | `''` |
| `mode` | 滚动模式（默认horizontal） | `Direction`（`horizontal`｜`vertical`） | `'horizontal'` |
| `show` | 是否显示（默认true） | `boolean` | `true` |
| `font-size` / `fontSize` | 字体大小，单位px（默认14） | `number \| string` | `14` |
| `duration` | 滚动周期时长，单位ms（默认1000） | `number \| string` | `2000` |
| `speed` | 水平滚动速度，单位px（默认80） | `number \| string` | `80` |
| `is-circular` / `isCircular` | 是否水平衔接滚动（默认true） | `boolean` | `true` |
| `play-state` / `playState` | 播放状态（默认play） | `PlayState`（`play`｜`paused`） | `'play'` |
| `disable-touch` / `disableTouch` | 是否禁止手动滑动切换（默认true） | `boolean` | `true` |
| `border-radius` / `borderRadius` | 圆角（默认0） | `number \| string` | `0` |
| `padding` | 内边距（默认"9px 12px"） | `number \| string` | `'9px 12px'` |
| `no-list-hidden` / `noListHidden` | 列表为空时是否隐藏（默认true） | `boolean` | `true` |

## 双向绑定（v-model）

该组件无双向绑定。

> ⚠️ `show` 为单向属性（无 `update:show` 事件），**不支持** `v-model:show`。

## 事件

| 事件 | 回调参数 | 说明 |
| --- | --- | --- |
| `@click` | `index: number` | 点击通告文字触发 |
| `@close` | - | 点击关闭图标触发 |
| `@getMore` | - | 点击更多箭头触发 |
| `@end` | - | 播放一个周期时触发 |

## 插槽

无插槽。

## 外部样式类

| 名称 | 说明 |
| --- | --- |
| `custom-class` | 自定义根节点样式类 |
