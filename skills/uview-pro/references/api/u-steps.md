<!-- 生成物，勿手改：由 scripts/gen-api-cards.mjs 渲染，改动会在下次再生成时丢失 -->

# u-steps API

> 来源：`components/u-steps`（uview-pro v0.6.21）
> API 指纹：`sha256:2740df5ec4c1b56b2a22db1063612c58dccb9015f46d66d73020faf0927da2f7`
> 官方文档：https://uviewpro.cn/zh/components/steps.html
> 再生成（组件库源码可读时）：`node scripts/gen-api-cards.mjs --lib <uview-pro 路径> --only steps`

该组件一般用于完成一个任务要分几个步骤，标识目前处于第几步的场景。

## 用法示例

```vue
<u-steps :list="numList" active-color="var(--u-type-error)"></u-steps>
```

## 属性

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `custom-style` / `customStyle` | 自定义根节点样式 | `string \| Record<string, any>` | - |
| `custom-class` / `customClass` | 自定义根节点样式类 | `string` | `''` |
| `mode` | 步骤条的类型，dot\|number | `StepMode`（`dot`｜`number`） | `'dot'` |
| `list` | 步骤条的数据 | `StepsListItem[]` | - |
| `type` | 主题类型, primary\|success\|info\|warning\|error | `ThemeType`（`primary`｜`info`｜`error`｜`warning`｜`success`｜`default`） | `'primary'` |
| `current` | 当前哪一步是激活的 | `number \| string` | `0` |
| `active-color` / `activeColor` | 激活步骤的颜色 | `string` | - |
| `un-active-color` / `unActiveColor` | 未激活的颜色 | `string` | - |
| `icon` | 自定义图标 | `string` | `'checkmark'` |
| `direction` | step的排列方向，row-横向，column-竖向 | `StepDirection`（`row`｜`column`） | `'row'` |

## 双向绑定（v-model）

该组件无双向绑定。

## 事件

无类型化自定义事件（原生事件不受影响，可直接透传监听）。

## 插槽

| 插槽名 | 说明 |
| --- | --- |
| `default` | - |

## 命令式方法（通过组件 ref 调用）

| 方法 | 说明 |
| --- | --- |
| `childLen` | - |
