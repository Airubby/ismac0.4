<template>
    <el-dialog title='测点绑定' :visible.sync="dialogInfo.visible" width="600px" v-dialogDrag :close-on-click-modal="false" :append-to-body="true">
        <el-scrollbar style="height:280px;" class="scrollbar">
            <div class="dialog-content">
                <el-form ref="ValidateForm" :model="initParams" :rules="rules" label-position="top">
                    <el-row :gutter="30">
                        <el-col :span="24">
                            <el-form-item label='路由地址' prop="devid">
                                <el-select v-model="initParams.devid" placeholder="请选择">
                                    <el-option key="1" label="配电系统" value="1"></el-option>
                                    <el-option key="2" label="空调系统" value="2"></el-option>
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
    created() {
        
    },
    mounted() {
        
    },
    data(){
        return{
            initParams:{
                devid:"",
                pointid:"",
                format:"",
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
