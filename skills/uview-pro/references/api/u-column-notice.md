<!-- 生成物，勿手改：由 scripts/gen-api-cards.mjs 渲染，改动会在下次再生成时丢失 -->

# u-column-notice API

> 来源：`components/u-column-notice`（uview-pro v0.6.21）
> API 指纹：`sha256:8b960632935baac7f91a69b3e44c0d2a8f403785beb1a8863c90717b42271154`
> 再生成（组件库源码可读时）：`node scripts/gen-api-cards.mjs --lib <uview-pro 路径> --only column-notice`

通告栏

## 属性

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `custom-style` / `customStyle` | 自定义根节点样式 | `string \| Record<string, any>` | - |
| `custom-class` / `customClass` | 自定义根节点样式类 | `string` | `''` |
| `list` | 显示的内容，数组 | `string[]` | - |
| `type` | 显示的主题，success\|error\|primary\|info\|warning | `primary`｜`info`｜`error`｜`warning`｜`success`｜`default`｜`none` | `'warning'` |
| `volume-icon` / `volumeIcon` | 是否显示左侧的音量图标 | `boolean` | `true` |
| `more-icon` / `moreIcon` | 是否显示右侧的右箭头图标 | `boolean` | `false` |
| `close-icon` / `closeIcon` | 是否显示右侧的关闭图标 | `boolean` | `false` |
| `autoplay` | 是否自动播放 | `boolean` | `true` |
| `color` | 文字颜色，各图标也会使用文字颜色 | `string` | `''` |
| `bg-color` / `bgColor` | 背景颜色 | `string` | `''` |
| `direction` | 滚动方向，row-水平滚动，column-垂直滚动 | `ScrollDirection`（`row`｜`column`） | `'row'` |
| `show` | 是否显示 | `boolean` | `true` |
| `font-size` / `fontSize` | 字体大小，单位rpx | `number \| string` | `26` |
| `duration` | 滚动一个周期的时间长，单位ms | `number \| string` | `2000` |
| `volume-size` / `volumeSize` | 音量喇叭的大小 | `number \| string` | `34` |
| `speed` | 水平滚动时的滚动速度，即每秒滚动多少rpx，这有利于控制文字无论多少时，都能有一个恒定的速度 | `number` | `160` |
| `is-circular` / `isCircular` | 水平滚动时，是否采用衔接形式滚动 | `boolean` | `true` |
| `mode` | 滚动方向，horizontal-水平滚动，vertical-垂直滚动 | `Direction`（`horizontal`｜`vertical`） | `'horizontal'` |
| `play-state` / `playState` | 播放状态，play-播放，paused-暂停 | `PlayState`（`play`｜`paused`） | `'play'` |
| `disable-touch` / `disableTouch` | 是否禁止用手滑动切换 | `boolean` | `true` |
| `padding` | 通知的边距 | `number \| string` | `'18rpx 24rpx'` |

## 双向绑定（v-model）

该组件无双向绑定。

> ⚠️ `show` 为单向属性（无 `update:show` 事件），**不支持** `v-model:show`；可见性由父组件 `:show` 绑定控制。

## 事件

| 事件 | 回调参数 | 说明 |
| --- | --- | --- |
| `@click` | `index: number` | 点击通知栏时触发，返回被点击项的索引 |
| `@close` | - | 点击关闭图标时触发 |
| `@getMore` | - | 点击「查看更多」图标时触发 |
| `@end` | - | 滚动播放结束时触发 |

## 插槽

无插槽。
