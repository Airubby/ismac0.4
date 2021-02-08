<template>
    <component :is="currentComponent" :templateData="templateData" :templateUrl="templateUrl"></component>
</template>
<script>
import Vue from 'vue'
import axios from 'axios'
const compiler = require('vue-template-compiler')
const path = require("path")
import { v4 as uuidv4 } from 'uuid';
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
        cssText = css.css.replace(/[\.\w\>\s]+{/g, $1 => {     
            if (/>>>/.test($1)) return $1.replace(/\s+>>>/, `[data-u-${componentId}]`)  
            return $1.replace(/\s+{/g, $2 => `[data-u-${componentId}]${$2}`)    
        })  
    }  
    return cssText
}
const $require = (filepath, scriptContext) => {
    // console.log(path)
    // console.log(path.dirname(`${filepath}`))
    // console.log(path.extname(`${filepath}`))
    // console.log(path.isAbsolute(`${filepath}`))
    // console.log(path.normalize(`${filepath}`))
    // console.log(__dirname)
    console.log("!!!!!!!!!!!!!!!!!!!!!!!")
    const filename = path.resolve(__dirname, `./${filepath}`); 
    console.log(filename) 
    const module = { exports: {} }  
    let code = scriptContext ? scriptContext : $readFileSync(filename)  
    let exports = module.exports  
    code = `(function($require,module,exports,__dirname,filename){${code}})($require,module,exports,__dirname,filename)`  
    eval(code)  
    return module.exports
}
const $readFileSync=(filename)=>{
    fetch(filename).then(res => {
        return res.json();
    }).then(sfc => {    
        console.log(sfc)
    });
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
    created() {
        
    },
    mounted() {
        // this.getComponent();
    },
    data(){
        return{
            styleID:"",
            currentComponent:null,
        }
    },
	methods: {
        setStyle(styles){
            let styleID=uuidv4();
            let style="";
            for(let i=0;i<styles.length;i++){
                style+=styles[i];
            }
            //这个地方生成编译后的样式 style
            if(styleID!=""&&document.getElementById(styleID)){
                document.getElementById(styleID).innerHTML="";
                document.getElementById(styleID).appendChild(document.createTextNode(style))
            }else{
                let styleDom=document.createElement("style");
                styleDom.type="text/css";
                styleDom.id=styleID;
                styleDom.appendChild(document.createTextNode(style));
                document.getElementsByTagName("head")[0].appendChild(styleDom);
            }
        },
        getComponentOption(sfc){
            // 生成data-u-id 
            const componentId = uuidv4();
            const template = sfc.template ? tagToUuid(sfc.template.content, componentId) : '' 
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
                // script: sfc.script ? $require(null, sfc.script.content) : {},    
                script: sfc.script ? eval(sfc.script.content) : {},    
                styles,    
                template  
            }  
            return options
        },
        getComponent(){
            let _this=this;
            this.currentComponent=null;
            let tempData=null;
            new Promise ((resolve, reject) => {
                //`${_this.pathUrl}`
                axios.get(`${_this.pathUrl}`).then((result) => {
                    tempData = compiler.parseComponent(result);
                    resolve();
                }).catch((error) => {
                    reject()
                })
            }).then(()=>{
                if(tempData){
                    let r=this.getComponentOption(tempData)
                    let temp=compiler.compile(r.template)  //编译成render函数
                    //这个地方生成编译后的dom  temp.render   注意:生成的编译文件中去掉\n;编译的源组件中不能有模板字符串`
                    this.setStyle(r.styles);
                    
                    //注册全局组件
                    // this.currentComponent=Vue.component('currentComponent',{
                    //     render:new Function(temp.render),
                    //     ...r.script
                    // }) 
                    //注册局部组件
                    this.currentComponent={
                        render:new Function(temp.render),
                        ...r.script
                    }
                }
            });
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