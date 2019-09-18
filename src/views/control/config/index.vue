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
                    <el-input
                        style="width:300px;"
                        size="small"
                        class="loncom_mr10"
                        placeholder="请输入名称"
                        prefix-icon="el-icon-search"
                        v-model="initParams.user">
                    </el-input>
                    <el-button type="primary" size="small" @click="search">搜索</el-button>
                </div>
                <el-search-table-pagination
                    type="local" 
                    :params="initParams"
                    :data="table_data"
                    :page-sizes="[4]"
                    :showPagination="true"
                    :show-select-all="true"
                    select-id="code"
                    :columns="table_columns" ref="thisRef">   
                    <el-table-column slot="prepend" type="selection"></el-table-column>
                    <template slot-scope="scope" slot="preview-handle">
                            <p class="table_handle"><span @click="del(scope.row,scope.$index)">删除</span></p>
                        </template>
                </el-search-table-pagination>
            </el-card>
            </el-scrollbar>
        </div>
    </div>
</template>

<script>

export default {
    created() {
        this.getInfo()
    },
    mounted() {
        
    },
    data(){
        return{
            initParams:{
                user:''
            },
            table_data:[
            ],
            table_columns:[
               { prop: 'user', label: '设备名称',minWidth:10},
              { prop: 'type', label: '设备类型',minWidth:10},
              { prop: 'indate', label: '位置',minWidth:10},
              { prop: 'timegroup', label: '监控状态',minWidth:10},
              { prop: 'jieru', label: '告警状态',minWidth:10},
              { prop: 'handle', label: '操作',slotName:'preview-handle',width:120},
            ],
        }
    },
	methods: {
        search:function(){
            this.$refs.thisRef.searchHandler(true);
        },
        getInfo:function(){
            // this.$r.get("/getEditTable",{},r=>{
            //     console.log(r)
            //     if(r.err_code=="0"){
            //         this.table_data=r.data;
            //     }else{
            //         this.$message.warning(r.err_msg);
            //     }
            // })
            this.$r.get("/getTable",{},r=>{
                if(r.err_code=="0"){
                    this.table_data=r.data;
                }else{
                    this.$message.warning(r.err_msg);
                }
            })
        },
        del:function(row,index){
            // console.log(row)
            // console.log(index);
            // this.table_data=this.table_data.filter((item)=>{
            //     return item !="";
            // })
            this.table_data.forEach((item, index, arr)=> {
                let flag=this.$tool.equalsObj(item,row)
                if(flag){
                    this.table_data.splice(index, 1);
                    console.log(this.table_data)
                    this.$refs.thisRef.searchHandler(true);
                }
            });
        },
        timesectionAdd:function(){

        }
	},
    components: {
        
    }
}
</script>
