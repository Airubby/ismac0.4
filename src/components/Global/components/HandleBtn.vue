<template>
    <el-button type="primary" @click="handleClick" :disabled="handleLoading">{{btnName}}</el-button>
</template>

<script>

export default {
    props:{
        btnName:{
            type:String,
            default:"确定"
        },
        btnTimeout:{
            type:[Number,String],
            default: 1000
        }  
    },
    created () {
        
    },
    mounted() {
        
    },
    data() {
        return {
            handleLoading:false
        }
    },
    methods:{
        handleClick:function(){
            this.handleLoading=true;
            this.$emit('handleClick');
            setTimeout(() => {
                this.handleLoading=false;
            }, this.btnTimeout);
        },
    },
    
}
</script>

