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
            'config'
        ]),
    },
	methods: {
        enterPage:function(item){
            this.$store.dispatch('setCurrentConfig',item);
        },
        setComponent:function(){
            console.log("setComponent")
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
        changeRoute:function(){
            if(this.config&&this.config.length>0){
                for(let i=0;i<this.config.length;i++){
                    if(this.config[i].children&&this.config[i].children.length>0){
                        for(let j=0;j<this.config[i].children.length;j++){
                            if(this.$route.name==this.config[i].children[j].key){
                                this.enterPage(this.config[i]);
                                break;
                            }
                            if(this.config[i].children[j].relation&&this.config[i].children[j].relation.length>0){
                                for(let m=0;m<this.config[i].children[j].relation.length;m++){
                                    if(this.$route.name==this.config[i].children[j].relation[m].key){
                                        this.enterPage(this.config[i]);
                                        break;
                                    }
                                }
                            }
                        }
                    }else{
                        if(this.$route.name==this.config[i].key){
                            this.enterPage(this.config[i]);
                            break;
                        }
                    }
                }
                this.$store.dispatch('setCurrentComponent',this.$route.meta.componentName);
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
                // script: sfc.script ? $require(null, sfc.script.content) : {},    
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
                        tempData = compiler.parseComponent(result.data);
                        resolve();
                    }).catch((error) => {
                        reject()
                    })
                }).then(()=>{
                    if(tempData){
                        let r=this.getComponentOption(tempData)
                        console.log(r)
                        let temp=compiler.compile(r.template)  //编译成render函数
                        //这个地方生成编译后的dom  temp.render   注意:生成的编译文件中去掉\n;编译的源组件中不能有模板字符串`
                        this.setStyle(r.styles);
                        
                        //注册全局组件
                        Vue.component(currentComponent,{
                            render:new Function(temp.render),
                            ...r.script
                        }) 
                        //注册局部组件
                        // this.currentComponent={
                        //     render:new Function(temp.render),
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
                    () => import(`@/views/pages/${ComponentPackage}/${component}.vue`)
                )
                
                //注册局部组件 @/views  必须在这个地方写，如果传参过来会报错
                // this.$options.components["componentName"]=() => import(`@/views${_this.pathUrl}`);
                // this.currentComponent = () => import(`@/views${_this.pathUrl}`);
            }
        }
    },
    watch:{
        $route(to,from){
            this.changeRoute();
            console.log(this.$route)
        },
        config:{
            handler:function(val,oldval){
                console.log("config改变")
                this.setComponent();
            },
            deep: true, 
        },
    }
}