<template>
    <div class="bgfffcontent">
        <div class="breadcrumb">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>{{$t("navbar.control")}}</el-breadcrumb-item>
                <el-breadcrumb-item>{{$t("navbar.controlAlarmRecord")}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="public_content">
            <el-scrollbar class="scrollbar">
            <el-search-table-pagination
                :url="$ajaxUrl+'/getTable'"
                list-field="data" 
                total-field="total"
                method='get' 
                :show-header="false"
                :params="initParams"
                :showPagination="true"
                :showSelectAll="true"
                :columns="table_columns" ref="thisRef">   
                <template slot-scope="scope" slot="preview-handle">
                    <div>
                        <p>卡号：{{scope.row.code}}</p>
                        <p>类型：{{scope.row.type}}</p>
                        <p>领卡人：{{scope.row.user}}</p>
                        <p>有效期：{{scope.row.indate}}</p>
                        <p>时间组：{{scope.row.timegroup}}</p>
                    </div>
                </template>
            </el-search-table-pagination>
            </el-scrollbar>
        </div>
    </div>
</template>

<script>
export default {
    created() {
        
    },
    mounted() {
        
    },
    data(){
        return{
            initParams:{

            },
            table_columns:[
              { prop: 'handle', label: '操作',slotName:'preview-handle',minWidth:100},
            ],
            table_data:[],
        }
    },
	methods: {
        
	},
    components: {
        
    }
}
</script>
