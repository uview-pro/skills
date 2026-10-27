<!-- 生成物，勿手改：由 scripts/gen-api-cards.mjs 渲染，改动会在下次再生成时丢失 -->

# u-row-notice API

> 来源：`components/u-row-notice`（uview-pro v0.6.21）
> API 指纹：`sha256:466943f73c34247d838e6b04a13b27353d787ee81ef371ca26125de68e18b8d8`
> 再生成（组件库源码可读时）：`node scripts/gen-api-cards.mjs --lib <uview-pro 路径> --only row-notice`

水平滚动通告栏

## 属性

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `custom-style` / `customStyle` | 自定义根节点样式 | `string \| Record<string, any>` | - |
| `custom-class` / `customClass` | 自定义根节点样式类 | `string` | `''` |
| `list` | 显示的内容，数组 | `string[]` | - |
| `type` | 显示的主题，success\|error\|primary\|info\|warning\|none | `primary`｜`info`｜`error`｜`warning`｜`success`｜`default`｜`none` | `'warning'` |
| `volume-icon` / `volumeIcon` | 是否显示左侧的音量图标 | `boolean` | `true` |
| `more-icon` / `moreIcon` | 是否显示右侧的右箭头图标 | `boolean` | `false` |
| `close-icon` / `closeIcon` | 是否显示右侧的关闭图标 | `boolean` | `false` |
| `autoplay` | 是否自动播放 | `boolean` | `true` |
| `color` | 文字颜色，各图标也会使用文字颜色 | `string` | `''` |
| `bg-color` / `bgColor` | 背景颜色 | `string` | `''` |
| `show` | 是否显示 | `boolean` | `true` |
| `font-size` / `fontSize` | 字体大小，单位rpx | `number \| string` | `26` |
| `volume-size` / `volumeSize` | 音量喇叭的大小 | `number \| string` | `34` |
| `speed` | 水平滚动时的滚动速度，即每秒滚动多少rpx | `number \| string` | `160` |
| `play-state` / `playState` | 播放状态，play-播放，paused-暂停 | `PlayState`（`play`｜`paused`） | `'play'` |
| `padding` | 通知的边距 | `number \| string` | `'18rpx 24rpx'` |

## 双向绑定（v-model）

该组件无双向绑定。

> ⚠️ `show` 为单向属性（无 `update:show` 事件），**不支持** `v-model:show`；可见性由父组件 `:show` 绑定控制。

## 事件

| 事件 | 回调参数 | 说明 |
| --- | --- | --- |
| `@click` | - | 点击通知栏时触发 |
| `@close` | - | 点击关闭图标时触发 |
| `@getMore` | - | 点击「查看更多」图标时触发 |

## 插槽

无插槽。
