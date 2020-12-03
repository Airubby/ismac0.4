<template>
    <div class="content">
        <el-tabs v-model="activeName" class="content">
            <el-tab-pane label='电量模型' name="first" class="content">
                <battery-model v-if="activeName=='first'" ref="tabs"></battery-model>
            </el-tab-pane>
            <el-tab-pane label='群控配置' name="second" class="content">
                <group-config v-if="activeName=='second'" ref="tabs"></group-config>
            </el-tab-pane>
            <div class="tabs-btn" v-if="activeName=='first'">
                <el-button type="text" @click="add()">新增</el-button>
                <el-divider direction="vertical"></el-divider>
                <el-button type="text" @click="exportConfig()">导出配置</el-button>
                <el-divider direction="vertical"></el-divider>
                <el-button type="text" @click="importConfig()">导入配置</el-button>
            </div>
        </el-tabs>
    </div>
</template>
<script>
import BatteryModel from './component/BatteryModel'
import GroupConfig from './component/GroupConfig'
export default {
    components: {
        BatteryModel,GroupConfig
    },
    created() {
        
    },
    mounted() {
        
    },
    data(){
        return{
            activeName:"first",
        }
    },
	methods: {
        add:function(){
            this.$refs.tabs.add();
        },
        addBack:function(){

        },
        exportConfig:function(){
            this.$refs.tabs.exportConfig();
        },
        importConfig:function(){

        }
	},
    
}
</script>
<style lang="less" scoped>
    .module-theme(...){
        .tabs-btn{
            position: absolute;
            top: -50px;
            right: 0;
        }
    }
</style>