<template>
    <div class="content">
        <div class="energy-top">
            <div class="energy-btn">
                <template v-for="(item,index) in btnList">
                    <el-button :type="item.active?'primary':'text'" size="mini" :key="index" @click="clickBtn(index)">{{item.name}}</el-button>
                </template>
            </div>
            <div class="energy-top-con">
                <div class="energy_top_box" id="pueCon"></div>
                <div class="energy_top_box" id="fzlCon"></div>
                <div class="energy_top_box" id="energyCon"></div>
            </div>
        </div>
        <div class="card_title">
            <span class="title">能效趋势</span>
        </div>
        <div id="lineCon" class="lineCon"></div>
    </div>
</template>
<script>
import {FormatDate} from '@/utils/Tool'
import echarts from 'echarts'
import 'echarts-liquidfill';
export default {
    created() {
        //设置颜色
        if(this.$theme=="blue"){
            this.borderColor="#052B62";
            this.color="#8b9ed4";
            this.lineColor="#0A3B79";
        }else{
            this.borderColor="#ffffff";
            this.color="#828896";
            this.lineColor="#E8ECF0";
        }
    },
    mounted() {
        this.initPue("pueCon");
        this.initFzl("fzlCon","负载率",0.5);
        this.initPie("energyCon","能效分布")
        let xData=["2020-10","2020-11","2020-12"]
        let pueData=[1,3,2];
        let fzlData=[30,50,76];
        this.initLine('lineCon',[{name:"pue"},{name: "负载率"}],xData,pueData,fzlData);
    },
    data(){
        return{
            borderColor:"",
            color:"",
            lineColor:"",
            btnList:[
                {name:"今日",active:true,type:"day"},
                {name:"本月",active:false,type:"month"},
                {name:"本年",active:false,type:"year"},
            ],
            begintime:"",
            endtime:""
        }
    },
	methods: {
        clickBtn:function(index){
            for(let i=0;i<this.btnList.length;i++){
                this.btnList[i].active=false;
            }
            this.btnList[index].active=true;
            if(this.btnList[index].type=="day"){
                this.begintime=FormatDate("yyyy-MM-dd 00:00:00");
                this.endtime=FormatDate("yyyy-MM-dd HH:mm:ss");
            }else if(this.btnList[index].type=="month"){
                this.begintime=FormatDate("yyyy-MM-01 00:00:00");
                this.endtime=FormatDate("yyyy-MM-dd HH:mm:ss");
            }else if(this.btnList[index].type=="year"){
                this.begintime=FormatDate("yyyy-01-01 00:00:00");
                this.endtime=FormatDate("yyyy-MM-dd HH:mm:ss");
            }
            console.log(this.begintime,this.endtime)
        },
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
        initPie:function(id,title,data){
            var data=[{value:21.12,name:"IT能耗"},{value:78.88,name:"其它能耗"},{value:0,name:"供配电"},{value:0,name:"制冷"}]
            let myChart = echarts.init(document.getElementById(id))
            // 绘制图表
            myChart.setOption({
                color:["#223775","#709CFD"],
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
                tooltip: {
                    trigger: 'item',
                    formatter: "{b}: {c} ({d}%)"
                },
                series:[{
                    type: 'pie',
                    radius: '70%',
                    center: ['50%', '45%'],
                    data: data,
                    label: {
                        normal: {
                            show:true,
                            formatter: '{per|{d}%}\n{b|{b}} ',
                            rich: {
                                b: {
                                    fontSize: 12,
                                    lineHeight: 20,
                                    color:this.color
                                },
                                per:{
                                    fontSize: 18,
                                    lineHeight: 20,
                                    color:'#6e94ff'
                                }
                            }
                        }
                    },
                    labelLine:{
                        show:false
                    },
                    itemStyle:{
                       borderColor:this.borderColor,
                       borderWidth:3
                    }
                }]

            })
            window.addEventListener("resize", () => {
                setTimeout(function(){
                    myChart.resize();
                },0)
            });
            return myChart;
        },
        initLine:function(id,legend,xData,pueData,fzlData){
            let self = this;
            let myChart = echarts.init(document.getElementById(id));
            let option = {
                color:["#6e93ff","#4bd492"],
                dataZoom: [
                    {
                        show:false,
                        start: 30,
                        end: 70,
                        bottom:10,
                    },
                    {
                        type: 'slider',
                        backgroundColor:"#041742",
                        dataBackground:{
                            lineStyle:{
                                color:"#2B4DAA"
                            },
                            areaStyle:{
                                color:"#2B4DAA"
                            }
                        },
                        fillerColor:"rgba(34,55,117,0.5)",
                        borderColor:"transparent",
                        handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
                        handleSize: '100%',
                        handleStyle: {
                            color: '#223775',
                        },
                        textStyle:{
                            color:"#BEC6DE"
                        }
                    }
                ],
                tooltip : {
                    trigger: 'axis'
                },
                legend: {
                    top: "0px",
                    right:"30px",
                    textStyle:{
                        color:this.color
                    },
                    // data:["实时IT设备电能", "机房实时总电能"]
                    data:legend
                },
                grid: {
                    left: '20px',
                    right: '30px',
                    top:'30px',
                    bottom: '50px',
                    containLabel: true
                },
                xAxis : [
                    {
                        type : 'category',
                        boundaryGap : false,
                        axisLine:{
                            lineStyle:{
                                color:this.lineColor,
                                width:1,
                            }
                        },
                        axisTick:{
                            show:true
                        },
                        axisLabel:{
                            rotate:0,
                            color:this.color,
                            formatter: function (value, index) {
                                // 格式化成月/日，只在第一个刻度显示年份
                                return self.$tool.FormatDate('HH:mm',new Date(value));
                            }
                        },
                        data :xData
                    }
                ],
                yAxis : [
                    {
                        type : 'value',
                        scale:true,
                        axisLine:{
                            lineStyle:{
                                color:this.lineColor,
                                width:0,
                            }
                        },
                        splitLine:{
                            show:true,
                            lineStyle:{
                                color:this.lineColor,
                                width:1,
                                type:"dashed",
                            }
                        },
                        axisTick:{
                            show:false
                        },
                        axisLabel:{
                            color:this.color,
                            formatter: '{value}'
                        }
                    }
                ],
                series : [
                    {
                        name:legend[0].name,
                        type:'line',
                        smooth:"true", //平滑
                        symbol:"line", //不要圆圈
                        data:pueData,
                    },
                    {
                        name:legend[1].name,
                        type:'line',
                        smooth:"true", //平滑
                        symbol:"line", //不要圆圈//平滑的时候设置为0
                        data:fzlData
                    },
                ]
            };
            myChart.setOption(option, true);
            window.addEventListener("resize", () => {
                setTimeout(function(){
                    myChart.resize();
                },0)
            });
            return myChart
        }
	},
}
</script>
<style lang="less" scoped>
    .module-theme(...){
        
        .energy-top{
            position: relative;
            width: 100%;
            height: 200px;
            .energy-btn{
                position: absolute;
                right: 0;
                width: 100%;
                height: 30px;
                text-align: right;
            }
            .energy-top-con{
                display: flex;
                justify-content: center;
                height: 100%;
                .energy_top_box{
                    width: 33.33%;
                    padding-top: 30px;
                    height:200px;
                    text-align: center;
                    line-height: 170px;
                    font-size: 22px;
                }
            }
            
        }
        .lineCon{
            width: 100%;
            height: calc(100% - 232px);
        }
    }
</style>