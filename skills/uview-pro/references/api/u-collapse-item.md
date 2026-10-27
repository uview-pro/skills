<!-- 生成物，勿手改：由 scripts/gen-api-cards.mjs 渲染，改动会在下次再生成时丢失 -->

# u-collapse-item API

> 来源：`components/u-collapse-item`（uview-pro v0.6.21）
> API 指纹：`sha256:90b7b5f253b18f828d68db479ce503325bd62acbe64e9868d577f20f54b0cc98`
> 官方文档：https://uviewpro.cn/zh/components/collapse.html
> 再生成（组件库源码可读时）：`node scripts/gen-api-cards.mjs --lib <uview-pro 路径> --only collapse-item`

通过折叠面板收纳内容区域（搭配u-collapse使用）

## 用法示例

```vue
<u-collapse-item :title="item.head" v-for="(item, index) in itemList" :key="index">{{item.body}}</u-collapse-item>
```

## 属性

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `custom-style` / `customStyle` | 自定义根节点样式 | `string \| Record<string, any>` | - |
| `custom-class` / `customClass` | 自定义根节点样式类 | `string` | `''` |
| `title` | 标题 | `string` | `''` |
| `align` | 标题的对齐方式 | `TextAlign`（`left`｜`center`｜`right`） | `'left'` |
| `disabled` | 是否可以点击收起 | `boolean` | `false` |
| `open` | collapse显示与否 | `boolean` | `false` |
| `name` | 唯一标识符 | `number \| string` | `''` |
| `active-style` / `activeStyle` | 活动样式 | `Record<string, any>` | - |
| `index` | 标识当前为第几个 | `string \| number` | `''` |

## 双向绑定（v-model）

该组件无双向绑定。

## 事件

| 事件 | 回调参数 | 说明 |
| --- | --- | --- |
| `@change` | - | 某个item被打开或者收起时触发 |

## 插槽

| 插槽名 | 说明 |
| --- | --- |
| `title` | - |
| `title-all` | - |
| `default` | - |

## 命令式方法（通过组件 ref 调用）

| 方法 | 说明 |
| --- | --- |
| `init` | - |
| `isShow` | - |
| `elId` | - |
| `height` | - |
| `headStyle` | - |
| `bodyStyle` | - |
| `itemStyle` | - |
| `arrowColor` | - |
| `hoverClass` | - |
| `itemName` | - |
| `queryRect` | - |
| `setShowState` | - |
| `openSingle` | - |
| `closeAll` | - |
| `setMultiple` | - |
| `toggleSingle` | - |
