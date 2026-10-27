# 02 页面脚本 TS（`<script setup lang="ts">`）

## 页面文件结构

普通 uni-app 的 Vue3 页面是标准 SFC（单文件组件），推荐 `<script setup lang="ts">`：

```vue
<template>
    <view class="page"><!-- 模板 --></view>
</template>

<script setup lang="ts">
// 逻辑（TypeScript）
</script>

<style lang="scss" scoped>
/* 样式 */
</style>
```

- 模板中**不要手动 import** `u-*` 组件（easycom 已接管，见 `spec/01`）；
- `<style>` 带 `lang="scss"` 才能用 `$u-*` 变量（见 `spec/03`）。

## 页面生命周期（从 `@dcloudio/uni-app` 导入）

普通 uni-app 的**页面级**生命周期在组合式 API 中通过 `@dcloudio/uni-app` 提供的函数注册：

```vue
<script setup lang="ts">
import { onLoad, onShow, onReady, onHide, onUnload,
    onPullDownRefresh, onReachBottom, onPageScroll, onShareAppMessage } from '@dcloudio/uni-app'
import { ref } from 'vue'

const id = ref('')

// 页面参数：onLoad 的 query 即路由参数
onLoad((query) => {
    id.value = query?.id ?? ''
})

onShow(() => { /* 每次显示（含返回本页） */ })
onReady(() => { /* 首次渲染完成 */ })
onHide(() => { /* 隐藏 */ })
onUnload(() => { /* 卸载（redirectTo / navigateBack 销毁时） */ })

// 上拉加载：需在 pages.json 对应页面开启 "enablePullDownRefresh": true
onPullDownRefresh(() => {
    // ...加载完数据后
    uni.stopPullDownRefresh()
})
onReachBottom(() => { /* 触底 */ })
onPageScroll((e) => { /* e.scrollTop */ })
onShareAppMessage(() => ({ title: '分享标题', path: '/pages/index/index' }))
</script>
```

**组件生命周期**（`onMounted` / `onUnmounted` / `onActivated` 等）仍从 `vue` 导入，二者可同时使用。

> ⚠️ 页面生命周期必须**在 `<script setup>` 顶层同步注册**（和 `onMounted` 一样不能包在 `setTimeout`、条件分支或 `await` 之后），否则不生效。

## 响应式状态（Vue3 标准写法）

```ts
import { ref, reactive, computed, watch } from 'vue'

const loading = ref(false)                 // 基本类型用 ref，模板中自动解包（无需 .value）
const form = reactive({ name: '', age: 18 }) // 对象用 reactive
const total = computed(() => form.age * 2)

watch(() => form.name, (val, old) => { /* ... */ })
watch(total, (val) => { /* ... */ })
```

- `reactive` 对象**解构会丢响应性**，需要时用 `toRefs(form)`；
- 模板内访问 `ref` 不需要 `.value`，脚本里必须 `.value`。

## `$u` 工具用法

`$u` 在注册后挂到两处，两种入口等价：

```ts
// 入口 1：全局对象（main.ts 注册后可用，无需 import）
const w = uni.$u.addUnit(30)           // '30rpx'
const ok = uni.$u.test.mobile('13800000000')

// 入口 2：按需引入（推荐，类型提示更完整）
import { $u } from 'uview-pro'
const t = $u.timeFormat(Date.now(), 'yyyy-mm-dd')
```

常用速查（全表见 `spec/04`）：`$u.addUnit`、`$u.test`（校验规则集）、`$u.timeFormat`、`$u.deepClone`、`$u.debounce` / `$u.throttle`、`$u.route`、`$u.toast`、`$u.http`。

在组件（非页面）里同样可用；`$u` 不依赖组件实例，也可在普通 ts 模块中 import 使用。

## 模板绑定规则

### 属性命名：kebab-case 与 camelCase 均可

组件 props 统一加了 kebab 别名，两种写法等价，**模板中推荐 kebab-case**（更贴近文档与卡片）：

```vue
<u-button type="primary" size="small" :custom-style="btnStyle" />
<u-button type="primary" size="small" :customStyle="btnStyle" />   <!-- 等价 -->
```

Boolean 属性可省略值（`<u-input disabled />` 等价 `:disabled="true"`）。

### 数据传递

```vue
<!-- 字符串直接传；非字符串必须 : 绑定 -->
<u-input v-model="form.name" placeholder="请输入姓名" />
<u-number-box v-model="count" :min="1" :max="99" />
<u-checkbox-group v-model="checkedList">
    <u-checkbox v-for="item in options" :key="item.value" :name="item.value" :label="item.label" />
</u-checkbox-group>
```

- 先查卡片确认该组件支持 `v-model`（卡片的「双向绑定」节会写明 prop + emit 通道；`v-model:show` 等具名绑定也在此列）；
- 未支持 `v-model` 的属性用 `:prop` + `@change` 事件手动同步。

### 事件

```vue
<u-button @click="onSubmit" />
<u-input @change="(val: string) => { form.name = val }" />
<u-upload @afterRead="onAfterRead" />
```

事件回调参数以卡片「事件」表为准；箭头函数里需要写 TS 类型注解时直接标注。

### 动态样式：用 `$u.toStyle`

内联 style 不写模板字符串拼接，统一走 `$u.toStyle`（对象/字符串/数组混合，合并输出规范 css 串）：

```vue
<u-popup :custom-style="$u.toStyle({ marginTop: '20rpx' }, customStyle)" />
```

```ts
const customStyle = computed(() => $u.toStyle({
    backgroundColor: 'var(--u-bg-white)',
    borderRadius: '16rpx'
}))
```

### 列表渲染

```vue
<u-cell-group>
    <u-cell-item v-for="item in list" :key="item.id" :title="item.title" />
</u-cell-group>
```

`v-for` 必须给稳定 `:key`（用 id 而非 index）。

## uni API 与请求

- 平台 API 直接用全局 `uni`（`uni.showToast`、`uni.navigateTo`、`uni.setStorageSync` 等），TS 类型随官方类型定义；
- **http 请求推荐用库内置封装**（拦截器、loading、toast 免手写）：

```ts
// main.ts 注册（可选）：app.use(httpPlugin, { interceptor: { ... }, requestConfig: { baseUrl } })
import { http } from 'uview-pro'

const res = await http.get<{ list: any[] }>('/api/list', { page: 1 })
const data = await http.post('/api/save', payload, { meta: { loading: true, toast: true } })
```

详见 `spec/04` 的「http 请求」节。

## TS 约定

- 接口数据定义 `interface`，API 层函数返回值显式标注；
- 能用 `const` 不写 `let`；可选链 `?.` 与空值合并 `??` 多端编译一致，可放心使用；
- 页面内不要使用仅浏览器可用的 API（`window` / `document`），H5 专属逻辑走条件编译 `#ifdef H5`（见 `spec/05`）。

## 常见陷阱

| 症状 | 原因 / 修法 |
|---|---|
| `onLoad` / `onShow` 不执行 | 未从 `@dcloudio/uni-app` 导入页面生命周期函数；或注册发生在异步/条件分支里（必须顶层同步） |
| 修改了 `form.xx` 但视图不更新 | 用 `reactive` 后又解构了对象；改用 `toRefs` 或整体赋值 |
| 模板中 `ref` 取值拿不到 | 脚本里漏了 `.value` |
| 事件回调拿到的参数类型是 `any` | 给回调参数补 TS 注解，如 `(val: string) => {}` |
| 组件上 `v-model` 不生效 | 该组件不支持 v-model（查卡片「双向绑定」节）；或绑了不存在的具名通道（如给仅 `show` 单向的属性写 `v-model:show`） |
