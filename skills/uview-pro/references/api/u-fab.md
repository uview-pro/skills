<!-- 生成物，勿手改：由 scripts/gen-api-cards.mjs 渲染，改动会在下次再生成时丢失 -->

# u-fab API

> 来源：`components/u-fab`（uview-pro v0.6.21）
> API 指纹：`sha256:865b54b8a5636bfb2334af5ab64403e9d72af87b308aec1b9ee902e496503091`
> 官方文档：https://uviewpro.cn/zh/components/fab.html
> 再生成（组件库源码可读时）：`node scripts/gen-api-cards.mjs --lib <uview-pro 路径> --only fab`

该组件一般用于可拖拽的悬浮按钮场景，拖动结束后可自动吸附到最近的边缘，点击按钮可展开默认slot中的操作菜单

## 用法示例

```vue
<u-fab :gap="{ bottom: 32 }" @trigger="handleTrigger"></u-fab>
```

## 属性

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `custom-style` / `customStyle` | 自定义根节点样式 | `string \| Record<string, any>` | - |
| `custom-class` / `customClass` | 自定义根节点样式类 | `string` | `''` |
| `type` | 按钮的预置样式，primary，info，error，warning，success | `ThemeType`（`primary`｜`info`｜`error`｜`warning`｜`success`｜`default`） | `'primary'` |
| `disabled` | 是否禁止状态 | `boolean` | `false` |
| `draggable` | 按钮能否可以拖动 | `boolean` | `false` |
| `gap` | 按钮与边缘的间距，单位 px。支持 number 或对象 {top,left,right,bottom}，优先级按键存在顺序 | `FabGap` | - |
| `auto-stick` / `autoStick` | 拖动结束时是否自动吸边（仅当 draggable 为 true 时生效） | `boolean` | `true` |
| `position` | 预设定位：控制组件默认停靠位置 | `FabPosition`（`left-top`｜`right-top`｜`left-bottom`｜`right-bottom`｜`left-center`｜`right-center`｜`top-center`｜`bottom-center`） | `'right-bottom'` |
| `direction` | 菜单出现的方向 | `FabDirection`（`top`｜`bottom`｜`left`｜`right`） | `'top'` |
| `z-index` / `zIndex` | 按钮自定义层级 | `number` | `99` |

## 双向绑定（v-model）

该组件无双向绑定。

## 事件

| 事件 | 回调参数 | 说明 |
| --- | --- | --- |
| `@trigger` | - | 点击悬浮按钮时触发（未使用默认slot时） |

## 插槽

| 插槽名 | 说明 |
| --- | --- |
| `trigger` | - |
| `default` | - |

## 命令式方法（通过组件 ref 调用）

| 方法 | 说明 |
| --- | --- |
| `toggle` | - |
