<template>
    <el-dialog title='确认规则' :visible.sync="dialogInfo.visible" width="900px" v-dialogDrag :close-on-click-modal="false" :append-to-body="true">
        <el-scrollbar style="height:200px;" class="scrollbar">
            <div class="dialog-content">
                <el-form :model="initParams" ref="ValidateForm" label-width="120px" label-position="top">
                    <el-row :gutter="0">
                        <el-col :span="24" class="box-margin">
                            <el-checkbox v-model="initParams.comsetting">是否自动确认(解除即确认)</el-checkbox>
                        </el-col>
                        <el-col :span="12" class="box-margin">
                            <el-col :span="11">
                                <el-select v-model="initParams.select" :disabled="initParams.comsetting">
                                    <el-option label="解除即确认" value="1"></el-option>
                                    <el-option label="延迟以下时间(秒)确认" value="2"></el-option>
                                </el-select>
                            </el-col>
                            <el-col :span="13">
                                <el-input v-model="initParams.type" :disabled="initParams.comsetting"></el-input>
                            </el-col>
                        </el-col>
                        <el-col :span="24">
                            <el-checkbox v-model="initParams.comsetting">活动事件条数超过1000，自动旧事件归档到历史库</el-checkbox>
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
        // this.getInfo()
    },
    mounted() {
        
    },
    data(){
        return{
            loading:false,
            initParams: {
                comsetting:false,
                select:"",
                type:"",
            },
        }
    },
	methods: {
        getInfo:function(){
            this.$r.post('/sys/system/query',{}, r => {
                if(r.err_code=="0"){
                    this.initParams.comsetting=r.data.autocfmevent&&r.data.autocfmevent=="true"?true:false;
                }else{
                    this.$message.warning(r.err_msg);
                }
            });
        },
        //保存的操作
        dialogSure:function(){
            this.$refs['ValidateForm'].validate((valid) => {
                if(valid){ //验证通过
                    
                    this.$r.post('/sys/system/update',{autocfmevent:this.initParams.comsetting}, r => {
                        console.log(r)
                        
                        if(r.err_code=="0"){
                            this.$message.success(r.err_msg);
                            this.dialogInfo.visible=false;
                        }else{
                            this.$message.warning(r.err_msg);
                        }
                    });
                }
            })
        },
        //取消操作
        dialogCancel:function(){
            this.dialogInfo.visible=false;
        },
        
	},
    props:["dialogInfo"]
}
</script>
<style lang="less" scoped>
    .module-theme(...){
        .box-margin{
            margin-bottom: @boxMargin;
        }
    }
</style>