<template>
  <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
    <el-tab-pane label="EnvPage" name="EnvPage"></el-tab-pane>
    <el-tab-pane label="SysConf" name="SysConf"></el-tab-pane>
    <el-tab-pane label="toggleDark" name="toggleDark"></el-tab-pane>
  </el-tabs>
  <router-view v-slot="{ Component }">
    <keep-alive>
      <component :key="route.name" :is="Component" />
    </keep-alive>
  </router-view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { TabsPaneContext } from 'element-plus'
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute();

const activeName = ref('EnvPage')

const handleClick = (tab: TabsPaneContext, _: Event) => {
  // console.log(tab, event)
  if (tab.props.label == 'EnvPage') router.push('/envs')
  if (tab.props.label == 'SysConf') router.push('/setting')
  if (tab.props.label == 'toggleDark') toggleDark()
}

import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark()
const toggleDark = useToggle(isDark)

</script>

<style scoped>

.demo-tabs>.el-tabs__header {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
  width: 100vw;
}

.demo-tabs>.el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
  width: 100vw;
}
</style>