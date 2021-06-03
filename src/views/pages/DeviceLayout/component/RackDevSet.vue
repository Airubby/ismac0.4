<template>
    <el-dialog title='设置' :visible.sync="dialogInfo.visible" width="900px" v-dialogDrag :close-on-click-modal="false" :append-to-body="true">
        <el-scrollbar style="height:250px;" class="scrollbar">
            <div class="dialog-content">
                <el-form ref="ValidateForm" :model="initParams" :rules="rules" label-position="top">
                    <el-row :gutter="30">
                        <div v-if="initParams.type=='topData'||initParams.type=='bottomData'">
                            <el-col :span="12">
                                <el-form-item label='名称' prop="name">
                                    <el-input v-model="initParams.name"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label='类型' prop="category">
                                    <el-select v-model="initParams.category" placeholder="请选择">
                                        <el-option key="air" label="空调" value="air"></el-option>
                                        <el-option key="rack" label="柜子" value="rack"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="24">
                                <el-form-item label='背景色' prop="background">
                                    <el-color-picker v-model="initParams.background" :predefine="predefineColors"></el-color-picker>
                                </el-form-item>
                            </el-col>
                        </div>
                            <el-col :span="12">
                                <el-form-item label='设备' prop="devid">
                                    <el-select v-model="initParams.devid" placeholder="请选择">
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label='测点' prop="pointid">
                                    <el-select v-model="initParams.pointid" placeholder="请选择">
                                    </el-select>
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
    props:["dialogInfo"],
    created() {
        console.log(this.dialogInfo)
        this.initParams=Object.assign(this.initParams,this.dialogInfo.item);
        this.initParams.type=this.dialogInfo.type;
        console.log(this.initParams)
    },
    mounted() {
        
    },
    data(){
        return{
            predefineColors:["#D8645B","#8CBECF","#F2B747","#588EEA","#75B899","#55A1E2"],
            initParams:{
                type:"",
                name:"",
                category:"",
                background:"",
                devid:"",
                pointid:""
            },
            rules: {
                name:[
                    { required: true, message: '非空', trigger: 'blur' },
                ],
                category:[
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
                    this.$emit("backInfo",this.initParams)
                    this.dialogInfo.visible=false;
                }
            })
        },
	},
}
</script>
