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
                <el-button type="primary" plain>模板更新同步到实例</el-button>
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
            <template v-slot:preview-e="scope">
                <span :class="['table-item',scope.row.e=='1'?'table-item-normal':'table-item-alarm']"></span>{{scope.row.e=="1"?"在线":"离线"}}
            </template>
            <template v-slot:preview-f="scope">
                <span :class="['table-item',scope.row.f=='1'?'table-item-normal':'table-item-alarm']"></span>{{scope.row.f=="1"?"运行中":"未启用"}}
            </template>
            <template v-slot:preview-handle="scope">
                <p class="table_handle">
                    <span>解耦</span>
                    <span>编辑</span>
                    <span>删除</span>
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
                {'a':"admin",b:"管理员",'c':"2020-3-10~2021-2-22",d:'15225252525',e:"1",f:"2",g:"阿达的",h:'WEB'}
            ],
            tableColumns:[
                { prop: 'a', label: '设备编号',minWidth:10},
                { prop: 'b', label: '设备名称',minWidth:10},
                { prop: 'c', label: '位置',minWidth:10},
                { prop: 'd', label: '采集通道',minWidth:10},
                { prop: 'e', label: '在线状态',slotName:'preview-e',minWidth:10},
                { prop: 'f', label: '告警状态',slotName:'preview-f',minWidth:10},
                { prop: 'g', label: '测点',minWidth:10},
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
            width: 5px;
            height: 5px;
            border-radius: 50%;
            display: inline-block;
            margin-right: @itemMargin;
            &.table-item-normal{
                background: @normalColor;
            }
            &.table-item-alarm{
                background: @alarmColor;
            }
        }
    }
</style>