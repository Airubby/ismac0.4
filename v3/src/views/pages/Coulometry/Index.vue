<template>
    <div class="content">
        <div class="coulometry-set">
            <el-row :gutter="25">
                <el-col :span="6" v-for="(item,index) in params" :key="index">
                    <div  class="coulometry-setbox">
                        <div class="coulometry-settop">
                            <span>{{item.title}}</span>
                            <!-- <i class="el-icon-edit-outline"></i> -->
                        </div>
                        <div class="coulometry-setcon">
                            <span class="number">{{item.value}}</span>{{item.unit}}
                        </div>
                        <div class="coulometry-setbottom">
                            <span>{{item.subtitle}}</span>{{item.subvalue}}
                        </div>
                    </div>
                </el-col>
            </el-row>
        </div>
        <div class="coulometry-btn">
            <template v-for="(item,index) in btnList">
                <el-button :type="item.active?'primary':'text'" size="mini" :key="index" @click="clickBtn(index)">{{item.name}}</el-button>
            </template>
        </div>
        <div class="card_title">
            <span class="title">负荷曲线</span>
        </div>
        <div id="lineCon" class="chartbox"></div>
        <div class="card_title">
            <span class="title">电量统计</span>
        </div>
        <div id="barCon" class="chartbox"></div>
    </div>
</template>
<script>
import echarts from 'echarts'
import {FormatDate} from "@/utils/Tool"
export default {
    created() {
        //设置颜色
        if(this.$theme=="blue"){
            this.borderColor="#33B9FF";
            this.color="#8b9ed4";
            this.lineColor="#0A3B79";
        }else{
            this.borderColor="#33B9FF";
            this.color="#828896";
            this.lineColor="#E8ECF0";
        }
    },
    mounted() {
        this.areaChar("lineCon");
        this.barChar("barCon");
    },
    data(){
        return{
            borderColor:"",
            color:"",
            lineColor:"",
            params:[
                {id:"1",title:"当前功率",value:"26.5",unit:"KW",subtitle:"平均功率",subvalue:"3"},
                {id:"2",title:"当日用电量",value:"60",unit:"KWh",subtitle:"小时平均用电",subvalue:"3"},
                {id:"3",title:"当月用电量",value:"26.5",unit:"KWh",subtitle:"日均电量",subvalue:"3"},
                {id:"4",title:"当年用电量",value:"46.5",unit:"KWh",subtitle:"月均电量",subvalue:"3"},
            ],
            btnList:[
                {name:"过去8小时",active:true},
                {name:"过去24小时",active:false},
                {name:"过去31天",active:false},
                {name:"过去12个月",active:false},
            ]
        }
    },
	methods: {
        clickBtn:function(index){
            for(let i=0;i<this.btnList.length;i++){
                this.btnList[i].active=false;
            }
            this.btnList[index].active=true;
        },
        areaChar:function(ID){
            var xData=["2018-10-11 09:00:11", "2018-10-11 09:03", "2018-10-11 09:13", "2018-10-11 09:14",
            "2018-10-11 09:24","2018-10-11 09:34","2018-10-11 09:44","2018-10-11 09:54","2018-10-11 10:04",
            "2018-10-11 10:14","2018-10-11 10:24","2018-10-11 10:14","2018-10-11 10:24"];
            var yData=[220, 18, 391, 234, 290, 343, 310, 301, 234, 390, 230, 310,18];
            var myChart = echarts.init(document.getElementById(ID));
            var option = {
                color:[this.borderColor],
                title: {
                    text: '有效功率(KW)',
                    top:10,
                    left:10,
                    textStyle:{
                        color:this.color,
                        verticalAlign:'top',
                        fontWeight:'normal',
                        fontSize:'14'
                    }
                },
                tooltip : {
                    trigger: 'axis'
                },
                grid: {
                    left: '15px',
                    right: '45px',
                    top:'40px',
                    bottom: '25px',
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
                            show:false
                        },
                        axisLabel:{
                            // rotate:-40,
                            color:this.color,
                            formatter: function (value, index) {
                                // 格式化成月/日，只在第一个刻度显示年份
                                return FormatDate("HH:mm",value);
                            }
                        },                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
                        data :xData
                    }
                ],
                yAxis : [
                    {
                        type : 'value',
                        scale:true,
                        splitLine:{
                            show:false,
                        },
                        axisLine:{
                            lineStyle:{
                                color:this.lineColor,
                                width:1,
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
                            formatter: '{value} kwH'
                        }
                    }
                ],
                series : [
                    {
                        name:"有效功率",
                        type:'line',
                        areaStyle: {
                            color:{
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [
                                    {offset: 0, color: "#2D578C"},
                                    {offset: 0.99, color: this.lineColor}
                                ],
                            }
                        },
                        smooth:"true", //平滑
                        symbol:"line", //不要圆圈
                        symbolSize:0, //平滑的时候设置为0
                        data:yData
                    }
                ]
            };
            myChart.setOption(option, true);;
            return myChart; 
        },
        barChar:function(ID){
            var xData=["2018-10-11 09:00:11", "2018-10-11 09:03", "2018-10-11 09:13", "2018-10-11 09:14",
            "2018-10-11 09:24","2018-10-11 09:34","2018-10-11 09:44","2018-10-11 09:54","2018-10-11 10:04"
            ,"2018-10-11 10:14","2018-10-11 10:24","2018-10-11 10:14","2018-10-11 10:24",
            "2018-10-11 09:00:11", "2018-10-11 09:03", "2018-10-11 09:13", "2018-10-11 09:14",
            "2018-10-11 09:24","2018-10-11 09:34","2018-10-11 09:44","2018-10-11 09:54","2018-10-11 10:04"
            ,"2018-10-11 10:14","2018-10-11 10:24","2018-10-11 10:14","2018-10-11 10:24"];
            var yData=[220, 18, 391, 234, 290, 343, 310, 301, 234, 390, 230, 310,18,220, 18, 391, 234, 290, 343, 310, 301, 234, 390, 230, 310,18];
            var myChart = echarts.init(document.getElementById(ID));
            var option = {
                color:["#33B9FF"],
                title: {
                    text: '用电量(KWh)',
                    top:10,
                    left:10,
                    textStyle:{
                        color:this.color,
                        verticalAlign:'top',
                        fontWeight:'normal',
                        fontSize:'14'
                    }
                },
                tooltip : {
                    trigger: 'axis',
                    formatter: "{b}<br/> {a}：{c}KWh",
                    axisPointer: {
                        type: 'shadow',
                        shadowStyle:{
                            shadowColor: 'rgba(51, 185, 255, 0.2)',
                            shadowBlur: 10
                        }
                    }, 
                },
                grid: {
                    left: '15px',
                    right: '45px',
                    top:'40px',
                    bottom: '25px',
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    data: xData,
                    axisLine:{
                        lineStyle:{
                            color:this.lineColor,
                            width:1,
                        }
                    }, 
                    axisLabel:{
                        color:this.color,
                    },        
                },
                yAxis: {
                    type: 'value',
                    name: '用电量',
                    axisLine:{
                        lineStyle:{
                            color:this.lineColor,
                            width:1,
                        }
                    },
                    splitLine:{
                        show:true,
                        lineStyle:{
                            color:this.lineColor,
                            width:1,
                        }
                    },
                    axisLabel: {
                        color:this.color,    
                        formatter: '{value}'
                    }
                },
                series: [
                    {
                        name:'用电量',
                        type:'bar',
                        barWidth: '30%',
                        data:yData
                    },
                ]
            };
            myChart.setOption(option, true);
            return myChart; 
        }
	},
    components: {
        
    }
}
</script>
<style lang="less" scoped>
    .module-theme(...){
        .coulometry-set{
            width: 100%;
            .coulometry-setbox{
                background: @boxBg;
                padding: 10px 15px;
                .coulometry-settop{
                    width: 100%;
                    height: 40px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }
                .number{
                    color: @bgColor;
                    font-size: 26px;
                    margin-right: @itemMargin;
                }
                .coulometry-setbottom{
                    margin-top: @btnMargin;
                    padding-top: @btnMargin;
                    border-top: 1px solid @lineColor;
                    span{
                        margin-right: @boxMargin;
                    }
                }
            }
        }
        .coulometry-btn{
            width: 100%;
            height: 30px;
            margin: 20px 0 15px 0;
            text-align: right;
        }
        .chartbox{
            width: 100%;
            height: 350px;
        }
    }
</style>