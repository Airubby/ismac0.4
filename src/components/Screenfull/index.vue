<template>
  <div @click="click">
    <slot></slot>
  </div>
</template>

<script>
import screenfull from 'screenfull'
export default {
  name: 'Screenfull',
  data() {
    return {
      isFullscreen: false
    }
  },
  mounted() {
    this.$nextTick(()=>{
      this.init();
    })
  },
  beforeDestroy() {
    this.destroy()
  },
  methods: {
    getDevice:function(){
      var ua = navigator.userAgent,
      isWindowsPhone = /(?:Windows Phone)/.test(ua),
      isSymbian = /(?:SymbianOS)/.test(ua) || isWindowsPhone,
      isAndroid = /(?:Android)/.test(ua),
      isFireFox = /(?:Firefox)/.test(ua),
      isChrome = /(?:Chrome|CriOS)/.test(ua),
      isTablet = /(?:iPad|PlayBook)/.test(ua) || (isAndroid && !/(?:Mobile)/.test(ua)) || (isFireFox && /(?:Tablet)/.test(ua)),
      isPhone = /(?:iPhone)/.test(ua) && !isTablet,
      isPc = !isPhone && !isAndroid && !isSymbian;
      return {
          isTablet: isTablet,
          isPhone: isPhone,
          isAndroid: isAndroid,
          isPc: isPc
      };	
    },
    click() {
      if (!screenfull.isEnabled) {
        this.$message({
          message: 'you browser can not work',
          type: 'warning'
        })
        return false
      }
      screenfull.toggle()
    },
    change() {
      this.isFullscreen = screenfull.isFullscreen
    },
    init() {
      if (screenfull.isEnabled) {
        let os=this.getDevice();
        if (os.isAndroid || os.isPhone||os.isTablet) {   
          // 手机os.isAndroid || os.isPhone   平板os.isTablet
          screenfull.request() // 默认全屏显示
        } else if (os.isPc) {
          // pc
          if(document.documentElement.clientWidth<1200){ //windows的平板
            screenfull.request() // 默认全屏显示
          }
        }
        screenfull.on('change', this.change)
      }
    },
    destroy() {
      if (screenfull.isEnabled) {
        screenfull.off('change', this.change)
      }
    }
  }
}
</script>

<style scoped>
.screenfull-svg {
  display: inline-block;
  cursor: pointer;
  fill: #5a5e66;;
  width: 20px;
  height: 20px;
  vertical-align: 10px;
}
</style>
