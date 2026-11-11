# 09 pinia 状态管理

> pinia 由 **uni-app x 内置（3.0.4）**，不是 uview-pro-x 的依赖，也不写进 `package.json`。
> 本文件只写「跨页面共享状态」在 uni-app x 里的正确落法。

## 是否该用 pinia

| 场景 | 选择 |
|---|---|
| 同一份数据被多个页面读写（用户信息、登录态、购物车、全局配置） | pinia store |
| 只在单页面内使用 | 页面 `ref` / `reactive`，不要为一次性状态建 store |
| 只是接口请求的三态 | `useRequest`（见 [spec/08](08-request-http.md)），不必建 store |
| 需要跨页事件通知而非共享数据 | 事件总线 / 回调，不要塞进 store |

## 挂载

`main.uts` 里挂一次，全应用共享同一个 pinia 实例：

```ts
// main.uts
import { createSSRApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.uvue'

export function createApp() {
    const app = createSSRApp(App)
    // uni-app x 内置 pinia 3.0.4：项目未安装依赖时编译器指向内置运行时
    app.use(createPinia())
    return { app }
}
```

- **不要 `npm i pinia`**：自行安装的版本可能与内置运行时不一致。
- 只在 `createApp` 里挂一次；重复 `app.use(createPinia())` 会得到多个实例，store 互不共享。

## 定义 store（setup store）

```ts
// store/counter.uts
import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
    const name = ref<string>('uview')
    const count = ref<number>(0)

    const doubleCount = computed((): number => count.value * 2)

    function increment(): void {
        count.value++
    }

    function reset(): void {
        name.value = 'uview'
        count.value = 0
    }

    return { name, count, doubleCount, increment, reset }
})
```

| 组成 | 写法 | 说明 |
|---|---|---|
| state | `ref<T>(...)` | **显式写泛型**，避免推断成 `any` 后在 App 端报错 |
| getter | `computed((): T => ...)` | 标注返回类型 |
| action | 普通函数，改 `ref.value` | 不需要额外包装 |
| id | `defineStore('counter', ...)` | 同一应用内必须唯一 |

UTS 是强类型语言：泛型、返回类型、函数参数类型都写全，不要依赖推断。

## 页面使用

```vue
<script setup lang="uts">
import { storeToRefs } from 'pinia'
import { useCounterStore } from '@/store/counter.uts'

const counterStore = useCounterStore()
// state / getter 必须经 storeToRefs 解构，直接解构 store 会丢响应式
const { name, count, doubleCount } = storeToRefs(counterStore)

function onClick(): void {
    // 修改状态只调 store 上的 action
    counterStore.increment()
}
</script>
```

```vue
<template>
    <view class="row">
        <text>{{ name }}：{{ count }} / {{ doubleCount }}</text>
        <ux-button text="+1" type="primary" @click="onClick()" />
    </view>
</template>
```

- 在页面 `script setup` **顶层**调用 `useXxxStore()`（不要放在 `onMounted` 或条件分支里）。
- `storeToRefs` 只解构 state 与 getter；**action 不要解构**，保持 `store.action()` 调用。
- 模板里直接用解包后的变量，不要再包一层本地 `ref` 做镜像，否则两份状态会打架。

## 跨页面共享与生命周期

- store 实例由 pinia 在应用级维护，与页面生命周期无关：页面 A 改，页面 B 的 `storeToRefs` 同步变化，不需要事件总线或路由参数。
- 页面返回、重建不会重置状态；只有调用 action 或应用重建才变化。
- **pinia 默认不持久化**：需要重启后保留时，在 action 里写 `uni.setStorageSync`，并在 store 初始化时读回；不要指望「开箱持久化」。

## 与 HTTP 层协作

```ts
// store/user.uts
import { ref } from 'vue'
import { defineStore } from 'pinia'
import { request } from '@/api/request'

export type User = { id: number; name: string; };

export const useUserStore = defineStore('user', () => {
    const profile = ref<User | null>(null)

    async function fetchProfile(): Promise<void> {
        const data = await request.get('/profile')
        profile.value = data as User
    }

    return { profile, fetchProfile }
})
```

- store 里只调**业务实例** `request`（拦截器、解包头照旧生效），不要在 store 里 `http.create`。
- 页面需要 loading / error 三态时，用 `useRequest` 包裹接口函数，不要把三态塞进 store；store 只存业务数据。

## 红线

| 不要做 | 后果 |
|---|---|
| `const { count } = useCounterStore()` | 解构丢响应式，视图不更新 |
| 解构 action 后调用 | 丢失 `this` / 上下文，行为不确定 |
| 安装 pinia 依赖 | 与内置 3.0.4 冲突，可能出现双实例 |
| 页面里 `createPinia()` | 新建独立实例，与其他页面不共享 |
| 用 store 存接口 loading / error | 多页面并发互相覆盖；三态交给 `useRequest` |
| `defineStore` 用重复 id | 后者复用前者定义，状态串页 |

## 关联

- HTTP 请求与 `useRequest`：[spec/08](08-request-http.md)
- 业务请求实例配方：[recipe-http-instance](../recipes/recipe-http-instance.md)
- 页面脚本 UTS 写法：[spec/02](02-page-script-uts.md)
