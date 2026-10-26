<!-- 生成物，勿手改：由 scripts/gen-api-cards.mjs 渲染，改动会在下次再生成时丢失 -->

# ux-overlay API

> 来源：`components/ux-overlay`（uview-pro-x v1.0.0）
> API 指纹：`sha256:bf243c71500bf3b3e6e738ac8e995fe48a5501d5d775a88b2aa79fa3d1764673`
> 再生成（组件库源码可读时）：`node scripts/gen-api-cards.mjs --lib <uview-pro-x 路径> --only overlay`

创建一个全屏固定定位的遮罩层，可独立使用，也是 ux-popup 的遮罩实现。显隐通道：`v-model:show` 驱动 `v-if` 建节点（起始态 opacity:0 由静态类承载），下一拍定时器翻 `--show` 类播淡入；关闭时撤类播淡出，时长走完再收掉节点。

## 属性

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `custom-style` / `customStyle` | 自定义根节点样式 | `string \| UTSJSONObject` | - |
| `custom-class` / `customClass` | 自定义根节点样式类 | `string` | `''` |
| `z-index` / `zIndex` | 层级 z-index | `string \| number` | `''` |
| `close-on-click-overlay` / `closeOnClickOverlay` | 点击遮罩是否关闭（关闭即把 v-model:show 置为 false） | `boolean` | `true` |
| `duration` | 淡入淡出时长，单位 ms | `string \| number` | `300` |
| `bg-color` / `bgColor` | 遮罩背景色，留空走样式表默认值 | `string` | `''` |

## 双向绑定（v-model）

| 写法 | 通道 | 说明 |
| --- | --- | --- |
| `v-model:show` | defineModel（组件内可直接改写） | `show` 属性，默认 `false` |

## 事件

| 事件 | 回调参数 | 说明 |
| --- | --- | --- |
| `@click` | `event: UniPointerEvent` | 点击遮罩时触发，回传点击事件 |
| `@opened` | - | 打开动画结束触发 |
| `@closed` | - | 关闭动画结束、节点卸载前触发 |

## 插槽

| 插槽名 | 说明 |
| --- | --- |
| `default` | - |

## 外部样式类

| 名称 | 说明 |
| --- | --- |
| `custom-class` | 自定义根节点样式类 |
