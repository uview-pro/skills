<!-- 生成物，勿手改：由 scripts/gen-api-cards.mjs 渲染，改动会在下次再生成时丢失 -->

# u-read-more API

> 来源：`components/u-read-more`（uview-pro v0.6.21）
> API 指纹：`sha256:7c8ae3fef4fda9f0e9b9f195fed7fd93388305c571245b967ff541d34df02219`
> 官方文档：https://uviewpro.cn/zh/components/readMore.html
> 再生成（组件库源码可读时）：`node scripts/gen-api-cards.mjs --lib <uview-pro 路径> --only read-more`

该组件一般用于内容较长，预先收起一部分，点击展开全部内容的场景。

## 用法示例

```vue
<u-read-more><rich-text :nodes="content"></rich-text></u-read-more>
```

## 属性

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `custom-style` / `customStyle` | 自定义根节点样式 | `string \| Record<string, any>` | - |
| `custom-class` / `customClass` | 自定义根节点样式类 | `string` | `''` |
| `show-height` / `showHeight` | 默认的显示占位高度，单位为rpx | `number \| string` | `400` |
| `toggle` | 展开后是否显示"收起"按钮 | `boolean` | `false` |
| `close-text` / `closeText` | 关闭时的提示文字 | `string` | `''` |
| `open-text` / `openText` | 展开时的提示文字 | `string` | `''` |
| `color` | 提示的文字颜色 | `string` | - |
| `font-size` / `fontSize` | 提示文字的大小 | `number \| string` | `28` |
| `shadow-style` / `shadowStyle` | 是否显示阴影 | `Record<string, any>` | - |
| `text-indent` / `textIndent` | 段落首行缩进的字符个数 | `string` | `'2em'` |
| `index` | open和close事件时，将此参数返回在回调参数中 | `number \| string` | `''` |

## 双向绑定（v-model）

该组件无双向绑定。

## 事件

| 事件 | 回调参数 | 说明 |
| --- | --- | --- |
| `@open` | - | 展开时触发 |
| `@close` | - | 收起时触发 |

## 插槽

| 插槽名 | 说明 |
| --- | --- |
| `default` | - |

## 命令式方法（通过组件 ref 调用）

| 方法 | 说明 |
| --- | --- |
| `init` | - |
