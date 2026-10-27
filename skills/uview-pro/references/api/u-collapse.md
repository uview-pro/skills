<!-- 生成物，勿手改：由 scripts/gen-api-cards.mjs 渲染，改动会在下次再生成时丢失 -->

# u-collapse API

> 来源：`components/u-collapse`（uview-pro v0.6.21）
> API 指纹：`sha256:21e4614cede2233266cc344763fa6538cb228e547a2b2cdb55b73c12ea25a6a9`
> 官方文档：https://uviewpro.cn/zh/components/collapse.html
> 再生成（组件库源码可读时）：`node scripts/gen-api-cards.mjs --lib <uview-pro 路径> --only collapse`

通过折叠面板收纳内容区域

## 用法示例

```vue
<u-collapse></u-collapse>
```

## 属性

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `custom-style` / `customStyle` | 自定义根节点样式 | `string \| Record<string, any>` | - |
| `custom-class` / `customClass` | 自定义根节点样式类 | `string` | `''` |
| `accordion` | 是否手风琴模式 | `boolean` | `true` |
| `head-style` / `headStyle` | 头部的样式 | `Record<string, any>` | - |
| `body-style` / `bodyStyle` | 主体的样式 | `Record<string, any>` | - |
| `item-style` / `itemStyle` | 每一个item的样式 | `Record<string, any>` | - |
| `arrow` | 是否显示右侧的箭头 | `boolean` | `true` |
| `arrow-color` / `arrowColor` | 箭头的颜色 | `string` | `'var(--u-tips-color)'` |
| `hover-class` / `hoverClass` | 标题部分按压时的样式类，"none"为无效果 | `string` | `'u-hover-class'` |

## 双向绑定（v-model）

该组件无双向绑定。

## 事件

| 事件 | 回调参数 | 说明 |
| --- | --- | --- |
| `@change` | - | 当前激活面板展开时触发(如果是手风琴模式，参数activeNames类型为String，否则为Array) |

## 插槽

| 插槽名 | 说明 |
| --- | --- |
| `default` | - |

## 命令式方法（通过组件 ref 调用）

| 方法 | 说明 |
| --- | --- |
| `activeName` | - |
| `onChange` | - |
| `setActiveNames` | - |
| `openAll` | - |
| `closeAll` | - |
| `init` | - |
| `childrenCount` | - |
