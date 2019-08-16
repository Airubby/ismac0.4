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
                        :params="initParams"
                        placeholder="请输入教室名称"
                        prefix-icon="el-icon-search"
                        v-model="initParams.classname">
                    </el-input>
                    <el-button type="primary" size="small" @click="search">搜索</el-button>
                </div>
                <el-search-table-pagination
                    type="local" 
                    :params="initParams"
                    :data="table_data"
                    :showPagination="true"
                    :columns="table_columns" ref="thisRef">   
                </el-search-table-pagination>
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
            initParams:{
                classname:''
            },
            table_data:[
                {classname:"教室一",createTime:"2017-12-12 12:23:22",desc:"123"},
                {classname:"教室二",createTime:"2017-12-12 12:23:22",desc:"123"}
            ],
            table_columns:[
                { prop: 'classname', label: '名称',minWidth:10},
                { prop: 'createTime', label: '告警时间',minWidth:15},
                { prop: 'desc', label: '告警内容',minWidth:30},
            ],
        }
    },
	methods: {
        search:function(){
            this.$refs.thisRef.searchHandler(true);
        },
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
