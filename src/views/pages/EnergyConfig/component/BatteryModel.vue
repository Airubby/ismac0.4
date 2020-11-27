<template>
    <div class="content content-flex">
        <div class="config-left">
            <div class="config-left-search">
                <el-input placeholder="请输入内容" v-model="treeParams.search">
                    <i slot="suffix" class="el-input__icon el-icon-search"></i>
                </el-input>
            </div>
            <el-scrollbar class="config-left-scrollbar">
                <div class="config-left-con">
                    <el-tree :data="data" :props="defaultProps">

                    </el-tree>
                </div>
            </el-scrollbar>
        </div>
        <div class="config-right">
            <el-scrollbar class="config-right-scrollbar">
                <div class="config-right-con">
                    <div class="card_title"><div class="title">概要</div></div>
                    <div class="config-form">
                        <el-form ref="ValidateForm" :model="initParams" :rules="rules" label-position="top">
                            <el-row :gutter="30">
                                <el-col :span="24">
                                    <el-form-item label='名称' prop="name">
                                        <el-input v-model="initParams.name" disabled></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="24">
                                    <el-form-item label='' prop="name">
                                        <el-checkbox v-model="initParams.checked">用电配额管理</el-checkbox>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="24">
                                    <el-form-item label='瞬时限值' prop="name">
                                        <el-input v-model="initParams.name"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="24">
                                    <el-form-item label='日用电限值' prop="name">
                                        <el-input v-model="initParams.name"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="24">
                                    <el-form-item label='月用电限值' prop="name">
                                        <el-input v-model="initParams.name"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="24">
                                    <el-form-item label='' prop="name">
                                        <handle-btn @handleClick="sureHandle()" btnName="保存"></handle-btn>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </el-form>
                    </div>
                    <div class="card_title card-mt"><div class="title">测量模型</div></div>
                    <div class="content">
                        <el-tabs v-model="activeName">
                            <el-tab-pane label='电量计算' name="first">
                                <battery-model-table></battery-model-table>
                            </el-tab-pane>
                            <el-tab-pane label='瞬时用电' name="second">
                                <battery-model-table></battery-model-table>
                            </el-tab-pane>
                            <div class="tabs-btn">
                                <el-button type="text">清空</el-button>
                                <el-divider direction="vertical"></el-divider>
                                <el-button type="text">公式编辑器</el-button>
                            </div>
                        </el-tabs>
                    </div>
                </div>
            </el-scrollbar>
        </div>
    </div>
</template>
<script>
import BatteryModelTable from './BatteryModelTable'
export default {
    components: {
        BatteryModelTable
    },
    created() {
        
    },
    mounted() {
        
    },
    data(){
        return{
            treeParams:{
                search:"",
            },
            initParams:{
                name:"",
                checked:true,
            },
            data: [{
                label: '一级 1',
                children: [{
                    label: '二级 1-1',
                    children: [{
                    label: '三级 1-1-1'
                    }]
                }]
                }, {
                label: '一级 2',
                children: [{
                    label: '二级 2-1',
                    children: [{
                    label: '三级 2-1-1'
                    }]
                }, {
                    label: '二级 2-2',
                    children: [{
                    label: '三级 2-2-1'
                    }]
                }]
                }, {
                label: '一级 3',
                children: [{
                    label: '二级 3-1',
                    children: [{
                    label: '三级 3-1-1'
                    }]
                }, {
                    label: '二级 3-2',
                    children: [{
                    label: '三级 3-2-1'
                    }]
                }]
            }],
            defaultProps: {
                children: 'children',
                label: 'label'
            },
            rules:{

            },

            activeName:"first"
        }
    },
    computed: {
    },
	methods: {
        exportConfig:function(){
            console.log("model 导出")
        }
	},
    
}
</script>
<style lang="less" scoped>
    .module-theme(...){
        .content-flex{
            padding: 0;
            display: flex;
            justify-content: space-between;
        }
        .config-left{
            width: 250px;
            height: 100%;
            .config-left-search{
                width: 100%;
                height: 40px;
            }
            .config-left-scrollbar{
                width: calc(100% + 10px);
                height: calc(100% - 40px);
            }
            .config-left-con{
                width: 100%;
                padding-right: 10px;
            }
        }
        .config-right{
            width: calc(100% - 300px);
            height: 100%;
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
                width: 400px;
            }
            .tabs-btn{
                position: absolute;
                top: -50px;
                right: 0;
            }
        }
    }
</style>