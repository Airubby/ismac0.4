<template>
    <div class="content">
        <el-form class="search-top" :model="initParams" :rules="rules" @submit.native.prevent ref="ValidateForm" label-position="top" >
            <div class="search">
                <el-form-item prop="alarm" label="状态">
                    <el-select v-model="initParams.alarm" placeholder="请选择">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="alarm" label="有效期" class="form-item">
                    <el-date-picker
                    style="width:360px"
                    v-model="initParams.alarm"
                    type="datetimerange"
                    format="yyyy-MM-dd HH:mm:ss"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    range-separator="~"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item class="form-item" prop="" :label="`\u3000`">
                    <el-button type="primary" @click="submitForm()">提交</el-button>
                    <el-button type="primary" plain @click="resetForm()">重置</el-button>
                </el-form-item>
            </div>
            <div class="btn">
                <el-form-item class="form-item" prop="" :label="`\u3000`">
                    <el-button type="primary" @click="handlePage('linkageStrategiesAdd')">新建</el-button>
                    <el-button type="primary" plain @click="handlePage('linkageStrategiesEvent')">事件配置</el-button>
                    <el-button type="primary" plain @click="handlePage('linkageStrategiesAction')">动作配置</el-button>
                </el-form-item>
            </div>
        </el-form>
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
            <template v-slot:preview-f="scope">
                <span :class="['table-item',scope.row.g=='1'?'table-item-normal':'table-item-alarm']"></span>{{scope.row.g=="1"?"运行中":"关闭"}}
            </template>
            <template v-slot:preview-handle="scope">
                <p class="table_handle">
                    <span @click="handleStatu(scope.row)">{{scope.row.g=="1"?"停用":"启用"}}</span>
                    <span>执行日志</span>
                    <span @click="handleUser(scope.row)">编辑</span>
                    <span>删除</span>
                </p>
            </template>
        </el-table-pagination>
    </div>
</template>
<script>
export default {
    components: {
    },
    created() {
        
    },
    mounted() {
        
    },
    data(){
        return{
            options:[
                {value:"1",label:"运行中"},
                {value:"2",label:"关闭"},
            ],
            initParams:{
                alarm:"",
                date:""
            },
            rules:{

            },
            tableData:[
                {'a':"admin",b:"管理员",'c':"2020-3-10~2021-2-22",d:'15225252525',e:"123@qq.com",f:"1",g:"2",h:'WEB'},
                {'a':"admin",b:"管理员",'c':"2020-3-10~2021-2-22",d:'15225252525',e:"123@qq.com",f:"0",g:"1",h:'WEB'}
            ],
            tableColumns:[
                { prop: 'a', label: '名称',minWidth:10},
                { prop: 'b', label: '类型',minWidth:10},
                { prop: 'c', label: '有效期',minWidth:10},
                { prop: 'd', label: '描述',minWidth:10},
                { prop: 'e', label: '状态',slotName:'preview-f',minWidth:10},
                { prop: 'f', label: '创建人',minWidth:10},
                { prop: 'handle', label: '操作',slotName:'preview-handle',width:200},
            ],
        }
    },
    computed: {
    },
	methods: {
        backInfo:function(){

        },
        resetForm:function() {
            this.$refs['ValidateForm'].resetFields();
        },
        submitForm:function() {
            this.$refs['ValidateForm'].validate((valid) => {
                if (valid) {
                    
                }
            });
        },
        handlePage:function(path){
            this.$router.push({name:path});
        },
	},
    
}
</script>
<style lang="less" scoped>
    .module-theme(...){
        .table-item{
            width: 5px;
            height: 5px;
            border-radius: 50%;
            display: inline-block;
            margin-right: @itemMargin;
            &.table-item-normal{
                background: @normalColor;
            }
            &.table-item-alarm{
                background: @alarmColor;
            }
        }
    }
</style>