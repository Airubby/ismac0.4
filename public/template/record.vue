<template>
    <div>
        {{activeName}}
        <div class="bg" :style="`background:url(${templateUrl}/logo.png);background-size: contain;`"></div>
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
    props:["templateData","templateUrl"],
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
