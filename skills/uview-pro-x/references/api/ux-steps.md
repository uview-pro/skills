<!-- 生成物，勿手改：由 scripts/gen-api-cards.mjs 渲染，改动会在下次再生成时丢失 -->

# ux-steps API

> 来源：`components/ux-steps`（uview-pro-x v1.0.0）
> API 指纹：`sha256:1d256008409aaa6390504134fa29e7ce62c47e7853b6213b6497c241087ca4c8`
> 再生成（组件库源码可读时）：`node scripts/gen-api-cards.mjs --lib <uview-pro-x 路径> --only steps`

该组件一般用于完成一个任务要分几个步骤，标识目前处于第几步的场景

## 属性

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `custom-style` / `customStyle` | 自定义根节点样式，对象形式 | `UTSJSONObject` | - |
| `custom-class` / `customClass` | 自定义根节点样式类 | `string` | `''` |
| `mode` | 设置模式（dot\|number，默认dot） | `string` | `'dot'` |
| `list` | 数轴条数据 | `StepsListItem[]` | - |
| `type` | 主题类型（默认primary） | `string` | `'primary'` |
| `current` | 设置当前处于第几步（默认0） | `number \| string` | `0` |
| `active-color` / `activeColor` | 已完成步骤的激活颜色 | `string` | `''` |
| `inactive-color` / `inactiveColor` | 未激活的颜色 | `string` | `''` |
| `icon` | 自定义图标（默认check） | `string` | `'checkmark'` |
| `direction` | 排列方向 row-横向 column-竖向（默认row） | `string` | `'row'` |

## 双向绑定（v-model）

该组件无双向绑定。

## 事件

无类型化自定义事件（原生事件不受影响，可直接透传监听）。

## 插槽

| 插槽名 | 说明 |
| --- | --- |
| `default` | - |

## 外部样式类

| 名称 | 说明 |
| --- | --- |
| `custom-class` | 自定义根节点样式类 |
