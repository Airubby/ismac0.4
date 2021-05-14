<template>
    <el-dialog title='图片设置' :visible.sync="dialogInfo.visible" width="900px" v-dialogDrag :close-on-click-modal="false" :append-to-body="true">
        <el-scrollbar style="height:480px;" class="scrollbar">
            <div class="dialog-content">
                <el-tabs v-model="activeName">
                    <el-tab-pane label="图片库" name="first">
                        <div class="imglist">
                            <span :key="index" v-for="(item,index) in devlist" @click="selectImg(item,index)" :class="{'active':itemIndex==index}">
                                <img :src="item.imgsrc" :title="item.name" />
                            </span>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="自定义上传" name="second">
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
                    </el-tab-pane>
                </el-tabs>
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
            activeName:"first",
            itemIndex:"-1",
            imgsrc:"",
            imageUrl:"",
            fileList:[],
            loadingInfo:{
                visible:false,
                finished:"",
                message:"",
            },
            devlist:[
                {
                    name:'烟感',offsetX:"",devInfo:[],offsetY:"",devid:[],pointid:[],
                    imgsrc:"/images/device/smoke.png",imgsrcAlarm:"/images/device/smoke-alarm.png"
                },
                {
                    name:'漏水',offsetX:"",devInfo:[],offsetY:"",devid:[],pointid:[],
                    imgsrc:"/images/device/thalposis.png",imgsrcAlarm:"/images/device/thalposis-alarm.png"
                },
                {
                    name:'视频',offsetX:"",devInfo:[],offsetY:"",devid:[],pointid:[],video:{},type:"video",
                    imgsrc:"/images/device/webcam.png",imgsrcAlarm:"/images/device/webcam-alarm.png"
                },
            ],
        }
    },
	methods: {
        selectImg:function(item,index){
            this.imgsrc=item.imgsrc;
            this.itemIndex=index;
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
        beforeUpload(file){
            this.loadingInfo.visible=true;
        },
        //保存的操作
        dialogSure:function(){
            this.$emit("backInfo",{imgsrc:this.imgsrc})
            this.dialogInfo.visible=false;
        },
	},
    props:["dialogInfo"]
}
</script>
<style lang="less" scoped>
.module-theme(...){
    .imglist{
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        span{
            height: 60px;
            display: flex;
            align-items: center;
            margin: 0 5px;
            padding: 5px;
            border: 1px solid transparent;
            cursor: pointer;
            &.active{
                border-color: @activeColor;
            }
        }
        img{
            max-height: 50px;
        }
    }
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
}
</style>