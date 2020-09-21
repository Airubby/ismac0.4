import Vue from 'vue'
import axios from 'axios'
const compiler = require('vue-template-compiler')
const path = require("path")
import { uuid } from 'utilscore'
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
        console.log(css)
        cssText = css.css.replace(/[\.\w\>\s]+{/g, $1 => { 
            console.log($1.replace(/\s+>>>/, `[data-u-${componentId}]`))     
            if (/>>>/.test($1)) return $1.replace(/\s+>>>/, `[data-u-${componentId}]`)   
            console.log($1.replace(/\s+{/g, $2 => `[data-u-${componentId}]${$2}`))   
            return $1.replace(/\s+{/g, $2 => `[data-u-${componentId}]${$2}`)    
        })  
    }  
    return cssText
}
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
    components: {
        
    },
    created() {
        this.getComponent()
    },
    mounted() {
        
    },
    data(){
        return{
            temp:'',
            currentComponent:null,
            currentTabComponent:null,
            allComponent:null
        }
    },
	methods: {
        getComponentOption(sfc){
            // 生成data-u-id 
            const componentId = uuid(8, 16).toLocaleLowerCase();
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
                script: sfc.script ? $require(null, sfc.script.content) : {},    
                styles,    
                template  
            }  
            return options
        },
        getTemplate:function(){
            return new Promise ((resolve, reject) => {
                axios.get('/template/event.vue').then((result) => {
                    this.temp = result.data;
                    resolve();
                }).catch((error) => {
                    reject()
                })
            })
        },
        getComponent(){
            let _this=this;
            // Vue.component('currentTabComponent', function (resolve) {
            //     // 这个特殊的 `require` 语法将会告诉 webpack
            //     // 自动将你的构建代码切割成多个包，这些包
            //     // 会通过 Ajax 请求加载
            //     require(['./'+_this.initParams.type], resolve)
            // })
            this.currentComponent=Vue.component(
                'currentComponent',
                // 这个动态导入会返回一个 `Promise` 对象。
                () => import(`./${_this.initParams.type}`)
            )

            new Promise ((resolve, reject) => {
                this.currentTabComponent=null;
                this.temp=null;
                axios.get(`/template/${this.initParams.type}.vue`).then((result) => {
                    // this.temp = result.data;
                    this.temp = compiler.parseComponent(result.data);
                    resolve();
                }).catch((error) => {
                    reject()
                })
            }).then(()=>{
                if(this.temp){
                    console.log(this.temp)
                    let r=this.getComponentOption(this.temp)
                    console.log(r)
                    let temp=compiler.compile(r.template)  //编译成render函数
                    let styleDom=document.createElement("style");
                    let str=r.styles[0];
                    styleDom.type="text/css";
                    styleDom.appendChild(document.createTextNode(str)) 
                    document.getElementsByTagName("head")[0].appendChild(styleDom);
                    this.currentTabComponent=Vue.component('currentTabComponent',{
                        render:new Function(temp.render),
                        ...r.script
                    }) 

                    // let temp="<div @click='clickFn()' class='ac'><span class='aaa'>{{test}}</span></div>";
                    // const componentId = uuid(8, 16).toLocaleLowerCase();
                    // temp = tagToUuid(temp, componentId)
                    // let styleDom=document.createElement("style");
                    // let str=".ac[data-u-"+componentId+"] .aaa[data-u-"+componentId+"]{color:#f00}";
                    // styleDom.type="text/css";
                    // styleDom.appendChild(document.createTextNode(str)) 
                    // document.getElementsByTagName("head")[0].appendChild(styleDom);
                    // let rt=compiler.compile(temp);
                    // console.log(rt)
                    // this.currentTabComponent=Vue.component('currentTabComponent',{
                    //     render:new Function(rt.render),
                    //     data(){
                    //         return{
                    //             test:"动态组件噢噢噢噢"
                    //         }
                    //     },
                    //     methods:{
                    //         clickFn(){
                    //             console.log("事件点击了！！！")
                    //         }
                    //     },
                    // })

                }
            });

            return new Promise ((resolve, reject) => {
                axios.get('/template/event.vue').then((result) => {
                    console.log(result)
                    let r=compiler.parseComponent(result.data);
            console.log(r)
                    resolve();
                }).catch((error) => {
                    reject()
                })
            })
            
        }
    },
    watch:{
        'initParams.type':function(val){
            this.getComponent();
        }
    }
    
}