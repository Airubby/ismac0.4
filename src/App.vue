<template>
    <div id="app" ref="app">
        <router-view />
    </div>
</template>
<script>
// import store from './store'
import store from './store/index'
import Vue from 'vue'
import WebSocket from "@/utils/WebSocket"
import { mapGetters } from 'vuex'
  export default {
	name: 'app',
	mixins:[WebSocket],
    provide(){
      return{
        reload:this.reload
      }
    },
    created () {
        if(/Android|webOS|iPhone|iPad|BlackBerry/i.test(navigator.userAgent)){
          // store.dispatch('setDevType',true);
        }else{
          // store.dispatch('setDevType',false);
        }
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
        isRouterAlive:true,
        loading:true,
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
      }
    }
  }
</script>
<style lang="less">

</style>
