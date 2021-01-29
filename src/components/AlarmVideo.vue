<template>
    <el-dialog class="upload-loading" title="" :visible.sync="dialogInfo.visible" fullscreen append-to-body>
        <video id="videoElement"></video>
    </el-dialog>
</template>

<script>
import flvjs from 'flv.js'
export default {
    created () {
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
    data() {
        return {
            
        }
    },
    methods:{
        

    },
    watch:{
        
    },
    props:["dialogInfo"]
}
</script>
<style lang="less" scoped>
    .upload-loading{
        /deep/ .el-dialog{
            background: rgba(0, 0, 0, 0.6);
            display: flex;
            align-items: center;
        }
        /deep/ .el-dialog__body{
            background: transparent;
            margin: auto;
            color: #fff;
        }
        /deep/ .el-dialog__header{
            padding: 0 !important;
        }
        #videoElement{
            width: 100%;
            height: 100%;
        }
    }
</style>