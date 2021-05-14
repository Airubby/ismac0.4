<template>
    <el-dialog title='存储范围' :visible.sync="dialogInfo.visible" width="600px" v-dialogDrag :close-on-click-modal="false" :append-to-body="true">
        <el-scrollbar style="height:420px;" class="scrollbar">
            <div class="dialog-content">
                <el-form ref="ValidateForm" :model="initParams" :rules="rules" label-position="top">
                    <el-row :gutter="5">
                        <el-col :span="24">
                            <el-form-item prop="name">
                                <el-checkbox label="1" v-model="initParams.name">实时回写,回写周期</el-checkbox>
                                <el-col :span="18">
                                    <el-form-item prop="test">
                                        <el-input placeholder="请输入内容" v-model="initParams.test">
                                            <el-select v-model="initParams.name" slot="append" style="width:100px;" placeholder="请选择">
                                                <el-option label="秒" value="1"></el-option>
                                            </el-select>
                                        </el-input>
                                    </el-form-item>
                                </el-col>
                            </el-form-item>
                        </el-col>
                        <el-col :span="24">
                            <el-form-item prop="name">
                                <el-checkbox label="1" v-model="initParams.name">历史回写,存储时间</el-checkbox>
                                <el-col :span="18">
                                    <el-form-item prop="name">
                                        <el-input placeholder="请输入内容" v-model="initParams.name">
                                            <el-select v-model="initParams.name" slot="append" style="width:100px;" placeholder="请选择">
                                                <el-option label="小时" value="2"></el-option>
                                                <el-option label="天" value="3"></el-option>
                                            </el-select>
                                        </el-input>
                                    </el-form-item>
                                </el-col>
                            </el-form-item>
                        </el-col>
                        <el-col :span="24">
                            <el-form-item prop="name">
                                <p><el-checkbox label="1" v-model="initParams.name">归档数据</el-checkbox></p>
                                <el-col :span="18">
                                <el-form-item prop="test1">
                                    <el-input placeholder="请输入内容" v-model="initParams.test1">
                                        <el-select v-model="initParams.name" slot="append" style="width:100px;" placeholder="请选择">
                                            <el-option label="年表" value="2"></el-option>
                                        </el-select>
                                    </el-input>
                                </el-form-item>
                                <el-form-item prop="test1">
                                    <el-input placeholder="请输入内容" v-model="initParams.test1">
                                        <el-select v-model="initParams.name" slot="append" style="width:100px;" placeholder="请选择">
                                            <el-option label="月表" value="2"></el-option>
                                        </el-select>
                                    </el-input>
                                </el-form-item>
                                <el-form-item prop="test1">
                                    <el-input placeholder="请输入内容" v-model="initParams.test1">
                                        <el-select v-model="initParams.name" slot="append" style="width:100px;" placeholder="请选择">
                                            <el-option label="日表" value="2"></el-option>
                                        </el-select>
                                    </el-input>
                                </el-form-item>
                                </el-col>
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
                test:"",
                test1:""
            },
            rules: {
                test:[
                    { required: true, message: '非空', trigger: 'blur' },
                ],
                test1:[
                    { required: true, message: '非空', trigger: 'blur' },
                ]
            },
        }
    },
	methods: {
        //保存的操作
        dialogSure:function(){
            this.$refs['ValidateForm'].validate((valid) => {
                if(valid){ //验证通过
                    this.$emit("backInfo")
                }
            })
        },
	},
    props:["dialogInfo"]
}
</script>
<style lang="less" scoped>
    .module-theme(...){
        .mb{
            margin-bottom: @btnMargin;
        }
        .color{
            color:@alarmColor;
        }
    }
</style>