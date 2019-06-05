import {syncRouter, asyncRouter,router } from '@/router/index'
import Cookies from 'js-cookie'
/**
 * 递归过滤异步路由表，生成router数据结构
 * @param asyncRouterMap
 * @param data
 */
function filterAsyncRouter(data) {
    data.map((item)=>{
        let addr=item.component;
        item.component = () => import(`@/views/${addr}`);
        if(item.children){
            item["redirect"]=item.children[0].path;
            item.children=filterAsyncRouter(item.children);
        }
    })
    return data;
}

const user = {
  state: {
    token:Cookies.get('token')||'token888',
    routers: syncRouter,
    addRouters: [],
    limits:[],
    navList:[],
  },
  mutations: {
    setToken(state,token){
      state.token=token;
      Cookies.set('token', token)
    },
    setAuthInfo(state,data){
        state.navList=data; //导航用
        let newRouter={
            path: '/loncom',
            name:'loncom',
            meta: { title: '首页'},
            component: () => import('@/views/home.vue'),
            redirect:'/loncom/index',
            children:[]
        }
        let theAsyncRouter = filterAsyncRouter(data);
        if(theAsyncRouter){
            newRouter.redirect=theAsyncRouter[0].path;
            newRouter.children=theAsyncRouter;
        }
        router.options.routes.push(newRouter)
        router.addRoutes([newRouter]);
        
    },
    setLimits(state,data){
      state.limits=data;
    }
    
  },
  actions: {
    setToken({ commit }, token) {
      commit('setToken', token)
    },
    //设置获取的权限信息
    setAuthInfo({commit},data){
      commit('setAuthInfo',data)
    },
    //设置功能权限
    setLimits({commit},data){
      commit('setLimits',data);
    }

  }

}

export default user
