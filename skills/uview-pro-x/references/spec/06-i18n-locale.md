# 06 多语言国际化（useLocale）

> 覆盖：语言包注册 → 组件内置文案 / 应用自建文案 → 运行时切换与持久化 → 声明式联动。

## 能力一览

| 能力 | 说明 |
|---|---|
| 组件内置文案 | 16 个组件内置中英双语文案（选择器按钮、空态提示、键盘按键、加载提示等），切语言即联动 |
| 应用自建文案 | 语言包支持任意命名空间（如 `demo`），页面文案集中管理 |
| 运行时切换 | `setLocale('en-US')` 全局即时生效 |
| 自动持久化 | 用户选择自动写入本地存储（key `uview-pro-x-locale`），下次启动恢复 |
| H5 URL 注入 | H5 端链接带 `lang=en-US` 参数时按 URL 语言启动（仅 WEB 平台） |
| 声明式联动 | `ux-config-provider` 的 `current-locale` prop 驱动切换 |

## 语言包注册（main.uts）

### 默认：内置双语开箱可用

```ts
app.use(uViewProX)   // 注册表 = 内置 zh-CN + en-US
```

### 传入 `locales` 数组 = 完整注册集合（关键规则）

**`locales` 非空时，它就是全部已注册语言包——内置包不会自动追加。**
只传应用自己的语言包时，组件内置文案（`uPicker` / `uModal` / `uEmpty` 等命名空间）全部缺失，运行时会显示原始 key（如 `uPicker.cancelText`）。

要「内置文案 + 应用文案」同时可用，必须把库内置包一并传入：

```ts
import { uViewProX, zhCN as libZhCN, enUS as libEnUS } from '@/uni_modules/uview-pro-x'
import { zhCN as appZhCN, enUS as appEnUS } from '@/locales'

export function createApp() {
    const app = createSSRApp(App)
    app.use(uViewProX, {
        locale: {
            // 数组内同名语言包深合并：后传覆盖先传（库包在前、应用包在后）
            locales: [libZhCN, appZhCN, libEnUS, appEnUS],
            defaultLocale: 'zh-CN',
            isForce: false
        }
    })
    return { app }
}
```

- 库内置包从库入口导入：`import { zhCN, enUS, frFR } from '@/uni_modules/uview-pro-x'`；`fr-FR` 已随库导出但不在默认注册表，需要法语时手动传入。
- `isForce: true` 时同名语言包不做深合并、直接整体替换，且初始语言强制取 `defaultLocale`（忽略用户已保存选择）。

### 语言包结构

```
{
    "name": "zh-CN",      // 唯一标识：setLocale、持久化、defaultLocale 都用它
    "label": "简体中文",   // 展示名：语言列表 UI 显示用
    "locale": "zh-Hans",  // 标准语言标签
    "demo": { "title": "演示" },          // 任意自定义命名空间
    "uPicker": { "confirmText": "好" }    // 与组件同名的命名空间：覆盖内置文案
}
```

> 上例为结构示意（注释不属于语言包内容）；实际语言包为普通对象，可写在 `.uts` 或 `.json` 文件中。

- 三个元字段（`name` / `label` / `locale`）必填，其余键均为命名空间（普通对象，可嵌套）。
- 覆盖组件内置文案：在应用包里写同名命名空间即可——合并只覆盖你写出的字段，未写字段保留内置值。

## useLocale API

```uts
import { useLocale } from '@/uni_modules/uview-pro-x'

const { t, setLocale, currentLocale, locales } = useLocale()   // 全 key 形态
const { t: demo } = useLocale('demo')                          // 命名空间形态
```

| 成员 | 签名 | 说明 |
|---|---|---|
| `t` | `(key, replacements?, localeName?) => string` | 翻译函数；**未命中返回 key 原文**（非空串） |
| `setLocale` | `(name: string) => void` | 切换当前语言并持久化；未注册的语言仅 `console.warn`，不生效 |
| `currentLocale` | `Ref<Locale \| null>` | 当前语言信息 `{ name, label, locale }` |
| `locales` | `Ref<Locale[]>` | 已注册语言列表（可直接渲染语言选择 UI） |
| `getLocales()` | `() => Locale[]` | 同上（非响应式） |
| `getCurrentLocale()` | `() => Locale \| null` | 当前语言（非响应式） |

`t` 的三个行为细节：

1. **未命中返回完整 key 原文**：`t('uPicker.cancelText')` 在 key 未注册时返回字符串 `'uPicker.cancelText'`（不是空串）。界面出现「命名空间.字段名」形式的文本，即为该 key 未注册或拼写错误。
2. **占位替换**：`t('greet', { name: '张三' })` 把文案模板中的 `{name}` 替换为对应值。
3. **指定语言翻译**：`t('key', null, 'en-US')` 用指定语言翻译，不切换当前语言。

命名空间形态：`useLocale('demo')` 后 `demo('title')` 等价于 `t('demo.title')`。

## 默认语言解析优先级

初始化（install 阶段）按以下优先级决定初始语言：

1. **H5 URL 注入**：链接含 `lang=en-US` 参数时取 URL 语言（仅 WEB 平台，且该语言须已注册）
2. **isForce 强制**：`isForce: true` 时取 `defaultLocale`
3. **已保存选择**：用户切换过语言 → 恢复其选择
4. **defaultLocale**：兜底（未传时内置 `zh-CN`）

## 组件内置文案联动

以下 16 个组件的内置文案跟随当前语言自动切换（注册表含库内置包即生效，页面无需处理）：

| 组件 | 语言包命名空间 |
|---|---|
| ux-action-sheet | `uActionSheet` |
| ux-count-down | `uCountDown` |
| ux-empty | `uEmpty` |
| ux-full-screen | `uFullScreen` |
| ux-input | `uInput` |
| ux-keyboard | `uKeyboard` |
| ux-link | `uLink` |
| ux-loadmore | `uLoadmore` |
| ux-modal | `uModal` |
| ux-no-network | `uNoNetwork` |
| ux-pagination | `uPagination` |
| ux-picker | `uPicker` |
| ux-search | `uSearch` |
| ux-section | `uSection` |
| ux-select | `uSelect` |
| ux-textarea | `uTextarea` |

组件的对应 props（如 `cancel-text` / `confirm-text`）可逐实例覆盖内置文案。

## 运行时切换（示例）

```uts
import { useLocale } from '@/uni_modules/uview-pro-x'

const { locales, currentLocale, setLocale } = useLocale()
const { t: demo } = useLocale('demo')

function switchLocale(name: string): void {
    setLocale(name)   // 自动持久化
}
```

```vue
<view v-for="item in locales" :key="item.name" @click="switchLocale(item.name)">
    <text>{{ item.label }}</text>
</view>
<text>{{ demo('title') }}</text>
```

## 声明式联动（ux-config-provider）

```vue
<ux-config-provider :current-locale="localeName">
    <!-- 子树内容 -->
</ux-config-provider>
```

```uts
const localeName = ref<string>('en-US')
// 改动 localeName → 内部自动 setLocale，适合「设置页语言选项」这类状态驱动写法
```

## 常见坑

| 坑 | 根因 | 修法 |
|---|---|---|
| 传了自定义语言包后，组件内置文案显示成 `uPicker.cancelText` 原始 key | `locales` 传入数组即注册全集，内置包被整体替换 | 把库内置包一并传入 `locales`（库包在前、应用包在后） |
| `setLocale('ja-JP')` 无效 | 语言未注册（仅 warn 不报错） | 先在 `locales` 注册该语言包 |
| 界面出现 `xxx.yyy` 点路径文本 | `t` 未命中返回 key 原文 | 核对命名空间与 key 拼写、确认语言包已注册 |
| 想用法语但语言列表只有中英 | `fr-FR` 不在默认注册表 | `import { frFR } from '@/uni_modules/uview-pro-x'` 后传入 `locales` |
| H5 刷新后语言总被 URL 覆盖 | URL `lang=` 注入优先级最高（仅 H5） | 去掉 URL 参数，或检查该参数的来源 |
| 切换后重启又变回默认 | `isForce: true` 强制忽略已保存选择 | 需要记忆用户选择时把 `isForce` 设为 `false` |

## 下一步

- 多主题与暗黑模式：[07-theme-dark-mode](07-theme-dark-mode.md)
- 样式与取色：[03-page-style-ucss](03-page-style-ucss.md)
- 组件与 hooks 速查：[04-component-usage](04-component-usage.md)
