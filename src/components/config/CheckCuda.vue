<template>
    <div>
        <OptionItem>
            <template #left>
                cuda版本<el-button type="warning" text @click="checkCuda">check</el-button>
            </template>
            <template #right>
                <span class="pure-text">{{ cudaVersion }}</span>
            </template>
        </OptionItem>
    </div>
</template>

<script setup lang="ts">
// import { ref } from 'vue';
import OptionItem from './base/OptionItem.vue'
import { checkCuda } from './checkCuda'
import { useMainStore } from '../../store'
const store = useMainStore();
const cudaVersion = store.condaInfo.env_vars.CUDA_PATH

</script>

<style lang="scss" scoped>

</style>