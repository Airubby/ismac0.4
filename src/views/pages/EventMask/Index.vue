<template>
    <div class="content">
        <div class="top">
            <el-button type="primary">新增规则</el-button>
        </div>
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
                    <span @click="handleRule(scope.row)">查看规则</span>
                </p>
            </template>
        </el-table-pagination>
        <show-rule :dialogInfo="ruleInfo" v-if="ruleInfo.visible"></show-rule>
    </div>
</template>
<script>
import ShowRule from './component/ShowRule'
export default {
    components: {
        ShowRule
    },
    created() {
        
    },
    mounted() {
        
    },
    data(){
        return{
            options:[
                {value:"1",label:"提示"},
                {value:"2",label:"次要"},
                {value:"3",label:"重要"},
                {value:"4",label:"严重"},
                {value:"5",label:"紧急"},
            ],
            initParams:{
                alarm:"",
                date:""
            },
            rules:{

            },
            tableData:[
                {code:"1",type:"告警",indate:"告警",timegroup:"告警",jieru:"2020-12",jieru1:"2020-12"},
                {code:"1",type:"告警",indate:"告警",timegroup:"告警",jieru:"2020-12",jieru1:"2020-12"},
                {code:"1",type:"告警",indate:"告警",timegroup:"告警",jieru:"2020-12",jieru1:"2020-12"},
                {code:"1",type:"告警",indate:"告警",timegroup:"告警",jieru:"2020-12",jieru1:"2020-12"},
                {code:"1",type:"告警",indate:"告警",timegroup:"告警",jieru:"2020-12",jieru1:"2020-12"},
                {code:"1",type:"告警",indate:"告警",timegroup:"告警",jieru:"2020-12",jieru1:"2020-12"},
                {code:"1",type:"告警",indate:"告警",timegroup:"告警",jieru:"2020-12",jieru1:"2020-12"},
                {code:"1",type:"告警",indate:"告警",timegroup:"告警",jieru:"2020-12",jieru1:"2020-12"},
                {code:"1",type:"告警",indate:"告警",timegroup:"告警",jieru:"2020-12",jieru1:"2020-12"},
                {code:"1",type:"告警",indate:"告警",timegroup:"告警",jieru:"2020-12",jieru1:"2020-12"},
                {code:"1",type:"告警",indate:"告警",timegroup:"告警",jieru:"2020-12",jieru1:"2020-12"},
                {code:"1",type:"告警",indate:"告警",timegroup:"告警",jieru:"2020-12",jieru1:"2020-12"},
            ],
            tableColumns:[
                { prop: 'code', label: '等级',minWidth:10},
                { prop: 'type', label: '告警事件',minWidth:10},
                { prop: 'indate', label: '定位',minWidth:10},
                { prop: 'timegroup', label: '触发原因',minWidth:10},
                { prop: 'jieru', label: '产生时间',minWidth:10},
                { prop: 'jieru1', label: '屏蔽时间',minWidth:10},
                { prop: 'jieru1', label: '屏蔽缘由',minWidth:10},
                { prop: 'handle', label: '操作',slotName:'preview-handle',width:90},
            ],
            ruleInfo:{
                visible:false,
                id:""
            }
        }
    },
	methods: {
        handleRule:function(item){
            this.ruleInfo.id=item.id;
            this.ruleInfo.visible=true;
        },
        resetForm() {
            this.$refs['ValidateForm'].resetFields();
        },
        submitForm() {
            this.$refs['ValidateForm'].validate((valid) => {
                if (valid) {
                    
                }
            });
        },
	},
    
}
</script>
<style lang="less" scoped>
    .module-theme(...){
        .top{
            color: @color;
            height: 32px;
            margin-bottom: @boxMargin;
            text-align: right;
        }
    }
</style>