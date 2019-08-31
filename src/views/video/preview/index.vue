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
                <video-player class="vjs-custom-skin" style="width:100%;height:100%" ref="videoPlayer" 
                :options="playerOptions"
                @play="onPlayerPlay($event)"
                @pause="onPlayerPause($event)"
                @ended="onPlayerEnded($event)"
                @loadeddata="onPlayerLoadeddata($event)"
                @waiting="onPlayerWaiting($event)"
                @playing="onPlayerPlaying($event)"
                @timeupdate="onPlayerTimeupdate($event)"
                @canplay="onPlayerCanplay($event)"
                @canplaythrough="onPlayerCanplaythrough($event)"
                @ready="playerReadied"
                @statechanged="playerStateChanged($event)"> 
                 </video-player>
            </div>
        </div>
    </div>
</template>

<script>
// import {videoPlayer} from 'vue-video-player'
// import 'video.js/dist/video-js.css'
// import 'vue-video-player/src/custom-theme.css'
// import 'videojs-flash'
// import 'videojs-contrib-hls/dist/videojs-contrib-hls'
// import 'videojs-contrib-hls.js/src/videojs.hlsjs'
// import VueVideoPlayer from 'vue-video-player'
// import 'video.js/dist/video-js.css'
// import 'vue-video-player/src/custom-theme.css'
// import 'videojs-flash'
// import 'videojs-contrib-hls/dist/videojs-contrib-hls'
export default {
    created() {
        //this.hasUsableFlash();
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
            playerOptions: {
                overNative: true,
                autoplay: false,
                controls: true,
                // saspectRatio : '4:3',
                fluid : false,  // 当true时它将按比例(4:3;16:9)缩放以适应其容器。
                techOrder: ['html5'],
                flash: {
                    hls: { withCredentials: false },  // flash for flash hls  设置true
                    swf: 'media/video-js.swf'
                },
                html5: { hls: { withCredentials: false } },  //html5 for html hls  设置true
                sources: [
                    {
                        type: "rtmp/mp4",
                        src: "rtmp://172.18.47.162/live/11"
                    },
                    {
                        withCredentials: false,
                        type: 'application/x-mpegURL',
                        src: 'http://172.18.47.162:8060/hls/11.m3u8'
                        // src: 'http://playertest.longtailvideo.com/adaptive/bipbop/gear4/prog_index.m3u8'
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
            },
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
        // listen event
      onPlayerPlay(player) {
        // console.log('player play!', player)
      },
      onPlayerPause(player) {
        // console.log('player pause!', player)
      },
      onPlayerEnded(player) {
        // console.log('player ended!', player)
      },
      onPlayerLoadeddata(player) {
        console.log('player Loadeddata!', player)
      },
      onPlayerWaiting(player) {
        // console.log('player Waiting!', player)
      },
      onPlayerPlaying(player) {
        // console.log('player Playing!', player)
      },
      onPlayerTimeupdate(player) {
        // console.log('player Timeupdate!', player.currentTime())
      },
      onPlayerCanplay(player) {
        // console.log('player Canplay!', player)
      },
      onPlayerCanplaythrough(player) {
        // console.log('player Canplaythrough!', player)
      },
      // or listen state event
      playerStateChanged(playerCurrentState) {
        console.log('player current update state', playerCurrentState)
        if(playerCurrentState.waiting){
            console.log(13132)
            this.$refs.videoPlayer.player.play();
        }
      },
      // player is ready
      playerReadied(player) {
        // seek to 10s
        console.log('example player 1 readied', player)
        player.currentTime(10)
        // console.log('example 01: the player is readied', player)
      }
	},
    components: {
        // videoPlayer,
        // VueVideoPlayer
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
