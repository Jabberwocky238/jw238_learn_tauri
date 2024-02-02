<template>
    <div>
        <OptionItem>
            <template #left>
                环境默认装的包
            </template>
            <template #right>
                <el-button type="warning" text @click="openDrawer">set</el-button>
            </template>
        </OptionItem>
        <el-drawer style="background-color: brown;" 
        v-model="drawer" 
        title="环境默认装的包" 
        direction="ltr" 
        :before-close="handleClose" 
        size="70%">
            <div v-for="item in store.appConf.DefaultInstall" :key="item">
                {{ item }}
            </div>
        </el-drawer>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import OptionItem from './base/OptionItem.vue'
// import { readAppConf, writeAppConf } from './base/manageAppConf'
// import Drawer from './base/Drawer.vue'
// import { ElMessageBox } from 'element-plus'
import { useMainStore } from '../../store'

const drawer = ref(false)
const store = useMainStore();

const openDrawer = async () => {
    drawer.value = true
}
const handleClose = async (done: () => void) => {
    // ElMessageBox.confirm('Are you sure you want to close this?')
    // .then(() => {
    //     done()
    // })
    // .catch(() => {
    //     // catch error
    // })

    done()
}
</script>

<style lang="scss" scoped>

</style>