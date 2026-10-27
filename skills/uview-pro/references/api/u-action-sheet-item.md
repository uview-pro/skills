<!-- 生成物，勿手改：由 scripts/gen-api-cards.mjs 渲染，改动会在下次再生成时丢失 -->

# u-action-sheet-item API

> 来源：`components/u-action-sheet-item`（uview-pro v0.6.21）
> API 指纹：`sha256:24b986b2dd8e3cb27f8c02094c29e28e2fd84740eefec998aa06d08b2ed144bb`
> 再生成（组件库源码可读时）：`node scripts/gen-api-cards.mjs --lib <uview-pro 路径> --only action-sheet-item`

该组件一般用于展示操作菜单中的单个选项，作为u-action-sheet的子组件使用，支持默认slot自定义内容

## 用法示例

```vue
<u-action-sheet-item text="退出登录"></u-action-sheet-item>
```

## 属性

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `custom-style` / `customStyle` | 自定义根节点样式 | `string \| Record<string, any>` | - |
| `custom-class` / `customClass` | 自定义根节点样式类 | `string` | `''` |
| `text` | 标题 | `string` | `''` |
| `sub-text` / `subText` | 描述 | `string` | `''` |
| `padding` | 边距 | `number \| string` | `'34rpx 0'` |
| `color` | 字体颜色 | `string` | - |
| `font-size` / `fontSize` | 字体大小 | `string \| number` | `'32rpx'` |
| `disabled` | 是否禁用 | `boolean` | `false` |
| `async-close` / `asyncClose` | 是否异步关闭 | `boolean` | `false` |

## 双向绑定（v-model）

该组件无双向绑定。

## 事件

| 事件 | 回调参数 | 说明 |
| --- | --- | --- |
| `@click` | - | 点击选项时触发 |

## 插槽

| 插槽名 | 说明 |
| --- | --- |
| `default` | - |
