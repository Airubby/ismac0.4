<template>
    <el-dialog title='通知记录' :visible.sync="dialogInfo.visible" width="900px" v-dialogDrag :close-on-click-modal="false" :append-to-body="true">
        <el-scrollbar style="height:200px;" class="scrollbar">
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
        
    },
    data(){
        return{
            loading:false,
            initParams: {
                
            },
            tableData:[
                {'a':"admin",b:"管理员",'c':"2020-3-10~2021-2-22",d:'15225252525',e:"123@qq.com",f:"正常",g:"在线",h:'WEB'}
            ],
            tableColumns:[
                { prop: 'a', label: '时间',minWidth:10},
                { prop: 'b', label: '通知方式',minWidth:10},
                { prop: 'c', label: '状态',minWidth:10},
                { prop: 'd', label: '消息内容',minWidth:40},
            ],
        }
    },
	methods: {
        //保存的操作
        dialogSure:function(){
            this.$refs['ValidateForm'].validate((valid) => {
                if(valid){ //验证通过
                    
                    this.$r.post('/sys/system/update',{autocfmevent:this.initParams.comsetting}, r => {
                        console.log(r)
                        
                        if(r.err_code=="0"){
                            this.$message.success(r.err_msg);
                            this.dialogInfo.visible=false;
                        }else{
                            this.$message.warning(r.err_msg);
                        }
                    });
                }
            })
        },
        //取消操作
        dialogCancel:function(){
            this.dialogInfo.visible=false;
        },
        
	},
    props:["dialogInfo"]
}
</script>
<style lang="less" scoped>
    .module-theme(...){
        .box-margin{
            margin-bottom: @boxMargin;
        }
    }
</style>