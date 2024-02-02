<template>
    <div class="env-page-container">
        <!-- <el-skeleton :rows="5" animated /> -->
        <div class="iii-aside">
            <div class="upper-bar">
                <div>当前使用的conda环境</div>
                <!-- <el-button type="warning" text @click="createNewEnv">添加</el-button> -->
                <el-button type="warning" text @click="drawer = true">添加</el-button>
            </div>
            <div class="env-list">
                <div class="env-bar" v-for="env in store.envs">
                    <router-link :to="`/envs/${env.name}/detail`">{{ env.name }}</router-link>
                </div>
            </div>
        </div>
        <router-view v-slot="{ Component }">
            <keep-alive>
                <component :key="route.params.name" :is="Component" />
            </keep-alive>
        </router-view>
        <el-drawer v-model="drawer" title="createNewEnv" direction="rtl" :before-close="handleClose" size="70%">
            <el-form label-position="right" label-width="120px" ref="ruleFormRef" :model="ruleForm" :rules="rules">
                <el-form-item label="环境名称" prop="name">
                    <el-input v-model="ruleForm.name" placeholder="Approved by" clearable />
                </el-form-item>
                <el-form-item label="python版本" prop="pythonVersion">
                    <el-select v-model="ruleForm.pythonVersion" placeholder="Activity zone" clearable>
                        <el-option label="python 3.12" value="python=3.12" />
                        <el-option label="python 3.11" value="python=3.11" />
                        <el-option label="python 3.10" value="python=3.10" />
                        <el-option label="python 3.9" value="python=3.9" />
                        <el-option label="python 3.8" value="python=3.8" />
                        <el-option label="python 3.7" value="python=3.7" />
                        <el-option label="python 3.6" value="python=3.6" />
                    </el-select>
                </el-form-item>
                <el-form-item label="深度学习框架" prop="DLFramework">
                    <el-select v-model="ruleForm.DLFramework" placeholder="Activity zone" clearable>
                        <el-option label="(None)" value="" />
                        <el-option label="torch" value="torch" />
                        <el-option label="tensorflow" value="tensorflow" />
                    </el-select>
                </el-form-item>
                <el-form-item label="使用默认安装" prop="defaultInstall">
                    <el-switch v-model="ruleForm.defaultInstall" />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm(ruleFormRef)">创建</el-button>
                    <el-button type="warning" @click="drawer = false">取消</el-button>
                    <el-button type="warning" @click="resetForm(ruleFormRef)">清空</el-button>
                </el-form-item>
            </el-form>
        </el-drawer>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useMainStore } from '../../store'
import { useRoute } from 'vue-router';
import type { FormInstance, FormRules } from 'element-plus'
import { createNewEnv, type RuleForm } from './createNewEnv'

const route = useRoute();
const store = useMainStore();
const drawer = ref(false)

const handleClose = async (done: () => void) => {
    done()
}

const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<RuleForm>({
    name: '',
    pythonVersion: "",
    DLFramework: '',
    defaultInstall: true,
})

const descriptor = {
    name: [
        { required: true, message: 'Please input Enviroment Name', trigger: 'blur' },
        { required: true, message: '0-9 a-z A-Z validate', trigger: 'blur', pattern: /^[a-z,A-Z,0-9]+$/,}
    ],
    pythonVersion: {
        required: true,
        message: 'Please select pythonVersion',
        trigger: 'change',
    }
}

const rules = reactive<FormRules<RuleForm>>(descriptor)

const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (valid) {
            console.log('submit!')
            createNewEnv(ruleForm)
        } else {
            console.log('error submit!', fields)
        }
    })
}

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
}
</script>

<style lang="scss" scoped>
@import './envsStyle.scss';

.env-page-container {
    height: calc(100vh - 55px);
    display: flex;

    .iii-aside {
        width: 30%;
        background-color: purple;

        .upper-bar {
            display: flex;
            justify-content: space-between;
        }

        .env-list {
            background-color: burlywood;
        }
    }
}
</style>