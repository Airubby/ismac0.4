<template>
    <el-dialog class="upload-loading" title="" :visible.sync="dialogInfo.visible" fullscreen append-to-body :show-close="false">
        <div>
            <el-progress type="circle" :stroke-width="10" :width="180" :percentage="progress"></el-progress>
            <p class="loading-info">{{$t("uploadInfo")}}</p>
        </div>
    </el-dialog>
</template>

<script>
import language from './config/Language'
export default {
    mixins:[language],
    created () {
    },
    mounted() {
        this.startFn();
    },
    data() {
        return {
            timer:null,
            progress:0,
            time:40,
        }
    },
    methods:{
        startFn:function(){
            this.timer=setInterval(()=>{
                if(this.progress===45){
                    clearInterval(this.timer);
                    this.time=60;
                    this.middleFn();
                }else{
                    this.progress+=1;
                }
            },this.time)
        },
        middleFn:function(){
            this.timer=setInterval(()=>{
                if(this.progress===90){
                    //finished: true成功，false失败
                    if(this.dialogInfo.finished===true){
                        clearInterval(this.timer);
                        this.time=100;
                        this.endFn();
                    }else if(this.dialogInfo.finished===false){
                        clearInterval(this.timer);
                        this.finishedFn()
                    }
                }else{
                    this.progress+=1;
                }
            },this.time)
        },
        endFn:function(){
            this.timer=setInterval(()=>{
                if(this.progress===100){
                    clearInterval(this.timer);
                    this.timer=null;
                    this.finishedFn()
                }else{
                    this.progress+=1;
                }
            },this.time)
        },
        finishedFn:function(){
            this.dialogInfo.visible=false;
            this.$emit("backInfo")
        }

    },
    watch:{
        
    },
    components:{},
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
        .loading-info{
            margin-top: 10px;
            text-align: center;
            font-size: 16px;
        }
    }
</style>