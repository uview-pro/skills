<!-- 生成物，勿手改：由 scripts/gen-api-cards.mjs 渲染，改动会在下次再生成时丢失 -->

# u-step API

> 来源：`components/u-step`（uview-pro v0.6.21）
> API 指纹：`sha256:7f8318d6e7dde49fd07eda8fcc499f21370b14a25db0b1854e8648f51562bf03`
> 官方文档：https://uviewpro.cn/zh/components/steps.html
> 再生成（组件库源码可读时）：`node scripts/gen-api-cards.mjs --lib <uview-pro 路径> --only step`

该组件一般用于展示步骤流程的场景，作为u-steps的子组件使用，可展示标题、描述与节点图标

## 用法示例

```vue
<u-step title="已完成" description="步骤描述"></u-step>
```

## 属性

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `custom-style` / `customStyle` | 自定义根节点样式 | `string \| Record<string, any>` | - |
| `custom-class` / `customClass` | 自定义根节点样式类 | `string` | `''` |
| `mode` | 步骤条的类型，dot\|number | `StepMode`（`dot`｜`number`） | `'dot'` |
| `type` | 主题类型, primary\|success\|info\|warning\|error | `ThemeType`（`primary`｜`info`｜`error`｜`warning`｜`success`｜`default`） | `'primary'` |
| `active-color` / `activeColor` | 激活步骤的颜色 | `string` | - |
| `un-active-color` / `unActiveColor` | 未激活的颜色 | `string` | - |
| `icon` | 自定义图标 | `string` | `'checkmark'` |
| `name` | 标题 | `string` | `''` |
| `desc` | 描述 | `string` | `''` |

## 双向绑定（v-model）

该组件无双向绑定。

## 事件

无类型化自定义事件（原生事件不受影响，可直接透传监听）。

## 插槽

| 插槽名 | 说明 |
| --- | --- |
| `icon` | - |
| `name` | - |
| `desc` | - |
