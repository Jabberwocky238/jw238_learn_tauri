import { defineStore } from "pinia";
import type { Env, AppConf, CondaInfo} from "./index.d";
import { reactive } from "vue";

export const useMainStore = defineStore("main", {
  state: () => ({
    count: 0,
    name: "Eduardo",
    // conda环境列表
    envs: reactive([]) as Env[],
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
    }
  },
});
export { Env, AppConf, type CondaInfo };

