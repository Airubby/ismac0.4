<template>
    <div class="content">
        <div class="layout-top">
            <el-button type="primary" plain @click="enterEdit">编辑布局</el-button>
        </div>
        <div class="layout-con">
            <div class="scrollbar" v-scrollBar>
                <div class="layout-box">
                    <div class="layout-box-con">
                        <div class="layout-box-panel layout-box-onepanel" :style="panelStyle" v-if="editType=='one'">
                            <div class="layout-panel-other">
                                <div class="layout-panel-othercon">
                                    <span class="panel-span" :class="{'oglFlip':devitem.oglFlip}" :style='panelDevStyle(devitem)' v-for="(devitem,index) in devtopData" :key="index">
                                        <img :src="devitem.imgsrc" >
                                    </span>
                                </div>
                            </div>
                            <div class="layout-panel-cen">
                                <div class="panel-cendoor" :class="{'panel-cendoor-close':leftDoor}"></div>
                                <div class="panel-cencon">
                                    <div class="layout-list-con">
                                        <draggable class="layout-list-con" 
                                        :list="topData" 
                                        v-bind="dragOptions">
                                            <transition-group class="layout-list-group" type="transition">
                                                <template  v-for="(item,tindex) in topData">
                                                    <div class="panel-conbox list-group-item" :key="tindex" :class="{'list-group-halfitem':item.category=='air'}">
                                                        <cabinet :background="item.background" :name="item.name" :index="tindex"></cabinet>
                                                    </div>
                                                </template>
                                            </transition-group>
                                        </draggable>
                                    </div>
                                </div>
                                <div class="panel-cendoor panel-cendoor-right" :class="{'panel-cendoor-close':rightDoor}"></div>
                            </div>
                            <div class="layout-panel-other">
                                <div class="layout-panel-othercon">
                                    <span class="panel-span" :class="{'oglFlip':devitem.oglFlip}" :style='panelDevStyle(devitem)' v-for="(devitem,index) in devbottomData" :key="index">
                                        <img :src="devitem.imgsrc">
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div class="layout-box-panel" :style="panelStyle" v-if="editType=='two'">
                            <div class="layout-panel-other">
                                <div class="layout-panel-othercon">
                                    <span class="panel-span" :class="{'oglFlip':devitem.oglFlip}" :style='panelDevStyle(devitem)' v-for="(devitem,index) in devtopData" :key="index">
                                        <img :src="devitem.imgsrc">
                                    </span>
                                </div>
                            </div>
                            <div class="layout-panel-top layout-panel-con">
                                <div class="layout-list-con">
                                    <draggable class="layout-list-con" 
                                    :list="topData" 
                                    v-bind="dragOptions"
                                    handle=".panel-conbox">
                                        <transition-group class="layout-list-group" type="transition">
                                            <template  v-for="(item,tindex) in topData">
                                            <div class="panel-conbox list-group-item" :key="tindex" :class="{'list-group-halfitem':item.category=='air'}">
                                                <cabinet :background="item.background" :name="item.name" :index="tindex"></cabinet>
                                            </div>
                                            </template>
                                        </transition-group>
                                    </draggable>
                                </div>
                            </div>
                            <div class="layout-panel-cen">
                                <div class="panel-cendoor" :class="{'panel-cendoor-close':leftDoor}"></div>
                                <div class="panel-cencon">
                                    <span class="panel-span" :class="{'oglFlip':devitem.oglFlip}" :style='panelDevStyle(devitem)' v-for="(devitem,index) in devData" :key="index">
                                        <img :src="devitem.imgsrc">
                                    </span>
                                </div>
                                <div class="panel-cendoor panel-cendoor-right" :class="{'panel-cendoor-close':rightDoor}"></div>
                            </div>
                            <div class="layout-panel-bottom layout-panel-con">
                                <div class="layout-list-con">
                                    <draggable class="layout-list-con" 
                                    :list="bottomData" 
                                    v-bind="dragOptions"
                                    handle=".panel-conbox">
                                        <transition-group class="layout-list-group" type="transition">
                                            <template  v-for="(item,tindex) in bottomData">
                                            <div class="panel-conbox list-group-item" :key="tindex" :class="{'list-group-halfitem':item.category=='air'}">
                                                <cabinet :background="item.background" :name="item.name" :index="tindex"></cabinet>
                                            </div>
                                            </template>
                                        </transition-group>
                                    </draggable>
                                </div>
                            </div>
                            <div class="layout-panel-other">
                                <div class="layout-panel-othercon">
                                    <span class="panel-span" :class="{'oglFlip':devitem.oglFlip}" :style='panelDevStyle(devitem)' v-for="(devitem,index) in devbottomData" :key="index">
                                        <img :src="devitem.imgsrc">
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div v-if="editType=='auto'" id="canvas-box">
                            <canvas id="designCanvas"></canvas>
                        </div>
                        <div class="layout-echart">
                            <div class="layout-echart-box" id="pueCon"></div>
                            <div class="layout-echart-box" id="energyCon"></div>
                            <div class="layout-echart-box">
                                <div class="layout-box-con">
                                    <div class="title">温度</div>
                                    <div class="top">
                                        <i :class="['icon','icon-humiture']"></i>
                                        <div class="info">
                                            <div>平均</div>
                                            <div>
                                                <span>24.8</span>℃
                                            </div>
                                        </div>
                                    </div>
                                    <div class="bottom">
                                        <div>
                                            最大<span>25.7</span>℃
                                        </div>
                                        <div class="split"> / </div>
                                        <div>
                                            最小<span>23.7</span>℃
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { fabric } from "fabric";
import Draggable from './component/Draggable'
import Cabinet from './component/Cabinet'
import echarts from 'echarts'
import 'echarts-liquidfill';
export default {
    components: {Draggable,Cabinet},
    mixins:[],
    filters:{
        
    },
    created() {
        this.init();
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
        this.initPie("energyCon","能效分布")
    },
    computed: {
        dragOptions() {
            return {
                animation: 200,
                group: "description", //多个draggable时，group相同才能相互拖拽
                disabled: true,
                ghostClass: "ghost"
            };
        },
        panelStyle(){
            let max=this.topData.length>this.bottomData.length?this.topData.length:this.bottomData.length;
            //每个柜子给70宽
            let width=70*max+176;
            return "width:"+width+"px";
        },
        panelDevStyle(){
            return function(item){
                return `left:${item.offsetX}px;top:${item.offsetY}px`;
            }
        }
    },
    data(){
        return{
            editType:"",
            leftDoor:false,
            rightDoor:false,
            topData:[],
            bottomData:[],
            devData:[],
            devtopData:[],
            devbottomData:[],

            borderColor:"",
            color:"",
            lineColor:"",

            zoomPoint:"",//中心点
            zoom:1, //缩放比例
            viewportTransform:null, //拖动画布后，存的距离上左的间距arr[0]比率；arr[4]左右移动的距离；arr[5]上下移动距离
            design:null,
            initWidth:"",
            initHeight:""
            
        }
    },
	methods: {
        init:function(){
            let layoutJson=sessionStorage.getItem("layoutJson");
            if(layoutJson){
                let json=JSON.parse(layoutJson);
                this.editType=json.editType;
                if(this.editType=="auto"){
                    this.$nextTick(()=>{
                        this.initCanvas(json);
                    })
                    return;
                }
                this.leftDoor=json.leftDoor;
                this.rightDoor=json.rightDoor;
                this.topData=json.topData;
                this.bottomData=json.bottomData;
                this.devData=json.devData;
                this.devtopData=json.devtopData;
                this.devbottomData=json.devbottomData;
            }
            // this.$api.post("",{}).then(res=>{

            // })
        },
        initCanvas:function(json){
            let _this=this;
            console.log(JSON.parse(sessionStorage.getItem("layoutJson")));
            this.design =new fabric.Canvas('designCanvas',{backgroundColor:'',selection: false});
            this.design.hoverCursor = 'default'; // 设置对象hover的光标为默认
            let dom=document.getElementById("canvas-box");
            this.initWidth=json.initWidth;
            this.initHeight=json.initHeight;
            // this.initWidth=dom.offsetWidth;
            // this.initHeight=dom.offsetHeight;
            this.design.setWidth(dom.offsetWidth);
            this.design.setHeight(dom.offsetHeight);
            // this.zoomPoint = new fabric.Point(this.design.width / 2 , this.design.height / 2);
            this.design.loadFromJSON(json.designCanvas, function() {
                _this.resizeCanvas();
                window.onresize=function(){
                    _this.resizeCanvas();
                };
            });
            // this.setCanvasBg();
            
            _this.design.on('mouse:wheel', function(opt) {
                console.log(this)
                var delta = opt.e.deltaY;
                _this.zoom = _this.design.getZoom();
                _this.zoom *= 0.999 ** delta;
                if (_this.zoom > 20) _this.zoom = 20;
                if (_this.zoom < 0.01) _this.zoom = 0.01;
                this.zoomToPoint(_this.zoomPoint, _this.zoom);
                // this.setZoom(_this.zoom);
                opt.e.preventDefault();
                opt.e.stopPropagation();
                _this.viewportTransform=this.viewportTransform;
            });
            _this.design.on('mouse:down', function(opt) {
                
            });
        },
        zoomToFitCanvas:function(info){
            console.log(info)
            if(info.backgroundImage){
                let bgWidth=info.backgroundImage.width*info.backgroundImage.scaleX;
                let bgHeight=info.backgroundImage.height*info.backgroundImage.scaleY;
                let dom=document.getElementById("canvas-box");
                let nowWidth=dom.offsetWidth;
                let nowHeight=dom.offsetHeight;
                let zoomX=nowWidth/bgWidth;
                let zoomY=nowHeight/bgHeight;
                this.zoom=Math.min(zoomX, zoomY);
                //计算平移坐标
                let panX=(nowWidth*zoomX-bgWidth)/2;
                let panY=(nowHeight*zoomY-bgHeight)/2;
                //开始平移
                this.design.absolutePan({x:panX, y:panY});
                this.design.zoomToPoint(this.zoomPoint, this.zoom);
            }
        },
        resizeCanvas:function(){
            let _this=this;
            //先还原缩放比例与位置
            _this.design.setZoom(1);
            _this.design.absolutePan({x:0, y:0});
            let dom=document.getElementById("canvas-box");
            let nowWidth=dom.offsetWidth;
            let nowHeight=dom.offsetHeight;
            let zoomX=nowWidth/_this.initWidth;
            let zoomY=nowHeight/_this.initHeight;
            _this.zoom=Math.min(zoomX, zoomY);
            //计算平移坐标
            let panX=(_this.initWidth-nowWidth*zoomX)/2;
            let panY=(_this.initHeight-nowHeight*zoomY)/2;
            //开始平移
            _this.design.absolutePan({x:panX, y:panY});
            _this.design.zoomToPoint(_this.zoomPoint, _this.zoom);
        },
        setCanvasBg:function(){
            let _this=this;
            fabric.Image.fromURL('images/device/room.png', function (oimg) { 
                let bgWidth=oimg._element.width;
                let bgHeight=oimg._element.height;
                let zoom=1,left=0,top=0;
                if(_this.design.width/oimg._element.width-_this.design.height/oimg._element.height<0){  //y轴没占满，
                    zoom=_this.design.width/oimg._element.width;
                    top=(_this.design.height-bgHeight*zoom)/2
                }else{
                    zoom=_this.design.height/oimg._element.height;
                    left=(_this.design.width-bgWidth*zoom)/2
                }
                _this.design.setBackgroundImage('images/device/room.png', _this.design.renderAll.bind(_this.design),{
                    scaleX: zoom,
                    scaleY: zoom,
                    left:left,
                    top:top,
                });
            });
        },
        enterEdit:function(item){
            this.$router.push({name:'deviceLayoutEdit',query:{params:JSON.stringify({"id":"1111"})}});
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
            var data=[{value:30,name:"IT能耗"},{value:100-30,name:"其它能耗"}]
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
                series:[{
                    type: 'pie',
                    radius: '70%',
                    center: ['50%', '45%'],
                    data: data,
                    label: {
                        normal: {
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
                       borderWidth:5
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
	},
    
}
</script>
<style lang="less" scoped>
    .module-theme(...){
        .layout-top{
            display: flex;
            justify-content: flex-end;
            margin-bottom: @itemMargin;
        }
        .layout-con{
            width: 100%;
            height: calc(100% - 35px);
            position: relative;
        }
        .layout-box{
            width: 100%;
            height: 100%;
            .layout-box-con{
                height: 100%;
                text-align: center;
                .layout-box-panel{
                    min-width: 400px;
                    max-width: 100%;
                    height: 540px;
                    display: inline-block;
                    position: relative;
                    .layout-panel-con{
                        width: calc(100% - 160px);
                        height: 150px;
                        border: 8px solid @lineColor;
                        margin: 0 auto;
                        display: flex;
                        position: relative;
                        .layout-list-con{
                            width: 100%;
                            height: 100%;
                        }
                        .layout-info-show{
                            width: 100%;
                            height: 100%;
                            text-align: center;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            color: @color;
                            font-size: 16px;
                            position: absolute;
                        }
                        .layout-list-group{
                            width: 100%;
                            height: 100%;
                            display: flex;
                            .list-group-item{
                                width: 180%;
                                height: 100%;
                                padding: 0 1px;
                                cursor: pointer;
                                &.active{
                                    background: #838FA3;
                                }
                                &.list-group-halfitem{
                                    width: 100%;
                                }
                            }
                        }
                    }
                    .layout-panel-cen{
                        width:100%;
                        height: calc(100% - 380px);
                        display: flex;
                        .panel-cendoor{
                            width: 88px;
                            height: 100%;
                            border-top: 5px solid @lineColor;
                            border-bottom: 5px solid @lineColor;
                            position:relative;
                            &.panel-cendoor-close{
                                border:none;
                                border-right: 5px solid @lineColor;
                                &.panel-cendoor-right{
                                    border:none;
                                    border-right: 5px solid @lineColor;
                                }
                            }
                        }
                        .panel-cendoor:before{
                            content: "";
                            width: 50px;
                            height: 60px;
                            display: block;
                            border: 3px solid @lineColor;
                            border-radius: 0 0 0 100%;
                            border-top: none;
                            border-right: none;
                            position: absolute;
                            left: 0;
                            top: 0;
                        }
                        .panel-cendoor:after{
                            content: "";
                            width: 50px;
                            height: 60px;
                            display: block;
                            border: 3px solid @lineColor;
                            border-radius: 100% 0 0 0;
                            border-bottom: none;
                            border-right: none;
                            position: absolute;
                            left: 0;
                            bottom: 0;
                        }
                        .panel-cendoor-right{
                            transform: rotateY(180deg);
                        }
                        .panel-cendoor-close:before,
                        .panel-cendoor-close:after{
                            border: none;
                        }
                        .panel-cencon{
                            width: calc(100% - 176px);
                            height: 100%;
                            position: relative;
                            .layout-info-show{
                                width: 100%;
                                height: 100%;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                            }
                            .panel-span{
                                position: absolute;
                                &.oglFlip{
                                    transform: rotateX(180deg);
                                }
                            }
                        }
                    }
                    .layout-panel-top{
                        border-bottom: none;
                    }
                    .layout-panel-bottom{
                        border-top: none;
                    }
                    .layout-panel-other{
                        width: 100%;
                        height: 40px;
                        .layout-panel-othercon{
                            width: 100%;
                            height: 100%;
                            position: relative;
                            .panel-span{
                                position: absolute;
                                &.oglFlip{
                                    transform: rotateX(180deg);
                                }
                            }
                        }
                    }
                }
                .layout-box-onepanel{
                    min-width: 300px;
                    max-width: 100%;
                    height: 320px;
                    display: inline-block;
                    position: relative;
                    .layout-panel-cen{
                        width:100%;
                        height: calc(100% - 80px);
                        display: flex;
                        .panel-cencon{
                            border-top: 8px solid @lineColor;
                            border-bottom: 8px solid @lineColor;
                            .layout-list-con{
                                width: 100%;
                                height: 100%;
                                .layout-list-group{
                                    width: 100%;
                                    height: 100%;
                                    display: flex;
                                    .list-group-item{
                                        width: 180%;
                                        height: 100%;
                                        padding: 0 1px;
                                        cursor: pointer;
                                        &.active{
                                            background: #838FA3;
                                        }
                                        &.list-group-halfitem{
                                            width: 100%;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                #canvas-box{
                    width: 100%;
                    height: 100%;
                }
                .layout-echart{
                    width: 100%;
                    display: flex;
                    justify-content: center;
                    height: 170px;
                    .layout-echart-box{
                        width: 33.33%;
                        height:100%;
                        text-align: center;
                        display: flex;
                        justify-content: center;
                        .layout-box-con{
                            min-width: 260px;
                        }
                        .title{
                            width: 100%;
                            height: 25px;
                            text-align: left;
                        }
                        .top{
                            width: 100%;
                            height: 110px;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            .icon{
                                font-size: 70px;
                            }
                            .info{
                                text-align: left;
                                span{
                                    font-size: 30px;
                                    color: @activeColor;
                                }
                            }
                        }
                        .bottom{
                            width: 100%;
                            height: 35px;
                            display: flex;
                            justify-content: center;
                            align-items: baseline;
                            .split{
                                margin: 0 15px;
                            }
                            span{
                                color: @activeColor;
                                font-size: 24px;
                                margin: 0 10px;
                            }
                        }
                    }
                }
            }
        }
    }
</style>