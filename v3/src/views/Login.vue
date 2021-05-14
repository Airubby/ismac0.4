<template>
	<div class="content">
		<div class="loncom_login">
			<div class="loncom_login_con loncom_public_shadow">
				<div class="loncom_logo_img"></div>
				<div class="loncom_logo_text">小微产品0.4</div>
				<div class="loncom_login_input">
					<el-form :model="user" :rules="rules" ref="form" status-icon>
						<el-form-item prop="userid" class="loncom_user">
							<el-input v-model.trim="user.userid" size="large" placeholder="请输入账号" ref="customerInput">
                                <i slot="prefix" class="icon-user"></i>
                            </el-input>
						</el-form-item>
						<el-form-item prop="psword" class="loncom_pass">
							<el-input type="password" size="large" v-model.trim="user.psword" ref="psinput" placeholder="请输入密码" @keyup.native="keyLogin($event,'userName')">
                                <i slot="prefix" class="icon-password"></i>
                            </el-input>
						</el-form-item>
						<el-button type="primary" size="large" class="btn" plain @click="loginIn()" @keydown="keyLogin($event)">登录</el-button>
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
				userid:"admin",
				psword:"admin"
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
            // this.$api.post("/getMockData",this.user,{text:"登录信息提交中..."}).then(res=>{
            //     console.log(res)
            //     sessionStorage.roleid=Encrypt("roleid");
            //     this.$store.dispatch("setConfig",res.data).then(result=>{
            //         console.log(result)
            //         this.$router.push({path:'/loncom'});
            //     })
            // })
			this.$refs['form'].validate((valid) => {
				if(valid){
					this.$store.dispatch('setToken',this.user.userid).then(res=>{
                        console.log("!!!!!!!!!!!!!!!!!!",this.redirect,this.otherQuery)
                        this.$router.push({
                            path: this.redirect || '/',
                            query: this.otherQuery
                        })
                        this.loading = false
                    });
				}
			});
        },
        getOtherQuery(query) {
			return Object.keys(query).reduce((acc, cur) => {
				if (cur !== 'redirect') {
					acc[cur] = query[cur]
				}
				return acc
			}, {})
		}
		
	},
	watch: {
		$route: {
			handler: function(route) {
                const query = route.query
				if (query) {
					this.redirect = query.redirect,
					this.otherQuery = this.getOtherQuery(query)
				}
			},
			immediate: true
		}
	},
}
</script>

<style scoped lang="less">
	.module-theme(...){
        .content{
            width: 100%;
            height: 100%;
            position: relative;
            background: @bodyBg;
        }
        .loncom_login {
            width: 100%;
            height: 220px;
            // background: @contentBg url(@loginBg) no-repeat right bottom;
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
            background: @boxBg;
            padding: 20px 25px;
        }
        
        .loncom_login_con .loncom_logo_img {
            height: 60px;
            margin: 0 auto;
            // background: url(@loginLogo) no-repeat center center;
            background-size: contain;
        }
        
        .loncom_login_con .loncom_logo_text {
            text-align: center;
            font-style: normal;
            font-size: 24px;
            color: @activeColor;
            font-weight: bold;
            margin: 20px 0;
        }
        .btn{
            width: 100%;
        }
        .icon-user{
            font-size: 22px;
            &:before{
                color: @color;
            }
        }
        .icon-password{
            color: @color;
            font-size: 20px;
        }
    }
</style>