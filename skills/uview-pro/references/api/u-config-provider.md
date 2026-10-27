<!-- 生成物，勿手改：由 scripts/gen-api-cards.mjs 渲染，改动会在下次再生成时丢失 -->

# u-config-provider API

> 来源：`components/u-config-provider`（uview-pro v0.6.21）
> API 指纹：`sha256:a3ee95c5937e0de3c2cdc89dadcc20b9156f4970eb7056cc5f81f188bac9630f`
> 官方文档：https://uviewpro.cn/zh/components/configProvider.html
> 再生成（组件库源码可读时）：`node scripts/gen-api-cards.mjs --lib <uview-pro 路径> --only config-provider`

说明（简要）： - 初始化场景（推荐在应用入口执行）：使用 `useTheme().initTheme(themes)` 进行一次性初始化与全局设置（例如在 `main.ts` 或 `App.vue` 中）。 - 组件/页面场景（推荐）：使用 `useTheme()` 组合式函数在组件内部读取响应式 `currentTheme`、`themes`、`darkMode` 并通过 `setTheme()` 和 `setDarkMode()` 切换主题/模式。 该组件的行为： - 如果在挂载时传入 `themes`，会调用 `configProvider.initTheme(themes)` - 如果传入 `currentTheme`，会优先设置当前主题 - 如果传入 `darkMode`，会设置当前的暗黑模式状态，同时在 document 上添加 `u-theme-dark` 或 `u-theme-light` 类名 详尽说明请参考：`docs/config-provider-usage.md`

## 属性

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `custom-style` / `customStyle` | 自定义根节点样式 | `string \| Record<string, any>` | - |
| `custom-class` / `customClass` | 自定义根节点样式类 | `string` | `''` |
| `dark-mode` / `darkMode` | 主题风格，可选值：- 'light': 强制亮色模式（默认） - 'dark': 强制暗黑模式 - 'auto': 自动跟随系统设置 | `DarkMode`（`auto`｜`light`｜`dark`） | - |
| `current-theme` / `currentTheme` | 当前主题名称（用于多主题切换） | `string` | - |
| `themes` | 自定义主题列表 | `Theme[]` | - |
| `locales` | 国际化配置：传入 locale 列表（数组）并可指定默认语言 currentLocale | `any[]` | - |
| `current-locale` / `currentLocale` | 当前语言名称，需与 locales 中某一项的 name 匹配 | `string` | - |

## 双向绑定（v-model）

该组件无双向绑定。

## 事件

| 事件 | 回调参数 | 说明 |
| --- | --- | --- |
| `@theme-change` | - | 切换主题时触发，返回当前主题名 |
| `@mode-change` | - | 切换明暗模式时触发，返回当前模式 |

## 插槽

| 插槽名 | 说明 |
| --- | --- |
| `default` | - |
