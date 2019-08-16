<template>
    <el-dialog title="手动操作" :visible.sync="dialogInfo.visible" width="460px" v-dialogDrag>
        <el-scrollbar style="height:290px;" class="scrollbar">
            <div class="" v-loading="loading">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
                    <div>
                        <el-form-item label="规则描述" prop="times" size="small">
                            <el-input v-model="ruleForm.times" class="elinput" placeholder="多少分钟监测一下，单位分钟"></el-input>
                        </el-form-item>
                        <el-form-item label="规则描述" prop="times" size="small">
                            <el-tree
                            :data="treedata"
                            show-checkbox
                            node-key="id"
                            ref="tree"
                            check-strictly
                            @check-change="checkChange"
                            :default-checked-keys="checkedKeys"
                            :props="defaultProps">
                            </el-tree>
                        </el-form-item>
                    </div>
                </el-form>
            </div>
        </el-scrollbar>
        <dialogBtnInfo v-bind:dialogInfobtn="dialogInfo" v-on:dialogSure="dialogSure()"></dialogBtnInfo>
    </el-dialog>
</template>

<script>
import dialogBtnInfo from '@/components/dialogBtnInfo.vue'
export default {
    created () {
    },
    mounted() {

    },
    data() {
        let checknumber=(rules,value,callback)=>{
            this.$tool.checkNumber({rules,value,callback})
        };
        return {
            loading:false,
            ruleForm: {
                times:'',
            },
            rules: {
                times: [
                    { required: true, trigger: 'blur' ,validator:checknumber}
                ],
            },
            treedata: [{
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
                }, {
                id: 3,
                label: '一级 3',
                children: [{
                    id: 7,
                    label: '二级 3-1'
                }, {
                    id: 8,
                    label: '二级 3-2'
                }]
            }],
            defaultProps: {
                children: 'children',
                label: 'label'
            },
            checkedKeys:[],
        }
    },
    methods:{
        //保存的操作
        dialogSure:function(){
            this.$refs['ruleForm'].validate((valid) => {
                if(valid){ //验证通过
                    this.loading=true;
                    this.$api.post('',this.ruleForm, r => {
                        
                    });
                }
            })
        },
        checkChange:function(node,flag,data){
            console.log(node)
            console.log(flag)
            console.log(this.$refs.tree.getCheckedNodes())
            if(this.$refs.tree.getCheckedNodes().length%2===0){
                if(flag){
                    this.$refs.tree.setCheckedNodes([node]);
                }else{
                    this.$refs.tree.setCheckedNodes([]);
                }
            }
            

        },

    },
    watch:{
        
    },
    components:{dialogBtnInfo},
    props:["dialogInfo"]
}
</script>
<style scoped>
    
</style>
