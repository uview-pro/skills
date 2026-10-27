# 05 多端兼容与避错

> 本文服务**普通 uni-app**（`.vue` / TS / SCSS，`u-*` 组件）。uni-app x 的兼容规则（`APP`/`WEB` 宏体系、UCSS 限制等）不适用——识别到 `.uvue` / `UTSJSONObject` / `ux-*` 请改用 **uview-pro-x** 技能。

## 条件编译宏（权威清单）

普通 uni-app 可用平台宏（本库源码实测使用的如下）：

| 宏 | 命中平台 |
|---|---|
| `APP-PLUS` | App 全平台（Android / iOS，WebView 渲染）；**页面代码统一用此写法** |
| `APP-NVUE` | App 的 nvue 页面（原生渲染） |
| `APP-ANDROID` / `APP-IOS` / `APP-HARMONY` | App 细分平台（鸿蒙需新版 HBuilderX 编译） |
| `H5` | H5 |
| `MP` | 全部小程序 |
| `MP-WEIXIN` / `MP-ALIPAY` / `MP-TOUTIAO` / `MP-BAIDU` / `MP-QQ` / `MP-DINGTALK` | 指定小程序（本库内均见适配） |

> 本库源码中亦可见 `#ifdef APP`（新版编译器写法）；页面代码用 `APP-PLUS` 即可，两者等效。条件取反用 `#ifndef`，多平台用 `||` 连接（如 `#ifdef H5 || MP-WEIXIN`）。

三种位置均可条件编译，语法不同：

```vue
<!-- 模板：HTML 注释 -->
<!-- #ifdef H5 -->
<view>仅 H5 显示</view>
<!-- #endif -->

<script setup lang="ts">
// 脚本：行注释
// #ifdef APP-PLUS
console.log('仅 App 执行')
// #endif
</script>

<style lang="scss">
/* 样式：块注释 */
/* #ifndef MP */
margin-top: 20rpx;
/* #endif */
</style>
```

> SCSS 独立文件（如 `uni.scss`、`App.vue` 样式）中同样使用 `/* #ifdef */` 注释语法——本库 `index.scss` 即以该方式分平台引入样式文件。

一般原则：优先平台级宏（`APP-PLUS` / `MP` / `H5`），只在确需区分单一平台时才用细分宏；页面业务代码尽量少写条件编译，多端差异优先交给组件库处理。

## 多端红线速查

写页面时逐条自查（每条为「错误 → 正确」）：

| # | 场景 | ❌ 错误写法 | ✅ 正确写法 |
|---|---|---|---|
| 1 | 组件解析 | 未配 easycom 就写 `<u-button>` | pages.json 配 `^u-(.*)` 规则（见 `spec/01`；改后重启 HBuilderX） |
| 2 | 组件前缀 | `ux-button`（uni-app x 组件） | `u-button`（本库组件，`.vue` 页面） |
| 3 | v-model 通道 | 凭记忆写（如 `u-popup` 写 `v-model:show`） | 写前查卡片「双向绑定」一节（`u-popup` 用 `v-model`，`show` 为单向属性） |
| 4 | 样式取色 | 硬编码 `#2979ff` | `var(--u-*)` / `$u-*`（见 `spec/03`） |
| 5 | App.vue 样式 | 漏 `lang="scss"` | `<style lang="scss">`（`u-line-*` 等工具类编译依赖） |
| 6 | 自定义导航栏 | `u-navbar` 与原生导航栏同时显示 | pages.json 该页设 `"navigationStyle": "custom"`，二选一 |
| 7 | 底部导航 | 原生 tabBar 与 `u-tabbar` 同时开启 | 二选一（同时会出现两条） |
| 8 | 安全区 | 底部内容被 iPhone 指示条遮挡 | `u-safe-bottom` 组件或 `safe-area-inset-*` 工具类 |
| 9 | 页面传参 | 直接传对象：`route('/page', { item: obj })` | `encodeURIComponent(JSON.stringify(obj))` 传递，接收端反解（onLoad 的 query 全是字符串） |
| 10 | 页面资源清理 | 卸载不清理定时器 / `uni.$on` | 在 `onUnload` 中 `clearInterval` / `uni.$off` |
| 11 | 小程序包体积 | 依赖大量原子类也不在意 | 体积敏感时手写必要样式（`common.scss` 原子类全量引入，见 `spec/03`） |
| 12 | H5 宽屏 | 直接依赖 rpx 自适应 PC 大屏 | H5 端 rpx 有最大换算宽度（默认按 960px 上限），可用 manifest.json 的 `h5.rpxCalcMaxDeviceWidth` 调整 |
| 13 | nvue 页面（仅项目启用时） | 在 nvue 页面写 Web 全量样式 | nvue 遵循原生渲染规则（flex 布局、文字放 `<text>`）；组件库已为 nvue 适配，页面自身样式需从简 |

## 症状 → 修法速查

| 症状 | 根因 | 修法 |
|---|---|---|
| `<u-xxx>` 未解析、控制台报组件找不到 | easycom 未配置 / 规则写错 | 按 `spec/01` 配置（注意放在 `custom` 内，改后重启） |
| `$u` 未定义 / `this.$u` 为 undefined | 未注册库（install 未执行） | `main.ts` 中 `app.use(uViewPro)`（见 `spec/01`） |
| `$u-main-color` 等 SCSS 变量编译报错 | `uni.scss` 未引入 theme.scss | 按 `spec/01` 接入样式 |
| 控制台提示「需要在 App.vue 的 style 标签加 lang=scss」 | `App.vue` 的 `<style>` 漏配 | 补 `lang="scss"`（见 `spec/03`） |
| `custom-class` 样式不生效 | 类写在 scoped 样式中 | 写非 scoped 页面样式或用 `:deep()`（见 `spec/03`） |
| 换主题 / 暗黑模式后自定义区域颜色不变 | 该处硬编码了色值 | 改为 `var(--u-*)` 取色（见 `spec/03`） |
| 图标不显示 / 显示方块 | `name` 传了不存在的图标名 | 使用内置图标名；图标字体随库分发，无需额外配置 |
| 弹窗被 tabbar 等元素遮挡 | 层级冲突 | 参考 `$u.zIndex` 常量调整（见 `spec/04`） |
| 小程序 toast 长文案显示不全 | 原生 toast 带图标时有字数限制 | 长文案用 `$u.toast('...')`（默认无图标模式）或 `useToast()` |
| `onLoad` 收到 `"[object Object]"` | 直接传了对象参数 | 见红线 #9，序列化后传递 |
| H5 刷新页面 404 | history 路由模式服务器未配置重写 | 配置服务器 rewrite，或改用 hash 模式 |
| H5 请求跨域失败 | 浏览器同源策略 | 本地用 devServer 代理；线上配 CORS 或同域反代 |

## 平台差异提醒

- **导航栏**：自定义导航栏用 `u-navbar`（含状态栏占位与返回逻辑），对应页面 pages.json 设 `navigationStyle: "custom"`；不需要自定义时保留原生导航栏即可。
- **安全区 / 状态栏**：底部用 `u-safe-bottom`，顶部用 `u-status-bar` 或 `u-navbar`（已处理）；这些占位组件在非刘海机型上退化为 0，无需分端判断。
- **nvue**：库对 nvue 有完整适配（`APP-NVUE` 条件编译与分平台样式），无需页面侧额外处理；仅当项目自身写 nvue 页面时需遵循 nvue 渲染限制。
- **鸿蒙**：库覆盖鸿蒙端（`APP-HARMONY` 条件编译分流窗口信息获取），使用新版 HBuilderX 编译即可。
- **小程序**：微信 / 支付宝 / 头条 / 百度 / QQ / 钉钉的差异库内已用条件编译抹平；页面侧主要注意包体积与各小程序原生 API 能力差异。
- **H5**：注意 rpx 宽屏换算上限、history 路由的服务器配置、跨域处理；暗黑模式在 H5 端可跟随系统（`matchMedia`，见 `spec/07`）。

## 收尾自查清单

1. 接入层：easycom / 库注册 / 样式三件齐备（见 `spec/01`），组件统一 `u-` 前缀
2. 脚本：`$u` 从库入口导入或 `uni.$u`；页面生命周期从 `@dcloudio/uni-app` 导入且顶层同步注册（见 `spec/02`）
3. 模板：动态属性用 `:attr`；`v-model` 通道逐一核对卡片（尤其 `u-popup` 不支持 `v-model:show`）
4. 样式：无硬编码色值；`App.vue` 有 `lang="scss"`；`custom-class` 可命中（见 `spec/03`）
5. 边界：未混入 uni-app x 写法（无 `ux-*` / `.uvue` / `UTSJSONObject`；那是 uview-pro-x 技能域）
6. 目标平台实跑：App / H5 / 小程序至少各跑一遍目标页面，控制台无报错、样式无错位
