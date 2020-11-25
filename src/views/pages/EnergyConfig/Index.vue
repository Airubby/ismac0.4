<template>
    <div class="content">
        <el-tabs v-model="activeName">
            <el-tab-pane label='电量模型' name="first">
                <battery-model></battery-model>
            </el-tab-pane>
            <el-tab-pane label='群控配置' name="second">
                <group-config></group-config>
            </el-tab-pane>
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
            activeName:"first"
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
        
    }
</style>