<template>
    <el-dialog title='安全策略设置' :visible.sync="dialogInfo.visible" width="900px" v-dialogDrag :close-on-click-modal="false" :append-to-body="true">
        <el-scrollbar style="height:280px;" class="scrollbar">
            <div class="dialog-content">
                <el-form ref="ValidateForm" :model="initParams" :rules="rules" label-position="top">
                    <el-row :gutter="30">
                        <el-col :span="24">
                            <h4 class="title">账号安全策略</h4>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label='账号登录，连续密码错误次数' prop="name">
                                <el-input v-model="initParams.name"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label='账号验证错误后，锁定时长(分钟)' prop="name">
                                <el-input v-model="initParams.name" type="password"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="24">
                            <h4 class="title">密码安全策略</h4>
                        </el-col>
                        <el-col :span="24" class="checkbox">
                            <el-checkbox v-model="initParams.name">启用密码安全策略</el-checkbox>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label='密码有效期(天)' prop="name">
                                <el-input v-model="initParams.name"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label='距离密码到期，提醒用户修改的天数' prop="name">
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
                    
                }
            })
        },
	},
    props:["dialogInfo"]
}
</script>
<style lang="less" scoped>
    .module-theme(...){
        .title{
            margin-bottom: @boxMargin;
            color: @activeColor;
        }
        .checkbox{
            margin-bottom: @itemMargin;
        }
    }
</style>
