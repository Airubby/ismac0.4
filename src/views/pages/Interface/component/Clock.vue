<template>
    <el-dialog title='时钟同步接口' :visible.sync="dialogInfo.visible" width="600px" v-dialogDrag :close-on-click-modal="false" :append-to-body="true">
        <el-scrollbar style="height:280px;" class="scrollbar">
            <div class="dialog-content">
                <el-form ref="ValidateForm" :model="initParams" :rules="rules" label-position="top">
                    <el-row :gutter="30">
                        <el-col :span="8">
                            <el-form-item prop="name">
                                <el-radio v-model="initParams.name" label="1">NTP校时，时钟服务器:</el-radio>
                            </el-form-item>
                        </el-col>
                        <el-col :span="16">
                            <el-form-item prop="name">
                                <el-input v-model="initParams.name"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="24">
                            <el-form-item prop="name">
                                <el-radio v-model="initParams.name" label="1">LSB校时:</el-radio>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item prop="name">
                                <el-radio v-model="initParams.name" label="1">手动更改，设置为:</el-radio>
                            </el-form-item>
                        </el-col>
                        <el-col :span="16">
                            <el-form-item prop="name">
                                <el-date-picker
                                    v-model="initParams.name"
                                    type="datetime"
                                    format="yyyy-MM-dd HH:mm:ss"
                                    value-format="yyyy-MM-dd HH:mm:ss"
                                    placeholder="选择日期时间">
                                </el-date-picker>
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
    components:{},
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
<style lang="less" scoped>
.module-theme(...){
    .ifbind{
        /deep/ .el-form-item__label{
            width: 200px;
        }
    }
    .more-info{
        .btn{
            margin-left: 10px;
        }
    }
}
</style>