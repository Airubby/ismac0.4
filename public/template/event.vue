<template>
    <div class="bgfffcontent">
        <h4 class="item">{{initParams}}</h4>
        <span class="item1">父组件传来的值:{{data.type}}</span>
        <img :src="url+'/logo.png'" style="width:54px;">
    </div>
</template>
<style lang="less" scoped>
    .bgfffcontent {
        .item {
            color: #09c;
        }
    }
    .item1{
        color: #09c;
    }
</style>
<script>
module.exports = {
    props:["data","url"],
    created() {
        
    },
    mounted() {
        
    },
    data(){
        return{
            initParams:"这个是远程组件展示",
        }
    },
	methods: {
        
	},
    components: {
        
    }
}
</script>
