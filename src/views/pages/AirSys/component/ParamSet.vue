<template>
    <el-dialog title='参数设置' :visible.sync="dialogInfo.visible" width="600px" v-dialogDrag :close-on-click-modal="false" :append-to-body="true">
        <el-scrollbar style="height:200px;" class="scrollbar">
            <div class="dialog-content">
                <el-form ref="ValidateForm" :model="initParams" :rules="rules" label-position="top">
                    <el-row :gutter="10">
                        <el-col :span="12">
                            <el-form-item label='值设置' prop="value">
                                <el-input v-model="initParams.value"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
        </el-scrollbar>
        <dialog-btn :dialogInfo="dialogInfo" @dialogSure="dialogSure()"></dialog-btn>
    </el-dialog>
</template>

<script>
export default {
    created() {
        if(JSON.stringify(this.dialogInfo.data)!="{}"){
            this.initParams.value=this.dialogInfo.data.value;
        }
    },
    mounted() {
        
    },
    data(){
        return{
            initParams:{
                value:"",
            },
            rules: {
                value:[

                ]
            },
        }
    },
	methods: {
        //保存的操作
        dialogSure:function(){
            this.$refs['ValidateForm'].validate((valid) => {
                if(valid){ //验证通过
                    this.$emit("backInfo");
                    this.dialogInfo.visible=false;
                }
            })
        },
	},
    props:["dialogInfo"]
}
</script>
<style lang="less" scoped>
    .module-theme(...){
        
    }
</style>
