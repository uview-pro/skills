<!-- 生成物，勿手改：由 scripts/gen-api-cards.mjs 渲染，改动会在下次再生成时丢失 -->

# u-dropdown API

> 来源：`components/u-dropdown`（uview-pro v0.6.21）
> API 指纹：`sha256:559adbb02a09e32e5b342adc2a56c91e89fa3c8f4823891741bf7d2c65fe7731`
> 官方文档：https://uviewpro.cn/zh/components/dropdown.html
> 再生成（组件库源码可读时）：`node scripts/gen-api-cards.mjs --lib <uview-pro 路径> --only dropdown`

该组件一般用于向下展开菜单，同时可切换多个选项卡的场景。支持fixed定位，自动适配状态栏和导航栏高度，并提供占位区域防止页面塌陷。

## 用法示例

```vue
<u-dropdown :fixed="true"></u-dropdown>
```

## 属性

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `custom-style` / `customStyle` | 自定义根节点样式 | `string \| Record<string, any>` | - |
| `custom-class` / `customClass` | 自定义根节点样式类 | `string` | `''` |
| `active-color` / `activeColor` | 菜单标题和选项的激活态颜色 | `string` | - |
| `inactive-color` / `inactiveColor` | 菜单标题和选项的未激活态颜色 | `string` | - |
| `close-on-click-mask` / `closeOnClickMask` | 点击遮罩是否关闭菜单 | `boolean` | `true` |
| `close-on-click-self` / `closeOnClickSelf` | 点击当前激活项标题是否关闭菜单 | `boolean` | `true` |
| `duration` | 过渡时间 | `number \| string` | `300` |
| `height` | 标题菜单的高度，单位任意，数值默认为rpx单位 | `number \| string` | `80` |
| `border-bottom` / `borderBottom` | 是否显示下边框 | `boolean` | `false` |
| `title-size` / `titleSize` | 标题的字体大小 | `number \| string` | `28` |
| `border-radius` / `borderRadius` | 下拉出来的内容部分的圆角值 | `number \| string` | `0` |
| `menu-icon` / `menuIcon` | 菜单右侧的icon图标 | `string` | `'arrow-down'` |
| `menu-icon-size` / `menuIconSize` | 菜单右侧图标的大小 | `number \| string` | `26` |
| `fixed` | 是否使用fixed定位，开启后下拉菜单固定在顶部，自动适配状态栏和导航栏高度，并生成占位区域防止页面塌陷 | `boolean` | `false` |
| `offset-top` / `offsetTop` | fixed定位时，在自动计算的偏移量基础上的额外顶部偏移量（px），用于用户微调位置。实际top = statusBarHeight + navbarHeight + offsetTop | `number \| string` | `0` |
| `navbar-height` / `navbarHeight` | fixed定位时，状态栏和导航栏所占的总高度（px）。默认不设置（空字符串），组件会自动获取系统状态栏高度 + 默认导航栏高度（44px）。设置任意数值（包括0）则使用用户指定值，不再自动计算。 | `number \| string` | `''` |
| `immersive` | 沉浸式模式，仅在fixed下生效。开启后不生成占位区域，允许页面内容延伸到dropdown下方（类似沉浸式导航栏） | `boolean` | `false` |
| `z-index` / `zIndex` | fixed定位时的z-index值 | `number \| string` | - |

## 双向绑定（v-model）

该组件无双向绑定。

## 事件

| 事件 | 回调参数 | 说明 |
| --- | --- | --- |
| `@open` | - | 下拉菜单被打开时触发 |
| `@close` | - | 下拉菜单被关闭时触发 |

## 插槽

| 插槽名 | 说明 |
| --- | --- |
| `default` | - |

## 命令式方法（通过组件 ref 调用）

| 方法 | 说明 |
| --- | --- |
| `init` | - |
| `close` | - |
| `open` | - |
| `highlight` | - |
| `getContentHeight` | - |
| `children` | - |
| `menuList` | - |
