# 03 页面样式 UCSS 与主题

## 基本形态

页面样式写在页面文件的 `<style lang="scss">`（前提是按 `spec/01` 在 `uni.scss` 接入主题变量：加密版粘贴 `theme.scss` 的 `$u-*` 变量块，源码版 `@import theme.scss`；接入后 `$u-*` 变量全项目可用）：

```vue
<style lang="scss">
.page {
    display: flex;
    flex-direction: column;
    min-height: 100vh; /* 见下方单位红线 */
    background-color: $u-bg-color;
}
</style>
```

| 规则 | 说明 |
|---|---|
| scoped | 页面自身元素用不用 scoped 均可；但**通过 `custom-class` 传进组件内部节点、期望命中的样式类，建议写在非 scoped 页面样式中**（scoped 的作用域属性在部分平台可能不命中组件内部节点） |
| 类名 | 语义化命名（如 `search-page`、`search-item`），条件态用同前缀修饰类（如 `search-item--last`） |
| 静态样式 | 尽量写进 class；只有动态值（随数据/主题变化）才用 `:style` |

## UCSS 选择器与属性红线

| 红线 | 说明 |
|---|---|
| 选择器只用 class | App 端（UCSS）仅支持 **class 选择器**与 `page` 选择器；不要用标签选择器、ID、属性选择器、通配符、伪元素。后代 class 选择器（`.a .b`）可用 |
| `display` 只用 flex / none | App 端不支持 `block` / `inline` / `inline-block`；横向排列用默认 flex（row），纵向须显式 `flex-direction: column` |
| 文字属性只放 `<text>` | `font-size` / `color` / `font-weight` / `line-height` 只有写在 `<text>` 上才生效；写在 `<view>` 上不会被内部文字继承（不是「无效告警」而是确实不生效） |
| 单位 | `px` / `rpx` / `%` 均可，等比布局推荐 `rpx`；**`vh` / `vw` 不要用于 App 端**（用 `flex: 1` 或 `100%` 替代） |
| 多值简写 | `padding: 0 20px`、`margin: 12px 15px 0` 等多值简写可用 |
| 边框 | `border: 1px solid $u-border-color` / `border-bottom: 1px solid $u-border-color` 可用；细线场景优先用组件自带 hairline 能力 |
| `lines: N` | **禁止使用**（非标准属性，App 编译告警且不生效）；文本省略用下方双轨写法 |

## 布局高频陷阱

| 陷阱 | 现象 | 修法 |
|---|---|---|
| 文本省略不生效 | H5 / 小程序端 `<text>` 默认 `flex-shrink: 0`，长文本不收缩、挤走相邻元素 | 文本节点 `flex-shrink: 1` + `min-width: 0`；相邻固定控件 `flex-shrink: 0` |
| 横向滚动容器塌陷 | 小程序端横向 `scroll-view` 子项被压扁 | 容器给显式 `width: 100%`；子项给固定宽度或 `flex-shrink: 0` |
| 纵向撑满屏幕 | App 端 `100vh` 不生效 | `/* #ifndef APP */ min-height: 100vh; /* #endif */` + `/* #ifdef APP */ flex: 1; /* #endif */`（父级需为 flex 容器且有高度） |
| 相邻元素被长文本挤压 | 尾部图标/按钮被推出可视区 | 固定尺寸元素显式 `flex-shrink: 0` |

## 文本省略（三端双轨，强制写法）

App 端省略由 `<text>` 原生属性 `max-lines` 承担；H5 / 小程序端 `max-lines` 不生效，必须用 `-webkit-line-clamp` CSS 补齐：

```vue
<text class="title-ellipsis" :max-lines="1">{{ title }}</text>
```

```scss
.title-ellipsis {
    /* #ifdef APP */
    /* App 端省略由 <text :max-lines> 原生承担，nowrap 兜底防换行 */
    white-space: nowrap;
    /* #endif */

    /* #ifndef APP */
    /* H5/小程序用 -webkit-line-clamp 裁切；H5 端 <text> 默认 flex-shrink:0，需显式允许收缩 */
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    flex-shrink: 1;
    /* #endif */
}
```

- 多行省略：模板 `:max-lines="2"`，样式 `-webkit-line-clamp: 2`，其余同上。
- 位于 flex 横向布局中的省略文本，务必再加 `min-width: 0`（末位固定元素加 `flex-shrink: 0`）。

## 主题取色

**原则：所有颜色取自主题体系，不硬编码色值**（否则暗黑模式与换肤失效）。

### 静态样式：`$u-*` SCSS 变量

| 组 | 变量 |
|---|---|
| 文字色 | `$u-main-color`（主文字）`$u-content-color`（常规）`$u-tips-color`（提示）`$u-light-color`（弱化） |
| 结构色 | `$u-border-color` `$u-divider-color` `$u-mask-color` `$u-shadow-color` |
| 基础色 | `$u-white-color` `$u-black-color` |
| 背景色 | `$u-bg-color`（页面底色）`$u-bg-white`（卡片白底）`$u-bg-gray-light` `$u-bg-gray-dark` `$u-bg-black` |
| 语义色 | `$u-type-primary` / `$u-type-success` / `$u-type-warning` / `$u-type-error` / `$u-type-info`，各有 `-dark` / `-disabled` / `-light` 变体（如 `$u-type-primary-light`） |

### 动态样式：运行时 `$u.color` 与工具

```uts
const boxStyle = computed((): UTSJSONObject => {
    const style = new UTSJSONObject()
    style['background-color'] = $u.color.primary
    return style
})
```

```vue
<view class="box" :style="boxStyle"></view>
```

`$u.color` 与 `$u-*` 变量同源（键为 camelCase，如 `$u.color.primaryLight`），随主题/暗黑切换实时更新（响应式）。

常用取色工具：

| 工具 | 用途 |
|---|---|
| `$u.getThemeColor('primary')` | 语义名 → 主题色值 |
| `$u.isThemeColor('primary')` | 判断是否语义名 |
| `$u.mixColor('#3c9cff', '#000000', 0.5)` | 按比例混色（如主色加深做渐变终点） |
| `$u.hexToRgba('#3c9cff', 0.2)` | 主题色半透明（底色、阴影等） |
| `$u.toStyle(obj)` | 样式对象 → 样式值（绑定 `:style` 用） |

## 暗黑模式与换肤

> 完整能力（主题注册四种形态、暗色板自动生成、跟随系统、App 原生联动、常见坑）见 [07-theme-dark-mode](07-theme-dark-mode.md)；本节为页面写法速览。

```uts
import { useTheme } from '@/uni_modules/uview-pro-x'

const { darkMode, setDarkMode, isInDarkMode, setTheme, themes } = useTheme()

setDarkMode('auto')   // 'auto' 跟随系统 | 'light' 强制亮色 | 'dark' 强制暗黑
setTheme('uviewpro')  // 切换到内置/自定义主题（列表见 themes）
```

**页面根节点绑定 `cssVars` 后，页面中的 `$u-*` 样式才会随主题 / 暗黑切换联动**：

```uts
const { cssVars } = useTheme()
const cssVarsStyle = computed(() => $u.toStyle(cssVars.value))
```

```vue
<view class="page" :style="cssVarsStyle">
    ...
</view>
```

- `ux-*` 组件内部样式已内置联动，无需处理；页面自定义样式只要用 `$u-*` 变量 + 根节点绑定 `cssVars` 即可联动。
- App 端原生页面背景/导航栏的系统级联动已由库内部处理（`uni.setAppTheme`）。
- 用户通过 `setDarkMode` / `setTheme` 的选择会自动持久化，下次启动自动恢复。

> 提示：演示/调试「跟随系统」时，需在系统设置里切换深色模式观察联动。

## 下一步

- 组件速查与示例：[04-component-usage](04-component-usage.md)
- 三端红线与症状速查：[05-cross-platform](05-cross-platform.md)
