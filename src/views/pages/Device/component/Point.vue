<template>
    <div class="content">
        <div class="center">
            <div class="search">
                <div class="searchbox">
                    <el-select v-model="initParams.alarm" placeholder="请选择">
                        
                    </el-select>
                </div>
                <div class="searchbox">
                    <el-input v-model="initParams.alarm" placeholder="请输入内容">
                        <i slot="suffix" class="el-input__icon el-icon-search cursor-pointer"></i>
                    </el-input>
                </div>
            </div>
            <div class="btn">
                <el-button type="primary" plain>更新</el-button>
                <el-button type="primary" plain>批量删除</el-button>
                <el-button type="primary" plain>批量导入</el-button>
                <el-button type="primary" plain>批量导出</el-button>
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
                    <span @click="config(scope.row)">配置事件</span>
                </p>
            </template>
        </el-table-pagination>
        <point-config :dialogInfo="configInfo" v-if="configInfo.visible"></point-config>
    </div>
</template>
<script>
import PointConfig from './PointConfig'
export default {
    components:{PointConfig},
    mixins:[],
    filters:{
        
    },
    created() {
        
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
                { prop: 'a', label: '测点编号',minWidth:10},
                { prop: 'b', label: '测点名称',minWidth:10},
                { prop: 'c', label: '类型',minWidth:10},
                { prop: 'd', label: '单位',minWidth:10},
                { prop: 'e', label: '精度',minWidth:10},
                { prop: 'f', label: '枚举描述',minWidth:10},
                { prop: 'g', label: '有效值范围',minWidth:10},
                { prop: 'h', label: '指标分组',minWidth:10},
                { prop: 'h', label: '标准化指标',minWidth:10},
                { prop: 'handle', label: '操作',slotName:'preview-handle',width:130},
            ],
            configInfo:{
                visible:false,
                devid:'',
                pointid:'',
                alarmpara:'',
                pointtype:"",
                hislogpara:"",
                alarmdead:"",  //死区
                pointstate:"",  //点位状态
                valuerange:'',  //下发值范围判断
            }
        }
    },
	methods: {
        config:function(item){
            this.configInfo.visible=true;
        }
	}
}
</script>
<style lang="less" scoped>
    .module-theme(...){
        .center{
            display: flex;
            height: 32px;
            margin-bottom: @boxMargin;
            justify-content: space-between;
            align-items: center;
            .search{
                display: flex;
            }
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