<!-- 生成物，勿手改：由 scripts/gen-api-cards.mjs 渲染，改动会在下次再生成时丢失 -->

# u-transition API

> 来源：`components/u-transition`（uview-pro v0.6.21）
> API 指纹：`sha256:dd5b0f57514daf6de9f05d02eec7f26162415492ace5afd321c5a3c4cbc8a4db`
> 官方文档：https://uviewpro.cn/zh/components/transition.html
> 再生成（组件库源码可读时）：`node scripts/gen-api-cards.mjs --lib <uview-pro 路径> --only transition`

统一的过渡与进出场动效封装，支持多种预设动画和自定义时长。

## 用法示例

```vue
<u-transition :show="visible" name="slide-up"><view>content</view></u-transition>
```

## 属性

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `custom-style` / `customStyle` | 自定义根节点样式 | `string \| Record<string, any>` | - |
| `custom-class` / `customClass` | 自定义根节点样式类 | `string` | `''` |
| `show` | 是否展示内容（默认true） | `boolean` | `true` |
| `name` | 预设动画名，可选 fade/slide-up/slide-down/slide-left/slide-right/zoom-in/zoom-out（默认fade） | `TransitionPreset`（`fade`｜`slide-up`｜`slide-down`｜`slide-left`｜`slide-right`｜`zoom-in`｜`zoom-out`） | `'fade'` |
| `mode` | 进入/离开过渡模式，等同于原生 transition 的 mode（默认空） | `out-in`｜`in-out`｜`''` | `''` |
| `duration` | 进入/离开动画时长，单位ms，支持 { enter, leave }（默认300） | `number \| TransitionDuration` | `300` |
| `timing-function` / `timingFunction` | 动画曲线（默认cubic-bezier(0.2,0.8,0.2,1)） | `string` | `'cubic-bezier(0.2, 0.8, 0.2, 1)'` |
| `delay` | 动画延迟，单位ms（默认0） | `number` | `0` |
| `appear` | 首次渲染时是否执行动画（默认false） | `boolean` | `false` |

## 双向绑定（v-model）

该组件无双向绑定。

> ⚠️ `show` 为单向属性（无 `update:show` 事件），**不支持** `v-model:show`；可见性由父组件 `:show` 绑定控制。

## 事件

| 事件 | 回调参数 | 说明 |
| --- | --- | --- |
| `@before-enter` | - | 进入过渡开始前触发 |
| `@enter` | - | 进入过渡开始时触发 |
| `@after-enter` | - | 进入过渡结束后触发 |
| `@enter-cancelled` | - | 进入过渡被打断时触发 |
| `@before-leave` | - | 离开过渡开始前触发 |
| `@leave` | - | 离开过渡开始时触发 |
| `@after-leave` | - | 离开过渡结束后触发 |
| `@leave-cancelled` | - | 离开过渡被打断时触发 |

## 插槽

| 插槽名 | 说明 |
| --- | --- |
| `default` | - |
