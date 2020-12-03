<template>
    <div class="content">
        <div class="video-top">
            <el-button @click="changeImage(1,0)" type="primary" :plain="btntype[0]"><i class="el-icon-one"></i></el-button>
            <el-button @click="changeImage(2,1)" type="primary" :plain="btntype[1]"><i class="el-icon-two"></i></el-button>
            <el-button @click="changeImage(4,2)" type="primary" :plain="btntype[2]"><i class="el-icon-menu"></i></el-button>
            <el-button @click="changeImage(9,3)" type="primary" :plain="btntype[3]"><i class="el-icon-s-grid"></i></el-button>
        </div>
        <div style="width:100%;height:calc(100% - 50px);display:flex;;flex-wrap: wrap;">
            <template v-for="(item,index) in playerOptions">
                <div :class="'videobox'+imageType" class="videobox0">
                    <em @click="checkVideo(item,index)" class="emadd"><i class="el-icon-plus"></i></em>
                    <span :id="'span'+index">无法打开视频，请检测配置！</span>
                    <video-player class="vjs-custom-skin" style="width:100%;height:100%;" :ref="'videoPlayer'+index" 
                    :options="item" :playsinline="true"
                    @statechanged="currentState($event,index)"></video-player>
                </div>
            </template>
        </div>
        <getVideo :dialogInfo="videoInfo" v-if="videoInfo.visible"></getVideo>
    </div>
</template>
<script>
import {videoPlayer} from 'vue-video-player'
import 'video.js/dist/video-js.min.css'
import 'vue-video-player/src/custom-theme.css'
import 'videojs-flash'
import 'videojs-contrib-hls/dist/videojs-contrib-hls'
import getVideo from './component/Video.vue'
export default {
    components: {
        getVideo,videoPlayer
    },
    created() {
        
    },
    mounted() {
        
    },
    data(){
        return{
            videodata:[],//点击的那视屏树的数据
            imageType:1,
            oldNodeId:[],
            showCheck:false,
            players:[],
            btntype:[false,true,true,true],
            sendInfo:[],
            pushSend:[],
            playIndex:0,
            playerOptions:[
                {
                    addrid:'',
                    overNative: true,
                    autoplay: true,
                    controls: true,
                    fluid : false,
                    techOrder: ['flash','html5'],
                    sourceOrder: true,
                    html5: { hls: { withCredentials: false } },
                    flash: {
                        hls: { withCredentials: false },
                        swf: '/media/video-js.swf'
                    },
                    sources: [
                        {
                            type: "rtmp/mp4",
                            src: "rtmp://127.0.0.1/live/"
                        },
                        {
                            withCredentials: false,
                            type: 'application/x-mpegURL',
                            src: 'http://127.0.0.1/hls/'
                        }
                    ],
                    controlBar: {
                        timeDivider: false,  //当前时间和持续时间的分隔符
                        durationDisplay: false,  //显示持续时间
                        remainingTimeDisplay: false,  //是否显示剩余时间功能
                        currentTimeDisplay: false, // 当前时间
                        volumeControl: true, // 声音控制键
                        playToggle: true, // 暂停和播放键
                        progressControl: false, // 进度条
                        fullscreenToggle: true // 全屏按钮
                    },
                    // poster: 'media/logo.png'
                }
            ],
            videoInfo:{
                addrid:'',
                map:{
                    devtype:'',
                    user:'',
                    password:'',
                    ip:'',
                    port:'',
                    channel:''
                },
                devtype:'',
                visible:false,
            },
            videoState:[],
        }
    },
	methods: {
        checkVideo:function(item,index){
            this.videoInfo.devtype="";
            this.videoInfo.addrid=item.addrid;
            this.playIndex=index;
            this.videoInfo.visible=true;
        },
        hasUsableFlash:function(){
            let flashObj;
            if(typeof window.ActiveXObject != "undefined"){  //传统浏览器
                flashObj= new  ActiveXObject("ShockwaveFlash.ShockwaveFlash");
            }else{  //现代浏览器
                flashObj= navigator.plugins['Shockwave Flash'];
            }
            if(!flashObj){
                this.$message.warning("未安装flash插件，或者安装了但插件未启用！");
            }
        },
        changeImage:function(type,index){
            for(let i=0;i<this.btntype.length;i++){
                this.btntype[i]=true;
            }
            this.btntype[index]=false;
            this.imageType =  type
            // 生成视频窗口配置文件
            this.createWindow();
        },
        createWindow:function(){
            this.playIndex=0;
            this.pushSend=[];
            this.playerOptions=[];
            this.sendInfo=this.pushSend;  // 让后台关闭推送
            for(let i=0;i<this.imageType;i++){
                //每次得重新定义一个option
                let option={
                    addrid:'',  //判断是否可以添加播放流，true表示可以添加播放流
                    overNative: true,
                    autoplay: true,
                    controls: true,
                    fluid : false,
                    techOrder: ['flash','html5'],
                    sourceOrder: true,
                    flash: {
                        hls: { withCredentials: false },
                        swf: '/media/video-js.swf'
                    },
                    sources: [
                        {
                            type: "rtmp/mp4",
                            src: "rtmp://127.0.0.1/live/"
                        },
                        {
                            withCredentials: false,
                            type: 'application/x-mpegURL',
                            src: 'http://127.0.0.1/hls/'
                        }
                    ],
                    controlBar: {
                        timeDivider: false,  //当前时间和持续时间的分隔符
                        durationDisplay: false,  //显示持续时间
                        remainingTimeDisplay: false,  //是否显示剩余时间功能
                        currentTimeDisplay: false, // 当前时间
                        volumeControl: true, // 声音控制键
                        playToggle: true, // 暂停和播放键
                        progressControl: false, // 进度条
                        fullscreenToggle: true // 全屏按钮
                    },
                    // poster: 'media/logo.png'
                };
                this.playerOptions.push(option);
            }
        },
        openVideo:function(addrid){
            let rtspTemplate=this.getVideoRTSP({type:this.videoInfo.devtype,playtype:1});//获取品牌RTSP播放流模板 type:(海康,大华，华为) playtype 1是点播，2是回放
            let url=this.$tool.stringFormat(rtspTemplate,
                this.videoInfo.map.user,
                this.videoInfo.map.password,
                this.videoInfo.map.ip,
                this.videoInfo.map.port,
                this.videoInfo.map.channel);    
                //rtsp://admin:admin1234@172.16.6.166:554/cam/realmonitor?channel=1&subtype=1                     
            this.$api.post('/video/video/openvideo',{"rtsp":url}).then(res=> {
                if (res.err_code === '0') {
                    if(res.data.indexOf("rtmp")==-1){
                        setTimeout(()=>{
                            this.playerOptions[this.playIndex].sources[1].src=r.data;
                            this.playerOptions[this.playIndex].techOrder=['html5'];
                        },5000)
                    }else{
                        this.hasUsableFlash();
                        this.playerOptions[this.playIndex].sources[0].src=r.data;
                        this.playerOptions[this.playIndex].techOrder=['flash'];
                    }
                   
                    this.playerOptions[this.playIndex].addrid=addrid;
                    let arr=r.data.split("/");
                    let rtmphls=arr[arr.length-1];
                    if(rtmphls.indexOf(".m3u8")!=-1){
                        rtmphls=rtmphls.slice(0,rtmphls.indexOf(".m3u8"));
                    }
                    if(arr.length>0 && !this.$tool.arrayContains(rtmphls,this.pushSend)){
                        this.pushSend.push(rtmphls);
                        this.sendInfo=this.pushSend;
                    }
                }else{
                    this.$message.warning(res.err_msg);
                }
            })
        },
        getVideoRTSP:function(obj){
            console.log(obj)
            switch (obj.type) {
                case "002002":
                    if(obj.playtype){
                        if(obj.playtype===2)
                            return "rtsp://{0}:{1}@{2}:{3}/Streaming/tracks/{4}01?starttime={5}&endtime={6}";
                    }
                    return "rtsp://{0}:{1}@{2}:{3}/Streaming/Channels/{4}01";
                    break;
                case "002001":
                    if(obj.playtype){
                        if(obj.playtype===2)
                            return "rtsp://{0}:{1}@{2}:{3}/cam/playback?channel={4}&subtype=1&starttime={5}&endtime={6}";
                    }
                    return "rtsp://{0}:{1}@{2}:{3}/cam/realmonitor?channel={4}&subtype=1";
                    break;
                case "3":
                    break;
                default:
                    break;
            }
        },
        currentState:function(state,index){
            this.videoState[index]=state;
            if(state.canplaythrough){
                this.timer=setTimeout(()=>{
                    if(!this.videoState[index].timeupdate){
                        this.$el.querySelector("#span"+index).style.display="block";
                    }else{
                        this.$el.querySelector("#span"+index).style.display="none";
                    }
                },5000);
            }
        },
	},
    
}
</script>
<style lang="less" scoped>
    .module-theme(...){
        .video-top{
            text-align: right;
        }
        .camera-con{
            width:200px;
        }
        .imageCon{
            height:100%;
            overflow: hidden;
            .imageType1{
                width:100%;
                height:100%;
                padding-bottom: 6px;
            }
            .imageType2{
                width:50%;
                height:100%;
                padding: 0 3px 6px;
                float:left;
                }
            .imageType4{
                width:50%;
                height:50%;
                padding: 0 3px 6px;
                float:left;
            }
            .imageType9{
                width:33.33%;
                height:33.33%;
                padding: 0 3px 6px;
                float:left;
            }
        }
        .el-icon-one{
            width: 10px;
            height: 10px;
            background: @bgColor;
        }
        .is-plain{
            .el-icon-one{
                background: @activeColor;
            }
        }
        .el-icon-two{
            width: 14px;
            height: 10px;
            position: relative;
        }
        .el-icon-two:before,.el-icon-two:after{
            width: 5px;
            height: 10px;
            content: "";
            display: inline-block;
            margin: 0 1px;
            background: @bgColor;
        }
        .is-plain{
            .el-icon-two:before,.el-icon-two:after{
                background: @activeColor;
            }
        }
    }


    .videobox1{
        width: calc(100% - 10px);
        height: calc(100% - 10px);
    }
    .videobox2{
        width: calc(50% - 10px);
        height: calc(100% - 10px);
    }
    .videobox4{
        width: calc(50% - 10px);
        height: calc(50% - 10px);
    }
    .videobox6{
        width: calc(33.33% - 10px);
        height: calc(50% - 10px);
    }
    .videobox9{
        width: calc(33.33% - 10px);
        height: calc(33.33% - 10px);
    }
    .videobox0{
        margin: 5px;
        position: relative;
        em{
            width: 100px;
            height: 100px;
            text-align: center;
            line-height: 100px;
            position: absolute;
            top: 50%;
            left: 50%;
            margin-top: -50px;
            margin-left: -50px;
            cursor: pointer;
            z-index: 99;
            display: none;
            font-size: 76px;
            color: #4A78FF;
            font-weight: bold;
        }
        span{
            width: 100%;
            height: 100px;
            text-align: center;
            position: absolute;
            top: 35%;
            z-index: 98;
            display: none;
            font-size: 18px;
            color: #4A78FF;
            font-weight: bold;
        }
        span.active{
            display: block;
        }
        &:hover{
            em{
                display: block;
            }
        }
    }
</style>