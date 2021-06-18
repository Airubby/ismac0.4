import Request from '@/utils/Request'
import {router,resetRouter,asyncRouter } from '@/router/index'
import { getToken, setToken, removeToken } from '@/utils/auth'

export function filterAsyncRoutes(routes,config) {
    //接口数据处理
    const res = [],routePath="/router"

    routes.forEach(route => {
        let path="/pages/"+route.component+"/Index"
        let tmp={
            path: route.key,
            component: () => import(/* webpackChunkName: "[request]" */ `@/views${path}`),
            name: route.key,
            meta: { componentName:route.component,title: route.title, icon: route.iconfont,limits:route.limits||[],config:config }
        }

        if(route.children&&route.children.length>0){
            tmp.component=() => import(/* webpackChunkName: "[request]" */ `@/views${routePath}/index`),
            tmp.redirect=route.key+"/"+route.children[0].key;
            tmp.children=filterAsyncRoutes(route.children,config||route);
        }
        
        res.push(tmp);

        if(route.relation&&route.relation.length>0){
            route.relation.forEach(element => {
                let repath="/pages/"+route.component+"/"+element.component
                tmp={
                    path: route.key+"/"+element.key,
                    component: () => import(/* webpackChunkName: "[request]" */ `@/views${repath}`),
                    name: element.key,
                    meta: { componentName:element.component,title: route.title, icon: route.iconfont,limits:route.limits||[],config:config }
                }
                res.push(tmp)
            });
        }
    })

    return res
    
}

const user = {
    // namespaced: true,  commit('app/setTempData', {}, {root: true})  //{root: true} 申明这个 mutations 不是当前模块的
    state: {
        token:getToken(),
        routes:[], //权限路由
        config:[], //所有导航
		currentConfig:{},  //当前导航
        currentComponent:"",  //当前组件
        languageApi:[], //语言及api的路径地址
        limits:[], //功能权限
    },
    mutations: {
        SET_ROUTES: (state, routes) => {
            state.routes=routes;
        },
        SET_TOKEN(state,token){
            state.token=token;
        },
		SET_CONFIG(state, config){
			state.config=config;
		},
		SET_CURRENTCONFIG(state,currentConfig){
			state.currentConfig=currentConfig
		},
		SET_CURRENTCOMPONENT(state,currentComponent){
			state.currentComponent=currentComponent
        },
        SET_LANGUAGEAPI(state,info){
            state.languageApi=info
        },
        SET_LIMITS(state,limits){
            state.limits=limits
        },
    },
    actions: {
        setRoutes({ commit }, routes) {
            commit('SET_ROUTES', routes)
        },
        setToken({ commit }, token) {
            return new Promise(resolve => {
                setToken(token)
                commit('SET_TOKEN', token)
                resolve()
            })
        },
        resetToken({ commit }) {
            return new Promise(resolve => {
                commit('SET_TOKEN', '')
                commit('SET_ROUTES', [])
                removeToken()
                resolve()
            })
        },
        logout({ commit, state, dispatch }) {
            return new Promise((resolve, reject) => {
                resetRouter(); //重置初始路由
                //这个地方退出登录
                // Request.post('/logout',{token:state.token}).then(() => {
                //     dispatch('resetToken')
                //     resolve()
                // }).catch(error => {
                //     reject(error)
                // })
                dispatch('resetToken')
                resolve()
            })
        },
        setConfig({ commit }, config) {
            commit('SET_CONFIG', config)
		},
		setCurrentConfig({ commit }, currentConfig){
			commit('SET_CURRENTCONFIG', currentConfig)
		},
		setCurrentComponent({ commit }, currentComponent){
			commit('SET_CURRENTCOMPONENT', currentComponent)
        },
        setLanguageApi({commit},info){
            commit('SET_LANGUAGEAPI',info);
        },
        setLimits({commit},limits){
            commit('SET_LIMITS',limits);
        },
        getLimitInfo({commit,state }){
            return new Promise(resolve => {
        //         let res=[
        //         {
        //         "key": "rack",
        //         "component": "Rack",
        //         "iconfont": "icon-rack",
        //         "language": "Rack",
        //         "children":[
        //             {
        //                 "key": "dataOverview",
        //                 "component": "DataOverview",
        //                 "iconfont": "",
        //                 "language": "DataOverview"
        //             },
        //             {
        //                 "key": "rackInfo",
        //                 "component": "RackInfo",
        //                 "iconfont": "",
        //                 "language": "RackInfo"
        //             },
        //             {
        //                 "key": "inAssets",
        //                 "component": "InAssets",
        //                 "iconfont": "",
        //                 "language": "InAssets"
        //             },
        //             {
        //                 "key": "logInfo",
        //                 "component": "LogInfo",
        //                 "iconfont": "",
        //                 "language": "LogInfo"
        //             },
        //         ]
        //     },
        //     {
        //         "key": "system",
        //         "component": "System",
        //         "iconfont": "icon-system",
        //         "language": "System",
        //         "children":[
        //             {
        //                 "key": "user",
        //                 "component": "User",
        //                 "iconfont": "",
        //                 "language": "User"
        //             },
        //             {
        //                 "key": "role",
        //                 "component": "Role",
        //                 "iconfont": "",
        //                 "language": "Role"
        //             },
        //             {
        //                 "key": "messageNotification",
        //                 "component": "MessageNotification",
        //                 "iconfont": "",
        //                 "language": "MessageNotification"
        //             },
        //             {
        //                 "key": "log",
        //                 "component": "Log",
        //                 "iconfont": "",
        //                 "language": "Log"
        //             },
        //         ]
        //     }
        // ]
        //         let accessedRoutes=res
        //         if(accessedRoutes&&accessedRoutes.length>0){
        //             commit('SET_CONFIG', accessedRoutes)
        //             let newRouter={
        //                 path: '/',
        //                 name:'layout',
        //                 meta: { title: '首页'},
        //                 component: () => import(/* webpackChunkName: "public-layout", webpackPrefetch: true */ '@/views/Index'),
        //                 redirect:'',
        //                 children:[]
        //             }
        //             let theAsyncRouter = filterAsyncRoutes(accessedRoutes,null);
        //             console.log(theAsyncRouter)

        //             if(theAsyncRouter){
        //                 newRouter.redirect=theAsyncRouter[0].path;
        //                 newRouter.children=[{
        //                     path: '/redirect/:path(.*)',
        //                     name:'redirect',
        //                     component: () => import(/* webpackChunkName: "public-redirect", webpackPrefetch: true */ '@/views/redirect/index'),
        //                     hidden: true,
        //                 }].concat(theAsyncRouter);
        //             }
        //             router.addRoutes([newRouter,{ path: '*', redirect: '/404', hidden: true }]);
        //             commit('SET_ROUTES', theAsyncRouter)
        //         }
        //         resolve(accessedRoutes)
                
                Request.get('/getMockData',{token:state.token}).then(res => {
                    console.log(res)
                    let accessedRoutes=res.data?res.data:[]
                    if(accessedRoutes&&accessedRoutes.length>0){
                        commit('SET_CONFIG', accessedRoutes)
                        let newRouter={
                            path: '/',
                            name:'layout',
                            meta: { title: '首页'},
                            component: () => import(/* webpackChunkName: "public-layout", webpackPrefetch: true */ '@/views/Index'),
                            redirect:'',
                            children:[]
                        }
                        let theAsyncRouter = filterAsyncRoutes(accessedRoutes,null);
                        console.log(theAsyncRouter)
    
                        if(theAsyncRouter){
                            newRouter.redirect=theAsyncRouter[0].path;
                            newRouter.children=[{
                                path: '/redirect/:path(.*)',
                                name:'redirect',
                                component: () => import(/* webpackChunkName: "public-redirect", webpackPrefetch: true */ '@/views/redirect/index'),
                                hidden: true,
                            }].concat(theAsyncRouter);
                        }
                        router.addRoutes([newRouter,{ path: '*', redirect: '/404', hidden: true }]);
                        commit('SET_ROUTES', theAsyncRouter)
                    }
                    resolve(accessedRoutes)
                }).catch(error => {
                    console.log('异常')
                    resolve([])
                })
            })
        },
    }

}

export default user
