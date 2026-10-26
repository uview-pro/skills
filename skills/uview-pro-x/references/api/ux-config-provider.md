<!-- 生成物，勿手改：由 scripts/gen-api-cards.mjs 渲染，改动会在下次再生成时丢失 -->

# ux-config-provider API

> 来源：`components/ux-config-provider`（uview-pro-x v1.0.0）
> API 指纹：`sha256:899ad17eb969619797a46392ea73d46d2afc35e5ada6a97b472736211a63d1f3`
> 再生成（组件库源码可读时）：`node scripts/gen-api-cards.mjs --lib <uview-pro-x 路径> --only config-provider`

配置注入组件：初始化并响应主题、暗黑模式、国际化的切换，并把主题 CSS 变量下发到根节点

## 属性

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `custom-style` / `customStyle` | 自定义根节点样式 | `string` | `''` |
| `custom-class` / `customClass` | 自定义根节点样式类 | `string` | `''` |
| `dark-mode` / `darkMode` | 暗黑模式：'light' \| 'dark' \| 'auto' | `string` | `''` |
| `current-theme` / `currentTheme` | 当前主题名称 | `string` | `''` |
| `current-locale` / `currentLocale` | 国际化当前语言名称 | `string` | `''` |

## 双向绑定（v-model）

该组件无双向绑定。

## 事件

| 事件 | 回调参数 | 说明 |
| --- | --- | --- |
| `@theme-change` | `themeName: string` | 主题变化时触发，携带新主题名 |
| `@mode-change` | `mode: string` | 暗黑模式变化时触发，携带新模式名 |

## 插槽

| 插槽名 | 说明 |
| --- | --- |
| `default` | 需要挂载到配置顶点的子内容 |

## 外部样式类

| 名称 | 说明 |
| --- | --- |
| `custom-class` | 自定义根节点样式类 |
