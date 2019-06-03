import Vue from 'vue'
import App from './App.vue'
import {router} from './router/index'
import store from './store/index'
import axios from 'axios'
import request from './utils/request';
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import ElSearchTablePagination from 'el-table-pagination'
import Swiper from 'swiper'  //3.4.2 打包不报错，4.+打包报错
import 'swiper/dist/css/swiper.min.css'
import './utils/filters' // 自定义过滤器
import tool from './utils/tool'  //工具函数
// import 'promise-polyfill'  //兼容低版本浏览器   import 'babel-polyfill'
import i18n from './lang'  //国际化
import './utils/directive'  //自定义指令

import './utils/mock.js'  //测试接口

import 'vue-transition.css'

import './assets/css/index.less'

// // 将API方法绑定到全局
// Vue.prototype.$api = api
Vue.prototype.$r=request

//绑定工具函数到全局
Vue.prototype.$tool = tool

Vue.prototype.$Swiper = Swiper 
Vue.use(ElementUI,{
  size: 'small', // set element-ui default size
  i18n: (key, value) => i18n.t(key, value)
})
Vue.use(ElSearchTablePagination)

Vue.config.productionTip = false

function getServerConfig() {
  return new Promise ((resolve, reject) => {
    axios.get('./serverConfig.json').then((result) => {
      let config = result.data;
      let ajaxUrl = process.env.NODE_ENV == 'production' ? config.production:config.develop;
      Vue.prototype.$ajaxUrl=ajaxUrl;
      store.dispatch('setAjaxUrl',ajaxUrl);
      Vue.prototype.$theme = config.theme || 'default';
      resolve();
    }).catch((error) => {
      console.log(error)
      reject()
    })
  })
}

import '@/permission' 
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
