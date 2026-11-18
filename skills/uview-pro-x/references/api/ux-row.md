<!-- 生成物，勿手改：由 scripts/gen-api-cards.mjs 渲染，改动会在下次再生成时丢失 -->

# ux-row API

> 来源：`components/ux-row`（uview-pro-x v2.0.0）
> API 指纹：`sha256:d981f133109e693dd568b0fc3a4a72713b677cc0b99cafe1557e32520a9fd6bb`
> 再生成（组件库源码可读时）：`node scripts/gen-api-cards.mjs --lib <uview-pro-x 路径> --only row`

栅格布局的行容器：gutter 统一控制列间隔（左右各一半下发到 ux-col），justify / align 控制列在行内的排布；配合 ux-col 使用

## 属性

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `custom-style` / `customStyle` | 自定义根节点样式 | `JsonObject` | - |
| `custom-class` / `customClass` | 自定义根节点样式类 | `string` | `''` |
| `gutter` | 栅格间隔，左右各为此值的一半，单位 px | `number \| string` | `0` |
| `justify` | 水平排列方式：start \| end \| center \| around \| between | `string` | `'start'` |
| `align` | 垂直排列方式：top \| center \| bottom | `string` | `'center'` |

## 类型定义

> 本卡引用的自定义类型展开定义（源自组件 types.ts / 全局 types/global.ts），对象字面量可直接赋值。

| 类型 | 定义 |
| --- | --- |
| `JsonObject` | `Record<string, any>`（普通对象，任意键值、可嵌套；全库统一对象类型，含内联样式） |

## 双向绑定（v-model）

该组件无双向绑定。

## 事件

无类型化自定义事件（原生事件不受影响，可直接透传监听）。

## 插槽

| 插槽名 | 说明 |
| --- | --- |
| `default` | 行内容，通常放 ux-col |

## 外部样式类

| 名称 | 说明 |
| --- | --- |
| `custom-class` | 自定义根节点样式类 |
