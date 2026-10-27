# 03 页面样式 SCSS 与主题取色

## 单位规范

- **rpx**：设计稿 750px 宽度下的自适应单位（`750rpx` = 屏幕宽度），布局尺寸首选；
- **px**：字体、细边框（1px / 0.5px）、不随屏幕缩放的元素；
- 换算：设计稿 375px 宽度时 `1px(设计稿) = 2rpx`；
- JS 中需要带单位值时用 `$u.addUnit(30)`（数字→rpx 字符串）或 `$u.addUnit('30px')`。

## 取色三通道（不硬编码颜色）

**页面样式（SCSS）里取色只走前两通道**，这是多主题与暗黑模式生效的前提：

| 通道 | 写法 | 适用场景 |
|---|---|---|
| CSS 变量 | `color: var(--u-type-primary)` | **推荐**：运行时主题切换/暗黑模式自动生效 |
| SCSS 变量 | `color: $u-type-primary` | 等价可用（编译后即 `var(--u-*)`）；适合需要参与 SCSS 运算的场景 |
| JS 取值 | `$u.color.primary` / `$u.getColor('primary')` | 脚本中需要色值（如 canvas、动态 style 对象） |

⚠️ **禁止硬编码色值**（`#2979ff`、`rgba(41,121,255,.5)` 等）——主题切换与暗黑模式下这些颜色不会跟随变化。

JS 中如需半透明色，用 rgb 通道变量拼接（CSS 内）：`rgba(var(--u-type-primary-rgb), 0.5)`。

## 主题变量全表

以下变量由 `uni.scss` 引入 `theme.scss` 后全局可用（CSS 变量 + `$u-` 前缀 SCSS 镜像各一套，值相同）：

### 字体色 / 边框色 / 遮罩

| SCSS 变量 | CSS 变量 | 默认值 | 用途 |
|---|---|---|---|
| `$u-main-color` | `--u-main-color` | `#303133` | 主要文字 |
| `$u-content-color` | `--u-content-color` | `#606266` | 常规文字 |
| `$u-tips-color` | `--u-tips-color` | `#909399` | 提示文字 |
| `$u-light-color` | `--u-light-color` | `#c0c4cc` | 占位/次要文字 |
| `$u-border-color` | `--u-border-color` | `#dcdfe6` | 边框 |
| `$u-divider-color` | `--u-divider-color` | `#e4e7ed` | 分割线 |
| `$u-mask-color` | `--u-mask-color` | `rgba(0,0,0,.4)` | 遮罩 |
| `$u-shadow-color` | `--u-shadow-color` | `rgba(0,0,0,.1)` | 阴影 |

### 背景色 / 纯色

| SCSS 变量 | CSS 变量 | 默认值 | 用途 |
|---|---|---|---|
| `$u-bg-color` | `--u-bg-color` | `#f3f4f6` | 页面背景 |
| `$u-bg-white` | `--u-bg-white` | `#ffffff` | 卡片/弹层背景 |
| `$u-bg-gray-light` | `--u-bg-gray-light` | `#f1f1f1` | 浅灰背景 |
| `$u-bg-gray-dark` | `--u-bg-gray-dark` | `#2f343c` | 深灰背景 |
| `$u-bg-black` | `--u-bg-black` | `#000000` | 黑底 |
| `$u-white-color` | `--u-white-color` | `#ffffff` | 纯白 |
| `$u-black-color` | `--u-black-color` | `#000000` | 纯黑 |

### 语义色（5 组 × 4 态）

`primary` / `success` / `warning` / `error` / `info`，每组四态：**基色、`-dark`（按下）、`-disabled`（禁用）、`-light`（浅底）**：

| 组 | 基色 | -dark | -disabled | -light |
|---|---|---|---|---|
| warning | `#ff9900` | `#f29100` | `#fcbd71` | `#fdf6ec` |
| success | `#19be6b` | `#18b566` | `#71d5a1` | `#dbf1e1` |
| error | `#fa3534` | `#dd6161` | `#fab6b6` | `#fef0f0` |
| info | `#909399` | `#82848a` | `#c8c9cc` | `#f4f4f5` |
| primary | `#2979ff` | `#2b85e4` | `#a0cfff` | `#ecf5ff` |

- CSS 变量名：`--u-type-primary`、`--u-type-primary-dark`、`--u-type-primary-disabled`、`--u-type-primary-light`（其余组同理）；
- 每组另有 `<组>-rgb` 通道变量（如 `--u-type-primary-rgb: 41, 121, 255`），供 `rgba(var(--u-type-primary-rgb), 0.2)` 拼接透明色；
- SCSS 变量名：`$u-type-primary` 等（warning/success/error/info 组同规则）。

> 以上默认值来自内置「默认蓝」主题；换主题或切暗黑后，**CSS 变量值会在运行时被自动改写**，而 `$u-*` SCSS 变量编译后即 `var(--u-*)`，因此两者都会跟随切换。

## 全局工具类（`index.scss` 引入后可用）

`App.vue` 引入 `index.scss` 后（见 `spec/01` 第四步），全项目可直接使用以下工具类：

### 布局

| 类名 | 效果 |
|---|---|
| `u-flex` / `u-flex-col` | flex 行 / 列（已含 `align-items: center`） |
| `u-flex-wrap` / `u-flex-nowrap` | 换行 / 不换行 |
| `u-col-center` / `u-col-top` / `u-col-bottom` | 交叉轴对齐 |
| `u-row-center` / `u-row-left` / `u-row-right` / `u-row-between` / `u-row-around` | 主轴对齐 |
| `u-flex-0` ~ `u-flex-12` | `flex: n` 等分 |
| `u-relative` / `u-absolute` | 定位 |

### 字体与间距

| 类名 | 效果 |
|---|---|
| `u-font-xs/sm/md/lg/xl` | 22 / 26 / 28 / 30 / 34 rpx |
| `u-font-9` ~ `u-font-40` | 9-19 为 px，20-40 为 rpx |
| `u-m-{n}` / `u-margin-{n}` | margin n rpx（n 为 0-80 偶数或 5 的倍数） |
| `u-p-{n}` / `u-padding-{n}` | padding 同上 |
| `u-m-l-{n}` / `u-p-t-{n}` 等 | 四方向缩写（l/t/r/b）与全称（left/top/right/bottom） |
| `u-text-left` / `u-text-center` / `u-text-right` | 文本对齐 |

### 文本与色彩

| 类名 | 效果 |
|---|---|
| `u-line-1` ~ `u-line-5` | 超出行数自动省略（1 行 nowrap，多行 line-clamp） |
| `u-line-force` | 强制多行省略容器 |
| `u-type-primary` 等 | 语义色文字（`-dark/-disabled/-light` 后缀同） |
| `u-type-primary-bg` 等 | 语义色背景 |
| `u-main-color` / `u-content-color` / `u-tips-color` / `u-light-color` | 字体色类 |
| `u-hidden` | opacity:0 + visibility:hidden |

### 其他

| 类名 | 效果 |
|---|---|
| `safe-area-inset-top/right/bottom/left` | iPhone 刘海屏安全区 padding |
| `u-border` / `u-border-top` / `u-border-bottom` / `u-border-left` / `u-border-right` | 1px 细边框（伪元素实现） |
| `u-hover-class` / `u-cell-hover` | 点击反馈态 |
| `u-icon-wrap` | 图标垂直居中容器 |

## 组件样式定制：`custom-class` / `custom-style`

多数组件提供 `custom-class` / `custom-style` 两个 props（查卡片首行确认）：

```vue
<u-button text="按钮" custom-class="my-btn" :custom-style="{ marginTop: '24rpx' }" />

<style lang="scss" scoped>
/* scoped 下需穿透到组件根节点 */
.my-btn {
    :deep(.u-btn) { border-radius: 40rpx; }
}
</style>
```

- `custom-style` 对象/字符串均可；动态值用 `$u.toStyle(...)` 合并（见 `spec/02`）；
- 组件内部类名为 `u-*` 前缀（如 `.u-btn`），scoped 样式需 `:deep()` 穿透；优先用组件 props（`bg-color`、`color` 等）而不是覆写类名。

## 暗黑模式下的页面样式

页面样式只要**全部经 `var(--u-*)` 取色**，暗黑模式切换时无需写任何额外代码——CSS 变量会被运行时改写，颜色自动跟随。

需要针对暗黑手工写差异样式时（少见），使用暗黑标记类：

```scss
/* 页面根节点加 u-theme-dark 时生效（u-config-provider 包裹或全局 page 级标记） */
.page.u-theme-dark {
    .banner { background: var(--u-bg-gray-dark); }
}
```

> 挂载机制、`data-u-theme-mode` H5 标记、CSS 变量注入时机等完整机制见 `spec/07`。

## scoped 与选择器注意事项

- 页面样式建议 `scoped`；需要覆盖组件内部样式时用 `:deep()`；
- 不要用标签选择器给 `view/text/image` 写全局样式（小程序与 nvue 兼容性差）；
- 小程序端包体积敏感：`common.scss` 生成了大量间距/字号原子类，介意体积时优先手写必要样式。

## 常见问题

| 症状 | 原因 / 修法 |
|---|---|
| `$u-main-color` 编译报未定义 | `uni.scss` 未引 `theme.scss`（见 `spec/01`） |
| 控制台提示「需要在 App.vue 的 style 标签加上 lang="scss"」 | `App.vue` 的 `<style>` 漏配 `lang="scss"`；`u-line-*` 等工具类无法编译 |
| 暗黑模式下自定义区域颜色不变 | 该处写了硬编码色值；改为 `var(--u-*)` |
| `custom-style` 不生效 | 对象未绑定（漏 `:`）；或写在了不支持该 prop 的组件上（查卡片） |
| scoped 里写 `.u-btn` 不生效 | 需 `:deep(.u-btn)` 穿透 |
| 单行省略在小程序失效 | 用 `u-line-1` 工具类（已含多端兼容处理），不要手写 `-webkit-line-clamp` |
