<template>
    <component :is="currentComponent" :templateData="templateData" :templateUrl="templateUrl"></component>
</template>
<script>
const $require = (filepath, scriptContext) => {
    const module = { exports: {} }  
    let code = scriptContext  
    let exports = module.exports  
    code = `(function($require,module,exports){${code}})($require,module,exports)`  
    eval(code)  
    return module.exports
}
export default {
    props:{
        pathUrl:{
            type: String,
            required: true
        },
        pathType:{
            type:String,
            default:"remote"  //remote,local
        },
        //需要传给动态子组件的数据
        templateData:{
            type:Object,
            default:function(){
                return {}
            }
        },
        templateUrl:{
            type:String,
            default:""
        }
    },
    components: {},
    created() {
        this.getComponent();
    },
    mounted() {},
    data(){
        return{
            currentComponent:null,
        }
    },
	methods: {
        getComponent(){
            let _this=this;
            this.currentComponent=null;
            if(this.pathType=="remote"){
                let tempData=null;
                new Promise ((resolve, reject) => {
                    this.$axios.get(`${_this.pathUrl}`).then((result) => {
                        tempData=result;
                        resolve();
                    }).catch((error) => {
                        reject()
                    })
                }).then(()=>{
                    if(tempData){
                        let r=$require(null, tempData)
                        console.log(r)
                        //注册全局组件
                        // this.currentComponent=Vue.component('currentComponent',r.default) 
                        //注册局部组件
                        this.currentComponent=r.default
                    }
                });
            }else{
                //注册全局组件
                // Vue.component(
                //     'currentComponent',
                //     // 这个动态导入会返回一个 `Promise` 对象。
                //     () => import(`@/views${_this.pathUrl}`)
                // )
                
                //注册局部组件 @/views  必须在这个地方写，如果传参过来会报错
                // this.$options.components["componentName"]=() => import(`@/views${_this.pathUrl}`);
                // this.currentComponent = () => import(`@/views${_this.pathUrl}`);
            }
        }
    },
    watch:{
        pathUrl:function(val){
            this.getComponent();
        }
    },
}
</script>