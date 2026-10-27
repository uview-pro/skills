<!-- 生成物，勿手改：由 scripts/gen-api-cards.mjs 渲染，改动会在下次再生成时丢失 -->

# u-notice-bar API

> 来源：`components/u-notice-bar`（uview-pro v0.6.21）
> API 指纹：`sha256:5e120bdbdddb34b1cb4691ce80f3ed039a4e6e173baeb79a0d372fc6dcbdf04d`
> 官方文档：https://uviewpro.cn/zh/components/noticeBar.html
> 再生成（组件库源码可读时）：`node scripts/gen-api-cards.mjs --lib <uview-pro 路径> --only notice-bar`

该组件用于滚动通告场景，有多种模式可供选择

## 用法示例

```vue
<u-notice-bar :more-icon="true" :list="list"></u-notice-bar>
```

## 属性

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `list` | 滚动内容，数组形式 | `string[]` | - |
| `type` | 显示的主题，success\|error\|primary\|info\|warning | `ThemeType`（`primary`｜`info`｜`error`｜`warning`｜`success`｜`default`） | `'warning'` |
| `volume-icon` / `volumeIcon` | 是否显示左侧的音量图标 | `boolean` | `true` |
| `volume-size` / `volumeSize` | 音量喇叭的大小 | `number \| string` | `34` |
| `more-icon` / `moreIcon` | 是否显示右侧的右箭头图标 | `boolean` | `false` |
| `close-icon` / `closeIcon` | 是否显示右侧的关闭图标 | `boolean` | `false` |
| `autoplay` | 是否自动播放 | `boolean` | `true` |
| `color` | 文字颜色，各图标也会使用文字颜色 | `string` | `''` |
| `bg-color` / `bgColor` | 背景颜色 | `string` | `''` |
| `mode` | 滚动方向，horizontal-水平滚动，vertical-垂直滚动 | `Direction`（`horizontal`｜`vertical`） | `'horizontal'` |
| `show` | 是否显示 | `boolean` | `true` |
| `font-size` / `fontSize` | 字体大小，单位rpx | `number \| string` | `28` |
| `duration` | 滚动一个周期的时间长，单位ms | `number \| string` | `2000` |
| `speed` | 水平滚动时的滚动速度，即每秒滚动多少rpx | `number \| string` | `160` |
| `is-circular` / `isCircular` | 水平滚动时，是否采用衔接形式滚动 | `boolean` | `true` |
| `play-state` / `playState` | 播放状态，play-播放，paused-暂停 | `PlayState`（`play`｜`paused`） | `'play'` |
| `disable-touch` / `disableTouch` | 是否禁止用手滑动切换 | `boolean` | `true` |
| `border-radius` / `borderRadius` | 滚动通知设置圆角 | `number \| string` | `0` |
| `padding` | 通知的边距 | `number \| string` | `'18rpx 24rpx'` |
| `no-list-hidden` / `noListHidden` | list列表为空时，是否显示组件 | `boolean` | `true` |

## 双向绑定（v-model）

该组件无双向绑定。

> ⚠️ `show` 为单向属性（无 `update:show` 事件），**不支持** `v-model:show`；可见性由父组件 `:show` 绑定控制。

## 事件

| 事件 | 回调参数 | 说明 |
| --- | --- | --- |
| `@click` | `index: number \| undefined` | 点击通告文字触发，只有mode = vertical，或者mode = horizontal且isCircular = false时有效 |
| `@close` | - | 点击右侧关闭图标触发 |
| `@getMore` | - | 点击右侧向右图标触发 |
| `@end` | - | 列表的消息每次被播放一个周期时触发，只有mode = vertical，或者mode = horizontal且isCircular = false时有效 |

## 插槽

无插槽。
