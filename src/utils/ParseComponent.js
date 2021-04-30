import Vue from 'vue'
import axios from 'axios'
const compiler = require('vue-template-compiler')
const path = require("path")
import { v4 as uuidv4 } from 'uuid';
import { mapGetters } from 'vuex'
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
        // cssText = css.css.replace(/[\.\w\>:,@%\s]+{/g, $1 => {   
        //     if(/,/.test($1)){
        //         if (/:/.test($1)){
        //             //(?<!:):(?!:)  冒号前后没有冒号挨着的
        //             return $1.replace(/(?<!:):/g, $2 => `[data-u-${componentId}]${$2}`)    
        //         } 
        //         return $1.replace(/,|\s+{/g,$2=>`[data-u-${componentId}]${$2}`)
        //     }
        //     if (/>>>/.test($1)) return $1.replace(/\s+>>>/, `[data-u-${componentId}]`)  
        //     if (/:/.test($1)){
        //         return $1.replace(/:/, $2 => `[data-u-${componentId}]${$2}`)    
        //     } 
        //     return $1.replace(/\s+{/g, $2 => `[data-u-${componentId}]${$2}`)    
        // })  
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
    created(){
        this.setComponent();
    },
    computed:{
        ...mapGetters([
            'config','languageApi'
        ]),
    },
	methods: {
        enterPage:function(item){
            this.$store.dispatch('setCurrentConfig',item);
        },
        setComponent:function(){
            console.log(this.config)
            //key作为的路由name
            if(this.config&&this.config.length>0){
                for(let i=0;i<this.config.length;i++){
                    if(this.config[i].children&&this.config[i].children.length>0){
                        for(let m=0;m<this.config[i].children.length;m++){
                            this.getComponent(this.config[i].children[m].component);
                            if(this.config[i].children[m].relation&&this.config[i].children[m].relation.length>0){
                                for(let n=0;n<this.config[i].children[m].relation.length;n++){
                                    this.getComponent(this.config[i].children[m].component,this.config[i].children[m].relation[n].component);
                                }
                            }
                        }
                    }else{
                        this.getComponent(this.config[i].component);
                        if(this.config[i].relation&&this.config[i].relation.length>0){
                            for(let j=0;j<this.config[i].relation.length;j++){
                                this.getComponent(this.config[i].component,this.config[i].relation[j].component);
                            }
                        }
                    }
                }
                this.changeRoute();
            }
        },
        setLangApi:function(name){
            this.languageApi.forEach(filePath => {
                // console.log(filePath)
                if(filePath.split("/").indexOf(name)!=-1&&filePath.indexOf("Language")!=-1){
                    let config= require('@/views/pages/'+name+filePath.split(name)[1]);
                    this.$i18n.setLocaleMessage('zh',Object.assign(this.$i18n.getLocaleMessage('zh'),config.zhLang))
                    this.$i18n.setLocaleMessage('en',Object.assign(this.$i18n.getLocaleMessage('en'),config.enLang))
                }
                if(filePath.split("/").indexOf(name)!=-1&&filePath.indexOf("Api")!=-1){
                    let config= require('@/views/pages/'+name+filePath.split(name)[1]);
                    Vue.prototype.$Api=config.default;
                    // console.log(config,config.default)
                }
            });
        },
        changeRoute:function(){
            console.log(this.$route)
            if(this.config&&this.config.length>0&&this.$route.name){
                this.$store.dispatch('setLimits',this.$route.meta.limits);//设置功能权限
                this.$store.dispatch('setCurrentComponent',this.$route.meta.componentName);
                this.setLangApi(this.$route.meta.pathName)
                this.enterPage(this.$route.meta.config);
                // for(let i=0;i<this.config.length;i++){
                //     if(this.config[i].children&&this.config[i].children.length>0){
                //         for(let j=0;j<this.config[i].children.length;j++){
                //             if(this.$route.name==this.config[i].children[j].key){
                //                 this.enterPage(this.config[i]);
                //                 return;
                //             }
                //             if(this.config[i].children[j].relation&&this.config[i].children[j].relation.length>0){
                //                 for(let m=0;m<this.config[i].children[j].relation.length;m++){
                //                     if(this.$route.name==this.config[i].children[j].relation[m].key){
                //                         this.enterPage(this.config[i]);
                //                         return;
                //                     }
                //                 }
                //             }
                //         }
                //     }else{
                //         if(this.$route.name==this.config[i].key){
                //             this.enterPage(this.config[i]);
                //             return;
                //         }
                //     }
                // }
                
            }
            
        },
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
                let head=document.getElementsByTagName("head")[0];
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
                script: sfc.script ? eval(sfc.script.content) : {},    
                styles,    
                template  
            }  
            return options
        },
        getComponent(ComponentPackage,currentComponent,pathType){
            let _this=this;
            if(pathType=="remote"){
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
                        let temp=compiler.compile(r.template)  //编译成render函数
                        //这个地方生成编译后的dom  temp.render   注意:生成的编译文件中去掉\n;编译的源组件中不能有模板字符串`
                        this.setStyle(r.styles);
                        const res = {}
                        res.render = new Function(temp.render)
                        res.staticRenderFns = temp.staticRenderFns.map(code => {
                            return new Function(code)
                        })
                        //注册全局组件
                        Vue.component(currentComponent,{
                            ...res,
                            ...r.script
                        }) 
                        //注册局部组件
                        // this.currentComponent={
                        //     ...res,
                        //     ...r.script
                        // }
                    }
                });
            }else{
                //注册全局组件
                let component=currentComponent?currentComponent:"Index";
                let componentName=currentComponent?currentComponent:ComponentPackage
                Vue.component(
                    componentName,
                    // 这个动态导入会返回一个 `Promise` 对象。
                    () => import(/* webpackChunkName: "componentName", webpackPrefetch: true */ `@/views/pages/${ComponentPackage}/${component}.vue`)
                )
                //注册局部组件 @/views  必须在这个地方写，如果传参过来会报错
                // this.$options.components["componentName"]=() => import(`@/views${_this.pathUrl}`);
                // this.currentComponent = () => import(`@/views${_this.pathUrl}`);
            }
        }
    },
    watch:{
        $route(to,from){
            console.log("change!!!!!!!!!!!!!!!")
            this.changeRoute();
        },
        config:{
            handler:function(val,oldval){
                this.setComponent();
            },
            deep: true, 
        },
    }
}