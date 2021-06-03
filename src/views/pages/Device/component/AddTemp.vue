<template>
    <el-dialog title='新增/编辑模板' :visible.sync="dialogInfo.visible" width="900px" v-dialogDrag :close-on-click-modal="false" :append-to-body="true">
        <el-scrollbar style="height:380px;" class="scrollbar">
            <div class="dialog-content">
                <el-form ref="ValidateForm" :model="initParams" :rules="rules" label-position="top">
                    <el-row :gutter="30">
                        <el-col :span="12">
                            <el-form-item label='模板名称' prop="name">
                                <el-input v-model="initParams.name"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label='类别' prop="name">
                                <el-select v-model="initParams.name" placeholder="请选择">
                                    <el-option key="1" label="类别1" value="1"></el-option>
                                    <el-option key="2" label="类别2" value="2"></el-option>
                                    <el-option key="3" label="类别3" value="3"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label='厂商/型号' prop="name">
                                <el-row :gutter="0">
                                    <el-col :span="12">
                                        <el-select v-model="initParams.name" placeholder="请选择">
                                            <el-option key="1" label="类别1" value="1"></el-option>
                                            <el-option key="2" label="类别2" value="2"></el-option>
                                            <el-option key="3" label="类别3" value="3"></el-option>
                                        </el-select>
                                    </el-col>
                                    <el-col :span="12">
                                        <el-input v-model="initParams.name"></el-input>
                                    </el-col>
                                </el-row>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label='版本/描述' prop="name">
                                <el-row :gutter="0">
                                    <el-col :span="12">
                                        <el-select v-model="initParams.name" placeholder="请选择">
                                            <el-option key="1" label="类别1" value="1"></el-option>
                                            <el-option key="2" label="类别2" value="2"></el-option>
                                            <el-option key="3" label="类别3" value="3"></el-option>
                                        </el-select>
                                    </el-col>
                                    <el-col :span="12">
                                        <el-input v-model="initParams.name"></el-input>
                                    </el-col>
                                </el-row>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label='驱动协议' prop="name">
                                <el-select v-model="initParams.name" placeholder="请选择">
                                    <el-option key="1" label="modubs" value="1"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label='通道参数' prop="name">
                                <el-input v-model="initParams.name" readonly></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label='版本' prop="name">
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
