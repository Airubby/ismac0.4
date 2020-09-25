<template>
    <div class="bgfffcontent">
        <el-scrollbar class="scrollbar">
            <el-card class="box-card mb20">
                <div slot="header" class="clearfix">
                    <span>配置table头部个数</span>
                </div>
                <el-table-pagination
                    type="local"
                    :page-sizes="[1000]"
                    :height="'240px'"
                    v-scrollBar="'table'"
                    :data="tableData"
                    :showPagination="false"
                    :columns="tableColumns" ref="thisRef">   
                    <el-table-column slot="prepend" type="index" label="组编号" width="100px"></el-table-column>
                    <template slot-scope="scope" slot="preview-handle">
                        <p class="table_handle"><span @click="edit(scope.row)">编辑</span><span @click="moreDelete(scope.row)">删除</span></p>
                    </template>
                </el-table-pagination>
            </el-card>
        </el-scrollbar>
    </div>
</template>

<script>
import {config} from './config'
export default {
    created() {
        this.getTimeGroup();
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
            ...config
        }
    },
	methods: {
        getTimeGroup:function(){
            this.$r.get("/getTable",{},r=>{
                console.log(r)
                if(r.err_code=="0"){
                    this.tableData=r.data;
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
    
</style>