<!-- 生成物，勿手改：由 scripts/gen-api-cards.mjs 渲染，改动会在下次再生成时丢失 -->

# u-sticky API

> 来源：`components/u-sticky`（uview-pro v0.6.21）
> API 指纹：`sha256:ca6768ce0454b3f893527ccc05685e13dda7b6117f40260f8d575985d966a0c4`
> 官方文档：https://uviewpro.cn/zh/components/sticky.html
> 再生成（组件库源码可读时）：`node scripts/gen-api-cards.mjs --lib <uview-pro 路径> --only sticky`

该组件与CSS中position: sticky属性实现的效果一致，当组件达到预设的到顶部距离时，就会固定在指定位置，组件位置大于预设的顶部距离时，会重新按照正常的布局排列。

## 用法示例

```vue
<u-sticky offset-top="200"><view>塞下秋来风景异，衡阳雁去无留意</view></u-sticky>
```

## 属性

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `custom-style` / `customStyle` | 自定义根节点样式 | `string \| Record<string, any>` | - |
| `custom-class` / `customClass` | 自定义根节点样式类 | `string` | `''` |
| `offset-top` / `offsetTop` | 吸顶容器到顶部某个距离的时候，进行吸顶，在H5平台，NavigationBar为44px | `number \| string` | `0` |
| `index` | 列表中的索引值 | `number \| string` | `''` |
| `enable` | 是否开启吸顶功能 | `boolean` | `true` |
| `h5-nav-height` / `h5NavHeight` | h5顶部导航栏的高度 | `number \| string` | `44` |
| `bg-color` / `bgColor` | 吸顶区域的背景颜色 | `string` | `'var(--u-bg-white)'` |
| `z-index` / `zIndex` | z-index值 | `number \| string` | - |

## 双向绑定（v-model）

该组件无双向绑定。

## 事件

| 事件 | 回调参数 | 说明 |
| --- | --- | --- |
| `@fixed` | - | 组件吸顶时触发 |
| `@unfixed` | - | 组件取消吸顶时触发 |

## 插槽

| 插槽名 | 说明 |
| --- | --- |
| `default` | - |
