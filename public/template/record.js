
module.exports = {
    styles:`.bg[data-u-729ad4b9] {
        width: 60px;
        height: 60px;
      }`,
    render:`with(this){return _c('div',{attrs:{"data-u-729ad4b9":""}},[_v("    "+_s(activeName)+"    "),_c('div',{staticClass:"bg",style:('background:url('+templateUrl+'/logo.png);background-size: contain;'),attrs:{"data-u-729ad4b9":""}}),_v(" "),_c('el-table-pagination',{ref:"thisRef",attrs:{"data-u-729ad4b9":"","url":$ajaxUrl+'/getTable',"list-field":"data","total-field":"total","method":"get","params":initParams,"showPagination":true,"columns":table_columns},scopedSlots:_u([{key:"preview-handle",fn:function(scope){return [_c('span',{staticClass:"color",attrs:{"data-u-729ad4b9":""}},[_v("操作")])]}}])},[_c('el-table-column',{attrs:{"slot":"prepend","data-u-729ad4b9":"","type":"selection"},slot:"prepend"})],1)],1)}`,
    props:["templateData","templateUrl"],
    components: {
        
    },
    created() {
        
    },
    mounted() {
        
    },
    data(){
        return{
            activeName:'另一个编译后的远程组件',
            initParams:{
                code:'',
                type:'',
                user:'',
                indate:'',
                timegroup:'',
                jieru:''
            },
            table_columns:[
              { prop: 'code', label: '时间',minWidth:10},
              { prop: 'type', label: '事件',minWidth:10},
              { prop: 'timegroup', label: '位置',minWidth:10},
            ],
            table_data:[],
        }
    },
	methods: {
        
    },
    watch:{
        
    }
    
}