<template>
	<div class="content">
		<DynamicComponent :pathUrl="pathUrl+'/Index.vue'" :templateData="initParams" :templateUrl="pathUrl"></DynamicComponent>
        <!-- <component :is="remote" v-bind="$attrs" v-on="$listeners"></component> -->
    </div>
</template>

<script>
import Vue from "vue";
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
// const formatStyle = (sty, css, componentId) => {  
//     let cssText = css  
//     if (sty.scoped) {    
//         cssText = css.css.replace(/[\.\w\>\s]+{/g, $1 => {     
//             if (/>>>/.test($1)) return $1.replace(/\s+>>>/, `[data-u-${componentId}]`)  
//             return $1.replace(/\s+{/g, $2 => `[data-u-${componentId}]${$2}`)    
//         })  
//     }  
//     return cssText
// }
const formatStyl = (sty, css, componentId) => {  
  let cssText = css  
  if (sty.scoped) {    
    cssText = css.css.replace(/[\.\w\>\s]+{/g, $1 => {      
    if (/>>>/.test($1)) return $1.replace(/\s+>>>/, `[data-u-${componentId}]`)      
    return $1.replace(/\s+{/g, $2 => `[data-u-${componentId}]${$2}`)    
    })  
  }  
  return cssText
}
// const $require = (filepath, scriptContext) => {
//     const filename = path.resolve(__dirname, `./${filepath}`);  
//     const module = { exports: {} }  
//     let code = scriptContext ? scriptContext : fs.readFileSync(filename, 'utf-8')  
//     let exports = module.exports  
//     code = `(function($require,module,exports,__dirname,filename){${code}})($require,module,exports,__dirname,filename)`  
//     eval(code)  
//     return module.exports
// }
const $require = (filepath, scriptContext) => {
    const module = { exports: {} }  
    let code = scriptContext  
    let exports = module.exports  
    code = `(function($require,module,exports){${code}})($require,module,exports)`  
    eval(code)  
    return module.exports
}
import DynamicComponent from './component/DynamicComponent'
export default {
    components:{DynamicComponent},
	created () {
        // this.getInfo()
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
        getComponentOption(sfc) {
            // 生成data-u-id 
            const componentId = uuidv4();
            // 标签添加data-u-id属性  
            const template = sfc.template ? tagToUuid(sfc.template.content, componentId) : '' 
            // 转化style（less、sass、stylus）  
            let styles = []  
            console.log(sfc)
            sfc.styles.forEach(sty => {    
                switch (sty.lang) {      
                case 'stylus':        
                    stylus.render(sty.content, (err, css) => styles.push(formatStyl(sty, css, componentId)))        
                    break;      
                case 'sass':      
                case 'scss':        
                    styles.push(formatStyl(sty, sass.renderSync({ data: sty.content }).css.toString(), componentId))        
                    break;      
                case 'less':        
                    less.render(sty.content, (err, css) => styles.push(formatStyl(sty, css, componentId)))        
                    break;    
                }  
            })  
            let options = {    
                script: sfc.script ? $require(null, sfc.script.content) : {},    
                styles,    
                template  
            }  
            return JSON.stringify(options, (k, v) => {
                if(typeof(v) === 'function') {
                    let _fn = v.toString()
                    return /^function()/.test(_fn) ? _fn : _fn.replace(/^/,'function ')
                }
                return v
            })
        },
        // isObject(v) {   
        //     return Object.prototype.toString.call(v).includes("Object");  
        // },  
        // parseObj(data) {   
        //     if (Array.isArray(data)) return data.map(row => this.parseObj(row));   
        //     if (this.isObject(data)) {    
        //         let ret = {};    
        //         for (let k in data) {     
        //         ret[k] = this.parseObj(data[k]);    
        //         }    return ret;   
        //     }   
        //     try {    
        //         let pattern = /function ([\w]+)\(\) \{ \[native code\] \}/;    
        //         if (pattern.test(data)) {     
        //         return window[pattern.exec(data)[1]];    
        //         } else {     
        //         let evalData = eval(`(${data})`);     
        //         return typeof evalData == "function" ? evalData : data;    
        //         }   
        //     } catch (err) {    
        //         return data;   
        //     }  
        // },  
        // appendSty(css) { // 生成组件样式   
        //     let style = document.createElement("style");   
        //     style.setAttribute("type", "text/css");   
        //     var cssText = document.createTextNode(css);   
        //     style.appendChild(cssText);   
        //     var head = document.querySelector("head");   
        //     head.appendChild(style);  
        // } 
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