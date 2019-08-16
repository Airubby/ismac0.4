<template>
    <div class="bgfffcontent">
        <div class="breadcrumb">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>{{$t("navbar.system")}}</el-breadcrumb-item>
                <el-breadcrumb-item>{{$t("navbar.systemUser")}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="public_content">
            <el-scrollbar class="scrollbar">
                <div style="width: 800px;height:400px;">
                    <video-player :options="playerOptions"
                    ></video-player>
                </div>
                <div style="width: 400px;height:300px;">
                    <video-player :options="playerOptions1"
                    ></video-player>
                </div>
            </el-scrollbar>
        </div>
    </div>
</template>

<script>

import 'vue-video-player/src/custom-theme.css'
import 'video.js/dist/video-js.css'
import {videoPlayer} from 'vue-video-player'
import "videojs-flash"
export default {
    created() {
        
    },
    mounted() {
        
    },
    data(){
        return{
            playerOptions: {
                overNative: true,
                autoplay: true,
                controls: true,
                techOrder: ['flash', 'html5'],
                // sourceOrder: true,
                // flash: {
                //     hls: { withCredentials: false },
                //     swf: 'media/video-js.swf'
                // },
                // html5: { hls: { withCredentials: false } },
                sources: [
                    {
                        type: "rtmp/mp4",
                        src: "rtmp://172.18.47.162/live/11"
                    }
                ],
                poster: 'media/logo.png'
                // controlBar: {
                //   timeDivider: false, // 时间分割线
                //   durationDisplay: false, // 总时间
                //   progressControl: true, // 进度条
                //   customControlSpacer: true, // 未知
                //   fullscreenToggle: true // 全屏
                // },
            },
            playerOptions1: {
                height: '360',
                notSupportedMessage : '此视频暂无法播放，请稍后再试',
                poster : "", //你的封面地址
                language : 'zh-CN',
                // aspectRatio : '4:3',  //4:3;16:9
                fluid : true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
                sources: [{
                    withCredentials: false,
                    type: "rtmp/mp4",
                    src: "rtmp://172.18.47.162/live/11"
                }],
                playbackRates : [ 0.5, 1.0, 1.5, 2.0 ], //可选择的播放速度
                controlBar: {
                  timeDivider: true,  //当前时间和持续时间的分隔符
                  durationDisplay: true,  //显示持续时间
                  remainingTimeDisplay: true,  //是否显示剩余时间功能
                  currentTimeDisplay: true, // 当前时间
                  volumeControl: true, // 声音控制键
                  playToggle: true, // 暂停和播放键
                  progressControl: true, // 进度条
                  fullscreenToggle: true // 全屏按钮
                },
                techOrder: ['flash'],
                autoplay: true,
                controls: false
            },
            videoOptions: {
                sources: {
                type: "rtmp/mp4",
                src: 'rtmp://172.18.47.162/live/11',
                withCredentials: false
                },
                language: 'zh-CN',
                live: true,
                autoplay: true,
                height: 540
            }
        }
    },
	methods: {
        
	},
    components: {
        videoPlayer
    }
}
</script>
