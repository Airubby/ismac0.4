import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export const syncRouter=[
    {
        path: '/',
        name: 'Home',
        redirect:'/login',
        component: () => import('@/views/Index.vue'),
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/Login.vue'),
    },
    { path: '/loncom/401', component: () => import('@/views/errorPage/401') },
  	{ path: '*', component: () => import('@/views/errorPage/404') },
];
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