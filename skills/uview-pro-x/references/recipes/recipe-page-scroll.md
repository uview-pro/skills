# 配方：三端滚动监听与返回顶部

**适用场景**：页面需要获取滚动距离（吸顶显隐、返回顶部按钮、滚动联动动画等）。

**核心事实**：`onPageScroll` 页面生命周期**在 App 端不生效**；App 端需把页面内容包进 `<scroll-view>` 监听其 `@scroll`。三端统一写法的骨架如下。

## 完整写法

```vue
<template>
    <!-- #ifdef APP -->
    <!-- App：页面内容包在 scroll-view 中，滚动监听挂在 scroll-view 上 -->
    <scroll-view
        id="page-scroll"
        class="page"
        direction="vertical"
        :show-scrollbar="false"
        :style="cssVarsStyle"
        @scroll="onScroll"
    >
        <view class="content">
            <!-- 页面内容，高度超出即滚动 -->
        </view>
        <!-- 返回顶部：App 端滚动发生在 scroll-view 内，靠 parent-id 指定归零容器 -->
        <ux-back-top :scroll-top="scrollTop" :top="300" parent-id="page-scroll"></ux-back-top>
    </scroll-view>
    <!-- #endif -->

    <!-- #ifndef APP -->
    <!-- H5 / 小程序：页面原生滚动 -->
    <view class="page" :style="cssVarsStyle">
        <view class="content">
            <!-- 页面内容 -->
        </view>
        <ux-back-top :scroll-top="scrollTop" :top="300"></ux-back-top>
    </view>
    <!-- #endif -->
</template>

<script setup lang="uts">
import { $u, useTheme } from '@/uni_modules/uview-pro-x'

const { cssVars } = useTheme()
const cssVarsStyle = computed(() => $u.toStyle(cssVars.value))

/** 当前滚动距离 */
const scrollTop = ref(0)

// App：scroll-view 滚动事件
// #ifdef APP
const onScroll = (e: UniScrollEvent) => {
    scrollTop.value = e.detail.scrollTop
}
// #endif

// H5 / 小程序：页面滚动生命周期
// #ifndef APP
onPageScroll((e) => {
    scrollTop.value = e.scrollTop
})
// #endif
</script>

<style lang="scss">
.page {
    background-color: $u-bg-color;
    /* #ifdef APP */
    flex: 1;
    /* #endif */
    /* #ifndef APP */
    min-height: 100vh;
    /* #endif */
}

.content {
    padding: 16px;
}
</style>
```

## 关键点说明

| 点 | 说明 |
|---|---|
| 结构双轨 | App 分支的 scroll-view 作为页面根直接子节点即可撑满；非 App 分支用普通 view + 页面原生滚动 |
| 滚动源 | App：`scroll-view` 的 `@scroll`（`e.detail.scrollTop`，事件类型 `UniScrollEvent`）；非 App：`onPageScroll`（`e.scrollTop`） |
| ux-back-top 三属性 | `:scroll-top` 喂入滚动距离（组件据此决定何时出现）；`:top` 出现阈值（px）；`parent-id` 仅 App 需要（指向滚动容器 id） |
| ref 自动解包 | 模板与脚本中 `scrollTop.value` 仅在脚本里写；模板绑定写 `scrollTop` |
| 事件类型 | `UniScrollEvent` 为框架内置类型，注意 `e.detail.scrollTop` 层级 |

## 收尾自查

- App / H5 / 小程序三端各验证：滚动时 `scrollTop` 正确更新、返回顶部按钮按预期出现并归零
- 对照 `spec/05` 红线表（尤其：文字属性在 `<text>`、无 vh/vw、事件类型标注）
