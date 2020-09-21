<template>
    <app-con>
        <el-row>
            <el-col :span="8">
                <div class="lc-data-con">
                    <span class="lc-data-title">接入设备总数</span>
                    <div class="lc-data-value"><span class="dataValue">8</span>个</div>
                </div>
            </el-col>
            <el-col :span="8">
                <div class="lc-data-con">
                    <span class="lc-data-title">告警中的设备</span>
                    <div class="lc-data-value"><span class="dataValue">8</span>个</div>
                </div>
            </el-col>
            <el-col :span="8">
                <div class="lc-data-con last-con">
                    <span class="lc-data-title">通讯不上的设备</span>
                    <div class="lc-data-value"><span class="dataValue">8</span>个</div>
                </div>
            </el-col>
        </el-row>
        <div class="color-mg20"></div>
        <div class="pd20 ">
            <div class="card_title">
                <span>动态组件切换</span>
                <div style="width:150px" class="fr">
                    <el-select v-model="initParams.type" :placeholder='$t("hint.select")'>
                        <el-option label="event组件" value="event"></el-option>
                        <el-option label="record组件" value="record"></el-option>
                    </el-select>
                </div>
            </div>
            <h4><component :is="currentTabComponent"></component></h4>
            <div>
                <component :is="currentComponent"></component>
            </div>
            <div>
                <component :is="allComponent"></component>
            </div>
        </div>
    </app-con>
</template>

<script>
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
const formatStyl = (sty, css, componentId) => {  
    debugger
    let cssText = css  
    if (sty.scoped) {    
        cssText = css.replace(/[\.\w\>\s]+{/g, $1 => {      
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
    components: {
        
    },
    created() {
        this.getComponent()
        // (
        //     function(
        //     $require,module,exports,__dirname,filename)
        //     {
        //         $[code]
        //     })
        // ($require,module,exports,__dirname,filename)
    },
    mounted() {
        
    },
    data(){
        return{
            activeName:'first',
            initParams:{
                type:"event",
            },
            table_columns:[
              { prop: 'code', label: '编号',minWidth:10},
              { prop: 'type', label: '名称',minWidth:10},
              { prop: 'indate', label: '状态',minWidth:10},
              { prop: 'timegroup', label: '所属设备',minWidth:10},
              { prop: 'handle', label: '操作',slotName:'preview-handle',width:150},
            ],
            table_data:[],
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
            debugger
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
            debugger
            return options
            // return JSON.stringify(options, (k, v) => {
            //     if(typeof(v) === 'function') {
            //         let _fn = v.toString()
            //         return /^function()/.test(_fn) ? _fn : fn.replace(/^/,'function ')
            //     }
            //     return v
            // })
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
                    let temp=compiler.compile(r.template)
                    this.currentTabComponent=Vue.component('currentTabComponent',{
                        render:r.template.content,
                        ...r.script
                    }) 
                    // let temp="<div @click='clickFn()'>{{test}}</div>";
                    // let r=compiler.compile(temp);
                    // console.log(r)
                    // this.currentTabComponent=Vue.component('currentTabComponent',{
                    //     render:new Function(r.render),
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

            let temp=``;
            
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
</script>
