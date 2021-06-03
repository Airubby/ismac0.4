<template>
    <div class="content">
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
            <template v-slot:preview-handle="scope">
                <p class="table_handle">
                    <span>编辑</span>
                    <span>删除</span>
                </p>
            </template>
        </el-table-pagination>
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
            tableData:[
                {'a':"admin",b:"管理员",'c':"2020-3-10~2021-2-22",d:'15225252525',e:"123@qq.com",f:"1",g:"2",h:'WEB'},
                {'a':"admin",b:"管理员",'c':"2020-3-10~2021-2-22",d:'15225252525',e:"123@qq.com",f:"1",g:"2",h:'WEB'},
                {'a':"admin",b:"管理员",'c':"2020-3-10~2021-2-22",d:'15225252525',e:"123@qq.com",f:"1",g:"2",h:'WEB'},
                {'a':"admin",b:"管理员",'c':"2020-3-10~2021-2-22",d:'15225252525',e:"123@qq.com",f:"1",g:"2",h:'WEB'},
                {'a':"admin",b:"管理员",'c':"2020-3-10~2021-2-22",d:'15225252525',e:"123@qq.com",f:"1",g:"2",h:'WEB'},
                {'a':"admin",b:"管理员",'c':"2020-3-10~2021-2-22",d:'15225252525',e:"123@qq.com",f:"1",g:"2",h:'WEB'},

            ],
            tableColumns:[
                { prop: 'a', label: '计算序号',minWidth:10},
                { prop: 'b', label: '操作符',minWidth:10},
                { prop: 'c', label: '数据源',minWidth:10},
                { prop: 'd', label: '参数',minWidth:10},
                { prop: 'handle', label: '操作',slotName:'preview-handle',width:120},
            ],
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
        
    }
</style>