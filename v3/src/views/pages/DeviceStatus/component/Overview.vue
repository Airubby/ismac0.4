<template>
    <div class="content" v-scrollBar>
        <DynamicComponent :pathUrl="`/template/home/Index.vue`" :templateData="initParams" templateUrl="/template/home"></DynamicComponent>
    </div>
</template>
<script>
import DynamicComponent from '@/components/DynamicComponent'
export default {
    components:{DynamicComponent},
    mixins:[],
    filters:{
        
    },
    created() {
        
    },
    mounted() {
        
    },
    data(){
        return{
            initParams:{
                type:"event",
            },
        }
    },
    computed: {
    },
	methods: {
        
	},
}
</script>
<style lang="less" scoped>
    .module-theme(...){
        
    }
</style>