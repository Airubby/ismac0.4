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
import {Encrypt,Decrypt} from '@/utils/AEScrypt'
export default {
	created () {
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
					this.$message.error(r.err_msg);
				}
			})
		},
		
	},
	watch:{
			
	},
}
</script>

<style scoped lang="less">
	.module-theme(...){
        .content{
            width: 100%;
            height: 100%;
            position: relative;
            background: #141835;
        }
        .loncom_login {
            width: 100%;
            height: 220px;
            background: #1C2340 url(@loginBg) no-repeat right bottom;
            position: absolute;
            top: 50%;
            margin-top: -110px;
        }
        
        .loncom_login_con {
            width: 350px;
            height: 420px;
            position: absolute;
            left: 50%;
            top: 50%;
            margin-left: -175px;
            margin-top: -210px;
            background: #272D4A;
            padding: 20px 25px;
            border-top: 10px solid #1C2340;
        }
        
        .loncom_login_con .loncom_logo_img {
            height: 60px;
            margin: 0 auto;
            background: url(@loginLogo) no-repeat center center;
            background-size: contain;
        }
        
        .loncom_login_con .loncom_logo_text {
            text-align: center;
            font-style: normal;
            font-size: 24px;
            color: #4A78FF;
            font-weight: bold;
            margin: 20px 0;
        }
        
    }
</style>