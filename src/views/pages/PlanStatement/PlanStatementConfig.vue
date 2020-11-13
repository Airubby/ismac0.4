<template>
    <div class="content">
        <div class="config-top">
            <span class="config-top-title">计划及模板配置</span><el-button type="primary" plain @click="$router.back(-1)">返回</el-button>
        </div>
        <div class="config-con">
            <div class="config-left">
                <el-input placeholder="请输入内容" v-model="initParams.search">
                    <template slot="append">
                        <div class="btn">搜索</div>
                    </template>
                </el-input>
                <div class="search-box">共搜索到22个模板</div>
                <div class="search-con scrollbar">
                    <el-scrollbar>
                        <div class="scrollbar-con">
                            <div class="temp-box" v-for="item in 20" :key="item">
                                <div class="temp-box-title">
                                    <span class="title-con">模板名称</span>
                                    <el-dropdown trigger="click">
                                        <span class="el-icon-more"></span>
                                        <el-dropdown-menu slot="dropdown">
                                            <el-dropdown-item>
                                                <span>预览</span>
                                            </el-dropdown-item>
                                            <el-dropdown-item>
                                                <span>创建计划</span>
                                            </el-dropdown-item>
                                            <el-dropdown-item>
                                                <span>删除模板</span>
                                            </el-dropdown-item>
                                        </el-dropdown-menu>
                                    </el-dropdown>
                                </div>
                                <div class="temp-box-con">
                                    说明：这里可以放一两项简单描述，不做操作，仅可点击查看详情
                                </div>
                            </div>
                        </div>
                    </el-scrollbar>
                </div>
                <el-button type="primary" plain class="add-btn" @click="enterAddTemp()"><i class="el-icon-plus"></i></el-button>
            </div>
            <div class="config-right">
                <el-form class="search-top" :model="initParams" :rules="rules" @submit.native.prevent ref="ValidateForm" label-position="top" >
                    <div class="search">
                        <el-form-item prop="alarm" label="类型">
                            <el-select v-model="initParams.alarm" placeholder="请选择">
                                <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item class="form-item" prop="" :label="`\u3000`">
                            <el-button type="primary" @click="submitForm()">提交</el-button>
                            <el-button type="primary" plain @click="resetForm()">重置</el-button>
                        </el-form-item>
                    </div>
                    <div class="btn">
                        <el-form-item class="form-item" prop="" :label="`\u3000`">
                            <el-button type="primary" @click="enterAddPlan()">新建</el-button>
                            <el-button type="primary" plain >批量删除</el-button>
                        </el-form-item>
                    </div>
                </el-form>
                <div class="table-box">
                    <el-scrollbar>
                        <div class="scrollbar-con">
                            <el-table-pagination
                                :url="$ajaxUrl+'/getTable'"
                                list-field="data" 
                                total-field="total"
                                type="local"
                                :data="tableData"
                                method='get' 
                                :params="initParams"
                                :columns="tableColumns" ref="thisRef">   
                                <el-table-column slot="prepend" type="selection"></el-table-column>
                                <template v-slot:preview-g="scope">
                                    <span :class="['table-item',scope.row.g=='1'?'table-item-normal':'table-item-alarm']"></span>{{scope.row.g=="1"?"在线":"离线"}}
                                </template>
                                <template v-slot:preview-f="scope">
                                    <span :class="['table-item',scope.row.f=='1'?'table-item-normal':'table-item-alarm']"></span>{{scope.row.f=="1"?"正常":"停用"}}
                                </template>
                                <template v-slot:preview-handle="scope">
                                    <p class="table_handle">
                                        <span>编辑</span>
                                        <span>删除</span>
                                    </p>
                                </template>
                            </el-table-pagination>
                        </div>
                    </el-scrollbar>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    created() {
        
    },
    mounted() {
        
    },
    data(){
        return{
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
            ]
        }
    },
	methods: {
        enterAddPlan:function(){
            this.$router.push({name:'planStatementAddPlan'});
        },
        enterAddTemp:function(){
            this.$router.push({name:'planStatementAddTemp'});
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
            padding: 0;
            .config-top{
                width: 100%;
                padding: @boxMargin;
                .config-top-title{
                    margin-right: @boxMargin;
                    font-size: 16px;
                }
            }
            .config-con{
                width: 100%;
                display: flex;
                justify-content: space-between;
                height: calc(100% - 32px - @boxMargin - @boxMargin);
            }
            .config-left{
                width: 25%;
                height: 100%;
                padding: 0 @boxMargin;
                .search-box{
                    padding: 10px 0;
                }
                .search-con{
                    width: calc(100% + 15px);
                    max-height: calc(100% - 120px);
                    .scrollbar-con{
                        padding-right: 15px;
                    }
                }
                .add-btn{
                    width: 100%;
                }
                .temp-box{
                    width: 100%;
                    padding: @boxMargin;
                    min-height: 100px;
                    background: @normalBg;
                    border: 1px dashed @bgColor;
                    margin-bottom: @boxMargin;
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
                padding: 0 @boxMargin;
                .table-box{
                    width: calc(100% + 15px);
                    height: calc(100% - 80px);
                    .scrollbar-con{
                        padding-right: 15px;
                    }
                }
            }
        }
    }
</style>