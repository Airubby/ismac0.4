<template>
    <component :is="currentComponent" :templateData="templateData" :dataObject="dataObject" :templateUrl="templateUrl" 
    @selectPoint="selectPoint" @selectUrl="selectUrl"></component>
</template>
<script>
import Vue from 'vue'
import axios from 'axios'
const compiler = require('vue-template-compiler')
const path = require("path")
// import stylus from 'stylus'
// import sass from 'sass'
import less from 'less'
const tagToUuid = (tpl, id) => {  
    var pattern = /<[^\/]("[^"]*"|'[^']*'|[^'">])*>/g  
    return tpl.replace(pattern, $1 => {    
        return $1.replace(/<([\w\-]+)/i, ($2, $3) => `<${$3} data-u-${id}`)  
    })
}
const formatStyle = (sty, css, componentId) => {  
    let cssText = css  
    if (sty.scoped) {   
        // console.log(css)
        cssText = css.css.replace(/[\.\w\>:,@%\s]+{/g, $1 => {   
            if(/,/.test($1)){
                if (/:/.test($1)){
                    //(?<!:):(?!:)  冒号前后没有冒号挨着的
                    return $1.replace(/(?<!:):/g, $2 => `[data-u-${componentId}]${$2}`)    
                } 
                return $1.replace(/,|\s+{/g,$2=>`[data-u-${componentId}]${$2}`)
            }
            if (/>>>/.test($1)) return $1.replace(/\s+>>>/, `[data-u-${componentId}]`)  
            if (/:/.test($1)){
                return $1.replace(/:/, $2 => `[data-u-${componentId}]${$2}`)    
            }
            if(/@|%/.test($1)){
                return $1;
            }
            return $1.replace(/\s+{/g, $2 => `[data-u-${componentId}]${$2}`)    
        })  
    }  
    console.log(cssText)
    return cssText
}
const $require = (filepath) => {
    console.log("!!!!!!!!!!!!!!!!!!!!!!",filepath)
    Dynamic.requireFile(filepath);
    // const filename = path.resolve(__dirname, `./${filepath}`);  
    // const module = { exports: {} }  
    // let code = scriptContext ? scriptContext : fs.readFileSync(filename, 'utf-8')  
    // let exports = module.exports  
    // code = `(function($require,module,exports,__dirname,filename){${code}})($require,module,exports,__dirname,filename)`  
    // eval(code)  
    // return module.exports
}
let Dynamic = null;
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
        dataObject:{
            type: Object,
            default:function(){
                return {}
            }
        },
        templateUrl:{
            type:String,
            default:""
        }
    },
    beforeCreate(){
        Dynamic = this;
    },
    created() {
        this.Init();
    },
    mounted() {},
    data(){
        return{
            styleID:"",
            currentComponent:null,
        }
    },
	methods: {
        requireFile:function(filepath){
            let filePath=path.resolve(this.templateUrl, `${filepath}`)
            this.$api.get(filePath).then(res=>{
                console.log(res)
                // console.log(require(res))
            })
            // this.$api.get(this.templateUrl+'/config/Language.js').then(res=>{
        //     console.log(res)
        // })
         // this.$i18n.setLocaleMessage('zh',Object.assign(this.$i18n.getLocaleMessage('zh'),zhLang))
        // this.$i18n.setLocaleMessage('en',Object.assign(this.$i18n.getLocaleMessage('en'),enLang))

        },
        selectPoint:function(key){
            this.$emit("selectPoint",key)
        },
        selectUrl:function(key){
            this.$emit("selectUrl",key)
        },
        Init(){
            this.styleID=this.getRandom();
            this.getComponent();
        },
        getRandom(){
            return Math.random().toString(36).substr(-8);
        },
        setStyle(styles){
            let style="";
            for(let i=0;i<styles.length;i++){
                style+=styles[i];
            }
            //这个地方生成编译后的样式 style
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
        getComponentOption(sfc){
            // 生成data-u-id 
            const componentId = this.getRandom();
            const template = sfc.template ? tagToUuid(sfc.template.content, componentId) : '' 
            console.log(sfc)
            // 转化style（less、sass、stylus）  
            let styles = []  
            sfc.styles.forEach(sty => {    
                switch (sty.lang) {      
                    case 'stylus':        
                        stylus.render(sty.content, (err, css) => styles.push(formatStyle(sty, css, componentId)))        
                        break;      
                    case 'sass':      
                    case 'scss':        
                        styles.push(formatStyle(sty, sass.renderSync({ data: sty.content }).css.toString(), componentId))        
                        break;      
                    case 'less':        
                        less.render(sty.content, (err, css) => styles.push(formatStyle(sty, css, componentId)))        
                        break;    
                }  
            })  
            let options = {    
                script: sfc.script ? eval(sfc.script.content): {},    
                styles,    
                template  
            }  
            return options
        },
        getComponent(){
            let _this=this;
            this.currentComponent=null;
            if(this.pathType=="remote"){
                let tempData=null;
                new Promise ((resolve, reject) => {
                    axios.get(`${_this.pathUrl}`).then((result) => {
                        tempData = compiler.parseComponent(result);
                        resolve();
                    }).catch((error) => {
                        reject()
                    })
                }).then(()=>{
                    if(tempData){
                        let r=this.getComponentOption(tempData)
                        let temp=compiler.compile(r.template.trim())  //编译成render函数
                        //这个地方生成编译后的dom  temp.render   注意:生成的编译文件中去掉\n;编译的源组件中不能有模板字符串`
                        this.setStyle(r.styles);
                        const res = {}
                        res.render = new Function(temp.render)
                        res.staticRenderFns = temp.staticRenderFns.map(code => {
                            return new Function(code)
                        })
                        //注册全局组件
                        // this.currentComponent=Vue.component('currentComponent',{
                        //     ...res,
                        //     ...r.script
                        // }) 
                        //注册局部组件
                        this.currentComponent={
                            ...res,
                            ...r.script
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
                this.currentComponent = () => import(`@/views/pages${_this.pathUrl}`);
            }
        }
    },
    watch:{
        pathUrl:function(val){
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