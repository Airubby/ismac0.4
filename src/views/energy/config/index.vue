<template>
    <div class="bgfffcontent">
        <div class="breadcrumb">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>{{$t("navbar.energy")}}</el-breadcrumb-item>
                <el-breadcrumb-item>{{$t("navbar.energyConfig")}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="public_content">
            <div class="wrapper">
                <div class="content">
                    <p v-for="item in 100">{{item}}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    created() {
        
    },
    mounted() {
        
    },
    data(){
        return{
            
        }
    },
	methods: {
        
	},
    components: {
        
    }
}
</script>
