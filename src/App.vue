<template>
  <NaviBar/>
  <div v-if="store.count !== 0" class="loading">Loading</div>
</template>

<script setup lang="ts">
import NaviBar from './components/NaviBar.vue';

import { checkCondaEnvs, checkCondaInfo } from './components/config/checkConda';
import { readAppConf } from './components/config/base/manageAppConf';
// import { globalPython } from './components/config/initEnviroment'

import { useMainStore } from './store/index'
const store = useMainStore();
// import { getCurrentInstance } from 'vue'
 
const initApp = () => {
  readAppConf()
  checkCondaInfo()
  checkCondaEnvs()
}
initApp()
</script>

<style scoped>
.loading {
  position: fixed;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
  width: 100vw;
  height: 100vh;
  opacity: 0.5;
  background-color: grey;
  color: white;
  z-index: 999;
}
</style>