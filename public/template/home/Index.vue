<template>
    <div class="content">
        <h4 class="item">{{initParams}}</h4>
        <span class="item1">父组件传来的值{{initParams.name}}|{{initParams.detail}}</span>
        <img :src="templateUrl+'/images/logo.png'" style="width:54px;">
        <el-button type="success">成功按钮</el-button>
        <div class="energy_top_box" id="pueCon"></div>
        <div class="item">{{occupied}}父组件传来的值</div>
    </div>
</template>
<script>
// let {echarts} = $require('./js/echarts.min.js') 
module.exports = {
    props:["templateData","templateUrl"],
    created() {
        console.log(this.$ws)
        console.log(this.templateData)
    },
    mounted() {
        console.log(this.getWSData)
        // this.initPue("pueCon");
    },
    data(){
        return{
            occupied:"",
            initParams:{
                name:"",
                detail:""
            },
        }
    },
	methods: {
        // initPue:function(ID,value,min,max,title,color){
        //     console.log("---------------------------------")
        //     console.log(echarts)
        //     var value=1.53,min=0,max=5,title="PUE";
        //     var color=[[value/max,"#709CFD"],[1, '#223775']];
        //     var myChart = echarts.init(document.getElementById(ID));
        //     var option = {
        //         title:{
        //             text:"PUE",
        //             bottom:0,
        //             x:'center',
        //             textStyle:{
        //                 color:this.color,
        //                 fontSize:14,
        //                 fontWeight:'normal'
        //             },
        //         },
        //         series: [
        //             {
        //                 name: title,
        //                 type: 'gauge',
        //                 silent:true,
        //                 radius:'90%',
        //                 min:min,
        //                 max:max,
        //                 startAngle:180,
        //                 endAngle:0,
        //                 splitNumber:6,
        //                 center: ['50%', '55%'],
        //                 axisLine:{
        //                     lineStyle:{
        //                         color:color,
        //                         width:'15',
        //                     }
        //                 },
        //                 splitLine:{
        //                     show:false,
        //                 },
        //                 axisLabel:{
        //                     show:false,
        //                     color:"#B3D6EF"
        //                 },
        //                 axisTick:{
        //                     show:false
        //                 },
        //                 pointer:{
        //                     length:'65%',
        //                     width:'3%',
        //                 },
        //                 itemStyle:{
        //                     color: "#709CFD"
        //                 },
        //                 detail: {
        //                     show: true,
        //                     formatter:value,
        //                 },
        //                 data: [{value: value}]
        //             }
        //         ]
        //     };
            
        //     myChart.setOption(option, true);
        //     window.addEventListener("resize", () => {
        //         setTimeout(function(){
        //             myChart.resize();
        //         },0)
        //     });
        //     return myChart; 
        // },
	},
}
</script>
<style lang="less" scoped>
    .item {
        color: #f00;
    }
    .item1{
        color: #09c;
    }
    .content{
        /deep/ .el-button--success{
            background: none;
        }
    }
</style>
