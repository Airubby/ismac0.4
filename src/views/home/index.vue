<template>
    <div class="content">
        <el-input v-model="value" placeholder="请输入播放内容内容"></el-input>
        <el-button type="primary" @click="play()">语音播放内容</el-button>
        <div class="test">测试从public引入css</div>
    </div>
</template>

<script>
export default {
    created() {
        
    },
    mounted() {
    },
    data(){
        return{
            value:'',
        }
    },
	methods: {
        play:function(){
            let utterThis = new window.SpeechSynthesisUtterance();
            utterThis.text=this.value;
            utterThis.lang="zh-CN";  //使用语言
            utterThis.pitch=2; //表示说话的音高，数值，范围从0（最小）到2（最大）。默认值为1
            utterThis.rate=1;  // 语速，数值，默认值是1，范围是0.1到10，表示语速的倍数，例如2表示正常语速的两倍
            utterThis.volume=1;  //声音的音量，区间范围是0到1，默认是1
            window.speechSynthesis.speak(utterThis);
        },
	},
    components: {
        
    }
}
</script>
<style lang="less" scoped>
    
</style>
