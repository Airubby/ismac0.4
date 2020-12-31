<template>
    <div class="bgfffcontent">
        <div class="breadcrumb">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>{{$t("navbar.video")}}</el-breadcrumb-item>
                <el-breadcrumb-item>{{$t("navbar.videoPlayback")}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="public_content">
            <video name="videoElement" class="centeredVideo" controls autoplay src="blob:http://bilibili.github.io/101bee69-7266-4f43-a94f-510e458fb9e5">
                    Your browser is too old which doesn't support HTML5 video.
            </video>
        </div>
    </div>
</template>

<script>
import flvjs from 'flv.js'
export default {
    created() {
        
    },
    mounted() {
        if (flvjs.isSupported()) {
            var videoElement = document.getElementById('videoElement');
            var flvPlayer = flvjs.createPlayer({
                type: 'flv',
                url: 'http://example.com/flv/video.flv'
            });
            flvPlayer.attachMediaElement(videoElement);
            flvPlayer.load();
            flvPlayer.play();
        }
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
