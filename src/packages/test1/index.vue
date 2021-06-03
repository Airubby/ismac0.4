
<template>
  <div class="name">
      {{ name }}----{{initParams.test}}
        <img :src="templateUrl+'/images/me222.png'">  
        234234
        <div class="energy_top_box" id="pueCon"></div>
        <div class="energy_top_box" id="fzlCon"></div>
        <test :templateUrl="templateUrl"></test>
    </div>
</template>

<script>
import test from './component/test'
import echarts from 'echarts'
import 'echarts-liquidfill';
export default {
    props:{
        //需要传给动态子组件的数据
        templateData:{
            type:Object,
            default:function(){
                return {}
            }
        },
        templateUrl:{
            type:String,
            default:"."
        }
    },
    components:{test},
    data() {
        return {
            name:"瘦腿袜套",
            initParams:{
                test:""
            }
        }
    },
    mounted(){
        this.initPue("pueCon");
        this.initFzl("fzlCon","负载率",0.5);
    },
    methods: {
        initFzl:function(ID,title,value){
            // 基于准备好的dom，初始化echarts实例
            var myChart = echarts.init(document.getElementById(ID));
            // 绘制图表
            var option = {
                title:{
                    text:title,
                    bottom:0,
                    x:'center',
                    textStyle:{
                        color:this.color,
                        fontSize:14,
                        fontWeight:'normal'
                    },
                },
                series: [{
                    type: 'liquidFill',
                    radius: '70%',
                    center: ['50%', '45%'],
                    waveAnimation: true,
                    backgroundStyle: {
                        color: 'transparent',
                        borderColor: '#709CFD',
                        borderWidth: 8,
                    },
                    itemStyle: {
                        normal: {
                            shadowBlur: 0
                        }
                    },
                    outline: {
                        borderDistance: 0,
                        itemStyle: {
                            borderWidth: 5,
                            borderColor: "transparent",
                        }
                    },
                    label: {
                        normal: {
                            show: true,
                            textStyle: {
                                color: "#709CFD",
                                fontSize: 26,
                                align: 'center',
                                baseline: 'middle'
                            },
                            formatter:function(params){
                                return (params.value*100).toFixed(2)+"%";
                            },
                            position: 'inside'
                        }
                    },
                    data: [
                    {
                        value: value,
                        itemStyle: {
                            normal: {
                                color: "#709CFD"
                            }
                        }
                    }
                    ]
                }]
            };
            myChart.setOption(option);
            window.addEventListener("resize", () => {
                setTimeout(function(){
                    myChart.resize();
                },0)
            });
            return myChart;
        },
        initPue:function(ID,value,min,max,title,color){
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
        templateData:{
            handler:function(val){
                Object.assign(this.initParams,val)
            },
            deep: true, 
            immediate: true
        }
    }
    
}
</script>
<style lang="less" scoped>
    .name{
        color: #f00
    }
    .energy_top_box{
        width:500px;
        height: 500px;
    }
</style>