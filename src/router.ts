import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

// 2. 配置路由
const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        redirect: "/envs",
    },
    {
        path: '/setting',
        component: () => import("./components/config/SysConf.vue"),
        name: "SysConf",
    },
    {
        path: '/envs/:name?',
        component: () => import("./components/envs/EnvPage.vue"),
        name: "EnvPage",
        children: [
            {
                path: 'detail',
                props: (route) => {
                    route.params.name || 'base'
                },
                component: () => import("./components/envs/EnvDetail.vue"),
            }
        ],
        
    },
]

// 3. 创建路由实例并传递 `routes` 配置
// 你可以在这里输入更多的配置，但我们在这里
// 暂时保持简单
const router = createRouter({
    // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: createWebHashHistory(),
    routes, // `routes: routes` 的缩写
})
// 3导出路由   然后去 main.ts 注册 router.ts

export { router, routes }