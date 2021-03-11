<template>
    <el-dialog title='测点绑定' :visible.sync="dialogInfo.visible" width="600px" v-dialogDrag :close-on-click-modal="false" :append-to-body="true">
        <el-scrollbar style="height:280px;" class="scrollbar">
            <div class="dialog-content">
                <el-form ref="ValidateForm" :model="initParams" :rules="rules" label-position="top">
                    <el-row :gutter="30">
                        <el-col :span="24">
                            <el-form-item label='路由地址' prop="pathUrl">
                                <el-select v-model="initParams.pathUrl" placeholder="请选择">
                                    <el-option :key="item.pathUrl" :label="item.name" :value="item.pathUrl" v-for="item in tempList"></el-option>
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
        this.getInfo()
    },
    mounted() {
        
    },
    data(){
        return{
            tempList:[],
            initParams:{
                pathUrl:"",
                urlName:"",
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
        changeUrl:function(val){
            this.tempList.forEach(element => {
                if(element.pathUrl==val){
                    this.initParams.urlName=element.name
                }
            });
        },
        getInfo(){
            this.$api.post("/getBigInfo",{}).then(res=>{
                console.log(res)
                if(res.err_code=="0"){
                    this.tempList=res.data;
                }
            })
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
