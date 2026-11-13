# 07 多主题与暗黑模式（useTheme）

> 覆盖：主题注册（四种形态）→ Theme 结构 → 暗色板自动生成 → 运行时切换与持久化 → 页面样式联动 → App 原生联动。

## 能力一览

| 能力 | 说明 |
|---|---|
| 单主题覆盖 | 只传要改的颜色 token，其余继承内置官方蓝 |
| 多主题 | 注册多套主题，运行时可切换（`setTheme`） |
| 暗黑模式 | `light` / `dark` / `auto`（跟随系统）三态，运行时可切换 |
| 暗色板自动生成 | 主题不传 `darkColor` 时按亮色自动推导暗色变体 |
| 页面联动 | 页面根节点绑定 `cssVars` 后，页面内 `$u-*` 样式随切换实时更新 |
| App 原生联动 | App 端自动调用 `uni.setAppTheme`，原生背景 / 导航栏跟随 |
| 持久化 | 主题与暗黑选择自动存本地，下次启动恢复 |
| 声明式联动 | `ux-config-provider` 的 `current-theme` / `dark-mode` prop 驱动 |

## 主题注册（main.uts）：四种形态

| 形态 | 传入 | 效果 |
|---|---|---|
| 不传 | — | 仅内置官方蓝（主题名 `uviewpro`） |
| 单主题覆盖 | `ThemeColor` 对象（如 `{ primary: '#7c3aed' }`） | 与内置官方蓝深合并生成单主题，**名称仍是 `uviewpro`**；不能带 `darkColor` / `css` / `darkCss`（见下节边界） |
| 多主题数组 | `Theme[]` | 列表即注册列表：内置主题不自动追加，只作同名项的基线（要保留官方蓝，数组里写 `{ name: BASE_THEME_NAME, color: {} }`） |
| 多主题 + 默认配置 | `{ themes: [...], defaultTheme?, defaultDarkMode?, isForce? }` | 在数组基础上设定默认主题 / 默认暗黑模式 / 是否忽略已保存选择 |

```ts
// 命名导入：加密版插件入口的 `export * from './index'` 不转发 default（见 spec/01）
import { uViewProX } from '@/uni_modules/uview-pro-x'
import themes from './theme.uts'    // Theme[]：自定义主题数组

app.use(uViewProX, {
    theme: themes                   // 形态一：多主题数组（列表 = 自定义主题；保留官方蓝需在数组里声明 { name: BASE_THEME_NAME, color: {} }）
})
```

```ts
app.use(uViewProX, {
    theme: {                        // 形态二：多主题 + 默认配置
        themes: themes,
        defaultTheme: 'purple',
        defaultDarkMode: 'auto',
        isForce: false              // true：忽略用户已保存的主题/模式选择
    }
})
```

```ts
app.use(uViewProX, {
    theme: {                        // 形态三：单主题覆盖（只改主色，其余继承官方蓝）
        primary: '#7c3aed',
        primaryDark: '#6d28d9'
    }
})
```

> 形态判定：无 `theme` → 内置；`Theme[]` 数组 → 多主题；对象含 `themes` 字段 → 多主题 + 默认配置；其余对象 → 单主题覆盖。

> 列表内同名主题「后传覆盖先传」，字段不跨项继承；基线字段（色板 / CSS 变量 / 文案）只来自内置同名项。

### 单主题覆盖的边界

`ThemeColor` 只有颜色令牌，**没有 `darkColor` / `css` / `darkCss` / `label` 字段**（`types/global.uts`）：

- 要精确控制暗色、注入额外 CSS 变量、或自定义展示名，**必须用数组形态** —— 只有一套主题也要写成 `[ { ... } ]`；
- 单主题形态下暗色只能由亮色推导（见下节），结构色（`bgColor` / `borderColor` / `mainColor` 等）固定取内置暗色基线；
- 单主题形态会把 `config.defaultTheme` 重置为 `uviewpro`，数组形态不会。

```ts
import { BASE_THEME_NAME } from '@/uni_modules/uview-pro-x'

// 只有一套主题、但要显式暗色：写成单元素数组
app.use(uViewProX, {
    theme: [
        {
            name: BASE_THEME_NAME,      // 用常量，别写死 'uviewpro'
            label: '品牌橙',            // 不写会继承基线的「默认蓝」
            color: { primary: '#ff5a1f', primaryLight: '#fff1eb' },
            darkColor: { primary: '#ff8a5c', primaryLight: '#4a2418', bgColor: '#141414' },
            css: { '--u-surface': '#ffffff' },
            darkCss: { '--u-surface': '#1a1a1a' }
        }
    ]
})
```

## Theme 结构

```ts
type Theme = {
    name: string            // 唯一标识：setTheme、持久化都用它
    label?: string          // 展示名（主题列表 UI 显示）
    description?: string    // 描述
    color: ThemeColor       // 亮色令牌（可只传部分字段，其余继承基线）
    darkColor?: ThemeColor  // 暗色令牌（不传自动生成，见下节）
    css?: UTSJSONObject     // 直接注入的 CSS 变量（亮色）
    darkCss?: UTSJSONObject // 直接注入的 CSS 变量（暗黑）
}
```

### ThemeColor token 全表（全部可选）

| 组 | token |
|---|---|
| 语义色（各 4 态） | `primary` / `primaryDark` / `primaryDisabled` / `primaryLight`；`success` / `warning` / `error` / `info` 同构各 4 态 |
| 文字色 | `mainColor` / `contentColor` / `tipsColor` / `lightColor` |
| 结构色 | `borderColor` / `dividerColor` / `maskColor` / `shadowColor` |
| 纯色 | `whiteColor` / `blackColor` |
| 背景色 | `bgColor` / `bgWhite` / `bgGrayLight` / `bgGrayDark` / `bgBlack` |

自定义主题只传要改的 token，其余字段自动继承基线调色板。

## 暗色板自动生成（不传 darkColor 时）

| token 类别 | 生成规则 |
|---|---|
| 结构色（`bgColor` `bgWhite` `bgGrayLight` `bgGrayDark` `bgBlack` `borderColor` `lightColor` `mainColor` `contentColor` `tipsColor` `whiteColor` `blackColor` `dividerColor` `maskColor` `shadowColor`） | 直接取内置暗色基线值 |
| 其余（语义色等） | 亮色值与内置暗色基线按 **0.6** 比例混合 |

传入 `darkColor` 时：**写出的字段优先**，未写出的字段仍按上述规则自动生成。暗色观感要求高时，显式传 `darkColor` 精确控制。

暗色最终取值顺序（同名基线项）：**用户 `darkColor` → 亮色推导值 → 基线暗色**（基线暗色只补未在 `color` 里声明过的 key）。

> 同名基线项的 `darkColor` 只补齐你没动的 token：在 `color` 里改过、又没写 `darkColor` 的 token，暗色按新亮色重新推导，不会退回基线色。

## useTheme API

```ts
import { useTheme } from '@/uni_modules/uview-pro-x'

const { themes, currentTheme, darkMode, cssVars,
        setTheme, setDarkMode, toggleDarkMode, isInDarkMode } = useTheme()
```

| 成员 | 类型 / 签名 | 说明 |
|---|---|---|
| `themes` | `Ref<Theme[]>` | 全部可用主题（传入的主题列表即最终列表，内置主题只作同名项基线；可直接渲染主题列表 UI） |
| `currentTheme` | `Ref<Theme \| null>` | 当前主题 |
| `darkMode` | `Ref<DarkMode>` | 当前模式设置：`'light'` / `'dark'` / `'auto'` |
| `cssVars` | `Ref<UTSJSONObject>` | 当前主题 + 模式的 CSS 变量表（绑页面根节点用） |
| `setTheme` | `(name: string) => void` | 切换主题并持久化；**主题名不存在时静默忽略**（不报错） |
| `setDarkMode` | `(mode: DarkMode) => void` | 切换亮 / 暗 / 自动并持久化 |
| `toggleDarkMode` | `() => void` | 在 `dark` 与 `light` 间切换（不经过 `auto`；当前为 `auto` 时切到 `dark`） |
| `isInDarkMode` | `() => boolean` | 当前实际是否暗色（`auto` 时读取系统主题） |
| `getAvailableThemes` | `() => Theme[]` | 非响应式取主题列表 |
| `getCurrentTheme` | `() => Theme \| null` | 非响应式取当前主题 |
| `getDarkMode` | `() => DarkMode` | 非响应式取模式设置 |

## 运行时切换（示例）

```ts
const { themes, currentTheme, setTheme, setDarkMode } = useTheme()

function onThemeTap(name: string): void {
    setTheme(name)      // 自动持久化
}

function onModeTap(mode: DarkMode): void {
    setDarkMode(mode)   // 'auto' | 'light' | 'dark'
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
| `'auto'` | 跟随系统：App 端读设备 `osTheme`；H5 / 小程序读 `hostTheme` |

- 系统主题变化监听由库内部注册（仅一次）：系统切暗色时自动重应用（仅 `'auto'` 模式）。
- App 原生联动：初始化与 `setDarkMode` 时自动调用 `uni.setAppTheme`，原生页面背景 / 导航栏随切换联动（避免闪白 / 闪黑）。
- 调试 `'auto'`：在系统设置里切换深色模式观察联动。

## 页面样式联动（根节点绑 cssVars）

主题 / 暗黑最终通过 CSS 变量（`--u-*` / `--u-type-*`）生效：`theme.scss` 在 `page` 层提供默认值，页面根节点绑定 `cssVars` 后由运行时注入覆盖：

```ts
import { $u, useTheme } from '@/uni_modules/uview-pro-x'

const { cssVars } = useTheme()
const cssVarsStyle = computed(() => $u.toStyle(cssVars.value))
```

```vue
<view class="page" :style="cssVarsStyle">
    <!-- 页面内容 -->
</view>
```

- `ux-*` 组件内部样式已内置联动，无需页面处理。
- 页面自定义样式使用 `$u-*` 变量（编译产物为 `var(--u-*)`）+ 根节点绑 `cssVars`，即可随主题 / 暗黑切换实时更新；漏绑则页面颜色停留在默认值。
- `cssVars` 含各 token 的 `-rgb` 变体与 `--u-theme-mode`（当前模式）。
- 取色原则（不硬编码色值）见 `spec/03`。

## 初始状态与持久化

| 状态 | 初始解析优先级 | 存储 key |
|---|---|---|
| 主题 | 已保存选择 → `defaultTheme` → 主题列表第一个 | `uview-pro-x-theme` |
| 暗黑模式 | 已保存选择 → `defaultDarkMode` → `'light'` | `uview-pro-x-dark-mode` |

`isForce: true` 时忽略已保存选择，强制使用 `defaultTheme` / `defaultDarkMode`。

未配置 `defaultDarkMode` 时默认 **`'light'`（强制亮色，不跟随系统）**；要跟随系统必须显式配 `'auto'`。

> `types/global.uts` 末尾的 `export const DarkMode: DarkMode = 'auto'` 是加密版类型占位常量，**不代表默认值**，业务代码不要引用。

## 声明式联动（ux-config-provider）

```vue
<ux-config-provider
    :current-theme="themeName"
    :dark-mode="modeName"
    @theme-change="onThemeChange"
    @mode-change="onModeChange"
>
    <!-- 子树内容 -->
</ux-config-provider>
```

- `current-theme` / `dark-mode` prop 变化驱动内部 `setTheme` / `setDarkMode`（`current-locale` 同构，见 `spec/06`）。
- 组件根节点自动下发 `cssVars`：子树内组件与 `$u-*` 样式直接联动，无需页面手动绑定。

## 常见坑

| 坑 | 根因 | 修法 |
|---|---|---|
| `setTheme('xxx')` 没反应 | 主题名不存在（静默忽略，不报错） | 用 `themes.value` 中的 `name` 精确匹配 |
| 页面颜色不随切换变 | 页面根节点未绑定 `cssVars` | 根节点 `:style="cssVarsStyle"`（见上节） |
| 暗黑下页面文字还是深色 | 页面样式硬编码了色值 | 改为 `$u-*` 变量或 `$u.color.*`（见 `spec/03`） |
| `toggleDarkMode` 回不到 `auto` | 设计如此：只在 `dark` / `light` 间切 | 需要 `auto` 时显式 `setDarkMode('auto')` |
| 自定义主题暗色观感不理想 | 语义色暗色变体是 0.6 混合的近似值 | 显式传 `darkColor` 精确控制 |
| 单主题形态写了 `darkColor` 不生效 | `ThemeColor` 无该字段，单主题分支只取亮色 | 改用单元素数组形态（见「单主题覆盖的边界」） |
| 数组里漏写 `name` 的主题项直接消失 | `mergeThemes` 丢弃 `name` 为空/缺失的项，不做隐式兜底 | 用 `BASE_THEME_NAME` 常量显式声明 |
| 改了色但 `-rgb` 变量没变 | 色值不是完整 6 位 hex（`rgba()`、`#abc`、颜色名均不可解析） | 统一写 `#rrggbb` |
| 单主题覆盖后主题名不可自定义 | 单主题覆盖合并进官方蓝，名称保持 `uviewpro` | 需要自定义主题名时改用「多主题数组」形态 |
| 重启后主题被重置 | `isForce: true` 忽略已保存选择 | 需要记忆用户选择时设为 `false` |

## 下一步

- 多语言国际化：[06-i18n-locale](06-i18n-locale.md)
- 样式与取色：[03-page-style-ucss](03-page-style-ucss.md)
- 组件与 hooks 速查：[04-component-usage](04-component-usage.md)
