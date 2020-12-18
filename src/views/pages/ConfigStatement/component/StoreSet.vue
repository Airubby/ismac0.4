<template>
    <el-dialog title='存储设置' :visible.sync="dialogInfo.visible" width="600px" v-dialogDrag :close-on-click-modal="false" :append-to-body="true">
        <el-scrollbar style="height:280px;" class="scrollbar">
            <div class="dialog-content">
                <el-form ref="ValidateForm" :model="initParams" :rules="rules" label-position="top">
                    <el-row :gutter="5">
                        <el-col :span="24">
                            <el-form-item label='存储类型' prop="name">
                                <el-checkbox-group v-model="initParams.name">
                                    <el-checkbox label="1">实时回写</el-checkbox>
                                    <el-checkbox label="2">报表</el-checkbox>
                                </el-checkbox-group>
                            </el-form-item>
                        </el-col>
                        <el-col :span="24">
                            <el-form-item label='存储位置' prop="name" class="height-auto">
                                <el-col :span="6" class="mb">
                                    <el-select v-model="initParams.name" placeholder="请选择">
                                        <el-option key="1" label="mysql" value="1"></el-option>
                                        <el-option key="2" label="sqlite" value="2"></el-option>
                                    </el-select>
                                </el-col>
                                <el-col :span="9" class="mb">
                                   <el-input v-model="initParams.name" placeholder="192.168.1.6"></el-input>
                                </el-col>
                                <el-col :span="9" class="mb">
                                   <el-input v-model="initParams.name" placeholder="端口"></el-input>
                                </el-col>
                                <el-col :span="6">
                                    <el-input v-model="initParams.name" placeholder="数据库"></el-input>
                                </el-col>
                                <el-col :span="9">
                                    <el-input v-model="initParams.name" placeholder="账号"></el-input>
                                </el-col>
                                <el-col :span="9">
                                    <el-input v-model="initParams.name" placeholder="密码"></el-input>
                                </el-col>
                            </el-form-item>
                        </el-col>
                        <el-col :span="24">
                            <p class="color">修改后重启生效</p>
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
        .mb{
            margin-bottom: @btnMargin;
        }
        .color{
            color:@alarmColor;
        }
        /deep/ .height-auto .el-form-item__content{
            height: auto;
        }
    }
</style>