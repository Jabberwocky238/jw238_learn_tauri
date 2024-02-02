<template>
    <div>
        <OptionItem>
            <template #left>
                pycharm路径<el-button type="warning" text @click="checkPycharm">check</el-button>
            </template>
            <template #right>
                <span class="pure-text">{{ pycharmPath }}</span>
            </template>
        </OptionItem>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import OptionItem from './base/OptionItem.vue'
import { checkPycharm } from './checkPycharm'
const pycharmPath = ref("None")

</script>

<style lang="scss" scoped>

</style>