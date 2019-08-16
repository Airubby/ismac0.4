<template>
    <div class="bgfffcontent">
        <div class="breadcrumb">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>{{$t("navbar.video")}}</el-breadcrumb-item>
                <el-breadcrumb-item>{{$t("navbar.videoPreview")}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="public_content">
            <div>
                <el-button-group>
                <el-button type="primary" @click="changeVideo(1)">1</el-button>
                <el-button type="primary" @click="changeVideo(2)">2</el-button>
                </el-button-group>
            </div>
            <div style="width:100%;height:calc(100% - 60px);display:flex;">
                <template v-for="(item,index) in playerOptions">
                    <div :class="'video'+videoIndex" class="video">
                        <em class="vem">2342</em>
                        <video-player class="vjs-custom-skin" style="width:100%;height:100%" ref="videoPlayer" :options="item">
                        </video-player>
                    </div>
                </template>
            </div>
            <!--
            <div style="width:400px;height:400px;" @click="play()">
            <video-player class="vjs-custom-skin" ref="videoPlayer" :options="playerOptions" 
            @play="onPlayerPlay($event)"
            @pause="onPlayerPause($event)"
            @ended="onPlayerEnded($event)"
            >
            </video-player>
            </div>
            -->
        </div>
    </div>
</template>

<script>
import {videoPlayer} from 'vue-video-player'
import 'video.js/dist/video-js.css'
import 'vue-video-player/src/custom-theme.css'
import 'videojs-flash'
export default {
    created() {
        this.hasUsableFlash();
    },
    mounted() {
        
    },
    computed: {
        player() {
            return this.$refs.videoPlayer.player
        },
    },
    data(){
        return{
            videoIndex:1,
            playerOptions: [{
                overNative: true,
                autoplay: false,
                controls: true,
                // saspectRatio : '4:3',
                fluid : false,  // 当true时它将按比例(4:3;16:9)缩放以适应其容器。
                techOrder: ['flash'],
                flash: {
                    hls: { withCredentials: false },
                    swf: 'media/video-js.swf'
                },
                sources: [
                    {
                        type: "rtmp/mp4",
                        src: "rtmp://172.18.47.162/live/11"
                    }
                ],
                controlBar: {
                  timeDivider: false,  //当前时间和持续时间的分隔符
                  durationDisplay: false,  //显示持续时间
                  remainingTimeDisplay: false,  //是否显示剩余时间功能
                  currentTimeDisplay: false, // 当前时间
                  volumeControl: true, // 声音控制键
                  playToggle: true, // 暂停和播放键
                  progressControl: true, // 进度条
                  fullscreenToggle: true // 全屏按钮
                },
                // poster: 'media/logo.png'
            }],
            option:{
                overNative: true,
                autoplay: false,
                controls: true,
                // aspectRatio : '4:3',
                fluid : false,  // 当true时它将按比例(4:3;16:9)缩放以适应其容器。
                techOrder: ['flash'],
                flash: {
                    hls: { withCredentials: false },
                    swf: 'media/video-js.swf'
                },
                sources: [
                    {
                        type: "rtmp/mp4",
                        src: "rtmp://172.18.47.162/live/11"
                    }
                ],
                // poster: 'media/logo.png'
            },
            playerOptions1: {
                overNative: true,
                autoplay: true,
                controls: true,
                // aspectRatio : '16:9',
                fluid : false, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
                techOrder: ['flash'],
                sourceOrder: true,
                flash: {
                    hls: { withCredentials: false },
                    swf: 'media/video-js.swf'
                },
                // html5: { hls: { withCredentials: false } },
                sources: [
                    {
                        type: "rtmp/mp4",
                        src: "rtmp://172.18.47.162/live/11"
                    }
                ],
                // poster: 'media/logo.png',
                controlBar: {
                  timeDivider: false,  //当前时间和持续时间的分隔符
                  durationDisplay: false,  //显示持续时间
                  remainingTimeDisplay: false,  //是否显示剩余时间功能
                  currentTimeDisplay: false, // 当前时间
                  volumeControl: false, // 声音控制键
                  playToggle: false, // 暂停和播放键
                  progressControl: false, // 进度条
                  fullscreenToggle: true // 全屏按钮
                },
            }
        }
    },
	methods: {
        checkVideo:function(){
            console.log(12312312312)
        },
        changeVideo:function(num){
            this.videoIndex=num;
            this.playerOptions=[];
            for(let i=0;i<num;i++){
                this.playerOptions.push(this.option);
            }
        },
        play:function(){
            console.log(123)
            this.$refs.videoPlayer.player.play();
        },
        hasUsableFlash:function(){
            let flashObj;
            if(typeof window.ActiveXObject != "undefined"){  //传统浏览器
                flashObj= new  ActiveXObject("ShockwaveFlash.ShockwaveFlash");
            }else{  //现代浏览器
                flashObj= navigator.plugins['Shockwave Flash'];
            }
            if(!flashObj){
                this.$message.warning("未安装flash插件，获取安装了未启用！");
            }
        },
        onPlayerPlay:function(event){
            console.log(event)
            this.hasUsableFlash();
        },
        onPlayerPause:function(event){

        },
        onPlayerEnded:function(event){

        },
        enterStream() {
            this.playerOptions.sources[1].src = this.streams.hls
            this.playerOptions.sources[0].src = this.streams.rtmp
            this.playerOptions.autoplay = true
        },
        changeTech() {
            if (this.currentTech === 'Html5') {
                this.playerOptions.techOrder = ['html5']
            } else if (this.currentTech === 'Flash') {
                this.playerOptions.techOrder = ['flash']
            }
            this.playerOptions.autoplay = true
        }
	},
    components: {
        videoPlayer
    }
}
</script>
<style scoped>
.video{
    position:relative;
    height: 300px;
}

.vem{
    display:none;
    position: absolute;
    width:100px;
    height:100px;
    z-index:1;
    background: #fff;
    top:0;
    right:0;
}
.video:hover .vem{
    display:block;
}
.video1{
    width:100%;
    height:100%;
}
.video2{
    width: calc(50% - 20px);
    height:calc(100% - 20px);
    margin: 10px;
}
</style>
