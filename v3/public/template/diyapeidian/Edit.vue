<template>
    <div class="pdcontent">
        <div class="pd-left">
            <img :src="templateUrl+'/images/diyapeidiangui.png'">
        </div>
        <div class="pd-right">
            <div class="top">
                <div class="top-box">
                    <p>频率(Hz)</p>
                    <p class="number">26.8</p>
                </div>
                <div class="top-box">
                    <p>总功率因素</p>
                    <p class="number">26.8</p>
                </div>
                <div class="top-box">
                    <p>总有功功率(Kw)</p>
                    <p class="number">26.8</p>
                </div>
                <div class="top-box">
                    <p>总有功电度(Kw.h)</p>
                    <p class="number">26.8</p>
                </div>
            </div>
            <div class="card_title">
                <span class="title">电压参数</span>
            </div>
            <div class="chartbox" id="chartbox"></div>
            <div class="card_title">
                <span class="title">电流参数</span>
            </div>
            <div class="chartbox" id="chartbox1"></div>
        </div>
    </div>
</template>
<script>
module.exports = {
    props:["templateData","templateUrl","dataObject"],
    components:{
        
    },
    created() {
        this.borderColor="#052B62";
        this.color="#8b9ed4";
        this.lineColor="#0A3B79";
    },
    mounted() {
        let _this=this;
        const s = document.createElement('script');
        s.type = 'text/javascript';
        s.src = _this.templateUrl+'/js/echarts.min.js';
        document.head.appendChild(s);
        var char,vhar;
        s.onload=function(){
            char=_this.echartLine("chartbox");
            vhar=_this.echartLine("chartbox1");
        }
        window.onresize=()=>{
            char&&char.resize();
            vhar&&vhar.resize();
        }
    },
    data(){
        return{
            control:false,   
            params:[

            ],
            initParams:{
                wendu:"5",
                shidu:"7",
            },
            dialogInfo:{
                visible:false
            },
            initDialog:{
                value:"",
            },
            dialgorules:{

            }
        }
    },
	methods: {
        // A相电压、B相电压、C相电压、平均相电压
        echartLine:function(ID,title,subtitle,legend,xData,yData){
            let _this=this;
            // 基于准备好的dom，初始化echarts实例
            var xData=["2018-10-11 09:00:11", "2018-10-11 09:03", "2018-10-11 09:13", "2018-10-11 09:14",
             "2018-10-11 09:24","2018-10-11 09:34","2018-10-11 09:44","2018-10-11 09:54","2018-10-11 10:04","2018-10-11 10:14","2018-10-11 10:24"];
            var legend=[{
                name:"实时IT设备电能",
                icon:'rect'
            },{
                name: "机房实时总电能",
                icon:'rect'
            }];
            var title="℃";
            var subtitle="温度";
            var yData=[
                {
                    name:'实时IT设备电能',
                    type:'line',
                    smooth:"true", //平滑
                    data:[320, 232, 301, 234, 390, 230, 310,18, 391, 234, 290, 343, 310]
                },
                {
                    name:'机房实时总电能',
                    type:'line',
                    smooth:"true", //平滑
                    data:[220, 18, 391, 234, 290, 343, 310, 301, 234, 390, 230, 310,18]
                },
            ];
            let color=["#00B564","#FF9655","#51B1DC","#64E572","#FFCD4D"];
            var myChart = echarts.init(document.getElementById(ID));
            var option = {
                color:color,
                tooltip : {
                    trigger: 'axis'
                },
                legend: {
                    top:'10px',
                    right:'0',
                    textStyle:{
                        color:"#8b9ed4"
                    },
                    itemWidth:30,
                    itemHeight:2,
                    data:legend
                },
                grid: {
                    left: '15px',
                    right: '40px',
                    top:'55px',
                    bottom: '5px',
                    containLabel: true
                },
                xAxis : [
                    {
                        type : 'category',
                        boundaryGap : false,
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
                            formatter: function (value, index) {
                                return value;
                            }
                        },                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
                        data :xData
                    }
                ],
                yAxis : [
                    {
                        type : 'value',
                        splitLine:{
                            show:false,
                        },
                        axisLine:{
                            lineStyle:{
                                color:"#0A3B79",
                                width:1,
                            }
                        },
                        splitLine:{
                            show:false,
                            lineStyle:{
                                color:"#1c3042",
                                width:1,
                                type:"dashed",
                            }
                        },
                        axisTick:{
                            show:false
                        },
                        axisLabel:{
                            color:"#8b9ed4",
                            formatter: '{value}'
                        }
                    }
                ],
                series : yData
            };
            myChart.setOption(option, true);
            window.addEventListener("resize", () => { 
                setTimeout(function(){
                    myChart.resize();
                },0)
            });
            return myChart;
        },
        selectPoint:function(key){
            this.$emit("selectPoint",key)
        },
        enterPage:function(key){
            this.$emit("selectUrl",key)
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
    .pdcontent{
        width: 100%;
        height: 100%;
        min-width: 1000px;
        min-height: 600px;
        display: flex;
        .pd-left{
            width: 300px;
            text-align: center;
            img{
                max-width: 100%;
            }
        }
        .pd-right{
            width: calc(100% - 300px);
            .top{
                width: 100%;
                height: 94px;
                display: flex;
                .top-box{
                    padding: 15px;
                    background: #0A3B79;
                    margin-right: 15px;
                    width: calc(25% - 15px);
                    &:nth-last-child(1){
                        margin: 0;
                    }
                    .number{
                        color: #DDE4F6;
                        font-size: 26px;
                        margin-top: 10px;
                    }
                }
            }
            .chartbox{
                width: 100%;
                height: 200px;
            }
            .card_title{
                margin-top: 20px;
            }
        }
    }
    
</style>
