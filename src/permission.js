import {router} from '@/router/index'
import { Message } from 'element-ui'
import store from '@/store/index'
import Request from './utils/Request'
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
        Request.get('/getMockData',{"roleid":Decrypt(sessionStorage.roleid)}).then(res=>{
            console.log(res)
            if(res.data.length>0){
                store.dispatch("setConfig",res.data)
            }else{
                router.push({path:'/login'});
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
        console.log("before!!!!!!!!!!!!!!!!!!!!!!")
        const whiteList = ['/login','/test','/bigScreen','/401','/404'] // 不重定向白名单
        // let token=store.getters.token;
        if(sessionStorage.roleid){
            if (to.path!=="/"&&whiteList.indexOf(to.path) !== -1) {
                next()
            } else {
                if(JSON.stringify(to.meta)!="{}"){
                    next()
                }else{
                    next('/404') 
                    console.log("访问的页面不存在")
                }
            }
        }else{
            if (to.path!=="/"&&whiteList.indexOf(to.path) !== -1) {
                next()
            } else {
                next('/bigScreen')
            }
        }
    
    })
    
    router.afterEach((to,from) => {
        // let title=to.meta.title?`${to.meta.title}`:'小微产品0.4';
        // window.document.title = title;
        // NProgress.done() // 结束Progress
    })
}

