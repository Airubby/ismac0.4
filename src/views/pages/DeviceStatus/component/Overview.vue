<template>
    <div class="content" v-scrollBar>
        <DynamicComponent :pathUrl="`${path}/index.js`" :templateData="initParams" templateUrl="/template/test"></DynamicComponent>
    </div>
</template>
<script>
import DynamicComponent from '@/components/DynamicCompile'
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
            path:"",
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