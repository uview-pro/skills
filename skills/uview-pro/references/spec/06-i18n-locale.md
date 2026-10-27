# 06 多语言国际化（i18n）

## 内置语言包

库内置两套语言包，**开箱即用、无需任何配置**：`zh-CN`（简体中文）、`en-US`（英文）。语言包结构：

```ts
export default {
    name: 'zh-CN',        // 语言唯一标识（setLocale / 注册合并均按 name）
    label: '简体中文',     // 展示名（做语言选择器时直接可用）
    locale: 'zh-Hans',    // 语言习惯标识（可传给 uni.setLocale 等原生能力）
    uModal: { title: '提示', confirmText: '确认', cancelText: '取消' },
    uCalendar: { /* ... */ },
    // ...
}
```

内置语言包覆盖 **19 个命名空间**的组件内置文案（组件内部通过 `useLocale()` 读取，切换语言即联动）：

| 命名空间 | 覆盖组件 | 示例 key |
|---|---|---|
| `uActionSheet` | u-action-sheet | `cancelText` |
| `uUpload` | u-upload | `uploadText` / `overSize` / `deleteConfirm` |
| `uVerificationCode` | u-verification-code | `startText` / `changeText` / `endText` |
| `uSection` | u-section | `subTitle` |
| `uSelect` | u-select | `cancelText` / `confirmText` |
| `uSearch` | u-search | `placeholder` / `actionText` |
| `uNoNetwork` | u-no-network | `tips` / `retry` / `connected` |
| `uReadMore` | u-read-more | `closeText` / `openText` |
| `uPagination` | u-pagination | `prevText` / `nextText` |
| `uPicker` | u-picker | `cancelText` / `confirmText` |
| `uModal` | u-modal | `title` / `content` / `confirmText` / `cancelText` |
| `uLoadmore` | u-loadmore | `loadmore` / `loading` / `nomore` |
| `uLink` | u-link | `mpTips` |
| `uKeyboard` | u-keyboard | `cancelText` / `confirmText` / `number` / `idCard` / `plate` |
| `uInput` | u-input | `placeholder` |
| `uCalendar` | u-calendar | `startText` / `year` / `month` / `sun`~`sat` / `holiday` 等 |
| `uEmpty` | u-empty | 各场景（`car` / `search` / `order` / ...） |
| `uCountDown` | u-count-down | `day` / `hour` / `minute` / `second` |
| `uFullScreen` | u-full-screen | `title` / `upgrade` |

## 注册与默认语言

### install 选项（推荐）

```ts
import uViewPro from 'uview-pro'
import myZhCN from './locale/my-zh-CN'

// 1) 直接指定默认语言（使用内置语言包）
app.use(uViewPro, { locale: 'zh-CN' })

// 2) 传入语言包列表（与内置按 name 合并，见下）
app.use(uViewPro, { locale: [myZhCN] })

// 3) 完整形态：默认语言 + 强制开关
app.use(uViewPro, {
    locale: {
        locales: [myZhCN],
        defaultLocale: 'zh-CN',
        isForce: true
    }
})
```

### 合并语义（重要）

传入的语言包与内置语言包按 `name` **合并（不是替换）**：

- **同名**（如自定义 `name: 'zh-CN'` 的包）：与内置逐字段浅合并，嵌套命名空间对象再合并一层，**只写要覆盖的字段即可**，其余自动保留内置文案；
- **新 name**（如 `fr-FR`）：直接追加进语言列表——**不会**自动兜底内置中文，需自行提供全部 19 个命名空间文案（建议照抄 zh-CN / en-US 结构翻译），缺失的 key 会原样显示 key 字符串（如 `uModal.confirmText`）；
- 不传 / 传空：直接使用内置 zh-CN + en-US。

### 默认语言优先级

初始语言 = Storage 已保存（key：`uview-pro-locale`）|| `defaultLocale` 配置 || 内置默认 `'zh-CN'`；

- `isForce: true` 时**强制**使用 `defaultLocale`（忽略 Storage 已保存值）；
- 指定语言不存在时，回退到 `'zh-CN'`，再回退到列表第一项。

## 运行期切换（useLocale）

```ts
import { useLocale } from 'uview-pro'

const { t, currentLocale, locales, setLocale, getLocales, getCurrentLocale } = useLocale()

setLocale('en-US')   // 切换语言：响应式生效并自动持久化（刷新后保持）
```

| 成员 | 说明 |
|---|---|
| `t(key, replacements?, localeName?)` | 翻译；`key` 支持点路径（如 `'uModal.confirmText'`） |
| `currentLocale` / `locales` | 当前语言对象 / 全部语言（响应式引用） |
| `setLocale(name)` | 切换并持久化 |
| `getLocales()` / `getCurrentLocale()` | 非响应式读取 |
| `initLocales(locales?, defaultLocaleName?, isForce?)` | 运行期重新注册语言包 |

**命名空间前缀**：`useLocale('uModal')` 后 `t('confirmText')` 等价于 `t('uModal.confirmText')`。

**占位符替换**：`{0}`、`{1}`… 对应数组；`{name}` 对应对象字段：

```ts
t('uUpload.notAllowedExt', { ext: 'txt' })   // 不允许选择txt格式的文件
```

> 切换语言后，19 个组件的内置文案（u-modal 按钮、u-calendar 星期等）随响应式引用自动更新，无需刷新页面。

## 页面自用词条（业务文案）

业务文案建议放在自定义命名空间（如 `myApp`），与内置同名包合并：

```ts
// locale/my-zh-CN.ts（只写业务词条，组件内置文案自动兜底）
export default {
    name: 'zh-CN',
    myApp: {
        title: '我的应用',
        welcome: '欢迎，{name}'
    }
}
```

```ts
const { t } = useLocale('myApp')
t('title')                    // 我的应用
t('welcome', { name: '小明' }) // 欢迎，小明
```

同一批传入的语言包中同名语言后者覆盖前者；不同语言包中同名命名空间按上述合并规则处理。

## 语言选择器示例

```vue
<template>
    <u-cell-group>
        <u-cell-item
            v-for="item in locales"
            :key="item.name"
            :title="item.label"
            :value="item.name === currentLocale?.name ? '已选' : ''"
            @click="setLocale(item.name)"
        />
    </u-cell-group>
</template>

<script setup lang="ts">
import { useLocale } from 'uview-pro'
const { locales, currentLocale, setLocale } = useLocale()
</script>
```

## 注意事项

- 切语言只覆盖组件内置文案与自注册词条；**原生导航栏标题（pages.json）不参与**——多语言标题需 `uni.setNavigationBarTitle` 在 onLoad 中按当前语言设置；
- 语言包 `name` 必须唯一且稳定（`setLocale` 按 name 查找）；
- 组合已有语言时直接用内置 en-US 即可，无需重复声明英文；
- 与主题/暗黑的持久化 key 并列：`uview-pro-locale` / `uview-pro-theme` / `uview-pro-dark-mode`（见 `spec/07`）。

## 下一步

- 多主题与暗黑模式：[07-theme-dark-mode](07-theme-dark-mode.md)
