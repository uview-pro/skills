<!-- 生成物，勿手改：由 scripts/gen-api-cards.mjs 渲染，改动会在下次再生成时丢失 -->

# u-status-bar API

> 来源：`components/u-status-bar`（uview-pro v0.6.21）
> API 指纹：`sha256:567fa659d1373f2c20345b89bc366a4a3e8c45f98ab27aa121575850f830df6a`
> 再生成（组件库源码可读时）：`node scripts/gen-api-cards.mjs --lib <uview-pro 路径> --only status-bar`

该组件一般用于自定义导航栏场景，按设备状态栏高度生成占位区域，适配刘海屏，可自定义背景色与样式

## 用法示例

```vue
<u-status-bar></u-status-bar>
```

## 属性

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `custom-style` / `customStyle` | 自定义根节点样式 | `string \| Record<string, any>` | - |
| `custom-class` / `customClass` | 自定义根节点样式类 | `string` | `''` |
| `background` | 背景设置 | `string` | `'transparent'` |

## 双向绑定（v-model）

该组件无双向绑定。

## 事件

无类型化自定义事件（原生事件不受影响，可直接透传监听）。

## 插槽

| 插槽名 | 说明 |
| --- | --- |
| `default` | - |
