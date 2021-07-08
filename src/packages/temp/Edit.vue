<template>
    <div class="content">
        <div class="left">
            <div class="left-top">
                <div class="left-top-box">
                    <div class="number">22.5</div>
                    <div>组压(V)</div>
                </div>
                <div class="left-top-box">
                    <div class="number">60</div>
                    <div>容量(%)</div>
                </div>
            </div>
            <div class="left-box">
                <div class="left-box-dc">
                    <div class="dc-box" v-for="index in 16" :key="index">
                        <div class="dc-box-top">
                            <span></span>
                            <span></span>
                        </div>
                        <div class="dc-box-body">
                            <div class="dc-box-body-bg">
                                <div class="dc-body-bgspan">
                                    <span v-for="item in 7" :key="item"></span>
                                </div>
                                <div class="dc-body-bgspan">
                                    <span v-for="item in 7" :key="item"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="right">
            <div class="card_title">
                <span class="title">电压参数</span>
            </div>
            <div class="chart" id="chart1"></div>
            <div class="card_title">
                <span class="title">温度参数</span>
            </div>
            <div class="chart" id="chart2"></div>
            <div class="card_title">
                <span class="title">内阻参数</span>
            </div>
            <div class="chart" id="chart3"></div>
        </div>
    </div>
</template>
<script>
export default {
    props:["templateData","templateUrl","dataObject"],
    components:{
        
    },
    created() {
        
    },
    mounted() {
        this.chartFn("chart1")
        this.chartFn("chart2")
        this.chartFn("chart3")
    },
    data(){
        return{
            
        }
    },
	methods: {
        chartFn:function(ID,xData,yData){
            var xData=['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'];
            var yData=[12, 9, 11, 23, 5, 11, 3, 10, 10, 10,11, 10];
            var myChart = this.$echarts.init(document.getElementById(ID));
            var option = {
                color:["#33B9FF"],
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        crossStyle: {
                            color: '#8b9ed4'
                        }
                    }
                },
                grid: {
                    left: '25px',
                    right: '25px',
                    top:'10px',
                    bottom: '25px',
                },
                xAxis: [
                    {
                        type : 'category',
                        axisLine:{
                            lineStyle:{
                                color:"#0A3B79",
                                width:1,
                            }
                        },
                        axisTick:{
                            show:false
                        },  
                        axisLabel:{
                            color:"#8b9ed4",    
                            formatter: '{value}'
                        },      
                        data :xData  
                    }
                ],
                yAxis: [
                    {
                        axisLine:{
                            lineStyle:{
                                color:"#0A3B79",
                                width:1,
                            }
                        },
                        splitLine:{
                            show:true,
                            lineStyle:{
                                color:"#07316A",
                                width:1,
                                type:"dashed",
                            }
                        },
                        axisTick:{
                            show:false
                        },
                        type: 'value',
                        axisLabel: {
                            color:"#8b9ed4",    
                            formatter: '{value}'
                        }
                    }
                ],
                series: [
                    {
                        name:'降水量',
                        type:'bar',
                        barWidth: '20%',
                        data:yData
                    }
                ]
            };
            myChart.setOption(option, true);
            
            return myChart; 
        }
    },
    watch:{
        dataObject:{
            handler:function(val){
                this.initParams=Object.assign(this.initParams,val)
            },
            deep: true, 
            immediate: true
        }
    }
}
</script>
<style lang="less" scoped>
    .content{
        width: 100%;
        min-height: 100%;
        background: #052B62;
        display: flex;
        justify-content: space-between;
        .left{
            width: 300px;
            padding: 0 30px;
            .left-top{
                display: flex;
                justify-content: space-around;
                text-align: center;
                margin: 30px 0;
                .number{
                    font-size: 20px;
                }
            }
            .left-box{
                width: 100%;
                height: 500px;
                border-left: 10px solid #0A3B79;
                border-right: 10px solid #0A3B79;
                position: relative;
                &::before{
                    content: "";
                    width: 20px;
                    height: 8px;
                    position: absolute;
                    left: 0;
                    bottom: 0;
                    background: #0A3B79;
                }
                &::after{
                    content: "";
                    width: 20px;
                    height: 8px;
                    position: absolute;
                    right: 0;
                    bottom: 0;
                    background: #0A3B79;
                }
                .left-box-dc{
                    width: 100%;
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: space-around;
                    .dc-box{
                        width: calc(25% - 2px);
                        height: 90px;
                        position: relative;
                        margin: 15px 0;
                        .dc-box-top{
                            width: 100%;
                            height: 10px;
                            display: flex;
                            justify-content: space-around;
                            span{
                                width: 10px;
                                height: 10px;
                                display: block;
                                background: #EFF0F2;
                            }
                        }
                        .dc-box-body{
                            width: 100%;
                            height: calc(100% - 10px);
                            background: #EFF0F2;
                            position: relative;
                            .dc-box-body-bg{
                                position: absolute;
                                width: 100%;
                                height: 20px;
                                bottom: 20px;
                                left: 0;
                                padding: 2px 0;
                                background: #083A78;
                                .dc-body-bgspan{
                                    display: flex;
                                    justify-content: space-between;
                                    width: 100%;
                                    height: 4px;
                                    margin: 3px 0;
                                    span{
                                        background: #EFF0F2;
                                        display: block;
                                        width: 4px;
                                        height: 4px;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        .right{
            width: calc(100% - 300px);
            .chart{
                width: 100%;
                height: 200px;
            }
        }
    }
</style>
