<!-- 生成物，勿手改：由 scripts/gen-api-cards.mjs 渲染，改动会在下次再生成时丢失 -->

# ux-subsection API

> 来源：`components/ux-subsection`（uview-pro-x v2.0.2）
> API 指纹：`sha256:24bef807420725b3dd10adf358a7b45914668a219aabcd1e2485ed8f51e2783b`
> 再生成（组件库源码可读时）：`node scripts/gen-api-cards.mjs --lib <uview-pro-x 路径> --only subsection`

横向分段选择器，内置 button-按钮式与 subsection-选项卡式两种外观：滑动条随选中项移动（animation 控制过渡），切换后通过 change 事件回传下标

## 属性

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `custom-style` / `customStyle` | 自定义根节点样式 | `string \| JsonObject` | - |
| `custom-class` / `customClass` | 自定义根节点样式类 | `string` | `''` |
| `list` | 分段项数组，每项 { name, disabled?, width? }，默认 [] | `SubsectionListItem[]` | - |
| `current` | 当前选中项下标，默认 0 | `number \| string` | `0` |
| `active-color` / `activeColor` | 选中主色：button 模式为选中文字色，subsection 模式为滑条底色与未选中文字色，不传时取全局主文字色 | `string` | `''` |
| `inactive-color` / `inactiveColor` | 未选中文字颜色（button 模式），不传时取全局内容色 | `string` | `''` |
| `mode` | 外观模式：button-按钮式 \| subsection-选项卡式，默认 button | `SubsectionMode`（`button`｜`subsection`） | `'button'` |
| `font-size` / `fontSize` | 文字大小，单位px，默认 14 | `number \| string` | `14` |
| `height` | 组件高度，单位px，默认 35 | `number \| string` | `35` |
| `animation` | 滑动条移动是否带过渡动画，默认 true | `boolean` | `true` |
| `bold` | 选中项文字是否加粗，默认 true | `boolean` | `true` |
| `bg-color` / `bgColor` | button 模式的容器背景色，不传时取全局分割线色 | `string` | `''` |
| `button-color` / `buttonColor` | button 模式的滑动条背景色，不传时取全局白色 | `string` | `''` |
| `vibrate-short` / `vibrateShort` | 切换时是否触发轻微振动，默认 false | `boolean` | `false` |
| `disabled` | 是否禁用整个分段器 | `boolean` | `false` |

## 类型定义

> 本卡引用的自定义类型展开定义（源自组件 types.ts / 全局 types/global.ts），对象字面量可直接赋值。

| 类型 | 定义 |
| --- | --- |
| `JsonObject` | `Record<string, any>`（普通对象，任意键值、可嵌套；全库统一对象类型，含内联样式） |
| `SubsectionListItem` | `{ name: string; disabled?: boolean; width?: number; }` |
| `SubsectionMode` | `'button' \| 'subsection'` |

## 双向绑定（v-model）

该组件无双向绑定。

## 事件

| 事件 | 回调参数 | 说明 |
| --- | --- | --- |
| `@change` | `index: number` | 选中项变化时触发，携带 index |

## 插槽

无插槽。

## 外部样式类

| 名称 | 说明 |
| --- | --- |
| `custom-class` | 自定义根节点样式类 |
