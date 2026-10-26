<!-- 生成物，勿手改：由 scripts/gen-api-cards.mjs 渲染，改动会在下次再生成时丢失 -->

# ux-col API

> 来源：`components/ux-col`（uview-pro-x v1.0.0）
> API 指纹：`sha256:6f80cd01c61b33ff40dfe68cbe82bbccd3b76e6381c5e94aa91641c2be890d19`
> 再生成（组件库源码可读时）：`node scripts/gen-api-cards.mjs --lib <uview-pro-x 路径> --only col`

与 ux-row 配套的栅格列：一行按总 12 栏均分，span 决定所占栏数、offset 决定左偏移；分栏间隔由父级 ux-row 的 gutter 下发，本组件在左右各留一半，脱离 ux-row 使用时无间隔

## 属性

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `custom-style` / `customStyle` | 自定义根节点样式 | `UTSJSONObject` | - |
| `custom-class` / `customClass` | 自定义根节点样式类 | `string` | `''` |
| `span` | 栅格占据的列数，总 12 等分 | `number \| string` | `12` |
| `offset` | 分栏左边偏移，同 span 计算方式（总 12 栏） | `number \| string` | `0` |
| `justify` | 水平排列方式 | `string` | `'start'` |
| `align` | 垂直排列方式 | `string` | `'center'` |
| `text-align` / `textAlign` | 文字水平对齐方式 | `string` | `'left'` |

## 双向绑定（v-model）

该组件无双向绑定。

## 事件

无类型化自定义事件（原生事件不受影响，可直接透传监听）。

## 插槽

| 插槽名 | 说明 |
| --- | --- |
| `default` | 列内容 |

## 外部样式类

| 名称 | 说明 |
| --- | --- |
| `custom-class` | 自定义根节点样式类 |
