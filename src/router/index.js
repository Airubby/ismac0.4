import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export const syncRouter=[
  {
    path: '/',
    name: 'home',
    meta: { title: '首页'},
    component: () => import('@/views/Home.vue')
  },
  { path: '/404',meta: { title: '404'}, component: () => import('@/views/errorPage/404') },
  { path: '/401',meta: { title: '401'}, component: () => import('@/views/errorPage/401') },
];

export const asyncRouter=[
  {
    path: '/',
    name: 'home',
    meta: { title: '首页'},
    component: () => import('@/views/Home.vue')
  },
  
]
export const router= new Router({
  //mode: 'history',
  mode:'hash',
  base: process.env.BASE_URL,
  routes:syncRouter
})
