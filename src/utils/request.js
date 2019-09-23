import axios from "axios";
import Qs from "querystring";
import { Message } from 'element-ui'
import {router} from '@/router/index'
import store from '@/store/index'
let service = axios.create({
  // baseURL: 'http://www.javasoft.top:9090/service',
  baseURL: store.getters.AjaxUrl,
  timeout: 5000 // 请求超时时间
});
// console.log(service)
// 自定义判断元素类型JS
function toType (obj) {
  return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
}
// 参数过滤函数
function filterNull (o) {
  for (var key in o) {
    if (o[key] === null) {
        delete o[key]
    }
    if(typeof o[key] === "string"){
        o[key] = o[key].trim()
    }else if(typeof o[key] === "object"){  //数组和对象typeof都为object
        o[key]=JSON.stringify(o[key]);
    }
    // if (toType(o[key]) === 'string') {
    //   o[key] = o[key].trim()
    // } else if (toType(o[key]) === 'object') {
    //   o[key]=JSON.stringify(o[key]);
    // } else if (toType(o[key]) === 'array') {
    //   o[key]=JSON.stringify(o[key]);
    // }
  }
  return o
}
// request拦截器
service.interceptors.request.use(
  config => {
    // 让每个请求携带自定义token 请根据实际情况自行修改
    if(config.method=="post"){
      config.data=Qs.stringify(filterNull(Object.assign({},config.data)))
      config.headers['Content-Type']='application/x-www-form-urlencoded';
    }
    if(config.method=="get"){
      config.params=filterNull(Object.assign({},config.params))
    }
    if (store.getters.token) {
      config.headers['X-Token'] =store.getters.token // 让每个请求携带token--['X-Token']为自定义key 请根据实际情况自行修改
    }
    return config;
  },
  error => {
    // Do something with request error
    return Promise.reject(error);
  }
);

// respone拦截器
service.interceptors.response.use(
  response => {
    /**
     * code为非200/900是抛错 可结合自己业务进行修改
     */
    
    const res = response.data;
    if(res.data.err_code=="-1"&&sessionStorage.loginInfo){
        Message.warning("请登录系统");
        router.push({path:'/login'});
        sessionStorage.removeItem('loginInfo');
    }
    if(res.data.err_code!="-1"){
      return response.data;
    }
    // if (res.code == 200 || res.code == 900 || !res.code) {
    //   return response.data;
    // } else {
    //   let errorMsg = "抱歉，出错啦~~~";
    //   if (res.code === 10003) {
    //     errorMsg = "长时间未登录，请重新登陆！";
    //     location.reload()
    //   }

    //   Message.error(errorMsg);
    //   return Promise.reject("error");
    // }
  },
  error => {
    console.log("err" + error); // for debug
    Message.error('服务器错误，请联系管理人员！');
    router.push({path:'/login'});
    return Promise.reject("重新登录");
  }
);

// export default service;
export default {
  get: function (url, params, response) {
    return service.get(url,{params:params}).then(res=>{
      if(response){
        response(res);
      }
    })
  },
  post: function (url, params, response) {
    return service.post(url,params).then(res=>{
      if(response){
        response(res);
      }
    })
  },
  service:service
}