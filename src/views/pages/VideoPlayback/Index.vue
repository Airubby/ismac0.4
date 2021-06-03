<template>
    <div class="content">
        <div style="width:100%;height:calc(100% - 40px);overflow: hidden;">
            <el-form ref="form" label-width="80px">
                <el-form-item label='选择日期'>
                    <el-date-picker style="width:250px;" v-model="backDate" @change="changeDate" type="date"></el-date-picker>
                </el-form-item>
            </el-form>
            <div style="height: calc(100% - 50px);width:100%">
                <div class="videobox0 videobox1">
                    <em @click="checkVideo()" class="emadd"><i class="el-icon-plus"></i></em>
                    <span id="span">无法打开视频，请检测配置！</span>
                    <video-player class="vjs-custom-skin" style="width:100%;height:100%;" ref="videoPlayer1" 
                    :options="playerOption"
                    @statechanged="currentState($event)"></video-player>
                </div>
            </div>
        </div>
        <div style="width:100%;">
            <div class="slider" v-if="backDate">
                <el-slider
                    v-model="sliderValue"
                    :min="0"
                    :max="1440"
                    @change="changeValue"
                    :format-tooltip="formatTooltip"
                    :step="1"
                    >
                </el-slider>
            </div>
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
import {FormatDate} from '@/utils/Tool'
export default {
    components:{videoPlayer,getVideo},
    created() {
        
    },
    mounted() {
        
    },
    data(){
        return{
            backDate:'',
            endDate:'',
            data:[],
            marks:'',
            cameraShow:false,
            sliderValue:0,
            oldNodeId:[],
            videodata:[],
            valueDate:'',
            player:null,
            sendInfo:[],
            pushSend:[],
            playerOption: {
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
                  progressControl: false , // 进度条
                  fullscreenToggle: true // 全屏按钮
                },
                // poster: 'media/logo.png'
            },
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
            videoState:'',
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
        changeDate:function(val){
             const backDate1 = new Date((new Date(this.backDate).getTime()));
             const date1= FormatDate("yyyy-MM-dd HH:mm:00",backDate1);
             this.valueDate = date1;
             const endTime1 = FormatDate("yyyy-MM-dd HH:mm:00",(new Date(this.backDate).getTime() + 1440*60*1000))
             this.endDate = endTime1;
             if(this.videoInfo.addrid){
                this.initPlay(this.valueDate,this.endDate);
             }
         },
        changeValue:function (val) {
            const backDate = new Date((new Date(this.backDate).getTime() + val*60*1000));
            const date= FormatDate("yyyy-MM-dd HH:mm:00",backDate);
            this.valueDate = date;
            const endTime = FormatDate("yyyy-MM-dd HH:mm:00",(new Date(this.backDate).getTime() + 1440*60*1000))
            this.endDate = endTime;
            this.initPlay(date,endTime);
        },
        formatTooltip:function(val){
            if(!this.backDate){return}
            const startTime = new Date((new Date(this.backDate).getTime() + val*60*1000));
            return FormatDate("yyyy-MM-dd HH:mm",startTime);
        },
        initPlay:function(time_start,time_end) {
            let rtspTemplate = this.getVideoRTSP({type: this.videoInfo.devtype, playtype: 2});//获取品牌RTSP播放流模板 type:(海康,大华，华为) playtype 1是点播，2是回放
            let starttime,endtime;
            if(this.videoInfo.devtype==='002002'){
                starttime = FormatDate('yyyyMMddTHHmm00Z',time_start);
                endtime = FormatDate('yyyyMMddTHHmm00Z',time_end);
            }else{
                starttime = FormatDate('yyyy_MM_dd_HH_mm_00',time_start);
                endtime = FormatDate('yyyy_MM_dd_HH_mm_00',time_end);
            }
            this.closeVideo(this.$tool.stringFormat(rtspTemplate,
            this.videoInfo.map.user,this.videoInfo.map.password,
            this.videoInfo.map.ip,this.videoInfo.map.port,
            this.videoInfo.map.channel,starttime,endtime))
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
        // stopPlay:function () {
        //     document.getElementById('video1').pause();
        // },
        closeVideo:function(url){
            console.log(url)
            //主动关掉前面的
            if(this.pushSend.length>0){
                this.$r.post('/video/video/stopvideo',{"ids":this.pushSend[0]},r=> {
                    console.log(r)
                    if (r.err_code === '0') {
                        this.openVideo(url);
                    }else{
                        this.$message.warning(r.err_msg);
                    }
                })
            }else{
                this.openVideo(url);
            }
        },
        openVideo:function(url){
            
            this.$r.post('/video/video/openvideo',{"rtsp":url},r=> {
                
                console.log(r)
                if (r.err_code === '0') {
                    if(r.data.indexOf("rtmp")==-1){
                        this.playerOption.sources[1].src=r.data;
                        this.playerOption.techOrder=['html5'];
                    }else{
                        this.hasUsableFlash();
                        this.playerOption.sources[0].src=r.data;
                        this.playerOption.techOrder=['flash'];
                    }
                    let arr=r.data.split("/");
                    let rtmphls=arr[arr.length-1];
                    if(rtmphls.indexOf(".m3u8")!=-1){
                        rtmphls=rtmphls.slice(0,rtmphls.indexOf(".m3u8"));
                    }
                    if(arr.length>0){
                        this.pushSend=[rtmphls]
                    }
                    this.sendInfo=this.pushSend;
                }else{
                    this.$message.warning(r.err_msg);
                }
            })
        },
        currentState:function(state){
            this.videoState=state;
            console.log(state)
            if(state.canplaythrough){
                this.timer=setTimeout(()=>{
                    if(!this.videoState.timeupdate){
                        this.$el.querySelector("#span").style.display="block";
                    }else{
                        this.$el.querySelector("#span").style.display="none";
                    }
                },10000);
            }
        }
    },
    watch:{
        'videoInfo.addrid':function(val){
            if(this.backDate){
                this.changeDate();  //切换了，重置时间播放
            }else{
                this.$message.warning(this.$t('video.selectDate'));
            }
        },
    }
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