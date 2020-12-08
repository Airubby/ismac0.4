<template>
    <div class="content" @click="hiddenPanel($event)">
        <div class="layout-top">
            <el-button type="primary" plain @click="$router.back(-1)">返回</el-button>
            <div>
                <el-button type="primary" @click="handleSure()">保存</el-button>
                <el-button type="primary" plain @click="handleSet()">布局设置</el-button>
                <el-button type="primary" plain @click="handlePanel($event)">布局面板</el-button>
            </div>
        </div>
        <div class="layout-con">
            <div class="scrollbar" v-scrollBar>
                <div class="layout-box">
                    <div class="layout-box-con">
                        <div class="layout-box-panel" :style="panelStyle">
                            <div class="layout-panel-other">
                                <div class="layout-panel-othercon" 
                                id="panel-topcon"
                                @drop='dragtopDevFinish($event)'
                                @touchstart='dragtopDevFinish($event)'
                                @dragover='allowDrop($event)'>
                                    <span class="panel-span" :class="{'oglFlip':devitem.oglFlip}" :style='panelDevStyle(devitem)' v-for="(devitem,index) in devtopData" :key="index">
                                        <img :src="devitem.imgsrc" draggable="true" @dragstart="dragDevStart($event,devitem)">
                                    </span>
                                </div>
                            </div>
                            <div class="layout-panel-top layout-panel-con">
                                <div class="layout-list-con" 
                                    @drop='dragFinish($event,topData)'
                                    @touchstart='dragFinish($event,topData)'
                                    @dragover='allowDrop($event)'>
                                    <div class="layout-info-show" v-if="topData.length<=0">机柜存放区</div>
                                    <draggable class="layout-list-con" 
                                    :list="topData" 
                                    v-bind="dragOptions"
                                    @start="drag = true"
                                    @end="drag = false"
                                    @change="log" 
                                    handle=".panel-conbox">
                                        <transition-group class="layout-list-group" type="transition" :name="!drag ? 'flip-list' : null">
                                            <template  v-for="(item,tindex) in topData">
                                            <div class="panel-conbox list-group-item" :key="tindex" :class="{'list-group-halfitem':item.type=='kt'}">
                                                <cabinet :type="item.type" :title="item.title" :index="tindex" @close="close(tindex,topData)"></cabinet>
                                            </div>
                                            </template>
                                        </transition-group>
                                    </draggable>
                                </div>
                            </div>
                            <div class="layout-panel-cen">
                                <div class="panel-cendoor" :class="{'panel-cendoor-close':leftDoor}"></div>
                                <div class="panel-cencon"
                                id="panel-con"
                                @drop='dragDevFinish($event)'
                                @touchstart='dragDevFinish($event)'
                                @dragover='allowDrop($event)'>
                                    <div class="layout-info-show" v-if="devData.length<=0">设备存放区</div>
                                    <span class="panel-span" :class="{'oglFlip':devitem.oglFlip}" :style='panelDevStyle(devitem)' v-for="(devitem,index) in devData" :key="index">
                                        <img :src="devitem.imgsrc" draggable="true" @dragstart="dragDevStart($event,devitem)">
                                    </span>
                                </div>
                                <div class="panel-cendoor panel-cendoor-right" :class="{'panel-cendoor-close':rightDoor}"></div>
                            </div>
                            <div class="layout-panel-bottom layout-panel-con">
                                <div class="layout-list-con" 
                                    @drop='dragFinish($event,bottomData)'
                                    @touchstart='dragFinish($event,bottomData)'
                                    @dragover='allowDrop($event)'>
                                    <div class="layout-info-show" v-if="bottomData.length<=0">机柜存放区</div>
                                    <draggable class="layout-list-con" 
                                    :list="bottomData" 
                                    v-bind="dragOptions"
                                    @start="drag = true"
                                    @end="drag = false"
                                    @change="log" 
                                    handle=".panel-conbox">
                                        <transition-group class="layout-list-group" type="transition" :name="!drag ? 'flip-list' : null">
                                            <template  v-for="(item,tindex) in bottomData">
                                            <div class="panel-conbox list-group-item" :key="tindex" :class="{'list-group-halfitem':item.type=='kt'}">
                                                <cabinet :type="item.type" :title="item.title" :index="tindex" @close="close(tindex,bottomData)"></cabinet>
                                            </div>
                                            </template>
                                        </transition-group>
                                    </draggable>
                                </div>
                            </div>
                            <div class="layout-panel-other">
                                <div class="layout-panel-othercon" 
                                id="panel-bottomcon"
                                @drop='dragbottomDevFinish($event)'
                                @touchstart='dragbottomDevFinish($event)'
                                @dragover='allowDrop($event)'>
                                    <span class="panel-span" :class="{'oglFlip':devitem.oglFlip}" :style='panelDevStyle(devitem)' v-for="(devitem,index) in devbottomData" :key="index">
                                        <img :src="devitem.imgsrc" draggable="true" @dragstart="dragDevStart($event,devitem)">
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="detail" id="detail" @click="stopP($event)">
            <div class="side-bar">
                <el-scrollbar class="scrollbar">
                    <el-collapse v-model="activeItem" accordion>
                        <el-collapse-item title="动态柜子" name="first" key="first">
                            <div class="collapse-con">
                                <div class="collapse-box" :key="index" v-for="(item,index) in list" draggable="true" @dragend="dragEnd()" @dragstart="dragStart($event,item)">{{item.title}}</div>
                            </div>
                        </el-collapse-item>
                        <el-collapse-item title="预置柜子" name="second" key="second">
                            <div class="collapse-con">
                                <div class="collapse-box" :key="index" v-for="(item,index) in list" draggable="true" @dragend="dragEnd()" @dragstart="dragStart($event,item)">{{item.title}}</div>
                            </div>
                        </el-collapse-item>
                        <el-collapse-item title="预置设备" name="third" key="third">
                            <div class="collapse-con">
                                <div class="collapse-box" :key="index" v-for="(item,index) in devlist" draggable="true" @dragstart="dragDevStart($event,item)">{{item.title}}</div>
                            </div>
                        </el-collapse-item>
                    </el-collapse>
                </el-scrollbar>
            </div>
        </div>
        <layout-set v-if="layoutInfo.visible" :dialogInfo="layoutInfo" @backInfo="init"></layout-set>
    </div>
</template>
<script>
import Draggable from './component/Draggable'
import LayoutSet from './component/LayoutSet'
import Cabinet from './component/Cabinet'
import uuid from 'uuid-random';
export default {
    components: {LayoutSet,Draggable,Cabinet},
    mixins:[],
    filters:{
        
    },
    created() {
        
    },
    mounted() {
        
    },
    data(){
        return{
            layoutInfo:{
                visible:false,
            },
            activeItem:"third",
            list:[
                {title:'配电单元',type:'pd'},
                {title:'整流柜',type:'zl'},
                {title:'电池柜',type:'dc'},
                {title:'设备单元',type:'jg'},
                {title:'精密空调',type:'kt'},
                {title:'管控单元',type:'gk'},
                {title:'冷量分配单元',type:'llfp'},
                // {title:"柱子",type:""}
            ],
            devlist:[
                {title:'烟感',type:'yg',offsetX:"",oglFlip:false,offsetY:"",imgsrc:"/images/device/smoke.png",imgsrcAlarm:"/images/device/smoke-alarm.png"},
                {title:'漏水',type:'ls',offsetX:"",oglFlip:false,offsetY:"",imgsrc:"/images/device/thalposis.png",imgsrcAlarm:"/images/device/thalposis-alarm.png"},
                {title:'视频',type:'sp',offsetX:"",oglFlip:false,offsetY:"",imgsrc:"/images/device/webcam.png",imgsrcAlarm:"/images/device/webcam-alarm.png"}
            ],
            leftDoor:false,
            rightDoor:false,
            drag: false,
            activeDrag:null,
            topData:[],
            bottomData:[],
            activeDevDrag:null,
            devData:[],
            devtopData:[],
            devbottomData:[]
        }
    },
    computed: {
        dragOptions() {
            return {
                animation: 200,
                group: "description", //多个draggable时，group相同才能相互拖拽
                disabled: false,
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
	methods: {
        init:function(info){
            console.log(info)
        },
        dragStart:function(evt,item){
            this.activeDrag=item;
        },
        dragEnd:function(){
            this.activeDrag=null;
        },
        dragFinish:function(evt,data){
            console.log(this.activeDrag)
            if(this.activeDrag){
                data.push(this.activeDrag)
            }
        },
        allowDrop:function (ev) {
            ev.preventDefault();
        },
        stopP:function(ev){
            ev.stopPropagation();
        },
        dragDevStart:function(evt,item){
            console.log(item)
            evt.dataTransfer.setData("data",JSON.stringify(item));
            this.activeDevDrag=evt;
        },
        dragDevFinish:function(ev){
            this.handleDevFinish(ev,"panel-con",this.devData)
        },
        dragtopDevFinish:function(ev){
            this.handleDevFinish(ev,"panel-topcon",this.devtopData)
        },
        dragbottomDevFinish:function(ev){
            this.handleDevFinish(ev,"panel-bottomcon",this.devbottomData)
        },
        handleDevFinish:function(ev,domID,devData){
            let item = JSON.parse(ev.dataTransfer.getData("data"));
            if(item.id){
                let width=document.getElementById(domID).offsetWidth;
                let height=document.getElementById(domID).offsetHeight;
                if(ev.clientX<this.activeDevDrag.clientX){ //向左拖动
                    if(ev.offsetX-this.activeDevDrag.offsetX<0){ //左边拖出地图了，或者向左拖动了一点点
                        if(ev.x+this.activeDevDrag.offsetX>this.activeDevDrag.x){ //向左移动了一点
                            item.offsetX=item.offsetX-(this.activeDevDrag.offsetX-ev.offsetX)<0?0:item.offsetX-(this.activeDevDrag.offsetX-ev.offsetX);
                        }else{
                            item.offsetX=0;
                        }
                    }else{
                        item.offsetX=ev.offsetX-this.activeDevDrag.offsetX
                    }
                }else{ //向右拖动
                    if(ev.offsetX<this.activeDevDrag.target.offsetWidth){ //拖动了一点点
                        if(this.activeDevDrag.target.offsetLeft+(ev.offsetX-this.activeDevDrag.offsetX)>width-this.activeDevDrag.target.offsetWidth){
                            item.offsetX=width-this.activeDevDrag.target.offsetWidth;
                        }else{
                            item.offsetX=this.activeDevDrag.target.offsetLeft+(ev.offsetX-this.activeDevDrag.offsetX);
                        }
                    }else{
                        if(ev.offsetX+(this.activeDevDrag.target.offsetWidth-this.activeDevDrag.offsetLeft)>width-this.activeDevDrag.target.offsetWidth){
                            item.offsetX=width-this.activeDevDrag.target.offsetWidth;
                        }else{
                            item.offsetX=ev.offsetX-this.activeDevDrag.offsetX
                        }
                    }
                }
                if(ev.clientY<this.activeDevDrag.clientY){ //向上拖动
                    if(ev.offsetY-this.activeDevDrag.offsetY<0){ //上边拖出地图了，或者向上拖动了一点点
                        if(ev.y+this.activeDevDrag.offsetY>this.activeDevDrag.y){ //向上移动了一点
                            item.offsetY=item.offsetY-(this.activeDevDrag.offsetY-ev.offsetY)<0?0:item.offsetY-(this.activeDevDrag.offsetY-ev.offsetY);
                        }else{
                            item.offsetY=0;
                        }
                    }else{
                        item.offsetY=ev.offsetY-this.activeDevDrag.offsetY;
                    }
                }else{ //向下拖动
                    if(ev.offsetY<this.activeDevDrag.target.offsetHeight){  //拖动一点点
                        if(item.offsetY+(ev.offsetY-this.activeDevDrag.offsetY)>height-this.activeDevDrag.target.offsetHeight){
                            item.offsetY=height-this.activeDevDrag.target.offsetHeight;
                        }else{
                            item.offsetY=item.offsetY+(ev.offsetY-this.activeDevDrag.offsetY);
                        }
                    }else{
                        if(ev.offsetY+(this.activeDevDrag.target.offsetHeight-this.activeDevDrag.offsetY)>height-this.activeDevDrag.target.offsetHeight){
                            item.offsetY=height-this.activeDevDrag.target.offsetHeight;
                        }else{
                            item.offsetY=ev.offsetY-this.activeDevDrag.offsetY;
                        }
                    }
                }
                for(let i=0;i<devData.length;i++){
                    if(item.id==devData[i].id){
                        devData[i].offsetX=item.offsetX;
                        devData[i].offsetY=item.offsetY;
                    }
                }
            }else{
                item.offsetX=ev.offsetX;
                item.offsetY=ev.offsetY;
                item.id=uuid();
                devData.push(item)
            }
        },
        handleSure:function(){

        },
        handleSet:function(){
            this.layoutInfo.visible=true;
        },
        hiddenPanel:function(){
            // for(let i=0;i<this.$el.querySelectorAll('.panel-conbox').length;i++){
            //     this.$el.querySelectorAll(".panel-conbox")[i].classList.remove("active");
            // }
            this.$el.querySelector("#detail").style.right="-200px";
        },
        handlePanel:function(ev){
            ev.stopPropagation();
            this.$el.querySelector("#detail").style.right="0px";
        },  
        close:function(index,data){
            data.splice(index, 1);
            console.log(this.topData);
        },
        log: function(evt) {
            console.log(evt);
        }
	},
    
}
</script>
<style lang="less" scoped>
    .module-theme(...){
        .layout-top{
            display: flex;
            justify-content: space-between;
            margin-bottom: @boxMargin;
        }
        .layout-con{
            width: 100%;
            height: calc(100% - 50px);
            position: relative;
        }
        .layout-box{
            width: 100%;
            height: 100%;
            display: table;
            .layout-box-con{
                display: table-cell;
                vertical-align: middle;
                text-align: center;
                .layout-box-panel{
                    min-width: 600px;
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
                                cursor: move;
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
                        padding: 0 80px;
                        .layout-panel-othercon{
                            width: 100%;
                            height: 100%;
                            position: relative;
                            .panel-span{
                                position: absolute;
                                cursor: move;
                                &.oglFlip{
                                    transform: rotateX(180deg);
                                }
                            }
                        }
                    }
                }
            }
        }
        .detail{
            width: 200px;
            height: 100%;
            position: absolute;
            right: -200px;
            top:0;
            background: @normalBg;
            color:@color;
            z-index: 999;
            transition: All 0.4s ease-in-out;
            .side-bar{
                width: 100%;
                height: 100%;
                display: block;
                z-index: 999;
                transition: all 0.5s ease-in;
                .collapse-con{
                    padding: 10px 10px 0;
                    .collapse-box{
                        width: 100%;
                        margin: 5px 0;
                        padding: 0 10px;
                        color: @color;
                        cursor: move;
                        &:hover{
                            background: @activeBg;
                            color: @activeColor;
                        }
                    }
                }
                /deep/ .el-collapse{
                    border-color: @normalBg;
                }
                /deep/ .el-collapse-item__header {
                    background: @activeBg;
                    color: @color;
                    border-bottom-color: @normalBg;
                    padding-left: 20px;
                }
                /deep/ .el-collapse-item__wrap{
                    background-color: @normalBg;
                    border-color: @normalBg;
                }
                /deep/ .el-collapse-item__arrow{
                    font-size: 16px;
                }
                /deep/ .el-collapse-item.is-active .el-collapse-item__header{
                    color: @activeColor;
                }
                /deep/ .el-scrollbar__wrap{
                    overflow-x: hidden; 
                }
                /deep/ .el-collapse-item__content{
                    padding-bottom: 10px;
                }
            }
        }
    }
</style>