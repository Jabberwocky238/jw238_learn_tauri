<template>
    <div>
        <OptionItem>
            <template #left>
                conda version<el-button type="warning" text @click="checkCondaEnvs">check</el-button>
            </template>
            <template #right>
                <!-- <el-input v-model="pkgManager" disabled placeholder="Please input" /> -->
                <span class="pure-text">{{ pkgManager }}</span>
            </template>
        </OptionItem>
        <OptionItem>
            <template #left>
                手动输入conda位置
            </template>
            <template #right>
                <el-button type="warning" text>input</el-button>
            </template>
        </OptionItem>
        <!-- <el-dialog v-model="inputCondaPathMamally" title="Warning" width="30%" center>
            <span>
            It should be noted that the content will not be aligned in center by
            default
            </span>
            <template #footer>
            <span class="dialog-footer">
                <el-button @click="centerDialogVisible = false">Cancel</el-button>
                <el-button type="primary" @click="centerDialogVisible = false">
                Confirm
                </el-button>
            </span>
            </template>
        </el-dialog> -->
        <OptionItem>
            <template #left>
                conda abs path
            </template>
            <template #right>
                <!-- <el-input v-model="pkgManagerAbsPath" disabled placeholder="Please input" /> -->
                <span class="pure-text">{{ pkgManagerAbsPath }}</span>
            </template>
        </OptionItem>
        <OptionItem>
            <template #left>
                init 环境变量
            </template>
            <template #right>
                <el-button type="warning" text @click="initEnviroment">Init</el-button>
            </template>
        </OptionItem>
        <OptionItem>
            <template #left>
                下载conda
            </template>
            <template #right>
                <el-button type="warning" text>download</el-button>
            </template>
        </OptionItem>
        <OptionItem>
            <template #left>
                conda源
            </template>
            <template #right>
                <el-radio-group v-model="radio" class="pure-text">
                    <el-radio :label="3">原始源</el-radio>
                    <el-radio :label="6">清华源</el-radio>
                    <el-radio :label="9">阿里源</el-radio>
                </el-radio-group>
            </template>
        </OptionItem>
        <OptionItem>
            <template #left>
                安装使用
            </template>
            <template #right>
                <el-radio-group v-model="installUse" class="pure-text">
                    <el-radio :label="3">pip</el-radio>
                    <el-radio :label="6">conda</el-radio>
                </el-radio-group>
            </template>
        </OptionItem>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import OptionItem from './base/OptionItem.vue'
import { checkCondaEnvs } from './checkConda'
import { initEnviroment } from './initEnviroment'
import { useMainStore } from '../../store'
const store = useMainStore();

const pkgManager = store.condaInfo.conda_version
const pkgManagerAbsPath = store.condaInfo.env_vars.CONDA_ROOT
const radio = ref(3)
const installUse = ref(3)


</script>

<style lang="scss" scoped>

</style>