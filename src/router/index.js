import {
    createRouter,
    createWebHistory
} from 'vue-router'
import Home from '../views/Index.vue'
import ErrorPage from '../views/ErrorPage.vue'

const routes = [{
    path: '/',
    component: Home,
    meta: {
        title: '工作台'
    },
    redirect: '/dashboard',
    children: [{
        path: '/dashboard',
        component: () => import('../views/dashboard/index.vue'),
        meta: {
            title: '首页'
        }
    }]
},
// {
//     path: '/login',
//     component: () => import('../views/Login.vue'),
//     meta: {
//         title: '登录'
//     }
// },
{
    path: '/:path(.*)',
    component: ErrorPage
}
]

const router = createRouter({
    history: createWebHistory(),
    routes
})



export default router