<template>
	<div class="content">
		<DynamicComponent :pathUrl="pathUrl+'/Index.vue'" :templateData="initParams" :templateUrl="pathUrl"></DynamicComponent>
    </div>
</template>

<script>
import DynamicComponent from './component/DynamicComponent'
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
	data(){
		
		return {
            initParams:{
                pointData:[],
                routeData:[]
            },
            pathUrl:"",
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
                            this.pathUrl=element.pathUrl;
                            this.initParams.pointData=element.pointData;
                            this.initParams.routeData=element.routeData;
                            // this.$store.dispatch("setSendMsg",element.pointData);
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