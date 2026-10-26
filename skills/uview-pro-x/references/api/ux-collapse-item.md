<!-- 生成物，勿手改：由 scripts/gen-api-cards.mjs 渲染，改动会在下次再生成时丢失 -->

# ux-collapse-item API

> 来源：`components/ux-collapse-item`（uview-pro-x v1.0.0）
> API 指纹：`sha256:a1d3201bc2dad26d8cfead1a6415153aaf1c54a5ab66884cadd87c40be2a166a`
> 再生成（组件库源码可读时）：`node scripts/gen-api-cards.mjs --lib <uview-pro-x 路径> --only collapse-item`

通过折叠面板收纳内容区域（搭配u-collapse使用）

## 属性

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `custom-style` / `customStyle` | 自定义根节点样式 | `UTSJSONObject` | - |
| `custom-class` / `customClass` | 自定义根节点样式类 | `string` | `''` |
| `title` | 面板标题 | `string` | `''` |
| `align` | 标题的对齐方式（默认left） | `string` | `'left'` |
| `disabled` | 面板是否可以打开或收起（默认false） | `boolean` | `false` |
| `open` | 设置某个面板的初始状态是否打开（默认false） | `boolean` | `false` |
| `name` | 唯一标识符，如不设置，默认用当前collapse-item的索引值 | `string \| number` | `''` |
| `active-style` / `activeStyle` | 不显示箭头时，可以添加当前选择的collapse-item活动样式，对象形式 | `UTSJSONObject` | - |
| `index` | 主要用于事件的回调，标识那个Item被点击 | `string \| number` | `''` |

## 双向绑定（v-model）

该组件无双向绑定。

## 事件

| 事件 | 回调参数 | 说明 |
| --- | --- | --- |
| `@change` | `value: { index: string \| number; name: string \| number; show: boolean }` | 某个item被打开或者收起时触发 |

## 插槽

| 插槽名 | 说明 |
| --- | --- |
| `title` | - |
| `title-all` | - |
| `default` | - |

## 外部样式类

| 名称 | 说明 |
| --- | --- |
| `custom-class` | 自定义根节点样式类 |

## 命令式方法（通过组件 ref 调用）

| 方法 | 说明 |
| --- | --- |
| `isShow` | - |
| `itemName` | - |
| `measureContent` | - |
