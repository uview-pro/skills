<!-- 生成物，勿手改：由 scripts/gen-api-cards.mjs 渲染，改动会在下次再生成时丢失 -->

# ux-button API

> 来源：`components/ux-button`（uview-pro-x v2.0.14）
> API 指纹：`sha256:73f43ff1f143b8b4596c9cfb7f58b453cafd07d61e8193370c2c56fa051de897`
> 再生成（组件库源码可读时）：`node scripts/gen-api-cards.mjs --lib <uview-pro-x 路径> --only button`

以 uni-app `button` 原生组件为基础进行二次封装，内置多套主题色并可选水波纹点击效果；纯文字与富内容分别由默认插槽与 content 插槽承载（见 @slot），App 端文字着色已显式处理

## 属性

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `custom-style` / `customStyle` | 自定义根节点样式 | `string \| JsonObject` | - |
| `custom-class` / `customClass` | 自定义根节点样式类 | `string` | `''` |
| `text` | 按钮文本：纯文字用 text 传入或写默认插槽均可，组件自动包带色 text 并着色；富内容（图标+文字混排、富样式）用 content 插槽，插槽内文字需自行设 color（App 端样式不继承） | `string` | `''` |
| `font-size` / `fontSize` | 按钮文字大小，单位px，不传时按 size 档位自动匹配（large 18 / default 15 / small 12）；只改字号，不改按钮高度 | `string \| number` | `''` |
| `bold` | 按钮文字是否加粗（含 loading 文案，默认 false） | `boolean` | `false` |
| `color` | 按钮文字颜色，不传时跟随 type/plain 派生；图标与 loading 圆环默认跟随本项；按压时文字回退 type 状态色（自传 hover-class 时按压文字色交给该样式类） | `string` | `''` |
| `height` | 按钮高度，单位px，不传时按 size 档位（large 50 / default 40 / small 30）；文字行高同步跟随，shape=circle 且非 block 时宽度同步为同值以保持正圆 | `string \| number` | `''` |
| `icon` | 图标名称，见 ux-icon 图标集，loading 时自动隐藏 | `string` | `''` |
| `icon-size` / `iconSize` | 图标大小，单位px，不传时按按钮尺寸自动匹配 | `string \| number` | `''` |
| `icon-color` / `iconColor` | 图标颜色，不传时跟随按钮文字色 | `string` | `''` |
| `icon-top` / `iconTop` | 图标垂直偏移，单位px，正数向上 | `number` | `0` |
| `block` | 是否占满一行 | `boolean` | `false` |
| `hair-line` / `hairLine` | 是否细边框 | `boolean` | `true` |
| `type` | 按钮的预置样式，default，primary，error，warning，success | `ButtonType`（`primary`｜`info`｜`error`｜`warning`｜`success`｜`default`） | `'default'` |
| `size` | 按钮尺寸，large，default，small | `ButtonSize`（`default`｜`small`｜`large`） | `'default'` |
| `shape` | 按钮形状：square-小圆角（默认）4px，round-胶囊，circle-正圆（宽高相等，带文字会撑成椭圆属预期）；与 block 同传时 circle 自动降级为 round；真直角不是档位，请传 border-radius=0 | `ButtonShape`（`square`｜`round`｜`circle`） | `'square'` |
| `border-radius` / `borderRadius` | 自定义圆角值，单位px，优先级高于 shape 预设（square/round/circle 三档）；传此值可定制任意圆角，传 0 即为真直角（默认 '' 表示未设置） | `string \| number` | `''` |
| `plain` | 按钮是否镂空 | `boolean` | `false` |
| `disabled` | 是否禁止状态 | `boolean` | `false` |
| `loading` | 是否加载中 | `boolean` | `false` |
| `loading-text` / `loadingText` | 加载中显示的文案，不传时沿用按钮文本 | `string` | `''` |
| `loading-size` / `loadingSize` | 加载图标的大小，单位px，不传时按按钮尺寸自动匹配 | `string \| number` | `''` |
| `scope` | 支付宝小程序，当 open-type 为 getAuthorize 时有效 | `ButtonScope`（`phoneNumber`｜`userInfo`） | `''` |
| `open-type` / `openType` | 开放能力，详见 uni-app button 组件开放能力说明 | `ButtonOpenType`（`feedback`｜`share`｜`getUserInfo`｜`contact`｜`getPhoneNumber`｜`launchApp`｜`openSetting`｜`chooseAvatar`｜`getAuthorize`｜`lifestyle`｜`contactShare`｜`openGroupProfile`｜`openGuildProfile`｜`openPublicProfile`｜`shareMessageToFriend`｜`addFriend`｜`addColorSign`｜`addGroupApp`｜`addToFavorites`｜`chooseAddress`｜`chooseInvoiceTitle`｜`login`｜`subscribe`｜`favorite`｜`watchLater`｜`openProfile`｜`agreePrivacyAuthorization`） | `''` |
| `form-type` / `formType` | 用于 &lt;form&gt; 组件，点击触发 submit / reset 事件 | `ButtonFormType`（`''`｜`submit`｜`reset`） | `''` |
| `app-parameter` / `appParameter` | 打开 APP 时，向 APP 传递的参数，open-type=launchApp时有效 | `string` | `''` |
| `hover-stop-propagation` / `hoverStopPropagation` | 指定是否阻止本节点的祖先节点出现点击态，微信小程序有效 | `boolean` | `false` |
| `lang` | 指定返回用户信息的语言，zh_CN 简体中文，zh_TW 繁体中文，en 英文。只微信小程序有效 | `string` | `'en'` |
| `session-from` / `sessionFrom` | 会话来源，open-type="contact"时有效。只微信小程序有效 | `string` | `''` |
| `send-message-title` / `sendMessageTitle` | 会话内消息卡片标题，open-type="contact"时有效 | `string` | `''` |
| `send-message-path` / `sendMessagePath` | 会话内消息卡片点击跳转小程序路径，open-type="contact"时有效 | `string` | `''` |
| `send-message-img` / `sendMessageImg` | 会话内消息卡片图片，open-type="contact"时有效 | `string` | `''` |
| `show-message-card` / `showMessageCard` | 是否显示会话内消息卡片，open-type="contact"时有效 | `boolean` | `false` |
| `ripple-bg-color` / `rippleBgColor` | 水波纹的背景颜色 | `string` | `''` |
| `ripple` | 是否开启水波纹效果 | `boolean` | `false` |
| `hover-class` / `hoverClass` | 按下的类名 | `string` | `''` |
| `data-name` / `dataName` | 额外传参参数，用于小程序的data-xxx属性，通过target.dataset.name获取 | `string` | `''` |
| `throttle-time` / `throttleTime` | 节流，一定时间内只能触发一次 | `string \| number` | `0` |
| `hover-start-time` / `hoverStartTime` | 按住后多久出现点击态，单位毫秒 | `string \| number` | `20` |
| `hover-stay-time` / `hoverStayTime` | 手指松开后点击态保留时间，单位毫秒 | `string \| number` | `150` |

## 类型定义

> 本卡引用的自定义类型展开定义（源自组件 types.ts / 全局 types/global.ts），对象字面量可直接赋值。

| 类型 | 定义 |
| --- | --- |
| `ButtonFormType` | `'' \| 'submit' \| 'reset'` |
| `ButtonOpenType` | `\| 'feedback' \| 'share' \| 'getUserInfo' \| 'contact' \| 'getPhoneNumber' \| 'launchApp' \| 'openSetting' \| 'chooseAvatar' \| 'getAuthorize' \| 'lifestyle' \| 'contactShare' \| 'openGroupProfile' \| 'openGuildProfile' \| 'openPublicProfile' \| 'shareMessageToFriend' \| 'addFriend' \| 'addColorSign' \| 'addGroupApp' \| 'addToFavorites' \| 'chooseAddress' \| 'chooseInvoiceTitle' \| 'login' \| 'subscribe' \| 'favorite' \| 'watchLater' \| 'openProfile' \| 'agreePrivacyAuthorization'` |
| `ButtonScope` | `'phoneNumber' \| 'userInfo'` |
| `ButtonShape` | `'square' \| 'round' \| 'circle'` |
| `ButtonSize` | `SizeType` |
| `ButtonType` | `'primary' \| 'info' \| 'error' \| 'warning' \| 'success' \| 'default'` |
| `JsonObject` | `Record<string, any>`（普通对象，任意键值、可嵌套；全库统一对象类型，含内联样式） |
| `SizeType` | `'default' \| 'small' \| 'large'` |

## 双向绑定（v-model）

该组件无双向绑定。

## 事件

| 事件 | 回调参数 | 说明 |
| --- | --- | --- |
| `@click` | `event: UniEvent` | 按钮点击 |
| `@getuserinfo` | `event: UniEvent` | 获取用户信息回调，detail 中值同 uni.getUserInfo |
| `@contact` | `event: UniEvent` | 客服消息回调 |
| `@getphonenumber` | `event: UniEvent` | open-type=getPhoneNumber 时有效 |
| `@error` | `event: UniEvent` | 使用开放能力发生错误时回调 |
| `@launchapp` | `event: UniEvent` | 打开 APP 成功回调 |
| `@opensetting` | `event: UniEvent` | 打开授权设置页并关闭后回调 |
| `@chooseavatar` | `event: UniEvent` | 头像选择回调 |
| `@agreeprivacyauthorization` | `event: UniEvent` | 用户点击允许授权回调 |

## 插槽

| 插槽名 | 说明 |
| --- | --- |
| `default` | 按钮纯文字内容，组件自动包在带色 text 内并着色（App/H5/小程序到齐），纯文字直接用默认插槽或 text 属性 |
| `content` | 完全自定义按钮文字区（图标/view/富样式混排），原样放置、保留 icon 与 loading，插槽内文字需自行设置 color（App 端样式不继承） |

## 外部样式类

| 名称 | 说明 |
| --- | --- |
| `custom-class` | 自定义根节点样式类 |
