<template>
    <el-dialog title='选择动作' :visible.sync="dialogInfo.visible" width="900px" v-dialogDrag :close-on-click-modal="false" :append-to-body="true">
        <el-scrollbar style="height:460px;" class="scrollbar">
            <div class="dialog-content">
                <el-table-pagination
                    :url="$ajaxUrl+'/getTable'"
                    list-field="data" 
                    total-field="total"
                    type="local"
                    :data="tableData"
                    method='get' 
                    :params="initParams"
                    :columns="tableColumns" ref="thisRef">   
                    <el-table-column slot="prepend" type="selection"></el-table-column>
                    <template v-slot:preview-f="scope">
                        <span :class="['table-item',scope.row.g=='1'?'table-item-normal':'table-item-alarm']"></span>{{scope.row.g=="1"?"运行中":"关闭"}}
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
        
    },
    mounted() {
        console.log(this.dialogInfo.data)
        this.$nextTick(()=>{
            this.$refs.thisRef.setSelect(this.dialogInfo.data);
        })
        
    },
    data(){
        return{
            initParams:{
                name:"",
            },
            tableData:[
                {id:"1",'a':"admin",b:"管理员",'c':"2020-3-10~2021-2-22",d:'15225252525',e:"123@qq.com",f:"1",g:"2",h:'WEB'},
                {id:"2",'a':"admin",b:"管理员",'c':"2020-3-10~2021-2-22",d:'15225252525',e:"123@qq.com",f:"0",g:"1",h:'WEB'}
            ],
            tableColumns:[
                { prop: 'a', label: '名称',minWidth:10},
                { prop: 'e', label: '动作类型',slotName:'preview-f',minWidth:10},
            ],
        }
    },
	methods: {
        //保存的操作
        dialogSure:function(){
            let select=this.$refs.thisRef.getSelect();
            this.$emit("backInfo",select)
            this.dialogInfo.visible=false;
        },
	},
    props:["dialogInfo"]
}
</script>
