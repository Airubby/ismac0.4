import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export const syncRouter=[
    {
        path: '/',
        name: 'home',
        meta: { title: '首页'},
        component: () => import('@/views/home.vue'),
        redirect:'/loncom',
    },
    {
      path: '/login',
      name: 'login',
      meta: { title: 'login'},
      component: () => import('@/views/login.vue'),
    },
    {
      path: '/bigHome',
      name: 'bigHome',
      meta: { title: 'bigHome'},
      component: () => import('@/views/bigHome.vue'),
    },
    { path: '/404',name:'404',meta: { title: '404'}, component: () => import('@/views/errorPage/404') },
    { path: '/401',name:'401',meta: { title: '401'}, component: () => import('@/views/errorPage/401') },
];

// export const asyncRouter=[
    
// ]
// export const router= new Router({
//   //mode: 'history',
//   mode:'hash',
//   base: process.env.BASE_URL,
//   routes:syncRouter
// })

const createRouter = () => new Router({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes: syncRouter
 })
 
 export function resetRouter () {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher
 }
 export const router = createRouter()