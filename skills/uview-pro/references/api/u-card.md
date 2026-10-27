<!-- 生成物，勿手改：由 scripts/gen-api-cards.mjs 渲染，改动会在下次再生成时丢失 -->

# u-card API

> 来源：`components/u-card`（uview-pro v0.6.21）
> API 指纹：`sha256:369e609a19133790b3f8ab967e6271d09a1532c4b12e97136ef25e02dca43a7b`
> 官方文档：https://uviewpro.cn/zh/components/card.html
> 再生成（组件库源码可读时）：`node scripts/gen-api-cards.mjs --lib <uview-pro 路径> --only card`

卡片组件一般用于多个列表条目，且风格统一的场景

## 用法示例

```vue
<u-card padding="30" title="card"></u-card>
```

## 属性

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `custom-style` / `customStyle` | 自定义根节点样式 | `string \| Record<string, any>` | - |
| `custom-class` / `customClass` | 自定义根节点样式类 | `string` | `''` |
| `full` | 与屏幕两侧是否留空隙 | `boolean` | `false` |
| `title` | 标题 | `string` | `''` |
| `title-color` / `titleColor` | 标题颜色 | `string` | `'var(--u-main-color)'` |
| `title-size` / `titleSize` | 标题字体大小，单位rpx | `number \| string` | `'30'` |
| `sub-title` / `subTitle` | 副标题 | `string` | `''` |
| `sub-title-color` / `subTitleColor` | 副标题颜色 | `string` | `'var(--u-tips-color)'` |
| `sub-title-size` / `subTitleSize` | 副标题字体大小，单位rpx | `number \| string` | `'26'` |
| `border` | 是否显示外部边框，只对full=false时有效(卡片与边框有空隙时) | `boolean` | `false` |
| `index` | 用于标识点击了第几个 | `CardIndex` | `''` |
| `margin` | 用于隔开上下左右的边距，带单位的写法，如："30rpx 30rpx"，"20rpx 20rpx 30rpx 30rpx" | `string` | `'30rpx'` |
| `border-radius` / `borderRadius` | card卡片的圆角 | `number \| string` | `'16'` |
| `head-style` / `headStyle` | 头部自定义样式，对象形式 | `CardStyle` | - |
| `body-style` / `bodyStyle` | 主体自定义样式，对象形式 | `CardStyle` | - |
| `foot-style` / `footStyle` | 底部自定义样式，对象形式 | `CardStyle` | - |
| `head-border-bottom` / `headBorderBottom` | 头部是否下边框 | `boolean` | `true` |
| `foot-border-top` / `footBorderTop` | 底部是否有上边框 | `boolean` | `true` |
| `thumb` | 标题左边的缩略图 | `string` | `''` |
| `thumb-width` / `thumbWidth` | 缩略图宽高，单位rpx | `string \| number` | `'60'` |
| `thumb-circle` / `thumbCircle` | 缩略图是否为圆形 | `boolean` | `false` |
| `padding` | 给head，body，foot的内边距 | `string \| number` | `'30'` |
| `show-head` / `showHead` | 是否显示头部 | `boolean` | `true` |
| `show-foot` / `showFoot` | 是否显示尾部 | `boolean` | `true` |
| `box-shadow` / `boxShadow` | 卡片外围阴影，字符串形式 | `string` | `'none'` |

## 双向绑定（v-model）

该组件无双向绑定。

## 事件

| 事件 | 回调参数 | 说明 |
| --- | --- | --- |
| `@click` | - | 整个卡片任意位置被点击时触发 |
| `@head-click` | - | 卡片头部被点击时触发 |
| `@body-click` | - | 卡片主体部分被点击时触发 |
| `@foot-click` | - | 卡片底部部分被点击时触发 |

## 插槽

| 插槽名 | 说明 |
| --- | --- |
| `head` | - |
| `default` | - |
| `body` | - |
| `foot` | - |
