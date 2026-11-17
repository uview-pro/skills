# 08 HTTP 请求库

> 库 v1.0.24 起随组件库提供 HTTP 请求能力（`libs/request`），从库入口导入，无需额外安装依赖。
> 业务侧落法照抄 [recipe-http-instance](../recipes/recipe-http-instance.md)；本文件是规则与 API 速查。

## 导入与实例模型

```ts
import { http } from '@/uni_modules/uview-pro-x'
import type { HttpError, HttpInstance, HttpConfig } from '@/uni_modules/uview-pro-x'
```

| 实例 | 来源 | 用途 |
|---|---|---|
| `http` | 库内置默认实例（`baseURL` 空、无业务拦截器） | 偶发请求 / 第三方接口；也可作为派生模板 |
| `request` | 业务侧 `http.create(...)` 的单例 | 页面统一使用这一份（见配方） |

- **业务不要在每个页面 `http.create`**：实例、`defaults`、拦截器收敛到一个 `api/request.uts`，页面只 import 这份实例。
- `create` 继承父级 `defaults`（深合并），**不继承拦截器**；派生后需要重新注册拦截器。
- `setDefaults` 改的是实例级默认值；页面里调用会污染全站，禁止。

## 实例方法

| 方法 | 签名要点 | 说明 |
|---|---|---|
| `get` / `delete` / `head` | `(url, params?, config?)` | 查询参数走第二参 `params` |
| `post` / `put` / `patch` | `(url, data?, config?)` | 请求体走第二参 `data` |
| `request` | `(config)`，`url` 必填 | 通用入口（UTS 无 callable object，不能写 `http(config)`） |
| `create` | `(config?)` | 派生实例 |
| `setDefaults` | `(patch)` | 增量更新默认值（仅模块初始化处用） |
| `abortController` | `()` → `{ signal, abort }` | 取消凭证 |
| `isCancel` | `(error)` → `boolean` | 判断取消错误 |
| `upload` / `download` | `(input)` | 上传 / 下载，见下文 |

`config` 第三参（`HttpCallConfig`）只含 `headers` / `timeout` / `validateStatus` / `meta` / `signal`；**没有 `baseURL`**，换域名只能传绝对 URL 或派生实例。

```ts
request.get('/user/1').then((data: any) => {
    // 响应拦截器已解包，data 就是接口业务数据
})
```

## 拦截器

```ts
request.interceptors.request.use((config) => {
    config.headers['authorization'] = 'Bearer ' + token
    return config   // 返回 null 会中断请求（以 ERR_CANCELED reject）
})

request.interceptors.response.use((response) => {
    return response.data   // 解包唯一位置：此后页面/接口层直接拿业务数据
})
```

- 拦截器是**数组链**：多次 `use` 追加，注册顺序即执行顺序；**没有 `eject`**，只能靠「不在页面注册」避免叠加。
- 响应链里每个 `onFulfilled` 收到同一个 `HttpResponse`，**最后一个非 `null` 返回值**作为最终 resolve 值。
- 请求链返回 `null` = 中断（例：未登录不发请求），错误为 `ERR_CANCELED`，用 `http.isCancel(e)` 判断。
- 提示 / loading 由拦截器消费 `config.meta`（`{ toast, loading }`，只透传）；并发失败会连弹，必要时去重或节流。
- `config.url` 是**拼接后的完整地址**，改它直接生效，库不会二次拼 `baseURL`。

## 错误与取消

```ts
request.get('/user/1').catch((e) => {
    const err = e as HttpError
    if (http.isCancel(err)) return          // 取消不算业务错误
    console.log(err.code, err.status, err.message)
})
```

| `HttpError.code` | 含义 | `status` |
|---|---|---|
| `ERR_BAD_RESPONSE` | HTTP 状态未通过 `validateStatus` | 实际状态码 |
| `ERR_NETWORK` | 网络 / 超时（看 `errCode`） | 0 |
| `ERR_CANCELED` | 主动取消 / 请求拦截器中断 | 0 |
| `ERR_INTERCEPTOR` | 拦截器抛错 | 0 |

取消写法：

```ts
const controller = request.abortController()
request.get('/slow', null, { signal: controller.signal }).catch((e) => {
    const err = e as HttpError
    if (request.isCancel(err)) return
})
controller.abort()
```

- `abort()` 后的 `signal` 再发起请求会立即 reject `ERR_CANCELED`，新请求请新建控制器。
- **不要写 `e is HttpError`**：`is` 运算符 H5 转译后崩溃，统一 `e as HttpError` + 读字段。

## 上传与下载

```ts
request.upload({
    url: '/file',
    filePath: tempFilePath,          // App/小程序临时文件路径，H5 传 blob URL
    name: 'file',                    // 表单字段名，默认 file
    onProgress: (p) => {             // progress 0-100
        console.log(p.progress, p.transferred, p.total)
    }
}).then((result) => {
    // result.data 是服务端返回文本，需要时自行 JSON.parse
})
```

- `upload` 会在合并后剔除 `content-type`，由平台生成带 `boundary` 的 multipart 头。
- `download` 不传 `filePath` 时返回平台临时路径，App 可再复制到业务目录。
- 上传 / 下载同样经过请求拦截器与 `validateStatus`，失败也 reject `HttpError`；但**不受响应拦截器解包影响**（返回 `UploadResult` / `DownloadResult`）。

## useRequest（页面三态）

```ts
import { useRequest } from '@/uni_modules/uview-pro-x'

const { loading, data, error, run, cancel } = useRequest<Profile>(async (ctx) => {
    const result = await request.get('/profile', null, { signal: ctx.signal })
    return result as Profile
})

onMounted(() => { run() })
```

| 能力 | 行为 |
|---|---|
| 三态 | `loading: Ref<boolean>`、`data: ShallowRef<T \| null>`、`error: Ref<HttpError \| null>` |
| 竞态 | 每次 `run()` 序号 +1，过期响应直接丢弃 |
| 重复执行 | `run()` 先取消上一次未完成请求 |
| 卸载 | 组件卸载自动 `cancel()` |
| 取消 | 取消不写入 `error`，判断仍用 `http.isCancel` |
| 立即执行 | `immediate` 默认 `false`，需要挂载即请求时传 `{ immediate: true }` |

- `useRequest` 只做状态与生命周期，**发请求仍走你 import 的实例**（拦截器、默认值照旧生效）。
- 需要重试、轮询、缓存、分页列表时自行在 fetcher 里实现；不要指望 `useRequest` 提供。

## `meta` 约定

`meta` 只有 `{ toast: boolean, loading: boolean }` 两个字段，库内不读，全部交给拦截器：

```ts
request.get('/list', null, { meta: { toast: false } })
```

## 红线

| 不要做 | 后果 |
|---|---|
| 页面里 `request.interceptors.*.use(...)` | 每次进页面叠一层，且没有 eject |
| 页面里 `request.setDefaults(...)` / 改 `request.defaults` | 污染应用级单例，全站同时受影响 |
| 页面里 `http.create(...)` 当业务实例 | 不继承业务 headers 与拦截器，配置散落 |
| 页面里 `http.setDefaults(...)` | 污染库内置实例，之后所有 `create` 都受影响 |
| 在模块顶层读一次 token 存变量 | 登录 / 登出后不更新，应在拦截器里实时读 |
| 用 `e is HttpError` 判类型 | H5 转译后 `is` 不可用 |
| 把 `validateStatus` 传 `null` 表示全放行 | 只接受函数，全放行写 `(): boolean => true` |

## 关联

- 落地方案：[recipe-http-instance](../recipes/recipe-http-instance.md)
- 页面级 `useRequest` 已登记在 [spec/04 的 hooks 速查](04-component-usage.md)
- UTS 类型写法与陷阱见 [spec/02](02-page-script-uts.md)
- 下一主题：[spec/09 pinia 状态管理](09-pinia-store.md)
