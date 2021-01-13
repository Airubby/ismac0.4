<template>
    <div class="content">
        <div class="mb">
            <span class="mr">事件配置</span><el-button type="primary" plain @click="$router.back(-1)">返回</el-button>
        </div>
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
                <el-form-item class="form-item" prop="" :label="`\u3000`">
                    <el-button type="primary" @click="submitForm()">提交</el-button>
                    <el-button type="primary" plain @click="resetForm()">重置</el-button>
                </el-form-item>
            </div>
            <div class="btn">
                <el-form-item class="form-item" prop="" :label="`\u3000`">
                    <el-button type="primary" @click="handleAdd">新建</el-button>
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
                    <span @click="handleAdd(scope.row)">编辑</span>
                    <span>删除</span>
                </p>
            </template>
        </el-table-pagination>
        <event-add v-if="eventAddInfo.visible" :dialogInfo="eventAddInfo"></event-add>
    </div>
</template>
<script>
import EventAdd from './component/EventAdd'
export default {
    components: {EventAdd},
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
                { prop: 'e', label: '状态',slotName:'preview-f',minWidth:10},
                { prop: 'f', label: '刷新时间',minWidth:10},
                { prop: 'handle', label: '操作',slotName:'preview-handle',width:100},
            ],
            eventAddInfo:{
                visible:false,
                data:null
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
        handleAdd:function(row){
            if(row){
                this.eventAddInfo.data=row;
            }else{
                this.eventAddInfo.data=null;
            }
            this.eventAddInfo.visible=true;
        },
	},
    
}
</script>
<style lang="less" scoped>
    .module-theme(...){
        .mb{
            margin-bottom: @boxMargin;
        }
        .mr{
            margin-right: @boxMargin;
        }
    }
</style>