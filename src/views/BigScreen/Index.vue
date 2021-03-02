<template>
	<div class="content">
		<DynamicComponent :pathUrl="tempUrl+'/Index.vue'" :templateData="initParams" :templateUrl="tempUrl"></DynamicComponent>
    </div>
</template>

<script>
import DynamicComponent from './component/DynamicComponent'
import { mapGetters } from 'vuex'
export default {
    components:{DynamicComponent},
	created () {
        this.getInfo()
	},
	mounted() {
		// fetch("/template/home/Index.vue").then(res => {
        //     return res.text();
        // }).then(sfc => {    
        //     // console.log(sfc)
        //     let result = compiler.parseComponent(sfc)
        //     let options = this.getComponentOption(result);    
        //     console.log(options) 
        //     options.styles.forEach(css => this.appendSty(css));    
        //     this.remote = Vue.extend({ 
        //         ...options.script,     
        //         name: options.script.name || this.tagName,     
        //         template: options.template    
        //     });
        // }); 
    },
    computed:{
        ...mapGetters([
            'tempUrl'
        ]),
    },
    destroyed(){
        this.$store.dispatch("setTempUrl","");
    },
	data(){
		
		return {
            initParams:{
                pointData:[],
                routeData:[]
            },
            remote:null
		}
	},
	methods:{
		getInfo(){
            this.$api.post("/getBigInfo",{}).then(res=>{
                if(res.err_code=="0"){
                    res.data.forEach(element => {
                        console.log(element)
                        if("true"==element.isIndex||true==element.isIndex){
                            this.initParams.pointData=element.pointData;
                            this.initParams.routeData=element.routeData;
                            this.$store.dispatch("setTempUrl",element.pathUrl);
                        }
                    });
                }
            })
        },
	},
	watch:{
			
	},
}
</script>

<style scoped lang="less">
	.module-theme(...){
        .content{
            width: 100%;
            height: 100%;
            position: relative;
            background: @bodyBg;
        }
    }
</style>