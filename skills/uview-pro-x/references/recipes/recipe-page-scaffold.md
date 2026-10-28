# 配方：最小页面脚手架

**适用场景**：新建业务页面（注册路由 → 起骨架 → 主题联动 → 放组件）。

**前置**：项目已完成接入（`spec/01`：插件市场导入 + easycom + main.uts 注册 + 在 `uni.scss` 接入主题变量——加密版粘贴 `$u-*` 变量块，源码版 `@import '@/uni_modules/uview-pro-x/theme.scss';`）。

## 1. 注册路由（pages.json）

```json
{
  "pages": [
    {
      "path": "pages/index/index",
      "style": { "navigationBarTitleText": "首页" }
    }
  ]
}
```

## 2. 页面骨架（pages/index/index.uvue）

```vue
<template>
    <view class="page" :style="cssVarsStyle">
        <!-- 自定义导航栏（可选；使用需在该页 pages.json style 增加 "navigationStyle": "custom"） -->
        <ux-navbar title="首页"></ux-navbar>

        <!-- 内容区 -->
        <view class="content">
            <ux-button text="主要按钮" type="primary" @click="onClick" />
            <ux-tag text="标签" type="success" />
        </view>
    </view>
</template>

<script setup lang="uts">
import { $u, useTheme } from '@/uni_modules/uview-pro-x'

/** 主题 CSS 变量样式：绑定到页面根节点后，换肤/暗黑切换时页面样式联动 */
const { cssVars } = useTheme()
const cssVarsStyle = computed(() => $u.toStyle(cssVars.value))

function onClick(): void {
    uni.showToast({ title: '点击了按钮', icon: 'none' })
}
</script>

<style lang="scss">
.page {
    display: flex;
    flex-direction: column;
    /* #ifndef APP */
    min-height: 100vh;
    /* #endif */
    /* #ifdef APP */
    flex: 1;
    /* #endif */
    background-color: $u-bg-color;
}

.content {
    padding: 16px;
}
</style>
```

## 3. 关键点说明

| 点 | 说明 |
|---|---|
| 根节点 `:style="cssVarsStyle"` | 注入主题 CSS 变量，主题/暗黑切换时页面自定义样式联动（原理见 `spec/03`） |
| `$u-*` SCSS 变量 | 页面颜色统一从主题取（`$u-bg-color` / `$u-main-color` 等），不硬编码 |
| 高度 | 非 App 用 `min-height: 100vh`；App 用 `flex: 1`（条件编译双轨） |
| 事件 | 统一 `@click`；模板中 ref 自动解包，不写 `.value` |
| 组件免导入 | `<ux-*>` 依赖 easycom（见 `spec/01`） |
| 自定义导航栏 | 用 `ux-navbar` 时必须设该页 `"navigationStyle": "custom"`，否则与原生导航栏叠加 |

## 4. 继续开发

- 选组件与工具：`spec/04`（组件速查表 / $u / hooks）
- 写脚本：`spec/02`（UTS 类型陷阱、模板规则）
- 写样式：`spec/03`（UCSS 红线、省略双轨、主题变量）
- 滚动与返回顶部：`recipe-page-scroll.md`
- 收尾自查：`spec/05`（红线表 + 症状速查 + 自查清单）
