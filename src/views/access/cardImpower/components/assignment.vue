<template>
    <el-dialog title="权限分配" :visible.sync="dialogInfo.visible" width="460px" v-dialogDrag>
        <el-scrollbar style="height:290px;" class="scrollbar">
            <div class="content pd20" v-loading="loading">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" label-position="top">
                    <el-form-item label="权限类型" prop="type">
                        <el-select v-model="ruleForm.timegroup" :placeholder='$t("hint.select")'>
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="时间组" prop="timegroup">
                        <el-select v-model="ruleForm.timegroup" :placeholder='$t("hint.select")'>
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="开门范围" prop="range">
                        <el-tree
                        props="{
                            label: 'name',
                            children: 'children'
                        }"
                        :data="data"
                        node-key="id"
                        show-checkbox
                        @check-change="handleCheckChange">
                        </el-tree>
                    </el-form-item>
                </el-form>
            </div>
        </el-scrollbar>
        <dialogBtnInfo v-bind:dialogInfobtn="dialogInfo" v-on:dialogSure="dialogSure()"></dialogBtnInfo>
    </el-dialog>
</template>

<script>
import dialogBtnInfo from '@/components/dialogBtnInfo.vue'
export default {
    created() {
        
    },
    mounted() {
        
    },
    data(){
        return{
            loading:false,
            ruleForm: {
                type:'',
                timegroup:'',
                range:''
            },
            rules: {
                times: [
                    { required: true, trigger: 'blur' }
                ],
            },
            data: [{
                id: 1,
                label: '一级 1',
                children: [{
                    id: 4,
                    label: '二级 1-1',
                    children: [{
                    id: 9,
                    label: '三级 1-1-1'
                    }, {
                    id: 10,
                    label: '三级 1-1-2'
                    }]
                }]
                }, {
                id: 2,
                label: '一级 2',
                children: [{
                    id: 5,
                    label: '二级 2-1'
                }, {
                    id: 6,
                    label: '二级 2-2'
                }]
            }],
        }
    },
	methods: {
        //保存的操作
        dialogSure:function(){
            this.$refs['ruleForm'].validate((valid) => {
                if(valid){ //验证通过
                    this.loading=true;
                    this.$r.post('/service/update',this.ruleForm, r => {
                        console.log(r)
                        this.loading=false;
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
        handleCheckChange:function(){
            
        }
	},
    components: {
        dialogBtnInfo
    },
    props:["dialogInfo"]
}
</script>
