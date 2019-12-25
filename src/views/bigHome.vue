<template>
    <div class="content" v-loading="loading">
        <iframe :src="url" class="content" frameborder="0" scrolling="yes" id="myIframe" v-if="checkshow&&check&&show"></iframe> 
        <h2 v-if="checkshow&&check&&!show">首页不存在</h2>
        <h2 v-if="checkshow&&!check">未启用</h2>
    </div>
</template>

<script>
export default {
    created() {
        this.init();
    },
    computed: {
        check:{
            get(){
                return this.$store.getters.isview
            },
        }
    },
    mounted() {
        
    },
    data(){
        return{
            url:'',
            //:src="`${publicPath}tx.jpg`"
            show:false,
            checkshow:false,  //刷新的时候会出现未启用的问题解决
            loading:false,
        }
    },
    
	methods: {
        async init(){
            
            await this.getCheck();
            await this.getTemp();
            this.checkshow=true;
            
        },
        getCheck:function(){
            return new Promise((resolve, reject)=>{
                this.$r.post('/getCheck',{},r=>{
                    console.log(r)
                    if(r.err_code=='0'){
                        this.$store.dispatch('setIsview',r.data);
                    }else{
                        this.$message.warning("获取大屏启用信息失败");
                    }
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
        },
        getTemp:function(){
            return new Promise((resolve, reject)=>{
                this.$r.post('/getTemp',{},r=>{
                    console.log(r)
                    if(r.err_code=='0'){
                        if(r.data.length>0){
                            for(let i=0;i<r.data.length;i++){
                                if(r.data[i].type=="1"){
                                    this.url=r.data[i].url;
                                    this.show=true;
                                }
                            }
                        }
                    }
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
            
        }
	},
    watch: {
        url:function(val){
            console.log(val)
        }
    },
    components: {
        
    }
}
</script>
