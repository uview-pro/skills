<!-- 生成物，勿手改：由 scripts/gen-api-cards.mjs 渲染，改动会在下次再生成时丢失 -->

# ux-tag API

> 来源：`components/ux-tag`（uview-pro-x v1.0.0）
> API 指纹：`sha256:8dff74007a7b38e8e2bf15238fd1d1d288fb9db8ada0c1f1fe42fb925f514214`
> 再生成（组件库源码可读时）：`node scripts/gen-api-cards.mjs --lib <uview-pro-x 路径> --only tag`

该组件一般用于标记和选择

## 属性

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `custom-style` / `customStyle` | 自定义根节点样式 | `string \| UTSJSONObject` | - |
| `custom-class` / `customClass` | 自定义根节点样式类 | `string` | `''` |
| `type` | 主题类型 | `ThemeType`（`primary`｜`info`｜`error`｜`warning`｜`success`｜`default`） | `'primary'` |
| `disabled` | 是否禁用 | `boolean \| string` | `false` |
| `size` | 标签大小 | `TagSize`（`default`｜`mini`） | `'default'` |
| `shape` | 标签形状：square-小圆角（默认）3px，round-胶囊，roundLeft/roundRight-单侧胶囊；直角请走 custom-style | `TagShape`（`square`｜`round`｜`roundLeft`｜`roundRight`） | `'square'` |
| `text` | 显示的文本内容 | `string \| number` | `''` |
| `color` | 文字颜色 | `string` | `''` |
| `bg-color` / `bgColor` | 背景颜色 | `string` | `''` |
| `border-color` / `borderColor` | 边框颜色 | `string` | `''` |
| `close-color` / `closeColor` | 关闭按钮颜色 | `string` | `''` |
| `mode` | 模式 | `TagMode`（`light`｜`dark`｜`plain`） | `'light'` |
| `closeable` | 是否可关闭 | `boolean` | `false` |
| `show` | 是否显示 | `boolean` | `true` |

## 双向绑定（v-model）

该组件无双向绑定。

> ⚠️ `show` 为单向属性（无 `update:show` 事件），**不支持** `v-model:show`。

## 事件

| 事件 | 回调参数 | 说明 |
| --- | --- | --- |
| `@click` | `event: UniEvent` | 点击标签触发 |
| `@close` | `event: UniEvent` | closeable为true时，点击标签关闭按钮触发 |

## 插槽

| 插槽名 | 说明 |
| --- | --- |
| `default` | - |

## 外部样式类

| 名称 | 说明 |
| --- | --- |
| `custom-class` | 自定义根节点样式类 |
