# 10 自定义图标字体（custom-icon）

> `ux-icon` 默认渲染库内置图标集。项目已有自己的图标字体（iconfont 导出的 ttf 等）时，把它接到 `ux-icon` 上，**组件源码不用改**，全部在应用侧完成。
> 库 v1.0.24 起提供 `$u.registerIconFont`；本文件是消费侧接入规范。

## 三步接入

| 步骤 | 位置 | 做什么 |
|---|---|---|
| 1 | 项目 `static/` | 放入字体文件（如 `static/iconfont.ttf`），保证打包被带上 |
| 2 | `App.uvue` 全局样式 | 声明 `@font-face`，`font-family` 即后续使用的前缀 |
| 3 | `App.uvue` 的 `onLaunch` | `$u.registerIconFont(prefix, icons)` 登记码点表 |

**三处前缀必须是同一个字符串**：`@font-face` 的 `font-family` = `registerIconFont` 第一参 = 模板 `custom-prefix`。

## 准备字体与码点表

从图标库导出的 CSS 里读码点（取十六进制、去掉反斜杠）：

```
.custom-icon-sun:before { content: "\e712"; }
```

```ts
// iconfont.uts
export const customIconFont: UTSJSONObject = {
    'sun': 'e712',
    'moon': 'e609',
    'eye': 'e68e'
}
```

码点写**十六进制字符串**（`e712`），不要带 `\u`、`0x`、`&#x;`。

## 声明字体并登记

```vue
<!-- App.uvue -->
<script setup lang="uts">
import { $u } from '@/uni_modules/uview-pro-x'
import { customIconFont } from './iconfont.uts'

onLaunch(() => {
    // 必须在图标渲染之前完成，onLaunch 最稳妥
    $u.registerIconFont('custom-icon', customIconFont)
})
</script>

<style>
@font-face {
    font-family: 'custom-icon';
    src: url('/static/iconfont.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
}
</style>
```

- `@font-face` 必须写在 **App.uvue 全局样式**里，不能写在页面 scoped 样式里。
- `registerIconFont` 只登记码点表；字体加载仍靠 `@font-face`，两者缺一不可。
- 内置前缀 `uxicon-iconfont` 是保留值，用它登记会被忽略并告警，请换自有前缀。
- 同一前缀重复登记是**整体替换**（不合并）；增删图标后要重新登记完整表。

## 页面使用

```vue
<template>
    <view class="icon-row">
        <ux-icon name="sun" size="20" custom-prefix="custom-icon" />
        <ux-icon name="eye" size="20" color="#2979ff" custom-prefix="custom-icon" />
    </view>
</template>
```

`name` 取码点表的键；`size` / `color` / `type` / `bold` / `top` 等行为与内置图标一致。

```vue
<!-- 前缀未登记也能出字：name 直接传四位十六进制码点 -->
<ux-icon name="e712" size="20" custom-prefix="custom-icon" />

<!-- 或由默认插槽直传 unicode 字符 -->
<ux-icon custom-prefix="custom-icon">{{ '\ue712' }}</ux-icon>
```

| 前缀状态 | `name` 可传 | 说明 |
|---|---|---|
| 已登记 | 码点表里的图标名，或四位十六进制码点 | 推荐用图标名，语义清晰 |
| 未登记 | 只能四位十六进制码点，或默认插槽传字符 | 传图标名会显示空白（回退内置库但不借用其码点） |

- 内置图标不传 `custom-prefix`（默认 `uxicon-iconfont`，传空串也走内置库）；自定义与内置可同页混用。
- 图标名不要含 `/`，也不要用 `data:` 开头的 base64——这两种会被当作图片图标处理。

## 列举全部图标

码点表的键就是图标清单：

```ts
import { customIconFont } from '@/iconfont.uts'

const customIconList: string[] = UTSJSONObject.keys(customIconFont)
```

```vue
<view class="icon-grid">
    <view class="icon-item" v-for="(item, index) in customIconList" :key="index">
        <ux-icon :name="item" size="20" color="#2979ff" custom-prefix="custom-icon" />
        <text class="icon-name">{{ item }}</text>
    </view>
</view>
```

## 其他组件的图标入口

自定义前缀不只用于 `<ux-icon>`，带前缀属性的组件传同一个字符串即可：

| 组件 | 属性 |
|---|---|
| `ux-icon` | `custom-prefix` |
| `ux-rate` | `custom-prefix` |
| `ux-form-item` | `left-icon-prefix` / `right-icon-prefix` |

具体属性名与默认值以对应 API 卡片为准（`references/api/ux-<name>.md`）。

## 三端差异

| 平台 | 支持 | 说明 |
|---|---|---|
| App | 支持 | 字体文件放 `static/` 随应用打包，由全局 `@font-face` 加载 |
| H5 | 支持 | `url('/static/...')` 可直接访问；部署在子路径时改成对应路径 |
| 微信小程序 | 支持 | 本地字体放 `static/` 可正常显示；不显示时先查路径与全局样式 |

## 红线

| 不要做 | 后果 |
|---|---|
| 用保留前缀 `uxicon-iconfont` 登记 | 被忽略并告警，自定义图标不生效 |
| 三处前缀不一致 | 图标空白或回退内置图标 |
| `@font-face` 写在页面 scoped 样式 | 字体不加载，图标空白 |
| 字体文件放到 `static/` 之外 | 打包后文件丢失，图标消失 |
| 码点写成 `\ue712` / `0xe712` | 解析失败显示空白 |
| 给图标写 `::before` 类样式 | App 端不支持伪元素；组件已用 unicode 直显 |
| 只登记增量的几张图标 | 同前缀重复登记是整体替换，旧图标全部丢失 |

## 排查

| 现象 | 排查方向 |
|---|---|
| 图标空白 | 三处前缀是否同名；`name` 是否在码点表；字体是否在 `static/`；码点格式 |
| 显示成内置图标 | `onLaunch` 是否执行、前缀是否登记成功、是否误用了保留前缀 |
| 打包后消失 | 字体文件是否在 `static/`、构建是否清理了该文件 |
| 小程序不显示 | `src` 是否 `/static/...`、`@font-face` 是否在 App.uvue 全局样式 |

## 关联

- 图标组件 API：[ux-icon 卡片](../api/ux-icon.md)
- 主题取色（自定义图标同样跟随 type / color）：[spec/07](07-theme-dark-mode.md)
- 安装与全局样式接入：[spec/01](01-install-and-setup.md)
