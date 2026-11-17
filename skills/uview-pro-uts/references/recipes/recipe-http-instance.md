# 配方：业务请求实例（api/request.uts + 拦截器 + 页面三态）

> 适用：任何需要调后端接口的 uni-app x 页面。
> 规则依据 [spec/08](../spec/08-request-http.md)；本配方给「照抄即可」的完整落法。

## 目录

```
api/
├── request.uts        业务实例：defaults + 导出（全站唯一）
├── interceptors.uts   可复用拦截器：token 注入 + 响应解包 + 错误处理
└── user.uts           业务接口函数（可选，页面不拼 URL）
pages/
└── user/index.uvue    页面：import request / useRequest
```

## 1. 业务实例（模块级单例）

```ts
// api/request.uts
import { http } from '@/uni_modules/uview-pro-x';
import { setupInterceptors } from './interceptors';

/** 业务默认请求头：模块级只建一次 */
const defaultHeaders = new UTSJSONObject();
defaultHeaders['content-type'] = 'application/json';
defaultHeaders['x-client'] = 'uni-app-x';

/**
 * 业务实例：ESM 模块只执行一次，所有页面 import 到的是同一份实例，
 * baseURL / 超时 / 请求头 / 拦截器全站共享
 */
const request = http.create({
    baseURL: 'https://api.example.com',
    timeout: 15000,
    headers: defaultHeaders
});

// create 不继承拦截器，在模块顶层注册一次
setupInterceptors(request);

export { request };
```

要点：

- 只在模块顶层 `create` 一次；**不要放进函数**，否则每次调用都是新实例（拦截器为空、配置不共享）。
- 页面只 import `request`，不 import `http`；不要改 `request.defaults` 或调 `setDefaults`。

## 2. 拦截器（token + 解包 + 错误）

```ts
// api/interceptors.uts
import type { HttpInstance, ResolvedHttpConfig, HttpResponse, HttpError } from '@/uni_modules/uview-pro-x';

export function setupInterceptors(instance: HttpInstance): void {
    // 请求拦截器：token 每次请求实时读取，登录 / 登出后立即生效
    instance.interceptors.request.use((config: ResolvedHttpConfig): ResolvedHttpConfig | null => {
        const token = uni.getStorageSync('token') as string;
        if (token != '') {
            config.headers['authorization'] = 'Bearer ' + token;
        }
        return config;   // 返回 null = 中断请求（未登录场景可用）
    });

    // 响应拦截器：解包唯一位置，此后页面拿到的就是业务数据
    instance.interceptors.response.use((response: HttpResponse): any => {
        return response.data;
    }, (error: HttpError): HttpError => {
        // 统一提示放这里（并发失败会连弹，必要时去重或节流）
        return error;
    });
}
```

要点：

- 拦截器**没有 `eject`**，只能靠「只在模块顶层注册一次」避免叠加；页面里不要 `use`。
- 需要「未登录直接不发请求」时，请求拦截器返回 `null`，页面用 `http.isCancel(e)` 判断。
- 判断错误一律 `e as HttpError` 读 `code` / `status` / `message`，不要用 `is` 运算符。
- 上传 / 下载不走响应解包，返回 `UploadResult` / `DownloadResult`。

## 3. 接口函数（可选但推荐）

```ts
// api/user.uts
import { request } from './request';

export type User = {
    id: number;
    name: string;
};

export function fetchUser(id: number): Promise<any> {
    return request.get('/user/' + id.toString());
}
```

页面拿到的 data 已是解包后的业务数据；需要类型时在页面 `as User` 或在此处补一层类型转换。

## 4. 页面使用

需要三态（loading / data / error）时用 `useRequest`；一次性调用直接 `then` 即可。

```vue
<template>
    <view class="page">
        <text v-if="loading">加载中…</text>
        <text v-else-if="error != null">{{ errorText }}</text>
        <text v-else>{{ userName }}</text>
        <ux-button text="重新加载" type="primary" @click="run()" />
    </view>
</template>

<script setup lang="uts">
import { request } from '@/api/request';
import type { User } from '@/api/user';
import { useRequest } from '@/uni_modules/uview-pro-x';

const { loading, data, error, run } = useRequest<User>(async (ctx) => {
    const result = await request.get('/user/1', null, { signal: ctx.signal });
    return result as User;
});

// 模板里 ref 自动解包，派生展示文本避免在模板写非空断言
const userName = computed((): string => {
    const user = data.value;
    return user == null ? '' : user.name;
});

const errorText = computed((): string => {
    const err = error.value;
    return err == null ? '' : err.message;
});

onMounted(() => {
    run();
});
</script>
```

要点：

- `useRequest` 的 fetcher 里**必须把 `ctx.signal` 传给请求**，否则取消能力失效。
- `immediate` 默认 `false`，需要挂载即请求时写 `useRequest(fetcher, { immediate: true })`。
- 直接 `then` 时也要 `catch`，否则会产生未处理的 Promise 拒绝告警：

```ts
request.get('/user/1').then((data: any) => {
    const user = data as User;
}).catch((e) => {
    const err = e as HttpError;
    console.log(err.code + ' / ' + err.status.toString());
});
```

## 5. 多域名

| 场景 | 做法 | 继承 defaults | 继承拦截器 |
|---|---|---|---|
| 偶发调第三方 / 静态资源 | 直接传绝对 URL（`http://`、`https://`、`//` 开头不拼 `baseURL`） | 是 | 是 |
| 长期存在的第二域名 | `request.create({ baseURL })` 派生实例 | 是 | 否，需重新注册拦截器 |

```ts
// api/cdn.uts
import { request } from './request';
import { setupInterceptors } from './interceptors';

const cdnRequest = request.create({
    baseURL: 'https://cdn.example.com',
    timeout: 30000
});

// create 不继承拦截器：重新注册（若需跳过 token 注入，在拦截器里按 config.url 判断域名）
setupInterceptors(cdnRequest);

export { cdnRequest };
```

- 绝对 URL 也会经过全局拦截器：无条件注入 `authorization` 会把 token 发给第三方域名，必须在拦截器里按域名放行。
- 单次请求**不能覆盖 `baseURL`**：`HttpCallConfig` 没有这个字段，写了直接类型报错。

## 不要做

| 写法 | 后果 |
|---|---|
| 页面里 `http.create(...)` 当业务实例 | 不继承业务 headers / 拦截器，配置散落各页 |
| 页面里 `request.interceptors.*.use(...)` | 每次进页面叠一层，且无法移除 |
| 页面里 `request.setDefaults(...)` / 改 `request.defaults` | 污染应用级单例，全站同时受影响 |
| 模块顶层读一次 token 存变量 | 登录 / 登出后不更新 |
| 把 loading / error 塞进 pinia store | 多页面并发互相覆盖；三态交给 `useRequest`（状态共享见 [spec/09](../spec/09-pinia-store.md)） |

## 三端差异

| 项 | App | H5 | 小程序 |
|---|---|---|---|
| `upload.filePath` | 临时文件路径 | blob URL | 临时文件路径 |
| `download` 返回值 | `tempFilePath`（不传 `filePath` 由平台决定落地位置） | 同左 | 同左 |
| 上传 `content-type` | 由库剔除，平台生成 multipart 头 | 同左 | 同左 |
| 进度回调精度 | 平台相关，`progress` 统一 0-100 | 同左 | 同左 |
