import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'
import Home from '../pages/Home.vue'
import Detail from '../pages/Detail.vue'

const routes:Array<RouteRecordRaw> = [
    {
        path: '/',
        component: Home,
        children: [
            {
                path: '/detail/:id',
                component: Detail,
            }
        ]
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router