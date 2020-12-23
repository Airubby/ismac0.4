<template>
    <div class="content">
        <div class="layout-top">
            <el-button type="primary" plain @click="$router.back(-1)">返回</el-button>
            <div>
                <el-button type="primary" @click="test()">测试</el-button>
                <el-button type="primary" @click="handleSure()">保存</el-button>
                <el-button type="primary" plain @click="handleSet()">布局设置</el-button>
                <el-button type="primary" plain @click="handlePanel($event)">布局面板</el-button>
            </div>
        </div>
        <div class="layout-con">
            <div class="scrollbar" v-scrollBar>
                <div v-show="editType=='auto'" id="canvas-box" @drop='drop($event)' @touchstart='drop($event)' @dragover='allowDrop($event)'>
                    <canvas id="designCanvas"></canvas>
                </div>
                <div class="layout-box" v-show="editType=='one'||editType=='two'" @click="hiddenPanel($event)">
                    <div class="layout-box-con">
                        <div class="layout-box-panel layout-box-onepanel" :style="panelStyle" v-show="editType=='one'">
                            <div class="layout-panel-other">
                                <div class="layout-panel-othercon" id="devtopData"
                                @drop='dragDevFinish($event,"devtopData")'
                                @touchstart='dragDevFinish($event,"devtopData")'
                                @dragover='allowDrop($event)'>
                                    <span class="panel-span" :style='panelDevStyle(devitem)' v-for="(devitem,index) in devtopData" :key="index">
                                        <i class="el-icon-delete icon-btn" @click="remove(index,devtopData)"></i>
                                        <img :src="devitem.imgsrc" :title="devitem.name" @click="devClick($event,devitem,'devtopData')" draggable="true" @dragstart="dragDevStart($event,devitem,'devtopData')">
                                    </span>
                                </div>
                            </div>
                            <div class="layout-panel-cen">
                                <div class="panel-cendoor" :class="{'panel-cendoor-close':leftDoor}"></div>
                                <div class="panel-cencon">
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
                                        handle=".panel-conbox">
                                            <transition-group class="layout-list-group" type="transition" :name="!drag ? 'flip-list' : null">
                                                <template  v-for="(item,tindex) in topData">
                                                <div class="panel-conbox list-group-item" @click="devClick($event,item,'topData')" :key="tindex" :class="{'list-group-halfitem':item.category=='air'}">
                                                    <cabinet :background="item.background" :name="item.name" :showClose="true" :index="tindex" @close="remove(tindex,topData)"></cabinet>
                                                </div>
                                                </template>
                                            </transition-group>
                                        </draggable>
                                    </div>
                                </div>
                                <div class="panel-cendoor panel-cendoor-right" :class="{'panel-cendoor-close':rightDoor}"></div>
                            </div>
                            <div class="layout-panel-other">
                                <div class="layout-panel-othercon" id="devbottomData"
                                @drop='dragDevFinish($event,"devbottomData")'
                                @touchstart='dragDevFinish($event,"devbottomData")'
                                @dragover='allowDrop($event)'>
                                    <span class="panel-span" :style='panelDevStyle(devitem)' v-for="(devitem,index) in devbottomData" :key="index">
                                        <i class="el-icon-delete icon-btn" @click="remove(index,devbottomData)"></i>
                                        <img :src="devitem.imgsrc" :title="devitem.name" @click="devClick($event,devitem,'devbottomData')" draggable="true" @dragstart="dragDevStart($event,devitem,'devbottomData')">
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div class="layout-box-panel" :style="panelStyle" v-show="editType=='two'">
                            <div class="layout-panel-other">
                                <div class="layout-panel-othercon" id="devtopData"
                                @drop='dragDevFinish($event,"devtopData")'
                                @touchstart='dragDevFinish($event,"devtopData")'
                                @dragover='allowDrop($event)'>
                                    <span class="panel-span" :style='panelDevStyle(devitem)' v-for="(devitem,index) in devtopData" :key="index">
                                        <i class="el-icon-delete icon-btn" @click="remove(index,devtopData)"></i>
                                        <img :src="devitem.imgsrc" :title="devitem.name" @click="devClick($event,devitem,'devtopData')" draggable="true" @dragstart="dragDevStart($event,devitem,'devtopData')">
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
                                    handle=".panel-conbox">
                                        <transition-group class="layout-list-group" type="transition" :name="!drag ? 'flip-list' : null">
                                            <template  v-for="(item,tindex) in topData">
                                            <div class="panel-conbox list-group-item" @click="devClick($event,item,'topData')" :key="tindex" :class="{'list-group-halfitem':item.category=='air'}">
                                                <cabinet :background="item.background" :name="item.name" :showClose="true" :index="tindex" @close="remove(tindex,topData)"></cabinet>
                                            </div>
                                            </template>
                                        </transition-group>
                                    </draggable>
                                </div>
                            </div>
                            <div class="layout-panel-cen">
                                <div class="panel-cendoor" :class="{'panel-cendoor-close':leftDoor}"></div>
                                <div class="panel-cencon" id="devData"
                                @drop='dragDevFinish($event,"devData")'
                                @touchstart='dragDevFinish($event,"devData")'
                                @dragover='allowDrop($event)'>
                                    <div class="layout-info-show" v-if="devData.length<=0">设备存放区</div>
                                    <span class="panel-span" :style='panelDevStyle(devitem)' v-for="(devitem,index) in devData" :key="index">
                                        <i class="el-icon-delete icon-btn" @click="remove(index,devData)"></i>
                                        <img :src="devitem.imgsrc" :title="devitem.name" @click="devClick($event,devitem,'devData')" draggable="true" @dragstart="dragDevStart($event,devitem,'devData')">
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
                                    handle=".panel-conbox">
                                        <transition-group class="layout-list-group" type="transition" :name="!drag ? 'flip-list' : null">
                                            <template  v-for="(item,tindex) in bottomData">
                                            <div class="panel-conbox list-group-item" @click="devClick($event,item,'bottomData')" :key="tindex" :class="{'list-group-halfitem':item.category=='air'}">
                                                <cabinet :background="item.background" :name="item.name" :showClose="true" :index="tindex" @close="remove(tindex,bottomData)"></cabinet>
                                            </div>
                                            </template>
                                        </transition-group>
                                    </draggable>
                                </div>
                            </div>
                            <div class="layout-panel-other">
                                <div class="layout-panel-othercon" id="devbottomData"
                                @drop='dragDevFinish($event,"devbottomData")'
                                @touchstart='dragDevFinish($event,"devbottomData")'
                                @dragover='allowDrop($event)'>
                                    <span class="panel-span" :style='panelDevStyle(devitem)' v-for="(devitem,index) in devbottomData" :key="index">
                                        <i class="el-icon-delete icon-btn" @click="remove(index,devbottomData)"></i>
                                        <img :src="devitem.imgsrc" :title="devitem.name" @click="devClick($event,devitem,'devbottomData')" draggable="true" @dragstart="dragDevStart($event,devitem,'devbottomData')">
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="detail" id="detail" @click="stopP($event)">
            <div class="side-bar" v-show="isPanel">
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
                                <div class="collapse-boximg" :key="index" v-for="(item,index) in devlist" draggable="true" @dragstart="dragDevStart($event,item)">
                                    <img :src="item.imgsrc" :title="item.name" />
                                </div>
                            </div>
                        </el-collapse-item>
                    </el-collapse>
                </el-scrollbar>
            </div>
            <div v-show="!isPanel" class="side-bar">
                <div class="edit-form">
                    <el-scrollbar class="scrollbar">
                        <div class="edit-form-con">
                            <el-form ref="ValidateForm" :model="initParams" :rules="rules" label-position="top">
                                <el-row :gutter="30">
                                    <el-col :span="24">
                                        <el-form-item label='名称' prop="name">
                                            <el-input v-model="initParams.name"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <div v-if="type=='topData'||type=='bottomData'">
                                        <el-col :span="24">
                                            <el-form-item label='类型' prop="category">
                                                <el-select v-model="initParams.category" placeholder="请选择">
                                                    <el-option key="air" label="空调" value="air"></el-option>
                                                    <el-option key="rack" label="柜子" value="rack"></el-option>
                                                </el-select>
                                            </el-form-item>
                                        </el-col>
                                        <el-col :span="24">
                                            <el-form-item label='背景色' prop="background">
                                                <el-color-picker v-model="initParams.background" :predefine="predefineColors"></el-color-picker>
                                            </el-form-item>
                                        </el-col>
                                    </div>
                                    <div v-if="initParams.type&&initParams.type=='video'">
                                        <el-col :span="24">
                                            <el-form-item label='关联视频通道' prop="pointid" class="height-auto">
                                                <el-tree
                                                    :data="videoTree"
                                                    show-checkbox
                                                    node-key="id"
                                                    ref="videotree"
                                                    :default-checked-keys="initParams.pointid"
                                                    :props="defaultProps"
                                                    @check-change="handleCheckChange">
                                                </el-tree>
                                            </el-form-item>
                                        </el-col>
                                    </div>
                                    <div v-else>
                                        <el-col :span="24">
                                            <el-form-item label='关联设备' prop="devid">
                                                <el-select
                                                    v-model="initParams.devid"
                                                    multiple
                                                    collapse-tags>
                                                    <el-option
                                                    v-for="item in devOptions"
                                                    :key="item.id"
                                                    :label="item.name"
                                                    :value="item.id">
                                                    </el-option>
                                                </el-select>
                                            </el-form-item>
                                        </el-col>
                                        <el-col :span="24">
                                            <el-form-item label='关联测点' prop="pointid" class="height-auto">
                                                <el-tree
                                                    :data="pointTree"
                                                    show-checkbox
                                                    node-key="id"
                                                    ref="tree"
                                                    :default-checked-keys="initParams.pointid"
                                                    :props="defaultProps">
                                                </el-tree>
                                            </el-form-item>
                                        </el-col>
                                    </div>
                                </el-row>
                            </el-form>
                        </div>
                    </el-scrollbar>
                </div>
                <div class="edit-btn">
                    <el-button type="primary" plain @click="sureEdit()">保存</el-button>
                </div>
            </div>
        </div>
        <layout-set v-if="layoutInfo.visible" :dialogInfo="layoutInfo" @backInfo="reset"></layout-set>
        <rack-dev-set v-if="rackDevInfo.visible" :dialogInfo="rackDevInfo" @backInfo="changeInfo"></rack-dev-set>
    </div>
</template>
<script>
import { fabric } from "fabric";
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
        
    },
    mounted() {
        let params = this.$route.query.params;
        if(params){
            this.hint="edit";
            this.init(JSON.parse(params).id)
        }
    },
    data(){
        return{
            hint:"add",
            layoutInfo:{
                visible:false,
            },
            activeItem:"third",
            isPanel:true,
            predefineColors:["#D8645B","#8CBECF","#F2B747","#588EEA","#75B899","#55A1E2"],
            type:"",
            initParams:{
                name:"",
                category:"rack",
                background:"",
                devid:[],
                pointid:[],
                devInfo:[],
                type:"",
            },
            rules: {
                name:[
                    { required: true, message: '非空', trigger: 'blur' },
                ],
                category:[
                    { required: true, message: '非空', trigger: 'blur' },
                ]
            },
            list:[
                {name:'配电单元',devInfo:[],devid:[],pointid:[],background:""},
                {name:'整流柜',devInfo:[],devid:[],pointid:[],background:""},
                {name:'电池柜',devInfo:[],devid:[],pointid:[],background:""},
                {name:'设备单元',devInfo:[],devid:[],pointid:[],background:""},
                {name:'精密空调',devInfo:[],devid:[],pointid:[],background:""},
                {name:'管控单元',devInfo:[],devid:[],pointid:[],background:""},
                {name:'冷量分配单元',devInfo:[],devid:[],pointid:[],background:""},
            ],
            devlist:[
                {
                    name:'烟感',offsetX:"",devInfo:[],offsetY:"",devid:[],pointid:[],
                    imgsrc:"/images/device/smoke.png",imgsrcAlarm:"/images/device/smoke-alarm.png"
                },
                {
                    name:'漏水',offsetX:"",devInfo:[],offsetY:"",devid:[],pointid:[],
                    imgsrc:"/images/device/thalposis.png",imgsrcAlarm:"/images/device/thalposis-alarm.png"
                },
                {
                    name:'视频',offsetX:"",devInfo:[],offsetY:"",devid:[],pointid:[],video:{},type:"video",
                    imgsrc:"/images/device/webcam.png",imgsrcAlarm:"/images/device/webcam-alarm.png"
                },
            ],

            
            drag: false,
            activeDrag:null,
            activeDevDrag:null,
            activeDevitemDrag:null,
            activeDevdataDrag:null,

            editType:"auto",
            leftDoor:true,
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
            },

            devOptions:[
                {id:"1",name:"设备1"},{id:"2",name:"设备2"},{id:"3",name:"设备3"},{id:"4",name:"设备4"}
            ],
            defaultProps: {
                children: 'children',
                label: 'name'
            },
            pointTree:[],
            videoTree:[],
            isVideo:false,

            zoomPoint:"",//中心点
            zoom:1, //缩放比例
            viewportTransform:null, //拖动画布后，存的距离上左的间距arr[0]比率；arr[4]左右移动的距离；arr[5]上下移动距离
            design:null,
            initWidth:"",
            initHeight:""
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
            if(layoutJson){
                let json=JSON.parse(layoutJson);
                this.editType=json.editType;
                if(this.editType=="auto"){
                    this.$nextTick(()=>{
                        document.getElementById("canvas-box").innerHTML='<canvas id="designCanvas"></canvas>';
                        this.initCanvas();
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
        devClick:function(ev,item,type){
            console.log(item)
            this.type=type;
            this.initParams=Object.assign(this.initParams,item);
            this.initParams.type=item.type?item.type:"";
            this.isPanel=false;
            ev.stopPropagation();
            this.$el.querySelector("#detail").style.right="0px";
        },
        changeDev:function(info){
            console.log(info)
            let point=[
                {
                    id: "1",
                    name: '设备1',
                    children: [
                        {
                            id: "11",
                            name: '测点 1-1',
                        },
                        {
                            id: "12",
                            name: '测点 1-2',
                        }
                    ]
                }, 
                {
                    id: "2",
                    name: '设备2',
                    children: [
                        {
                            id: "21",
                            name: '测点 2-1',
                        },
                        {
                            id: "22",
                            name: '测点 2-2',
                        }
                    ]
                }, 
                {
                    id: "3",
                    name: '设备3',
                    children: [
                        {
                            id: "31",
                            name: '测点 3-1',
                        }
                    ]
                }, 
                {
                    id: "4",
                    name: '设备4',
                    children: [
                        {
                            id: "41",
                            name: '测点 4-1',
                        }
                    ]
                }
            ]
            let arr=[];
            for(let i=0;i<info.length;i++){
                for(let j=0;j<point.length;j++){
                    if(info[i]==point[j].id){
                        arr.push(point[j]);
                    }
                }
            }
            this.pointTree=arr;
        },
        handleCheckChange:function(node,checked){
            if(this.$refs.videotree.getCheckedNodes().length%2===0){
                if(checked){
                    this.$refs.videotree.setCheckedNodes([node]);
                }else{
                    this.$refs.videotree.setCheckedNodes([]);
                }        
            }
        },
        sureEdit:function(){
            console.log(this.$refs.tree.getCheckedNodes())
            if(this.initParams.type&&this.initParams.type=="video"){
                this.initParams.devInfo=this.$refs.videotree.getCheckedNodes();
            }else{
                let checkNode=this.$refs.tree.getCheckedNodes(),arr=[];
                for(let i=0;i<checkNode.length;i++){
                    if(!checkNode.children||checkNode.children.length==0){
                        arr.push(checkNode[i]);
                    }   
                }
                this.initParams.pointid=this.$refs.tree.getCheckedKeys();
                this.initParams.devInfo=arr;
            }
            
            for(let i=0;i<this[this.type].length;i++){
                if(this.initParams.uuid==this[this.type][i].uuid){
                    this[this.type][i]=Object.assign(this[this.type][i],this.initParams);
                }
            }
            this.hiddenPanel();
        },
        changeInfo:function(info){
            for(let i=0;i<this[info.type].length;i++){
                if(info.uuid==this[info.type][i].uuid){
                    this[info.type][i]=Object.assign(this[info.type][i],info);
                }
            }
        },
        reset:function(info){
            this.editType=info.type;
            if(this.editType=="auto"){
                this.$nextTick(()=>{
                    document.getElementById("canvas-box").innerHTML='<canvas id="designCanvas"></canvas>';
                    this.initCanvas();
                })
                return;
            }else{
                if(document.getElementById("canvas-box"))document.getElementById("canvas-box").innerHTML="";
            }
            this.leftDoor=true;
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
            if(this.editType=="auto"){
                json["designCanvas"]=this.design.toDatalessJSON();
                json["initWidth"]=this.initWidth;
                json["initHeight"]=this.initHeight;
            }
            sessionStorage.setItem("layoutJson",JSON.stringify(json));
            console.log(JSON.stringify(json));
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
        dragDevStart:function(evt,item,dataArr){
            evt.dataTransfer.setData("data",JSON.stringify(item));
            this.activeDevDrag=evt;
            this.activeDevitemDrag=item;
            this.activeDevdataDrag=dataArr;
        },
        dragDevFinish:function(ev,dataArr){
            //data是数据源的key也是dom的id；用的同一个名称
            if(this.activeDevitemDrag){
                if(this.activeDevdataDrag==undefined){ //初次拖进来
                    this.handleDevFinish(ev,dataArr,this[dataArr]);
                }else{
                    if(this.activeDevdataDrag==dataArr){ //在本区域拖动
                        this.handleDevFinish(ev,dataArr,this[dataArr]);
                    }else{ //跨区拖动了
                        this.handleDevOtherFinish(ev,dataArr,this[this.activeDevdataDrag]);
                    }
                }
            }
        },
        handleDevOtherFinish:function(ev,domID,devData){
            console.log("ev:",ev,"activeDev:",this.activeDevDrag)
            console.log(this.activeDevDrag.target.offsetWidth)
            let data=ev.dataTransfer.getData("data");
            if(data){
                let item = JSON.parse(data);
                let width=document.getElementById(domID).offsetWidth;
                let height=document.getElementById(domID).offsetHeight;
                // if(ev.offsetX-this.activeDevDrag.target.offsetWidth<0){
                //     item.offsetX=0;
                // }else if(ev.offsetX+this.activeDevDrag.target.offsetWidth>width){
                //     item.offsetX=width-this.activeDevDrag.target.offsetWidth;
                // }else{
                //     item.offsetX=ev.offsetX;
                // }
                // if(ev.offsetY-this.activeDevDrag.target.offsetHeight<0){
                //     item.offsetY=0;
                // }else if(ev.offsetY+this.activeDevDrag.target.offsetHeight>height){
                //     item.offsetY=height-this.activeDevDrag.target.offsetHeight;
                // }else{
                //     item.offsetY=ev.offsetY;
                // }
                if(ev.offsetX-this.activeDevDrag.offsetX<0){
                    item.offsetX=0;
                }else if(ev.offsetX+(this.activeDevDrag.target.offsetWidth-this.activeDevDrag.offsetX)>width){
                    item.offsetX=width-this.activeDevDrag.target.offsetWidth;
                }else{
                    item.offsetX=ev.offsetX-this.activeDevDrag.offsetX
                }
                if(ev.offsetY-this.activeDevDrag.offsetY<0){
                    item.offsetY=0;
                }else if(ev.offsetY+(this.activeDevDrag.target.offsetHeight-this.activeDevDrag.offsetY)>height){
                    item.offsetY=height-this.activeDevDrag.target.offsetHeight;
                }else{
                    item.offsetY=ev.offsetY-this.activeDevDrag.offsetY
                }
                for(let i=0;i<devData.length;i++){
                    if(item.uuid==devData[i].uuid){
                        devData[i].offsetX=item.offsetX;
                        devData[i].offsetY=item.offsetY;
                        this[domID].push(devData[i]);
                        devData.splice(i,1);
                    }
                }
            }
        },
        handleDevFinish:function(ev,domID,devData){
            let data=ev.dataTransfer.getData("data");
            if(data){
                let item = JSON.parse(data);
                let width=document.getElementById(domID).offsetWidth;
                let height=document.getElementById(domID).offsetHeight;
                console.log("activeDevDrag:",this.activeDevDrag,"ev:",ev)
                //拖拽的设备自己的宽高this.activeDevDrag.target.offsetWidth,this.activeDevDrag.target.offsetHeight
                //拖拽的设备点击的那个点相对于设备自己的偏移this.activeDevDrag.offsetX,this.activeDevDrag.offsetY
                //拖拽的设备点击的那个点相对于接收面板的偏移量，拖拽后放手的那刻ev.offsetX,ev.offsetY
                if(item.uuid){
                    if(ev.clientX<this.activeDevDrag.clientX){ //向左拖动
                        if(ev.offsetX-this.activeDevDrag.offsetX<0){ //左边拖出画布了，或者向左拖动了一点点
                            if(ev.x+this.activeDevDrag.offsetX>this.activeDevDrag.x){ //向左移动了一点
                                item.offsetX=item.offsetX-(this.activeDevDrag.offsetX-ev.offsetX)<0?0:item.offsetX-(this.activeDevDrag.offsetX-ev.offsetX);
                            }else{
                                item.offsetX=0;
                            }
                        }else{
                            item.offsetX=ev.offsetX-this.activeDevDrag.offsetX
                        }
                    }else{ //向右拖动
                        //ev.offsetX-this.activeDevDrag.offsetX<this.activeDevDrag.target.offsetWidth-this.activeDevDrag.offsetX
                        if(ev.offsetX<this.activeDevDrag.target.offsetWidth){ //拖动了一点点,可能拖动一点点就拖出画布了
                            item.offsetX=item.offsetX+(ev.offsetX-this.activeDevDrag.offsetX)+this.activeDevDrag.target.offsetWidth>width?width-this.activeDevDrag.target.offsetWidth:item.offsetX+(ev.offsetX-this.activeDevDrag.offsetX);
                        }else{
                            item.offsetX=ev.offsetX+(this.activeDevDrag.target.offsetWidth-this.activeDevDrag.offsetX)>width?width-this.activeDevDrag.target.offsetWidth:ev.offsetX-this.activeDevDrag.offsetX;
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
                        //ev.offsetY-this.activeDevDrag.offsetY<this.activeDevDrag.target.offsetHeight-this.activeDevDrag.offsetY
                        if(ev.offsetY<this.activeDevDrag.target.offsetHeight){  //拖动一点点,可能拖动一点点就拖出画布了
                            item.offsetY=item.offsetY+(ev.offsetY-this.activeDevDrag.offsetY)+this.activeDevDrag.target.offsetHeight>height?height-this.activeDevDrag.target.offsetHeight:item.offsetY+(ev.offsetY-this.activeDevDrag.offsetY); 
                        }else{
                            item.offsetY=ev.offsetY+(this.activeDevDrag.target.offsetHeight-this.activeDevDrag.offsetY)>height?height-this.activeDevDrag.target.offsetHeight:ev.offsetY-this.activeDevDrag.offsetY;
                        }
                    }
                    for(let i=0;i<devData.length;i++){
                        if(item.uuid==devData[i].uuid){
                            devData[i].offsetX=item.offsetX;
                            devData[i].offsetY=item.offsetY;
                        }
                    }
                }else{
                    if(ev.offsetX-this.activeDevDrag.offsetX<0){
                        item.offsetX=0;
                    }else if(ev.offsetX+(this.activeDevDrag.target.offsetWidth-this.activeDevDrag.offsetX)>width){
                        item.offsetX=width-this.activeDevDrag.target.offsetWidth;
                    }else{
                        item.offsetX=ev.offsetX-this.activeDevDrag.offsetX
                    }
                    if(ev.offsetY-this.activeDevDrag.offsetY<0){
                        item.offsetY=0;
                    }else if(ev.offsetY+(this.activeDevDrag.target.offsetHeight-this.activeDevDrag.offsetY)>height){
                        item.offsetY=height-this.activeDevDrag.target.offsetHeight;
                    }else{
                        item.offsetY=ev.offsetY-this.activeDevDrag.offsetY
                    }
                    item.uuid=uuid();
                    devData.push(item)
                }
            }
        },
        handleSet:function(){
            this.layoutInfo.visible=true;
        },
        hiddenPanel:function(ev){
            console.log("!!!!!!!!!!!!!!!!!!!!!")
            this.$el.querySelector("#detail").style.right="-250px";
        },
        handlePanel:function(ev){
            this.isPanel=true;
            ev.stopPropagation();
            this.$el.querySelector("#detail").style.right="0px";
        },  
        remove:function(index,data){
            this.$confirm("确定删除？","提示",{
                confirmButtonText:"确定",
                cancelButtonText:"取消",
                type:"warning"
            }).then(()=>{
                data.splice(index, 1);
            })
            
        },
        initCanvas:function(){
            let _this=this;
            this.design =new fabric.Canvas('designCanvas',{backgroundColor:''});
            fabric.Object.prototype.originX = fabric.Object.prototype.originY = 'center';
            
            let dom=document.getElementById("canvas-box");
            this.initWidth=dom.offsetWidth;
            this.initHeight=dom.offsetHeight;
            this.design.setWidth(dom.offsetWidth);
            this.design.setHeight(dom.offsetHeight);
            this.zoomPoint = new fabric.Point(this.design.width / 2 , this.design.height / 2);
            this.design.absolutePan({x:-this.design.width / 2, y:-this.design.height / 2});
            _this.design.zoomToPoint(_this.zoomPoint, _this.zoom);
            this.setCanvasBg();
            window.onresize=function(){
                //先还原缩放比例与位置
                _this.design.setZoom(1);
                _this.design.absolutePan({x:-_this.design.width / 2, y:-_this.design.height / 2});

                let nowWidth=dom.offsetWidth;
                let nowHeight=dom.offsetHeight;
                let zoomX=nowWidth/_this.initWidth;
                let zoomY=nowHeight/_this.initHeight;
                _this.zoom=Math.min(zoomX, zoomY);
                //计算平移坐标
                let panX=(_this.initWidth-nowWidth*zoomX)/2;
                let panY=(_this.initHeight-nowHeight*zoomY)/2;
                //开始平移
                _this.design.absolutePan({x:panX-_this.design.width / 2, y:panY-_this.design.height / 2});
                _this.design.zoomToPoint(_this.zoomPoint, _this.zoom);
                //obj.setCoords();    _this.design.calcOffset(); 
            };
            document.onkeydown=function(event){
                if (_this && _this._isDestroyed) {return}  //摧毁组件了就不执行下面了，不然其他地方input框又可能不能输入下面的快捷键
                var ev = event || window.event || arguments.callee.caller.arguments[0];
                if(ev){
                    switch(ev.keyCode){
                        case 46 :// 点击删除
                            _this.removeObject();
                            break;
                        case 83:
                            ev.preventDefault(); 
                            if(ev.ctrlKey){
                                _this.saveDesign();
                            }
                            break;
                    }
                }
            }
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
                console.log(opt)
                var evt = opt.e;
                if (evt.altKey === true) {
                    this.isDragging = true;
                    this.selection = false;
                    this.lastPosX = evt.clientX;
                    this.lastPosY = evt.clientY;
                }
                if(opt.target){
                    
                    // _this.type=opt.target.data.type;
                    // _this.initParams=Object.assign(_this.initParams,opt.target.data);
                    // _this.initParams.type=opt.target.data.type?opt.target.data.type:"";
                    // _this.isPanel=false;
                    
                    _this.devClick(evt,opt.target.data,opt.target.data.type);
                }else{
                    _this.hiddenPanel();
                }
            });
            _this.design.on('mouse:up', function(opt) {
                this.isDragging = false;
                this.selection = true;
            });
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
                    // left:left,
                    // top:top,
                });
            });
        },
        drop:function(ev){
            let _this=this;
            var object="";
            // //开始缩放
            this.design.zoomToPoint(this.zoomPoint, this.zoom);
            var json=JSON.parse(ev.dataTransfer.getData("data"));
            var left=ev.offsetX-this.initWidth/2;
            var top=ev.offsetY-this.initHeight/2;
            console.log(ev,this.zoomPoint,this.zoom,this.viewportTransform)
            //viewportTransform[0] 存的缩放比例；viewportTransform[4]X轴移动距离；this.viewportTransform[5]Y轴移动距离
            if(this.viewportTransform){
                left=(left-(this.viewportTransform[4]-this.initWidth/2))/this.zoom;
                top=(top-(this.viewportTransform[5]-this.initHeight/2))/this.zoom;
            }
            fabric.Image.fromURL(json.imgsrc, function(object){
                object["data"]=json;
                object.set({
                    left: left,
                    top: top,
                });
                _this.addObject(object)
            });
        },
        addObject:function(object){
            let _this=this;
            object.toObject = (function (toObject) {//赋值自定义属性
                return function (properties) {
                    return fabric.util.object.extend(toObject.call(this, properties), {
                        data: this.data
                    });
                };
            })(object.toObject);
            this.design.add(object);
        },
        test:function(){
            console.log(this.design)
            console.log(this.design.contextCache)
            this.design.renderAndResetBound();
            this.design.calcOffset() //都需要调用calcOffset; 
            this.design.requestRenderAll();

        }
	},
    watch:{
        "initParams.devid":function(info){
            this.changeDev(info);
        }
    }
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
            #canvas-box{
                width: 100%;
                height: 100%;
                overflow: hidden;
            }
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
                                cursor: move;
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
                                        cursor: move;
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
            }
        }
        .detail{
            width: 250px;
            height: 100%;
            position: absolute;
            right: -250px;
            top:0;
            background: @boxBg;
            color:@color;
            z-index: 999;
            transition: All 0.4s ease-in-out;
            .side-bar{
                width: 100%;
                height: 100%;
                display: block;
                z-index: 999;
                transition: all 0.5s ease-in;
                position: relative;
                .collapse-con{
                    padding: 10px 10px 0;
                    display: flex;
                    flex-wrap: wrap;
                    align-items: center;
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
                    .collapse-boximg{
                        display: inline-block;
                        margin: 5px;
                        cursor: move;
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
                .edit-form{
                    height: calc(100% - 50px);
                    .edit-form-con{
                        width: 100%;
                        padding: 10px;
                        overflow: hidden;
                    }
                }
                .edit-btn{
                    width: 100%;
                    height: 40px;
                    padding: 0 10px;
                    position: absolute;
                    bottom: 0;
                    text-align: right;
                }
                /deep/ .height-auto .el-form-item__content{
                    height: auto;
                }
                
            }
        }
    }
</style>