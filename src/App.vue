<template>
    <div id="app" ref="app">
        <div id="loader-wrapper" v-if="loading">
            <div id="loader"></div>
            <div class="loader-section section-left"></div>
            <div class="loader-section section-right"></div>
            <div class="load_title">正在加载 小微产品,请耐心等待<br><span>V0.4</span></div>
        </div>
        <router-view v-if="isRouterAlive" v-on:routerLoading="routerLoading" />
    </div>
</template>
<script>
// import store from './store'
import store from './store/index'
import Vue from 'vue'
import webSocket from "@/utils/webSocket"
import { mapGetters } from 'vuex'
  export default {
	name: 'app',
	mixins:[webSocket],
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
        routerLoading:function(){
            this.loading=false;
        },
        reload(){
            this.isRouterAlive=false;
            this.$nextTick(function(){
              this.isRouterAlive=true;
            })
        },
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
