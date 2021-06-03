<template>
    <el-dialog :title="$t('public.user')" :visible.sync="dialogInfo.visible" width="900px" v-dialogDrag :close-on-click-modal="false" :append-to-body="true">
        <el-scrollbar style="height:400px;" class="scrollbar">
            <div class="dialog-content">
                <el-table-pagination
                    :url="$ajaxUrl+'/sys/user/query'"
                    list-field="data.items" 
                    total-field="data.count"
                    method='post' 
                    @selection-change="selectChange"
                    :showPagination="true"
                    :columns="table_columns" ref="thisRef">   
                    <el-table-column slot="prepend" type="selection"></el-table-column>
                </el-table-pagination>
            </div>
        </el-scrollbar>
        <dialog-btn :dialogInfo="dialogInfo" @dialogSure="dialogSure()"></dialog-btn>
    </el-dialog>
</template>

<script>
export default {
    created() {
        
    },
    mounted() {
         this.$nextTick(function(){
            this.$refs.thisRef.setSelect([{id:this.dialogInfo.id}])
        })
        
    },
    data(){
        return{
            loading:false,
            initParams:{
                id:""
            },
            table_columns:[
                { prop: 'userid', label: this.$t("system.username"),minWidth:10},
                { prop: 'name', label: this.$t("system.name"),minWidth:10},
                { prop: 'phone', label: this.$t("public.phone"),minWidth:10},
                { prop: 'email', label: this.$t("public.email"),minWidth:10},
                { prop: 'wechat', label: this.$t("public.wecat"),minWidth:10},
                { prop: 'nail', label: this.$t("public.nail"),minWidth:10},
            ],
            table_info:[],
            backSelect:{},
        }
    },
	methods: {
        selectChange:function(selection){
            if(selection.length>0){
                if(this.backSelect&&JSON.stringify(this.backSelect)!="{}"){
                    for(let i=0;i<selection.length;i++){
                        if(this.backSelect.id!=selection[i].id){
                            this.$refs.thisRef.clearSelect();
                            this.$refs.thisRef.setRowSelection(selection[i],true)
                            this.backSelect=selection[i];
                        }
                    }
                }else{
                    this.backSelect=selection[0];
                }
                
            }else{
                this.backSelect={};
            }
        },
        //保存的操作
        dialogSure:function(){
            if(this.backSelect&&JSON.stringify(this.backSelect)!="{}"){
                let obj={
                    id:this.backSelect.id,
                    userid:this.backSelect.userid,
                    username:this.backSelect.name
                }
                this.$emit("backInfo",obj);
                this.dialogInfo.visible=false;   
            }else{
                this.$message.warning(this.$t('hint.nonEmpty'));
            }
        },
	},
    props:["dialogInfo"]
}
</script>
