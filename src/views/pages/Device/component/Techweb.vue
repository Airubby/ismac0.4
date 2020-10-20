<template>
    <div class="content">
        <div class="add">暂无配置视图，<el-button type="primary" plain @click="add">去创建视图</el-button></div>
        <techweb-add :dialogInfo="addInfo" v-if="addInfo.visible" @backInfo="backInfo"></techweb-add>
    </div>
</template>
<script>
import TechwebAdd from './TechwebAdd'
export default {
    components: {
        TechwebAdd
    },
    created() {
        
    },
    mounted() {
        
    },
    data(){
        return{
            addInfo:{
                visible:false
            }
        }
    },
	methods: {
        add:function(){
            this.addInfo.visible=true;
        },
        backInfo:function(){

        }
	},
}
</script>
<style lang="less" scoped>
    .module-theme(...){
        .add{
            width: 100%;
            height: 150px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }
</style>