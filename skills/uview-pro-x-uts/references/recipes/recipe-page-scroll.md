# 配方：三端滚动监听与返回顶部

**适用场景**：页面需要获取滚动距离（吸顶显隐、返回顶部按钮、滚动联动动画等）。

**核心事实**：`onPageScroll` 页面生命周期在**页面层**三端都可用（App 端同样触发），但在**自定义组件内不触发**；更关键的是**小程序端必须在页面脚本里写出 `onPageScroll(...)` 这次调用**——小程序编译期靠它给页面挂滚动钩子，写在 `.uts` / hook / 组件里都不会被挂载，滚动距离会一直是 0。如果页面内容被包进 `<scroll-view>` 且该容器自身在滚（有高度约束），则只有容器的 `@scroll` 会触发。两条通道用 `usePageScroll()` 接，注册那一行留在页面脚本里，页面里依然不判断平台。

## 完整写法

```vue
<template>
    <!-- #ifdef APP -->
    <!-- App：页面内容包在 scroll-view 中，@scroll 绑 usePageScroll 返回的 onScroll -->
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
import { $u, useTheme, usePageScroll } from '@/uni_modules/uview-pro-x'

const { cssVars } = useTheme()
const cssVarsStyle = computed(() => $u.toStyle(cssVars.value))

// 滚动距离与容器处理器都来自 hook；页面滚动与容器滚动写进同一个 ref
const { scrollTop, onScroll, setScrollTop } = usePageScroll()

// 页面层滚动必须在页面脚本里注册：小程序端编译期靠这次调用给页面挂上滚动钩子
onPageScroll((e) => {
    setScrollTop(e.scrollTop)
})
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
| hook 归属 | `usePageScroll()` 必须在**页面** setup 调用；页面层 `onPageScroll((e) => setScrollTop(e.scrollTop))` 也必须写在**页面脚本**里（小程序编译期要在页面文件里看到这次调用，否则不挂滚动钩子 → 三端里只有小程序拿到 0） |
| 结构双轨 | App 分支的 scroll-view 作为页面根直接子节点即可撑满（需高度约束，否则不会自滚）；非 App 分支用普通 view + 页面原生滚动 |
| 滚动源 | 页面层：页面脚本注册的 `onPageScroll`（`e.scrollTop`）；容器层：`scroll-view` 的 `@scroll`（`e.detail.scrollTop`，事件类型 `UniScrollEvent`）；两者由 hook 统一写同一个 ref，页面不再写 `#ifdef` |
| ux-back-top 三属性 | `:scroll-top` 喂入滚动距离（组件据此决定何时出现）；`:top` 出现阈值（px）；`parent-id` 仅 App 需要（指向滚动容器 id） |
| ref 自动解包 | 模板与脚本中 `scrollTop.value` 仅在脚本里写；模板绑定写 `scrollTop` |
| 吸顶 | `ux-sticky` 用 `:navbar` 声明页面顶部结构（`default` / `custom` / `none` / 数值），吸顶线由组件自己换算，页面不拼状态栏与导航栏高度 |

## 收尾自查

- App / H5 / 小程序三端各验证：滚动时 `scrollTop` 正确更新、返回顶部按钮按预期出现并归零
- 对照 `spec/05` 红线表（尤其：文字属性在 `<text>`、无 vh/vw、事件类型标注）
