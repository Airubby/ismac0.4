<template>
    <div class="content">
        <div class="layout-top">
            <el-button type="primary" plain @click="$router.back(-1)">返回</el-button>
            <div>
                <el-button type="primary" @click="test()">测试</el-button>
                <el-button type="primary" @click="handleSure()" v-show="name&&editType">保存</el-button>
                <el-button type="primary" plain @click="handleSet()">布局设置</el-button>
                <el-button type="primary" plain @click="handlePanel($event)" v-show="name&&editType">布局面板</el-button>
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
                                <div class="layout-panel-othercon" id="devtopDataone"
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
                                <div class="layout-panel-othercon" id="devbottomDataone"
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
                                <div class="layout-panel-othercon" id="devtopDatatwo"
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
                                <div class="panel-cencon" id="devDatatwo"
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
                                <div class="layout-panel-othercon" id="devbottomDatatwo"
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
                <div class="bipv-box" v-show="editType=='bipv'" @click="hiddenPanel($event)">
                    <div class="bipv-box-con">
                        <div class="bipv-box-panel" id="devtopDatabipv" style="background:#000"
                        @drop='dragDevFinish($event,"devtopData")'
                        @touchstart='dragDevFinish($event,"devtopData")'
                        @dragover='allowDrop($event)'>
                            <span class="panel-span" :style='panelDevStyle(devitem)' v-for="(devitem,index) in devtopData" :key="index">
                                <i class="el-icon-delete icon-btn" @click="remove(index,devtopData)"></i>
                                <img :src="devitem.imgsrc" :title="devitem.name" @click="devClick($event,devitem,'devtopData')" draggable="true" @dragstart="dragDevStart($event,devitem,'devtopData')">
                            </span>
                        </div>
                        
                        <div class="cabinet">
                            <div class="cabinet-con" v-if="cabinetU.length>0">
                                <div v-for="(item,index) in cabinetU" class="cabinet-u" :key="index">
                                    <div class="cabinet-number" :class="{'firstU':index==0,'lastU':index==cabinetU.length-1}">
                                        <span class="cabinet-number-box">{{item.index}}</span>
                                        <span class="cabinet-number-box cabinet-number-boxr">
                                            {{item.index}}
                                            <em class="radio" :style="getStyle(item.lastvalue)" @click="setColorFn(item)"></em>
                                        </span>
                                    </div>
                                </div>
                                <div class="bipv-list-con" id="topDatabipv"
                                    @drop='dragCabinetFinish($event,"topData")'
                                    @touchstart='dragCabinetFinish($event,"topData")'
                                    @dragover='allowDrop($event)'>
                                    <div class="bipv-list-drag">
                                        <template  v-for="(item,tindex) in topData">
                                            <div class="panel-conbox bipv-group-item" :style="cabinetStyle(item)" draggable=true @dragstart="dragDevStart($event,item,'topData')" @click="devClick($event,item,'topData')" :key="tindex">
                                                <div class="cabinet-con-img" :style="{height:18*Number(item.ubit)+'px'}">
                                                    <template v-for="index in Number(item.ubit)">
                                                        <img src="./config/images/U.png" draggable=false :style="{bottom:18*(index-1)+'px'}" :key="index">
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
            </div>
        </div>
        <div class="detail" id="detail" @click="stopP($event)">
            <div class="side-bar" v-show="isPanel">
                <el-scrollbar class="scrollbar">
                    <el-collapse v-model="activeItem" accordion>
                        <el-collapse-item title="动态柜子" name="first" key="first" v-show="editType=='one'||editType=='two'">
                            <div class="collapse-con">
                                <div class="collapse-box" :key="index" v-for="(item,index) in list" draggable="true" @dragend="dragEnd()" @dragstart="dragStart($event,item)">{{item.name}}</div>
                            </div>
                        </el-collapse-item>
                        <el-collapse-item title="预置柜子" name="second" key="second" v-show="editType=='one'||editType=='two'">
                            <div class="collapse-con">
                                <div class="collapse-box" :key="index" v-for="(item,index) in list" draggable="true" @dragend="dragEnd()" @dragstart="dragStart($event,item)">{{item.name}}</div>
                            </div>
                        </el-collapse-item>
                        <el-collapse-item title="环境设备" name="third" key="third">
                            <div class="collapse-con">
                                <div class="collapse-boximg" :key="index" v-for="(item,index) in devlist" draggable="true" @dragend="dragDevEnd()" @dragstart="dragDevStart($event,item)">
                                    <img :src="item.imgsrc" :title="item.name" />
                                </div>
                            </div>
                        </el-collapse-item>
                        <el-collapse-item title="机柜设备" name="fifth" key="fifth" v-show="editType=='bipv'">
                            <div class="collapse-con">
                                <div class="collapse-box" :key="index" v-for="(item,index) in cabinetList" draggable="true" @dragend="dragDevEnd()" @dragstart="dragDevStart($event,item)">{{item.name}}</div>
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
                                    <div v-else>
                                        <el-col :span="24">
                                            <el-form-item label='组件图'>
                                                <el-input v-model="initParams.imgsrc" readonly @focus="changeImg"></el-input>
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
        <img-set v-if="imgInfo.visible" :dialogInfo="imgInfo"></img-set>
    </div>
</template>
<script>
import { fabric } from "fabric";
import Draggable from './component/Draggable'
import LayoutSet from './component/LayoutSet'
import Cabinet from './component/Cabinet'
import RackDevSet from './component/RackDevSet'
import ImgSet from './component/ImgSet'
import uuid from 'uuid-random'
export default {
    components: {LayoutSet,Draggable,Cabinet,RackDevSet,ImgSet},
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
        this.initBIPV(42)
    },
    data(){
        return{
            hint:"add",
            name:"test",
            layoutInfo:{
                visible:false,
            },
            activeItem:"fifth",
            isPanel:true,
            predefineColors:["#D8645B","#8CBECF","#F2B747","#588EEA","#75B899","#55A1E2"],
            type:"",  //类型devData ，devtopData  等等判断用
            initParams:{
                uuid:'',
                name:"",
                isAlarm:false,
                devid:[],
                pointid:[],
                devInfo:[],

                category:"rack",  //柜子或空调
                background:"",
                backgroundAlarm:"",
                
                type:"",  //设备类，比如video
                imgsrc:"",
                imgsrcAlarm:"",
            },
            backParams:{
                uuid:'',
                name:"",
                isAlarm:false,
                devid:[],
                pointid:[],
                devInfo:[],

                category:"",  //柜子或空调
                background:"",
                backgroundAlarm:"",
                
                type:"",  //设备类，比如video
                imgsrc:"",
                imgsrcAlarm:"",
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
                {name:'配电单元',devInfo:[],devid:[],pointid:[],background:"",backgroundAlarm:""},
                {name:'整流柜',devInfo:[],devid:[],pointid:[],background:"",backgroundAlarm:""},
                {name:'电池柜',devInfo:[],devid:[],pointid:[],background:"",backgroundAlarm:""},
                {name:'设备单元',devInfo:[],devid:[],pointid:[],background:"",backgroundAlarm:""},
                {name:'精密空调',devInfo:[],devid:[],pointid:[],background:"",backgroundAlarm:""},
                {name:'管控单元',devInfo:[],devid:[],pointid:[],background:"",backgroundAlarm:""},
                {name:'冷量分配单元',devInfo:[],devid:[],pointid:[],background:"",backgroundAlarm:""},
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

            editType:"bipv",
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
                {id:"1",name:"设备1",offsetB:""},{id:"2",name:"设备2",offsetB:""},{id:"3",name:"设备3",offsetB:""},{id:"4",name:"设备4",offsetB:""}
            ],
            defaultProps: {
                children: 'children',
                label: 'name'
            },
            pointTree:[],
            videoTree:[],
            isVideo:false,

            imgInfo:{
                type:"", //告警图片或正常图片
                visible:false
            },

            zoomPoint:"",//中心点
            zoom:1, //缩放比例
            design:null,
            initWidth:"",
            initHeight:"",
            panX:0,
            panY:0,

            baseHeight:18,
            ubit:42,
            cabinetU:[],
            color_list:[],
            color_data:[],
            cabinetList:[
                {name:'设备3U',devInfo:[],devid:[],pointid:[],background:"",backgroundAlarm:"",ubit:3},
                {name:'设备8U',devInfo:[],devid:[],pointid:[],background:"",backgroundAlarm:"",ubit:8},
                {name:'设备1U',devInfo:[],devid:[],pointid:[],background:"",backgroundAlarm:"",ubit:1},
                {name:'设备4U',devInfo:[],devid:[],pointid:[],background:"",backgroundAlarm:"",ubit:4},
            ]
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
                console.log(item)
                return `left:${item.offsetX}px;top:${item.offsetY}px`;
            }
        },
        cabinetStyle(){
            return function(item){
                return `bottom:${item.offsetB}px;`;
            }
        }
    },
	methods: {
        init:function(){
            let layoutJson=sessionStorage.getItem("layoutJson");
            if(layoutJson){
                let json=JSON.parse(layoutJson);
                console.log(json)
                this.editType=json.editType;
                this.name=json.name;

                this.leftDoor=json.leftDoor;
                this.rightDoor=json.rightDoor;
                this.topData=json.topData;
                this.bottomData=json.bottomData;
                this.devData=json.devData;
                this.devtopData=json.devtopData;
                this.devbottomData=json.devbottomData;

                if(this.editType=="auto"){
                    this.$nextTick(()=>{
                        document.getElementById("canvas-box").innerHTML='<canvas id="designCanvas"></canvas>';
                        this.initCanvas(json);
                    })
                    return;
                }
                
            }
            // this.$api.post("",{}).then(res=>{

            // })
        },
        devClick:function(ev,item,type){
            console.log(item)
            this.type=type;
            this.initParams=Object.assign(this.backParams,item);
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
            this.name=info.name;

            this.leftDoor=true;
            this.rightDoor=false;
            this.topData=[];
            this.bottomData=[];
            this.devData=[];
            this.devtopData=[];
            this.devbottomData=[];
            this.ubit=info.ubit

            if(this.editType=="auto"){
                this.$nextTick(()=>{
                    document.getElementById("canvas-box").innerHTML='<canvas id="designCanvas"></canvas>';
                    this.initCanvas();
                })
            }else{
                if(document.getElementById("canvas-box"))document.getElementById("canvas-box").innerHTML="";
            }
            
        },
        handleSure:function(){
            let json={
                name:this.name,
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
            if(this.editType=="bipv"){
                json["ubit"]=this.ubit;
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
        dragDevEnd:function(){
            this.activeDevDrag=null;
            this.activeDevitemDrag=null;
            this.activeDevdataDrag=null;
        },
        dragFinish:function(evt,data){
            console.log(this.activeDrag,evt,data)
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
            //data是数据源的key也是dom的id-ediType；用的同一个名称
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
                let width=document.getElementById(domID+this.editType).offsetWidth;
                let height=document.getElementById(domID+this.editType).offsetHeight;
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
                let width=document.getElementById(domID+this.editType).offsetWidth;
                let height=document.getElementById(domID+this.editType).offsetHeight;
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
        initCanvas:function(json){
            let _this=this;
            this.design =new fabric.Canvas('designCanvas',{backgroundColor:''});
            fabric.Object.prototype.originX = fabric.Object.prototype.originY = 'center';
            if(json){
                this.initWidth=json.initWidth;
                this.initHeight=json.initHeight;
                this.design.loadFromJSON(json.designCanvas, function() {
                    _this.resizeCanvas();
                });
            }else{
                let dom=document.getElementById("canvas-box");
                this.initWidth=dom.offsetWidth;
                this.initHeight=dom.offsetHeight;
                this.panX=dom.offsetWidth/2;
                this.panY=dom.offsetHeight/2;
                this.design.setWidth(dom.offsetWidth);
                this.design.setHeight(dom.offsetHeight);
                this.zoomPoint = new fabric.Point(this.panX , this.panY);
                this.design.absolutePan({x:-this.panX, y:-this.panY});
                this.design.zoomToPoint(_this.zoomPoint, _this.zoom);
                this.setCanvasBg();
            }
            window.onresize=function(){
                _this.resizeCanvas();
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
                                _this.handleSure();
                            }
                            break;
                    }
                }
            }
            _this.design.on('mouse:wheel', function(opt) {
                var delta = opt.e.deltaY;
                _this.zoom = _this.design.getZoom();
                _this.zoom *= 0.999 ** delta;
                if (_this.zoom > 20) _this.zoom = 20;
                if (_this.zoom < 0.01) _this.zoom = 0.01;
                this.zoomToPoint(_this.zoomPoint, _this.zoom);
                opt.e.preventDefault();
                opt.e.stopPropagation();
            });
            _this.design.on('mouse:down', function(opt) {
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
                    //设备存在devData中
                    _this.devClick(evt,opt.target.data,'devData');
                }else{
                    _this.hiddenPanel();
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
            console.log(this.design)
            let _this=this;
            // //开始缩放
            this.design.zoomToPoint(this.zoomPoint, this.zoom);
            var json=JSON.parse(ev.dataTransfer.getData("data"));
            var left=(ev.offsetX-this.panX)/this.zoom;
            var top=(ev.offsetY-this.panY)/this.zoom;
            console.log(ev,this.zoomPoint,this.zoom,this.panX)
            fabric.Image.fromURL(json.imgsrc, function(object){
                object["data"]=json;
                object.set({
                    left: left,
                    top: top,
                });
                _this.addObject(object)
            });
            json.uuid=uuid();
            this.devData.push(json)
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
        removeObject:function(){
            if(this.design.getActiveObject()){
                this.$confirm("确定删除？","提示",{
                    confirmButtonText:"确定",
                    cancelButtonText:"取消",
                    type:"warning"
                }).then(()=>{
                    let obj=this.design.getActiveObject();
                    this.design.remove(this.design.getActiveObject());
                    for(let i=0;i<this.devData.length;i++){
                        if(this.devData[i].uuid==obj.data.uuid){
                            this.devData.splice(i,1);
                        }
                    }
                    this.hiddenPanel();
                })
            }
        },
        changeImg:function(){
            this.imgInfo.visible=true;
        },
        //一体化
        dragCabinetFinish:function(evt,devData){
            //总结1 . 满足max(A.start,B.start)<=min(A.end,B.end)，即重复 这里的等于的时候是两个设备挨着的状态
            //总结2 . 满足A.end< B.start || A.start > B.end，即不重复
            //Math.min.apply(null, [1, 2, 3]) 等价于 Math.min(1, 2, 3)
            //必须用evt.dataTransfer.getData("data")传数据过来
            let data=evt.dataTransfer.getData("data");
            if(data){
                let item = JSON.parse(data);
                if(item.ubit){
                    let height=this.baseHeight*Number(this.ubit);
                    if(item.uuid){
                        if(evt.clientY<this.activeDevDrag.clientY){ //向上拖动
                            if(evt.offsetY-this.activeDevDrag.offsetY<0){ //上边拖出地图了，或者向上拖动了一点点
                                if(evt.y+this.activeDevDrag.offsetY>this.activeDevDrag.y){ //向上移动了一点
                                    console.log("一点点")
                                    item.offsetY=item.offsetY-(this.activeDevDrag.offsetY-evt.offsetY)<0?0:item.offsetY-(this.activeDevDrag.offsetY-evt.offsetY);
                                }else{
                                    console.log("拖出去了")
                                    item.offsetY=0;
                                }
                            }else{
                                console.log("很多")
                                item.offsetY=evt.offsetY-this.activeDevDrag.offsetY;
                            }
                        }else{ //向下拖动
                            if(evt.offsetY<item.offsetH){  //拖动一点点,可能拖动一点点就拖出画布了
                                item.offsetY=item.offsetY+(evt.offsetY-this.activeDevDrag.offsetY)+item.offsetH>height?height-item.offsetH:item.offsetY+(evt.offsetY-this.activeDevDrag.offsetY); 
                            }else{
                                item.offsetY=evt.offsetY+(item.offsetH-this.activeDevDrag.offsetY)>height?height-item.offsetH:evt.offsetY-this.activeDevDrag.offsetY;
                            }
                        }
                        console.log("evt",evt,"this.activeDevDrag",this.activeDevDrag,"item",item)
                        item.offsetB= height - Math.floor(item.offsetY/this.baseHeight)*this.baseHeight-item.offsetH;//以U位的最底部作为offsetY
                        let flag=false;
                        if(item.offsetB+item.offsetH>height){
                            flag=true;
                        }
                        this[devData].forEach(element => {
                            let start=[item.offsetB,element.offsetB],
                                end=[item.offsetB+item.offsetH,element.offsetB+element.offsetH];  
                            if(Math.max.apply(null,start)<Math.min.apply(null,end)&&item.uuid!=element.uuid){
                                flag=true;
                            }
                        });
                        if(!flag){
                            this[devData].forEach(element => {
                                if(item.uuid==element.uuid){
                                    element.offsetY=Math.floor(item.offsetY/this.baseHeight)*this.baseHeight;
                                    element.offsetB=item.offsetB;
                                }
                            });
                        }else{
                            this.$message.warning("所需U位不足，无法更换U位位置")
                        }
                    }else{
                        item["offsetB"]= height - Math.ceil(evt.offsetY/this.baseHeight)*this.baseHeight;//以U位的最底部作为offsetY
                        item["offsetH"]=this.baseHeight*Number(item.ubit);
    
                        let flag=false;
                        if(item.offsetB+item.offsetH>height){
                            flag=true;
                        }
                        this[devData].forEach(element => {
                            let start=[item.offsetB,element.offsetB],
                                end=[item.offsetB+item.offsetH,element.offsetB+element.offsetH];  
                            if(Math.max.apply(null,start)<Math.min.apply(null,end)){
                                flag=true;
                            }
                        });
                        if(!flag){
                            item["uuid"]=uuid();
                            item["offsetY"]=Math.ceil(evt.offsetY/this.baseHeight)*this.baseHeight-item["offsetH"];
                            this[devData].push(item)
                        }else{
                            this.$message.warning("所需U位不足，无法上架")
                        }
                    }
                }
            }
            
            
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
        getStyle:function(status){
            let st=parseInt(status).toString();
            let style={
                background:"#73B34A",  //默认色
            }
            for(let i=0;i<this.color_data.length;i++){
                if(st===this.color_data[i].code){
                    style.background=this.color_data[i].color;
                    return style;
                }
            }
            return style;
        },
        checkMove:function(e){
            console.log(e)
            // return true;
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
        .bipv-box{
            .bipv-box-con{
                width: 400px;
                padding: 50px 0;
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
                            width:178px;
                            border-left: 1px solid transparent;
                            border-right: 1px solid transparent;
                            cursor: move;
                            &:hover{
                                border-color: @activeColor;
                            }
                            img{
                                width: 100%;
                                height: 18px;
                                position: absolute;
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