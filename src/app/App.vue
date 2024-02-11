<template>
  <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
    <el-tab-pane label="User" name="first">
      <Enviroment></Enviroment>
    </el-tab-pane>
    <el-tab-pane label="Config" name="second">
      <Setting></Setting>
    </el-tab-pane>
  </el-tabs>
</template>

<script setup lang="ts">
import Enviroment from './views/Enviroment.vue';
import Setting from './views/Setting.vue';
import { ElLoading } from 'element-plus';
import type { TabsPaneContext } from 'element-plus'
import { ref } from 'vue'
const activeName = ref('first')
import { CondaOp } from './utils/CondaOp.ts'

const handleClick = (tab: TabsPaneContext, event: Event) => {
  // console.log(tab, event)
}

const initApp = () => {
  const loadingInstance = ElLoading.service({ fullscreen: true })
  CondaOp.conda_env_list()
  loadingInstance.close()
}
initApp()
</script>

<style scoped></style>