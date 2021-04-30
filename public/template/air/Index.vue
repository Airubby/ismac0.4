<template>
    <div class="content">
        <div class="aircon">
            <div class="air-left">
                <div class="air-left-top">
                    <span class="switch-title">开关空调</span>
                    <el-switch
                        v-model="control"
                        active-color="#33B9FF"
                        inactive-color="#3250a2">
                    </el-switch>
                </div>
                <div class="air-left-cen"
                    <div class="air-left-cenbox">
                        <div class="table-box">
                            <div class="table-box-list">
                                <div class="table-box-span table-box-span-title">空调</div>
                                <div class="table-box-span border-left">转速</div>
                                <div class="table-box-span border-left">运行状态</div>
                            </div>
                            <div class="table-box-list border-top">
                                <div class="table-box-span table-box-span-title">压机1</div>
                                <div class="table-box-span border-left">220.5</div>
                                <div class="table-box-span border-left">运行中</div>
                            </div>
                            <div class="table-box-list border-top">
                                <div class="table-box-span table-box-span-title">压机2</div>
                                <div class="table-box-span border-left">12.6</div>
                                <div class="table-box-span border-left">未运行</div>
                            </div>
                            <div class="table-box-list border-top">
                                <div class="table-box-span table-box-span-title">压机3</div>
                                <div class="table-box-span border-left">5.0</div>
                                <div class="table-box-span border-left">未运行</div>
                            </div>
                        </div>
                    </div>
                    <div class="air-left-cenimg">
                        <img src="./config/images/air.png" >
                    </div>
                </div>
                <div class="air-left-bottom">
                    <div class="air-left-botbox">
                        <div class="number">22.5</div>
                        <div>回风温度(℃)</div>
                    </div>
                    <div class="air-left-botbox">
                        <div class="number">60</div>
                        <div>回风湿度(%)</div>
                    </div>
                    <div class="air-left-botbox">
                        <div class="number">22.5</div>
                        <div>送风温度(℃)</div>
                    </div>
                    <div class="air-left-botbox">
                        <div class="number">48</div>
                        <div>送风湿度(%)</div>
                    </div>
                </div>
            </div>
            <div class="air-right">
                <div class="air-right-top">
                    <div class="air-title">基本信息</div>
                    <div class="air-right-topicon">
                        <div class="air-right-iconbox">
                            <i :class="['icon','icon-runstatus','active']"></i>
                            <div>运行状态</div>
                        </div>
                        <div class="air-right-iconbox">
                            <i :class="['icon','icon-fanstatus']"></i>
                            <div>风机状态</div>
                        </div>
                        <div class="air-right-iconbox">
                            <i :class="['icon','icon-cool']"></i>
                            <div>制冷模式</div>
                        </div>
                        <div class="air-right-iconbox">
                            <i :class="['icon','icon-humidification']"></i>
                            <div>加湿模式</div>
                        </div>
                        <div class="air-right-iconbox">
                            <i :class="['icon','icon-arefaction']"></i>
                            <div>除湿模式</div>
                        </div>
                    </div>
                </div>
                <div class="air-right-cen">
                    <div class="air-title">部件运行时间</div>
                    <div class="chart-box" id="chartbox"></div>
                </div>
                <div class="air-right-bottom">
                    <div class="air-title">参数设定</div>
                    <div class="air-right-bottom-set">
                        <div class="air-right-bottom-setbox" v-for="(item,index) in params" :key="index">
                            <div class="air-right-settop">
                                <span>{{item.title}}</span>
                                <i class="el-icon-edit-outline" @click="setParam(item)"></i>
                            </div>
                            <div class="air-right-setcon number">
                                {{item.value}}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
module.exports = {
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
        this.chartBar("chartbox");
    },
    data(){
        return{
            control:false,   
            params:[
                {id:"1",title:"回风温度设定(℃)",value:"26.5"},
                {id:"2",title:"回风湿度设定(%)",value:"60"},
                {id:"3",title:"回风温度设定(℃)",value:"26.5"},
                {id:"4",title:"回风湿度设定(%)",value:"46.5"},
            ],
            paramInfo:{
                visible:false,
                data:{},
            }
        }
    },
	methods: {
        setParam:function(item){
            this.paramInfo.data=item;
            this.paramInfo.visible=true;
        },
        chartBar:function(ID){
            var myChart = echarts.init(document.getElementById(ID));
            var option = {
                color:["#33B9FF"],
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        crossStyle: {
                            color: this.color
                        }
                    }
                },
                grid: {
                    left: '15px',
                    right: '15px',
                    top:'15px',
                    bottom: '10px',
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    data: ['机组','风机','加湿器','加热器'],
                    axisLine:{
                        lineStyle:{
                            color:this.lineColor,
                            width:1,
                        }
                    },
                    axisPointer: {
                        type: 'shadow'
                    },  
                    axisLabel:{
                        color:this.color
                    },            
                },
                yAxis: {
                    type: 'value',
                    name: '运行时间',
                    min: 0,
                    max: 30,
                    interval: 5,
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
                        name:'运行时间',
                        type:'bar',
                        barWidth:"30%",
                        data:[12, 9, 11, 23]
                    },
                ]
            };
            myChart.setOption(option, true);
            
            return myChart; 
        },
	},
}
</script>
<style lang="less" scoped>
    .module-theme(...){
        .aircon{
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: space-between;
        }
        .switch-title{
            margin-right: @itemMargin;
        }
        .table-box{
            border: 1px solid @lineColor;
        }
        .table-box-list{
            display: flex;
        }
        .table-box-list .table-box-span{
            width: 100px;
            min-height: 30px;
            line-height: 30px;
            text-align: center;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .table-box-list .table-box-span.table-box-span-title{
            width: 120px;
        }
        .border-top{
            border-top: 1px solid @lineColor;
        }
        .border-left{
            border-left: 1px solid @lineColor;
        }
        .number{
            font-size: 24px;
            font-weight: bold;
        }
        .air-left{
            padding-right: 50px;
            width: 50%;
            height: 100%;
            .air-left-top{
                height: 40px;
                display: flex;
                justify-content: flex-end;
                align-items: center;
            }
            .air-left-cen{
                width: 100%;
                height: calc(100% - 140px);
                padding: 30px 0;
                display: flex;
                justify-content: space-between;
                .air-left-cenbox{
                    width: 100%;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    padding-left: 40px;
                }
                .air-left-cenimg{
                    img{
                        height: 100%;
                    }
                }
            }
            .air-left-bottom{
                width: 100%;
                height: 100px;
                display: flex;
                justify-content: space-around;
                text-align: center;
                .air-left-botbox{
                    .number{
                        margin-bottom: @itemMargin;
                    }
                }
            }
        }
        .air-right{
            width: 50%;
            height: 100%;
            padding: 0 50px;
            .air-title{
                width: 100%;
                height: 30px;
                color: @activeColor;
            }
            .air-right-top{
                width: 100%;
                height: 100px;
                .air-right-topicon{
                    display: flex;
                    justify-content: space-between;
                    text-align: center;
                    .air-right-iconbox{
                        .icon{
                            font-size: 45px;
                            display: block;
                            margin-bottom: @itemMargin;
                            &:before{
                                color: @color;
                            }
                            &.active:before{
                                color: @activeColor;
                            }
                        }
                    }
                }
            }
            .air-right-cen{
                width: 100%;
                height: calc(100% - 330px);
                padding: 15px 0;
                .chart-box{
                    width: 100%;
                    height: calc(100% - 30px);
                }
            }
            .air-right-bottom{
                width: 100%;
                height: 230px;
                .air-right-bottom-set{
                    width: 100%;
                    height: 200px;
                    display: flex;
                    flex-wrap:wrap;
                    justify-content: space-between;
                    .air-right-bottom-setbox{
                        height: calc(50% - @boxMargin);
                        width: calc(50% - @itemMargin);
                        padding: 0 10px;
                        margin-bottom: @boxMargin;
                        box-shadow: 0px 0px 10px @lineColor; 
                        .air-right-settop{
                            width: 100%;
                            height: 40px;
                            display: flex;
                            align-items: center;
                            justify-content: space-between;
                        }
                    }
                }
            }
        }
    }
</style>