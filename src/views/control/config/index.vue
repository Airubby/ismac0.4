<template>
    <div class="bgfffcontent">
        <div class="breadcrumb">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>{{$t("navbar.control")}}</el-breadcrumb-item>
                <el-breadcrumb-item>{{$t("navbar.controlConfig")}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="public_content">
            <el-scrollbar class="scrollbar">
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>测点</span>
                </div>
                <el-search-table-pagination
                    class="table-add"
                    :url="$ajaxUrl+'/syslog/query'"
                    list-field="data.items" 
                    total-field="data.count"
                    method='post'
                    :data="table_data"
                    :showPagination="true"
                    :columns="table_columns" ref="thisRef">   
                    <template slot-scope="scope" slot="preview-handle">
                        <p class="table_handle"><span @click="edit(scope.row)">编辑</span><span @click="moreDelete(scope.row)">删除</span></p>
                    </template>
                </el-search-table-pagination>
                <div class="time_group_add" @click="timesectionAdd()">
                    <i class="el-icon-plus"></i>新增时间段
                </div>
            </el-card>
            </el-scrollbar>
        </div>
    </div>
</template>

<script>

export default {
    created() {
        // this.getInfo()
    },
    mounted() {
        
    },
    data(){
        return{
            table_columns:[
                { prop: 'details', label: '文本框',slotName:'preview-input',minWidth:10,type:"input"},
                { prop: 'selectname', label: '下拉框',slotName:'preview-select',minWidth:10,type:"select"},
                { prop: 'radioname', label: '单选框',slotName:'preview-radio',minWidth:10,type:"radio"},
                { prop: 'datename', label: '日期',slotName:'preview-date',minWidth:10,type:"date"},
                { prop: 'timename', label: '时间',slotName:'preview-time',minWidth:10,type:"time"},
                { prop: 'dialogname', label: '弹窗',slotName:'preview-dialog',minWidth:10,type:"dialog"},
                { prop: 'handle', label: '操作',slotName:'preview-handle',width:120},
            ],
            table_data:[],
        }
    },
	methods: {
        getInfo:function(){
            this.$r.get("/getEditTable",{},r=>{
                console.log(r)
                if(r.err_code=="0"){
                    this.table_data=r.data;
                }else{
                    this.$message.warning(r.err_msg);
                }
            })
        },
        timesectionAdd:function(){

        }
	},
    components: {
        
    }
}
</script>
