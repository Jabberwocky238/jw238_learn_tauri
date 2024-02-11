<template>
    <div>
        <h1>{{ props.env.name }}</h1>
        Env Path:{{ props.env.path }}<br>
        <el-button @click="">AsGlobal</el-button>
        <el-button @click="clickRemove">Delete</el-button>
        <el-button @click="">Export</el-button>
        <el-button @click="Debug">Debug</el-button>
        <el-button @click="packges">packges</el-button>
        <el-input v-model="fuzzSearchPackage" placeholder="fuzzSearchPackage" />
        总包数：{{ tableDataNum }}<br>

        <el-form :inline="true" :model="packageForm">
            <el-form-item label="包名">
                <el-input v-model="packageForm.packageName" placeholder="填入包名" clearable />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="addPackage">安装</el-button>
            </el-form-item>
        </el-form>

        <el-scrollbar max-height="300px">
            <el-table v-loading="tableLoading" :data="tableData" height="300px" style="width: 100%">
                <el-table-column prop="version" label="Version" width="100" />
                <el-table-column prop="name" label="Name" width="100" />
                <el-table-column prop="build" label="Build" width="180" />
                <el-table-column prop="channel" label="Channel" width="180" />
            </el-table>
        </el-scrollbar>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
// import EnvInfoItem from './EnvInfoItem.vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { ref, reactive } from 'vue'
import { get_env_package, type env_package, install_package } from '../../utils/CondaOp'
const props = defineProps<{
    env: {
        name: String,
        path: String
    }
}>()
const packageForm = ref({
    packageName: ""
})
const fuzzSearchPackage = ref("")
const tableLoading = ref(false)
const tableData = reactive([] as env_package[])
const tableDataNum = ref(0)

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
            // removeCurEnv(route.params.name as string)
        })
        .catch(() => {

        })
}

const packges = () => {
    get_env_package(props.env.name, tableData, tableDataNum, tableLoading)
}

const addPackage = () => {
    install_package(props.env.name, packageForm.value.packageName)
}

const Debug = () => {
    console.log(localStorage)
}

onMounted(() => {

})

</script>

<style scoped></style>
