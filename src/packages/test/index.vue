
<template>
  <div class="name">
      {{ name }}----{{initParams.test}}
        <img :src="templateUrl+'/images/me111.png'" v-if="templateUrl">  
        <img src="./images/me111.png" v-else>  
        234234
        <test :templateUrl="templateUrl"></test>
    </div>
</template>

<script>
import test from './test'
export default {
    props:{
        //需要传给动态子组件的数据
        templateData:{
            type:Object,
            default:function(){
                return {}
            }
        },
        templateUrl:{
            type:String,
            default:""
        }
    },
    components:{test},
    data() {
        return {
            name:"瘦腿袜套",
            initParams:{
                test:""
            }
        }
    },
    mounted(){
        console.log(this.templateData,"!!!!!!!!!!!!!!!!!!")
    },
    methods: {
      
    },
    watch:{
        templateData:{
            handler:function(val){
                Object.assign(this.initParams,val)
            },
            deep: true, 
            immediate: true
        }
    }
    
}
</script>
<style lang="less" scoped>
    .name{
        color: #f00
    }
</style>