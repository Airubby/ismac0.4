<template>
	<div class="content">
		<div class="loncom_login">
			<div class="loncom_login_con loncom_public_shadow">
				<div class="loncom_logo_img"></div>
				<div class="loncom_logo_text">小微产品0.4</div>
				<div class="loncom_login_input">
					<el-form :model="user" :rules="rules" ref="form" status-icon>
						<el-form-item prop="userid" class="loncom_user">
							<el-input v-model.trim="user.userid" placeholder="请输入账号" ref="customerInput"></el-input>
						</el-form-item>
						<el-form-item prop="psword" class="loncom_pass">
							<el-input type="password" v-model.trim="user.psword" ref="psinput" placeholder="请输入密码" @keyup.native="keyLogin($event,'userName')"></el-input>
						</el-form-item>
						<el-button type="primary" @click="loginIn()" @keydown="keyLogin($event)">登录</el-button>
					</el-form>
				</div>
			</div>
        </div>
    </div>
</template>

<script>
import request from '@/utils/request'
import {Encrypt,Decrypt} from '@/utils/AEScrypt'
export default {
	created () {
		this.$store.dispatch('setInfoFlag',true);
		//可以动态设置接口信息，根据不同的接口从不同的服务器上啦数据
		request.service.defaults.baseURL=this.$store.getters.AjaxUrl;  //初始化的时候配置文件中的请求前缀还没写入request的baseURL中的
  	},
	mounted() {
		this.$nextTick(function () {
			//设置第一个input框聚焦
			this.$refs.customerInput.$el.querySelector('input').focus();
		});
    },
	data(){
		let checkpassword = (rule, value, callback) => {
			if (value === '') {
				this.user.psword="";
				this.$nextTick(() => {
					callback(new Error('请输入密码'));
				})
			} else {
				callback();
			}
		};
		return {
			user:{
				userid:"",
				psword:""
			},
			rules: {
				userid:[
					{ required: true, message: '请输入账号', trigger: 'blur' },
				],
				psword:[
					{ required: true,  trigger: 'blur' ,validator:checkpassword},
				]
			}
		}
	},
	methods:{
		
		keyLogin:function(ev){
			if(ev.keyCode == 13){
				this.loginIn();
			}
		},
		loginIn:function(){
			this.$refs['form'].validate((valid) => {
				if(valid){
					let a="tKb634uLRuFdugF0P01eKw=="
					console.log(Decrypt(a))
					this.user.psword=Encrypt(this.user.psword);
					this.$api.post("/login",this.user,{text:"登录信息提交中..."}).then(res=>{
						console.log(res)
						this.$message.success(res.msg);
						sessionStorage.roleid=Encrypt(res.data.roleid);  //刷新页面的时候用userid获取权限问题；
						this.getLimit(res.data.roleid)  //获取权限
						sessionStorage.loginInfo= JSON.stringify(res.data);
					})
					// this.$r.post('/login', this.user, r => {
					// 	console.log(r);
					// 	this.$message.success(r.msg);
					// 	sessionStorage.roleid=Encrypt(r.data.roleid);  //刷新页面的时候用userid获取权限问题；
					// 	this.getLimit(r.data.roleid)  //获取权限
					// 	sessionStorage.loginInfo= JSON.stringify(r.data);
					// 	// var date=new Date();
					// 	// var expiresDays=10;
					// 	// //将date设置为10天以后的时间
					// 	// date.setTime(date.getTime()+expiresDays*24*3600*1000);
					// 	// //将userId和userName两个cookie设置为10天后过期
					// 	// document.cookie=" userid="+this.user.userid+"; expires="+date.toGMTString();
					// 	// this.$router.push({path:'/'});
					// 	// if(r.err_code=="0"){
							
					// 	// }else{
					// 	// 	this.$refs.psinput.focus();
					// 	// 	this.$message.error(r.err_msg);
					// 	// }
					// });
				}
			});
		},
		filterAsyncRouter:function(url, roles) {
			roles.forEach(element => {
				if(url==element.path){
					this.$store.dispatch('setLimits',element.meta.limits.split(","));
					return;
				}
				if(element.children&&element.children.length>0){
					this.filterAsyncRouter(url,element.children);
				}
			});
		},
		getLimit:function(id){
			this.$api.get("/getLimit",{roleid:id},{text:"权限信息获取中...",isLoading:false}).then(res=>{
				if(res.err_code=="0"){
					if(res.data.length>0){
						this.$store.dispatch('setAuthInfo',res.data);
						this.$router.push({path:'/loncom'});
					}else{
						console.log("没有任何权限，跳转到没有任何权限的页面")
						this.$router.push({name:'login'});
						//query中用一个params做key值，这样刷新的时候才能解析到
						// this.$router.push({name:'login',query:{params:JSON.stringify({"id":"123",name:'小呆'})}});
						// this.$router.push({path:'/login',query:{params:JSON.stringify({"id":"123",name:'小呆'})}});
						//let params = JSON.parse(this.$route.query.params);
					}
				}else{
					this.$message.error("错错错");
				}
			})
			// this.$r.get('/getLimit', {roleid:id}, r => {
			// 	console.log(r);
			// 	if(r.err_code=="0"){
			// 		if(r.data.length>0){
			// 			this.$store.dispatch('setAuthInfo',r.data);
			// 			this.$router.push({path:'/loncom'});
			// 		}else{
			// 			console.log("没有任何权限，跳转到没有任何权限的页面")
			// 			this.$router.push({path:'/login'});
			// 		}
			// 	}else{
			// 		this.$message.error(r.err_msg);
			// 	}
			// });
		},
		
	},
	watch:{
			
	},
}
</script>

<style scoped lang="less">
	@import "~@/assets/css/login.less";
</style>