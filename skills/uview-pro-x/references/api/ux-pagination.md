<!-- 生成物，勿手改：由 scripts/gen-api-cards.mjs 渲染，改动会在下次再生成时丢失 -->

# ux-pagination API

> 来源：`components/ux-pagination`（uview-pro-x v1.0.0）
> API 指纹：`sha256:673af753a1442443cd937fe1c2915a216ebd16c8b9264acfb4ac03fb23076cc2`
> 再生成（组件库源码可读时）：`node scripts/gen-api-cards.mjs --lib <uview-pro-x 路径> --only pagination`

上一页 / 下一页按钮 + 页码文本的组合式分页器：总页数由 total 与 pageSize 计算；默认显示「当前页 / 总页数」，可用默认插槽整体替换；页码变化通过 v-model 与 change 事件同步

## 属性

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `custom-style` / `customStyle` | 自定义根节点样式，对象形式 | `UTSJSONObject` | - |
| `custom-class` / `customClass` | 自定义根节点样式类 | `string` | `''` |
| `model-value` / `modelValue` | v-model 绑定当前页码，默认 1 | `number` | `1` |
| `prev-text` / `prevText` | 上一页按钮文字，不传取本地化默认文案 | `string` | `''` |
| `next-text` / `nextText` | 下一页按钮文字，不传取本地化默认文案 | `string` | `''` |
| `total` | 数据总条数，默认 0 | `number` | `0` |
| `page-size` / `pageSize` | 每页条数，默认 10 | `number` | `10` |
| `show-icon` / `showIcon` | 是否用图标代替文字表示翻页按钮，默认 false | `boolean` | `false` |
| `prev-icon` / `prevIcon` | 上一页图标名，show-icon 为 true 时有效，默认 arrow-left | `string` | `'arrow-left'` |
| `next-icon` / `nextIcon` | 下一页图标名，show-icon 为 true 时有效，默认 arrow-right | `string` | `'arrow-right'` |

## 双向绑定（v-model）

| 写法 | 通道 | 说明 |
| --- | --- | --- |
| `v-model` | prop + emit（`update:modelValue`） | `modelValue` 属性，默认 `1` |

## 事件

| 事件 | 回调参数 | 说明 |
| --- | --- | --- |
| `@change` | `payload: UTSJSONObject` | 页码变化时触发，携带 { type: 'prev' \| 'next', current } |

## 插槽

| 插槽名 | 说明 |
| --- | --- |
| `default` | 页码显示区域（默认「当前页 / 总页数」），可用插槽整体替换 |

## 外部样式类

| 名称 | 说明 |
| --- | --- |
| `custom-class` | 自定义根节点样式类 |
