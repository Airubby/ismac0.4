<template>
    <div class="content">
        <el-form class="search-top" :model="initParams" :rules="rules" @submit.native.prevent ref="ValidateForm" label-position="top" >
            <div class="search">
                <el-form-item prop="alarm">
                    <el-radio-group v-model="initParams.alarm">
                        <el-radio label="1">全部满足</el-radio>
                        <el-radio label="2">任意满足</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item prop="alarm" style="margin-left:30px;">
                   <el-checkbox v-model="initParams.alarm">延时时间(s)：</el-checkbox>
                </el-form-item>
                <el-form-item prop="alarm">
                   <el-input v-model="initParams.alarm"></el-input>
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
        <event-list v-if="eventAddInfo.visible" :dialogInfo="eventAddInfo" @backInfo="backInfo"></event-list>
    </div>
</template>
<script>
import EventList from './EventList'
export default {
    components: {EventList},
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
                { prop: 'e', label: '状态',slotName:'preview-f',minWidth:10},
                { prop: 'handle', label: '操作',slotName:'preview-handle',width:60},
            ],
            eventAddInfo:{
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
            this.eventAddInfo.data=this.tableData;
            this.eventAddInfo.visible=true;
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