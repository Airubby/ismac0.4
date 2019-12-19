<template>
    <div class="bgfffcontent">
        <el-table-pagination
            :url="$ajaxUrl+'/getTable'"
            list-field="data" 
            total-field="total"
            method='get' 
            :params="initParams"
            :showPagination="true"
            :columns="table_columns" ref="thisRef">   
            <el-table-column slot="prepend" type="selection"></el-table-column>
            <template slot-scope="scope" slot="preview-handle">
                
            </template>
        </el-table-pagination>
    </div>
</template>

<script>
export default {
    created() {
        
    },
    mounted() {
        
    },
    data(){
        return{
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
        //批量删除
        moreDelete:function(row){
            let ids="";
            if(row!=undefined&&row.id!=undefined){
                ids=row.id;
            }else{
                ids=this.getIds();
            }
            console.log(ids)
            if(ids==""){
                this.$message.warning("请勾选需要操作的项");
                return;
            }
            this.$r.post("/delete",{model:{ids:ids}},r=>{
                console.log(r)
            })
        },
        //清除权限
        removePermissions:function(row){
            let ids="";
            if(row!=undefined&&row.id!=undefined){
                ids=row.id;
            }else{
                ids=this.getIds();
            }
            console.log(ids)
            if(ids==""){
                this.$message.warning("请勾选需要操作的项");
                return;
            }
            this.$r.post("/remove",{model:{ids:ids}},r=>{
                console.log(r)
            })
        },
        //时间同步
        timeSync:function(){

        },
        //初始化
        initialize:function(){

        },
        //禁用
        disable:function(){

        },
        //新建
        add:function(){
            this.$router.push({name:'accessConfigAdd'});
        },
        edit:function(row){
            this.$router.push({name:'accessConfigAdd',query:{
                params:JSON.stringify({"id":row.id})
            }});
        },
        getIds:function(){
            let arr=[];
            let allSelect=this.$refs.thisRef.allSelection;
            for(let i=0;i<allSelect.length;i++){
                arr.push(allSelect[i].id);
            }
            return arr.toString();
        },
	},
    components: {
        
    }
}
</script>
