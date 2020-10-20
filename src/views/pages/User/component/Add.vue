<template>
    <el-dialog title='新增/编辑用户' :visible.sync="dialogInfo.visible" width="900px" v-dialogDrag :close-on-click-modal="false" :append-to-body="true">
        <el-scrollbar style="height:480px;" class="scrollbar">
            <div class="dialog-content">
                <el-form ref="ValidateForm" :model="initParams" :rules="rules" label-position="top">
                    <el-row :gutter="30">
                        <el-col :span="12">
                            <el-form-item label='用户名' prop="name">
                                <el-input v-model="initParams.name"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label='密码' prop="name">
                                <el-input v-model="initParams.name" type="password"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label='确认密码' prop="name">
                                <el-input v-model="initParams.name" type="password"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label='确认密码' prop="name">
                                <el-input v-model="initParams.name" type="password"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label='角色' prop="name">
                                <el-select v-model="initParams.name" placeholder="请选择">
                                    <el-option key="1" label="管理员" value="1"></el-option>
                                    <el-option key="2" label="运维员" value="2"></el-option>
                                    <el-option key="3" label="一般人员" value="3"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label='账号有效期' prop="name">
                                <el-date-picker
                                    is-range
                                    v-model="initParams.name"
                                    format="yyyy-MM-dd HH:mm:ss"
                                    value-format="yyyy-MM-dd HH:mm:ss"
                                    range-separator='~'
                                    start-placeholder='开始时间'
                                    end-placeholder='结束时间'
                                    >
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label='登录源' prop="name">
                                <el-select v-model="initParams.name" placeholder="请选择">
                                    <el-option key="WEB" label="WEB" value="WEB"></el-option>
                                    <el-option key="APP" label="APP" value="APP"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label='手机' prop="name">
                                <el-input v-model="initParams.name"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label='邮箱' prop="name">
                                <el-input v-model="initParams.name"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label='微信' prop="name">
                                <el-input v-model="initParams.name"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label='钉钉' prop="name">
                                <el-input v-model="initParams.name"></el-input>
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
                name:"",
                
            },
            rules: {
                
            },
        }
    },
	methods: {
        //保存的操作
        dialogSure:function(){
            this.$refs['form'].validate((valid) => {
                if(valid){ //验证通过
                    this.$emit("backInfo")
                }
            })
        },
	},
    props:["dialogInfo"]
}
</script>
