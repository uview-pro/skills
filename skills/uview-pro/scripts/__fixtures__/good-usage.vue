<!-- 正例回归样例：全部写作合法，期望 verify-u-usage.mjs 0 error / 0 warn（纳入技能自检清单） -->
<template>
    <view class="good-usage">
        <!-- 基础组件：枚举取值、布尔裸属性、事件 -->
        <u-button text="主要按钮" type="primary" size="large" plain @click="onClick" />

        <!-- 数据展示：枚举取值 -->
        <u-tag text="标签" type="success" mode="light" />

        <!-- 反馈：数组绑定 + 事件名原样（getMore） -->
        <u-notice-bar :list="list" @getMore="onGetMore" />

        <!-- v-model 走 modelValue 通道（u-popup 支持；show 为单向 prop，禁止 v-model:show） -->
        <u-popup v-model="visible" mode="center">
            <view class="popup-content">
                <text>弹窗内容</text>
            </view>
        </u-popup>
    </view>
</template>
