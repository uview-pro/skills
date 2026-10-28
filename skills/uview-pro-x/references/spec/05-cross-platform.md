# 05 三端兼容与避错

## 条件编译宏（权威清单）

uni-app x 可用平台宏：

| 宏 | 命中平台 |
|---|---|
| `APP` | App 全平台（Android / iOS / HarmonyOS） |
| `APP-ANDROID` / `APP-IOS` / `APP-HARMONY` | 指定 App 平台 |
| `MP` | 全部小程序 |
| `MP-WEIXIN` 等 | 指定小程序 |
| `WEB` | H5 |

**禁止**：

- 使用旧宏 `APP-PLUS`（uni-app x 中无效）
- 用 `#ifndef APP-NVUE` 表达「非 App」（nvue 概念不适用于 uni-app x）→ 应写 `#ifndef APP`

三处均可条件编译，语法不同：

```vue
<!-- 模板 -->
<!-- #ifdef APP -->
<scroll-view>...</scroll-view>
<!-- #endif -->

<script setup lang="uts">
// 脚本
// #ifdef MP
onPageScroll((e) => { scrollTop.value = e.scrollTop });
// #endif
</script>

<style lang="scss">
/* 样式 */
/* #ifndef APP */
min-height: 100vh;
/* #endif */
/* #ifdef APP */
flex: 1;
/* #endif */
</style>
```

一般场景优先用平台级宏（`APP` / `MP` / `WEB`）；仅当确实只针对单一平台时才用细分宏。需要多平台时用 `||` 组合（如 `#ifdef MP-WEIXIN || MP-BAIDU`）。

## 三端红线速查

写页面时逐条自查；每条红线对应「错误 → 正确」：

| # | 场景 | ❌ 错误写法 | ✅ 正确写法 |
|---|---|---|---|
| 1 | 文字样式 | 在 `<view>` 上写 `font-size` / `color` / `font-weight` / `line-height` | 写到 `<text>` 上（或直接使用 `ux-text`） |
| 2 | display | `display: block` / `inline` / `inline-block` | App 端仅支持 `flex` / `none`；纵向用 `flex-direction: column` |
| 3 | 满屏高度 | 直接写 `min-height: 100vh` | `/* #ifndef APP */ 100vh /* #endif */` + `/* #ifdef APP */ flex: 1 /* #endif */` |
| 4 | 滚动监听 | App 端使用 `onPageScroll` | App 端包 `<scroll-view @scroll>`；`onPageScroll` 只在 H5/小程序生效 |
| 5 | 空值 | `undefined` | `null` 或 `''` |
| 6 | 条件判断 | `if (list)` 真值判断 | `if (list != null)` 等显式布尔表达式 |
| 7 | 数组读取 | `arr[i]` 无边界判断 | `if (i >= 0 && i < arr.length)` 后再读 |
| 8 | v-for 子项动态绑定 | 绑定中读取源数组（`list.length` 等） | 派生字段落到数据层（`item.last`），模板只读 item 自身 |
| 9 | 数字/字符串转换 | `Number(x)` / `String(x)` | `parseInt(x)` / `$u.toNumber(x)` / `x.toString()` |
| 10 | 定时器 | `let t` 无类型；销毁不清理 | `let t: number \| null = null`；`onUnload` 中 `clearTimeout(t!)` |
| 11 | watch getter | `watch(() => x.value, ...)` | `watch((): boolean => x.value, (v: boolean) => ...)`（显式类型） |
| 12 | 多行省略 | 样式写 `lines: 2` | `<text :max-lines="2">` + `#ifndef APP` 写 `-webkit-line-clamp`（见 `spec/03`） |
| 13 | 选择器 | 标签 / ID / 属性 / 通配选择器 | 仅 class 选择器（App 端 UCSS 限制） |
| 14 | 对象字面量 | 内联类型 `let u: { name: string }` | `type User = {...}` 后再用 |
| 15 | 双向绑定 | `v-model:model-value="x"` | 默认模型 `v-model="x"`；命名模型 `v-model:show="x"` |
| 16 | 动态属性 | `title="{{ x }}"` | `:title="x"` |
| 17 | 页面主题联动 | 页面根节点未绑定 `cssVars` | 根节点 `:style="cssVarsStyle"`（见 `spec/03`） |
| 18 | custom-class 样式 | 写在 scoped 样式中 | 写非 scoped 页面样式，确保命中组件内部节点 |

## 症状 → 修法速查

| 症状 | 根因 | 修法 |
|---|---|---|
| App 端文字大小/颜色不生效 | 样式写在了 `<view>` 上 | 移到 `<text>` |
| App 端布局错乱、元素挤在一行 | `display`/`flex-direction` 使用不当 | `display: flex` + 显式 `flex-direction` |
| App 端省略号不出现 | 只写了 CSS `line-clamp` | 补 `<text :max-lines>`（双轨写法） |
| H5 / 小程序端省略号不出现 | 只写了 `max-lines` | 补 `#ifndef APP` 的 `-webkit-line-clamp` 一套 |
| 长文本挤走相邻图标/按钮 | 文本节点未允许收缩 | 文本 `flex-shrink: 1` + `min-width: 0`；相邻元素 `flex-shrink: 0` |
| App 端满屏高度失效 | 用了 `100vh` | 条件编译改用 `flex: 1`（父级需为 flex 且有高度） |
| App 端滚动监听不触发 | 用了 `onPageScroll` | 改用 `<scroll-view @scroll>`（见 recipe-page-scroll） |
| 编译报错：条件表达式不是布尔 | 真值判断 | 改显式比较（`!= null` / `== true`） |
| 编译告警 possibly null | 可空类型未收窄 | 判空分支或非空断言 `!` |
| 编译报错：类型不匹配 | string/number 混用 | `$u.toNumber` / `toString()` / `as` 断言 |
| 运行崩溃（偶发、原生层） | v-for 子项动态绑定读源数组 | 派生字段落数据层 |
| 数组相关运行异常 | 越界读取 | 边界判断；v-for index 传参 `as number` |
| 传给组件的 `custom-class` 样式不生效 | 类写在 scoped 样式里 | 移到非 scoped 页面样式 |
| 模板里 `<ux-xxx>` 未解析/报错 | easycom 未配置 | pages.json 增加 `^ux-(.*)` 规则（见 `spec/01`） |
| 主题/暗黑切换后页面自定义颜色不联动 | 页面根节点未绑定 `cssVars` | 根节点 `:style="cssVarsStyle"` |
| 全项目 `$u-xxx` SCSS 变量编译报错 | `uni.scss` 未接入主题变量 | 加密版把 `theme.scss` 的 `$u-*` 变量块复制进 `uni.scss`；源码版追加 `@import '@/uni_modules/uview-pro-x/theme.scss';`（见 `spec/01`） |
| H5 底部出现两条导航栏 | 原生 tabBar 与自绘 `ux-tabbar` 同时显示 | 检查 pages.json 的 tabBar 配置，二者只保留一种方案 |
| 图标不显示 | `name` 传了不存在的图标名 | 使用内置图标名 |

## 平台差异提醒

- **导航栏**：自定义导航栏（`ux-navbar`）需在 pages.json 该页 style 中设 `"navigationStyle": "custom"`；否则使用原生导航栏，不要两者叠加。
- **安全区 / 状态栏**：底部用 `ux-safe-bottom` 占位或 `useSafeArea().bottom`；顶部用 `ux-status-bar` 或 `useWindowInfo().statusBarHeight`。
- **回退按钮**：`ux-navbar` 内部已处理返回逻辑（`uni.navigateBack()`），页面无需自行绑定返回事件。
- **App 端原生主题联动**：`setDarkMode` 后库内部会同步 App 原生页面背景/导航栏（`uni.setAppTheme`），页面样式联动仍需 `cssVars` 绑定。
- **字体图标**：内置图标集随组件库分发，三端无需额外配置。

## 收尾自查清单

1. 脚本：无 `undefined`、无真值判断、无 `Number()/String()`、定时器已清理、watch getter 有显式类型
2. 模板：动态属性全部 `:attr`、`v-model` 形式正确、v-for 有 `:key`、子项绑定不读源数组
3. 样式：文字属性在 `<text>`、无 vh/vw（App）、省略走双轨、用 `$u-*` 取色、custom-class 类非 scoped
4. 三端各跑一遍目标页面：App / H5 / 小程序均无编译报错与运行报错
