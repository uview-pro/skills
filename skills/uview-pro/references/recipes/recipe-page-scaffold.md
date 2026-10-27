# 配方：最小页面脚手架

**适用场景**：新建业务页面（注册路由 → 起骨架 → 主题变量承载 → 放组件）。

**前置**：项目已完成接入（`spec/01`：安装 uview-pro + easycom + main.ts 注册 + 样式接入）。

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

## 2. 页面骨架（pages/index/index.vue）

```vue
<template>
    <view class="page" :style="cssVarsStyle">
        <!-- 自定义导航栏（可选；使用需在该页 pages.json style 增加 "navigationStyle": "custom"） -->
        <u-navbar title="首页"></u-navbar>

        <!-- 内容区 -->
        <view class="content">
            <u-button text="主要按钮" type="primary" @click="onClick" />
            <u-tag text="标签" type="success" />
        </view>
    </view>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { $u, useTheme } from 'uview-pro'

/** 主题 CSS 变量样式：绑定到页面根节点后，换肤/暗黑切换时页面样式实时联动（机制见 spec/07） */
const { cssVars } = useTheme()
const cssVarsStyle = computed(() => $u.toStyle(cssVars.value))

function onClick() {
    uni.showToast({ title: '点击了按钮', icon: 'none' })
}
</script>

<style lang="scss">
.page {
    min-height: 100vh;
    background-color: $u-bg-color;
}

.content {
    padding: 32rpx;
}
</style>
```

> 若项目已接入 `vite-plugin-uni-root`（`App.root.vue` 内统一 `<u-config-provider>` 包裹，见 `spec/01` 第六步 / `spec/07`），页面可省略根节点的 `:style="cssVarsStyle"`——变量已由根组件承载。

## 3. 关键点说明

| 点 | 说明 |
|---|---|
| 根节点 `:style="cssVarsStyle"` | 把当前主题 + 模式的 CSS 变量内联到页面根节点；**非 H5 端（App / 小程序）没有 document 注入通道，必须承载**（原理见 `spec/07`），H5 端承载与否都生效 |
| `$u-*` SCSS 变量 | 页面颜色统一从主题取（`$u-bg-color` / `$u-main-color` 等），不硬编码色值，多主题/暗黑才能生效（见 `spec/03`） |
| 高度 | `min-height: 100vh` 多端通用；长列表滚动用页面滚动或 `scroll-view`（配 `u-loadmore`） |
| 事件 | 统一 `@click`；模板中 ref 自动解包，script 中写 `.value` |
| 组件免导入 | `<u-*>` 依赖 easycom（见 `spec/01`），无需手动 import |
| 自定义导航栏 | 用 `u-navbar` 时必须设该页 `"navigationStyle": "custom"`，否则与原生导航栏叠加 |

## 4. 继续开发

- 选组件与工具：`spec/04`（组件速查表 / `$u` / hooks / http 请求）
- 写脚本：`spec/02`（Vue3 组合式 + TS 写法、页面生命周期、模板绑定规则）
- 写样式：`spec/03`（SCSS、主题取色、暗黑模式写法）
- 多语言 / 换肤：`spec/06` / `spec/07`
- 收尾自查：`spec/05`（红线表 + 症状速查 + 自查清单）
