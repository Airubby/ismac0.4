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
                <el-tab-pane label="时间组" name="first" class="content">
                    <time-group></time-group>
                </el-tab-pane>
                <el-tab-pane label="控制器" name="second" class="content">
                    
                    <controller></controller>
                </el-tab-pane>
                <el-tab-pane label="权限组" name="third" class="content">
                    <limits-group></limits-group>
                </el-tab-pane>
            </el-tabs>
        </div>
        
    </div>
</template>

<script>
import controller from './controller.vue'
import timeGroup from './timeGroup.vue'
import limitsGroup from './limitsGroup.vue'
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
        limitsGroup,timeGroup,controller
    }
}
</script>
