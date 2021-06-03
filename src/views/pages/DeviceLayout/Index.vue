<template>
    <div class="content">
        <div class="layout-top">
            <el-button type="primary" plain @click="enterEdit" v-permission="['edit']">编辑布局</el-button>
        </div>
        <div class="layout-con">
            <div class="scrollbar" v-scrollBar>
                <div class="layout-box">
                    <div class="layout-box-con">
                        <div class="layout-box-panel layout-box-onepanel" :style="panelStyle" v-if="editType=='one'">
                            <div class="layout-panel-other">
                                <div class="layout-panel-othercon">
                                    <span class="panel-span" :class="{'oglFlip':devitem.oglFlip}" :style='panelDevStyle(devitem)' v-for="(devitem,index) in devtopData" :key="index">
                                        <img :src="imgsrc(devitem)" >
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
                                                        <cabinet :background="background(item)" :name="item.name" :index="tindex"></cabinet>
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
                                        <img :src="imgsrc(devitem)">
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div class="layout-box-panel" :style="panelStyle" v-if="editType=='two'">
                            <div class="layout-panel-other">
                                <div class="layout-panel-othercon">
                                    <span class="panel-span" :class="{'oglFlip':devitem.oglFlip}" :style='panelDevStyle(devitem)' v-for="(devitem,index) in devtopData" :key="index">
                                        <img :src="imgsrc(devitem)">
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
                                                <cabinet :background="background(item)" :name="item.name" :index="tindex"></cabinet>
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
                                        <img :src="imgsrc(devitem)">
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
                                                <cabinet :background="background(item)" :name="item.name" :index="tindex"></cabinet>
                                            </div>
                                            </template>
                                        </transition-group>
                                    </draggable>
                                </div>
                            </div>
                            <div class="layout-panel-other">
                                <div class="layout-panel-othercon">
                                    <span class="panel-span" :class="{'oglFlip':devitem.oglFlip}" :style='panelDevStyle(devitem)' v-for="(devitem,index) in devbottomData" :key="index">
                                        <img :src="imgsrc(devitem)">
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div v-if="editType=='auto'" id="canvas-box">
                            <canvas id="designCanvas"></canvas>
                        </div>
                        <div class="bipv-box" v-show="editType=='bipv'">
                            <div class="bipv-box-con">
                                <div class="bipv-box-panel" id="devtopDatabipv">
                                    <span class="panel-span" :style='panelDevStyle(devitem)' v-for="(devitem,index) in devtopData" :key="index">
                                        <i class="el-icon-delete icon-btn"></i>
                                        <img :src="imgsrc(devitem)" :title="devitem.name" @click="devClick($event,devitem,'devtopData')">
                                    </span>
                                </div>
                                
                                <div class="cabinet">
                                    <div class="cabinet-con" v-if="cabinetU.length>0">
                                        <div v-for="(item,index) in cabinetU" class="cabinet-u" :key="index">
                                            <div class="cabinet-number" :class="{'firstU':index==0,'lastU':index==cabinetU.length-1}">
                                                <span class="cabinet-number-box">{{item.index}}</span>
                                                <span class="cabinet-number-box cabinet-number-boxr">
                                                    {{item.index}}
                                                </span>
                                            </div>
                                        </div>
                                        <div class="bipv-list-con">
                                            <div class="bipv-list-drag">
                                                <template  v-for="(item,tindex) in devData">
                                                    <div class="panel-conbox bipv-group-item" :style="cabinetStyle(item)" @click="devClick($event,item,'devData')" :key="tindex">
                                                        <div class="cabinet-con-img" :style="{height:baseHeight*Number(item.ubit)+'px'}">
                                                            <div class="text">{{item.name}}</div>
                                                            <template v-for="index in Number(item.ubit)">
                                                                <img :src="img" draggable=false :style="{bottom:baseHeight*(index-1)+'px'}" :key="index">
                                                            </template>
                                                        </div>
                                                    </div>
                                                </template>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- <div class="layout-echart">
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
                        </div> -->
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
        },
        cabinetStyle(){
            return function(item){
                return `bottom:${item.offsetB}px;`;
            }
        },
        imgsrc(){
            return function(devitem){
                return devitem.isalarm?devitem.imgsrcAlarm:devitem.imgsrc;
            }
        },
        background(){
            return function(item){
                return item.isalarm?item.backgroundAlarm:item.background;
            }
        },
        img(){
            return function(devitem){
                return devitem.isalarm?require('./config/images/UAlarm.png'):require('./config/images/U.png')
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
            design:null,
            initWidth:"",
            initHeight:"",
            panX:0,
            panY:0,

            ubit:null,
            baseHeight:18,
            cabinetU:[],
            color_list:[],
            
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
                if(this.editType=="bipv"){
                    this.ubit=json.ubit;
                    this.initBIPV(json.ubit)
                }
            }
            // this.$api.post("",{}).then(res=>{

            // })
        },
        initBIPV:function(val){
            for(let a=1;a<=val;a++){
                let index=a;
                if(index<10){
                    index="0"+index;
                }
                if(this.color_list.length>0){
                    let flag=false;
                    for(let i=0;i<this.color_list.length;i++){
                        if('L'+a===this.color_list[i].pointid){
                            flag=true;
                            let obj=Object.assign({},this.color_list[i]);
                            obj["index"]=index;
                            obj["show"]=true;
                            this.cabinetU.push(obj);
                        }
                    }
                    if(!flag){
                        this.cabinetU.push({index:index,show:false});
                    }
                }else{
                    this.cabinetU.push({index:index,show:false});
                }
            }
            this.cabinetU.reverse();
        },
        initCanvas:function(json){
            let _this=this;
            console.log(JSON.parse(sessionStorage.getItem("layoutJson")));
            this.design =new fabric.Canvas('designCanvas',{
                hoverCursor:"pointer"
            });
            let dom=document.getElementById("canvas-box");
            this.initWidth=json.initWidth;
            this.initHeight=json.initHeight;
            this.design.setWidth(dom.offsetWidth);
            this.design.setHeight(dom.offsetHeight);
            this.design.loadFromJSON(json.designCanvas, function() {
                _this.resizeCanvas();
                _this.design.forEachObject(item=>{
                    item.set("selectable",false);
                })
                window.onresize=function(){
                    _this.resizeCanvas();
                };
            });
            
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
            });
            _this.design.on('mouse:down', function(opt) {
                var evt = opt.e;
                if(opt.target){
                    console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
                }
            });
            _this.design.on('mouse:up', function(opt) {
                this.isDragging = false;
                this.selection = true;
            });
        },
        resizeCanvas:function(){
            let _this=this;
            let dom=document.getElementById("canvas-box");
            _this.design.setWidth(dom.offsetWidth);
            _this.design.setHeight(dom.offsetHeight);
            //先还原缩放比例与位置
            _this.design.setZoom(1);
            _this.design.absolutePan({x:-_this.initWidth / 2, y:-_this.initHeight / 2});

            let nowWidth=dom.offsetWidth;
            let nowHeight=dom.offsetHeight;
            let zoomX=nowWidth/_this.initWidth;
            let zoomY=nowHeight/_this.initHeight;
            _this.zoom=Math.min(zoomX, zoomY);
            _this.zoomPoint = new fabric.Point(_this.design.width / 2 , _this.design.height / 2);
            //计算平移坐标
            _this.panX=_this.initWidth / 2  - (_this.initWidth-nowWidth)/2;
            _this.panY=_this.initHeight / 2 - (_this.initHeight-nowHeight)/2;
            //开始平移
            _this.design.absolutePan({x:-_this.panX, y:-_this.panY});
            _this.design.zoomToPoint(_this.zoomPoint, _this.zoom);
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
        backWs:function(info){
            let arr=[];
            let _this=this;
            for(let i=0;i<info.length;i++){
                arr=info[i].key.split("_");  //key是源数据data名称（比如topData）加uuid，订阅的时候，一个设备的多个测点都是用的同一个key，无论哪个测点告警都更新这个key对应的设备告警状态
                for(let j=0;j<this[arr[0]].length;j++){
                    if(info[i].key==arr[0]+"_"+this[arr[0]][j].uuid){
                        //测试告警
                        // this[arr[0]][j].isalarm=true;
                        let flag=false;
                        for(let k=0;k<this[arr[0]][j].devInfo.length;k++){
                            if(info[i].devid==this[arr[0]][j].devInfo[k].devid&&info[i].pointid==this[arr[0]][j].devInfo[k].pointid){
                                this[arr[0]][j].devInfo[k].isalarm=info[i].isalarm;
                            }
                            if(this[arr[0]][j].devInfo[k].isalarm){
                                flag=true;
                            }
                        }
                        this[arr[0]][j].isalarm=flag;
                        if(this.editType=="auto"){
                            let objects=this.design.getObjects();
                            let uuid=this[arr[0]][j].uuid;
                            for(let i=0;i<objects.length;i++){
                                if(objects[i].data.uuid==uuid){
                                    let imgsrc=flag?this[arr[0]][j].imgsrcAlarm:this[arr[0]][j].imgsrc;  //测试告警，真实进行判断是否告警进行附图片
                                    let json=objects[i];
                                    json.data.imgsrc=imgsrc;
                                    fabric.Image.fromURL(imgsrc, function(object){
                                        object["data"]=json.data;
                                        object.set({
                                            left: json.left,
                                            top: json.top,
                                        });
                                        object.scaleToWidth(objects[i].width*objects[i].scaleX);
                                        object.scaleToHeight(objects[i].height*objects[i].scaleY);
                                        _this.design.remove(json);
                                        object.set("selectable",false);
                                        _this.addObject(object);
                                    });
                                }
                            }
                        }
                    }
                }
            }
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
                display: flex;
                align-items: center;
                justify-content: center;
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
            .bipv-box{
                .bipv-box-con{
                    width: 400px;
                    padding: 50px 0;
                    margin: 0 auto;
                    position: relative;
                    .bipv-box-panel{
                        width: 100%;
                        height: 100%;
                        position:absolute;
                        top: 0;
                        left: 0;
                        overflow:auto;
                        .panel-span{
                            position: absolute;
                            cursor: move;
                            .icon-btn{
                                position: absolute;
                                top: -8px;
                                right: -8px;
                                display: none;
                                cursor: pointer;
                                color: @color;
                            }
                            &:hover{
                                .icon-btn{
                                    display: block;
                                }
                            }
                            &.oglFlip{
                                transform: rotateX(180deg);
                            }
                        }
                    }
                    .cabinet{
                        width: 192px;
                        padding:6px 6px 15px;
                        background: #141726;
                        margin: 0 auto 15px auto;
                        position: relative;
                        z-index: 9;
                        .cabinet-con{
                            width: 100%;
                            background: #0B0C14;
                            position: relative;
                            .cabinet-u{
                                position: relative;
                                width: 100%;
                                height: 18px;
                                background: #1E2238;
                                border-left: 2px solid #414A75;
                                border-top: 1px solid #0B0C14;
                                border-bottom: 1px solid #0B0C14; 
                                .cabinet-number{
                                    position: absolute;
                                    width: calc(100% + 86px);
                                    height: calc(100% + 2px);
                                    top: -1px;
                                    left: -44px;
                                    .cabinet-number-box{
                                        width: 26px;
                                        height: 100%;
                                        background: #353C66;
                                        color: #6A7498;
                                        text-align: center;
                                        display: block;
                                        position: absolute;
                                        left: 0;
                                    }
                                    .cabinet-number-boxr{
                                        right: 0;
                                        left: auto;
                                        // .radio{
                                        //     display: block;
                                        //     width: 14px;
                                        //     height: 14px;
                                        //     background: #73B34A;
                                        //     border-radius: 50%;
                                        //     position: absolute;
                                        //     top: 2px;
                                        //     left: 35px;
                                        //     cursor: pointer;
                                        //     &.normal{
                                        //         background: #0077E9;
                                        //     }
                                        //     &.alarm{
                                        //         background: #FF4A4A;
                                        //     }
                                        // }
                                    }
                                    &.firstU{
                                        .cabinet-number-box:before{
                                            content: "";
                                            width: 26px;
                                            height: 6px;
                                            background: #353C66;
                                            position: absolute;
                                            left: 0;
                                            top: -6px; 
                                        }
                                    }
                                    &.lastU{
                                        .cabinet-number-box:before{
                                            content: "";
                                            width: 26px;
                                            height: 15px;
                                            background: #353C66;
                                            position: absolute;
                                            left: 0;
                                            bottom: -15px; 
                                        }
                                    }
                                }
                            }
                            .cabinet-con-img{
                                position: relative;
                                width:180px;
                                border-left: 1px solid transparent;
                                border-right: 1px solid transparent;
                                cursor: move;
                                .text{
                                    width: 100%;
                                    height: 100%;
                                    position: relative;
                                    z-index: 9;
                                    display: flex;
                                    justify-content: center;
                                    align-items: center;
                                    font-size: 16px;
                                }
                                &:hover{
                                    border-color: @activeColor;
                                }
                                img{
                                    width: 100%;
                                    height: 18px;
                                    position: absolute;
                                    left: 0;
                                }
                            }
                        }
                        &:before{
                            content: "";
                            width: 20px;
                            height: 100%;
                            background: #353C66;
                        }
                    }
                    .bipv-list-con{
                        position: absolute;
                        top:0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        z-index: 9;
                        .bipv-list-drag{
                            width: 100%;
                            height: 100%;
                            position: relative;
                            .bipv-group-item{
                                position: absolute;
                            }
                        }
                    }
                }
            }
        }
    }
</style>