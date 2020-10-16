<template>
    <div class="content-con">
	    <component :is="currentComponent"></component>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
	components:{},
	computed:{
        ...mapGetters([
            'currentComponent'
        ]),
	},
	methods:{
		
	},
	watch:{
		
	}
}
</script>
<style lang="less" scoped>
    .module-theme(...){
        .content-con{
            width: 100%;
            height: 100%;
            padding: 15px;
            background: @contentBg;
        }
    }
</style>
