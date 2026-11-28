<!-- 生成物，勿手改：由 scripts/gen-api-cards.mjs 渲染，改动会在下次再生成时丢失 -->

# ux-popover API

> 来源：`components/ux-popover`（uview-pro-x v2.0.15）
> API 指纹：`sha256:55e48495d233e8921c77134e1fd7dcfd72d143fbe5fbc9c385e84205bb59b805`
> 再生成（组件库源码可读时）：`node scripts/gen-api-cards.mjs --lib <uview-pro-x 路径> --only popover`

在触发元素旁弹出菜单面板，菜单内容全部由 `#menu` 插槽自定义（组件不内置 options 渲染）。定位口径：打开后先让面板以透明态挂载并绘制一帧，再量触发元素与面板的矩形，按 placement 算出 left/top 并钳制在屏幕内；纵向越界时自动翻转到另一侧（只改视觉，不派发事件）。矩形用 getBoundingClientRectAsync 采集，与 position: fixed 的原点三端一致，因此直接使用矩形值、不做 windowTop 换算。显隐终态（transform / opacity / transition-duration）经 `el.style.setProperty` 命令式直写，几何量（left / top / width / 箭头偏移）走内联样式，位置与动画状态由 BEM 类表达。面板默认 1px 描边 + 单层柔和阴影（均取主题令牌、随亮暗主题切换），边界清晰又不抢眼；箭头叠在面板之上（层级更高），用同底色背景盖住横穿根部的那段描边，只描外露的两条斜边，因此三端都不会出现割裂横线；show-border / show-shadow 全关即为纯色气泡（深色气泡同色无缝）；Web 端打开期间发生任何滚动都会自动关闭面板，App 与小程序端由遮罩阻断触摸滑动，不会出现面板与触发元素错位。

## 属性

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `custom-style` / `customStyle` | 自定义面板容器样式 | `string \| JsonObject` | - |
| `custom-class` / `customClass` | 自定义面板容器样式类 | `string` | `''` |
| `placement` | 面板方位，bottom-end \| bottom \| bottom-start \| top-end \| top \| top-start（默认 bottom-end） | `PopoverPlacement`（`bottom-end`｜`bottom`｜`bottom-start`｜`top-end`｜`top`｜`top-start`） | `'bottom-end'` |
| `offset` | 面板与触发元素的间距，单位 px（默认 8） | `string \| number` | `8` |
| `show-arrow` / `showArrow` | 是否显示指向触发元素的箭头（默认 true） | `boolean` | `true` |
| `arrow-size` / `arrowSize` | 箭头边长，单位 px（默认 8） | `string \| number` | `8` |
| `bg-color` / `bgColor` | 面板背景色，留空走主题白底（默认空） | `string` | `''` |
| `border-radius` / `borderRadius` | 面板圆角，单位 px，传 0 为直角（默认 8） | `string \| number` | `8` |
| `show-border` / `showBorder` | 是否显示面板描边，默认 true：1px 描边定义边界，箭头叠在上层盖住断口，根部无接缝线 | `boolean` | `true` |
| `show-shadow` / `showShadow` | 是否显示漫射阴影，关掉后为无投影的纯色气泡（默认 true） | `boolean` | `true` |
| `mask-bg-color` / `maskBgColor` | 遮罩层背景色，默认全透明只做点击捕获（默认 rgba(0,0,0,0)） | `string` | `'rgba(0,0,0,0)'` |
| `mask-close-able` / `maskCloseAble` | 点击遮罩是否关闭面板（默认 true） | `boolean` | `true` |
| `content-close-able` / `contentCloseAble` | 点击面板内容后是否自动关闭，插槽方案下默认交给调用方（默认 false） | `boolean` | `false` |
| `duration` | 显隐动画时长，单位 ms（默认 200） | `string \| number` | `200` |
| `z-index` / `zIndex` | 层级，留空取 $u.zIndex.dropdown（默认空） | `string \| number` | `''` |
| `refresh-key` / `refreshKey` | 内容尺寸异步变化时改此值触发重新测位（默认 0） | `string \| number` | `0` |

## 类型定义

> 本卡引用的自定义类型展开定义（源自组件 types.ts / 全局 types/global.ts），对象字面量可直接赋值。

| 类型 | 定义 |
| --- | --- |
| `JsonObject` | `Record<string, any>`（普通对象，任意键值、可嵌套；全库统一对象类型，含内联样式） |
| `PopoverPlacement` | `'bottom-end' \| 'bottom' \| 'bottom-start' \| 'top-end' \| 'top' \| 'top-start'` |

## 双向绑定（v-model）

| 写法 | 通道 | 说明 |
| --- | --- | --- |
| `v-model:show` | defineModel（组件内可直接改写） | `show` 属性，默认 `false` |

## 事件

| 事件 | 回调参数 | 说明 |
| --- | --- | --- |
| `@open` | - | 开始打开（面板已挂载、测位前） |
| `@close` | - | 开始关闭（终态已写回起始值） |
| `@clickMask` | - | 点击遮罩层 |

## 插槽

| 插槽名 | 说明 |
| --- | --- |
| `default` | 触发区内容（必填） |
| `menu` | 面板内容 |

## 外部样式类

| 名称 | 说明 |
| --- | --- |
| `custom-class` | 自定义根节点样式类 |

## 命令式方法（通过组件 ref 调用）

| 方法 | 说明 |
| --- | --- |
| `open` | - |
| `close` | - |
| `refresh` | - |
