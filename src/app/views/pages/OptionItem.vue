<template>
    <div class="OptionItem">
        <h4 class="text-area">{{ props.info }}</h4>
        <div class="right-area">
            <slot></slot>
        </div>
    </div>
</template>

<script setup lang="ts">
// import { defineComponent, defineProps } from 'vue';
const props = defineProps<{
    info: string
}>();

</script>

<style lang="scss" scoped>
.OptionItem {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    margin: 10px;
    text-align: center;
    border-radius: 4px;
    background: var(--el-color-primary-light-9);
    color: var(--el-color-primary);
    justify-content: space-between;

    // margin: 4px;
    .text-area {
        height: 100%;
        text-indent: 1em;
        line-height: 50px;
        cursor: default;
    }

    .right-area {
        margin-right: 1em;
    }
}
</style>