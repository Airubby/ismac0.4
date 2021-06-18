<template>
    <div class="content">
        <div class="centermap"></div>
    </div>
</template>
<script>
module.exports = {
    props:["templateData","templateUrl","dataObject"],
    components:{
        
    },
    created() {
        
    },
    mounted() {
        
    },
    data(){
        return{
            
        }
    },
	methods: {
        
    },
    watch:{
        dataObject:{
            handler:function(val){
                this.initParams=Object.assign(this.initParams,val)
            },
            deep: true, 
            immediate: true
        }
    }
}
</script>
<style lang="less" scoped>
    .content{
        min-width: 100%;
        min-height: 100%;
        background: #052B62;
        
    }
</style>
