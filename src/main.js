import Vue from 'vue'
import App from './App.vue'
import {router} from './router/index'
import store from './store/index'

import axios from 'axios'
import request from './utils/request'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import ElSearchTablePagination from 'el-table-pagination'
import Swiper from 'swiper'  //3.4.2 打包不报错，4.+打包报错
import 'swiper/dist/css/swiper.min.css'
import './utils/filters' // 自定义过滤器
import tool from './utils/tool'  //工具函数
import 'promise-polyfill'  //兼容低版本浏览器  
import 'babel-polyfill'
// import i18n from './lang'  //国际化，用下面的做在配置文件中，打包后可修改
import VueI18n from 'vue-i18n'
import Cookies from 'js-cookie'
import elementEnLocale from 'element-ui/lib/locale/lang/en' // element-ui lang
import elementZhLocale from 'element-ui/lib/locale/lang/zh-CN'// element-ui lang


import './utils/directive'  //自定义指令

// import './utils/mock.js'  //测试接口

import 'vue-transition.css'

import './assets/css/index.less'


import VueVideoPlayer from 'vue-video-player'
import 'video.js/dist/video-js.css'
import 'vue-video-player/src/custom-theme.css'
import 'videojs-flash'
import 'videojs-contrib-hls/dist/videojs-contrib-hls'
Vue.use(VueVideoPlayer)

import breadcrumb from './components/Breadcrumb'
Vue.use(breadcrumb)

// // 将API方法绑定到全局
// Vue.prototype.$api = api
Vue.prototype.$r=request

//绑定工具函数到全局
Vue.prototype.$tool = tool
Vue.prototype.$store = store

Vue.prototype.publicPath=process.env.BASE_URL

Vue.prototype.$Swiper = Swiper 

Vue.use(ElSearchTablePagination)

Vue.config.productionTip = false
let i18n=''
function getServerConfig() {
  return new Promise ((resolve, reject) => {
    axios.get('./serverConfig.json').then((result) => {
      let config = result.data;
      let ajaxUrl = process.env.NODE_ENV == 'production' ? config.production:config.develop;
      Vue.prototype.$ajaxUrl=ajaxUrl;
      Vue.prototype.$wsAddr=config.wsAddr;
      store.dispatch('setAjaxUrl',ajaxUrl);
      store.dispatch('setLanguage',config.language);
      Vue.prototype.$theme = sessionStorage.getItem("theme") || config.theme || 'default';

      require('@/permission')

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
