<template>
    <div class="content">
        <el-button type="primary" plain @click="$router.back(-1)">返回</el-button>
        <div class="card_title">
            <span class="title">基本信息</span>
        </div>
        <el-row class="row">
            <el-col :span="8" class="row-col">
                <div class="title">设备名称</div>
                <div>1号ups</div>
            </el-col>
            <el-col :span="8" class="row-col">
                <div class="title">状态</div>
                <div>告警</div>
            </el-col>
            <el-col :span="8" class="row-col">
                <div class="title">位置</div>
                <div>1号机房</div>
            </el-col>
            <el-col :span="8" class="row-col">
                <div class="title">类型</div>
                <div>ups</div>
            </el-col>
            <el-col :span="8" class="row-col">
                <div class="title">负责人</div>
                <div>呆呆呆</div>
            </el-col>
            <el-col :span="8" class="row-col">
                <div class="title">维保期限</div>
                <div>2020-1-12</div>
            </el-col>
        </el-row>
        <el-tabs v-model="activeName">
            <el-tab-pane label='概览' name="first">
                <Overview></Overview>
            </el-tab-pane>
            <el-tab-pane label='详情' name="second">
                <Detail></Detail>
            </el-tab-pane>
            <el-tab-pane label='告警' name="third" v-if="checkPermission(['assert'])">
                <Alarm></Alarm>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
import Overview from './component/Overview'
import Detail from './component/Detail'
import Alarm from './component/Alarm'
import {checkPermission} from '@/utils/Tool'
export default {
    components: {Overview,Detail,Alarm},
    mixins:[],
    filters:{
        
    },
    created() {
        console.log(this.$Api)
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
            activeName:'first',
            tableData:[]
        }
    },
    computed: {
    },
	methods: {
        checkPermission,
	},
    
}
</script>
<style lang="less" scoped>
    .module-theme(...){
        .card_title{
            margin-top: @boxMargin;
            margin-bottom: @itemMargin;
        }
        .row{
            margin-bottom: @boxMargin;
        }
        .row-col{
            display: flex;
            height: 32px;
            align-items: center;
            .title{
                width: 60px;
                text-align: right;
                margin-right: @boxMargin;
            }
        }
    }
</style>