# 04 组件使用与速查

## 使用方式

配置 easycom 后（见 `spec/01`），模板中直接使用 `<ux-*>`，无需 import 组件。组件库的 `$u`、hooks、类型从库入口导入：

```uts
import { $u, useTheme, useLocale, type TabbarItem } from '@/uni_modules/uview-pro-x'
```

### 通用属性约定

| 约定 | 写法 | 说明 |
|---|---|---|
| 自定义根节点样式类 | `custom-class="my-cls"` | 外部类，样式写在页面样式中（建议非 scoped，见 `spec/03`） |
| 自定义根节点样式 | `:custom-style="{ marginTop: '12px' }"` 或 `custom-style="margin-left: 12px;"` | 对象或 CSS 字符串两种形态均支持 |
| 语义色 | `type="primary"` / `color="primary"` | 传语义名（`primary` / `success` / `warning` / `error` / `info`）自动取当前主题色；也接受具体色值（`color="#ffffff"`） |
| 尺寸数字 | `size="18"` / `icon-size="22"` | 传数字按 `px` 处理；传字符串按原样使用（可带 `rpx` 等单位） |
| 布尔属性 | `closeable` / `:closeable="true"` | 裸写等价于 `true` |

大部分组件支持 `custom-class` / `custom-style` 两个通用属性；个别组件另有 `xxx-custom-style` 类属性（如 ux-popup 的 `mask-custom-style`，具体以组件文档/类型定义为准）。

## 组件速查表

### 基础

| 组件 | 说明 |
|---|---|
| `ux-icon` | 图标（内置图标集，`name` 传图标名） |
| `ux-image` | 图片（加载态/错误态占位） |
| `ux-button` | 按钮（`type` 语义色、`size`、`shape`、`text`/默认插槽） |
| `ux-cell-item` | 单元格（配合 `ux-cell-group`） |
| `ux-cell-group` | 单元格组 |
| `ux-badge` | 角标 |
| `ux-tag` | 标签 |
| `ux-text` | 文本（增强省略等能力） |
| `ux-avatar` | 头像 |

### 表单

| 组件 | 说明 |
|---|---|
| `ux-form` / `ux-form-item` | 表单 / 表单项（校验） |
| `ux-input` | 输入框 |
| `ux-textarea` | 文本域 |
| `ux-select` | 列选择器 |
| `ux-picker` | 选择器 |
| `ux-rate` | 评分 |
| `ux-search` | 搜索框 |
| `ux-number-box` | 步进器 |
| `ux-checkbox` / `ux-checkbox-group` | 复选框 / 复选框组 |
| `ux-radio` / `ux-radio-group` | 单选框 / 单选框组 |
| `ux-switch` | 开关 |
| `ux-slider` | 滑块 |
| `ux-keyboard` | 键盘 |
| `ux-number-keyboard` | 数字键盘 |
| `ux-car-keyboard` | 车牌键盘 |

### 数据展示

| 组件 | 说明 |
|---|---|
| `ux-line-progress` | 线型进度条 |
| `ux-circle-progress` | 环形进度条 |
| `ux-count-to` | 数字滚动 |
| `ux-count-down` | 倒计时 |
| `ux-swiper` | 轮播图 |

### 反馈

| 组件 | 说明 |
|---|---|
| `ux-action-sheet` | 操作菜单 |
| `ux-toast` | 提示框（`ref` 命令式调用） |
| `ux-notice-bar` | 通告栏 |
| `ux-column-notice` / `ux-row-notice` | 通告栏纵向/横向滚动子件（一般直接用 `ux-notice-bar`） |
| `ux-collapse` / `ux-collapse-item` | 折叠面板 / 面板项 |
| `ux-popup` | 弹窗（`v-model:show`） |
| `ux-swipe-action` | 滑动单元格 |
| `ux-modal` | 弹窗（确认/取消） |
| `ux-mask` | 遮罩层 |
| `ux-overlay` | 遮罩层（新） |
| `ux-loading` | 加载 |
| `ux-loadmore` | 加载更多 |
| `ux-empty` | 内容为空 |
| `ux-no-network` | 无网络 |
| `ux-alert-tips` | 警告提示条 |
| `ux-top-tips` | 顶部提示条 |

### 布局

| 组件 | 说明 |
|---|---|
| `ux-line` | 线条 |
| `ux-card` | 卡片 |
| `ux-grid` / `ux-grid-item` | 宫格 / 宫格项 |
| `ux-divider` | 分割线 |
| `ux-row` / `ux-col` | 栅格 行/列 |
| `ux-section` | 区块标题 |
| `ux-gap` | 间隔槽 |
| `ux-safe-bottom` | 底部安全区占位 |
| `ux-status-bar` | 状态栏占位 |

### 导航

| 组件 | 说明 |
|---|---|
| `ux-tabbar` | 标签栏 |
| `ux-back-top` | 返回顶部 |
| `ux-navbar` | 导航栏（含返回逻辑） |
| `ux-tabs` | 标签页 |
| `ux-subsection` | 分段器 |
| `ux-steps` / `ux-step` | 步骤条 / 步骤项 |
| `ux-link` | 链接 |
| `ux-pagination` | 分页 |

### 其他

| 组件 | 说明 |
|---|---|
| `ux-transition` | 过渡动画 |
| `ux-skeleton` | 骨架屏 |
| `ux-config-provider` | 配置容器（子树应用主题/暗黑/语言） |
| `ux-full-screen` | 全屏引导（升级提示弹窗） |

## `$u` 工具速查

从库入口导入：`import { $u } from '@/uni_modules/uview-pro-x'`。

### 状态与常量

| 键 | 说明 |
|---|---|
| `$u.color` | 当前主题色（响应式，随主题/暗黑切换更新） |
| `$u.zIndex` | 层级常量（浮层 z-index 参考值） |

### 常用函数

| 函数 | 用途 |
|---|---|
| `$u.addUnit(value, unit?)` | 数值加单位（不传单位默认补 px） |
| `$u.toStyle(...styles)` | 样式对象/字符串合并为样式值（绑定 `:style`） |
| `$u.getPxNum(value, totalWidth?)` | 数值/px/% 字符串转数字 px（百分比需传总宽） |
| `$u.toNumber(value)` | 安全转数字 |
| `$u.strOr(...values)` | 依次取第一个非空字符串（多重兜底） |
| `$u.trim(str, pos?)` | 去除空格（`both`/`left`/`right`/`all`） |
| `$u.mixColor(from, to, ratio)` | 按比例混色 |
| `$u.hexToRgba(hex, opacity?)` | 十六进制转 rgba |
| `$u.getThemeColor(type)` | 语义名 → 主题色值 |
| `$u.isThemeColor(type)` | 判断是否语义色名（如 primary / success） |
| `$u.splitCssProperty(css)` | 拆分样式对象为「文字属性 / 容器属性」两部分（配合 text/view 分别绑定） |
| `$u.formatNumber(num, decimals?, keepTrailingZeros?)` | 数字格式化（去/补尾零） |
| `$u.formatName(name)` | 姓名打码 |
| `$u.timeFormat(dateTime, fmt?)` | 时间格式化（默认 `yyyy-mm-dd`） |
| `$u.padZero(num, width?)` | 补零 |
| `$u.guid(len?, firstU?, radix?)` | 生成唯一 id（v-for key / canvas id） |
| `$u.debounce(fn, ...)` / `$u.throttle(fn, ...)` | 防抖 / 节流（返回可调用包装） |
| `$u.deepClone(obj)` / `$u.deepMerge(target, source)` | 深拷贝 / 深合并 |
| `$u.debugWarn(...)` | 调试输出（仅非生产环境生效） |
| `$u.test.*` | 校验谓词：`empty` / `null` / `array` / `object` / `func` / `string` / `email` / `mobile` / `url` / `number` / `digits` / `idCard` / `amount` / `chinese` / `letter` / `enOrNum` / `contains` / `range` / `rangeLength` / `landline` / `code` / `image` / `video` / `gradientColor` |

## hooks 速查

16 个 hooks 均从库入口导入。页面常用：

| hook | 签名与返回 | 用途 |
|---|---|---|
| `useTheme()` | → `{ themes, currentTheme, darkMode, cssVars, setTheme, setDarkMode, toggleDarkMode, isInDarkMode, getCurrentTheme, getAvailableThemes }` | 主题 / 暗黑模式 / CSS 变量（完整说明见 `spec/07`） |
| `useLocale(namespace?)` | → `{ t, currentLocale, locales, setLocale, getLocales, getCurrentLocale }` | 多语言（完整说明见 `spec/06`）；`t('key', { name: 'x' })` 支持 `{name}` 占位替换 |
| `useCountDown({ time, millisecond?, onChange?, onFinish? })` | → `{ current, start, pause, reset }` | 倒计时（已处理定时器清理与漂移） |
| `useSafeArea()` | → `{ top, bottom }`（ComputedRef\<number>，安全区插入距离 px） | 安全区适配 |
| `useWindowInfo()` | → `{ info, pixelRatio, screenWidth, screenHeight, ... }` | 窗口信息（状态栏高度等） |
| `useDebounce(delay?)` / `useThrottle(delay?)` | → `{ debounce(callback, debounceTime) }` / 节流同构 | 延迟执行包装 |
| `useRect()` | → `{ getRect(el) }` | 获取节点尺寸/位置（配合模板 ref） |

组件内部通用（页面层少用）：`useBEM`（BEM 类名）、`useConfig`、`usePopup`、`useTouch`、`useNotice`、`useStyle`、`useChildren`、`useParent`。

## 常用组合示例

### 按钮 / 图标 / 标签

```vue
<ux-button text="主要按钮" type="primary" @click="onClick" />
<ux-icon name="calendar-fill" size="18" color="#ffffff" custom-style="margin-left: 12px;" />
<ux-tag text="标签" type="success" />
```

### 单元格列表

```vue
<ux-cell-group title="分组标题">
    <ux-cell-item title="用户信息" value="内容" />
    <ux-cell-item icon="setting" icon-size="22" title="设置" />
    <ux-cell-item icon="file-text" title="用户协议" label="点击查看协议详情" />
</ux-cell-group>
```

### 弹窗（popup）

```vue
<ux-popup
    v-model:show="show"
    mode="center"
    width="70%"
    height="38%"
    :border-radius="12"
    :closeable="true"
    @closed="onClosed"
>
    <view class="popup-content">
        <text class="popup-title">标题</text>
    </view>
</ux-popup>
```

### 命令式提示（toast）

```vue
<ux-toast ref="toastRef" />
```

```uts
const toastRef = ref<any>()

function showSuccess(): void {
    toastRef.value?.show?.({
        title: '操作成功',
        type: 'success',
        duration: 2000
    })
}
```

## 下一步

- 三端红线与症状速查：[05-cross-platform](05-cross-platform.md)
