<template>
    <el-dialog title='短信接口' :visible.sync="dialogInfo.visible" width="1200px" v-dialogDrag :close-on-click-modal="false" :append-to-body="true">
        <el-scrollbar style="height:480px;" class="scrollbar">
            <div class="dialog-content">
                <el-form ref="ValidateForm" :model="initParams" :rules="rules" label-position="top">
                    <div class="card_title">
                        <div class="title">基本信息</div>
                    </div>
                    <el-row :gutter="30">
                        <el-col :span="8">
                            <el-form-item label='短信装置类型' prop="name">
                                <el-select v-model="initParams.name" clearable>
                                    <el-option key="1" label="短信电话猫" value="1"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label='是否启用' prop="name">
                                <el-checkbox v-model="initParams.name">启用</el-checkbox>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label='是否批量发送' prop="name">
                                <el-checkbox v-model="initParams.name">启用</el-checkbox>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <div class="card_title">
                        <div class="title">通道配置</div>
                    </div>
                    <el-row :gutter="30">
                        <el-col :span="8">
                            <el-form-item label='短信通道' prop="name">
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
                        <el-col :span="8">
                            <el-form-item label='是否确认' prop="name">
                                <el-select v-model="initParams.name" clearable>
                                    <el-option key="1" label="是" value="1"></el-option>
                                    <el-option key="2" label="否" value="2"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label='校验按键码' prop="name">
                                <el-input v-model="initParams.name"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="24">
                            <el-form-item label='消息模板' prop="name">
                                <el-input v-model="initParams.name" type="textarea"></el-input>
                                <el-button type="text" @click="selectVar" class="select-var">选择变量</el-button>
                            </el-form-item>
                            <el-form-item  prop="name">
                                <el-checkbox v-model="initParams.name">启用余额不足提示</el-checkbox>
                            </el-form-item>
                        </el-col>
                        <el-col :span="24">
                            
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label='余额阈值(元)' prop="name">
                                <el-input v-model="initParams.name"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
        </el-scrollbar>
        <dialog-btn :dialogInfo="dialogInfo" @dialogSure="dialogSure()"></dialog-btn>
        <select-var v-if="addInfo.visible" :dialogInfo="addInfo"></select-var>
    </el-dialog>
</template>

<script>
import SelectVar from './component/SelectVar'
export default {
    components:{SelectVar},
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
            addInfo:{
                visible:false
            }
        }
    },
	methods: {
        selectVar:function(){
            this.addInfo.visible=true;
        },
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
    .select-var{
        position: absolute;
        right: 0;
        top: -30px;
    }
}
</style>