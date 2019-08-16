<template>
    <div class="bgfffcontent">
        <div class="breadcrumb">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>{{$t("navbar.video")}}</el-breadcrumb-item>
                <el-breadcrumb-item>{{$t("navbar.videoPlayback")}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="public_content">
            <video src="http://172.18.47.162:8060/hls/11.m3u8" style="width:200px;height:200px;"></video>
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
