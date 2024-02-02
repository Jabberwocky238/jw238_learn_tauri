<template>
    <div class="iii-content">
        <h1>{{ route.params.name }}</h1>
        <div class="button-bar">
            <el-button type="warning" text @click="clickGlobal">设为全局</el-button>
            <el-button type="warning" text @click="clickRemove">删除</el-button>
            <el-button type="warning" text @click="clickExport">导出</el-button>
            pycharm是否可见: <el-switch v-model="pycharmVisible" class="ml-2" inline-prompt active-text="Yes" inactive-text="No"
                size="large" />

        </div>
        <div>
            <el-form :inline="true" :model="packageFrom" class="package-form">
                <el-form-item label="包名">
                    <el-input v-model="packageFrom.packageName" placeholder="填入包名" clearable />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onInstall">安装</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div>
            <el-input v-model="fuzzSearchPackage" placeholder="fuzzSearchPackage" />
            总包数：{{ tableDataNum }}
            <el-scrollbar max-height="300px">
                <el-table :data="tableData" height="300px" style="width: 100%">
                    <el-table-column prop="version" label="Version" width="100" />
                    <el-table-column prop="name" label="Name" width="100" />
                    <el-table-column prop="build" label="Build" width="180" />
                    <el-table-column prop="channel" label="Channel" width="180" />
                </el-table>
            </el-scrollbar>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { type envPackage, getEnvAllPackages } from './envAllPackages'
import { useRoute } from 'vue-router';
import { removeCurEnv } from './removeCurEnv'
import { exportCurEnv } from './exportCurEnv'
import { setAsGlobal } from './setAsGlobal'
import { onInstall } from './onInstall'

const packageFrom = ref({
    packageName: ""
})
const fuzzSearchPackage = ref("")
const pycharmVisible = ref(false)
const route = useRoute();
console.log("props", route.params.name)

const tableData = reactive([] as envPackage[])
const tableDataNum = ref(0)

import { ElMessage, ElMessageBox } from 'element-plus'

const clickRemove = () => {
    ElMessageBox.confirm(
        '该环境将被删除，无法恢复. Continue?', 'Warning',
        {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            type: 'warning',
        }
    )
    .then(() => {
        ElMessage({
            type: 'success',
            message: 'Delete completed',
        })
        removeCurEnv(route.params.name as string)
    })
    .catch(() => {
        
    })
}

const clickGlobal = () => {

}

const clickExport = () => {

}

function init() {
    getEnvAllPackages(route.params.name as string, tableData, tableDataNum)
}

init()
</script>

<style lang='scss' scoped>
@import './envsStyle.scss';

.iii-content {
    width: 70%;

    .package-form {
        display: flex;
        justify-content: space-between;
    }
}
</style>