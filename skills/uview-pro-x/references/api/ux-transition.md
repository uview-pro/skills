<!-- 生成物，勿手改：由 scripts/gen-api-cards.mjs 渲染，改动会在下次再生成时丢失 -->

# ux-transition API

> 来源：`components/ux-transition`（uview-pro-x v1.0.0）
> API 指纹：`sha256:4d27d5d9cecd7d380b75a55a3df14bc9456f5597b29d3db1dcaebe53d30c9b8c`
> 再生成（组件库源码可读时）：`node scripts/gen-api-cards.mjs --lib <uview-pro-x 路径> --only transition`

进出场动画封装：CSS transition 驱动显隐过渡（uni-app x App 端不支持 @keyframes，统一走 transition + 类切换范式）。进出场用 v-if 两段式（先挂 DOM、隔一拍切终态类，保证起始态 先提交一帧），完成判定走时长定时器（App 端 transitionend 可能不触发，不可依赖）。通用显隐动画底座，供需要进出场过渡的组件复用。

## 属性

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `custom-style` / `customStyle` | 自定义根节点样式 | `UTSJSONObject` | - |
| `custom-class` / `customClass` | 自定义根节点样式类 | `string` | `''` |
| `show` | 是否展示内容 | `boolean` | `true` |
| `name` | 预设动画名：fade / slide-up / slide-down / slide-left / slide-right / zoom-in / zoom-out | `string` | `'fade'` |
| `duration` | 进入/离开动画时长，单位ms | `number` | `300` |
| `timing-function` / `timingFunction` | 动画曲线 | `string` | `'cubic-bezier(0.2, 0.8, 0.2, 1)'` |
| `delay` | 动画延迟，单位ms（进入与离开都生效） | `number` | `0` |
| `appear` | 首次渲染时是否播放进场动画 | `boolean` | `false` |

## 双向绑定（v-model）

该组件无双向绑定。

> ⚠️ `show` 为单向属性（无 `update:show` 事件），**不支持** `v-model:show`。

## 事件

| 事件 | 回调参数 | 说明 |
| --- | --- | --- |
| `@before-enter` | - | 开始进入 |
| `@enter` | - | 进入动画真正启动（挂载隔一拍切终态类后；重开场景与 before-enter 同拍） |
| `@after-enter` | - | 进入动画结束 |
| `@enter-cancelled` | - | 进入动画未完成即被离开打断 |
| `@before-leave` | - | 开始离开 |
| `@leave` | - | 离开动画启动（与 before-leave 同拍，预留） |
| `@after-leave` | - | 离开动画结束（DOM 已卸载） |
| `@leave-cancelled` | - | 离开动画未完成即被重进打断 |

## 插槽

| 插槽名 | 说明 |
| --- | --- |
| `default` | - |

## 外部样式类

| 名称 | 说明 |
| --- | --- |
| `custom-class` | 自定义根节点样式类 |
