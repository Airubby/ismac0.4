<template>
	<div class="content">
		<a href="/template/aaa.xlsx" download="sfslf" style="color:#fff">tste</a>
        <span @click="down">ddddd</span>
        <div class="energy_top_box" id="pueCon" style="width:200px;height:200px"></div>
    </div>
</template>

<script>
export default {
	created () {
        console.log("测试")
	},
	mounted() {
        let _this=this;
        new Promise ((resolve, reject) => {
            const s = document.createElement('script');
            s.type = 'text/javascript';
            s.src = '/js/echarts.min.js';
            document.head.appendChild(s);
            s.onload=function(){
                _this.initPue("pueCon")
            }
        })
        
    },
	data(){
		return{

        }
	},
	methods:{
		down(){
            this.$api.downloadFile("/template/aaa.xlsx")
        },
		initPue:function(ID,value,min,max,title,color){
            console.log("---------------------------------")
            console.log(echarts)
            var value=1.53,min=0,max=5,title="PUE";
            var color=[[value/max,"#709CFD"],[1, '#223775']];
            var myChart = echarts.init(document.getElementById(ID));
            var option = {
                title:{
                    text:"PUE",
                    bottom:0,
                    x:'center',
                    textStyle:{
                        color:this.color,
                        fontSize:14,
                        fontWeight:'normal'
                    },
                },
                series: [
                    {
                        name: title,
                        type: 'gauge',
                        silent:true,
                        radius:'90%',
                        min:min,
                        max:max,
                        startAngle:180,
                        endAngle:0,
                        splitNumber:6,
                        center: ['50%', '55%'],
                        axisLine:{
                            lineStyle:{
                                color:color,
                                width:'15',
                            }
                        },
                        splitLine:{
                            show:false,
                        },
                        axisLabel:{
                            show:false,
                            color:"#B3D6EF"
                        },
                        axisTick:{
                            show:false
                        },
                        pointer:{
                            length:'65%',
                            width:'3%',
                        },
                        itemStyle:{
                            color: "#709CFD"
                        },
                        detail: {
                            show: true,
                            formatter:value,
                        },
                        data: [{value: value}]
                    }
                ]
            };
            
            myChart.setOption(option, true);
            window.addEventListener("resize", () => {
                setTimeout(function(){
                    myChart.resize();
                },0)
            });
            return myChart; 
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