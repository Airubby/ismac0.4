<template>
    <el-dialog title='测点绑定' :visible.sync="dialogInfo.visible" width="600px" v-dialogDrag :close-on-click-modal="false" :append-to-body="true">
        <el-scrollbar style="height:280px;" class="scrollbar">
            <div class="dialog-content">
                <el-form ref="ValidateForm" :model="initParams" :rules="rules" label-position="top">
                    <el-row :gutter="30">
                        <el-col :span="24">
                            <el-form-item label='设备' prop="devid">
                                <el-select v-model="initParams.devid" placeholder="请选择" @change="changeDev">
                                    <el-option :key="item.id" :label="item.name" :value="item.id" v-for="item in dev"></el-option>
                                    <!-- <el-option key="2" label="设备2" value="2"></el-option> -->
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="24">
                            <el-form-item label='测点' prop="pointid">
                                <el-select v-model="initParams.pointid" placeholder="请选择" @change="changePoint">
                                    <el-option :key="item.id" :label="item.name" :value="item.id" v-for="item in point"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="24">
                            <el-form-item label='格式化' prop="format">
                                <el-input v-model="initParams.format"></el-input>
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
            dev:[
                {id:"1",name:"设备1"},{id:"2",name:"设备2"},{id:"3",name:"设备3"}
            ],
            point:[
                {id:"1",name:"测点1"},{id:"2",name:"测点2"},{id:"3",name:"测点3"}
            ],
            initParams:{
                devid:"",
                pointid:"",
                format:"",
                devname:"",
                pointname:""
            },
            rules: {
                devid:[
                    {required: true, message: '不能为空', trigger: 'change'}
                ],
                pointid:[
                    {required: true, message: '不能为空', trigger: 'change'}
                ],
            },
        }
    },
	methods: {
        changeDev:function(val){
            this.dev.forEach(element => {
                if(element.id==val){
                    this.initParams.devname=element.name
                }
            });
        },
        changePoint:function(val){
            this.point.forEach(element => {
                if(element.id==val){
                    this.initParams.pointname=element.name
                }
            });
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
