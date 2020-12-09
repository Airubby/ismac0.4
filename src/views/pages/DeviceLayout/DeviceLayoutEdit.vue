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
                                        <i class="el-icon-delete icon-btn" @click="remove(index,devtopData)"></i>
                                        <img :src="devitem.imgsrc" @dblclick="devClick(devitem,'devtopData')" draggable="true" @dragstart="dragDevStart($event,devitem)">
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
                                            <div class="panel-conbox list-group-item" @dblclick="devClick(item,'topData')" :key="tindex" :class="{'list-group-halfitem':item.category=='kt'}">
                                                <cabinet :background="item.background" :name="item.name" :showClose="true" :index="tindex" @close="remove(tindex,topData)"></cabinet>
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
                                        <i class="el-icon-delete icon-btn" @click="remove(index,devData)"></i>
                                        <img :src="devitem.imgsrc" @dblclick="devClick(devitem,'devData')" draggable="true" @dragstart="dragDevStart($event,devitem)">
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
                                            <div class="panel-conbox list-group-item" @dblclick="devClick(item,'bottomData')" :key="tindex" :class="{'list-group-halfitem':item.category=='kt'}">
                                                <cabinet :background="item.background" :name="item.name" :showClose="true" :index="tindex" @close="remove(tindex,bottomData)"></cabinet>
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
                                        <i class="el-icon-delete icon-btn" @click="remove(index,devbottomData)"></i>
                                        <img :src="devitem.imgsrc" @dblclick="devClick(devitem,'devbottomData')" draggable="true" @dragstart="dragDevStart($event,devitem)">
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
                                <div class="collapse-box" :key="index" v-for="(item,index) in list" draggable="true" @dragend="dragEnd()" @dragstart="dragStart($event,item)">{{item.name}}</div>
                            </div>
                        </el-collapse-item>
                        <el-collapse-item title="预置柜子" name="second" key="second">
                            <div class="collapse-con">
                                <div class="collapse-box" :key="index" v-for="(item,index) in list" draggable="true" @dragend="dragEnd()" @dragstart="dragStart($event,item)">{{item.name}}</div>
                            </div>
                        </el-collapse-item>
                        <el-collapse-item title="预置设备" name="third" key="third">
                            <div class="collapse-con">
                                <div class="collapse-box" :key="index" v-for="(item,index) in devlist" draggable="true" @dragstart="dragDevStart($event,item)">{{item.name}}</div>
                            </div>
                        </el-collapse-item>
                    </el-collapse>
                </el-scrollbar>
            </div>
        </div>
        <layout-set v-if="layoutInfo.visible" :dialogInfo="layoutInfo" @backInfo="reset"></layout-set>
        <rack-dev-set v-if="rackDevInfo.visible" :dialogInfo="rackDevInfo" @backInfo="changeInfo"></rack-dev-set>
    </div>
</template>
<script>
import Draggable from './component/Draggable'
import LayoutSet from './component/LayoutSet'
import Cabinet from './component/Cabinet'
import RackDevSet from './component/RackDevSet'
import uuid from 'uuid-random';
export default {
    components: {LayoutSet,Draggable,Cabinet,RackDevSet},
    mixins:[],
    filters:{
        
    },
    created() {
        let params = this.$route.query.params;
        if(params){
            this.hint="edit";
            this.init(JSON.parse(params).id)
        }
    },
    mounted() {
        
    },
    data(){
        return{
            hint:"add",
            layoutInfo:{
                visible:false,
            },
            activeItem:"third",
            list:[
                {name:'配电单元',devid:"",pointid:"",background:""},
                {name:'整流柜',devid:"",pointid:"",background:""},
                {name:'电池柜',devid:"",pointid:"",background:""},
                {name:'设备单元',devid:"",pointid:"",background:""},
                {name:'精密空调',devid:"",pointid:"",background:""},
                {name:'管控单元',devid:"",pointid:"",background:""},
                {name:'冷量分配单元',devid:"",pointid:"",background:""},
            ],
            devlist:[
                {name:'烟感',offsetX:"",oglFlip:false,offsetY:"",imgsrc:"/images/device/smoke.png",imgsrcAlarm:"/images/device/smoke-alarm.png"},
                {name:'漏水',offsetX:"",oglFlip:false,offsetY:"",imgsrc:"/images/device/thalposis.png",imgsrcAlarm:"/images/device/thalposis-alarm.png"},
                {name:'视频',offsetX:"",oglFlip:false,offsetY:"",imgsrc:"/images/device/webcam.png",imgsrcAlarm:"/images/device/webcam-alarm.png"}
            ],
            drag: false,
            activeDrag:null,
            activeDevDrag:null,

            editType:"",
            leftDoor:false,
            rightDoor:false,
            topData:[],
            bottomData:[],
            devData:[],
            devtopData:[],
            devbottomData:[],

            rackDevInfo:{
                visible:false,
                item:null,
                type:null
            }
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
        init:function(){
            let layoutJson=sessionStorage.getItem("layoutJson");
            console.log(layoutJson)
            if(layoutJson){
                let json=JSON.parse(layoutJson);
                this.editType=json.editType;
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
        devClick:function(item,type){
            this.rackDevInfo.item=item;
            this.rackDevInfo.type=type;
            this.rackDevInfo.visible=true;
        },
        changeInfo:function(info){
            for(let i=0;i<this[info.type].length;i++){
                if(info.uuid==this[info.type][i].uuid){
                    this[info.type][i]=Object.assign(this[info.type][i],info);
                }
            }
        },
        reset:function(info){
            console.log(info)
            this.editType=info.type;
            this.leftDoor=false;
            this.rightDoor=false;
            this.topData=[];
            this.bottomData=[];
            this.devData=[];
            this.devtopData=[];
            this.devbottomData=[];
        },
        handleSure:function(){
            let json={
                editType:this.editType,
                leftDoor:this.leftDoor,
                rightDoor:this.rightDoor,
                topData:this.topData,
                bottomData:this.bottomData,
                devData:this.devData,
                devtopData:this.devtopData,
                devbottomData:this.devbottomData,
            }
            sessionStorage.setItem("layoutJson",JSON.stringify(json));
            this.$message.success("保存成功");
            // this.$api.post("",{json:JSON.stringify(json)}).then(res=>{

            // })
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
                this.activeDrag["uuid"]=uuid();
                data.push(JSON.parse(JSON.stringify(this.activeDrag)))
            }
        },
        allowDrop:function (ev) {
            ev.preventDefault();
        },
        stopP:function(ev){
            ev.stopPropagation();
        },
        dragDevStart:function(evt,item){
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
            let data=ev.dataTransfer.getData("data");
            if(data){
                let item = JSON.parse(data);
                if(item.uuid){
                    let width=document.getElementById(domID).offsetWidth;
                    let height=document.getElementById(domID).offsetHeight;
                    //拖拽的设备点击的那个点相对于设备自己的偏移this.img_ev.offsetX,this.img_ev.offsetY
                    //拖拽的设备点击的那个点相对于右边电子地图的偏移量，拖拽后放手的那刻ev.offsetX,ev.offsetY
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
                        if(item.uuid==devData[i].uuid){
                            devData[i].offsetX=item.offsetX;
                            devData[i].offsetY=item.offsetY;
                        }
                    }
                }else{
                    item.offsetX=ev.offsetX;
                    item.offsetY=ev.offsetY;
                    item.uuid=uuid();
                    devData.push(item)
                }
            }
        },
        handleSet:function(){
            this.layoutInfo.visible=true;
        },
        hiddenPanel:function(){
            this.$el.querySelector("#detail").style.right="-200px";
        },
        handlePanel:function(ev){
            ev.stopPropagation();
            this.$el.querySelector("#detail").style.right="0px";
        },  
        remove:function(index,data){
            data.splice(index, 1);
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
                    min-width: 300px;
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