<template>
    <el-dialog title='创建视图' :visible.sync="dialogInfo.visible" width="900px" v-dialogDrag :close-on-click-modal="false" :append-to-body="true">
        <el-scrollbar style="height:180px;" class="scrollbar">
            <div class="dialog-content">
                <el-form ref="ValidateForm" :model="initParams" :rules="rules" label-position="top">
                    <el-row :gutter="30">
                        <el-col :span="12">
                            <el-form-item label='模板名称' prop="fileTechweb">
                                <el-input placeholder="请输入内容" v-model="initParams.fileTechweb">
                                    <i slot="suffix" class="el-input__icon el-icon-circle-close" @click="clearCRT" v-show="initParams.fileTechweb"></i>
                                    <template slot="append">
                                        <el-upload
                                            class="btn"
                                            action="https://jsonplaceholder.typicode.com/posts/"
                                            ref="upload"
                                            :on-success="onSuccess"
                                            :on-error="onError"
                                            :on-change="onChange"
                                            :before-upload="beforeUpload"
                                            :show-file-list="false"
                                            :file-list="fileList"
                                            :limit="1"
                                            name="file"
                                            accept=".json,.png"
                                            :auto-upload="false">
                                            <span slot="trigger">视图文件</span>
                                        </el-upload>
                                    </template>
                                </el-input>
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
                fileTechweb:"",
                
            },
            rules: {
                
            },
            fileList:[]
        }
    },
	methods: {
        clearCRT:function(){
            this.initParams.fileTechweb="";
            this.fileList=[];
        },
        beforeUpload:function(){

        },
        onSuccess:function(){

        },
        onError:function(){
            this.fileList=[];
        },
        onChange:function(){
            this.initParams.fileTechweb=file.name;
        },
        //保存的操作
        dialogSure:function(){
            this.$refs['form'].validate((valid) => {
                if(valid){ //验证通过
                    this.$refs.upload.submit();
                    this.$emit("backInfo")
                }
            })
        },
	},
    props:["dialogInfo"]
}
</script>
