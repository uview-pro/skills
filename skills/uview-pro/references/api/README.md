<!-- 生成物，勿手改：由 scripts/gen-api-cards.mjs 渲染，改动会在下次再生成时丢失 -->

# 组件 API 卡片索引

> uview-pro v0.6.21 ｜ 全库 API 指纹 `sha256:ba0cf58942416cb60168ca2e6e973674f4f7a129e7cc703f408bfbadb314d448` ｜ 99 个组件
>
> 写任何 `<u-*>` 前先查对应卡片（属性/取值/事件/v-model/插槽一页俱全）；卡上没有的写法不要猜。
> 本索引与 `model.json` 随技能发货，消费侧不必依赖项目内组件库源码。

## 基础

| 组件 | 说明 | v-model | 事件数 |
| --- | --- | --- | --- |
| [u-avatar](./u-avatar.md) | 本组件一般用于展示头像的地方，如个人中心，或者评论列表页的用户头像展示等场所 | — | 1 |
| [u-badge](./u-badge.md) | 本组件一般用于展示头像的地方，如个人中心，或者评论列表页的用户头像展示等场所 | — | 0 |
| [u-button](./u-button.md) | Button 按钮 | — | 9 |
| [u-cell-group](./u-cell-group.md) | cell单元格一般用于一组列表的情况，比如个人中心页，设置页等 | — | 0 |
| [u-cell-item](./u-cell-item.md) | cell单元格一般用于一组列表的情况，比如个人中心页，设置页等 | — | 1 |
| [u-icon](./u-icon.md) | 基于字体的图标集，包含了大多数常见场景的图标 | — | 2 |
| [u-image](./u-image.md) | 此组件为uni-app的image组件的加强版，在继承了原有功能外，还支持淡入动画、加载中、加载失败提示、圆角值和形状等 | — | 3 |
| [u-tag](./u-tag.md) | 该组件一般用于标记和选择 | — | 2 |
| [u-text](./u-text.md) | 此组件集成了文本类在项目中的常用功能，包括状态，拨打电话，格式化日期，*替换，超链接...等功能 | — | 7 |

## 表单

| 组件 | 说明 | v-model | 事件数 |
| --- | --- | --- | --- |
| [u-calendar](./u-calendar.md) | 此组件用于单个选择日期，范围选择日期等，日历被包裹在底部弹起的容器中 | `v-model` | 2 |
| [u-car-keyboard](./u-car-keyboard.md) | 车牌号输入专用键盘，支持省份简称和字母数字切换，支持按键顺序打乱 | — | 2 |
| [u-checkbox](./u-checkbox.md) | 该组件需要搭配checkboxGroup组件使用，以便用户进行操作时，获得当前复选框组的选中情况 | `v-model` | 1 |
| [u-checkbox-group](./u-checkbox-group.md) | 复选框组件一般用于需要多个选择的场景，该组件功能完整，使用方便 | `v-model` | 1 |
| [u-city-select](./u-city-select.md) | 用于选择省、市、区三级行政区域，支持回显和自定义初始值 | `v-model` | 1 |
| [u-field](./u-field.md) | 借助此组件，可以实现表单的输入，有"text"和"textarea"类型的，此外，借助uView的picker和actionSheet组件可以快速实现上拉菜单，时间，地区选择等，为表单解决方案的利器 | `v-model` | 6 |
| [u-form](./u-form.md) | 此组件一般用于表单场景，可以配置Input输入框，Select弹出框，进行表单验证等 | — | 0 |
| [u-form-item](./u-form-item.md) | 此组件一般用于表单场景，可以配置Input输入框，Select弹出框，进行表单验证等 | — | 0 |
| [u-input](./u-input.md) | 该组件一般用于各类文本输入场景，支持前后图标、清空按钮、密码模式、边框样式、前后插槽等常见能力 | `v-model` | 6 |
| [u-keyboard](./u-keyboard.md) | 此为uViw自定义的键盘面板，内含了数字键盘，车牌号键，身份证号键盘3中模式，都有可以打乱按键顺序的选项 | `v-model` | 4 |
| [u-message-input](./u-message-input.md) | 该组件一般用于验证用户短信验证码的场景，也可以结合uView的键盘组件使用 | — | 2 |
| [u-number-box](./u-number-box.md) | 该组件一般用于商城购物选择物品数量的场景 | `v-model` | 5 |
| [u-number-keyboard](./u-number-keyboard.md) | 支持数字、身份证、带小数点等多种模式，支持乱序，支持长按退格 | — | 2 |
| [u-picker](./u-picker.md) | 此选择器有两种弹出模式：一是时间模式，可以配置年，日，月，时，分，秒参数 二是地区模式，可以配置省，市，区参数 | `v-model` | 3 |
| [u-radio](./u-radio.md) | 单选框用于有一个选择，用户只能选择其中一个的场景 | — | 1 |
| [u-radio-group](./u-radio-group.md) | 单选框用于有一个选择，用户只能选择其中一个的场景 | `v-model` | 1 |
| [u-rate](./u-rate.md) | 该组件一般用于满意度调查，星型评分的场景 | `v-model` | 1 |
| [u-search](./u-search.md) | 搜索组件，集成了常见搜索框所需功能，用户可以一键引入，开箱即用 | `v-model` | 8 |
| [u-select](./u-select.md) | 此选择器用于单列，多列，多列联动的选择场景 | `v-model` | 3 |
| [u-slider](./u-slider.md) | 滑块选择器 | `v-model` | 3 |
| [u-switch](./u-switch.md) | 选择开关一般用于只有两个选择，且只能选其一的场景 | `v-model` | 1 |
| [u-textarea](./u-textarea.md) | 文本域此组件满足了可能出现的表单信息补充，编辑等实际逻辑的功能，内置了字数校验等 | `v-model` | 8 |
| [u-upload](./u-upload.md) | 该组件用于上传文件场景，支持图片、视频、文档等多种类型，支持网格和列表两种展示模式 | `v-model` | 13 |
| [u-verification-code](./u-verification-code.md) | 考虑到用户实际发送验证码的场景，可能是一个按钮，也可能是一段文字，提示语各有不同，所以本组件不提供界面显示，只提供提示语，由用户将提示语嵌入到具体的场景 | — | 3 |

## 数据展示

| 组件 | 说明 | v-model | 事件数 |
| --- | --- | --- | --- |
| [u-circle-progress](./u-circle-progress.md) | 展示操作或任务的当前进度，比如上传文件，是一个圆形的进度条 | — | 0 |
| [u-count-down](./u-count-down.md) | 该组件一般使用于某个活动的截止时间上，通过数字的变化，给用户明确的时间感受，提示用户进行某一个行为操作 | — | 2 |
| [u-count-to](./u-count-to.md) | 该组件一般用于需要滚动数字到某一个值的场景，目标要求是一个递增的值 | — | 1 |
| [u-index-anchor](./u-index-anchor.md) | 通过折叠面板收纳内容区域,搭配&lt;u-index-anchor&gt;使用 | — | 0 |
| [u-index-list](./u-index-list.md) | 通过折叠面板收纳内容区域,搭配&lt;u-index-anchor&gt;使用 | — | 1 |
| [u-lazy-load](./u-lazy-load.md) | 懒加载使用的场景为：页面有很多图片时，APP会同时加载所有的图片，导致页面卡顿，各个位置的图片出现前后不一致等. | — | 3 |
| [u-line-progress](./u-line-progress.md) | 展示操作或任务的当前进度，比如上传文件，是一个线形的进度条 | — | 0 |
| [u-swiper](./u-swiper.md) | 该组件一般用于导航轮播，广告展示等场景,可开箱即用 | — | 2 |
| [u-table](./u-table.md) | 表格组件一般用于展示大量结构化数据的场景 | — | 0 |
| [u-td](./u-td.md) | 表格组件一般用于展示大量结构化数据的场景（搭配u-table使用） | — | 0 |
| [u-th](./u-th.md) | 表格组件一般用于展示大量结构化数据的场景（搭配u-table使用） | — | 0 |
| [u-time-line](./u-time-line.md) | 时间轴组件一般用于物流信息展示，各种跟时间相关的记录等场景 | — | 0 |
| [u-time-line-item](./u-time-line-item.md) | 时间轴组件一般用于物流信息展示，各种跟时间相关的记录等场景 | — | 0 |
| [u-tr](./u-tr.md) | 表格组件一般用于展示大量结构化数据的场景（搭配&lt;u-table&gt;使用） | — | 0 |
| [u-waterfall](./u-waterfall.md) | 这是一个瀑布流形式的组件，内容分为左右两列，结合uView的懒加载组件效果更佳 | `v-model` | 0 |

## 反馈

| 组件 | 说明 | v-model | 事件数 |
| --- | --- | --- | --- |
| [u-action-sheet](./u-action-sheet.md) | 本组件用于从底部弹出一个操作菜单，供用户选择并返回结果 | `v-model` | 2 |
| [u-action-sheet-item](./u-action-sheet-item.md) | 该组件一般用于展示操作菜单中的单个选项，作为u-action-sheet的子组件使用，支持默认slot自定义内容 | — | 1 |
| [u-alert-tips](./u-alert-tips.md) | 警告提示，展现需要关注的信息 | — | 2 |
| [u-collapse](./u-collapse.md) | 通过折叠面板收纳内容区域 | — | 1 |
| [u-collapse-item](./u-collapse-item.md) | 通过折叠面板收纳内容区域（搭配u-collapse使用） | — | 1 |
| [u-column-notice](./u-column-notice.md) | 通告栏 | — | 4 |
| [u-empty](./u-empty.md) | 该组件用于需要加载内容，但是加载的第一页数据就为空，提示一个"没有内容"的场景，我们精心挑选了十几个场景的图标，方便您使用 | — | 0 |
| [u-loading](./u-loading.md) | 此组件为一个小动画，目前用在uView的loadmore加载更多和switch开关等组件的正在加载状态场景 | — | 0 |
| [u-loading-popup](./u-loading-popup.md) | 该组件一般用于展示加载状态的场景，弹出后显示加载动画与提示文字，支持定时自动关闭或点击取消 | `v-model` | 1 |
| [u-loadmore](./u-loadmore.md) | 此组件一般用于标识页面底部加载数据时的状态 | — | 1 |
| [u-mask](./u-mask.md) | 创建一个遮罩层，用于强调特定的页面元素，并阻止用户对遮罩下层的内容进行操作，一般用于弹窗场景 | — | 1 |
| [u-modal](./u-modal.md) | 弹出模态框，常用于消息提示、消息确认、在当前页面内完成特定的交互操作 | `v-model` | 2 |
| [u-no-network](./u-no-network.md) | 该组件无需任何配置，引入即可，内部自动处理所有功能和事件 | — | 1 |
| [u-notice-bar](./u-notice-bar.md) | 该组件用于滚动通告场景，有多种模式可供选择 | — | 4 |
| [u-popup](./u-popup.md) | 弹出层容器，用于展示弹窗、信息提示等内容，支持上、下、左、右和中部弹出 | `v-model` | 2 |
| [u-read-more](./u-read-more.md) | 该组件一般用于内容较长，预先收起一部分，点击展开全部内容的场景 | — | 2 |
| [u-row-notice](./u-row-notice.md) | 水平滚动通告栏 | — | 3 |
| [u-skeleton](./u-skeleton.md) | 骨架屏一般用于页面在请求远程数据尚未完成时，页面用灰色块预显示本来的页面结构，给用户更好的体验 | — | 0 |
| [u-swipe-action](./u-swipe-action.md) | 该组件一般用于左滑唤出操作菜单的场景，用的最多的是左滑删除操作 | — | 4 |
| [u-toast](./u-toast.md) | 此组件表现形式类似uni的uni.showToastAPI，但也有不同的地方 | — | 0 |
| [u-top-tips](./u-top-tips.md) | 该组件一般用于页面顶部向下滑出一个提示，尔后自动收起的场景 | — | 0 |

## 布局

| 组件 | 说明 | v-model | 事件数 |
| --- | --- | --- | --- |
| [u-card](./u-card.md) | 卡片组件一般用于多个列表条目，且风格统一的场景 | — | 4 |
| [u-col](./u-col.md) | 通过基础的 12 分栏，迅速简便地创建布局（搭配&lt;u-row&gt;使用） | — | 1 |
| [u-divider](./u-divider.md) | 区隔内容的分割线，一般用于页面底部"没有更多"的提示 | — | 1 |
| [u-gap](./u-gap.md) | 该组件一般用于内容块之间的用一个灰色块隔开的场景，方便用户风格统一，减少工作量 | — | 0 |
| [u-grid](./u-grid.md) | 宫格组件一般用于同时展示多个同类项目的场景，可以给宫格的项目设置徽标组件(badge)，或者图标等，也可以扩展为左右滑动的轮播形式 | — | 1 |
| [u-grid-item](./u-grid-item.md) | 宫格组件一般用于同时展示多个同类项目的场景，可以给宫格的项目设置徽标组件(badge)，或者图标等，也可以扩展为左右滑动的轮播形式 | — | 1 |
| [u-line](./u-line.md) | 此组件一般用于显示一根线条，用于分隔内容块，有横向和竖向两种模式，且能设置0.5px线条，使用也很简单 | — | 0 |
| [u-row](./u-row.md) | 通过基础的 12 分栏，迅速简便地创建布局 | — | 1 |
| [u-safe-bottom](./u-safe-bottom.md) | 这个适配，主要是针对IPhone X等一些底部带指示条的机型，指示条的操作区域与页面底部存在重合，容易导致用户误操作，因此我们需要针对这些机型进行底部安全区适配 | — | 0 |
| [u-section](./u-section.md) | 该组件一般用于分类信息有很多，但是限于篇幅只能列出一部分，让用户通过"查看更多"获得更多信息的场景，实际效果见演示 | — | 1 |
| [u-status-bar](./u-status-bar.md) | 该组件一般用于自定义导航栏场景，按设备状态栏高度生成占位区域，适配刘海屏，可自定义背景色与样式 | — | 0 |
| [u-sticky](./u-sticky.md) | 该组件与CSS中position: sticky属性实现的效果一致，当组件达到预设的到顶部距离时，就会固定在指定位置，组件位置大于预设的顶部距离时，会重新按照正常的布局排列 | — | 2 |

## 导航

| 组件 | 说明 | v-model | 事件数 |
| --- | --- | --- | --- |
| [u-back-top](./u-back-top.md) | 页面滚动时显示的返回顶部按钮 | — | 0 |
| [u-dropdown](./u-dropdown.md) | 该组件一般用于向下展开菜单，同时可切换多个选项卡的场景 | — | 2 |
| [u-dropdown-item](./u-dropdown-item.md) | 该组件一般用于向下展开菜单，同时可切换多个选项卡的场景 | `v-model` | 1 |
| [u-fab](./u-fab.md) | 该组件一般用于可拖拽的悬浮按钮场景，拖动结束后可自动吸附到最近的边缘，点击按钮可展开默认slot中的操作菜单 | — | 1 |
| [u-link](./u-link.md) | 该组件为超链接组件，在不同平台有不同表现形式：在APP平台会通过plus环境打开内置浏览器，在小程序中把链接复制到粘贴板，同时提示信息，在H5中通过window.open打开链接 | — | 1 |
| [u-navbar](./u-navbar.md) | 此组件一般用于在特殊情况下，需要自定义导航栏的时候用到，一般建议使用uniapp自带的导航栏 | — | 0 |
| [u-pagination](./u-pagination.md) | 该组件一般用于内容分页展示的场景，通过总页数与当前页展示页码，支持上一页/下一页与快速跳转 | — | 1 |
| [u-step](./u-step.md) | 该组件一般用于展示步骤流程的场景，作为u-steps的子组件使用，可展示标题、描述与节点图标 | — | 0 |
| [u-steps](./u-steps.md) | 该组件一般用于完成一个任务要分几个步骤，标识目前处于第几步的场景 | — | 0 |
| [u-subsection](./u-subsection.md) | 该分段器一般用于用户从几个选项中选择某一个的场景 | — | 1 |
| [u-tabbar](./u-tabbar.md) | 底部导航栏 | `v-model` | 1 |
| [u-tabs](./u-tabs.md) | 该组件，是一个tabs标签组件，在标签多的时候，可以配置为左右滑动，标签少的时候，可以禁止滑动 | — | 1 |
| [u-tabs-swiper](./u-tabs-swiper.md) | 该组件内部实现主要依托于uniapp的scroll-view和swiper组件，主要特色是切换过程中，tabsSwiper文字的颜色可以渐变，底部滑块可以 跟随式滑动，活动tab滚动居中等 | — | 1 |

## 其他

| 组件 | 说明 | v-model | 事件数 |
| --- | --- | --- | --- |
| [u-avatar-cropper](./u-avatar-cropper.md) | 该组件一般用于头像裁剪场景，支持对图片进行拖动、缩放后裁剪，裁剪完成后通过全局事件 uni.$emit('uAvatarCropper', path) 返回结果，一般在独立页面中使用 | — | 0 |
| [u-config-provider](./u-config-provider.md) | 说明（简要）： - 初始化场景（推荐在应用入口执行）：使用 `useTheme().initTheme(themes)` 进行一次性初始化与全局设置（例如在 `main.ts` 或 `App.vue` 中） | — | 2 |
| [u-full-screen](./u-full-screen.md) | 用于APP弹窗遮盖导航栏和底部tabbar，提示新版本升级内容 | — | 0 |
| [u-root-portal](./u-root-portal.md) | 该组件一般用于使整个子树从页面中脱离出来，类似于在 CSS 中使用 fixed position 的效果 | — | 0 |
| [u-transition](./u-transition.md) | 统一的过渡与进出场动效封装，支持多种预设动画和自定义时长 | — | 8 |

## 快照更新与版本升级流程

组件库改动（新增组件 / 变更 props·枚举·事件）后，在项目根目录执行**一条命令**完成全部更新：

```bash
node <技能目录>/scripts/update-api.mjs
```

- 默认读取 `<cwd>/uni_modules/uview-pro`（`--lib` 可指定，`--no-verify` 跳过用法语料回归）；
- 内部依次执行：重提取 + 重生成（`scripts/gen-api-cards.mjs --lib …`）→ 一致性核对（`--check`，应 0 漂移）→ 用法语料回归（`scripts/verify-u-usage.mjs`，应 0 error）；
- 结束后输出变更报告：库版本 / 全库指纹 / 组件新增·移除·API 变更清单；
- 若卡片出现内容退化（描述变 `-`、事件缺失），先跑 `scripts/gen-api-cards.mjs --lib … --audit --out 审计.md` 定位源码 JSDoc 问题，修源后再重生成；
- 校验器 `scripts/verify-u-usage.mjs` 默认读取本目录 `model.json`；传 `--lib` 且组件库源码可读时会现场提取比对，快照过旧会在报表顶部提示；
- 消费侧无需本流程——快照与卡片随技能发货。
