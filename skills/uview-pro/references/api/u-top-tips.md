<!-- 生成物，勿手改：由 scripts/gen-api-cards.mjs 渲染，改动会在下次再生成时丢失 -->

# u-top-tips API

> 来源：`components/u-top-tips`（uview-pro v0.6.21）
> API 指纹：`sha256:57052b2dffdd221288d855e9502b052d133be48f8de982aa3a048c8e66f56d55`
> 官方文档：https://uviewpro.cn/zh/components/topTips.html
> 再生成（组件库源码可读时）：`node scripts/gen-api-cards.mjs --lib <uview-pro 路径> --only top-tips`

该组件一般用于页面顶部向下滑出一个提示，尔后自动收起的场景。

## 用法示例

```vue
<u-top-tips ref="uTips"></u-top-tips>
```

## 属性

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `custom-style` / `customStyle` | 自定义根节点样式 | `string \| Record<string, any>` | - |
| `custom-class` / `customClass` | 自定义根节点样式类 | `string` | `''` |
| `navbar-height` / `navbarHeight` | 导航栏高度，用于提示的初始化 | `number \| string` | `0` |
| `z-index` / `zIndex` | z-index值 | `number \| string` | - |

## 双向绑定（v-model）

该组件无双向绑定。

## 事件

无类型化自定义事件（原生事件不受影响，可直接透传监听）。

## 插槽

无插槽。

## 命令式方法（通过组件 ref 调用）

| 方法 | 说明 |
| --- | --- |
| `show` | - |
