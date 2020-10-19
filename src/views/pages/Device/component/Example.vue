<template>
    <div class="content">
        <el-table-pagination
            list-field="data.item" 
            total-field="data.total"
            :data="tableData"
            method='post' 
            type="local"
            :params="initParams"
            :columns="tableColumns" ref="thisRef">   
            <el-table-column slot="prepend" type="selection"></el-table-column>
            <template slot-scope="scope" slot="preview-handle">
                <p class="table_handle">
                    <span>移除</span>
                </p>
            </template>
        </el-table-pagination>
    </div>
</template>
<script>
export default {
    mixins:[],
    filters:{
        
    },
    created() {
        
    },
    mounted() {
        
    },
    data(){
        return{
            thisVue:this,
            initParams:{},
            tableData:[
                {"type":"1",name:"asdlf"},{"type":"1",name:"asdlf"},{"type":"1",name:"asdlf"},{"type":"1",name:"asdlf"},
                {"type":"1",name:"asdlf"},{"type":"1",name:"asdlf"},{"type":"1",name:"asdlf"},{"type":"1",name:"asdlf"},
                {"type":"1",name:"asdlf"},{"type":"1",name:"asdlf"},{"type":"1",name:"asdlf"},{"type":"1",name:"asdlf"},
                {"type":"1",name:"asdlf"},{"type":"1",name:"asdlf"},{"type":"1",name:"asdlf"},{"type":"1",name:"asdlf"},
                {"type":"1",name:"asdlf"},{"type":"1",name:"asdlf"},{"type":"1",name:"asdlf"},{"type":"1",name:"asdlf"},
                {"type":"1",name:"asdlf"},{"type":"1",name:"asdlf"},{"type":"1",name:"asdlf"},{"type":"1",name:"asdlf"},
                {"type":"1",name:"asdlf"},{"type":"1",name:"asdlf"},{"type":"1",name:"asdlf"},{"type":"1",name:"asdlf"},
                {"type":"1",name:"asdlf"},{"type":"1",name:"asdlf"},{"type":"1",name:"asdlf"},{"type":"1",name:"asdlf"},
            ],
            tableColumns:[
                { prop: 'type', label: '设备名称',slotName:'preview-type',minWidth:10},
                { prop: 'name', label: '设备编号',minWidth:10},
                { prop: 'addr', label: '通讯地址',minWidth:10},
                { prop: 'content', label: '通讯参数',minWidth:10},
                { prop: 'handle', label: '操作',slotName:'preview-handle',width:60},
            ]
        }
    },
    computed: {
    },
	methods: {
        
	},
    components: {
        
    }
}
</script>
<style lang="less" scoped>
    .module-theme(...){
        .btn{
            margin-bottom: @boxMargin;
        }
        .alarm-type{
            display:flex;
            align-items: center;
            i{
                margin-right: @itemMargin;
            }
        }
    }
</style>