<template>
    <div id="app" ref="app">
        <router-view />
    </div>
</template>
<script>
import store from './store/index'
import Vue from 'vue'
import Request from '@/utils/Request'
import WebSocket from "@/utils/WebSocket"
import ParseComponent from '@/utils/ParseComponent'
import { mapGetters } from 'vuex'
  export default {
	name: 'app',
    // mixins:[WebSocket,ParseComponent],
    created () {
        Request.service.defaults.baseURL=store.state.AjaxUrl;
        // 将API方法绑定到全局
        Vue.prototype.$api = Request
        
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
