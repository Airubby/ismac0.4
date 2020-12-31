<template>
	<div class="content">
		<a href="/template/aaa.xlsx" download="sfslf" style="color:#fff">tste</a>
        <span @click="down">ddddd</span>
    </div>
</template>

<script>
export default {
	created () {
	},
	mounted() {
		
    },
	data(){
		return{

        }
	},
	methods:{
		down(){
            this.$api.downloadFile("/template/aaa.xlsx")
        }
		
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
            background: @bodyBg;
        }
        .loncom_login {
            width: 100%;
            height: 220px;
            background: @contentBg url(@loginBg) no-repeat right bottom;
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
            background: url(@loginLogo) no-repeat center center;
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