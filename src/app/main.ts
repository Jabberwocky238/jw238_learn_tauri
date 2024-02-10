import { createApp } from "vue";
import { createPinia } from "pinia";
import ElementPlus from 'element-plus'
import App from "./App.vue";
import { router } from "./router";

import 'element-plus/theme-chalk/dark/css-vars.css'
import 'element-plus/dist/index.css'
import "./styles.css";

const pinia = createPinia();
const app = createApp(App);

app.use(ElementPlus)
app.use(router);
app.use(pinia);
app.mount("#app");
