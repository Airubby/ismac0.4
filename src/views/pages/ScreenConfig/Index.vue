<template>
    <div class="content">
        <div class="config-con">
            <div class="config-left">
                <div class="config-left-top">
                    <div>大屏视图</div>
                    <div class="btn">
                        <el-button type="text">导入</el-button>
                        <el-button type="text">导出</el-button>
                        <el-button type="text" @click="setScreen">设置</el-button>
                    </div>
                </div>
                <div class="search-con scrollbar">
                    <el-scrollbar>
                        <div class="scrollbar-con">
                            <el-checkbox-group v-model="checkList">
                                <div class="temp-box" v-for="(item,index) in tempList" :key="index" :class="{'active':tempid===index}">
                                    <div class="checkbox">
                                        <el-checkbox :label="index">{{`\u3000`}}</el-checkbox>
                                    </div>
                                    <div class="temp-boxcon" @click="clickTemp(index,item)">
                                        <div class="temp-box-title">
                                            <span class="title-con">{{item.name}}</span>
                                            <el-dropdown trigger="click">
                                                <span class="el-icon-more"></span>
                                                <el-dropdown-menu slot="dropdown">
                                                    <el-dropdown-item>
                                                        <span>删除</span>
                                                    </el-dropdown-item>
                                                </el-dropdown-menu>
                                            </el-dropdown>
                                        </div>
                                        <div class="temp-box-con">
                                            {{item.desc}}
                                        </div>
                                    </div>
                                </div>
                            </el-checkbox-group>
                            
                        </div>
                    </el-scrollbar>
                </div>
            </div>
            <div class="config-right">
                <el-scrollbar class="config-right-scrollbar">
                    <div class="config-right-con">
                        <div class="handle-btn">
                            <handle-btn btnName="保存"></handle-btn>
                        </div>
                        <div class="config-form">
                            <el-form ref="ValidateForm" :model="initParams" :rules="rules" label-position="top">
                                <el-row :gutter="20">
                                    <el-col :span="6">
                                        <el-form-item label='视图名称' prop="name">
                                            <el-input v-model="initParams.name"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="12">
                                        <el-form-item label='描述' prop="desc">
                                            <el-input v-model="initParams.desc"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="6">
                                        <el-form-item :label="`\u3000`" prop="isIndex">
                                            <el-checkbox v-model="initParams.isIndex">作为主页</el-checkbox>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                            </el-form>
                        </div>
                        <div class="content scroll-content" v-scrollBar>
                            <DynamicComponent v-if="pathUrl" :pathUrl="pathUrl+`/Edit.vue`" 
                            @selectUrl="selectUrl"
                            @selectPoint="selectPoint" :dataObject="data" :templateUrl="pathUrl"></DynamicComponent>
                            <!-- <el-tabs v-model="activeName">
                                <el-tab-pane label='数据绑定' name="first">
                                    <Databind></Databind>
                                </el-tab-pane>
                                <el-tab-pane label='交互连接' name="second">
                                    <reciprocal-junction></reciprocal-junction>
                                </el-tab-pane>
                            </el-tabs> -->
                        </div>
                    </div>
                </el-scrollbar>
            </div>
        </div>
        <set-screen v-if="setInfo.visible" :dialogInfo="setInfo"></set-screen>
        <set-point v-if="pointInfo.visible" :dialogInfo="pointInfo" @backInfo="handleInfo"></set-point>
        <set-route v-if="urlInfo.visible" :dialogInfo="urlInfo" @backInfo="handleUrl"></set-route>
    </div>
</template>
<script>
import Databind from './component/Databind'
import ReciprocalJunction from './component/ReciprocalJunction'
import SetScreen from './component/SetScreen'
import DynamicComponent from '@/components/DynamicComponent'
import SetPoint from './component/SetPoint'
import SetRoute from './component/SetRoute'
export default {
    components:{Databind,ReciprocalJunction,SetScreen,DynamicComponent,SetPoint,SetRoute},
    created() {
        this.getInfo();
    },
    mounted() {
        
    },
    data(){
        return{
            checkList:[],
            tempid:"",
            activeName:"first",
            tempList:[],
            initParams:{
                name:"",
                desc:"",
                isIndex:false
            },
            pathUrl:"",
            tempData:{},
            data:{},
            pointInfo:{
                key:"",
                visible:false
            },
            urlInfo:{
                key:"",
                visible:false
            },



            rules:{

            },
            setInfo:{
                visible:false
            }
        }
    },
	methods: {
        selectPoint:function(key){
            this.pointInfo.key=key;
            this.pointInfo.visible=true;
        },
        selectUrl:function(key){
            this.urlInfo.key=key;
            this.urlInfo.visible=true;
        },
        handleInfo:function(data){
            let showNamme=data.devname+"-"+data.pointname;
            this.data[this.pointInfo.key]=showNamme;
            this.tempData.data.forEach((element,index) => {
                if(element.key==this.pointInfo.key){
                    this.tempData.data[index].devid=data.devid;
                    this.tempData.data[index].pointid=data.pointid;
                    this.tempData.data[index].showNamme=showNamme;
                }
            });
        },
        handleUrl:function(data){
            this.tempData.url.forEach((element,index) => {
                if(element.key==this.urlInfo.key){
                    this.tempData.url[index].pathUrl=data.pathUrl;
                }
            });
        },
        getInfo(){
            this.$api.post("/getBigInfo",{}).then(res=>{
                console.log(res)
                if(res.err_code=="0"){
                    this.tempList=res.data;
                }
            })
        },
        clickTemp:function(index,item){
            this.tempid=index;
            this.pathUrl=item.pathUrl;
            this.tempData=item;
            this.initParams=Object.assign(this.initParams,item);
        },
        setScreen:function(){
            this.setInfo.visible=true;
        },
        setData:function(info){
            let data={};
            for(let i=0;i<this.tempData.data.length;i++){
                for(let j=0;j<info.length;j++){
                    if(this.tempData.data[i].key==info[j].key){
                        data[info[j].key]=info[j].showNamme;
                    }
                }
            }
            this.data=data;
            console.log(this.data)
        }
	},
    watch: {
        pathUrl:function(){
            console.log(this.tempData)
            this.setData(this.tempData.data)
        }
    }
}
</script>
<style lang="less" scoped>
    .module-theme(...){
        .content{
            padding: 10px 0;
            .config-con{
                width: 100%;
                display: flex;
                justify-content: space-between;
                height: 100%;
            }
            .config-left{
                width: 25%;
                height: 100%;
                padding: 0 @boxMargin;
                .config-left-top{
                    width: 100%;
                    height: 35px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }
                .search-con{
                    width: calc(100% + 15px);
                    max-height: calc(100% - 35px);
                    .scrollbar-con{
                        padding-right: 15px;
                    }
                }
                .temp-box{
                    width: 100%;
                    padding: @boxMargin;
                    min-height: 100px;
                    background: @normalBg;
                    border: 1px solid @normalBg;
                    margin-bottom: @boxMargin;
                    cursor: pointer;
                    display: flex;
                    justify-content: space-between;
                    &.active{
                        border-color: @activeColor;
                    }
                    .checkbox{
                        display: flex;
                        align-items: center;
                    }
                    .temp-boxcon{
                        width: 100%;
                        font-size: 14px;
                    }
                    .temp-box-title{
                        display: flex;
                        justify-content: space-between;
                        margin-bottom: @itemMargin;
                        font-size: 16px;
                        color: @bgColor;
                        height: 24px;
                        overflow: hidden;
                        .title-con{
                            overflow: hidden;
                            white-space: nowrap;
                            width: calc(100% - 30px);
                            text-overflow: ellipsis;
                        }
                    }
                    .el-icon-more{
                        cursor: pointer;
                    }
                }
            }
            .config-right{
                width: 75%;
                height: 100%;
                padding: 0 @boxMargin;
                .handle-btn{
                    display: flex;
                    justify-content: flex-end;
                }
                .card-mt{
                    margin-top: @boxMargin;
                }
                .config-right-scrollbar{
                    width: calc(100% + 10px);
                    height: 100%;
                }
                .config-right-con{
                    width: 100%;
                    height: 100%;
                }
                .config-form{
                    width: 100%;
                    overflow: hidden;
                }
                .tabs-btn{
                    position: absolute;
                    top: -50px;
                    right: 0;
                }
            }
        }
        .btn{
            /deep/ .el-input-group__append{
                border-top: 1px solid @activeColor;
                border-bottom: 1px solid @activeColor;
                .el-button{
                    border-radius: 0 4px 4px 0;
                }
            }
        }
        .scroll-content{
            height: calc(100% - 110px)
        }
    }
</style>