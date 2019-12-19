<template>
    <div class="bgfffcontent">
        <div class="breadcrumb">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>{{$t("navbar.statement")}}</el-breadcrumb-item>
                <el-breadcrumb-item>{{$t("navbar.statementConvention")}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="public_content">
             <el-table-pagination
                        :url="$ajaxUrl+'/testpostTable'"
                        list-field="data" 
                        total-field="total"
                        method='post' 
                        :showPagination="true"
                        :params="initParams"
                        :columns="table_columns" ref="thisRef">   
                        <template slot-scope="scope" slot="preview-handle">
                            <p class="table_handle"><span @click="openDoor(scope.row)">开门</span><span @click="closeDoor(scope.row)">关门</span></p>
                        </template>
                    </el-table-pagination>
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
                type:"",
            },
            table_columns:[
              { prop: 'code', label: '编号',minWidth:10},
              { prop: 'type', label: '名称',minWidth:10},
              { prop: 'indate', label: '状态',minWidth:10},
              { prop: 'timegroup', label: '所属设备',minWidth:10},
              { prop: 'handle', label: '操作',slotName:'preview-handle',width:150},
            ],
        }
    },
	methods: {
        
	},
    components: {
        
    }
}
</script>
