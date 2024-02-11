import { defineStore } from "pinia";
import { reactive } from "vue";
import type { conda_env } from "./utils/CondaOp.d";

export interface AppConf {
  DefaultInstall: string[];
}

export interface CondaInfo {
  conda_version: string;
  env_vars: {
    CONDA_ROOT: string;
    CUDA_PATH: string;
  };
}

export const useMainStore = defineStore("main", {
  state: () => ({
    count: 0,
    name: "Eduardo",
    // conda环境列表
    envs: reactive([]) as conda_env[],
    appConf: reactive({} as AppConf),
    condaInfo: reactive({} as CondaInfo),
    globalPython: "加载中",
  }),
  getters: {
    double: (state) => state.count * 2,
  },
  actions: {
    increment() {
      this.count++;
    },
    decrement() {
      this.count--;
    },
  },
});
