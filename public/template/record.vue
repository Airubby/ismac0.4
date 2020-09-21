<template>
    <div>
        {{activeName}}
        <div class="bg" :style="`background:url(${url}/logo.png);background-size: contain;`"></div>
    </div>
</template>
<style lang="less" scoped>
    .bg{
        width: 60px;
        height: 60px;
    }
</style>
<script>

module.exports = {
    props:["data","url"],
    components: {
        
    },
    created() {
        
    },
    mounted() {
        
    },
    data(){
        return{
            activeName:'另一个远程组件',
            
        }
    },
	methods: {
        
    },
    watch:{
        
    }
    
}
</script>
