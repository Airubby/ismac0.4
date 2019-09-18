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
import { mapGetters } from 'vuex'
  export default {
    name: 'app',
    provide(){
      return{
        reload:this.reload
      }
    },
    created () {
        
    },
    computed:{
        ...mapGetters([
            'getTheme'
        ]),
    },
    mounted() {
        this.switchTheme(this.$theme)
        this.getWebSocket()
        
        
      
    },
    data(){
      return{
        isRouterAlive:true,
        loading:true,
      }
    },
    methods:{
        getWebSocket:function(){
            if(!(this.$ws&&this.$ws.readyState==1)){
                this.$tool.wsConnection("",function(result){
                    console.log(result)
                    // store.dispatch('setwsData',eval(result.data));
                })
            }
            //每隔一段时间检测一下是否连上webSocket
            setTimeout(()=>{
                this.getWebSocket();
            },10000)
        },
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
            this.$nextTick(function(){
            this.reload();
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
