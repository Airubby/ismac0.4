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
                <h2>form表单中循环展示的验证问题及监听问题-----@submit.native.prevent解决el-input回车刷新页面</h2>
                <el-form :model="dynamicValidateForm" :rules="rules" @submit.native.prevent ref="ValidateForm" label-width="100px" class="demo-dynamic">
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
                        <el-button @click="resetForm()">重置(要给prop属性才可以重置)</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div>监听多个属性任意一个改变都去验证其它的属性问题；用computed中return多个属性，watch中this.$refs['ValidateForm'].validate();</div>
            <div>
                <h2>组件管道</h2>
                {{message | capitalize(thisVue)}}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    filters:{
        capitalize: function (value,_this) {
            if (!value) return ''
            value = value.toString()
            return value.charAt(0).toUpperCase() + value.slice(1)+"-----"+_this.filtersInfo
        }
    },
    created() {
        
    },
    mounted() {
        
    },
    computed:{
        email:function(){
            return this.dynamicValidateForm.other.domains[0].value;
        },
        changeValue:function(){
            return {
                value:this.initParams.value,
                number:this.initParams.number,
                index:this.initParams.index,
            }
        }
    },
    data(){
        return{
            //多个属性同时监听的问题；
            initParams:{
                value:"",
                number:"",
                index:"",
            },
            thisVue:this,
            message:"assasas",
            filtersInfo:"filters中获取this属性",
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
        
    },
    watch:{
        //computed 中的email函数的值变化
        email:function(val){
            this.dynamicValidateForm.other.domains[1].value=val;
        },
        //监听多个属性任意一个改变都去验证其它的属性问题；
        changeValue:function(val){
            this.$refs['ValidateForm'].validate();
        }
    },
}
</script>
