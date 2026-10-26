<!-- 生成物，勿手改：由 scripts/gen-api-cards.mjs 渲染，改动会在下次再生成时丢失 -->

# ux-text API

> 来源：`components/ux-text`（uview-pro-x v1.0.0）
> API 指纹：`sha256:084ce1a53b566d2fac147154a793ee6fa1039725c14aaa3c845a2e0e6c3419e9`
> 再生成（组件库源码可读时）：`node scripts/gen-api-cards.mjs --lib <uview-pro-x 路径> --only text`

此组件集成了文本类在项目中的常用功能，包括状态，拨打电话，格式化日期，*替换，超链接...等功能。

## 属性

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `custom-style` / `customStyle` | 自定义根节点样式 | `string \| UTSJSONObject` | - |
| `custom-class` / `customClass` | 自定义根节点样式类 | `string` | `''` |
| `type` | 主题颜色 | `string` | `''` |
| `show` | 是否显示文本 | `boolean` | `true` |
| `text` | 显示的值 | `string \| number` | `''` |
| `prefix-icon` / `prefixIcon` | 前置图标 | `string` | `''` |
| `suffix-icon` / `suffixIcon` | 后置图标 | `string` | `''` |
| `mode` | 文本处理模式 text\|price\|phone\|name\|date\|link | `string` | `'text'` |
| `href` | 链接地址 | `string` | `''` |
| `format` | 格式化规则 | `string` | `''` |
| `call` | 是否拨打电话 | `boolean` | `false` |
| `open-type` / `openType` | 小程序打开方式 | `string` | `''` |
| `lang` | 返回用户信息的语言，zh_CN / zh_TW / en，只微信小程序有效 | `string` | `''` |
| `session-from` / `sessionFrom` | 会话来源，open-type=contact 时有效，只微信小程序有效 | `string` | `''` |
| `send-message-title` / `sendMessageTitle` | 会话内消息卡片标题，open-type=contact 时有效 | `string` | `''` |
| `send-message-path` / `sendMessagePath` | 会话内消息卡片跳转路径，open-type=contact 时有效 | `string` | `''` |
| `send-message-img` / `sendMessageImg` | 会话内消息卡片图片，open-type=contact 时有效 | `string` | `''` |
| `show-message-card` / `showMessageCard` | 是否显示会话内消息卡片，open-type=contact 时有效 | `boolean` | `false` |
| `app-parameter` / `appParameter` | 打开 APP 时向 APP 传递的参数，open-type=launchApp 时有效 | `string` | `''` |
| `form-type` / `formType` | 用于 form 组件，点击分别触发 form 的 submit/reset 事件 | `string` | `''` |
| `bold` | 是否粗体 | `boolean` | `false` |
| `block` | 是否块状 | `boolean` | `false` |
| `lines` | 显示行数，超出省略号 | `string \| number` | `''` |
| `color` | 文本颜色 | `string` | `''` |
| `size` | 字体大小 | `string \| number` | `14` |
| `icon-style` / `iconStyle` | 图标样式 | `UTSJSONObject \| string` | - |
| `text-style` / `textStyle` | 文字样式 | `UTSJSONObject \| string` | - |
| `decoration` | 文字装饰 | `string` | `'none'` |
| `margin` | 外边距 | `UTSJSONObject \| string \| number` | `0` |
| `line-height` / `lineHeight` | 行高 | `string \| number` | `''` |
| `align` | 对齐方式 | `string` | `'left'` |
| `word-wrap` / `wordWrap` | 换行方式 | `string` | `'normal'` |

## 双向绑定（v-model）

该组件无双向绑定。

> ⚠️ `show` 为单向属性（无 `update:show` 事件），**不支持** `v-model:show`。

## 事件

| 事件 | 回调参数 | 说明 |
| --- | --- | --- |
| `@click` | `event: UniEvent` | 点击触发事件 |
| `@getuserinfo` | `event: UniEvent` | 获取用户信息回调，open-type=getUserInfo 时有效 |
| `@contact` | `event: UniEvent` | 客服消息回调，open-type=contact 时有效 |
| `@getphonenumber` | `event: UniEvent` | 获取手机号回调，open-type=getPhoneNumber 时有效 |
| `@error` | `event: UniEvent` | 开放能力发生错误时回调 |
| `@launchapp` | `event: UniEvent` | 打开 APP 成功回调，open-type=launchApp 时有效 |
| `@opensetting` | `event: UniEvent` | 打开授权设置页并关闭后回调，open-type=openSetting 时有效 |

## 插槽

| 插槽名 | 说明 |
| --- | --- |
| `default` | - |

## 外部样式类

| 名称 | 说明 |
| --- | --- |
| `custom-class` | 自定义根节点样式类 |
