<!-- 生成物，勿手改：由 scripts/gen-api-cards.mjs 渲染，改动会在下次再生成时丢失 -->

# u-grid API

> 来源：`components/u-grid`（uview-pro v0.6.21）
> API 指纹：`sha256:fcce55a1969ab37e32d07003f6fc4d54fdb6a2c26805817bb182ed8e695da2ac`
> 官方文档：https://uviewpro.cn/zh/components/grid.html
> 再生成（组件库源码可读时）：`node scripts/gen-api-cards.mjs --lib <uview-pro 路径> --only grid`

宫格组件一般用于同时展示多个同类项目的场景，可以给宫格的项目设置徽标组件(badge)，或者图标等，也可以扩展为左右滑动的轮播形式。

## 用法示例

```vue
<u-grid :col="3" @click="click"></u-grid>
```

## 属性

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `custom-style` / `customStyle` | 自定义根节点样式 | `string \| Record<string, any>` | - |
| `custom-class` / `customClass` | 自定义根节点样式类 | `string` | `''` |
| `col` | 分成几列 | `string \| number` | `3` |
| `border` | 是否显示边框 | `boolean` | `true` |
| `align` | 宫格对齐方式，表现为数量少的时候，靠左，居中，还是靠右 | `InputAlign`（`left`｜`center`｜`right`） | `'left'` |
| `hover-class` / `hoverClass` | 宫格按压时的样式类，"none"为无效果 | `string` | `'u-hover-class'` |

## 双向绑定（v-model）

该组件无双向绑定。

## 事件

| 事件 | 回调参数 | 说明 |
| --- | --- | --- |
| `@click` | - | 点击宫格触发 |

## 插槽

| 插槽名 | 说明 |
| --- | --- |
| `default` | - |

## 命令式方法（通过组件 ref 调用）

| 方法 | 说明 |
| --- | --- |
| `click` | - |
