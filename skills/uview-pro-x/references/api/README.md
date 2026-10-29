<!-- 生成物，勿手改：由 scripts/gen-api-cards.mjs 渲染，改动会在下次再生成时丢失 -->

# 组件 API 卡片索引

> uview-pro-x v1.0.0 ｜ 全库 API 指纹 `sha256:be4d53b5d99c61fefbc10c500a5988b4986a7341e105a1c60c9f2f67d0b6c23b` ｜ 74 个组件
>
> 写任何 `<ux-*>` 前先查对应卡片（属性/取值/事件/v-model/插槽一页俱全）；卡上没有的写法不要猜。
> 本索引与 `model.json` 随技能发货，消费侧不依赖项目内组件库源码（源码加密场景同样可用）。

## 基础

| 组件 | 说明 | v-model | 事件数 |
| --- | --- | --- | --- |
| [ux-avatar](./ux-avatar.md) | 本组件一般用于展示头像的地方，如个人中心，或者评论列表页的用户头像展示等场所 | — | 1 |
| [ux-badge](./ux-badge.md) | 本组件一般用于展示头像的地方，如个人中心，或者评论列表页的用户头像展示等场所 | — | 0 |
| [ux-button](./ux-button.md) | 以 uni-app `button` 原生组件为基础进行二次封装，内置多套主题色并可选水波纹点击效果 | — | 9 |
| [ux-cell-group](./ux-cell-group.md) | cell单元格一般用于一组列表的情况，比如个人中心页，设置页等 | — | 0 |
| [ux-cell-item](./ux-cell-item.md) | cell单元格一般用于一组列表的情况，比如个人中心页，设置页等 | — | 1 |
| [ux-icon](./ux-icon.md) | 基于字体的图标集，包含了大多数常见场景的图标 | — | 2 |
| [ux-image](./ux-image.md) | 此组件为uni-app的image组件的加强版，在继承了原有功能外，还支持淡入动画、加载中、加载失败提示、圆角值和形状等 | — | 3 |
| [ux-tag](./ux-tag.md) | 该组件一般用于标记和选择 | — | 2 |
| [ux-text](./ux-text.md) | 此组件集成了文本类在项目中的常用功能，包括状态，拨打电话，格式化日期，*替换，超链接...等功能 | — | 7 |

## 表单

| 组件 | 说明 | v-model | 事件数 |
| --- | --- | --- | --- |
| [ux-car-keyboard](./ux-car-keyboard.md) | 车牌号键盘：省份简称与字母数字两套按键，按「中 / 英」按钮切换 | — | 2 |
| [ux-checkbox](./ux-checkbox.md) | 该组件需要搭配checkboxGroup组件使用，以便用户进行操作时，获得当前复选框组的选中情况 | `v-model` | 1 |
| [ux-checkbox-group](./ux-checkbox-group.md) | 复选框组件一般用于需要多个选择的场景，该组件功能完整，使用方便 | `v-model` | 1 |
| [ux-form](./ux-form.md) | 此组件一般用于表单场景，可以配置Input输入框，Select弹出框，进行表单验证等 | — | 0 |
| [ux-form-item](./ux-form-item.md) | 此组件一般用于表单场景，可以配置Input输入框，Select弹出框，进行表单验证等 | — | 0 |
| [ux-input](./ux-input.md) | 此组件为一个输入框，默认没有边框和样式，是专门为配合表单组件ux-form而设计的，利用它可以快速实现表单验证，输入内容，下拉选择等功能 | `v-model` | 7 |
| [ux-keyboard](./ux-keyboard.md) | 自定义键盘面板，按 mode 内置数字 / 身份证 / 车牌号三种键盘，以底部弹层承载 | `v-model` | 4 |
| [ux-number-box](./ux-number-box.md) | 该组件一般用于商城购物选择物品数量的场景 | `v-model` | 5 |
| [ux-number-keyboard](./ux-number-keyboard.md) | 数字 / 身份证键盘面板，支持小数点、按键乱序与长按退格连续删除 | — | 2 |
| [ux-picker](./ux-picker.md) | 由 ux-popup 从底部弹出的滚动选择器，支持 selector-单列 / multiSelector-多列 / cascade-级联联动三种模式 | `v-model` | 3 |
| [ux-radio](./ux-radio.md) | 单选框用于有一个选择，用户只能选择其中一个的场景 | — | 1 |
| [ux-radio-group](./ux-radio-group.md) | 单选框用于有一个选择，用户只能选择其中一个的场景 | `v-model` | 1 |
| [ux-rate](./ux-rate.md) | 该组件一般用于满意度调查，星型评分的场景 | `v-model` | 1 |
| [ux-search](./ux-search.md) | 搜索组件，集成了常见搜索框所需功能，用户可以一键引入，开箱即用 | `v-model` | 8 |
| [ux-select](./ux-select.md) | 由 ux-popup 从底部弹出的列选择器，支持 single-column-单列 / mutil-column-多列 / mutil-column-auto-多列联动三种模式 | `v-model` | 2 |
| [ux-slider](./ux-slider.md) | 滑块选择器 | `v-model` | 3 |
| [ux-switch](./ux-switch.md) | 选择开关一般用于只有两个选择，且只能选其一的场景 | `v-model` | 1 |
| [ux-textarea](./ux-textarea.md) | 多行文本输入组件，支持字数统计、自动增高、清除按钮，可配合 ux-form 实现表单校验 | `v-model` | 8 |

## 数据展示

| 组件 | 说明 | v-model | 事件数 |
| --- | --- | --- | --- |
| [ux-circle-progress](./ux-circle-progress.md) | 展示操作或任务的当前进度，是一个圆形的进度条 | — | 0 |
| [ux-count-down](./ux-count-down.md) | 该组件一般使用于某个活动的截止时间上，通过数字的变化，给用户明确的时间感受，提示用户进行某一个行为操作 | — | 2 |
| [ux-count-to](./ux-count-to.md) | 该组件一般用于需要滚动数字到某一个值的场景，目标要求是一个递增的值 | — | 1 |
| [ux-line-progress](./ux-line-progress.md) | 展示操作或任务的当前进度，比如上传文件，是一个线形的进度条 | — | 0 |
| [ux-swiper](./ux-swiper.md) | 该组件一般用于导航轮播，广告展示等场景，可开箱即用 | — | 2 |

## 反馈

| 组件 | 说明 | v-model | 事件数 |
| --- | --- | --- | --- |
| [ux-action-sheet](./ux-action-sheet.md) | 由 ux-popup 从底部弹出的操作菜单：tips 提示 + list 菜单项 + 取消按钮的组合，list 为空时可改用默认插槽自定义内容 | `v-model` | 2 |
| [ux-alert-tips](./ux-alert-tips.md) | 警告提示，展现需要关注的信息 | — | 2 |
| [ux-collapse](./ux-collapse.md) | 通过折叠面板收纳内容区域 | — | 1 |
| [ux-collapse-item](./ux-collapse-item.md) | 通过折叠面板收纳内容区域（搭配u-collapse使用） | — | 1 |
| [ux-column-notice](./ux-column-notice.md) | 垂直滚动的通告栏，用于滚动展示通知、公告等内容，支持水平/垂直两种方向 | — | 4 |
| [ux-empty](./ux-empty.md) | 该组件用于需要加载内容，但是加载的第一页数据就为空，提示一个"没有内容"的场景，我们精心挑选了十几个场景的图标，方便您使用 | — | 0 |
| [ux-loading](./ux-loading.md) | 此组件为一个小动画，目前用在 ux-loadmore 加载更多和 ux-switch 开关等组件的正在加载状态场景 | — | 0 |
| [ux-loadmore](./ux-loadmore.md) | 此组件一般用于标识页面底部加载数据时的状态 | — | 1 |
| [ux-mask](./ux-mask.md) | 创建一个遮罩层，用于强调特定的页面元素，并阻止用户对遮罩下层的内容进行操作，一般用于弹窗场景 | — | 1 |
| [ux-modal](./ux-modal.md) | 弹出模态框，常用于消息提示、消息确认、在当前页面内完成特定的交互操作 | `v-model` | 2 |
| [ux-no-network](./ux-no-network.md) | 监听网络状态自动显隐的无网络提示页，支持自定义图片、提示语与层级 | — | 1 |
| [ux-notice-bar](./ux-notice-bar.md) | 该组件用于滚动通告场景，有多种模式可供选择 | — | 4 |
| [ux-overlay](./ux-overlay.md) | 创建一个全屏固定定位的遮罩层，可独立使用，也是 ux-popup 的遮罩实现 | `v-model:show` | 3 |
| [ux-popup](./ux-popup.md) | 弹出层容器，用于展示弹窗、信息提示等内容，支持上、下、左、右和中部弹出 | `v-model:show` | 5 |
| [ux-row-notice](./ux-row-notice.md) | 水平滚动通告栏，支持主题、图标、关闭等 | — | 3 |
| [ux-swipe-action](./ux-swipe-action.md) | 该组件一般用于左滑唤出操作菜单的场景，用的最多的是左滑删除操作 | — | 4 |
| [ux-toast](./ux-toast.md) | 此组件表现形式类似uni的uni.showToastAPI，但也有不同的地方 | — | 0 |
| [ux-top-tips](./ux-top-tips.md) | 顶部提示条，通过组件实例的 show() 弹出，支持导航栏高度适配与 z-index 定制，到时自动收起 | — | 0 |

## 布局

| 组件 | 说明 | v-model | 事件数 |
| --- | --- | --- | --- |
| [ux-card](./ux-card.md) | 卡片组件一般用于多个列表条目，且风格统一的场景 | — | 4 |
| [ux-col](./ux-col.md) | 与 ux-row 配套的栅格列：一行按总 12 栏均分，span 决定所占栏数、offset 决定左偏移 | — | 0 |
| [ux-divider](./ux-divider.md) | 区隔内容的分割线，一般用于页面底部"没有更多"的提示 | — | 1 |
| [ux-gap](./ux-gap.md) | 该组件一般用于内容块之间的用一个灰色块隔开的场景，方便用户风格统一，减少工作量 | — | 0 |
| [ux-grid](./ux-grid.md) | 宫格组件一般用于同时展示多个同类项目的场景，可以给宫格的项目设置徽标组件(badge)，或者图标等，也可以扩展为左右滑动的轮播形式 | — | 1 |
| [ux-grid-item](./ux-grid-item.md) | 宫格组件一般用于同时展示多个同类项目的场景，可以给宫格的项目设置徽标组件(badge)，或者图标等，也可以扩展为左右滑动的轮播形式 | — | 1 |
| [ux-line](./ux-line.md) | 此组件一般用于显示一根线条，用于分隔内容块，有横向和竖向两种模式，且能设置0.5px线条，使用也很简单 | — | 0 |
| [ux-row](./ux-row.md) | 栅格布局的行容器：gutter 统一控制列间隔（左右各一半下发到 ux-col），justify / align 控制列在行内的排布 | — | 0 |
| [ux-safe-bottom](./ux-safe-bottom.md) | 这个适配，主要是针对IPhone X等一些底部带指示条的机型，指示条的操作区域与页面底部存在重合，容易导致用户误操作，因此我们需要针对这些机型进行底部安全区适配 | — | 0 |
| [ux-section](./ux-section.md) | 该组件一般用于分类信息有很多，但是限于篇幅只能列出一部分，让用户通过"查看更多"获得更多信息的场景，实际效果见演示 | — | 1 |
| [ux-status-bar](./ux-status-bar.md) | 用于沉浸式状态栏适配，自动撑起系统状态栏高度 | — | 0 |

## 导航

| 组件 | 说明 | v-model | 事件数 |
| --- | --- | --- | --- |
| [ux-back-top](./ux-back-top.md) | 页面滚动时显示的返回顶部按钮 | — | 1 |
| [ux-link](./ux-link.md) | 该组件为超链接组件，在不同平台有不同表现形式：在APP平台会通过plus环境打开内置浏览器，在小程序中把链接复制到粘贴板，同时提示信息，在H5中通过window.open打开链接 | — | 1 |
| [ux-navbar](./ux-navbar.md) | 此组件一般用于在特殊情况下，需要自定义导航栏的时候用到，一般建议使用 uni-app 自带的导航栏 | — | 0 |
| [ux-pagination](./ux-pagination.md) | 上一页 / 下一页按钮 + 页码文本的组合式分页器：总页数由 total 与 pageSize 计算 | `v-model` | 1 |
| [ux-step](./ux-step.md) | 步骤条子组件，搭配 ux-steps 使用 | — | 0 |
| [ux-steps](./ux-steps.md) | 该组件一般用于完成一个任务要分几个步骤，标识目前处于第几步的场景 | — | 0 |
| [ux-subsection](./ux-subsection.md) | 横向分段选择器，内置 button-按钮式与 subsection-选项卡式两种外观：滑动条随选中项移动（animation 控制过渡），切换后通过 change 事件回传下标 | — | 1 |
| [ux-tabbar](./ux-tabbar.md) | 底部导航栏 | `v-model` | 1 |
| [ux-tabs](./ux-tabs.md) | 该组件是一个 tabs 标签组件，标签多时可配置左右滑动，标签少时可禁止滑动 | — | 1 |

## 其他

| 组件 | 说明 | v-model | 事件数 |
| --- | --- | --- | --- |
| [ux-config-provider](./ux-config-provider.md) | 配置注入组件：初始化并响应主题、暗黑模式、国际化的切换，并把主题 CSS 变量下发到根节点 | — | 2 |
| [ux-full-screen](./ux-full-screen.md) | 用于 App 弹窗遮盖导航栏和底部 tabbar，提示新版本升级内容 | — | 0 |
| [ux-skeleton](./ux-skeleton.md) | 骨架屏一般用于页面在请求远程数据尚未完成时，页面用灰色块预显示本来的页面结构，给用户更好的体验 | — | 0 |
| [ux-transition](./ux-transition.md) | 进出场动画封装：CSS transition 驱动显隐过渡（uni-app x App 端不支持 @keyframes，统一走 transition + 类切换范式） | — | 8 |

## 快照更新与版本升级流程

组件库改动（新增组件 / 变更 props·枚举·事件）后，在项目根目录执行**一条命令**完成全部更新：

```bash
node <技能目录>/scripts/update-api.mjs
```

- 默认读取 `<cwd>/uni_modules/uview-pro-x` 与 `<cwd>/pages`（`--lib` / `--verify <dir>` 可指定，`--no-verify` 跳过语料回归）；
- 内部依次执行：重提取 + 重生成（`scripts/gen-api-cards.mjs --lib …`）→ 一致性核对（`--check`，应 0 漂移）→ 语料回归（`scripts/verify-ux-usage.mjs`，应 0 error）；
- 结束后输出变更报告：库版本 / 全库指纹 / 组件新增·移除·API 变更清单；
- 校验器 `scripts/verify-ux-usage.mjs` 默认读取本目录 `model.json`；传 `--lib` 且实装库源码可解析时会现场提取比对，快照过旧会在报表顶部提示；
- 消费侧无需本流程——快照与卡片随技能发货，源码加密的项目同样可用。
