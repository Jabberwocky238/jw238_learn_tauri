<template>
    <div>
        <OptionItem>
            <template #left>
                全局环境
            </template>
            <template #right>
                <el-switch v-model="useGlobal" />
            </template>
        </OptionItem>
        <OptionItem>
            <template #left>
                当前全局环境
            </template>
            <template #right>
                <span class="pure-text">{{ curGlobalEnv }}</span>
            </template>
        </OptionItem>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import OptionItem from './base/OptionItem.vue'
import { useMainStore } from '../../store'
const store = useMainStore()

const useGlobal = ref(false)
const curGlobalEnv = store.globalPython


</script>

<style lang="scss" scoped>

</style>