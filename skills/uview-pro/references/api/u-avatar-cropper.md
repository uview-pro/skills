<!-- 生成物，勿手改：由 scripts/gen-api-cards.mjs 渲染，改动会在下次再生成时丢失 -->

# u-avatar-cropper API

> 来源：`components/u-avatar-cropper`（uview-pro v0.6.21）
> API 指纹：`sha256:493560d6aa24d6c1eb856178128f15bd583174e99e030fe7f16b08a583e7a5ba`
> 官方文档：https://uviewpro.cn/zh/components/avatarCropper.html
> 再生成（组件库源码可读时）：`node scripts/gen-api-cards.mjs --lib <uview-pro 路径> --only avatar-cropper`

该组件一般用于头像裁剪场景，支持对图片进行拖动、缩放后裁剪，裁剪完成后通过全局事件 uni.$emit('uAvatarCropper', path) 返回结果，一般在独立页面中使用

## 用法示例

```vue
<u-avatar-cropper :bound-style="{ lineWidth: 4, borderColor: 'rgb(245, 245, 245)', mask: 'rgba(0, 0, 0, 0.35)' }"></u-avatar-cropper>
```

## 属性

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `bound-style` / `boundStyle` | 裁剪矩形框的样式 | `AvatarCropperBoundStyle` | - |

## 双向绑定（v-model）

该组件无双向绑定。

## 事件

无类型化自定义事件（原生事件不受影响，可直接透传监听）。

## 插槽

无插槽。
