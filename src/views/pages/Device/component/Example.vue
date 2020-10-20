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
            <template slot-scope="scope" slot="preview-handle">
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
                {'a':"admin",b:"管理员",'c':"2020-3-10~2021-2-22",d:'15225252525',e:"123@qq.com",f:"正常",g:"在线",h:'WEB'}
            ],
            tableColumns:[
                { prop: 'a', label: '设备编号',minWidth:10},
                { prop: 'b', label: '设备名称',minWidth:10},
                { prop: 'c', label: '位置',minWidth:10},
                { prop: 'd', label: '采集通道',minWidth:10},
                { prop: 'e', label: '在线状态',minWidth:10},
                { prop: 'f', label: '告警状态',minWidth:10},
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
    }
</style>