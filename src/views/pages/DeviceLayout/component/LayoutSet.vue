<template>
    <el-dialog title='设置布局' :visible.sync="dialogInfo.visible" width="400px" v-dialogDrag :close-on-click-modal="false" :append-to-body="true">
        <el-scrollbar style="height:280px;" class="scrollbar">
            <div class="dialog-content">
                <el-form ref="ValidateForm" :model="initParams" :rules="rules" label-position="top">
                    <el-row :gutter="30">
                        <el-col :span="20">
                            <el-form-item label='名称' prop="name">
                                <el-input v-model="initParams.name"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="20">
                            <el-form-item label='类型' prop="type">
                                <el-select v-model="initParams.type" placeholder="请选择">
                                    <el-option key="one" label="单排" value="one"></el-option>
                                    <el-option key="two" label="双排" value="two"></el-option>
                                    <el-option key="auto" label="自定义" value="auto"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="20" v-if="initParams.type=='auto'">
                            <el-form-item label='背景' prop="background">
                                <span class="input-file">
                                    <el-input v-model="initParams.background">
                                        <i slot="suffix" class="el-input__icon el-icon-circle-close" @click="clearFile" v-show="initParams.background"></i>
                                    </el-input>
                                </span>
                                <el-upload
                                    class="avatar-uploader"
                                    :action="$ajaxUrl+'/uploadssl'"
                                    ref="upload"
                                    :on-success="onSuccess"
                                    :on-error="onError"
                                    :on-change="onchange"
                                    :before-upload="beforeUpload"
                                    :show-file-list="false"
                                    :file-list="fileList"
                                    :limit="1"
                                    name="file"
                                    :auto-upload="false">
                                    <el-button slot="trigger" type="primary">选择</el-button>
                                </el-upload>
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
                type:"two",
                background:""
            },
            rules: {
                
            },
            fileList:[],
            loadingInfo:{
                visible:false,
                finished:"",
                message:"",
            },
        }
    },
	methods: {
        onSuccess(res, file, fileList){
            this.fileList=[];
            if(res.err_code=="0"){
                console.log('上传成功')
                this.loadingInfo.finished=true;
            }else{//上传失败
                this.loadingInfo.finished=false;
            }
			this.loadingInfo.message=res.err_msg
		},
		onError(err, file, fileList){
            this.fileList=[];
            console.log(err,file,fileList)
            this.loadingInfo.message=err.err_msg
			// this.$message.warning(err);
        },
        onchange(file,fileList){
            console.log(file)
            console.log(fileList)
            if(file&&fileList.length>0){
                this.initParams.background=file.name;
                this.$refs.upload.submit();
            }
        },
        beforeUpload(file){
            this.loadingInfo.visible=true;
        },
        clearFile:function(){
            this.initParams.background="";
            this.fileList=[];
        },
        //保存的操作
        dialogSure:function(){
            this.$refs['ValidateForm'].validate((valid) => {
                if(valid){ //验证通过
                    this.$emit("backInfo",this.initParams)
                    this.dialogInfo.visible=false;
                }
            })
        },
	},
    props:["dialogInfo"]
}
</script>
<style lang="less" scoped>
    .input-file{
        width: calc(100% - 70px);
        float:left;
        margin-right: 5px;
    }
</style>