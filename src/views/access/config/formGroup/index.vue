<template>
    <div class="bgfffcontent">
        <h4>form表单动态配置</h4>
        <RuleForm :ruleFormOpt="ruleFormOpt" ref="ruleFormComponent">
            <!-- <el-row :gutter="20">
                <el-col :span="30">
                    <el-form-item label="自定义" prop="ruleForm.test">
                        <el-input v-model="ruleForm.test"></el-input>
                    </el-form-item>
                </el-col>
            </el-row> -->
        </RuleForm>
        <el-button type="primary" @click="submitForm('ruleForm')">配置创建</el-button>
        <el-button type="primary" @click="sForm('ruleForm')">自定义创建</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
    </div>
</template>

<script>
import {config} from './config'
import RuleForm from '@/components/Global/ruleForm/RuleForm'
export default {
    components: {
        RuleForm
    },
    created() {
        
    },
    mounted() {
        
    },
    data(){
        return{
            ...config
        }
    },
	methods: {
        submitForm(formName) {
            console.log(this.$refs["ruleFormComponent"].$refs["ruleForm"])
            this.$refs["ruleFormComponent"].$refs["ruleForm"].validate((valid) => {
            if (valid) {
                console.log(this.$refs["ruleFormComponent"].ruleForm)
                alert('submit!');
            } else {
                console.log('error submit!!');
                return false;
            }
            });
        },
        sForm:function(){
            console.log(this.ruleForm)
        },
        resetForm(formName) {
            this.$refs["ruleFormComponent"].$refs["ruleForm"].resetFields();
        }
	},
    
}
</script>
