<!-- 生成物，勿手改：由 scripts/gen-api-cards.mjs 渲染，改动会在下次再生成时丢失 -->

# u-calendar API

> 来源：`components/u-calendar`（uview-pro v0.6.21）
> API 指纹：`sha256:6893a1c55d78776828fc3fcb4124300d4e97bb547106d4b453ad4f34ae7655d8`
> 官方文档：https://uviewpro.cn/zh/components/calendar.html
> 再生成（组件库源码可读时）：`node scripts/gen-api-cards.mjs --lib <uview-pro 路径> --only calendar`

此组件用于单个选择日期，范围选择日期等，日历被包裹在底部弹起的容器中。

## 用法示例

```vue
<u-calendar v-model="show" :mode="mode"></u-calendar>
```

## 属性

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `custom-style` / `customStyle` | 自定义根节点样式 | `string \| Record<string, any>` | - |
| `custom-class` / `customClass` | 自定义根节点样式类 | `string` | `''` |
| `safe-area-inset-bottom` / `safeAreaInsetBottom` | 是否开启底部安全区适配 | `boolean` | `false` |
| `mask-close-able` / `maskCloseAble` | 是否允许通过点击遮罩关闭Picker | `boolean` | `true` |
| `model-value` / `modelValue` | 通过双向绑定控制组件的弹出与收起 | `boolean` | `false` |
| `z-index` / `zIndex` | 弹出的z-index值 | `string \| number` | `0` |
| `change-year` / `changeYear` | 是否允许切换年份 | `boolean` | `true` |
| `change-month` / `changeMonth` | 是否允许切换月份 | `boolean` | `true` |
| `mode` | date-单个日期选择，range-开始日期+结束日期选择 | `CalendarMode`（`date`｜`range`） | `'date'` |
| `max-year` / `maxYear` | 可切换的最大年份 | `number \| string` | `2050` |
| `min-year` / `minYear` | 可切换的最小年份 | `number \| string` | `1950` |
| `min-date` / `minDate` | 最小可选日期(不在范围内日期禁用不可选) | `number \| string` | `'1950-01-01'` |
| `max-date` / `maxDate` | 最大可选日期，默认最大值为今天，之后的日期不可选 | `number \| string` | `''` |
| `border-radius` / `borderRadius` | 弹窗顶部左右两边的圆角值 | `string \| number` | `20` |
| `month-arrow-color` / `monthArrowColor` | 月份切换按钮箭头颜色 | `string` | `'var(--u-content-color)'` |
| `year-arrow-color` / `yearArrowColor` | 年份切换按钮箭头颜色 | `string` | `'var(--u-tips-color)'` |
| `color` | 默认日期字体颜色 | `string` | `'var(--u-main-color)'` |
| `active-bg-color` / `activeBgColor` | 选中\|起始结束日期背景色 | `string` | - |
| `active-color` / `activeColor` | 选中\|起始结束日期字体颜色 | `string` | `'var(--u-white-color)'` |
| `range-bg-color` / `rangeBgColor` | 范围内日期背景色 | `string` | `'var(--u-type-primary-light)'` |
| `range-color` / `rangeColor` | 范围内日期字体颜色 | `string` | - |
| `start-text` / `startText` | mode=range时生效，起始日期自定义文案 | `string` | `''` |
| `end-text` / `endText` | mode=range时生效，结束日期自定义文案 | `string` | `''` |
| `btn-type` / `btnType` | 按钮样式类型 | `ThemeType`（`primary`｜`info`｜`error`｜`warning`｜`success`｜`default`） | `'primary'` |
| `is-active-current` / `isActiveCurrent` | 当前选中日期带选中效果 | `boolean` | `true` |
| `default-select-today` / `defaultSelectToday` | 初始化时是否默认选中今天，优先级低于 defaultDate/startDate/endDate | `boolean` | `true` |
| `is-change` / `isChange` | 切换年月是否触发事件 mode=date时生效 | `boolean` | `false` |
| `closeable` | 是否显示右上角的关闭图标 | `boolean` | `true` |
| `tool-tip` / `toolTip` | 顶部的提示文字 | `string` | `''` |
| `show-lunar` / `showLunar` | 是否显示农历 | `boolean` | `false` |
| `is-page` / `isPage` | 是否在页面中显示 | `boolean` | `false` |
| `default-date` / `defaultDate` | 默认选中的日期，mode=date时生效，格式：2024-01-01 | `string` | `''` |
| `start-date` / `startDate` | 默认选中的开始日期，mode=range时生效，格式：2024-01-01 | `string` | `''` |
| `end-date` / `endDate` | 默认选中的结束日期，mode=range时生效，格式：2024-01-01 | `string` | `''` |
| `readonly` | 是否只读，只读模式下禁止点击选择日期 | `boolean` | `false` |
| `checked-dates` / `checkedDates` | 已打卡日期列表，格式：['2024-01-01', '2024-01-02'] | `string[]` | - |
| `checked-bg-color` / `checkedBgColor` | 打卡日期背景色 | `string` | `'var(--u-type-warning)'` |
| `checked-color` / `checkedColor` | 打卡日期字体颜色 | `string` | `'var(--u-white-color)'` |
| `today-checked` / `todayChecked` | 今日是否已打卡 | `boolean` | `false` |
| `today-checked-bg-color` / `todayCheckedBgColor` | 今日已打卡背景色 | `string` | `'var(--u-type-success)'` |
| `unchecked-bg-color` / `uncheckedBgColor` | 未打卡日期背景色 | `string` | `'var(--u-light-color)'` |
| `unchecked-color` / `uncheckedColor` | 未打卡日期字体颜色 | `string` | `'var(--u-white-color)'` |
| `checkin-mode` / `checkinMode` | 是否启用打卡签到模式（未打卡日期显示灰色） | `boolean` | `false` |
| `holidays` | 节假日列表，格式：['2024-01-01', '2024-01-02'] | `string[]` | - |
| `holiday-color` / `holidayColor` | 节假日文字颜色 | `string` | `'var(--u-type-error)'` |
| `workdays` | 加班日列表，格式：['2024-01-06', '2024-01-07'] | `string[]` | - |
| `workday-color` / `workdayColor` | 加班日文字颜色 | `string` | `'var(--u-type-primary)'` |
| `festivals` | 节日配置，格式：{ '2024-04-04': '清明节', '2024-04-01': '愚人节' } | `Record<string, string>` | - |
| `festival-color` / `festivalColor` | 节日文字颜色 | `string` | `'var(--u-type-primary)'` |
| `show-festival` / `showFestival` | 是否显示内置节日（中国传统节日） | `boolean` | `false` |
| `use-date-slot` / `useDateSlot` | 是否启用自定义日期内容插槽（微信小程序需要显式声明） | `boolean` | `false` |

## 双向绑定（v-model）

| 写法 | 通道 | 说明 |
| --- | --- | --- |
| `v-model` | prop + emit（`update:modelValue`） | `modelValue` 属性，默认 `false` |

## 事件

| 事件 | 回调参数 | 说明 |
| --- | --- | --- |
| `@input` | `value: boolean` | 选择日期时触发，实时更新所选日期 |
| `@change` | `value: CalendarChangeDate \| CalendarChangeRange` | 确认选择日期时触发 |

## 插槽

| 插槽名 | 说明 |
| --- | --- |
| `tooltip` | - |
| `date` | - |
