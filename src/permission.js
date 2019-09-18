import {router} from '@/router/index'
import { Message } from 'element-ui'
import store from '@/store/index'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
import request from './utils/request'
import tool from './utils/tool'
import './utils/mock.js'  //测试接口 

routerGo();
function filterAsyncRouter(url, roles) {
    roles.forEach(element => {
        if(url==element.path){
            store.dispatch('setLimits',element.meta.limits.split(","));
            return;
        }
        if(element.children&&element.children.length>0){
            filterAsyncRouter(url,element.children);
        }
    });
}
function getInfo(){  //刷新页面重新获取权限
    return new Promise(function(resolve, reject){
        request.get('/getInfo',{"roleid":tool.Encrypt(sessionStorage.userid)},res=>{
            if(res.err_code=="0"){
                if(res.data.length>0){
                    store.dispatch('setAuthInfo',res.data);
                    let url=window.document.URL.split("#")[1];
                    filterAsyncRouter(url,res.data);
                }else{
                    console.log("没有任何权限，跳转到没有任何权限的页面")
                    router.push({path:'/login'});
                }
            }else{
                Message.warning("权限获取失败");
            }
            resolve()
        }).catch(error => {
            reject(error)
        })
    })
}

async function routerGo(){
    if(sessionStorage.userid){
        await getInfo();
    }
    router.beforeEach((to, from, next) => {
        NProgress.start()
        const whiteList = ['/login','/401','/404','/bigHome'] // 不重定向白名单
        // let token=store.getters.token;
        if(sessionStorage.userid){
            if (to.path!=="/"&&whiteList.indexOf(to.path) !== -1) {
                next()
            } else {
                if(JSON.stringify(to.meta)!="{}"){
                    if(to.meta.show&&to.meta.show=="true"){
                        if(to.meta.limits&&to.meta.limits!=""){
                            store.dispatch('setLimits',to.meta.limits.split(","));
                        }
                        next() 
                    }else{
                        next('/401') 
                        console.log("没有权限访问")
                    }
                }else{
                    next('/404') 
                    console.log("访问的页面不存在")
                }
            }
            
        }else{
            if (to.path!=="/"&&whiteList.indexOf(to.path) !== -1) {
                next()
            } else {
                next('/login')
            }
        }
    
    })
    
    router.afterEach((to,from) => {
        let title=to.meta.title?`${to.meta.title}`:'小微产品0.4';
        window.document.title = title;
        NProgress.done() // 结束Progress
    })
}

