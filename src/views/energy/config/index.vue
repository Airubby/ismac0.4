<template>
    <div class="bgfffcontent">
        <div class="breadcrumb">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>{{$t("navbar.energy")}}</el-breadcrumb-item>
                <el-breadcrumb-item>{{$t("navbar.energyConfig")}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="public_content">
            <div class="wrapper">
                <div class="content">
                    <div>正则表达式中的括号即可用于分组，同时也用于定义子模式串;$n(n为数字)来依次引用模式串中用括号定义的字串。</div>
                   <div>原手机号：{{phone}}</div>
                   <div>展示手机号：{{phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')}}</div>
                   <div>
                       阻止默认行为：@click.prevent；阻止事件冒泡：@click.stop；绑定原生事件：@keyup.native
                   </div>
                   <el-upload
                        class="avatar-uploader"
                        action="https://jsonplaceholder.typicode.com/posts/"
                        ref="upload"
                        :data="{cmd:'crt'}"
                        :on-success="onSuccess"
                        :on-error="onError"
                        :on-change="onchange"
                        :before-upload="beforeUpload"
                        :show-file-list="false"
                        :file-list="fileList"
                        :auto-upload="false"
                        list-type="picture-card">
                        <div @click.stop="handleRemove" v-if="imageUrl" class="upload-show">
                            <i class="el-icon-delete upload-delete"></i>
                            <img :src="imageUrl" class="avatar" style="width:100%;height:100%;">
                        </div>
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                    <el-form :model="initParams" :rules="rules" ref="ValidateForm" class="form-serarch" label-position="top">
                        <h4>一次性多文件上传</h4>
                        <el-row :gutter="10">
                            <el-col :md="12" :lg="12">
                                <el-form-item label='CRT' prop="fileCRT">
                                    <span class="input-file">
                                        <el-input v-model="initParams.fileCRT">
                                            <i slot="suffix" class="el-input__icon el-icon-circle-close" @click="clearCRT" v-show="initParams.fileCRT"></i>
                                        </el-input>
                                    </span>
                                    <el-upload
                                        class="avatar-uploader"
                                        :action="$ajaxUrl+'/uploadssl'"
                                        ref="crtupload"
                                        :data="{cmd:'crt'}"
                                        :on-success="onSuccess"
                                        :on-error="onError"
                                        :on-change="crtonchange"
                                        :before-upload="beforeUpload"
                                        :show-file-list="false"
                                        :file-list="crtList"
                                        :limit="1"
                                        name="crtfile"
                                        :auto-upload="false">
                                        <el-button slot="trigger" type="primary">选择</el-button>
                                        <div slot="tip" class="el-upload__tip" v-show="fileshow" style="color:#f56c6c;text-align:right;margin-top:0;line-height:14px;">{{showInfo}}</div>
                                    </el-upload>
                                </el-form-item>
                            </el-col>
                            <el-col :md="12" :lg="12">
                                <el-form-item label='KEY' prop="fileKEY">
                                    <span class="input-file">
                                        <el-input v-model="initParams.fileKEY">
                                            <i slot="suffix" class="el-input__icon el-icon-circle-close" @click="clearKEY" v-show="initParams.fileKEY"></i>
                                        </el-input>
                                    </span>
                                    <el-upload
                                        class="avatar-uploader"
                                        :action="$ajaxUrl+'/uploadssl'"
                                        ref="keyupload"
                                        :on-success="onSuccess"
                                        :on-error="onError"
                                        :on-change="keyonchange"
                                        :before-upload="beforeUpload"
                                        :show-file-list="false"
                                        :file-list="keyList"
                                        :limit="1"
                                        name="keyfile"
                                        accept=".key,.png"
                                        :auto-upload="false">
                                        <el-button slot="trigger" type="primary">选择</el-button>
                                    </el-upload>
                                </el-form-item>
                            </el-col>
                            <el-col :md="12" :lg="12">
                                <el-form-item>
                                    <el-button type="primary" @click="dialogSure">多文件上传</el-button>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form>
                </div>
            </div>
        </div>
        <loading v-if="loadingInfo.visible" :dialogInfo="loadingInfo" @backInfo="backInfo"></loading>
    </div>
</template>
<style lang="less" scoped>
	.upload-show{
		width:100%;
		height:100%;
		position:relative;
		.upload-delete{
			position:absolute;
			top:50%;
			left:50%;
			margin-left:-14px;
			margin-top:-14px;
			font-size: 28px;
			display: none;
		}
		&:hover{
			.upload-delete{
				display: block;
			}
		}
	}
    //
    .input-file{
        width: calc(100% - 70px);
        float:left;
        margin-right: 5px;
    }
</style>
<script>
import loading from '@/components/UploadLoading'
export default {
    created() {
        //括号即可用于分组，同时也用于定义子模式串;$n(n为数字)来依次引用模式串中用括号定义的字串。
        this.newphone=this.phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
    },
    mounted() {
        
    },
    data(){
        let fileValidator=(rules,value,callback)=>{
            if(value==""){
                callback(new Error("非空"));
            }else{
                var fileArry=value.split(".");
                var fileType=fileArry[fileArry.length-1];
                if(fileType=="crt"||fileType=="CRT"){
                    callback();
                }else{
                    callback(new Error("只能上传crt文件"));
                }
            }
            
        }
        return{
            phone:"15228883615",
            newphone:"",
            imageUrl:'',
            fileList:[],
            //多上传
            loadingInfo:{
                visible:false,
                finished:"",
                message:"",
            },
            initParams: {
                fileCRT:'',
                fileKEY:''
            },
            fileshow:false,
            showInfo:"",
            rules: {
                fileCRT: [
                    { required: true, trigger: 'change',validator:fileValidator }
                ],
                fileKEY: [
                    { required: true, message: "非空", trigger: 'change' }
                ],
            },
            fileList:[],
            crtList:[],
            keyList:[],

        }
    },
	methods: {
        handleRemove(file, fileList) {
            console.log(file, fileList);
            this.imageUrl="";
        },
		onchange(file,fileList){
			console.log(file)
			console.log(fileList)
			var fileArry=file.name.split(".");
			var fileType=fileArry[fileArry.length-1];
			if(fileType=="jpg"||fileType=="png"||fileType=="PNG"||fileType=="JPG"){
				this.imageUrl=file.url;
				console.log(this.fileList)
				// this.$refs.upload.submit();
			}else{
				this.fileList=[];
				this.showInfo="只能上传jpg/png文件";
			}
		},
        //一下是多上传
        //保存的操作
        dialogSure:function(){
            this.$refs['ValidateForm'].validate((valid) => {
                if(valid){ //验证通过
                    this.loadingInfo.visible=true;
                    let formData=new FormData();
                    for(let i=0;i<this.fileList.length;i++){
                        formData.append(this.fileList[i].name,this.fileList[i].file)
                    }
                    this.$api.post(this.$ajaxUrl+'/uploadssl',formData).then(res=>{
                        console.log(res)
                        if(res.code==200){
                            this.loadingInfo.finished=1;
                        }else{
                            this.loadingInfo.finished=2;
                        }
                        this.loadingInfo.message=res.err_msg;
                    })
                    // axios.post(this.$ajaxUrl+'/uploadssl',formData).then((res)=>{
                    //     console.log(res)
                    //     if(res.err_code=="0"){
                    //         this.loadingInfo.finished=1;
                    //         this.loadingInfo.message=res.err_msg;
                    //     }else{
                    //         this.loadingInfo.finished=2;
                    //         this.loadingInfo.message=res.err_msg;
                    //     }
                    // })
                    // this.$refs.crtupload.submit();
                    // this.$refs.keyupload.submit();
                }
            })
        },
        backInfo:function(){
            if(this.loadingInfo.finished===1){
                this.$message.success(this.loadingInfo.message);
                // this.$message.success(this.$t("sys/success"));
            }else{
                this.$message.warning(this.loadingInfo.message);
                // this.$message.warning(this.$t("sys/fail"));
            }
        },
        onSuccess(res, file, fileList){
            this.fileList=[];
            if(res.err_code=="0"){
                console.log('上传成功')
                this.loadingInfo.finished=true;
            }else{//上传失败
                this.showInfo=res.err_msg;
                this.xmlshow=true;
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
        keyonchange(file,fileList){
            if(file&&fileList.length>0){
                this.initParams.fileKEY=file.name;
                this.handleChange(file,"keyfile");
            }
        },
        crtonchange(file,fileList){
            if(file&&fileList.length>0){
                this.initParams.fileCRT=file.name;
                this.handleChange(file,"crtfile");
            }
        },
        handleChange(file,name){
            let obj={
                file:file.raw,
                name:name
            }
            let flag=true;
            for(let i=0;i<this.fileList.length;i++){
                if(this.fileList[i].name==name){
                    this.fileList.splice(i,1,obj);
                    flag=false;
                }
            }
            if(flag){
                this.fileList.push(obj);
            }
        },
		beforeUpload(file){
            this.loadingInfo.visible=true;
        },
        clearCRT:function(){
            this.initParams.fileCRT="";
            this.crtList=[];
        },
        clearKEY:function(){
            this.initParams.fileKEY="";
            this.keyList=[];
        },

	},
    components: {
        
    }
}
</script>
