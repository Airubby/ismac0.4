<template>
    <el-dialog title='设置布局' :visible.sync="dialogInfo.visible" width="400px" v-dialogDrag :close-on-click-modal="false" :append-to-body="true">
        <el-scrollbar style="height:180px;" class="scrollbar">
            <div class="dialog-content">
                <el-form ref="ValidateForm" :model="initParams" :rules="rules" label-position="top">
                    <el-row :gutter="30">
                        <el-col :span="20">
                            <el-form-item label='类型' prop="type">
                                <el-select v-model="initParams.type" placeholder="请选择">
                                    <el-option key="one" label="单排" value="one"></el-option>
                                    <el-option key="two" label="双排" value="two"></el-option>
                                    <el-option key="auto" label="自定义" value="auto"></el-option>
                                </el-select>
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
        
    },
    mounted() {
        
    },
    data(){
        return{
            initParams:{
                type:"two",
            },
            rules: {
                
            },
        }
    },
	methods: {
        //保存的操作
        dialogSure:function(){
            this.$refs['ValidateForm'].validate((valid) => {
                if(valid){ //验证通过
                    this.$emit("backInfo",this.initParams)
                    this.dialogInfo.visible=false;
                }
            })
        },
	},
    props:["dialogInfo"]
}
</script>
