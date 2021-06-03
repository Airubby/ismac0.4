<template>
    <el-dialog title="指纹登记" :visible.sync="dialogInfo.visible" width="460px" v-dialogDrag :close-on-click-modal="false" :append-to-body="true">
        <el-scrollbar style="height:390px;" class="scrollbar">
            <div class="dialog-content">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" label-position="top">
                    <img src="/images/handle.jpg" style="width:100%;" />
                </el-form>
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
            ruleForm: {
                
            },
            rules: {
                
            },
        }
    },
	methods: {
        //保存的操作
        dialogSure:function(){
            this.$refs['ruleForm'].validate((valid) => {
                if(valid){ //验证通过
                    
                    this.$r.post('/service/update',this.ruleForm, r => {
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
	},
    props:["dialogInfo"]
}
</script>
