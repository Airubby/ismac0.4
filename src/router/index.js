import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
//要给meta，meta中必须存在键值对
export const syncRouter=[
    {
        path: '/',
        name: 'home',
        meta: { title: 'home'},
        component: () => import('@/views/home.vue'),
        redirect:'/login',
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
    {
      path: '/test',
      name: 'test',
      meta: { title: 'test'},
      component: () => import('@/views/test/index.vue'),
    },
    {
        path: '/test1',
        name: 'test1',
        meta: { title: 'test'},
        component: () => import('@/views/test/index1.vue'),
      },
    { path: '*', component: () => import('@/views/errorPage/Loading') }, //这个不要给meta的键值对
    { path: '/404',name:'404',meta: { title: '404'}, 
      component: () => import('@/views/errorPage/404') 
    },
    { path: '/401',name:'401',meta: { title: '401'}, 
      component: () => import('@/views/errorPage/401') 
    },
];

// export const asyncRouter=[
    
// ]
// export const router= new Router({
//   //mode: 'history',
//   mode:'hash',
//   base: process.env.BASE_URL,
//   routes:syncRouter
// })

/**
 * 重写路由的push方法  解决 Navigating to current location ("url") is not allowed
 */
const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
}

const createRouter = () => new Router({
    // mode: 'history',  //默认hash
    base: process.env.BASE_URL,
    routes: syncRouter
 })
 
 export function resetRouter () {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher
 }
 export const router = createRouter()