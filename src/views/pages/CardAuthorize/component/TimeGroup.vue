<template>
    <el-dialog :title="$t('access.timeGroup')" :visible.sync="dialogInfo.visible" width="900px" v-dialogDrag :close-on-click-modal="false" :append-to-body="true">
        <el-scrollbar style="height:400px;" class="scrollbar">
            <div class="dialog-content">
                <el-table-pagination
                    type="local"
                    :data="table_data"
                    @selection-change="selectChange"
                    @select-all="selectChange"
                    :showPagination="true"
                    selectId="groupid"
                    :columns="table_columns" ref="thisRef">   
                    <el-table-column slot="prepend" type="selection"></el-table-column>
                    <template slot-scope="scope" slot="preview-week">
                        {{getWeek(scope.row)}}
                    </template>
                </el-table-pagination>
            </div>
        </el-scrollbar>
        <dialog-btn :dialogInfo="dialogInfo" @dialogSure="dialogSure()"></dialog-btn>
    </el-dialog>
</template>

<script>
export default {
    created() {
        // this.getList();

    },
    mounted() {
        this.$nextTick(function(){
            if(this.dialogInfo.id){
                this.$refs.thisRef.setSelect([{groupid:this.dialogInfo.id}]);
            }
        })
    },
    data(){
        return{
            loading:false,
            initParams:{
                groupid:'',
                groupname:'',
                grouptype:'2',
            },
            table_columns:[
                { prop: 'groupname', label: this.$t("public.name"),minWidth:10},
                { prop: 'week', label: this.$t("access.weekRange"),slotName:'preview-week',minWidth:30},
                { prop: 'groupdesc', label: this.$t("public.describe"),minWidth:30},
            ],
            table_data:[],
            table_info:[],
            backSelect:{},
        }
    },
	methods: {
        getList:function(){
            this.$api.post("/access/timegroup/gettimegroup",this.initParams,r=>{
                console.log(r)
                if(r.err_code=='0'){
                    this.table_data=r.data?r.data:[];
                }else{
                    this.$message.warning(r.err_msg);
                }
            })
        },
        getWeek:function(row){
            let arr=[];
            row.monday&&arr.push(this.$t("hint.Monday"));
            row.tuesday&&arr.push(this.$t("hint.Tuesday"));
            row.wednesday&&arr.push(this.$t("hint.Wednesday"));
            row.thursday&&arr.push(this.$t("hint.Thursday"));
            row.friday&&arr.push(this.$t("hint.Friday"));
            row.saturday&&arr.push(this.$t("hint.Saturday"));
            row.sunday&&arr.push(this.$t("hint.Sunday"));
            return arr.toString();
        },
        selectChange:function(selection){
            if(selection.length>0){
                if(this.backSelect&&JSON.stringify(this.backSelect)!="{}"){
                    for(let i=0;i<selection.length;i++){
                        if(this.backSelect.groupid!=selection[i].groupid){
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
                this.$emit("backInfo",this.backSelect);
                this.dialogInfo.visible=false;   
            }else{
                this.$message.warning(this.$t('hint.nonEmpty'));
            }
        },
	},
    props:["dialogInfo"]
}
</script>
