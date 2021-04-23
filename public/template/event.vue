<template>
    <div class="content">
        <h4 class="item">{{initParams}}</h4>
        <span class="item1">父组件传来的值:{{templateData.type}}</span>
        <img :src="templateUrl+'/logo.png'" style="width:54px;">
        <h2>逗号分隔样式</h2>
        <div class="box box1">逗号样式1</div>
        <div class="box box2">逗号样式1</div>
        <div class="box box3">逗号样式1</div>
    </div>
</template>
<style lang="less" scoped>
    // .content {
    //     .item {
    //         color: #09c;
    //     }
    // }
    // .item1{
    //     color: #09c;
    // }
    // .box1,.box2,.box3{
    //     color: #09c;
    // }
    .box:nth-of-type(1) {
        color: #f00;
    }
    .box2::before,
    .box2:after{
        content:""
    }
    .box1{
        width: 20px;
        height: 20px;
        background: #026BCE;
        border-radius: 50%;
        animation: anm0 1.5s infinite ease-in-out 0s; 
    }
    @keyframes anm0 {
        0% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.5);
        }
        100% {
            transform: scale(1);
        }
    }
</style>
<script>
module.exports = {
    props:["templateData","templateUrl"],
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
