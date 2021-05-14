<template>
    <div class="content">
        <el-button type="primary" plain class="btn">批量确认</el-button>
        <el-table-pagination
            list-field="data.item" 
            total-field="data.total"
            :data="tableData"
            method='post' 
            type="local"
            :params="initParams"
            :columns="tableColumns" ref="thisRef">   
            <el-table-column slot="prepend" type="selection"></el-table-column>
            <template slot-scope="scope" slot="preview-type">
                <div class="alarm-type">
                <i :class="{'icon-urgency':scope.row.type=='5',
                'icon-severity':scope.row.type=='4','icon-significance':scope.row.type=='3',
                'icon-general':scope.row.type=='2','icon-reminder':scope.row.type=='1'}"></i>
                {{scope.row.type | alarmShow(thisVue)}}
                </div>
            </template>
            <template slot-scope="scope" slot="preview-handle">
                <p class="table_handle">
                    <span>确认</span>
                    <span>屏蔽</span>
                </p>
            </template>
        </el-table-pagination>
    </div>
</template>
<script>
export default {
    mixins:[],
    filters:{
        alarmShow: function (value,_this) {
            if (!value) return ''
            const TYPE_MAP = {
                1: "提示",
                2: "次要",
                3: "重要",
                4: "严重",
                5: "紧急",
            }
            let n = parseInt(value);
            return TYPE_MAP[n];
        }
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
                { prop: 'type', label: '等级',slotName:'preview-type',minWidth:10},
                { prop: 'name', label: '告警事件',minWidth:10},
                { prop: 'addr', label: '定位',minWidth:20},
                { prop: 'content', label: '触发原因',minWidth:30},
                { prop: 'time', label: '产生时间',minWidth:10},
                { prop: 'time1', label: '解除时间',minWidth:10},
                { prop: 'handle', label: '操作',slotName:'preview-handle',width:140},
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