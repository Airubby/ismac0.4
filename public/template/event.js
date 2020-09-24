
module.exports = {
    styles:`.bgfffcontent .item[data-u-7fa88378] {
        color: #09c;
      }
      .item1[data-u-7fa88378] {
        color: #09c;
      }`,
    render:`with(this){return _c('div',{staticClass:"bgfffcontent",attrs:{"data-u-7fa88378":""}},[_c('h4',{staticClass:"item",attrs:{"data-u-7fa88378":""}},[_v(_s(initParams))]),_v(" "),_c('span',{staticClass:"item1",attrs:{"data-u-7fa88378":""}},[_v("父组件传来的值:"+_s(templateData.type))]),_v(" "),_c('img',{staticStyle:{"width":"54px"},attrs:{"data-u-7fa88378":"","src":templateUrl+'/logo.png'}})])}`,
    props:["templateData","templateUrl"],
    components: {
        
    },
    created() {
        
    },
    mounted() {
        
    },
    data(){
        return{
            initParams:"这个是编译后的远程组件展示",
        }
    },
	methods: {
        
    },
    watch:{
        
    }
    
}