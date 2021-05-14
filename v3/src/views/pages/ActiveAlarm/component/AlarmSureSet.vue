<template>
    <el-dialog title='告警确认' :visible.sync="dialogInfo.visible" width="900px" v-dialogDrag :close-on-click-modal="false" :append-to-body="true">
        <el-scrollbar style="height:280px;" class="scrollbar">
            <div class="dialog-content">
                <el-form ref="ValidateForm" :model="initParams" :rules="rules" label-position="top">
                    <el-row :gutter="10">
                        <el-col :span="24" class="checkbox">
                            <el-checkbox v-model="initParams.name">活动事件记录数量超过阈值后自动确认</el-checkbox>
                        </el-col>
                        <el-col :span="24">
                            <el-form-item label='事件条数' prop="name">
                                <el-col :span="8" class="checkbox">
                                    <el-input v-model="initParams.name"></el-input>
                                </el-col>
                                <el-col :span="16" class="checkbox">
                                    <span>默认为1000条</span>
                                </el-col>
                            </el-form-item>
                        </el-col>
                        <el-col :span="24" class="checkbox">
                            <el-checkbox v-model="initParams.name">告警解除后，延时一定时间即自动确认</el-checkbox>
                        </el-col>
                        <el-col :span="24">
                            <el-form-item label='延时时间' prop="name">
                                <el-col :span="8" class="checkbox">
                                    <el-input v-model="initParams.name"></el-input>
                                </el-col>
                                <el-col :span="16" class="checkbox">
                                    <span>默认为0s，即立即确认</span>
                                </el-col>
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
                name:"",
                
            },
            rules: {
                
            },
        }
    },
	methods: {
        //保存的操作
        dialogSure:function(){
            this.$refs['form'].validate((valid) => {
                if(valid){ //验证通过
                    
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
