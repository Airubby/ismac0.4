<template>
    <div class="content">
        <div class="layout-top">
            <el-button type="primary" plain @click="enterEdit">编辑布局</el-button>
        </div>
        <div class="layout-con">
            <div class="scrollbar" v-scrollBar>
                <div class="layout-box">
                    <div class="layout-box-con">
                        <div class="layout-box-panel" :style="panelStyle">
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
                                            <div class="panel-conbox list-group-item" :key="tindex" :class="{'list-group-halfitem':item.category=='kt'}">
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
                                            <div class="panel-conbox list-group-item" :key="tindex" :class="{'list-group-halfitem':item.category=='kt'}">
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
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Draggable from './component/Draggable'
export default {
    components: {Draggable},
    mixins:[],
    filters:{
        
    },
    created() {
        this.init()
    },
    mounted() {
        
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
        }
    },
	methods: {
        init:function(){
            let json=sessionStorage.getItem("layoutJson");
            console.log(json)
            this.$api.post("",{}).then(res=>{

            })
        },
        enterEdit:function(item){
            this.$router.push({name:'deviceLayoutEdit',query:{params:JSON.stringify({"id":item.id})}});
        }
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
    }
</style>