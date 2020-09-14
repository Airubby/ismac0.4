<template>
    <div class="bgfffcontent">
        <div class="breadcrumb">
            <component is="Breadcrumb"></component>
        </div>
        <div class="public_content">
            <el-scrollbar class="scrollbar">
                <slot></slot>
            </el-scrollbar>
        </div>
    </div>
</template>

<script>

export default {
    name:"AppCon",
    props:{
        
    },
    created () {
        
    },
    mounted() {
        
    },
    data() {
        return {
            
        }
    },
    methods:{
        
    },
    
}
</script>
<style lang="less" scoped>

</style>
