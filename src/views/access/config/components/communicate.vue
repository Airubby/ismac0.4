<template>
    <el-dialog title="通讯参数" :visible.sync="dialogInfo.visible" width="660px" v-dialogDrag>
        <el-scrollbar style="height:290px;" class="scrollbar">
            <div class="content pd20" v-loading="loading">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" label-position="top">
                    <el-row :gutter="40">
                        <el-col :span="12">
                            <el-form-item label="门禁驱动" prop="type">
                                <el-select v-model="ruleForm.timegroup" :placeholder='$t("hint.select")'>
                                    <el-option label="区域一" value="shanghai"></el-option>
                                    <el-option label="区域二" value="beijing"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="IP地址" prop="timegroup">
                                <el-input v-model="ruleForm.type" ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="端口" prop="timegroup">
                                <el-input v-model="ruleForm.type" ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="设备序列号" prop="timegroup">
                                <el-input v-model="ruleForm.type" ></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
        </el-scrollbar>
        <dialogBtnInfo v-bind:dialogInfobtn="dialogInfo" v-on:dialogSure="dialogSure()"></dialogBtnInfo>
    </el-dialog>
</template>

<script>
import dialogBtnInfo from '@/components/dialogBtnInfo.vue'
export default {
    created() {
        
    },
    mounted() {
        
    },
    data(){
        return{
            loading:false,
            ruleForm: {
                type:'',
                timegroup:'',
                range:''
            },
            rules: {
                times: [
                    { required: true, trigger: 'blur' }
                ],
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
        //取消操作
        dialogCancel:function(){
            this.dialogInfo.visible=false;
        },
        handleCheckChange:function(){
            
        }
	},
    components: {
        dialogBtnInfo
    },
    props:["dialogInfo"]
}
</script>
