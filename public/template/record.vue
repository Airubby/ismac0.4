<template>
    <div>
        {{activeName}}
        <div class="bg" :style="'background:url('+templateUrl+'/logo.png);background-size: contain;'"></div>
        <el-table-pagination
            :url="$ajaxUrl+'/getTable'"
            list-field="data" 
            total-field="total"
            method='get' 
            :params="initParams"
            :showPagination="true"
            :columns="table_columns" ref="thisRef">   
            <el-table-column slot="prepend" type="selection"></el-table-column>
            <template slot-scope="scope" slot="preview-handle">
                <span class="color">操作</span>
            </template>
        </el-table-pagination>
    </div>
</template>
<style lang="less" scoped>
    .bg{
        width: 60px;
        height: 60px;
    }
</style>
<script>

module.exports = {
    props:["templateData","templateUrl"],
    components: {
        
    },
    created() {
        
    },
    mounted() {
        
    },
    data(){
        return{
            activeName:'另一个远程组件',
            initParams:{
                code:'',
                type:'',
                user:'',
                indate:'',
                timegroup:'',
                jieru:''
            },
            table_columns:[
              { prop: 'code', label: '时间',minWidth:10},
              { prop: 'type', label: '事件',minWidth:10},
              { prop: 'timegroup', label: '位置',minWidth:10},
            ],
            table_data:[],
        }
    },
	methods: {
        
    },
    watch:{
        
    }
    
}
</script>
