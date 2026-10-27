# 07 多主题与暗黑模式（useTheme）

> 覆盖：主题注册（四种形态）→ Theme / ThemeColor 结构 → 暗色板自动生成 → useTheme API → CSS 变量注入双通道（H5 document 注入 / 非 H5 组件承载）→ 跟随系统 → 持久化与常见坑。

## 能力一览

| 能力 | 说明 |
|---|---|
| 单主题覆盖 | 只传要改的颜色 token，其余继承内置默认蓝 |
| 多主题 | 注册多套主题，运行时可切换（`setTheme`） |
| 暗黑模式 | `light` / `dark` / `auto`（跟随系统）三态，运行时可切换 |
| 暗色板自动生成 | 主题不传 `darkColor` 时按亮色自动推导暗色变体 |
| CSS 变量注入 | H5 注入 `document`；非 H5 由 `<u-config-provider>` 根节点承载（见下文「注入机制」） |
| 持久化 | 主题与暗黑选择自动存本地，下次启动恢复 |

## 主题注册（main.ts）：四种形态

| 形态 | 传入 | 效果 |
|---|---|---|
| 不传 | — | 仅内置默认蓝（主题名 `uviewpro`） |
| 单主题覆盖 | `ThemeColor` 对象（如 `{ primary: '#7c3aed' }`） | 与内置默认蓝合并生成主题，**名称仍是 `uviewpro`** |
| 多主题数组 | `Theme[]` | 与内置默认蓝合并（同名覆盖），构成初始主题列表 |
| 多主题 + 默认配置 | `{ themes, defaultTheme?, defaultDarkMode?, isForce? }` | 在数组基础上设定默认主题 / 默认暗黑模式 / 是否忽略已保存选择 |

```ts
import uViewPro from 'uview-pro'
import themes from './theme'   // Theme[]：自定义主题数组

app.use(uViewPro, {
    theme: themes               // 形态一：多主题数组（列表 = 内置默认蓝 + 自定义主题）
})
```

```ts
app.use(uViewPro, {
    theme: {                    // 形态二：多主题 + 默认配置
        themes: themes,
        defaultTheme: 'purple',
        defaultDarkMode: 'auto',
        isForce: false          // true：忽略用户已保存的主题/模式选择
    }
})
```

```ts
app.use(uViewPro, {
    theme: {                    // 形态三：单主题覆盖（只改主色，其余继承默认蓝）
        primary: '#7c3aed',
        primaryDark: '#6d28d9'
    }
})
```

> 形态判定：无 `theme` → 内置；`Theme[]` 数组 → 多主题；对象含 `themes` 字段 → 多主题 + 默认配置；其余对象 → 单主题覆盖。

## Theme 结构

```ts
type Theme = {
    name: string            // 唯一标识：setTheme、持久化都用它
    label?: string          // 展示名（主题列表 UI 显示）
    description?: string    // 描述
    color: ThemeColor       // 亮色令牌（可只传部分字段，其余继承基线）
    darkColor?: ThemeColor  // 暗色令牌（不传自动生成，见下节）
    css?: Record<string, string>      // 直接注入的 CSS 变量（亮色）
    darkCss?: Record<string, string>  // 直接注入的 CSS 变量（暗黑）
}

type DarkMode = 'auto' | 'light' | 'dark'
```

### ThemeColor token 全表（全部可选）

| 组 | token |
|---|---|
| 语义色（各 4 态） | `primary` / `primaryDark` / `primaryDisabled` / `primaryLight`；`success` / `warning` / `error` / `info` 同构各 4 态 |
| 背景色 | `bgColor` / `bgWhite` / `bgGrayLight` / `bgGrayDark` / `bgBlack` |
| 文字色 | `mainColor` / `contentColor` / `tipsColor` / `lightColor` |
| 结构色 | `borderColor` / `dividerColor` / `maskColor` / `shadowColor` |
| 纯色 | `whiteColor` / `blackColor` |

自定义主题只传要改的 token，其余字段自动继承基线调色板。

## 暗色板自动生成（不传 darkColor 时）

| token 类别 | 生成规则 |
|---|---|
| 结构色（背景 / 文字 / 边框 / 遮罩等） | 直接取内置暗色基线值 |
| 其余（语义色等） | 亮色值与内置暗色基线按 **0.6** 比例混合 |

传入 `darkColor` 时：**写出的字段优先**，未写出的字段仍按上述规则自动生成。暗色观感要求高时，显式传 `darkColor` 精确控制。

## useTheme API

```ts
import { useTheme } from 'uview-pro'

const { themes, currentTheme, darkMode, cssVars,
        setTheme, setDarkMode, toggleDarkMode, isInDarkMode } = useTheme()
```

| 成员 | 类型 / 签名 | 说明 |
|---|---|---|
| `themes` | `Ref<Theme[]>` | 全部可用主题（可直接渲染主题列表 UI） |
| `currentTheme` | `Ref<Theme \| null>` | 当前主题 |
| `darkMode` | `Ref<DarkMode>` | 当前模式设置：`'light'` / `'dark'` / `'auto'` |
| `cssVars` | `Ref<Record<string, string>>` | 当前主题 + 模式的 CSS 变量表 |
| `setTheme` | `(name: string) => void` | 切换主题并持久化；**主题名不存在时静默忽略**（仅控制台 warn，不报错） |
| `setDarkMode` | `(mode: DarkMode) => void` | 切换亮 / 暗 / 自动并持久化 |
| `toggleDarkMode` | `() => void` | 在 `dark` 与 `light` 间切换（不经过 `auto`） |
| `isInDarkMode` | `() => boolean` | 当前实际是否暗色（`auto` 时读系统主题） |
| `getAvailableThemes` | `() => Theme[]` | 非响应式取主题列表 |
| `getCurrentTheme` | `() => Theme \| null` | 非响应式取当前主题 |
| `getDarkMode` | `() => DarkMode` | 非响应式取模式设置 |
| `initTheme` | `(themes?, defaultConfig?, isForce?) => void` | 初始化主题系统（入口处使用；一般由 install 自动调用） |
| `initDarkMode` | `(mode?, isForce?) => void` | 初始化暗黑模式（一般由 initTheme 内部调用） |

## 运行时切换（示例）

```ts
const { themes, setTheme, setDarkMode } = useTheme()

function onThemeTap(name: string) {
    setTheme(name)      // 自动持久化
}
function onModeTap(mode: 'light' | 'dark' | 'auto') {
    setDarkMode(mode)   // 自动持久化
}
```

```vue
<view v-for="th in themes" :key="th.name" @click="onThemeTap(th.name)">
    <text>{{ th.label }}</text>
</view>
```

## 暗黑模式与跟随系统

| 值 | 行为 |
|---|---|
| `'light'` | 强制亮色 |
| `'dark'` | 强制暗黑 |
| `'auto'` | 跟随系统 |

- 系统主题监听由库内部自动注册（仅一次）；**仅 `auto` 模式下系统切换才会触发重新应用**（手动设为 `light` / `dark` 后，系统变化不影响页面）。
- 各端系统主题读取：H5 用 `matchMedia('(prefers-color-scheme: dark)')`；支持 `uni.onThemeChange` 的平台用它响应变化；**App 平台库内以 5 秒轮询兜底**（`uni.onThemeChange` 在 App 平台未生效）——即 App 上 `auto` 模式在系统切换深色后最多约有 5 秒延迟。
- 调试 `'auto'`：在系统设置里切换深色模式观察联动。

## CSS 变量注入机制（关键）

主题 / 暗黑最终通过 CSS 变量（`--u-*` / `--u-type-*`）生效，注入分两条通道：

| 平台 | 机制 | 说明 |
|---|---|---|
| H5 | `document.documentElement` 注入 | `applyTheme` 时自动写入全局，并加 `u-theme-dark` / `u-theme-light` 类名与 `data-u-theme-mode` 属性；H5 端不做任何包裹也能全局生效 |
| 非 H5（App / 小程序等） | JS 无 `document` | 由 `<u-config-provider>` 根节点把 `cssVars` 内联到 `:style`（`$u.toStyle(cssVars)`）承载 |

→ **非 H5 端必须让页面处于 `<u-config-provider>` 包裹内**，否则组件与页面里的 `var(--u-*)` 停留在编译时默认值，切换主题 / 暗黑不生效。

推荐接法（三选一）：

1. **CLI（Vite）项目**：接入 `vite-plugin-uni-root`，在 `App.root.vue` 中用 `u-config-provider` 包裹 `<slot />`，所有页面自动获得承载（配置方法见 `spec/01` 第六步）。官方示例：

```vue
<script setup lang="ts">
import { useTheme, useLocale } from 'uview-pro'

const { darkMode, themes, currentTheme } = useTheme()
const { currentLocale } = useLocale()
</script>

<template>
    <u-config-provider
        :dark-mode="darkMode"
        :themes="themes"
        :current-theme="currentTheme?.name"
        :current-locale="currentLocale?.name"
    >
        <slot />
        <u-toast global></u-toast>
        <u-modal global></u-modal>
    </u-config-provider>
</template>
```

2. **非 CLI 或按需**：在页面根部手动用 `<u-config-provider>` 包裹页面内容（作用同构；一页一个即可，避免多层嵌套）。

3. **页面级最小接入**：页面根节点手动绑定 `cssVars`（机制与 `u-config-provider` 相同——把变量内联到渲染树，页面级等效）：

```ts
import { computed } from 'vue'
import { $u, useTheme } from 'uview-pro'

const { cssVars } = useTheme()
const cssVarsStyle = computed(() => $u.toStyle(cssVars.value))
```

```vue
<view class="page" :style="cssVarsStyle">
    <!-- 页面内容 -->
</view>
```

> 完整页面骨架见配方 `references/recipes/recipe-page-scaffold.md`。

## 声明式联动（u-config-provider）

| 属性 | 说明 | 类型 | 默认值 |
|---|---|---|---|
| `custom-style` / `customStyle` | 自定义根节点样式 | `string \| Record<string, any>` | - |
| `custom-class` / `customClass` | 自定义根节点样式类 | `string` | `''` |
| `dark-mode` / `darkMode` | 主题风格：`light` / `dark` / `auto` | `DarkMode` | - |
| `current-theme` / `currentTheme` | 当前主题名称（多主题切换） | `string` | - |
| `themes` | 自定义主题列表 | `Theme[]` | - |
| `locales` | 语言包列表（见 `spec/06`） | `any[]` | - |
| `current-locale` / `currentLocale` | 当前语言名称，需与 locales 中某项的 name 匹配 | `string` | - |

| 事件 | 回调参数 | 说明 |
|---|---|---|
| `@theme-change` | 当前主题名 | 切换主题时触发 |
| `@mode-change` | 当前模式 | 切换明暗模式时触发 |

- `current-theme` / `dark-mode` prop 变化会驱动内部 `setTheme` / `setDarkMode`（可在 `App.root.vue` 中用响应式 ref 驱动，见上）。
- 挂载时若主题系统尚未初始化则执行初始化（传了 `themes` 用它，否则用内置默认）；已初始化时仅在 prop 与当前值不同时切换，不覆盖用户设置。

## 运行期改色：$u.setColor

```ts
import { $u } from 'uview-pro'

$u.setColor({ primary: '#7c3aed' })   // 运行期调整当前主题颜色（不持久化，重启恢复）
```

- 将传入 token 合入当前主题**当前生效模式**的颜色集（暗色模式合入 `darkColor`，否则合入 `color`）并立即重新应用；
- **不写入持久化存储**，适合调试 / 演示；需要持久化、可回切的多套配色 → 用主题形态注册 + `setTheme`。

## 初始状态与持久化

| 状态 | 初始解析优先级 | 存储 key |
|---|---|---|
| 主题 | 已保存选择 → `defaultTheme` → 主题列表第一个 | `uview-pro-theme` |
| 暗黑模式 | 已保存选择 → `defaultDarkMode` → `'light'` | `uview-pro-dark-mode` |

- `isForce: true` 时忽略已保存选择，强制使用 `defaultTheme` / `defaultDarkMode`。
- 已保存的主题名若不在注册列表中（如主题被移除）→ 依次回退 `defaultTheme` → 列表第一个。

## 常见坑

| 坑 | 根因 | 修法 |
|---|---|---|
| `setTheme('xxx')` 没反应 | 主题名不存在（仅 warn，不报错） | 用 `themes` 里的 `name` 精确匹配 |
| 非 H5 端颜色不随切换变 | 页面未被 `<u-config-provider>` 包裹（非 H5 无 document 注入通道） | 接入 `vite-plugin-uni-root` 或手动包裹（见「注入机制」） |
| 暗黑下页面文字还是深色 | 页面样式硬编码了色值 | 改用 `var(--u-*)` / `$u-*` 变量（见 `spec/03`） |
| `toggleDarkMode` 回不到 `auto` | 设计如此：只在 `dark` / `light` 间切 | 需要 `auto` 时显式 `setDarkMode('auto')` |
| App 上系统切深色后要等几秒 | App 以 5s 轮询兜底 | 已知行为；需即时切换就手动 `setDarkMode` |
| 自定义主题暗色观感不理想 | 语义色暗色变体是 0.6 混合的近似值 | 显式传 `darkColor` 精确控制 |
| 单主题覆盖后主题名不可自定义 | 单主题覆盖合并进内置默认蓝，名称保持 `uviewpro` | 需要自定义主题名时改用「多主题数组」形态 |
| 重启后主题被重置 | `isForce: true` 忽略已保存选择 | 需要记忆用户选择时设为 `false` |

## 下一步

- 页面脚手架配方：[recipe-page-scaffold](../recipes/recipe-page-scaffold.md)
- 安装接入：[01-install-and-setup](01-install-and-setup.md)
- 样式与取色：[03-page-style-scss](03-page-style-scss.md)
- 多语言：[06-i18n-locale](06-i18n-locale.md)
