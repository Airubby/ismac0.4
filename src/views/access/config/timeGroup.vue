<template>
    <div class="bgfffcontent">
        <el-scrollbar class="scrollbar">
            <el-card class="box-card mb20">
                <div slot="header" class="clearfix">
                    <span>时间组</span>
                </div>
                <el-search-table-pagination
                    type="local"
                    :page-sizes="[1000]"
                    :data="table_data"
                    :showPagination="false"
                    :columns="table_columns" ref="thisRef">   
                    <el-table-column slot="prepend" type="index" label="组编号" width="100px"></el-table-column>
                    <template slot-scope="scope" slot="preview-handle">
                        <p class="table_handle"><span @click="edit(scope.row)">编辑</span><span @click="moreDelete(scope.row)">删除</span></p>
                    </template>
                </el-search-table-pagination>
                <div class="time_group_add" @click="timegroupAdd()">
                    <i class="el-icon-plus"></i>新增时间组
                </div>
            </el-card>
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>基础时间段</span>
                </div>
                <el-search-table-pagination
                    type="local"
                    :page-sizes="[1000]"
                    :data="table_data"
                    :showPagination="false"
                    :columns="table_columns1" ref="thisRef">   
                    <el-table-column slot="prepend" type="index" label="段编号" width="100px"></el-table-column>
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
</template>

<script>
export default {
    created() {
        this.getTimeGroup();
        this.getTimeSection();
    },
    mounted() {
        
    },
    data(){
        return{
            initParams:{
                code:'',
                type:'',
                user:'',
                indate:'',
                timegroup:'',
                jieru:''
            },
            table_columns:[
                { prop: 'type', label: '组名称',minWidth:10},
                { prop: 'user', label: '周一',minWidth:10},
                { prop: 'indate', label: '周二',minWidth:10},
                { prop: 'timegroup', label: '周三',minWidth:10},
                { prop: 'jieru', label: '周四',minWidth:10},
                { prop: 'zw', label: '周五',minWidth:10},
                { prop: 'zl', label: '周六',minWidth:10},
                { prop: 'handle', label: '操作',slotName:'preview-handle',width:120},
            ],
            table_columns1:[
                { prop: 'type', label: '段名称',minWidth:10},
                { prop: 'user', label: '时段1',minWidth:10},
                { prop: 'indate', label: '时段2',minWidth:10},
                { prop: 'timegroup', label: '时段3',minWidth:10},
                { prop: 'jieru', label: '时段4',minWidth:10},
                { prop: 'zw', label: '时段5',minWidth:10},
                { prop: 'zl', label: '时段6',minWidth:10},
                { prop: 'handle', label: '操作',slotName:'preview-handle',width:120},
            ],
            table_data:[],
            table_data1:[],
        }
    },
	methods: {
        getTimeGroup:function(){
            this.$r.get("/getTable",{},r=>{
                console.log(r)
                if(r.err_code=="0"){
                    this.table_data=r.data;
                }else{
                    this.$message.warning(r.err_msg);
                }
            })
        },
        getTimeSection:function(){
            this.$r.get("/getTable",{},r=>{
                console.log(r)
                if(r.err_code=="0"){
                    this.table_data1=r.data;
                }else{
                    this.$message.warning(r.err_msg);
                }
            })
        },
        timegroupAdd:function(){
            
        },
        timesectionAdd:function(){

        },

	},
    components: {
        
    }
}
</script>
<style lang="less" scoped>
    @import "~@/assets/css/access.less";
</style>