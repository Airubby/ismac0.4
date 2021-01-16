import axios from "axios";
import { Loading,Notification } from 'element-ui'
import {router} from '@/router/index'
import store from '@/store/index'
let loadingService=null;
let service = axios.create({
	baseURL: store.getters.AjaxUrl,
	timeout: 15000 // 请求超时时间
});
// request拦截器
service.interceptors.request.use(
	config => {
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
		loadingService&&loadingService.close();
		const res = response.data;
		if(res.hasOwnProperty("err_code")&&res.err_code=="-1"){
			if(store.getters.infoFlag){
                store.dispatch('setInfoFlag',false);
                Notification.warning("请登录系统");
                router.push({path:'/login'});
            }
			return Promise.reject("请登录系统");
		}
		return response.data;
	},
	error => {
		console.log(error.response)
		loadingService&&loadingService.close();
		Notification.error('服务器错误，请联系管理人员！');
		router.push({path:'/login'});
		return error.response;
		return Promise.reject("重新登录");
		
	}
);

// export default service;
const Info={
	isLoading:true,
	lock: true,
	text:"数据加载中...",
	spinner: 'el-icon-loading',
	background: 'rgba(0, 0, 0, 0.7)'
}
export default {
	get: function (url, params={}, loadInfo) {
		let info=Object.assign({},Info,loadInfo);
		if(info.isLoading){
			loadingService=Loading.service(info)
		}
		return new Promise((resolve,reject)=>{
			service.get(url,{params:params}).then(response=>{
				resolve(response)
			}).catch(error=>{
				reject(error)
			})
		})
	},
	post: function (url, params, loadInfo) {
		let info=Object.assign({},Info,loadInfo);
		if(info.isLoading){
			loadingService=Loading.service(info)
		}
		return new Promise((resolve,reject)=>{
			service.post(url,params).then(response=>{
				resolve(response)
			}).catch(error=>{
				reject(error)
			})
		})
	},
	//post请求参数放url中
	postQuery: function (url, params, loadInfo) {
		let info=Object.assign({},Info,loadInfo);
		if(info.isLoading){
			loadingService=Loading.service(info)
		}
		return new Promise((resolve,reject)=>{
			service.post(url,null,{params:params}).then(response=>{
				resolve(response)
			}).catch(error=>{
				reject(error)
			})
		})
	},
	exportFile:function(url, params, loadInfo){
		let info=Object.assign({},Info,loadInfo);
		if(info.isLoading){
			loadingService=Loading.service(info)
		}
		return new Promise((resolve,reject)=>{
			service.post(url,params,{responseType:"blob"}).then(response=>{
				let blob=new Blob([response],{type: "application/vnd.ms-excel;charset=utf-8"});
				let link = document.createElement('a');
				link.href=window.URL.createObjectURL(blob);
				if(params.filename){
					// link.download= params.filename + ".csv";  //修改后缀
					link.download=params.filename;
				}
				document.body.appendChild(link);
				link.click();
				window.URL.revokeObjectURL(link.href); // 释放URL 对象
				document.body.removeChild(link);// 下载完成移除元素
				resolve(response)
			}).catch(error=>{
				reject(error)
			})
		})
    },
    downloadFile:function(url,params){
		let link = document.createElement('a');
        link.href=url;
        link.setAttribute("download",url);
        document.body.appendChild(link);
        link.click();
        window.URL.revokeObjectURL(link.href); // 释放URL 对象
        document.body.removeChild(link);// 下载完成移除元素
	},
	service:service
}