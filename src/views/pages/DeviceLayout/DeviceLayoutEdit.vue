<template>
    <div class="content">
        <div class="layout-top">
            <el-button type="primary" plain @click="$router.back(-1)">返回</el-button>
            <div>
                <el-button type="primary" @click="handleSure()" v-show="tempname">保存</el-button>
                <el-button type="primary" plain @click="handleSet()">设置</el-button>
                <el-button type="primary" plain @click="handlePanel($event)" v-show="tempname">面板</el-button>
            </div>
        </div>
        <div class="layout-con">
            <div class="scrollbar" v-scrollBar>
                <div v-show="editType=='auto'" id="canvas-box" @drop='drop($event)' @touchstart='drop($event)' @dragover='allowDrop($event)'>
                    <canvas id="designCanvas"></canvas>
                </div>
                <div class="bipv-box" v-show="editType=='bipv'" @click="hiddenPanel($event)">
                    <div class="bipv-box-con">
                        <div class="bipv-box-panel" id="devtopDatabipv"
                        @drop='dragDevFinish($event,"devtopData")'
                        @touchstart='dragDevFinish($event,"devtopData")'
                        @dragover='allowDrop($event)'>
                            <span class="panel-span" :style='panelDevStyle(devitem)' v-for="(devitem,index) in devtopData" :key="index" draggable="true" @dragstart="dragDevStart($event,devitem,'devtopData')">
                                <i class="el-icon-delete icon-btn" @click="remove(index,devtopData)"></i>
                                <img :src="devitem.imgsrc" :title="devitem.name" @click="devClick($event,devitem,'devtopData')">
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
                                <div class="bipv-list-con"
                                    @drop='dragCabinetFinish($event,"devData")'
                                    @touchstart='dragCabinetFinish($event,"devData")'
                                    @dragover='allowDrop($event)'>
                                    <div class="bipv-list-drag">
                                        <template  v-for="(item,tindex) in devData">
                                            <div class="panel-conbox bipv-group-item" :style="cabinetStyle(item)" draggable=true @dragstart="dragDevStart($event,item,'devData')" @click="devClick($event,item,'devData')" :key="tindex">
                                                <div class="cabinet-con-img" :style="{height:baseHeight*Number(item.ubit)+'px'}">
                                                    <i class="el-icon-delete icon-btn" @click="remove(tindex,devData)"></i>
                                                    <div class="text">{{item.name}}</div>
                                                    <template v-for="index in Number(item.ubit)">
                                                        <img src="./config/images/U.png" draggable=false :style="{bottom:baseHeight*(index-1)+'px'}" :key="index">
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
                <div class="layout-box" v-show="editType=='one'||editType=='two'" @click="hiddenPanel($event)">
                    <div class="layout-box-con">
                        <div class="layout-box-panel layout-box-onepanel" :style="panelStyle" v-show="editType=='one'">
                            <div class="layout-panel-other">
                                <div class="layout-panel-othercon" id="devtopDataone"
                                @drop='dragDevFinish($event,"devtopData")'
                                @touchstart='dragDevFinish($event,"devtopData")'
                                @dragover='allowDrop($event)'>
                                    <span class="panel-span" :style='panelDevStyle(devitem)' v-for="(devitem,index) in devtopData" :key="index" draggable="true" @dragstart="dragDevStart($event,devitem,'devtopData')">
                                        <i class="el-icon-delete icon-btn" @click="remove(index,devtopData)"></i>
                                        <img :src="devitem.imgsrc" :title="devitem.name" @click="devClick($event,devitem,'devtopData')">
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
                                        <div class="layout-info-show" v-if="topData.length<=0">{{$t("CabinetQ")}}</div>
                                        <draggable class="layout-list-con" 
                                        :list="topData" 
                                        v-bind="dragOptions"
                                        @start="drag = true"
                                        @end="drag = false"
                                        handle=".panel-conbox">
                                            <transition-group class="layout-list-group" type="transition" :name="!drag ? 'flip-list' : null">
                                                <template  v-for="(item,tindex) in topData">
                                                <div class="panel-conbox list-group-item" @click="devClick($event,item,'topData')" :key="tindex" :class="{'list-group-halfitem':item.category=='AirControl'}">
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
                                    <span class="panel-span" :style='panelDevStyle(devitem)' v-for="(devitem,index) in devbottomData" :key="index" draggable="true" @dragstart="dragDevStart($event,devitem,'devbottomData')">
                                        <i class="el-icon-delete icon-btn" @click="remove(index,devbottomData)"></i>
                                        <img :src="devitem.imgsrc" :title="devitem.name" @click="devClick($event,devitem,'devbottomData')">
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div class="layout-box-panel" id="box-two-canvas" :style="panelStyle" v-show="editType=='two'">
                            <div class="layout-box-panel-canvas" :style="panelStyle">
                                <canvas id="twoCanvas"></canvas>
                            </div>
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
                                    <div class="layout-info-show" v-if="topData.length<=0">{{$t("CabinetQ")}}</div>
                                    <draggable class="layout-list-con" 
                                    :list="topData" 
                                    v-bind="dragOptions"
                                    @start="drag = true"
                                    @end="drag = false"
                                    handle=".panel-conbox">
                                        <transition-group class="layout-list-group" type="transition" :name="!drag ? 'flip-list' : null">
                                            <template  v-for="(item,tindex) in topData">
                                            <div class="panel-conbox list-group-item" @click="devClick($event,item,'topData')" :key="tindex" :class="{'list-group-halfitem':item.category=='AirControl'}">
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
                                    <div class="layout-info-show" v-if="devData.length<=0">{{$t("DevQ")}}</div>
                                    <span class="panel-span" :style='panelDevStyle(devitem)' v-for="(devitem,index) in devData" :key="index" draggable="true" @dragstart="dragDevStart($event,devitem,'devData')">
                                        <i class="el-icon-delete icon-btn" @click="remove(index,devData)"></i>
                                        <img :src="devitem.imgsrc" :title="devitem.name" @click="devClick($event,devitem,'devData')">
                                    </span>
                                </div>
                                <div class="panel-cendoor panel-cendoor-right" :class="{'panel-cendoor-close':rightDoor}"></div>
                            </div>
                            <div class="layout-panel-bottom layout-panel-con">
                                <div class="layout-list-con" 
                                    @drop='dragFinish($event,bottomData)'
                                    @touchstart='dragFinish($event,bottomData)'
                                    @dragover='allowDrop($event)'>
                                    <div class="layout-info-show" v-if="bottomData.length<=0">{{$t("CabinetQ")}}</div>
                                    <draggable class="layout-list-con" 
                                    :list="bottomData" 
                                    v-bind="dragOptions"
                                    @start="drag = true"
                                    @end="drag = false"
                                    handle=".panel-conbox">
                                        <transition-group class="layout-list-group" type="transition" :name="!drag ? 'flip-list' : null">
                                            <template  v-for="(item,tindex) in bottomData">
                                            <div class="panel-conbox list-group-item" @click="devClick($event,item,'bottomData')" :key="tindex" :class="{'list-group-halfitem':item.category=='AirControl'}">
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
                                    <span class="panel-span" :style='panelDevStyle(devitem)' v-for="(devitem,index) in devbottomData" :key="index" draggable="true" @dragstart="dragDevStart($event,devitem,'devbottomData')">
                                        <i class="el-icon-delete icon-btn" @click="remove(index,devbottomData)"></i>
                                        <img :src="devitem.imgsrc" :title="devitem.name" @click="devClick($event,devitem,'devbottomData')">
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
                        <el-collapse-item :title="$t('DynatmicCabinet')" name="first" key="first" v-show="editType=='one'||editType=='two'">
                            <div class="collapse-con">
                                <div class="collapse-box" :key="index" v-for="(item,index) in rackList" draggable="true" @dragend="dragEnd()" @dragstart="dragStart($event,item)">{{item.name}}</div>
                            </div>
                        </el-collapse-item>
                        <el-collapse-item :title="$t('PrefCabinet')" name="second" key="second" v-show="editType=='one'||editType=='two'">
                            <div class="collapse-con">
                                <div class="collapse-box" :key="index" v-for="(item,index) in list" draggable="true" @dragend="dragEnd()" @dragstart="dragStart($event,item)">{{item.name}}</div>
                            </div>
                        </el-collapse-item>
                        <el-collapse-item :title="$t('PrefDev')" name="third" key="third">
                            <div class="collapse-con">
                                <div class="collapse-boximg" :key="index" v-for="(item,index) in devlist">
                                    <div class="boximg" draggable="true" @dragstart="dragDevStart($event,item)">
                                        <img :src="item.imgsrc" :title="item.name" />
                                    </div>
                                    <p>{{item.name}}</p>
                                </div>
                            </div>
                        </el-collapse-item>
                        <el-collapse-item :title="$t('DynatmicDev')" name="fifth" key="fifth">
                            <div class="collapse-con">
                                <div class="collapse-boximg" :key="index" v-for="(item,index) in devList">
                                    <div class="boximg" draggable="true" @dragstart="dragDevStart($event,item)">
                                        <img src="/images/device/device.png" :title="item.devname" />
                                    </div>
                                    <p>{{item.devname}}</p>
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
                                                <el-select v-model="initParams.category" :placeholder="$t('please')">
                                                    <el-option key="NULL" :label="$t('NULL')" value="NULL"></el-option>
                                                    <el-option key="HVDC" :label="$t('HVDC')" value="HVDC"></el-option>
                                                    <el-option key="PowerCabinet" :label="$t('PowerCabinet')" value="PowerCabinet"></el-option>
                                                    <el-option key="ControlCabinet" :label="$t('ControlCabinet')" value="ControlCabinet"></el-option>
                                                    <el-option key="ITCabinet" :label="$t('ITCabinet')" value="ITCabinet"></el-option>
                                                    <el-option key="BatteryCabinet" :label="$t('BatteryCabinet')" value="BatteryCabinet"></el-option>
                                                    <el-option key="AirControl" :label="$t('AirControl')" value="AirControl"></el-option>
                                                </el-select>
                                            </el-form-item>
                                        </el-col>
                                        <el-col :span="12">
                                            <el-form-item :label='$t("Background")' prop="background">
                                                <el-color-picker v-model="initParams.background" :predefine="predefineColors"></el-color-picker>
                                            </el-form-item>
                                        </el-col>
                                        <el-col :span="12">
                                            <el-form-item :label='$t("backgroundAlarm")' prop="backgroundAlarm">
                                                <el-color-picker v-model="initParams.backgroundAlarm" :predefine="predefineColors"></el-color-picker>
                                            </el-form-item>
                                        </el-col>
                                    </div>
                                    <!-- 一体化柜上面的设备定义死展示的图片 -->
                                    <div v-else-if="!(editType=='bipv'&&type=='devData')">
                                        <el-col :span="24">
                                            <el-form-item :label='$t("imgsrc")'>
                                                <el-input v-model="initParams.imgsrc" readonly @focus="changeImg('imgsrc')"></el-input>
                                            </el-form-item>
                                        </el-col>
                                        <el-col :span="24">
                                            <el-form-item :label='$t("imgsrcAlarm")'>
                                                <el-input v-model="initParams.imgsrcAlarm" readonly @focus="changeImg('imgsrcAlarm')"></el-input>
                                            </el-form-item>
                                        </el-col>
                                    </div>
                                    <div v-if="initParams.type&&initParams.type=='video'">
                                        <el-col :span="24">
                                            <el-form-item :label='$t("GVideoCh")' prop="pointid" class="height-auto">
                                                <el-tree
                                                    :data="videoTree"
                                                    show-checkbox
                                                    node-key="id"
                                                    ref="tree"
                                                    check-strictly :default-checked-keys="initParams.pointid"
				                                    :check-on-click-node="true" @check-change="handleCheckChange">
                                                </el-tree>
                                            </el-form-item>
                                        </el-col>
                                    </div>
                                    <div v-else>
                                        <el-col :span="24">
                                            <el-form-item label='设备' prop="devid" v-if="type=='topData'||type=='bottomData'">
                                                <el-select
                                                    v-model="initParams.devid"
                                                    multiple
                                                    collapse-tags>
                                                    <el-option
                                                    v-for="item in devList"
                                                    :key="item.devid"
                                                    :label="item.devname"
                                                    :value="item.devid">
                                                    </el-option>
                                                </el-select>
                                            </el-form-item>
                                            <el-form-item label='设备' prop="devid" v-else>
                                                <el-select
                                                    v-model="initParams.onedevid">
                                                    <el-option
                                                    v-for="item in devList"
                                                    :key="item.devid"
                                                    :label="item.devname"
                                                    :value="item.devid">
                                                    </el-option>
                                                </el-select>
                                            </el-form-item>
                                        </el-col>
                                        <el-col :span="24">
                                            <el-form-item label='测点' prop="pointid" class="height-auto">
                                                <el-tree
                                                    :data="pointTree"
                                                    show-checkbox
                                                    node-key="pointid"
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
                    <el-button type="primary" plain @click="sureEdit()">{{$t("Save")}}</el-button>
                </div>
            </div>
        </div>
        <layout-set v-if="layoutInfo.visible" :dialogInfo="layoutInfo" @backInfo="reset"></layout-set>
        <!-- <rack-dev-set v-if="rackDevInfo.visible" :dialogInfo="rackDevInfo" @backInfo="changeInfo"></rack-dev-set> -->
        <img-set v-if="imgInfo.visible" :dialogInfo="imgInfo" @backInfo="backImg"></img-set>
    </div>
</template>
<script>
import { fabric } from "fabric";
import Draggable from './component/Draggable'
import LayoutSet from './component/LayoutSet'
import Cabinet from './component/Cabinet'
import RackDevSet from './component/RackDevSet'
import ImgSet from './component/ImgSet'
import uuid from 'uuid-random';
export default {
    components: {LayoutSet,Draggable,Cabinet,RackDevSet,ImgSet},
    mixins:[],
    filters:{
        
    },
    created() {
        
    },
    mounted() {
        this.init()
    },
    data(){
        return{
            tempid:"",
            tempname:"",
            layoutInfo:{
                visible:false,
                tempname:'',
                editType:'',
                canvasBg:"",
                ubit:""
            },
            activeItem:"",
            isPanel:true,
            predefineColors:["#D8645B","#8CBECF","#F2B747","#588EEA","#75B899","#55A1E2"],
            type:"",  //存放 devbottomData、devtopData等 判断用
            initParams:{
                uuid:"",
                name:"",
                isalarm:false,
                onedevid:"",
                devid:[],
                pointid:[],
                devInfo:[],
                //柜子属性
                category:"rack", //分柜子或空调，宽度判断用
                background:"",
                backgroundAlarm:"",
                //设备属性
                type:"",  //判断设备类型用，比如video
                imgsrc:"",
                imgsrcAlarm:"",
                ubit:null,
            },
            backParams:{
                uuid:"",
                name:"",
                isalarm:false,
                onedevid:"",
                devid:[],
                pointid:[],
                devInfo:[],
                //柜子属性
                category:"", //分柜子或空调，宽度判断用
                background:"",
                backgroundAlarm:"",
                //设备属性
                type:"",  //判断设备类型用，比如video
                imgsrc:"",
                imgsrcAlarm:"",
                ubit:null,
            },
            rules: {
                name:[
                    { required: true, message: '非空', trigger: 'blur' },
                ],
                category:[
                    { required: true, message: '非空', trigger: 'blur' },
                ]
            },
            rackList:[],
            list:[
                {name:"柱子",devInfo:[],devid:[],pointid:[],background:"",backgroundAlarm:"",category:"NULL"},
                {name:this.$t("BatteryCabinet"),devInfo:[],devid:[],pointid:[],background:"",backgroundAlarm:"",category:"BatteryCabinet"},
                {name:this.$t("HVDC"),devInfo:[],devid:[],pointid:[],background:"",backgroundAlarm:"",category:"HVDC"},
                {name:this.$t("ControlCabinet"),devInfo:[],devid:[],pointid:[],background:"",backgroundAlarm:"",category:"ControlCabinet"},
                {name:this.$t("ITCabinet"),devInfo:[],devid:[],pointid:[],background:"",backgroundAlarm:"",category:"ITCabinet"},
                {name:this.$t("PowerCabinet"),devInfo:[],devid:[],pointid:[],background:"",backgroundAlarm:"",category:"PowerCabinet"},
                {name:this.$t("AirControl"),devInfo:[],devid:[],pointid:[],background:"",backgroundAlarm:"",category:"AirControl"},
            ],
            devlist:[
                {
                    name:this.$t("Smoke"),offsetX:"",devInfo:[],offsetY:"",devid:[],pointid:[],predev:true,
                    imgsrc:"/images/device/smoke.png",imgsrcAlarm:"/images/device/smoke-alarm.png"
                },
                {
                    name:this.$t("Thalp"),offsetX:"",devInfo:[],offsetY:"",devid:[],pointid:[],predev:true,
                    imgsrc:"/images/device/thalposis.png",imgsrcAlarm:"/images/device/thalposis-alarm.png"
                },
                {
                    name:this.$t("Video"),offsetX:"",devInfo:[],offsetY:"",devid:[],pointid:[],video:{},predev:true,type:"video",
                    imgsrc:"/images/device/webcam.png",imgsrcAlarm:"/images/device/webcam-alarm.png"
                }
            ],

            
            drag: false,
            activeDrag:null,
            activeDevDrag:null,
            activeDevitemDrag:null,
            activeDevdataDrag:null,

            editType:"",
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

            devList:[
                {devid:"1",devname:"设备1",offsetB:""},{devid:"2",devname:"设备2",offsetB:""},{devid:"3",devname:"设备3",offsetB:""},{devid:"4",devname:"设备4",offsetB:""}
            ],
            defaultProps: {
                children: 'children',
                label: 'pointname'
            },
            pointTree:[],
            videoTree:[ ],
            isVideo:false,

            imgInfo:{
                type:"", //正常图还是告警图判断
                visible:false
            },

            zoomPoint:"",//中心点
            zoom:1, //缩放比例
            canvasBg:"",
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
                this.tempname="tempname";
                this.editType=json.editType;
                
                this.leftDoor=json.leftDoor;
                this.rightDoor=json.rightDoor;
                this.topData=json.topData;
                this.bottomData=json.bottomData;
                this.devData=json.devData;
                this.devtopData=json.devtopData;
                this.devbottomData=json.devbottomData;
                this.ubit=json.ubit;
                if(this.editType=="auto"){
                    this.$nextTick(()=>{
                        document.getElementById("canvas-box").innerHTML='<canvas id="designCanvas"></canvas>';
                        this.initCanvas(json);
                    })
                }
                if(this.editType=="two"){
                    this.$nextTick(()=>{
                        this.initTwoCanvas(json)
                    })
                }
                if(this.editType=="bipv"){
                    this.initBIPV(json.ubit)
                }
                
            }
        },
        devClick:function(ev,item,type){
            console.log(item)
            this.isPanel=false;
            ev.stopPropagation();
            this.$el.querySelector("#detail").style.right="0px";
            if(item.uuid!=this.initParams.uuid){ //如果为false的时候，侧边已展开，点击切换设备的时候，要拉取测点
                let info=item.onedevid?[item.onedevid]:item.devid.length>0?item.devid:[];
                if(info.length>0){
                    this.changeDev(info)
                }else{
                    this.pointTree=[];
                }
            }
            this.type=type;
            this.initParams=Object.assign({},this.backParams,item);
            this.initParams.type=item.type?item.type:"";
            
            
        },
        changeDev:function(info){
            console.log("t!!!!!!!!!!!!!!!",info)
            let point=[
                {
                    pointid: "1",
                    name: '设备1',
                    children: [
                        {
                            pointid: "11",
                            name: '测点 1-1',
                        },
                        {
                            pointid: "12",
                            name: '测点 1-2',
                        }
                    ]
                }, 
                {
                    pointid: "2",
                    name: '设备2',
                    children: [
                        {
                            pointid: "21",
                            name: '测点 2-1',
                        },
                        {
                            pointid: "22",
                            name: '测点 2-2',
                        }
                    ]
                }, 
                {
                    pointid: "3",
                    name: '设备3',
                    children: [
                        {
                            pointid: "31",
                            name: '测点 3-1',
                        }
                    ]
                }, 
                {
                    pointid: "4",
                    name: '设备4',
                    children: [
                        {
                            pointid: "41",
                            name: '测点 4-1',
                        }
                    ]
                }
            ]
            let arr=[];
            for(let i=0;i<info.length;i++){
                for(let j=0;j<point.length;j++){
                    if(info[i]==point[j].pointid){
                        arr.push(point[j]);
                    }
                }
            }
            this.pointTree=arr;
            // if(info.length>0){
            //     this.pointTree=[];
            //     let arr=[];
            //     for(let i=0;i<info.length;i++){
            //         new Promise ((resolve, reject) => {
            //             // this.$api.post(this.$Api.GetDevPoint,{devid:info[i]}).then(res=>{
            //             //     if(res.err_code=="0"){
            //             //         if(res.data&&res.data.length>0){
            //             //             let obj={
            //             //                 pointid:res.data[0].devid,
            //             //                 pointname:res.data[0].devname,
            //             //                 children:res.data
            //             //             }
            //             //             arr.push(obj);
            //             //             this.$nextTick(()=>{
            //             //                 this.$refs.tree.setCheckedKeys(this.initParams.pointid);
            //             //             })
            //             //         }
            //             //     }
            //             //     resolve()
            //             // })
            //         })
            //     }
            //     this.pointTree=arr;
            //     console.log(this.pointTree)
            // }
        },
        handleCheckChange:function(node,checked){
            if(this.$refs.tree.getCheckedNodes().length%2===0){
                if(checked){
                    this.$refs.tree.setCheckedNodes([node]);
                }else{
                    this.$refs.tree.setCheckedNodes([]);
                }        
            }
        },
        
        changeInfo:function(info){
            for(let i=0;i<this[info.type].length;i++){
                if(info.uuid==this[info.type][i].uuid){
                    this[info.type][i]=Object.assign(this[info.type][i],info);
                }
            }
        },
        reset:function(info){
            console.log(info,"1111111111111")
            this.tempname=info.tempname;
            this.editType=info.editType;
            this.leftDoor=true;
            this.rightDoor=false;
            this.topData=[];
            this.bottomData=[];
            this.devData=[];
            this.devtopData=[];
            this.devbottomData=[];
            this.ubit=info.ubit

            if(this.editType=="auto"){
                this.canvasBg=info.canvasBg;
                this.$nextTick(()=>{
                    document.getElementById("canvas-box").innerHTML='<canvas id="designCanvas"></canvas>';
                    this.initCanvas();
                })
            }else{
                if(document.getElementById("canvas-box"))document.getElementById("canvas-box").innerHTML="";
            }
            if(this.editType=="bipv"){
                this.initBIPV(info.ubit);
            }
        },
        dragStart:function(evt,item){
            this.activeDrag=Object.assign({},this.backParams,item);
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
            let dev=item;
            if(!item.predev&&!item.uuid){
                //动态的设备用默认的图标；自己上传改变图标
                dev=JSON.parse(JSON.stringify(this.backParams));
                dev.name=item.devname;
                dev.onedevid=item.devid;
                dev.ubit=item.ubit;
                dev.imgsrc="/images/device/device.png";
                dev.imgsrcAlarm="/images/device/device-alarm.png"
            }
            evt.dataTransfer.setData("data",JSON.stringify(dev));
            this.activeDevDrag=evt;
            this.activeDevitemDrag=dev;
            this.activeDevdataDrag=dataArr;
        },
        dragDevFinish:function(ev,dataArr){
            //data是数据源的key也是dom-this.editType的id；用的同一个名称
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
            this.layoutInfo.tempname=this.tempname;
            this.layoutInfo.editType=this.editType;
            this.layoutInfo.ubit=this.ubit;
            this.layoutInfo.canvasBg=this.canvasBg;
        },
        hiddenPanel:function(){
            this.$el.querySelector("#detail").style.right="-250px";
        },
        handlePanel:function(ev){
            this.isPanel=true;
            ev.stopPropagation();
            this.$el.querySelector("#detail").style.right="0px";
        },  
        remove:function(index,data){
            this.$confirm("确定删除","提示",{
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
                    _this.design.forEachObject(object=>{
                        object.toObject = (function (toObject) {//赋值自定义属性
                            return function (properties) {
                                return fabric.util.object.extend(toObject.call(this, properties), {
                                    data: this.data
                                });
                            };
                        })(object.toObject);
                    })
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
                if(this.canvasBg){
                    this.setCanvasBg();
                }
                
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
            fabric.Image.fromURL(this.canvasBg, function (oimg) { 
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
                _this.design.setBackgroundImage(_this.canvasBg, _this.design.renderAll.bind(_this.design),{
                    scaleX: zoom,
                    scaleY: zoom,
                });
            });
        },
        drop:function(ev){
            let _this=this;
            this.design.zoomToPoint(this.zoomPoint, this.zoom);
            var json=JSON.parse(ev.dataTransfer.getData("data"));
            json.uuid=uuid();
            fabric.Image.fromURL(json.imgsrc, function(object){
                object["data"]=json;
                let imgWidth=object._element.width;
                let imgHeight=object._element.height;
                let scale=40/imgWidth>40/imgHeight?40/imgHeight:40/imgWidth;
                var left=(ev.offsetX-_this.panX)/_this.zoom;
                var top=(ev.offsetY-_this.panY)/_this.zoom;
                object.scaleToWidth(imgWidth*scale);
                object.scaleToHeight(imgHeight*scale);

                object.set({
                    left: left,
                    top: top,
                });
                
                _this.addObject(object)
            });
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
               this.$confirm("确定删除","提示",{
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
        changeImg:function(type){
            this.imgInfo.type=type;
            this.imgInfo.visible=true;
        },
        backImg:function(info){
            console.log(info)
            this.initParams[info.type]=info.imgsrc;
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
                                    item.offsetY=item.offsetY-(this.activeDevDrag.offsetY-evt.offsetY)<0?0:item.offsetY-(this.activeDevDrag.offsetY-evt.offsetY);
                                }else{
                                    item.offsetY=0;
                                }
                            }else{
                                item.offsetY=evt.offsetY-this.activeDevDrag.offsetY;
                            }
                        }else{ //向下拖动
                            if(evt.offsetY<item.offsetH){  //拖动一点点,可能拖动一点点就拖出画布了
                                item.offsetY=item.offsetY+(evt.offsetY-this.activeDevDrag.offsetY)+item.offsetH>height?height-item.offsetH:item.offsetY+(evt.offsetY-this.activeDevDrag.offsetY); 
                            }else{
                                item.offsetY=evt.offsetY+(item.offsetH-this.activeDevDrag.offsetY)>height?height-item.offsetH:evt.offsetY-this.activeDevDrag.offsetY;
                            }
                        }
                        item.offsetB= height - Math.ceil(item.offsetY/this.baseHeight)*this.baseHeight-item.offsetH;//以U位的最底部作为offsetY
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
                                    element.offsetY=Math.ceil(item.offsetY/this.baseHeight)*this.baseHeight;
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
                }else{
                    this.$message.warning("没有设置设备所占U位数，无法上架")
                }
            }
            
            
        },
        initBIPV:function(val){
            this.cabinetU=[];
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
        sureEdit:function(){
            let _this=this;
            if(this.initParams.type&&this.initParams.type=="video"){
                this.initParams.devInfo=this.$refs.tree.getCheckedNodes();
                this.initParams.pointid=[this.$refs.tree.getCheckedNodes()[0].id];
            }else{
                let checkNode=this.$refs.tree.getCheckedNodes(),arr=[];
                for(let i=0;i<checkNode.length;i++){
                    if(!checkNode[i].children||checkNode[i].children.length==0){
                        arr.push(checkNode[i]);
                    }   
                }
                this.initParams.pointid=this.$refs.tree.getCheckedKeys();
                this.initParams.devInfo=arr;
            }
            for(let i=0;i<this[this.type].length;i++){
                if(this.initParams.uuid==this[this.type][i].uuid){
                    this[this.type][i]=JSON.parse(JSON.stringify(this.initParams));
                    if(this.editType=="auto"){
                        let objects=this.design.getObjects();
                        let uuid=this[this.type][i].uuid;
                        for(let i=0;i<objects.length;i++){
                            if(objects[i].data.uuid==uuid){
                                let imgsrc=this[this.type][i].imgsrc;  //测试告警，真实进行判断是否告警进行附图片
                                let json=objects[i];
                                let data=this[this.type][i];
                                fabric.Image.fromURL(imgsrc, function(object){
                                    object["data"]=data;
                                    object.set({
                                        left: json.left,
                                        top: json.top,
                                    });
                                    object.scaleToWidth(objects[i].width*objects[i].scaleX);
                                    object.scaleToHeight(objects[i].height*objects[i].scaleY);
                                    _this.design.remove(json);
                                    _this.addObject(object);
                                });
                            }
                        }
                    }
                }
            }
            this.hiddenPanel();
        },
        handleSure:function(){
            if(this.tempname==""){
                return;
            }
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
                console.log(this.design)
            }
            if(this.editType=="bipv"){
                json["ubit"]=this.ubit;
            }
            sessionStorage.setItem("layoutJson",JSON.stringify(json));
            this.$message.success("保存成功");
        },
        //画漏水绳子
        setCanvas:function(){
            let dom=document.getElementById("box-two-canvas");
            this.design.setWidth(dom.offsetWidth);
            this.design.setHeight(dom.offsetHeight);
            console.log(this.design,"1!!!!!!!!!!!!!!!!!!!!!!!")
        },
        initTwoCanvas:function(json){
            console.log("!!!!!!!!!!")
            let _this=this;
            this.design =new fabric.Canvas('twoCanvas',{backgroundColor:''});
            fabric.Object.prototype.originX = fabric.Object.prototype.originY = 'center';
            if(json){
                this.design.loadFromJSON(json.designCanvas, function() {
                    _this.design.forEachObject(object=>{
                        object.toObject = (function (toObject) {//赋值自定义属性
                            return function (properties) {
                                return fabric.util.object.extend(toObject.call(this, properties), {
                                    data: this.data
                                });
                            };
                        })(object.toObject);
                    })
                });
            }
            this.setCanvas();
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
            _this.design.on('mouse:down', function(opt) {
                var evt = opt.e;
                if (evt.altKey === true) {
                    this.isDragging = true;
                    this.selection = false;
                    this.lastPosX = evt.clientX;
                    this.lastPosY = evt.clientY;
                }
                if(opt.target){
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
	},
    watch:{
        "initParams.devid":function(info){
            if(info){
                this.changeDev(info);
            }
        },
        "initParams.onedevid":function(info){
            if(info){
                this.changeDev([info]);
            }
        },
        panelStyle:function(){
            this.setCanvas();
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
                                width: 40px;
                                height: 40px;
                                img{
                                    max-width: 100%;
                                    max-height: 100%;
                                }
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
                                width: 40px;
                                height: 40px;
                                img{
                                    max-width: 100%;
                                    max-height: 100%;
                                }
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
                        width: 40px;
                        height: 40px;
                        img{
                            max-width: 100%;
                            max-height: 100%;
                        }
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
                            .icon-btn{
                                position: absolute;
                                top: -8px;
                                right: -8px;
                                display: none;
                                cursor: pointer;
                                color: @color;
                                z-index: 10;
                            }
                            &:hover{
                                border-color: @activeColor;
                                .icon-btn{
                                    display: block;
                                }
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
                        &:hover{
                            background: @activeBg;
                            color: @activeColor;
                        }
                    }
                    .collapse-boximg{
                        display: inline-block;
                        margin: 5px;
                        color: @color;
                        text-align: center;
                        .boximg{
                            width: 40px;
                            height: 40px;
                            margin: 0 auto;
                            display: flex;
                            align-items: center;
                            cursor: move;
                            img{
                                max-width: 100%;
                                max-height: 100%;
                            }
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
        .layout-box-panel-canvas{
            position: absolute;
            min-width: 400px;
            height: 100%;
            left: 0;
            top: 0;
        }
    }
</style>