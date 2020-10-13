import Vue from 'vue'
import ElementUI from 'element-ui'
import axios from 'axios'
import App from '@/App.vue'
import {router} from '@/router/index'
import store from '@/store/index'
import request from '@/utils/request'

import 'element-ui/lib/theme-chalk/index.css'
import ElTablePagination from 'el-table-pagination'
import tool from '@/utils/tool'  //工具函数
import 'promise-polyfill'  //兼容低版本浏览器  
import 'babel-polyfill' //兼容低版本浏览器  
// import i18n from '@/lang'  //国际化，用下面的做在配置文件中，打包后可修改
import VueI18n from 'vue-i18n'
import Cookies from 'js-cookie'
import elementEnLocale from 'element-ui/lib/locale/lang/en' // element-ui lang
import elementZhLocale from 'element-ui/lib/locale/lang/zh-CN'// element-ui lang

import '@/utils/directive'  //自定义指令

// 将API方法绑定到全局
Vue.prototype.$api = request

//绑定工具函数到全局
Vue.prototype.$tool = tool
Vue.prototype.$store = store
Vue.prototype.$axios = axios

Vue.prototype.publicPath=process.env.BASE_URL

Vue.use(ElTablePagination)

Vue.config.productionTip = false
let i18n='';
function getServerConfig() {
    return new Promise ((resolve, reject) => {
        axios.get('/serverConfig.json').then((result) => {
        console.log(result)
        let config = result.data;
        let reqcon=config.reqConnection;
        let website=reqcon.website,port=reqcon.port?reqcon.port:"",postfix=reqcon.postfix;
        if(reqcon.website==""||reqcon.website.indexOf("127.0.0.1")!=-1||reqcon.website.indexOf("localhost")!=-1){
            website=window.document.location.origin;
        }
        let ajaxUrl=website+(port?(":"+port):"")+postfix;
        Vue.prototype.$ajaxUrl=ajaxUrl;
        Vue.prototype.$webSocket=config.webSocket;
        store.dispatch('setAjaxUrl',ajaxUrl);
        store.dispatch('setLanguage',Cookies.get('language') || config.language);
        Vue.prototype.$theme = sessionStorage.getItem("theme") || config.theme || 'default';
        const enLocale=config.enLang
        const zhLocale=config.zhLang
        Vue.use(VueI18n)
        const messages = {
            en: {
            ...enLocale,
            ...elementEnLocale
            },
            zh: {
            ...zhLocale,
            ...elementZhLocale
            }
        }
        i18n = new VueI18n({
            locale: Cookies.get('language') || config.language, // set locale
            messages // set locale messages
        })
        Vue.use(ElementUI,{
            size: 'small', // set element-ui default size
            i18n: (key, value) => i18n.t(key, value)
        })
        if(config.mock){
            require('@/utils/mock.js')
        }
        resolve();
        }).catch((error) => {
            console.log(error)
            reject()
        })
    })
}

async function init() {
    await getServerConfig();
    new Vue({
        router,
        store,
        i18n,
        render: h => h(App),
    }).$mount('#app')
}
init();
