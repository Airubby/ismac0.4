import {router} from '@/router/index'
import { Message } from 'element-ui'
import store from '@/store/index'
// import NProgress from 'nprogress' // Progress 进度条
// import 'nprogress/nprogress.css'// Progress 进度条样式
import { Loading } from 'element-ui'
import request from './utils/request'
import {Decrypt} from './utils/AEScrypt'

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
        console.log(Decrypt(sessionStorage.roleid))
        request.get('/getLimit',{"roleid":Decrypt(sessionStorage.roleid)},res=>{
            if(res.err_code=="0"){
                if(res.data.length>0){
                    store.dispatch('setAuthInfo',res.data);
                    //在导航菜单更新功能权限；
                }else{
                    console.log("没有任何权限，跳转到没有任何权限的页面")
                    router.push({path:'/login'});
                }
            }else{
                Message.warning("权限获取失败");
            }
            resolve()
        })
    })
}

async function routerGo(){
    if(sessionStorage.roleid){
        await getInfo();
    }
    router.beforeEach((to, from, next) => {
        // NProgress.start()
        const whiteList = ['/login','/401','/404','/bigHome','/test'] // 不重定向白名单
        // let token=store.getters.token;
        if(sessionStorage.roleid){
            if (to.path!=="/"&&whiteList.indexOf(to.path) !== -1) {
                next()
            } else {
                console.log(to)
                console.log(from)
                if(JSON.stringify(to.meta)!="{}"){
                    if(to.meta.show&&to.meta.show=="true"){
                        //在导航菜单更新功能权限；不清楚为什么有时不进入路由钩子函数
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
        // let title=to.meta.title?`${to.meta.title}`:'小微产品0.4';
        // window.document.title = title;
        // NProgress.done() // 结束Progress
    })
}

