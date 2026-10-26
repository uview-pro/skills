<!-- 生成物，勿手改：由 scripts/gen-api-cards.mjs 渲染，改动会在下次再生成时丢失 -->

# ux-alert-tips API

> 来源：`components/ux-alert-tips`（uview-pro-x v1.0.0）
> API 指纹：`sha256:776b5c0d4f27ddc27e870d30a1e8b23c54ab09f59512994793701e3975f6b3fe`
> 再生成（组件库源码可读时）：`node scripts/gen-api-cards.mjs --lib <uview-pro-x 路径> --only alert-tips`

警告提示，展现需要关注的信息；分 success / warning / info / error 四种主题，背景、边框、文字与默认图标颜色均按 type 回退，可关闭并支持自定义关闭文案

## 属性

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `custom-style` / `customStyle` | 自定义根节点样式 | `UTSJSONObject` | - |
| `custom-class` / `customClass` | 自定义根节点样式类 | `string` | `''` |
| `title` | 显示文字 | `string` | `''` |
| `type` | 主题，success/warning/info/error | `string` | `'warning'` |
| `description` | 辅助性文字 | `string` | `''` |
| `close-able` / `closeAble` | 是否可关闭 | `boolean` | `false` |
| `close-text` / `closeText` | 关闭按钮自定义文本 | `string` | `''` |
| `show-icon` / `showIcon` | 是否显示图标 | `boolean` | `false` |
| `color` | 文字颜色 | `string` | `''` |
| `bg-color` / `bgColor` | 背景颜色 | `string` | `''` |
| `border-color` / `borderColor` | 边框颜色 | `string` | `''` |
| `show` | 是否显示 | `boolean` | `true` |
| `icon` | 左边显示的icon | `string` | `''` |
| `icon-style` / `iconStyle` | icon的样式 | `UTSJSONObject` | - |
| `title-style` / `titleStyle` | 标题的样式 | `UTSJSONObject` | - |
| `desc-style` / `descStyle` | 描述文字的样式 | `UTSJSONObject` | - |

## 双向绑定（v-model）

该组件无双向绑定。

> ⚠️ `show` 为单向属性（无 `update:show` 事件），**不支持** `v-model:show`。

## 事件

| 事件 | 回调参数 | 说明 |
| --- | --- | --- |
| `@click` | - | 点击提示内容时触发 |
| `@close` | - | 点击关闭按钮时触发 |

## 插槽

无插槽。

## 外部样式类

| 名称 | 说明 |
| --- | --- |
| `custom-class` | 自定义根节点样式类 |
