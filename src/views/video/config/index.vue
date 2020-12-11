<template>
    <div class="bgfffcontent">
        <div class="breadcrumb">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>视频</el-breadcrumb-item>
                <el-breadcrumb-item>配置</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="public_content" @click="hiddenDev($event)">
            <el-button type="primary" style="position:absolute;top:10px;right:10px;" @click="showDev($event)">新增设备(将设备拖动到展示区域)</el-button>
            <div class="scrollbarbox-content">
                <div class="his">
                    <div class="his-top his-con">
                        <div class="his-con-line"><em v-for="item in 36"></em></div>
                        <div class="his-con-line his-con-linel"><em v-for="item in 10"></em></div>
                        <div class="his-con-line his-con-linel his-con-liner"><em v-for="item in 10"></em></div>
                        <div class="list-con" 
                            @drop='dropDev($event,data1)'
                            @touchstart='dropDev($event,data1)'
                            @dragover='allowDrop($event)'>
                            <div class="info-show" v-if="data1.length<=0">机柜存放区</div>
                            <draggable class="list-con" 
                            :list="data1" 
                            v-bind="dragOptions"
                            @start="drag = true"
                            @end="drag = false"
                            @change="log" 
                            handle=".his-conbox">
                                <transition-group class="list-group" type="transition" :name="!drag ? 'flip-list' : null">
                                    <template  v-for="(item,tindex) in data1">
                                    <div class="his-conbox list-group-item" :key="tindex" :class="{'his-conbox1':item.type=='kt'}">
                                        <cabinet-component :type="item.type" :title="item.title" :index="tindex" @close="close(tindex,data1)"></cabinet-component>
                                    </div>
                                    </template>
                                </transition-group>
                            </draggable>
                        </div>
                    </div>
                    <div class="his-cen">
                        <div class="his-cendoor" :class="{'his-cendoor-close':leftDoor}"></div>
                        <div class="his-cencon"
                        @drop='dropDev($event)'
                        @touchstart='dropDev($event)'
                        @dragover='allowDrop($event)'>
                            <!-- <div class="cen-img" v-for="item in imgarr.cenimg">
                                <img :src="'/images/'+item+'.png'">
                            </div> -->
                        </div>
                        <div class="his-cendoor his-cendoor-right" :class="{'his-cendoor-close':rightDoor}"></div>
                    </div>
                    <div class="his-bottom his-con">
                        <div class="his-con-line"><em v-for="item in 36"></em></div>
                        <div class="his-con-line his-con-linel"><em v-for="item in 10"></em></div>
                        <div class="his-con-line his-con-linel his-con-liner"><em v-for="item in 10"></em></div>
                        <div class="list-con" 
                            @drop='dropDev($event,data2)'
                            @touchstart='dropDev($event,data2)'
                            @dragover='allowDrop($event)'>
                            <div class="info-show" v-if="data2.length<=0">机柜存放区</div>
                            <draggable class="list-con" 
                                :list="data2"
                                v-bind="dragOptions"
                                @start="drag = true"
                                @end="drag = false"
                                @change="log" 
                                handle=".his-conbox">
                                <transition-group class="list-group" type="transition" :name="!drag ? 'flip-list' : null">
                                    <template  v-for="(item,tindex) in data2">
                                    <div class="his-conbox list-group-item" :key="tindex" :class="{'his-conbox1':item.type=='kt'}">
                                        <cabinet-component :type="item.type" :title="item.title"></cabinet-component>
                                    </div>
                                    </template>
                                </transition-group>
                            </draggable>
                        </div>
                    </div>
                    <div v-for="item in imgarr.Webcam" class="webcam" :class="'webcam'+item">
                        <img src="/images/Webcam-ball.png">
                    </div>
                </div>
            </div>
            <div class="detail" id="detail" @click="stopP($event)">
                <div class="detail-title">机柜选择</div>
                <div class="detail-con">
                    <el-scrollbar class="scrollbar">
                        <ul>
                            <li :key="index" v-for="(item,index) in list" draggable="true" @dragend="dragDevEnd()" @dragstart="dragDevStart($event,item)">{{item.title}}</li>
                        </ul>
                    </el-scrollbar>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import draggable from './Draggable'
import cabinetComponent from './cabinet.vue'
export default {
    components: {
        draggable,
        cabinetComponent
    },
    created() {
    },
    mounted() {
        
        
    },
    destroyed(){

    },
    data(){
        return{
            imgarr:{
                Webcam:[
                    1,2,3,4,5,6,7,8
                ],
                cenimg:[
                    'smoke','thalposis','smoke','thalposis'
                ]
            },
            leftDoor:false,
            rightDoor:true,
            title:'',
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
            drag: false,
            activeDrag:{},
            data1:[
                // {title:'配电单元',type:'pd'},
                // {title:'整流柜',type:'zl'},
                // {title:'电池柜',type:'dc'},
                // {title:'设备单元01',type:'jg'},
                // {title:'精密空调1',type:'kt'},
                // {title:'设备单元02',type:'jg'},
                // {title:'设备单元03',type:'jg'},
                // {title:'设备单元04',type:'jg'},
                // {title:'精密空调2',type:'kt'},
                // {title:'设备单元05',type:'jg'},
                // {title:'设备单元06',type:'jg'},
                // {title:'设备单元07',type:'jg'},
                // {title:'精密空调3',type:'kt'},
                // {title:'设备单元08',type:'jg'},
                // {title:'设备单元09',type:'jg'},
            ],
            data2:[
                // {title:'管控单元',type:'gk'},
                // {title:'冷量分配单元',type:'llfp'},
                // {title:'电池柜',type:'dc'},
                // {title:'设备单元18',type:'jg'},
                // {title:'精密空调6',type:'kt'},
                // {title:'设备单元17',type:'jg'},
                // {title:'设备单元16',type:'jg'},
                // {title:'设备单元15',type:'jg'},
                // {title:'精密空调5',type:'kt'},
                // {title:'设备单元14',type:'jg'},
                // {title:'设备单元13',type:'jg'},
                // {title:'设备单元12',type:'jg'},
                // {title:'精密空调4',type:'kt'},
                // {title:'设备单元11',type:'jg'},
                // {title:'设备单元10',type:'jg'},
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
        }
    },
	methods: {
        dragDevStart:function(evt,item){
            this.activeDrag=item;
        },
        dragDevEnd:function(){
            this.activeDrag={};
        },
        dropDev:function(evt,data){
            if(JSON.stringify(this.activeDrag)!="{}"){
                data.push(this.activeDrag)
            }
        },
        allowDrop:function (ev) {
            ev.preventDefault();
        },
        stopP:function(ev){
            ev.stopPropagation();
        },
        hiddenDev:function(){
            for(let i=0;i<this.$el.querySelectorAll('.his-conbox').length;i++){
                this.$el.querySelectorAll(".his-conbox")[i].classList.remove("active");
            }
            this.$el.querySelector("#detail").style.right="-200px";
        },
        showDev:function(ev){
            ev.stopPropagation();
            this.$el.querySelector("#detail").style.right="0px";
        },  
        close:function(index,data){
            data.splice(index, 1);
            console.log(this.data1);
        },
        log: function(evt) {
            console.log(evt);
        }
	},
    
}
</script>
<style lang="less" scoped>

    .public_content{
        display: flex;
        align-items: center;
        text-align: center;
        position:relative;
        overflow:hidden;
        .detail{
            width: 200px;
            height: 100%;
            position: absolute;
            right: -200px;
            top:0;
            background: #838FA3;
            color:#fff;
            transition: All 0.4s ease-in-out;
            .detail-title{
                width: 100%;
                height: 40px;
                line-height: 40px;
                background:#282C32;
                text-align:center;
                color: #a0acbf;
                font-size: 16px;
            }
            .detail-con{
                width: 100%;
                height: calc(100% - 40px);
                ul{
                    width: 100%;
                    height: 100%;
                    padding: 10px;
                    li{
                        height: 36px;
                        line-height: 36px;
                        cursor: pointer;
                        text-indent: 15px;
                    }
                    li:hover{
                        background: #eaebe9;
                        color:#62b651;
                        border-radius: 5px;
                    }
                }
            }
        }
    }
    .scrollbarbox-content{
        width: 865px;
        height: 460px;
        margin: 0 auto;
        .his{
            width: 100%;
            height:100%;
            position: relative;
            .his-con{
                width: calc(100% - 160px);
                height: 150px;
                border: 8px solid #838FA3;
                margin: 0 auto;
                display: flex;
                position: relative;
                .list-con{
                    width: 100%;
                    height: 100%;
                }
                .info-show{
                    width: 100%;
                    height: 100%;
                    text-align: center;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #409EFF;
                    font-size: 20px;
                    position: absolute;
                }
                .list-group{
                    width: 100%;
                    height: 100%;
                    display: flex;
                }
                &.his-top{
                    border-bottom: none;
                }
                &.his-bottom{
                    border-top: none;
                    .his-con-line{
                        top: auto;
                        bottom: -13px;
                    }
                }
                .his-conbox{
                    width: 200%;
                    height: 100%;
                    padding: 0 1px;
                    cursor: pointer;
                    &.active{
                        background: #838FA3;
                    }
                    &.his-conbox1{
                        width: 100%;
                    }
                }
                .his-con-line{
                    width: calc(100% + 22px);
                    height: 3px;
                    position: absolute;
                    left: -10px;
                    background: #FFC940;
                    top: -13px;
                    display: flex;
                    justify-content: space-between;
                    em{
                        width: 10px;
                        height: 100%;
                        background: #5A687B;
                    }
                }
                .his-con-linel{
                    width: 3px;
                    height: calc(100% + 12px);
                    top: -13px;
                    left: -13px;
                    flex-flow: column;
                    em{
                        width: 100%;
                        height: 10px;
                    }
                }
                .his-con-liner{
                    left: auto;
                    right: -13px;
                }
            }
            .his-cen{
                width:100%;
                height: calc(100% - 300px);
                display: flex;
                .his-cendoor{
                    width: 88px;
                    height: 100%;
                    border-top: 5px solid #838FA3;
                    border-bottom: 5px solid #838FA3;
                    position:relative;
                    &.his-cendoor-close{
                        border:none;
                        border-right: 5px solid #838FA3;
                        &.his-cendoor-right{
                            border:none;
                            border-right: 5px solid #838FA3;
                        }
                    }
                }
                .his-cendoor:before{
                    content: "";
                    width: 50px;
                    height: 60px;
                    display: block;
                    border: 3px solid #838FA3;
                    border-radius: 0 0 0 100%;
                    border-top: none;
                    border-right: none;
                    position: absolute;
                    left: 0;
                    top: 0;
                }
                .his-cendoor:after{
                    content: "";
                    width: 50px;
                    height: 60px;
                    display: block;
                    border: 3px solid #838FA3;
                    border-radius: 100% 0 0 0;
                    border-bottom: none;
                    border-right: none;
                    position: absolute;
                    left: 0;
                    bottom: 0;
                }
                .his-cendoor-right{
                    transform: rotateY(180deg);
                }
                .his-cendoor-close:before,
                .his-cendoor-close:after{
                    border: none;
                }
                .his-cencon{
                    width: calc(100% - 176px);
                    height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    .cen-img{
                        margin: 0 10px;
                        img{
                            width: 40px;
                        }
                    }
                }
            }
        }
    }
    .webcam{
        position: absolute;
        img{
            height: 30px;
        }
        &.webcam1{
            top: -42px;
            left: 90px;
            transform: rotateX(180deg);
        }
        &.webcam2{
            top: 152px;
            left: 90px;
        }
        &.webcam3{
            bottom: 152px;
            left: 90px;
            transform: rotateX(180deg);
        }
        &.webcam4{
            bottom: -42px;
            left: 90px;
        }
        &.webcam5{
            top: -42px;
            right: 90px;
            transform: rotateX(180deg);
        }
        &.webcam6{
            top: 152px;
            right: 90px;
        }
        &.webcam7{
            bottom: 152px;
            right: 90px;
            transform: rotateX(180deg);
        }
        &.webcam8{
            bottom: -42px;
            right: 90px;
        }
    }
</style>