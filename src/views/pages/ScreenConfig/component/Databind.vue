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
                    <span @click="config(scope.row)">配置</span>
                </p>
            </template>
        </el-table-pagination>
        <set-point v-if="pointInfo.visible" :dialogInfo="pointInfo"></set-point>
    </div>
</template>
<script>
import SetPoint from './SetPoint'
export default {
    components: {SetPoint},
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
                { prop: 'a', label: 'KEY',minWidth:10},
                { prop: 'b', label: '描述',minWidth:20},
                { prop: 'c', label: '格式化',minWidth:10},
                { prop: 'd', label: '点位',minWidth:10},
                { prop: 'handle', label: '操作',slotName:'preview-handle',width:60},
            ],
            pointInfo:{
                visible:false,
                data:{}
            }
        }
    },
    computed: {
    },
	methods: {
        config(data){
            console.log(data)
            this.pointInfo.visible=true;
        }
	},
    
}
</script>
<style lang="less" scoped>
    .module-theme(...){
        
    }
</style>