<!-- 生成物，勿手改：由 scripts/gen-api-cards.mjs 渲染，改动会在下次再生成时丢失 -->

# ux-link API

> 来源：`components/ux-link`（uview-pro-x v2.0.15）
> API 指纹：`sha256:1ccd070d5305552fea957690f8253b3cf9f11160c265418f7fe3f4d8db303019`
> 再生成（组件库源码可读时）：`node scripts/gen-api-cards.mjs --lib <uview-pro-x 路径> --only link`

该组件为超链接组件，在不同平台有不同表现形式：在APP平台会通过plus环境打开内置浏览器，在小程序中把链接复制到粘贴板，同时提示信息，在H5中通过window.open打开链接。

## 属性

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `custom-style` / `customStyle` | 自定义根节点样式 | `string \| JsonObject` | - |
| `custom-class` / `customClass` | 自定义根节点样式类 | `string` | `''` |
| `color` | 文字颜色 | `string` | `''` |
| `font-size` / `fontSize` | 字体大小，单位px | `string \| number` | `DEFAULT_FONT_SIZE` |
| `under-line` / `underLine` | 是否显示下划线 | `boolean` | `false` |
| `href` | 要跳转的链接 | `string` | `''` |
| `text` | 链接文字（未传入默认插槽内容时使用） | `string` | `''` |
| `mp-tips` / `mpTips` | 小程序中复制到粘贴板的提示语 | `string` | `''` |
| `line-color` / `lineColor` | 下划线颜色 | `string` | `''` |
| `default-click` / `defaultClick` | 是否默认点击跳转 | `boolean` | `true` |

## 类型定义

> 本卡引用的自定义类型展开定义（源自组件 types.ts / 全局 types/global.ts），对象字面量可直接赋值。

| 类型 | 定义 |
| --- | --- |
| `JsonObject` | `Record<string, any>`（普通对象，任意键值、可嵌套；全库统一对象类型，含内联样式） |

## 双向绑定（v-model）

该组件无双向绑定。

## 事件

| 事件 | 回调参数 | 说明 |
| --- | --- | --- |
| `@click` | `href: string` | - |

## 插槽

| 插槽名 | 说明 |
| --- | --- |
| `default` | - |

## 外部样式类

| 名称 | 说明 |
| --- | --- |
| `custom-class` | 自定义根节点样式类 |
