<template>
    <el-dialog class="upload-loading" title="" :visible.sync="dialogInfo.visible" fullscreen append-to-body :show-close="false">
        <div>
            <el-progress type="circle" :stroke-width="10" :width="180" :percentage="progress"></el-progress>
            <p class="loading-info">文件上传中...</p>
        </div>
    </el-dialog>
</template>

<script>
export default {
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
                    //finished: 1成功，2失败，0默认
                    if(this.dialogInfo.finished===1){
                        clearInterval(this.timer);
                        this.time=100;
                        this.endFn();
                    }else if(this.dialogInfo.finished===2){
                        clearInterval(this.timer);
                        this.dialogInfo.visible=false;
                        this.$emit("backInfo")
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
                    this.dialogInfo.visible=false;
                    this.$emit("backInfo")
                }else{
                    this.progress+=1;
                }
            },this.time)
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
        }
    }
</style>