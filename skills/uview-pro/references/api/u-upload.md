<!-- 生成物，勿手改：由 scripts/gen-api-cards.mjs 渲染，改动会在下次再生成时丢失 -->

# u-upload API

> 来源：`components/u-upload`（uview-pro v0.6.21）
> API 指纹：`sha256:a8d69ab310c5050750e6859b51754b127728f8d383d2b68b455fb852a61d117d`
> 官方文档：https://uviewpro.cn/zh/components/upload.html
> 再生成（组件库源码可读时）：`node scripts/gen-api-cards.mjs --lib <uview-pro 路径> --only upload`

该组件用于上传文件场景，支持图片、视频、文档等多种类型，支持网格和列表两种展示模式

## 用法示例

```vue
<u-upload :action="action" accept="file" mode="list" :show-file-name="true"></u-upload>
```

## 属性

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `custom-style` / `customStyle` | 自定义根节点样式 | `string \| Record<string, any>` | - |
| `custom-class` / `customClass` | 自定义根节点样式类 | `string` | `''` |
| `width` | 选择器宽度，单位rpx | `number \| string` | `200` |
| `height` | 选择器高度，单位rpx | `number \| string` | `200` |
| `max-count` / `maxCount` | 最大上传数量 | `number \| string` | `52` |
| `deletable` | 是否可删除 | `boolean` | `true` |
| `mode` | 上传组件的展示模式 grid-网格模式(默认), list-列表模式 | `grid`｜`list` | `'grid'` |
| `show-upload-list` / `showUploadList` | 是否显示上传列表 | `boolean` | `true` |
| `show-progress` / `showProgress` | 是否显示上传进度 | `boolean` | `true` |
| `del-bg-color` / `delBgColor` | 删除按钮背景色 | `string` | `'var(--u-type-error)'` |
| `del-icon` / `delIcon` | 删除按钮图标 | `string` | `'close'` |
| `del-color` / `delColor` | 删除按钮颜色 | `string` | `'var(--u-white-color)'` |
| `image-mode` / `imageMode` | 图片裁剪模式 | `ImgMode`（`aspectFit`｜`aspectFill`｜`widthFix`｜`top`｜`bottom`｜`center`｜`scaleToFill`） | `'aspectFill'` |
| `custom-btn` / `customBtn` | 是否自定义上传按钮 | `boolean` | `false` |
| `upload-text` / `uploadText` | 上传按钮文字 | `string` | `''` |
| `action` | 上传地址 | `string` | `''` |
| `disabled` | 是否禁用 | `boolean` | `false` |
| `index` | 索引值，在各个回调事件中的最后一个参数返回，用于区别是哪一个组件的事件 | `string \| number` | `''` |
| `header` | 请求头对象 | `Record<string, any>` | - |
| `form-data` / `formData` | formData对象 | `Record<string, any>` | - |
| `name` | 文件字段名 | `string` | `'file'` |
| `size-type` / `sizeType` | 压缩/原图，微信小程序有效 | `UploadSizeType[]` | - |
| `source-type` / `sourceType` | 来源，相册/相机 | `UploadSourceType[]` | - |
| `preview-full-image` / `previewFullImage` | 是否可预览大图 | `boolean` | `true` |
| `preview-file` / `previewFile` | 是否可预览文件 | `boolean` | `true` |
| `multiple` | 是否支持多选 | `boolean` | `true` |
| `max-size` / `maxSize` | 单个文件最大大小，单位B(byte)，默认不限制 | `number \| string` | - |
| `model-value` / `modelValue` | 文件列表（v-model 双向绑定） 推荐使用 v-model 替代 :file-list | `UploadFileItem[]` | - |
| `file-list` / `fileList` | 文件列表（初始值，向后兼容） 请使用 v-model（已废弃） | `UploadFileItem[]` | - |
| `limit-type` / `limitType` | 限制文件类型 允许上传的文件后缀 支付宝小程序真机选择图片的后缀为"image" https://opendocs.alipay.com/mini/api/media-image | `string[]` | - |
| `auto-upload` / `autoUpload` | 是否自动上传 | `boolean` | `true` |
| `show-tips` / `showTips` | 是否显示提示 | `boolean` | `true` |
| `show-confirm` / `showConfirm` | 是否显示确认弹窗 | `boolean` | `true` |
| `before-upload` / `beforeUpload` | 上传前钩子，返回true或Promise | `((index: number, files: UploadFileItem[]) => boolean \| Promise<any>) \| null` | `null` |
| `before-remove` / `beforeRemove` | 删除前钩子，返回true或Promise | `((index: number, files: UploadFileItem[]) => boolean \| Promise<any>) \| null` | `null` |
| `to-json` / `toJson` | 如果上传后的返回值为json字符串，是否转为json格式 | `boolean` | `true` |
| `accept` | 接受上传的文件类型 image-图片(默认), video-视频, file-文件, media-媒体(图片+视频), all-所有文件 | `UploadAcceptType` | `'image'` |
| `show-file-name` / `showFileName` | 是否显示文件名 | `boolean` | `true` |
| `show-file-size` / `showFileSize` | 是否显示文件大小 | `boolean` | `false` |
| `file-icon-map` / `fileIconMap` | 文件类型图标映射配置 用于自定义不同文件类型的图标 | `Record<string, { name: string; color?: string }>` | - |
| `compressed` | 选择视频时是否压缩 | `boolean` | `true` |
| `max-duration` / `maxDuration` | 选择视频时拍摄最长时长，单位秒 | `number` | `60` |
| `camera` | 选择视频时，是前置还是后置摄像头 | `front`｜`back` | `'back'` |
| `extension` | 选择文件时的扩展名过滤 仅在 accept='file' 或 accept='all' 时有效 | `string[]` | - |
| `image-shape` / `imageShape` | 图片/图标展示形状 可选值：square-方形(默认), circle-圆形。在 grid 模式下作用于图片和添加按钮，在 list 模式下作用于图标 | `square`｜`circle` | `'square'` |
| `custom-choose` / `customChoose` | 是否使用自定义选择文件 设置为 true 时，点击选择文件会触发 on-choose 事件，不会调用默认的文件选择 API，用户可自行处理文件选择逻辑，然后通过 addFiles 方法将文件添加到列表 | `boolean` | `false` |

## 双向绑定（v-model）

| 写法 | 通道 | 说明 |
| --- | --- | --- |
| `v-model` | prop + emit（`update:modelValue`） | `modelValue` 属性，默认 - |

## 事件

| 事件 | 回调参数 | 说明 |
| --- | --- | --- |
| `@on-list-change` | - | 文件列表发生变化时触发 |
| `@on-oversize` | - | 文件大小超出max-size限制时触发 |
| `@on-exceed` | - | 文件数量超出max-count限制时触发 |
| `@on-choose` | - | 启用 custom-choose 时触发，参数为 { accept, maxCount, fileList, index }，用户可自定义文件选择逻辑 |
| `@on-choose-complete` | - | 每次选择文件后触发，返回当前文件列表 |
| `@on-choose-fail` | - | 文件选择失败时触发 |
| `@on-uploaded` | - | 所有文件上传完毕时触发 |
| `@on-success` | - | 单个文件上传成功时触发 |
| `@on-error` | - | 单个文件上传失败时触发 |
| `@on-change` | - | 单个文件上传状态改变时触发（无论成功或失败） |
| `@on-progress` | - | 文件上传过程中的进度变化时触发 |
| `@on-remove` | - | 移除文件时触发 |
| `@on-preview` | - | 预览文件时触发 |

## 插槽

| 插槽名 | 说明 |
| --- | --- |
| `file` | - |
| `addBtn` | - |

## 命令式方法（通过组件 ref 调用）

| 方法 | 说明 |
| --- | --- |
| `lists` | - |
| `clear` | - |
| `reUpload` | - |
| `selectFile` | - |
| `upload` | - |
| `retry` | - |
| `remove` | - |
| `previewImage` | - |
| `previewFile` | - |
| `addFiles` | - |
