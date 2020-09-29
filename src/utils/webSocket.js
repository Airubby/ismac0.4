import Vue from 'vue'
import store from '@/store/index'
export default {
	created () {
		this.init();
    },
	data() {
        return {
			//"ws://echo.websocket.org"
			wsAddress:null,
			sendMsg:null,
			ws:null,
       }
	},
	methods:{
		init(){
			let wscon=this.$webSocket;
			let website=wscon.website,port=wscon.port?wscon.port:80,postfix=wscon.postfix,wsLink=window.document.location.protocol=="http:"?"WS":"WSS";
			if(wscon.website==""||wscon.website=="127.0.0.1"||wscon.website=="localhost"){
				website=window.document.location.hostname;
			}
			this.wsAddress=wsLink+"://"+website+":"+port+postfix;
			this.wsConnection();
		},
		//0正在连接；1连接成功可以通信；2连接正在关闭；3连接关闭或连接失败
		wsConnection() {
			let _this=this;
			this.ws&&this.ws.close();
			try {
				this.ws = new WebSocket(this.wsAddress);
				this.ws.onopen = function (event) {
					_this.onopenWS(event)
				};
				this.ws.onmessage = function(event){
					_this.onmessageWS(event)
				};
				this.ws.onclose = function (event) {
					_this.oncloseWS(event)
				};
				this.ws.onerror = function(event){
					_this.onerrorWS(event)
				};
				Vue.prototype.$ws=this.ws;
			} catch (ex) {
				console.log(ex);
			}
		},
		onopenWS:function(event){
			console.log("创建连接成功！");
			if(this.sendMsg!=""&&this.sendMsg!=null){
				ws.send(sendMsg);
			}
		},
		onmessageWS:function(result){
			console.log("返回数据操作！")
			store.dispatch('setwsData',JSON.parse(result.data));
		},
		oncloseWS:function(event){
			console.log("连接关闭！")
			if(this.ws&&this.ws.readyState!==2){
				this.ws=null;
				this.wsConnection();
			}
		},
		onerrorWS:function(event){
			console.log("连接异常！")
			if(this.ws&&this.ws.readyState!==3){
				this.ws=null;
				this.wsConnection();
			}
		}
	},
	destroyed() {
		this.ws&&this.ws.close();
		this.ws=null;
		Vue.prototype.$ws=this.ws;
    },
}