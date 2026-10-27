# 04 组件使用与速查

## 使用方式

配置 easycom 后（见 `spec/01`），模板中直接使用 `<u-*>`，无需 import。`$u`、hooks、http 及类型从库入口导入：

```ts
// npm 安装
import { $u, useToast, useTheme, http } from 'uview-pro'
// uni_modules 安装（路径换成 @/uni_modules/uview-pro，后文示例同此约定）
import { $u, useToast, useTheme, http } from '@/uni_modules/uview-pro'
```

> 注册后 `$u` 同时挂在 `uni.$u` 与 `app.config.globalProperties.$u` 上（见 `spec/01`），也可以直接写 `uni.$u.xxx`。

### 通用属性约定

| 约定 | 写法 | 说明 |
|---|---|---|
| 自定义根节点类 | `custom-class="my-cls"` | 样式写在页面 `<style>` 中（scoped 需 `:deep()`，见 `spec/03`） |
| 自定义根节点样式 | `:custom-style="{ marginTop: '24rpx' }"` 或 `custom-style="margin-top: 24rpx;"` | 对象/字符串均可；动态合并用 `$u.toStyle(...)` |
| 语义色 | `type="primary"` / `color="primary"` | 传语义名自动取当前主题色；也接受具体色值 |
| 属性名拼写 | `:icon-size="22"` 与 `:iconSize="22"` 等价 | 卡片中形如 `icon-size / iconSize` 即两种写法都支持 |
| 布尔属性 | `closeable`（等价 `:closeable="true"`） | 裸写即为 true |
| v-model 通道 | **各组件不同，写前查卡片「双向绑定」一节** | 如 `u-popup` 走 `v-model`（modelValue 通道），**不支持** `v-model:show` |

## 场景选型表

> 全量 99 个组件的分类索引（含说明、v-model 通道、事件数）见 `references/api/README.md`。选定组件后，**动手前**查对应卡片 `references/api/u-<name>.md`，核对属性/取值/事件/插槽。

### 基础展示

| 场景 | 组件 |
|---|---|
| 图标（内置图标集） | `u-icon` |
| 图片（加载态/错误态占位） | `u-image` |
| 头像（可叠角标） | `u-avatar` + `u-badge` |
| 标签 / 徽标 | `u-tag` / `u-badge` |
| 文本增强（拨号/格式化/超链接） | `u-text` |
| 按钮 | `u-button` |
| 列表单元格 | `u-cell-group` + `u-cell-item` |

### 表单录入

| 场景 | 组件 |
|---|---|
| 输入框 / 文本域 | `u-input` / `u-textarea` |
| 表单校验 | `u-form` + `u-form-item`（配 `u-input` 等） |
| 开关 / 滑块 / 步进器 | `u-switch` / `u-slider` / `u-number-box` |
| 单选 / 多选 / 评分 | `u-radio-group`+`u-radio` / `u-checkbox-group`+`u-checkbox` / `u-rate` |
| 搜索框 | `u-search` |
| 单列/多列/联动选择 | `u-select` |
| 时间 / 地区选择 | `u-picker`；三级城市 `u-city-select`；日历 `u-calendar` |
| 自定义键盘 | `u-number-keyboard` / `u-car-keyboard` / `u-keyboard` |
| 短信验证码场景 | `u-verification-code`（提示语）+ `u-message-input`（输入位） |
| 文件上传（图片/视频/文档） | `u-upload` |
| 表单项集成（输入/选择混合） | `u-field` |

### 数据展示

| 场景 | 组件 |
|---|---|
| 线型 / 环形进度 | `u-line-progress` / `u-circle-progress` |
| 倒计时 / 数字滚动 | `u-count-down` / `u-count-to` |
| 轮播 | `u-swiper` |
| 瀑布流 | `u-waterfall` |
| 表格 | `u-table` + `u-tr` / `u-th` / `u-td` |
| 索引列表 | `u-index-list` + `u-index-anchor` |
| 图片懒加载 | `u-lazy-load` |
| 时间轴 | `u-time-line` + `u-time-line-item` |

### 反馈提示

| 场景 | 组件 |
|---|---|
| 轻提示 | `u-toast`（或函数式 `useToast()`，见下） |
| 模态确认框 | `u-modal`（或函数式 `useModal()`） |
| 底部操作菜单 | `u-action-sheet` + `u-action-sheet-item` |
| 通告栏（滚动） | `u-notice-bar` |
| 折叠面板 | `u-collapse` + `u-collapse-item` |
| 左滑操作（删除等） | `u-swipe-action` |
| 加载中 | `u-loading` / `u-loading-popup` |
| 加载更多 | `u-loadmore` |
| 空状态 | `u-empty` |
| 骨架屏 | `u-skeleton` |
| 警告提示条 | `u-alert-tips` |
| 顶部提示条 | `u-top-tips` |
| 长文折叠展开 | `u-read-more` |
| 断网提示 | `u-no-network` |
| 弹层容器 / 遮罩 | `u-popup` / `u-mask` |

### 布局

| 场景 | 组件 |
|---|---|
| 卡片 | `u-card` |
| 12 栅格 | `u-row` + `u-col` |
| 宫格 | `u-grid` + `u-grid-item` |
| 分割线 / 线条 | `u-divider` / `u-line` |
| 区块标题 | `u-section` |
| 间隔块 | `u-gap` |
| 吸顶 | `u-sticky` |
| 底部安全区 / 状态栏占位 | `u-safe-bottom` / `u-status-bar` |

### 导航

| 场景 | 组件 |
|---|---|
| 自定义导航栏 | `u-navbar` |
| 标签页 / 标签+滑块联动 | `u-tabs` / `u-tabs-swiper` |
| 分段器 | `u-subsection` |
| 步骤条 | `u-steps` + `u-step` |
| 下拉菜单 | `u-dropdown` + `u-dropdown-item` |
| 分页 | `u-pagination` |
| 返回顶部 | `u-back-top` |
| 底部导航栏 | `u-tabbar` |
| 可拖拽悬浮按钮 | `u-fab` |
| 超链接（多端行为自动处理） | `u-link` |

### 其他

| 场景 | 组件 |
|---|---|
| 子树主题/语言配置容器 | `u-config-provider` |
| 统一过渡动画 | `u-transition` |
| 头像裁剪 | `u-avatar-cropper` |
| 浮层根传送 | `u-root-portal` |
| App 全屏升级提示 | `u-full-screen` |

## `$u` 工具速查

从库入口导入：`import { $u } from 'uview-pro'`（或 `uni.$u`）。

### 校验 `$u.test.*`（29 个谓词，返回 boolean）

`email` / `mobile` / `url` / `date` / `dateISO` / `number` / `digits` / `idCard` / `carNo` / `amount` / `chinese` / `letter` / `enOrNum` / `contains` / `range` / `rangeLength` / `empty`（另名 `isEmpty`）/ `jsonString` / `landline` / `object` / `array` / `code` / `func` / `promise` / `video` / `image` / `regExp` / `string`

```ts
$u.test.mobile('13800000000')        // true
$u.test.empty('  ')                  // true（纯空白视为空）
$u.test.rangeLength('abc', [2, 5])   // true（长度在 [min, max]）
```

### 时间

| 函数 | 说明 |
|---|---|
| `$u.timeFormat(dateTime, fmt?)` | 格式化时间；`dateTime` 支持时间戳（秒/毫秒）/Date/null，`fmt` 默认 `'yyyy-mm-dd'`（注意 `M` 是分钟、`m` 是月） |
| `$u.date(...)` | `timeFormat` 的另名，用法相同 |
| `$u.timeFrom(dateTime, format?)` | "多久以前"（5 分钟内"刚刚"）；超过 30 天返回 `format` 格式化结果（`format: false` 时返回"x个月前/年前"） |
| `$u.sleep(ms)` | 延时 Promise（默认 30ms），`await $u.sleep(200)` |

### 颜色

| 函数 | 说明 |
|---|---|
| `$u.color` | 当前主题全部颜色 token 对象（非响应式快照式读取；**脚本中动态取色优先用 `useColor()`**，见下文） |
| `$u.getColor(name)` / `$u.setColor(name, value)` | 读取 / 更新主题色 |
| `$u.colorGradient(start, end, step)` | 两色间渐变数组（默认 step 10） |
| `$u.hexToRgb(hex, str?)` / `$u.rgbToHex(rgb)` | 颜色格式互转 |
| `$u.colorToRgba(color, alpha?)` | 转 rgba 字符串（alpha 默认 0.3） |

> 页面样式中的取色仍以 `var(--u-*)` / `$u-*` 为准（见 `spec/03`）；JS 动态色值才走本组函数。

### 单位与样式

| 函数 | 说明 |
|---|---|
| `$u.addUnit(value, unit?)` | 加单位，默认 `rpx`；已有单位/`auto` 原样返回；支持空格分隔多值（`'10 20'` → `'10rpx 20rpx'`） |
| `$u.toStyle(...styles)` | 样式对象/字符串合并为样式字符串（绑定 `:style`） |
| `$u.addStyle(style, target?)` | 样式字符串与对象互转（`target` 为 `'object'`/`'string'`） |
| `$u.kebabCase(word)` | 驼峰 → 短横线 |
| `$u.trim(str, pos?)` | 去空格，`pos`：`both`（默认）/`left`/`right`/`all` |

### 数据与标识

| 函数 | 说明 |
|---|---|
| `$u.deepClone(obj)` / `$u.deepMerge(target, source)` | 深拷贝 / 深合并（返回合并结果） |
| `$u.guid(len?, firstU?, radix?)` | 唯一 id（默认 32 位、首字母 `u`）；v-for key、canvas id 等场景 |
| `$u.random(min, max)` / `$u.randomArray(arr)` | 随机数 / 打乱数组 |
| `$u.formatPrice(num, decimals?, decimalPoint?, thousandsSeparator?)` | 金额格式化（千分位、小数位） |
| `$u.formatName(name)` | 姓名脱敏（`张三` → `张*`） |
| `$u.queryParams(data, isPrefix?, arrayFormat?)` | 对象转 URL 参数串（默认带 `?`；数组格式 `indices`/`brackets`/`repeat`/`comma`） |

### 系统与节点

| 函数 | 说明 |
|---|---|
| `$u.sys()` | 等同 `uni.getSystemInfoSync()` |
| `$u.os()` | 平台字符串：`'ios'` / `'android'` / ... |
| `$u.clipboard(text, options?)` | 复制到剪贴板（H5/非 H5 自动分派，默认带成功提示） |
| `$u.getRect(selector, instance?, all?)` | 获取节点位置尺寸（Promise；配 `useRect()` 更省事） |
| `$u.$parent(name)` / `$u.getParent(name)` | 向上查找父组件实例（组件层用，页面一般不用） |
| `$u.type2icon(type)` | 语义类型 → 图标名 |

### 路由

`$u.route` 对 `uni.navigateTo` 等做了统一封装，自带参数拼接与拦截器：

```ts
$u.route('/pages/detail/detail', { id: 1 })            // 默认 navigateTo，对象参数自动拼 query
$u.route({ type: 'redirect', url: '/pages/login/login' })
$u.route({ type: 'tab', url: '/pages/home/home' })     // 跳 tabBar 页
$u.route({ type: 'back', delta: 2 })                   // 返回 2 层
```

| `type` 别名 | 对应 uni API |
|---|---|
| `navigateTo` / `to` | `uni.navigateTo` |
| `redirectTo` / `redirect` | `uni.redirectTo` |
| `switchTab` / `tab` | `uni.switchTab` |
| `reLaunch` / `launch` | `uni.reLaunch` |
| `navigateBack` / `back` | `uni.navigateBack`（`delta` 控制层数） |

- 全局拦截：`uni.$u.routeIntercept = (config, resolve) => { resolve(true) }`，`resolve(false)` 中止跳转。

### 消息、事件与杂项

| 成员 | 说明 |
|---|---|
| `$u.toast(title, option?)` | 轻量提示（对 `uni.showToast` 封装）；`option` 可为时长毫秒（默认 1500）/图标名/对象 `{ icon, duration }` |
| `$u.debounce(func, wait?, immediate?)` | 防抖：**调用即触发**风格（不返回包装函数），`wait` 默认 500，`immediate` 默认 false |
| `$u.throttle(func, wait?, immediate?)` | 节流：同样为"调用即触发"风格，`immediate` 默认 **true** |
| `$u.mitt` | 全局事件总线实例：`emit` / `on` / `off` / `clear` |
| `$u.config` | 响应式全局配置：`v`/`version`/`type`/`defaultTheme`/`defaultDarkMode`/`defaultLocale`/`debugMode` |
| `$u.zIndex` | 层级常量（toast 10090 / popup 10075 / mask 10070 / tabbar 998 / navbar 980 等） |
| `$u.http` | 全局请求实例（见下文「HTTP 请求」） |

> ⚠️ `debounce` / `throttle` 是"调用时注册延时执行"的形态，直接传函数引用不会工作：
>
> ```ts
> // ✅ 正确：每次输入都调用 $u.debounce（内部会重置计时）
> function onInput(e: any) {
>     $u.debounce(() => { doSearch(e.detail.value) }, 500)
> }
> // ❌ 错误：这样只是取出函数，不会注册计时
> const fn = $u.debounce
> ```

## hooks 速查

均从库入口导入。页面常用：

| hook | 签名与返回 | 用途 |
|---|---|---|
| `useTheme()` | → `{ currentTheme, themes, darkMode, cssVars, initTheme, setTheme, getCurrentTheme, getAvailableThemes, initDarkMode, getDarkMode, setDarkMode, isInDarkMode, toggleDarkMode }` | 主题 / 暗黑模式（完整说明见 `spec/07`） |
| `useLocale()` | → `{ currentLocale, locales, t, setLocale, getLocales, getCurrentLocale, initLocales }` | 多语言（完整说明见 `spec/06`） |
| `useColor()` | → `{ color, getColor(name) }`（均响应式，主题/暗黑切换自动更新） | 脚本中动态取主题色 |
| `useToast(options?)` | → `{ show, close, success, error, warning, info, loading }` | 函数式轻提示（见下文「函数式调用」） |
| `useModal(options?)` | → `{ show, confirm, close, clearLoading }` | 函数式模态框 |
| `useRect(selector?, all?)` | → `{ rect, getRect(selector?, delay?), refresh(selector?, delay?) }` | 读取节点位置尺寸（响应式 `rect`） |
| `useDebounce(delay?)` | → `{ debounce(callback, time?) }` | 包装式防抖（回调式见 `$u.debounce`） |
| `useThrottle(delay?)` | → `{ throttle(callback, time?) }` | 包装式节流 |

组件层用（页面一般不用）：`useEmitter(name)`（`{ dispatch, broadcast }` 跨组件通信）、`useCompRelation`（组件关系）。

路由跳转统一用 `$u.route`（`useRouter` 未随库入口导出，不要依赖）。

## 函数式调用（Toast / Modal）

`useToast` / `useModal` 通过全局事件驱动，**需要页面上有承接实例**才生效：

```vue
<!-- App.vue：应用级承接（推荐，全应用一处即可） -->
<u-toast global />
<u-modal global />
```

```vue
<!-- 或页面级承接：页面内放置，配合 useToast(false) / useModal(false) -->
<u-toast page />
<u-modal page />
```

```ts
import { useToast, useModal } from 'uview-pro'

const toast = useToast()      // 默认应用级（对应 <u-toast global />）
const modal = useModal()      // 默认应用级（对应 <u-modal global />）

toast.success('保存成功')
toast.loading('提交中...')     // loading 默认常驻（duration 0），需 toast.close() 关闭
toast.close()

modal.confirm({
    title: '提示',
    content: '确认删除这条记录吗？',
    onConfirm: () => { doDelete() }
})
modal.clearLoading()          // 配合 showLoading 态使用
```

选项细节（可传字符串或对象）：

- `toast.show('文本')`；对象字段：`title`、`type`（`success`/`warning`/`error`/...）、`duration`、`icon`、`position`（`top`/`center`/`bottom`）、`loading`；
- `modal.show('内容')`；`modal.confirm({ title, content, showCancelButton, showConfirmButton, onConfirm, onCancel })`，`confirm` 默认显示取消+确认按钮；
- 页面级调用：`useToast(false)` / `useToast({ page: true })`；多页面并存时 `useToast({ page: 'pageId' })` 对应 `<u-toast page="pageId" />`。

> 轻量场景也可以 `$u.toast('提示文本')`（内部是 `uni.showToast` 封装，不依赖承接实例）。
> 使用 `vite-plugin-uni-root`（见 `spec/01`）时，全局承接实例会被自动包裹挂载，无需手工放置。

## HTTP 请求

库内置请求封装（`Request` 类 + 全局单例 `http`），从库入口导入：

```ts
import { http, httpPlugin } from 'uview-pro'

interface UserItem { id: number; name: string }
const res = await http.get<{ list: UserItem[] }>('/user/list', { page: 1 })
```

### `http` 实例方法

| 方法 | 签名 |
|---|---|
| `http.request<T>(options)` | 完整请求：`{ url, method, data, header, meta, ... }` |
| `http.get<T>(url, data?, options?)` | GET；`options` 为 `{ header?, meta? }` |
| `http.post<T>(url, data?, options?)` | POST |
| `http.put<T>(url, data?, options?)` | PUT |
| `http.delete<T>(url, data?, options?)` | DELETE |

### 全局配置与拦截器

建议在 `main.ts` 一次性配置（`baseUrl`、统一请求头、拦截器）：

```ts
// main.ts
import { httpPlugin } from 'uview-pro'

app.use(httpPlugin, {
    requestConfig: {
        baseUrl: 'https://api.example.com',
        header: { 'Content-Type': 'application/json' },
        timeout: 30000
    },
    interceptor: {
        request: (options) => {
            options.header.Authorization = `Bearer ${token}`
            return options        // 返回 false 可整体取消本次请求
        },
        response: (response) => {
            if (response.code !== 0) return false   // 返回 false 走 reject
            return response
        }
    }
})
```

默认配置与 `meta`：

| 配置 | 默认 | 说明 |
|---|---|---|
| `baseUrl` | `''` | 全局域名；相对 `url` 会自动拼接 |
| `header` | `{}` | 默认请求头（与单次请求头深合并） |
| `method` | `'POST'` | 默认方法（get/post 等快捷方法显式覆盖） |
| `timeout` | `60000` | 超时毫秒 |
| `meta.originalData` | `true` | `true`：拦截器/回调收到完整响应对象（含 `statusCode`）；`false`：`statusCode === 200` 时直接返回 `response.data` |
| `meta.toast` | `false` | 出错是否弹提示（开关透传给拦截器，由拦截器实现） |
| `meta.loading` | `false` | 是否显示加载中（同上，由拦截器实现） |

调用示例（关闭原始数据模式）：

```ts
const data = await http.get<{ list: UserItem[] }>('/user/list', { page: 1 }, {
    meta: { originalData: false }
})
```

> 简单场景也可直接用 `uni.request`；但项目内统一走 `http` 封装，才能让 `baseUrl`/拦截器一次配置全局生效。

## 常用组合示例

### 单元格列表

```vue
<template>
    <u-cell-group>
        <u-cell-item icon="integral-fill" title="会员等级" value="新版本" @click="onCell" />
        <u-cell-item title="系统设置" :arrow="false" label="版本与通知" />
    </u-cell-group>
</template>
```

### 居中弹窗

```vue
<template>
    <u-button text="打开弹窗" type="primary" @click="show = true" />

    <u-popup v-model="show" mode="center" :border-radius="16" closeable>
        <view class="u-p-40">
            <text class="u-main-color">弹窗内容</text>
        </view>
    </u-popup>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const show = ref(false)
</script>
```

> `u-popup` 走 `v-model`（modelValue 通道），`show` 属性是单向的，**不支持** `v-model:show`。

### 函数式提示 + 请求

```ts
import { http, useToast } from 'uview-pro'

const toast = useToast()

async function submit(form: Record<string, any>) {
    toast.loading('提交中...')
    try {
        await http.post('/user/save', form, { meta: { originalData: false } })
        toast.close()
        toast.success('保存成功')
    } catch (e) {
        toast.close()
        toast.error('保存失败，请重试')
    }
}
```

## 下一步

- 多端兼容红线与症状速查：[05-cross-platform](05-cross-platform.md)
