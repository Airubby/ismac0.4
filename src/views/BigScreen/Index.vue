<template>
	<div class="content">
        <!-- templateData整个数据源；dataObject展示的数据绑定值；templateUrl模板路径 -->
		<DynamicComponent :pathUrl="tempUrl+'/Index.vue'" :templateData="tempData" :dataObject="data" :templateUrl="tempUrl"></DynamicComponent>
        <web-socket v-if="tempData.data.length>0" :wsInfo="tempData.data" :sendInfo="{cmd:'subdata',returnFn:true,changeSend:true}" @backInfo="handleBack"></web-socket>
    </div>
</template>

<script>
import DynamicComponent from './component/DynamicComponent'
import { mapGetters } from 'vuex'
import WebSocket from '@/components/WebSocket'
export default {
    components:{DynamicComponent,WebSocket},
	created () {
        // this.getInfo()
	},
	mounted() {
        this.$nextTick(()=>{
            this.getInfo()
        })
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
        setTimeout(() => {
            this.data={
                wendu:"10",
                shidu:"20",
            }
        }, 5000);
    },
    computed:{
        ...mapGetters([
            'tempUrl','tempData'
        ]),
    },
    destroyed(){
        this.$store.dispatch("setTempUrl","");
    },
	data(){
		return {
            data:{},
		}
	},
	methods:{
		getInfo(){
            this.$api.post("/getBigInfo",{}).then(res=>{
                if(res.err_code=="0"){
                    res.data.forEach(element => {
                        if("true"==element.isIndex||true==element.isIndex){
                            this.$store.dispatch("setTempUrl",element.pathUrl);
                            this.$store.dispatch("setTempData",element);
                        }
                    });
                }
            })
        },
        handleBack:function(info){
            let data={};
            for(let i=0;i<this.tempData.data.length;i++){
                for(let j=0;j<info.length;j++){
                    if(this.tempData.data[i].key==info[j].key){
                        if(this.tempData.data[i].format){
                            data[info[j].key]=JSON.parse(this.tempData.data[i].format)[info[j].value];
                        }else{
                            data[info[j].key]=info[j].value;
                        }
                    }
                }
            }
            this.data=data;
        }
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