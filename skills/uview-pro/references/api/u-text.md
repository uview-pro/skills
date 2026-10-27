<!-- 生成物，勿手改：由 scripts/gen-api-cards.mjs 渲染，改动会在下次再生成时丢失 -->

# u-text API

> 来源：`components/u-text`（uview-pro v0.6.21）
> API 指纹：`sha256:30e28c4d0c22130c49bbf40fe6bd18e77dbc3bee059dbb2b7df4dd2215ccb44b`
> 官方文档：https://uviewpro.cn/zh/components/text.html
> 再生成（组件库源码可读时）：`node scripts/gen-api-cards.mjs --lib <uview-pro 路径> --only text`

此组件集成了文本类在项目中的常用功能，包括状态，拨打电话，格式化日期，*替换，超链接...等功能。您大可不必在使用特殊文本时自己定义，text组件几乎涵盖您能使用的大部分场景。

## 用法示例

```vue
<u-text text="我用十年青春,赴你最后之约"></u-text>
```

## 属性

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `custom-style` / `customStyle` | 自定义根节点样式 | `string \| Record<string, any>` | - |
| `custom-class` / `customClass` | 自定义根节点样式类 | `string` | `''` |
| `type` | 主题颜色 | `ThemeType`（`primary`｜`info`｜`error`｜`warning`｜`success`｜`default`） | `''` |
| `show` | 是否显示文本 | `boolean` | `true` |
| `text` | 显示的值 | `string \| number` | `''` |
| `prefix-icon` / `prefixIcon` | 前置图标 | `string` | `''` |
| `suffix-icon` / `suffixIcon` | 后置图标 | `string` | `''` |
| `mode` | 文本处理模式 | `text`｜`price`｜`phone`｜`name`｜`date`｜`link` | `'text'` |
| `href` | 链接地址 | `string` | `''` |
| `format` | 格式化规则 | `string \| ((val: any) => any)` | `''` |
| `call` | 是否拨打电话 | `boolean` | `false` |
| `open-type` / `openType` | 小程序打开方式 | `string` | `''` |
| `bold` | 是否粗体 | `boolean` | `false` |
| `block` | 是否块状 | `boolean` | `false` |
| `lines` | 显示行数，超出省略号 | `string \| number` | `''` |
| `color` | 文本颜色 | `string` | `'var(--u-main-color)'` |
| `size` | 字体大小 | `string \| number` | `28` |
| `icon-style` / `iconStyle` | 图标样式 | `Record<string, any> \| string` | - |
| `text-style` / `textStyle` | 文字样式 | `Record<string, any> \| string` | - |
| `decoration` | 文字装饰 | `none`｜`underline`｜`line-through` | `'none'` |
| `margin` | 外边距 | `Record<string, any> \| string \| number` | `0` |
| `line-height` / `lineHeight` | 行高 | `string \| number` | `''` |
| `align` | 对齐方式 | `left`｜`center`｜`right` | `'left'` |
| `word-wrap` / `wordWrap` | 换行方式 | `break-word`｜`normal`｜`anywhere` | `'normal'` |
| `lang` | 语言 | `string` | `''` |
| `session-from` / `sessionFrom` | 会话来源 | `string` | `''` |
| `send-message-title` / `sendMessageTitle` | 消息标题 | `string` | `''` |
| `send-message-path` / `sendMessagePath` | 消息路径 | `string` | `''` |
| `send-message-img` / `sendMessageImg` | 消息图片 | `string` | `''` |
| `show-message-card` / `showMessageCard` | 是否显示消息卡片 | `boolean` | `false` |
| `app-parameter` / `appParameter` | app参数 | `string` | `''` |
| `form-type` / `formType` | 表单类型 | `string` | `''` |

## 双向绑定（v-model）

该组件无双向绑定。

> ⚠️ `show` 为单向属性（无 `update:show` 事件），**不支持** `v-model:show`；可见性由父组件 `:show` 绑定控制。

## 事件

| 事件 | 回调参数 | 说明 |
| --- | --- | --- |
| `@click` | - | 点击触发事件 |
| `@getuserinfo` | - | 获取用户信息时触发 |
| `@contact` | - | 打开客服会话时触发 |
| `@getphonenumber` | - | 获取用户手机号时触发 |
| `@error` | - | 使用开放能力出错时触发 |
| `@launchapp` | - | 打开小程序或APP时触发 |
| `@opensetting` | - | 打开授权设置页时触发 |

## 插槽

| 插槽名 | 说明 |
| --- | --- |
| `default` | - |
