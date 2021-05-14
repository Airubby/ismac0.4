<template>
    <el-dialog title='新增/编辑测点' :visible.sync="dialogInfo.visible" width="900px" v-dialogDrag :close-on-click-modal="false" :append-to-body="true">
        <el-scrollbar style="height:280px;" class="scrollbar">
            <div class="dialog-content">
                <el-form ref="ValidateForm" :model="initParams" :rules="rules" label-position="top">
                    <el-row :gutter="30">
                        <el-col :span="12">
                            <el-form-item label='名称' prop="name">
                                <el-input v-model="initParams.name"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label='引用测点' prop="name">
                                <el-input placeholder="请输入内容" v-model="initParams.name" readonly @focus="selectPoint()">
                                    <template slot="append">
                                        <div class="btn" @click="selectPoint()">选择</div>
                                    </template>
                                </el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label='统计方法' prop="name">
                                <el-select v-model="initParams.name" placeholder="请选择">
                                    <el-option key="1" label="平均值" value="1"></el-option>
                                    <el-option key="2" label="最大值" value="2"></el-option>
                                    <el-option key="3" label="偏差值" value="3"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
        </el-scrollbar>
        <dialog-btn :dialogInfo="dialogInfo" @dialogSure="dialogSure()"></dialog-btn>
        <select-point :dialogInfo="pointInfo" v-if="pointInfo.visible"></select-point>
    </el-dialog>
</template>

<script>
import SelectPoint from './SelectPoint'
export default {
    components:{SelectPoint},
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
            pointInfo:{
                visible:false
            }
        }
    },
	methods: {
        selectPoint:function(){
            this.pointInfo.visible=true;
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
