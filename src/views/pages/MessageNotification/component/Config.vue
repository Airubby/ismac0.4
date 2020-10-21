<template>
    <el-dialog title='通知规则' :visible.sync="dialogInfo.visible" width="900px" v-dialogDrag :close-on-click-modal="false" :append-to-body="true">
        <el-scrollbar style="height:480px;" class="scrollbar">
            <div class="dialog-content">
                <el-form ref="ValidateForm" :model="initParams" :rules="rules" label-position="top">
                    <el-row :gutter="30">
                        <el-col :span="12">
                            <el-form-item label='等级过滤' prop="name">
                                <el-select v-model="initParams.name" placeholder="请选择">
                                    <el-option key="1" label="提示" value="1"></el-option>
                                    <el-option key="2" label="次要" value="2"></el-option>
                                    <el-option key="3" label="重要" value="3"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label='通知时段' prop="name">
                                <el-select v-model="initParams.name" placeholder="请选择">
                                    <el-option key="1" label="1" value="1"></el-option>
2                                    <el-option key="3" label="3" value="3"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label='订阅方式' prop="name">
                                <el-checkbox-group v-model="initParams.mode">
                                    <p><el-checkbox label="dx" key="dx">短信</el-checkbox></p>
                                    <p><el-checkbox label="dx" key="dx">电话</el-checkbox></p>
                                    <p><el-checkbox label="dx" key="dx">邮件</el-checkbox></p>
                                    <p><el-checkbox label="dx" key="dx">微信</el-checkbox></p>
                                    <p><el-checkbox label="dx" key="dx">钉钉</el-checkbox></p>
                                    <p><el-checkbox label="dx" key="dx">声光</el-checkbox></p>
                                </el-checkbox-group>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label='订阅用户' prop="name">
                                <el-scrollbar style="height:320px;" class="scrollbar">
                                    <el-checkbox-group v-model="initParams.mode">
                                        <p><el-checkbox label="dx" key="dx">短信</el-checkbox></p>
                                        <p><el-checkbox label="dx" key="dx">电话</el-checkbox></p>
                                        <p><el-checkbox label="dx" key="dx">邮件</el-checkbox></p>
                                        <p><el-checkbox label="dx" key="dx">微信</el-checkbox></p>
                                        <p><el-checkbox label="dx" key="dx">钉钉</el-checkbox></p>
                                        <p><el-checkbox label="dx" key="dx">声光</el-checkbox></p>
                                        <p><el-checkbox label="dx" key="dx">短信</el-checkbox></p>
                                        <p><el-checkbox label="dx" key="dx">电话</el-checkbox></p>
                                        <p><el-checkbox label="dx" key="dx">邮件</el-checkbox></p>
                                        <p><el-checkbox label="dx" key="dx">微信</el-checkbox></p>
                                        <p><el-checkbox label="dx" key="dx">钉钉</el-checkbox></p>
                                        <p><el-checkbox label="dx" key="dx">声光</el-checkbox></p>
                                        <p><el-checkbox label="dx" key="dx">短信</el-checkbox></p>
                                        <p><el-checkbox label="dx" key="dx">电话</el-checkbox></p>
                                        <p><el-checkbox label="dx" key="dx">邮件</el-checkbox></p>
                                        <p><el-checkbox label="dx" key="dx">微信</el-checkbox></p>
                                        <p><el-checkbox label="dx" key="dx">钉钉</el-checkbox></p>
                                        <p><el-checkbox label="dx" key="dx">声光</el-checkbox></p>
                                    </el-checkbox-group>
                                </el-scrollbar>
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
                mode:[]
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
