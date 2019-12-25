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
                </div>
            </div>
        </div>
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
	
</style>
<script>
export default {
    created() {
        //括号即可用于分组，同时也用于定义子模式串;$n(n为数字)来依次引用模式串中用括号定义的字串。
        this.newphone=this.phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
    },
    mounted() {
        
    },
    data(){
        return{
            phone:"15228883615",
            newphone:"",
            imageUrl:'',
			fileList:[],
        }
    },
	methods: {
        handleRemove(file, fileList) {
            console.log(file, fileList);
            this.imageUrl="";
        },
        onSuccess(res, file, fileList){
			this.fileList=[];
			console.log(res,file,fileList)
			
			if(res.err_code=="0"){
				console.log('上传成功')
			}else{//上传失败
				this.showInfo=res.err_msg;
			}
			
		},
		onError(err, file, fileList){
			this.fileList=[];
			console.log(err,file,fileList)
			this.$message.warning(err);
			
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
		beforeUpload(file){
			
		}
	},
    components: {
        
    }
}
</script>
