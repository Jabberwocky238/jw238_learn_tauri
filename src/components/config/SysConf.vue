<template>
  <el-space direction="vertical" alignment="start" fill class="sys-conf">
    CheckConda
    <CheckConda></CheckConda>
    CheckCuda
    <CheckCuda></CheckCuda>
    CheckPycharm
    <CheckPycharm></CheckPycharm>
    UseGlobal
    <UseGlobal></UseGlobal>
    DefaultInstall
    <DefaultInstall></DefaultInstall>
  </el-space>
</template>

<script setup lang="ts">
import CheckConda from './CheckConda.vue'
import CheckCuda from './CheckCuda.vue'
import CheckPycharm from './CheckPycharm.vue'
import UseGlobal from './UseGlobal.vue'
import DefaultInstall from './DefaultInstall.vue'

</script>

<style lang="scss" scoped>
@import "base/configStyle.scss";
.sys-conf {
  width: 100%;
  background: brown;
  padding: 20px;
  box-sizing: border-box;
}
</style>