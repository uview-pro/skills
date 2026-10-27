<!-- 生成物，勿手改：由 scripts/gen-api-cards.mjs 渲染，改动会在下次再生成时丢失 -->

# u-col API

> 来源：`components/u-col`（uview-pro v0.6.21）
> API 指纹：`sha256:153da2230e79c2d28182cfb080cb0e081a1ff5182bf1cd005147e6f536e80caf`
> 官方文档：https://uviewpro.cn/zh/components/layout.html
> 再生成（组件库源码可读时）：`node scripts/gen-api-cards.mjs --lib <uview-pro 路径> --only col`

通过基础的 12 分栏，迅速简便地创建布局（搭配&lt;u-row&gt;使用）

## 用法示例

```vue
<u-col span="3"><view class="demo-layout bg-purple"></view></u-col>
```

## 属性

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `custom-style` / `customStyle` | 自定义根节点样式 | `string \| Record<string, any>` | - |
| `custom-class` / `customClass` | 自定义根节点样式类 | `string` | `''` |
| `span` | 占父容器宽度的多少等分，总分为12份 | `number \| string` | `12` |
| `offset` | 指定栅格左侧的间隔数(总12栏) | `number \| string` | `0` |
| `justify` | 水平排列方式 | `JustifyType`（`start`｜`end`｜`center`｜`around`｜`between`） | `'start'` |
| `align` | 垂直对齐方式 | `AlignType`（`top`｜`center`｜`bottom`） | `'center'` |
| `text-align` / `textAlign` | 文字对齐方式 | `string` | `'left'` |
| `stop` | 是否阻止事件传播 | `boolean` | `true` |

## 双向绑定（v-model）

该组件无双向绑定。

## 事件

| 事件 | 回调参数 | 说明 |
| --- | --- | --- |
| `@click` | - | 点击时触发 |

## 插槽

| 插槽名 | 说明 |
| --- | --- |
| `default` | - |
