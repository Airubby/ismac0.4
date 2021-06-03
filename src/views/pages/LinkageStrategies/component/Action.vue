<template>
    <div class="content">
        <el-form class="search-top" :model="initParams" :rules="rules" @submit.native.prevent ref="ValidateForm" label-position="top" >
            <div class="search">
                <el-form-item prop="alarm">
                   <el-checkbox v-model="initParams.alarm">任务失败,按以下频率重新执行：</el-checkbox>
                </el-form-item>
                <el-form-item prop="alarm">
                   <el-select v-model="initParams.alarm" placeholder="请选择" style="width: 100px;">
                        <el-option label="1分钟" value="1"></el-option>
                        <el-option label="5分钟" value="5"></el-option>
                        <el-option label="10分钟" value="10"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="alarm" style="margin: 0 10px;">
                   最多尝试次数
                </el-form-item>
                <el-form-item prop="alarm">
                   <el-input v-model="initParams.alarm" style="width: 150px;"></el-input>
                </el-form-item>
            </div>
            <div class="btn">
                <el-form-item class="form-item" prop="">
                    <el-button type="primary" plain @click="handleAdd">添加</el-button>
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
                    <span>删除</span>
                </p>
            </template>
        </el-table-pagination>
        <action-list v-if="actionAddInfo.visible" :dialogInfo="actionAddInfo" @backInfo="backInfo"></action-list>
    </div>
</template>
<script>
import ActionList from './ActionList'
export default {
    components: {ActionList},
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
                alarm:"1",
                date:""
            },
            rules:{

            },
            tableData:[
                {id:"1",'a':"admin",b:"管理员",'c':"2020-3-10~2021-2-22",d:'15225252525',e:"123@qq.com",f:"1",g:"2",h:'WEB'},
            ],
            tableColumns:[
                { prop: 'a', label: '名称',minWidth:10},
                { prop: 'e', label: '动作类型',slotName:'preview-f',minWidth:10},
                { prop: 'handle', label: '操作',slotName:'preview-handle',width:60},
            ],
            actionAddInfo:{
                visible:false,
                data:[]
            },
        }
    },
	methods: {
        //保存的操作
        handleSure:function(){
            this.$refs['ValidateForm'].validate((valid) => {
                if(valid){ //验证通过
                    
                }
            })
        },
        handleAdd:function(){
            this.actionAddInfo.data=this.tableData;
            this.actionAddInfo.visible=true;
        },
        backInfo:function(info){
            this.tableData=info;
        }
	},
    
}
</script>
<style lang="less" scoped>
    .module-theme(...){
    
    }
</style>