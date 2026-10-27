<!-- 生成物，勿手改：由 scripts/gen-api-cards.mjs 渲染，改动会在下次再生成时丢失 -->

# u-button API

> 来源：`components/u-button`（uview-pro v0.6.21）
> API 指纹：`sha256:544e2f14aa1e921a675789955c561c9316d4b898258509175b102414b3758986`
> 官方文档：https://uviewpro.cn/zh/components/button.html
> 再生成（组件库源码可读时）：`node scripts/gen-api-cards.mjs --lib <uview-pro 路径> --only button`

Button 按钮

## 用法示例

```vue
<u-button>月落</u-button>
```

## 属性

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `custom-style` / `customStyle` | 自定义根节点样式 | `string \| Record<string, any>` | - |
| `custom-class` / `customClass` | 自定义根节点样式类 | `string` | `''` |
| `text` | 按钮文本 | `string` | `''` |
| `hair-line` / `hairLine` | 是否细边框 | `boolean` | `true` |
| `type` | 按钮的预置样式，default，primary，error，warning，success | `ButtonType`（`primary`｜`info`｜`error`｜`warning`｜`success`｜`default`） | `'default'` |
| `size` | 按钮尺寸，default，large, medium=small，mini | `ButtonSize`（`default`｜`small`｜`large`｜`default`｜`medium`｜`mini`） | `'default'` |
| `shape` | 按钮形状，circle（两边为半圆），square（带圆角） | `Shape`（`circle`｜`square`） | `'square'` |
| `plain` | 按钮是否镂空 | `boolean` | `false` |
| `disabled` | 是否禁止状态 | `boolean` | `false` |
| `loading` | 是否加载中 | `boolean` | `false` |
| `scope` | 支付宝小程序，当 open-type 为 getAuthorize 时有效 | `ButtonScope`（`phoneNumber`｜`userInfo`） | `''` |
| `open-type` / `openType` | 开放能力，具体请看uniapp稳定关于button组件部分说明 | `ButtonOpenType`（`feedback`｜`share`｜`getUserInfo`｜`contact`｜`getPhoneNumber`｜`launchApp`｜`openSetting`｜`chooseAvatar`｜`getAuthorize`｜`lifestyle`｜`contactShare`｜`openGroupProfile`｜`openGuildProfile`｜`openPublicProfile`｜`shareMessageToFriend`｜`addFriend`｜`addColorSign`｜`addGroupApp`｜`addToFavorites`｜`chooseAddress`｜`chooseInvoiceTitle`｜`login`｜`subscribe`｜`favorite`｜`watchLater`｜`openProfile`｜`agreePrivacyAuthorization`） | `''` |
| `form-type` / `formType` | 用于 &lt;form&gt; 组件，点击分别会触发 &lt;form&gt; 组件的 submit/reset 事件 | `ButtonFormType`（`''`｜`submit`｜`reset`） | `''` |
| `app-parameter` / `appParameter` | 打开 APP 时，向 APP 传递的参数，open-type=launchApp时有效 | `string` | `''` |
| `hover-stop-propagation` / `hoverStopPropagation` | 指定是否阻止本节点的祖先节点出现点击态，微信小程序有效 | `boolean` | `false` |
| `lang` | 指定返回用户信息的语言，zh_CN 简体中文，zh_TW 繁体中文，en 英文。只微信小程序有效 | `string` | `'en'` |
| `session-from` / `sessionFrom` | 会话来源，open-type="contact"时有效。只微信小程序有效 | `string` | `''` |
| `send-message-title` / `sendMessageTitle` | 会话内消息卡片标题，open-type="contact"时有效 | `string` | `''` |
| `send-message-path` / `sendMessagePath` | 会话内消息卡片点击跳转小程序路径，open-type="contact"时有效 | `string` | `''` |
| `send-message-img` / `sendMessageImg` | 会话内消息卡片图片，open-type="contact"时有效 | `string` | `''` |
| `show-message-card` / `showMessageCard` | 是否显示会话内消息卡片，open-type="contact"时有效 | `boolean` | `false` |
| `hover-bg-color` / `hoverBgColor` | 手指按（触摸）按钮时按钮时的背景颜色 | `string` | `''` |
| `ripple-bg-color` / `rippleBgColor` | 水波纹的背景颜色 | `string` | `''` |
| `ripple` | 是否开启水波纹效果 | `boolean` | `false` |
| `hover-class` / `hoverClass` | 按下的类名 | `string` | `''` |
| `data-name` / `dataName` | 额外传参参数，用于小程序的data-xxx属性，通过target.dataset.name获取 | `string` | `''` |
| `throttle-time` / `throttleTime` | 节流，一定时间内只能触发一次 | `string \| number` | `0` |
| `hover-start-time` / `hoverStartTime` | 按住后多久出现点击态，单位毫秒 | `string \| number` | `20` |
| `hover-stay-time` / `hoverStayTime` | 手指松开后点击态保留时间，单位毫秒 | `string \| number` | `150` |

## 双向绑定（v-model）

该组件无双向绑定。

## 事件

| 事件 | 回调参数 | 说明 |
| --- | --- | --- |
| `@click` | - | 按钮点击 |
| `@getuserinfo` | - | 用户点击该按钮时，会返回获取到的用户信息，从返回参数的detail中获取到的值同uni.getUserInfo |
| `@contact` | - | 客服消息回调 |
| `@getphonenumber` | - | open-type="getPhoneNumber"时有效 |
| `@error` | - | 当使用开放能力时，发生错误的回调 |
| `@launchapp` | - | 打开 APP 成功的回调 |
| `@opensetting` | - | 在打开授权设置页并关闭后回调 |
| `@chooseavatar` | - | 头像选择回调 |
| `@agreeprivacyauthorization` | - | 用户点击允许授权回调 |

## 插槽

| 插槽名 | 说明 |
| --- | --- |
| `default` | - |
