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
                                <div class="temp-box" v-for="(item,index) in 20" :key="item" :class="{'active':tempid===index}">
                                    <div class="checkbox">
                                        <el-checkbox :label="index">{{`\u3000`}}</el-checkbox>
                                    </div>
                                    <div class="temp-boxcon" @click="clickTemp(index)">
                                        <div class="temp-box-title">
                                            <span class="title-con">配电系统</span>
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
                                            说明：这里可以放一两项简单描述，不做操作，仅可点击查看详情
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
                            <handle-btn @handleClick="sureHandle()" btnName="保存"></handle-btn>
                        </div>
                        <div class="config-form">
                            <el-form ref="ValidateForm" :model="initParams" :rules="rules" label-position="top">
                                <el-row :gutter="20">
                                    <el-col :span="8">
                                        <el-form-item label='视图名称' prop="name">
                                            <el-input v-model="initParams.name"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="16">
                                        <el-form-item :label="`\u3000`" prop="name">
                                            <el-checkbox v-model="initParams.checked">作为主页</el-checkbox>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="8">
                                        <el-form-item label='描述' prop="name">
                                            <el-input v-model="initParams.name"></el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                            </el-form>
                        </div>
                        <div class="content">
                            <el-tabs v-model="activeName">
                                <el-tab-pane label='数据绑定' name="first">
                                    <Databind></Databind>
                                </el-tab-pane>
                                <el-tab-pane label='交互连接' name="second">
                                    <reciprocal-junction></reciprocal-junction>
                                </el-tab-pane>
                            </el-tabs>
                        </div>
                    </div>
                </el-scrollbar>
            </div>
        </div>
        <set-screen v-if="setInfo.visible" :dialogInfo="setInfo"></set-screen>
    </div>
</template>
<script>
import Databind from './component/Databind'
import ReciprocalJunction from './component/ReciprocalJunction'
import SetScreen from './component/SetScreen'
export default {
    components:{Databind,ReciprocalJunction,SetScreen},
    created() {
        
    },
    mounted() {
        
    },
    data(){
        return{
            checkList:[],
            tempid:"",
            activeName:"first",
            options:[
                {value:"1",label:"设备"},
            ],
            initParams:{
                search:""
            },
            rules:{

            },
            tableData:[
                {code:"1",type:"告警",indate:"告警",timegroup:"告警",jieru:"2020-12",jieru1:"2020-12"},
                {code:"1",type:"告警",indate:"告警",timegroup:"告警",jieru:"2020-12",jieru1:"2020-12"},
                {code:"1",type:"告警",indate:"告警",timegroup:"告警",jieru:"2020-12",jieru1:"2020-12"},
                {code:"1",type:"告警",indate:"告警",timegroup:"告警",jieru:"2020-12",jieru1:"2020-12"},
            ],
            tableColumns:[
                { prop: 'code', label: '计划名称',minWidth:10},
                { prop: 'type', label: '类型',minWidth:10},
                { prop: 'indate', label: '描述',minWidth:20},
                { prop: 'timegroup', label: '订阅用户',minWidth:20},
                { prop: 'handle', label: '操作',slotName:'preview-handle',width:100},
            ],
            setInfo:{
                visible:false
            }
        }
    },
	methods: {
        clickTemp:function(index){
            this.tempid=index;
        },
        setScreen:function(){
            this.setInfo.visible=true;
        },
        resetForm() {
            this.$refs['ValidateForm'].resetFields();
        },
        submitForm() {
            this.$refs['ValidateForm'].validate((valid) => {
                if (valid) {
                    
                }
            });
        },
	},
    watch: {
        
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
                    padding-right: 10px;
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
        
    }
</style>