<template>
    <div class="bgfffcontent">
        <div class="breadcrumb">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>{{$t("navbar.energy")}}</el-breadcrumb-item>
                <el-breadcrumb-item>{{$t("navbar.energyStatus")}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="public_content">
            <div class="pd20">
                <h2>form表单中循环展示的验证问题</h2>
                <el-form :model="dynamicValidateForm" :rules="rules" ref="ValidateForm" label-width="100px" class="demo-dynamic">
                    <el-form-item prop="obj.email" label="邮箱">
                        <el-input v-model="dynamicValidateForm.obj.email"></el-input>
                    </el-form-item>
                    <el-form-item
                        v-for="(item, index) in dynamicValidateForm.other.domains"
                        :label="'域名' + index"
                        :key="item.key"
                        :prop="'other.domains[' + index + '].value'"
                        >
                        <el-input v-model="item.value"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm()">提交</el-button>
                        <el-button @click="resetForm()">重置</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
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
            dynamicValidateForm: {
                other:{
                    flag:true,
                    domains: [
                        {value: ''},{value: ''}
                    ],
                },
                obj:{
                    email: ''
                }
            },
            rules:{
                'obj.email':[
                    { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                    { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
                ],
                'other.domains[1].value':[
                    {required: true, message: '域名不能为空', trigger: 'blur'}
                ],
                'other.domains[0].value':[
                    {required: true, message: '域名不能为空', trigger: 'blur'}
                ]
            }
        }
    },
	methods: {
        resetForm(formName) {
            this.$refs['ValidateForm'].resetFields();
        },
        submitForm(formName) {
            this.$refs['ValidateForm'].validate((valid) => {
            if (valid) {
                console.log(this.dynamicValidateForm)
            } else {
                console.log('error submit!!');
                return false;
            }
            });
        },
	},
    components: {
        
    }
}
</script>
