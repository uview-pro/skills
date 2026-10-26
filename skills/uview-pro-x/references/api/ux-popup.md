<!-- 生成物，勿手改：由 scripts/gen-api-cards.mjs 渲染，改动会在下次再生成时丢失 -->

# ux-popup API

> 来源：`components/ux-popup`（uview-pro-x v1.0.0）
> API 指纹：`sha256:624e6906426589a693dfb451369f301a3cff69c362cb61f1e85905b618bbe4a0`
> 再生成（组件库源码可读时）：`node scripts/gen-api-cards.mjs --lib <uview-pro-x 路径> --only popup`

弹出层容器，用于展示弹窗、信息提示等内容，支持上、下、左、右和中部弹出。组件只提供容器，内部内容由用户自定义。显隐模型：内容层节点由 v-if 创建，起始态（屏外位移 / opacity:0）由静态方向类承载，终态（归位、不透明）由 `el.style.setProperty` 命令式直写，关闭时反向写回起始值、播完时长再卸载节点；小程序端节点被渲染层按位置复用，卸载前行内值会被置空交还给类（见 usePopup 的 `#ifdef MP-WEIXIN`），以保证换方向重开时起点仍由当前方向类决定。下一拍的 50ms 延时是「让起始态先绘制一帧」的必要节拍，不是可消灭的错帧。遮罩层用 ux-mask，常驻不卸载。

## 属性

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `custom-style` / `customStyle` | 自定义根节点样式 | `string \| UTSJSONObject` | - |
| `custom-class` / `customClass` | 自定义根节点样式类 | `string` | `''` |
| `mode` | 弹出方向，left\|right\|top\|bottom\|center，inline 模式直接插入页面 | `left`｜`right`｜`top`｜`bottom`｜`center`｜`inline` | `'bottom'` |
| `mask` | 是否显示遮罩 | `boolean` | `true` |
| `length` | 抽屉的宽度(mode=left\|right)，或者高度(mode=top\|bottom)，单位px，或"auto"/百分比 | `string \| number` | `'auto'` |
| `zoom` | 是否开启缩放动画，只在 mode=center 时有效 | `boolean` | `true` |
| `safe-area-inset-bottom` / `safeAreaInsetBottom` | 是否开启底部安全区适配（默认 true）。只在弹窗下沿贴屏幕底时生效：mode=bottom\|left\|right | `boolean` | `true` |
| `safe-area-inset-top` / `safeAreaInsetTop` | 是否开启顶部安全区适配（默认 true）。只在弹窗上沿贴屏幕顶时生效：mode=top\|left\|right；自定义导航栏隐藏原生导航栏时需避让状态栏（避让量取 statusBarHeight，不是 safeAreaInsets.top） | `boolean` | `true` |
| `mask-close-able` / `maskCloseAble` | 是否可以通过点击遮罩进行关闭 | `boolean` | `true` |
| `popup` | 内部参数：true 时关闭路径由本组件回写 v-model（show 由 defineModel('show') 声明，不列入本类型）；false 时只派发 close，由父层自行回写（多层嵌套消费方沿用旧契约） | `boolean` | `true` |
| `border-radius` / `borderRadius` | 圆角值 | `string \| number` | `0` |
| `z-index` / `zIndex` | 弹窗 z-index | `string \| number` | `''` |
| `closeable` | 是否显示关闭图标 | `boolean` | `false` |
| `close-icon` / `closeIcon` | 关闭图标的名称 | `string` | `'close'` |
| `close-icon-position` / `closeIconPosition` | 自定义关闭图标位置 | `PopupCloseIconPos`（`top-left`｜`top-right`｜`bottom-left`｜`bottom-right`） | `'top-right'` |
| `close-icon-color` / `closeIconColor` | 关闭图标的颜色 | `string` | `''` |
| `close-icon-size` / `closeIconSize` | 关闭图标的大小，单位px | `string \| number` | `'16'` |
| `width` | 弹窗宽度 | `string` | `''` |
| `height` | 弹窗高度 | `string` | `''` |
| `margin-top` / `marginTop` | 中部弹出时的纵向偏移，正值下移、负值上移，支持 px/百分比 | `string \| number` | `0` |
| `bg-color` / `bgColor` | 弹窗背景色，留空走主题变量 $u-bg-white | `string` | `''` |
| `mask-custom-style` / `maskCustomStyle` | 遮罩自定义样式 | `UTSJSONObject` | - |
| `duration` | 动画时长，单位 ms | `string \| number` | `300` |
| `close-on-slide-down` / `closeOnSlideDown` | 是否开启「内容区」下拉关闭（仅 mode=bottom 有效，默认 false）。⚠️ 只管内容区这一条路径，管不到拖拽条把手：把手只要渲染出来就恒可下拉关闭 （showDragBar=true 且 closeOnSlideDown=false 时，用户仍能拖把手关掉弹窗）。推荐组合：`showDragBar=true` + `closeOnSlideDown=true`；想彻底关掉把手下拉，目前只能 `showDragBar=false`（不渲染）。该重叠属既有行为，改动会影响已接入方的使用预期，2026-09-28 决策本轮不调整 | `boolean` | `false` |
| `slide-down-threshold` / `slideDownThreshold` | 触发下拉关闭的纵向位移阈值，单位 px（把手与内容区两条路径共用同一阈值）。只有位移判定、没有速度判定，故快速轻扫若未达该位移不会关闭（手感偏「黏」），同上属既有行为 | `number` | `40` |
| `scroll-id` / `scrollId` | 内容区滚动容器 id，下拉关闭时用于判断是否已滚到顶部。⚠️ 不传时视为「已在顶部」，内容区下拉手势会被接管成关闭动作，长列表滚不动 —— 内容区自带 scroll-view 时必须传本项。另：本项只管手势归属，scroll-view 自身还必须有确定高度（父级高度受限 + flex:1），否则它被内容撑开、没有可滚的溢出，同样滚不动 | `string` | `''` |
| `show-drag-bar` / `showDragBar` | 是否显示顶部拖拽条（仅 mode=bottom 有效），同时作为下拉关闭手势的把手。本项只是「渲染」开关，把手的可拖性不受 closeOnSlideDown 约束（见该字段说明）；命中区是整条 32px 全宽容器，不是 20x3 的横条本体 | `boolean` | `false` |
| `before-close` / `beforeClose` | 关闭前拦截器：返回 false 或 Promise&lt;false&gt; 时取消关闭 | `BeforeChangeInterceptor` | - |

## 双向绑定（v-model）

| 写法 | 通道 | 说明 |
| --- | --- | --- |
| `v-model:show` | defineModel（组件内可直接改写） | `show` 属性，默认 `false` |

## 事件

| 事件 | 回调参数 | 说明 |
| --- | --- | --- |
| `@open` | - | 开始打开（起始态已绘制、终态写入前） |
| `@opened` | - | 打开动画结束 |
| `@close` | - | 开始收起（终态已写回起始值） |
| `@closed` | - | 收起动画结束、节点卸载 |
| `@clickMask` | - | 点击遮罩 |

## 插槽

| 插槽名 | 说明 |
| --- | --- |
| `default` | - |
| `drag` | - |

## 外部样式类

| 名称 | 说明 |
| --- | --- |
| `custom-class` | 自定义根节点样式类 |
