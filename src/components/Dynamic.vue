<template>
    <component :is="currentComponent" :templateData="templateData" :templateUrl="templateUrl"></component>
</template>
<script>
import Vue from 'vue'
import axios from 'axios'
const path = require("path")
import { uuid } from 'utilscore'
// import stylus from 'stylus'
// import sass from 'sass'
import less from 'less'
const $require = (filepath, scriptContext) => {
    const filename = path.resolve(__dirname, `./${filepath}`);  
    const module = { exports: {} }  
    let code = scriptContext ? scriptContext : fs.readFileSync(filename, 'utf-8')  
    let exports = module.exports  
    code = `(function($require,module,exports,__dirname,filename){${code}})($require,module,exports,__dirname,filename)`  
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
        this.Init();
    },
    mounted() {},
    data(){
        return{
            test:[{title:"aa"}],
            styleID:"",
            currentComponent:null,
        }
    },
	methods: {
        Init(){
            this.styleID=uuid(16, 32).toLocaleLowerCase();
            this.getComponent();
        },
        setStyle(style){
            if(this.styleID!=""&&document.getElementById(this.styleID)){
                document.getElementById(this.styleID).innerHTML="";
                document.getElementById(this.styleID).appendChild(document.createTextNode(style))
            }else{
                let head=document.getElementsByTagName("head")[0];
                let styleDom=document.createElement("style");
                styleDom.type="text/css";
                styleDom.id=this.styleID;
                styleDom.appendChild(document.createTextNode(style));
                document.getElementsByTagName("head")[0].appendChild(styleDom);
            }
        },
        getComponent(){
            
            let _this=this;
            this.currentComponent=null;
            if(this.pathType=="remote"){
                let tempData=null;
                new Promise ((resolve, reject) => {
                    axios.get(`${_this.pathUrl}`).then((result) => {
                        // console.log(result)
                        tempData=result;
                        resolve();
                    }).catch((error) => {
                        reject()
                    })
                }).then(()=>{
                    if(tempData){
                        let r=$require(null, tempData)
                        console.log(r)
                        // this.setStyle(r.styles);
                        // let temp=r.render;
                        // delete r.render
                        // delete r.styles
                        // //注册全局组件
                        // // this.currentComponent=Vue.component('currentComponent',{
                        // //     render:new Function(temp.render),
                        // //     ...r.script
                        // // }) 
                        //注册局部组件
                        this.currentComponent={
                            ...r.default
                        }
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
                this.currentComponent = () => import(`@/views${_this.pathUrl}`);
            }
        }
    },
    watch:{
        pathUrl:function(val){
            debugger
            this.getComponent();
        }
    },
    destroyed() {
        if(this.styleID!=""&&document.getElementById(this.styleID)){
            document.getElementById(this.styleID).parentNode.removeChild(document.getElementById(this.styleID));
        }
    }
    
}
</script>