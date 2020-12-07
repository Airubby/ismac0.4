<template>
    <div class="content">
        <div class="layout-top">
            <el-button type="primary" plain @click="enterEdit">编辑布局</el-button>
        </div>
        <div></div>
    </div>
</template>
<script>
export default {
    components: {},
    mixins:[],
    filters:{
        
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
        enterEdit:function(item){
            this.$router.push({name:'deviceLayoutEdit',query:{params:JSON.stringify({"id":item.id})}});
        }
	},
    
}
</script>
<style lang="less" scoped>
    .module-theme(...){
        .layout-top{
            display: flex;
            justify-content: flex-end;
            margin-bottom: @itemMargin;
        }
        
    }
</style>