<!-- 生成物，勿手改：由 scripts/gen-api-cards.mjs 渲染，改动会在下次再生成时丢失 -->

# ux-tabbar API

> 来源：`components/ux-tabbar`（uview-pro-x v2.0.14）
> API 指纹：`sha256:34c378fde39c8fd254d50c1257823664414f67bcd9dd1680689ca43198cd6c03`
> 再生成（组件库源码可读时）：`node scripts/gen-api-cards.mjs --lib <uview-pro-x 路径> --only tabbar`

底部导航栏

## 属性

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `show` | 是否展示 | `boolean` | `true` |
| `model-value` / `modelValue` | v-model 绑定值 | `number` | `0` |
| `bg-color` / `bgColor` | 背景颜色 | `string` | `''` |
| `height` | 高度 | `string` | `'50px'` |
| `icon-size` / `iconSize` | 图标大小 | `string` | `DEFAULT_ICON_SIZE` |
| `mid-button-size` / `midButtonSize` | 中间按钮大小 | `string` | `DEFAULT_MID_BUTTON_SIZE` |
| `active-color` / `activeColor` | 激活颜色 | `string` | `''` |
| `inactive-color` / `inactiveColor` | 未激活颜色 | `string` | `''` |
| `mid-button` / `midButton` | 是否显示中间凸起按钮 | `boolean` | `false` |
| `list` | tab 列表 | `TabbarItem[]` | - |
| `z-index` / `zIndex` | z-index | `string` | `''` |
| `before-switch` / `beforeSwitch` | 切换前回调 | `(index: number) => boolean \| Promise<boolean>` | - |
| `border-top` / `borderTop` | 是否显示顶部边框 | `boolean` | `true` |
| `hide-tab-bar` / `hideTabBar` | 是否隐藏原生 tabbar | `boolean` | `true` |
| `gap` | 图标和文字间距 | `string` | `'2px'` |
| `text-size` / `textSize` | 文字大小 | `string` | `DEFAULT_TEXT_SIZE` |
| `custom-class` / `customClass` | 自定义类名 | `string` | `''` |
| `custom-style` / `customStyle` | 自定义样式 | `string \| JsonObject` | `''` |

## 类型定义

> 本卡引用的自定义类型展开定义（源自组件 types.ts / 全局 types/global.ts），对象字面量可直接赋值。

| 类型 | 定义 |
| --- | --- |
| `JsonObject` | `Record<string, any>`（普通对象，任意键值、可嵌套；全库统一对象类型，含内联样式） |
| `TabbarItem` | `{ iconPath?: string; selectedIconPath?: string; text?: string; pagePath?: string; midButton?: boolean; customIcon?: boolean \| string; count?: number; isDot?: boolean; width?: string \| number; iconSize?: string \| number; textSize?: string \| number; gap?: string \| number; }` |

## 双向绑定（v-model）

| 写法 | 通道 | 说明 |
| --- | --- | --- |
| `v-model` | prop + emit（`update:modelValue`） | `modelValue` 属性，默认 `0` |

> ⚠️ `show` 为单向属性（无 `update:show` 事件），**不支持** `v-model:show`。

## 事件

| 事件 | 回调参数 | 说明 |
| --- | --- | --- |
| `@change` | `index: number` | - |

## 插槽

无插槽。

## 外部样式类

| 名称 | 说明 |
| --- | --- |
| `custom-class` | 自定义根节点样式类 |
