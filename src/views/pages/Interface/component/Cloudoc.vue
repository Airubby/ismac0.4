<template>
    <el-dialog title='云盒设置' :visible.sync="dialogInfo.visible" width="1200px" v-dialogDrag :close-on-click-modal="false" :append-to-body="true">
        <el-scrollbar style="height:480px;" class="scrollbar">
            <div class="dialog-content">
                <el-form ref="ValidateForm" :model="initParams" :rules="rules" label-position="top">
                    <div class="card_title">
                        <div class="title">基本信息</div>
                    </div>
                    <el-row :gutter="30">
                        <el-col :span="8">
                            <el-form-item label='是否启用' prop="name">
                                <el-checkbox v-model="initParams.name">启用</el-checkbox>
                            </el-form-item>
                        </el-col>
                        <el-col :span="16">
                            <el-form-item label='是否批量发送' prop="name">
                                <el-checkbox v-model="initParams.name">启用</el-checkbox>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label='发送方式' prop="type">
                                <el-select v-model="initParams.type" clearable>
                                    <el-option key="1" label="HTTP" value="1"></el-option>
                                    <el-option key="2" label="串口" value="2"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label='等待时间(秒)' prop="name">
                                <el-input v-model="initParams.name"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8" v-if="initParams.type=='1'">
                            <el-form-item label='URL' prop="name">
                                <el-input v-model="initParams.name"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <div v-if="initParams.type=='2'">
                    <div class="card_title">
                        <div class="title">通道配置</div>
                    </div>
                    <el-row :gutter="30">
                        <el-col :span="8">
                            <el-form-item label='串口名称' prop="name">
                                <el-input v-model="initParams.name"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label='波特率' prop="name">
                                <el-select v-model="initParams.name" clearable>
                                    <el-option key="1" label="9600" value="1"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label='数据位' prop="name">
                                <el-select v-model="initParams.name" clearable>
                                    <el-option key="1" label="8" value="1"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label='停止位' prop="name">
                                <el-select v-model="initParams.name" clearable>
                                    <el-option key="1" label="1" value="1"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label='校验位' prop="name">
                                <el-select v-model="initParams.name" clearable>
                                    <el-option key="1" label="无" value="1"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    </div>
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
                type:""
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
    
}
</style>