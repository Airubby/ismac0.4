<template>
    <el-dialog title="通道信息" :visible.sync="dialogInfo.visible" width="600px" v-dialogDrag :close-on-click-modal="false" :append-to-body="true">
        <el-scrollbar style="height:400px;" class="scrollbar">
            <div class="dialog-content">
                <el-form :model="initParams" class="overhidden" :rules="rules" ref="ValidateForm" label-width="120px" label-position="top">
                    <el-row :gutter="100">
                        <el-col :span="24">
                            <el-form-item :label="$t('public.name')" prop="name">
                                <el-input v-model="initParams.name"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="24">
                            <el-form-item :label="$t('video.comNum')" prop="channel">
                                <el-input v-model="initParams.channel"></el-input>
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
        if(this.dialogInfo.row){
            this.hint="edit"
            this.initParams=JSON.parse(JSON.stringify(this.dialogInfo.row));
        }
    },
    mounted() {
        
    },
    data(){
        return{
            hint:'newAdd',
            loading:false,
            initParams: {
                name:'', 
                channel:'',
            },
            rules:{
                name:[{required:true,trigger:'change',message:this.$t('hint.nonEmpty')}],
                channel:[{required:true,trigger:'change',message:this.$t('hint.nonEmpty')}],
            }
        }
    },
	methods: {
        //保存的操作
        dialogSure:function(){
            this.$refs['ValidateForm'].validate((valid) => {
                if(valid){ //验证通过
                    if(this.dialogInfo.row){
                        this.dialogInfo.row=Object.assign(this.dialogInfo.row,this.initParams);
                    }else{
                        this.$emit("backInfo",this.initParams);
                    }
                    this.dialogInfo.visible=false;
                }
            })
        },
        
	},
    props:["dialogInfo"]
}
</script>
