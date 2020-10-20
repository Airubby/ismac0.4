<template>
    <div class="content">
        <el-button type="primary" plain @click="$router.back(-1)">返回</el-button>
        <div class="card_title">
            创建实例
        </div>
        <el-row class="row">
            <el-col :span="8" class="row-col">
                <div class="title">设备分类</div>
                <div>ATS</div>
            </el-col>
            <el-col :span="8" class="row-col">
                <div class="title">品牌</div>
                <div>依米康</div>
            </el-col>
            <el-col :span="8" class="row-col">
                <div class="title">型号</div>
                <div>K200</div>
            </el-col>
            <el-col :span="8" class="row-col">
                <div class="title">参数</div>
                <div>11111</div>
            </el-col>
            <el-col :span="8" class="row-col">
                <div class="title">协议</div>
                <div>Modbus</div>
            </el-col>
            <el-col :span="8" class="row-col">
                <div class="title">位置</div>
                <div>机房1</div>
            </el-col>
            <el-col :span="8" class="row-col">
                <div class="title">负责人</div>
                <div>呆呆呆</div>
            </el-col>
            <el-col :span="8" class="row-col">
                <div class="title">更新时间</div>
                <div>2020-1-11</div>
            </el-col>
            <el-col :span="8" class="row-col">
                <div class="title">描述</div>
                <div>上来打飞机打了个福建省立方事件发生</div>
            </el-col>
        </el-row>
        <el-tabs v-model="activeName">
            <el-tab-pane label='测点' name="first">
                <Point></Point>
            </el-tab-pane>
            <el-tab-pane label='界面' name="second">
                <Techweb></Techweb>
            </el-tab-pane>
            <el-tab-pane label='实例' name="third">
                <Example></Example>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
import Techweb from './component/Techweb'
import Point from './component/Point'
import Example from './component/Example'
export default {
    components: {Techweb,Point,Example},
    mixins:[],
    filters:{
        
    },
    created() {
        
    },
    mounted() {
        
    },
    data(){
        return{
            activeName:'first',
        }
    },
    computed: {
    },
	methods: {
        
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