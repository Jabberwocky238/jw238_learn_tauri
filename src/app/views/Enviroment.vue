<template>
    <el-row>
        <el-col :xs="7" :sm="7" :md="7" :lg="4" :xl="4">
            <el-button @click="add">Add Item</el-button>
            <el-button @click="onDelete">Delete Item</el-button>
            <el-scrollbar max-height="400px">
                <el-button type="primary" v-for="item in store.envs" :key="item.name" @click="visible = item.name"
                    class="el-button-env-item scrollbar-demo-item">
                    {{ item.name }}
                </el-button>
                <p v-for="item in count" :key="item" class="scrollbar-demo-item">
                    {{ item }}
                </p>
            </el-scrollbar>
        </el-col>
        <el-col :xs="17" :sm="17" :md="17" :lg="20" :xl="20">
            <EnvInfo v-for="item in store.envs" :key="item.name" :env="item"
                :style="visible == item.name ? CSSshow : CSSdont_show"></EnvInfo>
        </el-col>
    </el-row>
</template>
  
<script lang="ts" setup>
import { CSSProperties, ref } from 'vue'
const count = ref(3)
import EnvInfo from './pages/EnvInfo.vue'
import { useMainStore } from '../store';
const store = useMainStore();
const visible = ref("base")

const CSSshow: CSSProperties = {
    display: 'block'
}
const CSSdont_show: CSSProperties = {
    display: 'none'
}

const add = () => {
    count.value++
}
const onDelete = () => {
    if (count.value > 0) {
        count.value--
    }
}
</script>
  
<style scoped>
.el-button-env-item {
    width: -webkit-fill-available;
    padding: 0;
}

.scrollbar-demo-item {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    margin: 10px;
    text-align: center;
    border-radius: 4px;
    box-sizing: border-box;
    background: var(--el-color-primary-light-9);
    color: var(--el-color-primary);
}
</style>
  