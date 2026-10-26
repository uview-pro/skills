<!-- 生成物，勿手改：由 scripts/gen-api-cards.mjs 渲染，改动会在下次再生成时丢失 -->

# ux-collapse API

> 来源：`components/ux-collapse`（uview-pro-x v1.0.0）
> API 指纹：`sha256:3f90ca8a31c95ce82448777979493f50926e34f539f5741ae2aa7334d3cb772f`
> 再生成（组件库源码可读时）：`node scripts/gen-api-cards.mjs --lib <uview-pro-x 路径> --only collapse`

通过折叠面板收纳内容区域

## 属性

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `custom-style` / `customStyle` | 自定义根节点样式 | `UTSJSONObject` | - |
| `custom-class` / `customClass` | 自定义根节点样式类 | `string` | `''` |
| `accordion` | 是否手风琴模式（默认true） | `boolean` | `true` |
| `head-style` / `headStyle` | 头部的样式 | `UTSJSONObject` | - |
| `body-style` / `bodyStyle` | 主体的样式 | `UTSJSONObject` | - |
| `item-style` / `itemStyle` | 每一个item的样式 | `UTSJSONObject` | - |
| `arrow` | 是否显示右侧的箭头（默认true） | `boolean` | `true` |
| `arrow-color` / `arrowColor` | 箭头的颜色 | `string` | `''` |
| `hover-class` / `hoverClass` | 标题部分按压时的样式类，"none"为无效果 | `string` | `'ux-collapse--hover'` |

## 双向绑定（v-model）

该组件无双向绑定。

## 事件

| 事件 | 回调参数 | 说明 |
| --- | --- | --- |
| `@change` | `value: string \| number \| (string \| number)[]` | 当前激活面板展开时触发(如果是手风琴模式，参数activeNames类型为String，否则为Array) |

## 插槽

| 插槽名 | 说明 |
| --- | --- |
| `default` | - |

## 外部样式类

| 名称 | 说明 |
| --- | --- |
| `custom-class` | 自定义根节点样式类 |

## 命令式方法（通过组件 ref 调用）

| 方法 | 说明 |
| --- | --- |
| `activeNames` | - |
| `handleItemClick` | - |
| `setActiveNames` | - |
| `openAll` | - |
| `closeAll` | - |
