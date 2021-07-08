import {router} from '@/router/index'
import { Message } from 'element-ui'
import store from '@/store/index'
import { getToken } from '@/utils/auth' // get token from cookie

routerGo()
function getInfo(){  //刷新页面重新获取权限
    return new Promise(async function(resolve, reject){
        store.dispatch("setPageLoading",true)
        const hasToken = getToken()
        if(hasToken){
            try {
                // get user info
                const accessRoutes = await store.dispatch('getLimitInfo')
                console.log(accessRoutes)
                if(accessRoutes.length<=0){
                    await store.dispatch('resetToken')
                    router.replace({ path: '/login?redirect=/'})
                }
            } catch (error) {
                // remove token and go to login page to re-login
                await store.dispatch('resetToken')
                Message.error(error || 'Has Error')
                router.replace({ path: router.currentRoute.path})
            }
        }else{
            router.push({ path: '/login?redirect=/'})
        }
        store.dispatch("setPageLoading",false)
        resolve()
    })
}

async function routerGo(){
    
    await getInfo();
    const whiteList = ['/login','/lib'] // no redirect whitelist
    
    router.beforeEach(async (to, from, next) => {
        store.dispatch("setPageLoading",true)
        const hasToken = getToken()
        if(to.path=="/lib"){
          next();
        }
        if (hasToken) {
            console.log('hastoken')
            if (to.path === '/login') {
                // if is logged in, redirect to the home page
                next({ path: '/' })
            } else {
                const permission = store.getters.permission_routes && store.getters.permission_routes.length > 0
                if(permission){
                    store.dispatch("setCurrentConfig",to.meta.config)
                    next()
                }else{
                    try {
                        // get user info
                        const accessRoutes = await store.dispatch('getLimitInfo')
                        console.log(accessRoutes)
                        if(accessRoutes&&accessRoutes.length>0){
                            next({ ...to, replace: true })
                        }else{
                            await store.dispatch('resetToken')
                            Message.error('此账号没有任何权限')
                            next({ path:`/login?redirect=${to.path}`, replace: true })
                        }
                    } catch (error) {
                        // remove token and go to login page to re-login
                        await store.dispatch('resetToken')
                        Message.error(error || 'Has Error')
                        next(`/login?redirect=${to.path}`)
                    }
                    store.dispatch("setPageLoading",false)
                }
                
            }
        } else {
            /* has no token*/
            if (whiteList.indexOf(to.path) !== -1) {
                // in the free login whitelist, go directly
                next()
            } else {
                // other pages that do not have permission to access are redirected to the login page.
                next(`/login?redirect=${to.path}`)
                store.dispatch("setPageLoading",false)
            }
        }
    })

    router.afterEach(() => {
        // finish progress bar
        store.dispatch("setPageLoading",false)
    })
}


