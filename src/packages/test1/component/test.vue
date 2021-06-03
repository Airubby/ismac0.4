
<template>
  <div class="name">
      {{ name }}
        <img :src="templateUrl+'/images/me222.png'">  
    </div>
</template>

<script>
  export default {
    props:["templateUrl"],
    data() {
      return {
        name:"瘦腿袜套test瘦腿袜套test瘦腿袜套test瘦腿袜套test"
      }
    },
    computed: {
     
    },
    methods: {
      
    },
    watch:{
        
    }
    
  }
</script>
<style lang="less" scoped>
    .name{
        color: #f00
    }
</style>