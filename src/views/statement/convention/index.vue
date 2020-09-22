<template>
    <div class="bgfffcontent">
        <div class="breadcrumb">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>{{$t("navbar.statement")}}</el-breadcrumb-item>
                <el-breadcrumb-item>{{$t("navbar.statementConvention")}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="public_content pd20">
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
            <h4>下拉框带树形</h4>
            <div class="selectTreeDom">
                <el-select v-model="selectValue" placeholder="请选择">
                    <el-input
                    placeholder="输入关键字进行过滤"
                    v-model="filterText" style="position:absolute;top:6px;z-index:9;margin:0 auto;">
                    </el-input>
                    <el-option :value="selectValue" :label="selectLabel" class="selectTree">
                        <el-tree show-checkbox ref="tree" node-key="id" class="filter-tree"
                        :data="treedata" 
                        :filter-node-method="filterNode"
                        :props="defaultProps" @check-change="selsetchangeTree">
                        </el-tree>
                    </el-option>
                </el-select>
            </div>
        </div>
        <loading v-if="loadingInfo.visible" :dialogInfo="loadingInfo" @backInfo="backInfo"></loading>
    </div>
</template>
<style lang="less" scoped>
    .input-file{
        width: calc(100% - 70px);
        float:left;
        margin-right: 5px;
    }
    //下拉树形全局样式
    .el-select-dropdown__item.hover, .el-select-dropdown__item:hover{
        background:#fff !important;
    }
    .el-select-dropdown__item{
        height:auto;
    }
</style>
<script>
import loading from './loading'
import axios from "axios"
export default {
    created() {
        
    },
    mounted() {
        this.$nextTick(function(){
            this.$el.querySelector(".selectTree").parentNode.style.paddingTop="40px";
        })
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
            loading:false,
            config:{
                headers:{
                    'Content-Type': 'multipart/form-data'
                }
            },
            loadingInfo:{
                visible:false,
                finished:0,
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


            filterText:"",
            selectValue:"",
            selectLabel:"",
            treedata: [{
                label: '一级 1',
                children: [{
                    label: '二级 1-1',
                    children: [{
                        label: '三级 1-1-1'
                    }]
                    }]
                }, {
                    label: '一级 2',
                    children: [{
                    label: '二级 2-1',
                    children: [{
                        label: '三级 2-1-1'
                    }]
                    }, {
                    label: '二级 2-2',
                    children: [{
                        label: '三级 2-2-1'
                    }]
                    }]
                }, {
                    label: '一级 3',
                    children: [{
                    label: '二级 3-1',
                    children: [{
                        label: '三级 3-1-1'
                    }]
                    }, {
                    label: '二级 3-2',
                    children: [{
                        label: '三级 3-2-1'
                    }]
                }]
            }],
            defaultProps: {
                children: 'children',
                label: 'label'
            },

        }
    },
	methods: {
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
            if(res.err_code=="0"){
                console.log('上传成功')
            }else{//上传失败
                this.showInfo=res.err_msg;
                this.xmlshow=true;
            }
		},
		onError(err, file, fileList){
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
			this.loadingInfo.finished=0;
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

        selsetchangeTree:function(data,node){
            console.log(data)
            console.log(node)
            let arrnode=this.$refs.tree.getCheckedNodes();
            let name=[];
            console.log(arrnode)
            for(var i=0;i<arrnode.length;i++){
                name.push(arrnode[i].label);
            }
            this.selectLabel=name.toString();
        },
        filterNode(value, data) {
            if (!value) return true;
            return data.label.indexOf(value) !== -1;
        }
    },
    watch: {
        filterText(val) {
            this.$refs.tree.filter(val);
        }
    },
    components:{loading},
}
</script>
