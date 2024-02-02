<template>
    <div class="OptionItem">
        <div class="text-area">
            <slot name="left"></slot>
            <!-- <el-popover placement="right" :width="200" trigger="hover"
                :content="discription">
                <template #reference>
                    
                </template>
            </el-popover> -->
        </div>
        <div class="right-area">
            <slot name="right"></slot>
        </div>
    </div>
</template>

<script setup lang="ts">
// import { defineComponent, defineProps } from 'vue';
// const { message, discription } = defineProps(["message", "discription"]);

</script>

<style lang="scss" scoped>
.OptionItem {
    display: flex;
    justify-content: space-between;
    margin: 4px;
    // background-color: brown;

    .text-area {
        height: 100%;
        text-indent: 1em;
        line-height: 32px;
        cursor: default;
    }

    .right-area {
        margin-right: 5px;
    }
}
</style>