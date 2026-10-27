<!-- 负例回归样例（故意写错）：6 处错误各对应一条校验规则，期望 verify-u-usage.mjs 全命中（error 6 / warn 0），并把本文件纳入技能自检清单 -->
<template>
    <view class="bad-usage">
        <!-- ① unknown-prop：tpye 拼写错误（最接近 type） -->
        <u-button tpye="primary" text="按钮" />

        <!-- ② enum-value：ButtonType 枚举无 primari（最接近 primary） -->
        <u-button type="primari" text="按钮" />

        <!-- ③ enum-value：TagMode 枚举无 darkk（最接近 dark） -->
        <u-tag mode="darkk" text="标签" />

        <!-- ④ unknown-event：@get-mor 拼写错误（最接近 @getMore） -->
        <u-notice-bar :list="['通告一', '通告二']" @get-mor="onGet" />

        <!-- ⑤ unknown-model：v-model:showw 拼写错误（最接近 v-model:show） -->
        <u-popup v-model:showw="visible">
            <text>内容</text>
        </u-popup>

        <!-- ⑥ cross-prefix：ux- 前缀属 uni-app x 组件库（普通版对应 u-button） -->
        <ux-button text="按钮" />
    </view>
</template>
