<template>
    <div class="bgfffcontent">
        <div class="breadcrumb">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>{{$t("navbar.access")}}</el-breadcrumb-item>
                <el-breadcrumb-item>{{$t("navbar.accessConfig")}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="public_content pd20">
            <el-tabs v-model="activeName" class="content" @tab-click="tabClick">
                <el-tab-pane label="table配置" name="first" class="content">
                    <table-group v-if="activeName=='first'"></table-group>
                </el-tab-pane>
                <!-- <el-tab-pane label="控制器" name="second" class="content">
                    
                    <controller></controller>
                </el-tab-pane> -->
                <el-tab-pane label="form配置" name="third" class="content">
                    <limits-group v-if="activeName=='third'"></limits-group>
                </el-tab-pane>
            </el-tabs>
        </div>
        
    </div>
</template>

<script>
import controller from './controller.vue'
import tableGroup from './tableGroup/index.vue'
import limitsGroup from './formGroup/index.vue'
export default {
    created() {
        this.activeName=sessionStorage.getItem("tabIndex")?sessionStorage.getItem("tabIndex"):'first';
    },
    mounted() {
        
    },
    data(){
        return{
            activeName:'first',
        }
    },
	methods: {
        tabClick:function(tab){
            sessionStorage.setItem("tabIndex", tab.name); 
        }
	},
    components: {
        limitsGroup,tableGroup,controller
    }
}
</script>
