<template>
    <el-dialog title='新增/编辑动作' :visible.sync="dialogInfo.visible" width="560px" v-dialogDrag :close-on-click-modal="false" :append-to-body="true">
        <el-scrollbar style="height:380px;" class="scrollbar">
            <div class="dialog-content">
                <el-form ref="ValidateForm" :model="initParams" :rules="rules" label-position="top">
                    <el-row :gutter="10">
                        <el-col :span="24">
                            <el-form-item label='动作名称' prop="name">
                                <el-input v-model="initParams.name"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="24">
                            <el-form-item label='选择变量' prop="name" class="height-auto">
                                <el-tree :data="data" :props="defaultProps" ref="tree" @node-click="nodeClick" accordion>
                                    <span class="custom-tree-node" slot-scope="{ node, data }">
                                        <span :class="{'active':data.id==activeId}">{{ data.label }}</span>
                                    </span>
                                </el-tree>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label='动作类型' prop="type">
                                <el-select v-model="initParams.type" placeholder="请选择">
                                    <el-option key="1" label="变量设置" value="1"></el-option>
                                    <el-option key="2" label="脚本动作" value="2"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="18">
                            <el-form-item :label="`\u3000`" prop="name">
                                <el-input v-model="initParams.name"></el-input>
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
                type:"1"
            },
            rules: {
                
            },
            defaultProps: {
                children: 'children',
                label: 'label'
            },
            data: [
                {
                    id: 1,
                    label: '一级 1',
                    children: [
                        {
                            id: 4,
                            label: '二级 1-1',
                            children: [
                                {
                                    id: 9,
                                    label: '三级 1-1-1'
                                }, 
                                {
                                    id: 10,
                                    label: '三级 1-1-2'
                                }
                            ]
                        }
                    ]
                }, 
                {
                    id: 2,
                    label: '一级 2',
                    children: [
                        {
                            id: 5,
                            label: '二级 2-1'
                        }, 
                        {
                            id: 6,
                            label: '二级 2-2'
                        }
                    ]
                }
            ],
            activeId:""
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
        nodeClick:function(data,node){
            this.activeId=data.id;
        },
	},
    props:["dialogInfo"]
}
</script>
<style lang="less" scoped>
.module-theme(...){
    .custom-tree-node{
        width: 100%;
        .active{
            color: @activeColor;
        }
    }
    .dialog-content{
        /deep/ .height-auto .el-form-item__content{
            height: auto;
        }
    }
    
}
</style>
