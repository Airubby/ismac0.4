<template>
  <div id="app" ref="app">
    <transition name="rotate-fall">
      <router-view v-if="isRouterAlive"/>
    </transition>
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
        // this.$tool.wsConnection("",function(result){
        //   console.log(result)
        //   // store.commit('setwsData',eval(result.data));
        //   store.dispatch('setwsData',eval(result.data));
        // })

    },
    data(){
      return{
        isRouterAlive:true,
      }
    },
    methods:{
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
