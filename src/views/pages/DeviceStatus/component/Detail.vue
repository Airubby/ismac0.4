<template>
    <div class="content">
        <div class="center">
            <div class="searchbox">
                <el-select v-model="initParams.alarm" placeholder="请选择">
                    <el-option key="all" label="所有" value="all"></el-option>
                    <el-option key="1" label="关注" value="1"></el-option>
                </el-select>
            </div>
            <div class="searchbox">
                <el-input v-model="initParams.alarm" placeholder="请输入内容">
                    <i slot="suffix" class="el-input__icon el-icon-search cursor-pointer"></i>
                </el-input>
            </div>
        </div>
        <el-table-pagination
            list-field="data.item" 
            total-field="data.total"
            :data="tableData"
            method='post' 
            type="local"
            :params="initParams"
            :columns="tableColumns" ref="thisRef">   
            <el-table-column slot="prepend" type="selection"></el-table-column>
            <template v-slot:preview-value="scope">
                <span :class="['table-item',scope.row.h=='1'?'table-alarm':'table-normal']">{{scope.row.b}}</span>
            </template>
            <template v-slot:preview-handle="scope">
                <p class="table_handle">
                    <span>历史趋势</span>
                    <span>设置</span>
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
        this.$api.post(this.$Api.GetList,{}).then(res=>{
            console.log(res)
            if(res.err_code==0){
                this.tableData=res.data.item;
            }
        })
    },
    mounted() {
        
    },
    data(){
        return{
            initParams:{},
            tableData:[
                {a:"1号温湿度",b:"22",c:"依米康",d:"2020-10-22",e:"机房222",f:"正常",g:"告警",h:"1",id:"1"},
                {a:"1号温湿度",b:"33",c:"依米康",d:"2020-10-22",e:"机房222",f:"正常",g:"告警",h:"2",id:"2"},
            ],
            tableColumns:[
                { prop: 'a', label: '测点名称',minWidth:10},
                { prop: 'b', label: '当前值',slotName:'preview-value',minWidth:10},
                { prop: 'c', label: '有效值范围',minWidth:10},
                { prop: 'd', label: '采集值',minWidth:10},
                { prop: 'e', label: '信号类型',minWidth:10},
                { prop: 'f', label: '测点分类',minWidth:10},
                { prop: 'handle', label: '操作',slotName:'preview-handle',width:130},
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
        .center{
            display: flex;
            height: 32px;
            margin-bottom: @boxMargin;
            align-items: center;
            .title{
                margin-right: @itemMargin;
            }
            .searchbox{
                margin-right: @boxMargin;
            }
        }
        .table-item{
            color: @bgColor;
            border-radius: 2px;
            min-width: 56px;
            height: 24px;
            display: inline-block;
            text-align: center;
            line-height: 24px;
            padding: 0 5px;
            &.table-alarm{
                background: @alarmColor;
            }
            &.table-normal{
                background: @activeColor;
            }
        }
    }
</style>