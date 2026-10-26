# 02 页面脚本 UTS 规范

## 基本形态

`.uvue` 页面使用组合式 API + UTS：

```vue
<script setup lang="uts">
import { $u, useTheme, useLocale, type TabbarItem } from '@/uni_modules/uview-pro-x'

const count = ref(0)
const theme = useTheme()
</script>
```

| 规则 | 说明 |
|---|---|
| 无需导入 | `ref` / `computed` / `watch` / `reactive` 等 Vue API，以及 `onLoad` / `onShow` / `onPageScroll` 等页面生命周期，**自动注入**，不要手写 import |
| 组件库导入 | 统一从 `@/uni_modules/uview-pro-x` 导入（`$u`、hooks、类型）；`<ux-*>` 组件靠 easycom 免导入 |
| 类型导入 | 内联 `type` 修饰符：`import { $u, type TabbarItem } from '@/uni_modules/uview-pro-x'` |

## UTS 高频类型陷阱（❌/✅ 对照）

UTS 是强类型语言（编译到 Kotlin/Swift/ArkTS），很多 JS 习惯写法会编译报错或运行期抛异常。

| 场景 | ❌ 错误写法 | ✅ 正确写法 |
|---|---|---|
| 空值 | `let name = undefined` | `let name: string \| null = null` |
| 真值判断 | `if (list) { }` | `if (list != null) { }`（条件必须是布尔表达式） |
| 对象字面量 | `let u: { name: string } = {...}`（内联字面量类型） | `type User = { name: string }; let u: User = { name: 'a' }` |
| 数字转换 | `Number(str)` | `parseInt(str)` 或 `$u.toNumber(str)`（无 `Number()` 构造） |
| 字符串转换 | `String(num)` | `num.toString()`（无 `String()` 构造） |
| 定时器声明 | `let t; t = setTimeout(...)` | `let t: number \| null = null`（必须显式类型） |
| 定时器清理 | `clearTimeout(t)` | `clearTimeout(t!)`（非空断言 `!`） |
| watch getter | `watch(() => x.value, (v) => ...)` | `watch((): boolean => x.value, (v: boolean) => ...)`（显式返回类型 + 参数类型） |
| 数组越界 | `arr[i]` 直接读 | 先 `if (i >= 0 && i < arr.length)` 再读（App 端越界会抛异常） |
| JSON 取值 | `data['key']` 直接当 string 用 | 先 `typeof v == 'string'` 判断，再 `as string` 断言 |
| JSON 解析 | `JSON.parse(str)` 直接用 | `const obj = JSON.parse(str) as UTSJSONObject` |
| 函数作值传参 | `setTimeout(fn, 300)` 直传声明函数 | `setTimeout(() => { fn() }, 300)`（箭头函数包装） |
| 函数声明顺序 | 顶层立即调用后面才定义的函数 | **先定义后使用**（把被调用的 function 写在使用位置之前） |
| v-for index 传参 | `onSelect(index)` 直接传 number 形参 | `onSelect(index as number)`（index 推断类型需断言） |
| 事件对象 | `(e: any)` | 滚动 `(e: UniScrollEvent)`，取 `e.detail.scrollTop`；拿不准时由模板上下文推导 |

对象的值来源不明时，用 `as` 断言收窄 + `??` 兜底：

```uts
const raw = uni.getStorageSync('keyword')
const keyword = (raw != null && typeof raw == 'string') ? raw as string : ''
```

## 模板绑定规则

| 规则 | 正确写法 | 备注 |
|---|---|---|
| 动态属性 | `:title="pageTitle"` | 必须带冒号；**不要**写 `title="{{ pageTitle }}"` |
| 点击事件 | `@click="onTap"` | 统一 `@click` |
| 裸布尔属性 | `show-icon` | 等价于 `:show-icon="true"` |
| ref 解包 | `{{ scrollTop }}` | 模板中 ref 自动解包，**不写** `.value` |
| 默认 v-model | `v-model="current"` | 组件的默认双向绑定 |
| 命名 v-model | `v-model:show="visible"` | 命名模型（如 ux-popup 的 `show`）；**不要**写 `v-model:model-value` |
| 列表渲染 | `v-for="(item, index) in list" :key="index"` | `:key` 必写 |
| 条件渲染 | `v-if` / `v-show` | 与 Vue 一致 |

### v-for 子项内动态绑定的硬约束（App 端原生崩溃红线）

v-for 子项内的动态绑定**不得读取「源数组自身」**（如 `list.length`、`list[index]` 反向依赖）。App 端 Vapor 引擎下会触发字段表越界原生崩溃。把这类派生数据**提前落到数据层**：

```uts
type Item = { name: string; last: boolean }

// ❌ 模板里 :class="{ 'is-last': index == list.length - 1 }"
// ✅ 构建数据时给每个 item 写入派生字段，模板只读 item 自身
const list = ref<Item[]>([
    { name: 'A', last: false },
    { name: 'B', last: true }
])
```

## 页面生命周期

页面生命周期（`onLoad` / `onShow` / `onReady` / `onHide` / `onUnload` / `onPageScroll` / `onReachBottom` / `onPullDownRefresh`）在 `<script setup>` 顶层直接调用，无需导入：

```uts
onPageScroll((e) => {
    scrollTop.value = e.scrollTop
})

onUnload(() => {
    if (timer != null) {
        clearInterval(timer!)
        timer = null
    }
})
```

平台差异注意：

- `onPageScroll` **App 端不生效**。App 端需监听滚动时，把页面内容包进 `<scroll-view direction="vertical" @scroll="...">`（见 [recipe-page-scroll](../recipes/recipe-page-scroll.md)）。
- 定时器、`uni.$on` 监听等副作用在 `onUnload` 中清理，避免页面销毁后回调触发。

## 常见编译/运行报错 → 修法

| 报错/症状 | 根因 | 修法 |
|---|---|---|
| `Cannot read property 'x' of null` | 空值直接取属性 | 先 `!= null` 判断或用 `?.` |
| 告警 `possibly null` | 可空类型未收窄 | 加判空分支，或确认后非空断言 `!` |
| `Type 'string' is not assignable to...` | 类型不匹配 | 显式转换（`toString()` / `$u.toNumber` / `as` 断言） |
| 对象字面量编译报错 | 内联字面量类型 | 提取 `type X = {...}` 再使用 |
| 条件表达式编译报错 | 非布尔真值判断 | 改写为显式比较（`x != null` / `x == true`） |
| App 端 index 越界崩溃 | 数组越界读取 | 加边界判断；v-for index 传参用 `as number` |
| 页面偶发原生崩溃 | v-for 子项动态绑定读源数组 | 派生字段落入数据层（见上文红线） |

## 下一步

- 样式写法：[03-page-style-ucss](03-page-style-ucss.md)
- 组件使用：[04-component-usage](04-component-usage.md)
- 三端红线：[05-cross-platform](05-cross-platform.md)
