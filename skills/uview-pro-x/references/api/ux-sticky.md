<!-- 生成物，勿手改：由 scripts/gen-api-cards.mjs 渲染，改动会在下次再生成时丢失 -->

# ux-sticky API

> 来源：`components/ux-sticky`（uview-pro-x v1.0.0）
> API 指纹：`sha256:e0a92ec52b74ed10fcc9a5e2b0e0770a1606e1e61140236c28845c2c886ecfa0`
> 再生成（组件库源码可读时）：`node scripts/gen-api-cards.mjs --lib <uview-pro-x 路径> --only sticky`

内容滚到距顶部 offsetTop 时固定在顶部，回滚时复位；吸顶时外层占位高度锁住内容高度，避免下方内容上跳。页面顶部结构用 navbar 声明，组件自己按端换算避让高度，调用方不需要判断平台。滚动距离建议用 usePageScroll() 获取后传入 scroll-top（页面层 onPageScroll 需由页面脚本注册）；不传时退化为内部节点观察（仅 Web / 小程序，App 端必须传 scroll-top，否则不会吸顶）。

## 属性

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `custom-style` / `customStyle` | 自定义根节点样式 | `string \| UTSJSONObject` | - |
| `custom-class` / `customClass` | 自定义根节点样式类 | `string` | `''` |
| `offset-top` / `offsetTop` | 吸顶时与导航栏底部的距离，数字按 config.unit 解释，也支持 '20px' / '40rpx' 字符串 | `number \| string` | `0` |
| `navbar` | 页面顶部导航栏形态，与 pages.json 的 navigationStyle 对齐：default-原生导航栏（缺省）：App / 小程序内容区原点已在导航栏下方，不避让；H5 的 fixed 以视口为原点，让出导航栏高度 custom-自绘导航栏：让出状态栏 + 导航栏 none-全屏无导航栏：只让出状态栏 也可传数值，表示自绘导航栏本体高度（状态栏自动叠加） 未设置时读全局 componentProps['ux-sticky'].navbar，最终回退 default | `string \| number` | `''` |
| `enable` | 是否开启吸顶 | `boolean` | `true` |
| `bg-color` / `bgColor` | 吸顶时的背景色，支持主题色名（primary / success 等）与普通色值 | `string` | `''` |
| `z-index` / `zIndex` | 吸顶时的层级，缺省取主题层级 $u.zIndex.sticky | `number \| string` | `''` |
| `scroll-top` / `scrollTop` | 页面或滚动容器的滚动距离（px），建议用 usePageScroll() 获取后传入。注意页面层 onPageScroll 必须写在页面脚本里（小程序编译期靠它给页面挂滚动钩子），写成 onPageScroll((e) =&gt; setScrollTop(e.scrollTop)) 即可。不传（负数）时退化为组件内部节点观察，仅 Web / 小程序可用；App 端没有观察器通道，不传则不会吸顶（开发期会打印一次告警）。传容器滚动距离时按「相对测量基准的位移」判定，不要求滚动容器贴视口顶部。负数表示未提供。 | `number \| string` | `-1` |

## 双向绑定（v-model）

该组件无双向绑定。

## 事件

| 事件 | 回调参数 | 说明 |
| --- | --- | --- |
| `@fixed` | - | 开始吸顶时触发 |
| `@unfixed` | - | 取消吸顶时触发 |

## 插槽

| 插槽名 | 说明 |
| --- | --- |
| `default` | 吸顶的内容 |

## 外部样式类

| 名称 | 说明 |
| --- | --- |
| `custom-class` | 自定义根节点样式类 |
