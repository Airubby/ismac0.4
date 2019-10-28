<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item,index) in levelList" :key="item.path">
        <span v-if="index==levelList.length-1">{{$t("navbar."+item.name)}}</span>
        <router-link v-else :to="item.path">{{$t("navbar."+item.name)}}</router-link>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
export default {
  data() {
    return {
      levelList: []
    }
  },
  watch: {
    $route() {
      this.getBreadcrumb()
    }
  },
  created() {
    this.getBreadcrumb()
  },
  methods: {
    getBreadcrumb() {
      // only show routes with meta.title
      let route=this.$route;
      route.matched.forEach(element => {
          if(element.path==route.path){
            this.setBreadcrumb(element);
          }
      });
      //去掉第一级locom
      this.levelList.splice(0,1);
    },
    setBreadcrumb(element){
      this.levelList.unshift({path:element.path,name:element.name});
      if(element.meta&&element.meta.activePath&&element.meta.activeName){
        this.levelList.unshift({path:element.meta.activePath,name:element.meta.activeName});
      }
      if(element.parent){
        this.setBreadcrumb(element.parent);
      }
    },
  }
}
</script>

<style lang="less" scoped>

</style>
