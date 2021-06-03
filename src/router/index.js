import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export const syncRouter=[
	{
        path: '/404',
        component: () => import(/* webpackChunkName: "public-404" */ '@/views/errorPage/404'),
        hidden: true
    },
    {
        path: '/401',
        component: () => import(/* webpackChunkName: "public-401" */ '@/views/errorPage/401'),
        hidden: true
    },
    {
        path: '/login',
        component: () => import(/* webpackChunkName: "public-login", webpackPrefetch: true */ '@/views/Login'),
        hidden: true
    },
    {
        path: '/bigScreen',
        name: 'BigScreen',
        meta:{ title: '大屏'},
        component: () => import(/* webpackChunkName: "bigscreen", webpackPrefetch: true */ '@/views/BigScreen/Index.vue'),
    },
    {
        path: '/lib',
        component: () => import(/* webpackChunkName: "public-lib", webpackPrefetch: true */ '@/packages/rack/index.vue'),
        hidden: true
    },
    // { path: '*', component: () => import(/* webpackChunkName: "404", webpackPrefetch: true */ '@/views/errorPage/Loading') },
    // { path: '/404',name:'404',meta: { title: '404'}, component: () => import(/* webpackChunkName: "404", webpackPrefetch: true */ '@/views/errorPage/404') },
  
];
/**
 * 重写路由的push方法  解决 Navigating to current location ("url") is not allowed
 */
const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
}
export const asyncRouter=[]
export function resetRouter () {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher
}
const createRouter = () => new Router({
    // mode: 'history',  //默认hash
    base: process.env.BASE_URL,
    routes: syncRouter
 })

export const router= createRouter()
