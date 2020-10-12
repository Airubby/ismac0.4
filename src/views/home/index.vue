<template>
    <div class="content">
        <breadcrumb class="breadcrumb-container" />
        <el-input v-model="value" placeholder="请输入播放内容内容"></el-input>
        <el-button type="primary" @click="play()">语音播放内容</el-button>
        <handle-btn @handleClick="testHandleTimeout" btnName="防抖动点击" :btnTimeout="2000"></handle-btn>
        <el-form ref="form" :model="form" :rules="rules" label-width="80px">
            <el-form-item label="IP" prop="port">
                <el-input v-model="form.port"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">测试双语提交验证问题</el-button>
            </el-form-item>
        </el-form>
        <el-checkbox-group v-model="checkboxGroup">
            <el-checkbox-button v-for="item in alarmOptions" :label="item.id" :key="item.id">{{item.name}}{{item.number}}</el-checkbox-button>
        </el-checkbox-group>
        <div>
            {{$t("testLanguage")}}
        </div>
        <div class="color">字体颜色随主题全局变量设置改变</div>
        <div class="bg"></div>
    </div>
</template>

<script>
import LangMixins from './language'
export default {
    mixins:[LangMixins],
    created() {
        
    },
    mounted() {
    },
    data(){
        let validatePass = (rules, value, callback) => {
            // this.$tool.checkIP({rules, value,callback});
            let info=this.$tool.checkIP({rules, value});
            if(info){
                callback(new Error(this.$t(info)));
            }else{
                callback();
            }
            
        };
        return{
            value:'',
            form:{
                port:'',
            },
            rules: {
                port: [
                    { required: true,trigger: 'blur',validator: validatePass}
                ],
            },
            checkboxGroup:['all'],
            alarmOptions : [
                {name:"所有",number:0,id:'all'},
                {name:"紧急",number:0,id:'1'},
                {name:"重要",number:0,id:'2'},
                {name:"一般",number:0,id:'3'},
                {name:"提示",number:0,id:'4'},
            ],
        }
    },
	methods: {
        testHandleTimeout:function(){
            console.log("延时点击有效哦")
        },
        play:function(){
            let utterThis = new window.SpeechSynthesisUtterance();
            utterThis.text=this.value;
            utterThis.lang="zh-CN";  //使用语言
            utterThis.pitch=2; //表示说话的音高，数值，范围从0（最小）到2（最大）。默认值为1
            utterThis.rate=1;  // 语速，数值，默认值是1，范围是0.1到10，表示语速的倍数，例如2表示正常语速的两倍
            utterThis.volume=1;  //声音的音量，区间范围是0到1，默认是1
            window.speechSynthesis.speak(utterThis);
        },
        onSubmit() {
            this.$refs['form'].validate((valid) => {
                if (valid) {
                    alert('submit!');
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
	},
    watch: {
        checkboxGroup:function(val){
            console.log(val)
            if(val.length>1){
                if(val[val.length-1]=="all"||val.length==this.alarmOptions.length-1){
                    this.checkboxGroup=["all"];
                }else if(val[0]=="all"){
                    this.checkboxGroup.splice(0,1);
                }
            }else if(val.length==0){
                this.checkboxGroup=["all"];
            }
            
            
        }
    },
    components: {
        
    }
}
</script>
<style lang="less" scoped>
    .module-theme(@color,@bg){
        .color{
            color: @color;
        }
        .bg{
            width: @width;
            height: 20px;
            background: @bg;
        }
    }
</style>
