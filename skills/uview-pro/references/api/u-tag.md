<!-- 生成物，勿手改：由 scripts/gen-api-cards.mjs 渲染，改动会在下次再生成时丢失 -->

# u-tag API

> 来源：`components/u-tag`（uview-pro v0.6.21）
> API 指纹：`sha256:b04102998d23bb8f2b42d8ac2f442e48262dc249b7e4c0f1ffd9a16dac1ccd07`
> 官方文档：https://uviewpro.cn/zh/components/tag.html
> 再生成（组件库源码可读时）：`node scripts/gen-api-cards.mjs --lib <uview-pro 路径> --only tag`

该组件一般用于标记和选择

## 用法示例

```vue
<u-tag text="雪月夜" type="success" />
```

## 属性

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `custom-style` / `customStyle` | 自定义根节点样式 | `string \| Record<string, any>` | - |
| `custom-class` / `customClass` | 自定义根节点样式类 | `string` | `''` |
| `type` | 类型，primary、success、info、warning、error | `ThemeType`（`primary`｜`info`｜`error`｜`warning`｜`success`｜`default`） | `'primary'` |
| `disabled` | 是否禁用 | `boolean \| string` | `false` |
| `size` | 尺寸，default/mini/medium | `TagSize`（`default`｜`mini`） | `'default'` |
| `shape` | 形状，square为方形，circle为圆形 | `TagShape`（`square`｜`circle`｜`circleLeft`｜`circleRight`） | `'square'` |
| `text` | 显示的文本内容 | `string \| number` | `''` |
| `color` | 文字颜色 | `string` | `''` |
| `bg-color` / `bgColor` | 背景颜色 | `string` | `''` |
| `border-color` / `borderColor` | 边框颜色 | `string` | `''` |
| `close-color` / `closeColor` | 关闭按钮颜色 | `string` | `''` |
| `index` | 索引值 | `string \| number` | `''` |
| `mode` | 模式，light/dark/plain等 | `TagMode`（`light`｜`dark`｜`plain`） | `'light'` |
| `closeable` | 是否可关闭 | `boolean` | `false` |
| `show` | 是否显示 | `boolean` | `true` |

## 双向绑定（v-model）

该组件无双向绑定。

> ⚠️ `show` 为单向属性（无 `update:show` 事件），**不支持** `v-model:show`；可见性由父组件 `:show` 绑定控制。

## 事件

| 事件 | 回调参数 | 说明 |
| --- | --- | --- |
| `@click` | `index: string \| number` | 点击标签触发 |
| `@close` | `index: string \| number` | closeable为true时，点击标签关闭按钮触发 |

## 插槽

| 插槽名 | 说明 |
| --- | --- |
| `default` | - |
