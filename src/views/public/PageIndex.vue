<template>
    <div class="scrollbar">
        <el-scrollbar>
            <component :is="currentComponent" class="component-con"></component>
        </el-scrollbar>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
	computed:{
        ...mapGetters([
            'currentComponent'
        ]),
    },
}
</script>
<style lang="less" scoped>
    .module-theme(...){
        .component-con{
            width: 100%;
            height: 100%;
            padding: 15px;
            background: @contentBg;
        }
    }
</style>
