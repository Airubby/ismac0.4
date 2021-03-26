import Cookies from 'js-cookie'
import {router,resetRouter,asyncRouter } from '@/router/index'

const rootPath="/loncom";
const PageIndex="PageIndex";
const PageMoreIndex="PageMoreIndex";
const user = {
    // namespaced: true,  commit('app/setTempData', {}, {root: true})  //{root: true} 申明这个 mutations 不是当前模块的
    state: {
        token:Cookies.get('token')||'token888',
        config:[], //所有导航
		currentConfig:{},  //当前导航
        currentComponent:"",  //当前组件
        languageApi:[], //语言及api的路径地址
        limits:[], //功能权限
    },
    mutations: {
        SET_TOKEN(state,token){
            state.token=token;
            Cookies.set('token', token)
        },
		SET_CONFIG(state, config){
			resetRouter(); //重置初始路由
            state.config = config
            if(config&&config.length>0){
                let data=config;
                let redirect=data.length>0?`${rootPath}/`+data[0].key:`${rootPath}/401`;
                let newRouter={
                    path: rootPath,
                    name:'loncom',
                    meta: { title: '首页'},
                    component: () => import('@/views/Index.vue'),
                    redirect:redirect,
                    children:[]
                }
                //pathName是动态注入语言及api判断用的；可以把关联的组件信息注册到meta中，点击切换导航的时候就不用循环遍历对应的组件了
                if(data.length>0){
                    let arr=[];
                    for(let i=0;i<data.length;i++){
                        let children=[];
                        if(data[i].children&&data[i].children.length>0){
                            for(let j=0;j<data[i].children.length;j++){
                                children.push({
                                    path: `${rootPath}/`+data[i].key+"/"+data[i].children[j].key,
                                    name: data[i].children[j].key,
                                    //pathName;注入setLangApi的路径用的
                                    meta:{
                                        componentName:data[i].children[j].component,
                                        pathName:data[i].children[j].component,
                                        limits:data[i].children[j].limits||[],
                                        config:data[i]
                                    },
                                    component: () => import(`@/views/public/${PageIndex}.vue`),
                                })
                                if(data[i].children[j].relation&&data[i].children[j].relation.length>0){
                                    for(let m=0;m<data[i].children[j].relation.length;m++){
                                        children.push({
                                            path: `${rootPath}/`+data[i].key+"/"+data[i].children[j].key+"/"+data[i].children[j].relation[m].key,
                                            name: data[i].children[j].relation[m].key,
                                            meta:{
                                                componentName:data[i].children[j].relation[m].component,
                                                pathName:data[i].children[j].component,
                                                limits:data[i].children[j].limits||[],
                                                config:data[i]
                                            },
                                            component: () => import(`@/views/public/${PageIndex}.vue`),
                                        })
                                    }
                                }
                            }
                        }
                        if(children.length>0){
                            arr.push({
                                path: `${rootPath}/`+data[i].key,
                                name: data[i].key,
                                meta:{
                                    componentName:data[i].component,
                                    pathName:data[i].component,
                                    limits:data[i].limits||[],
                                    config:data[i]
                                },
                                component: () => import(`@/views/public/${PageMoreIndex}.vue`),
                                redirect:children[0].path,
                                children:children
                            });
                        }else{
                            arr.push({
                                path: `${rootPath}/`+data[i].key,
                                name: data[i].key,
                                meta:{
                                    componentName:data[i].component,
                                    pathName:data[i].component,
                                    limits:data[i].limits||[],
                                    config:data[i]
                                },
                                component: () => import(`@/views/public/${PageIndex}.vue`),
                            });
                            if(data[i].relation&&data[i].relation.length>0){
                                for(let m=0;m<data[i].relation.length;m++){
                                    arr.push({
                                        path: `${rootPath}/`+data[i].key+"/"+data[i].relation[m].key,
                                        name: data[i].relation[m].key,
                                        meta:{
                                            componentName:data[i].relation[m].component,
                                            pathName:data[i].component,
                                            limits:data[i].limits||[],
                                            config:data[i]
                                        },
                                        component: () => import(`@/views/public/${PageIndex}.vue`),
                                    })
                                }
                            }
                        }
                        
                    }
                    // newRouter.children=arr.concat(asyncRouter);
                    newRouter.children=arr;
                }
                router.addRoutes([newRouter]);
            }
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
        setToken({ commit }, token) {
            commit('SET_TOKEN', token)
        },
        setConfig({ commit }, config) {
            return new Promise((resolve,reject)=>{
                commit('SET_CONFIG', config)
                resolve(true)
            })
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
    }

}

export default user
