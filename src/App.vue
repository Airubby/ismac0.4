<template>
  <div id="app" ref="app">
    <router-view />
  </div>
</template>
<script>
import store from './store/index'
import Vue from 'vue'
import { mapGetters } from 'vuex'
import Request from '@/utils/Request'
import WebSocket from "@/utils/WebSocket"
import ParseComponent from '@/utils/ParseComponent'
export default {
    name: 'app',
    mixins:[WebSocket,ParseComponent],
    created () {
        //store.state.AjaxUrl完成后绑定API全局
        Request.service.defaults.baseURL=store.state.AjaxUrl;
        // 将API方法绑定到全局
        Vue.prototype.$api = Request

        //动态注入语言及API
        const requireLang = require.context(
            // 其组件目录的相对路径
            "@/views/pages",
            // 是否查询其子目录
            true,
            // 匹配基础组件文件名的正则表达式
            /(Language|Api)+\.(js)$/
        )
        this.$store.dispatch('setLanguageApi',requireLang.keys())
        


    },
    computed:{
        ...mapGetters([
            'getTheme'
        ]),
    },
    mounted() {
        this.switchTheme(this.$theme)
    },
    data(){
      return{
        
      }
    },
    methods:{
        switchTheme:function(themeName){
            this.$refs.app.className=themeName+"_theme";
            document.body.className=themeName+"_theme";
            Vue.prototype.$theme=themeName;
            this.$store.dispatch('setShow',false);
            this.$nextTick(function(){
                this.$store.dispatch('setShow',true);
            })
        },
    },
    watch:{
        getTheme:function(val){
            this.switchTheme(val)
        },
    }
}
</script>
<style lang="less">

</style>
