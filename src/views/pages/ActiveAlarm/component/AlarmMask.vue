<template>
    <el-dialog title='告警确认' :visible.sync="dialogInfo.visible" width="900px" v-dialogDrag :close-on-click-modal="false" :append-to-body="true">
        <el-scrollbar style="height:280px;" class="scrollbar">
            <div class="dialog-content">
                <el-form ref="ValidateForm" :model="initParams" :rules="rules" label-position="top">
                    <el-row :gutter="30">
                        <el-col :span="12">
                            <el-form-item label='屏蔽规则' prop="name">
                                <el-select v-model="initParams.name" placeholder="请选择">
                                    <el-option key="1" label="该事件" value="1"></el-option>
                                    <el-option key="2" label="该事件所属属性的所有事件" value="2"></el-option>
                                    <el-option key="3" label="该事件所属设备的所有事件" value="3"></el-option>
                                    <el-option key="4" label="该事件所属网关的所有事件" value="4"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label='规则描述' prop="name">
                                <el-input v-model="initParams.name"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label='屏蔽缘由' prop="name">
                                <el-select v-model="initParams.name" placeholder="请选择">
                                    <el-option key="1" label="误报警" value="1"></el-option>
                                    <el-option key="2" label="设备在维护" value="2"></el-option>
                                    <el-option key="3" label="不影响运行" value="3"></el-option>
                                    <el-option key="4" label="其它原因" value="4"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label='屏蔽时段' prop="name">
                                <el-date-picker
                                    is-range
                                    v-model="initParams.name"
                                    format="yyyy-MM-dd HH:mm:ss"
                                    value-format="yyyy-MM-dd HH:mm:ss"
                                    range-separator='~'
                                    start-placeholder='开始时间'
                                    end-placeholder='结束时间'
                                    >
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label='屏蔽处理' prop="name">
                                <el-select v-model="initParams.name" placeholder="请选择">
                                    <el-option key="1" label="不发送消息通知" value="1"></el-option>
                                    <el-option key="2" label="不转发" value="2"></el-option>
                                    <el-option key="3" label="不显示" value="3"></el-option>
                                    <el-option key="4" label="不记录入库" value="4"></el-option>
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
