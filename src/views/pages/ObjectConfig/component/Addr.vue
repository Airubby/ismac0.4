<template>
    <el-dialog title='地点配置' :visible.sync="dialogInfo.visible" width="900px" v-dialogDrag :close-on-click-modal="false" :append-to-body="true">
        <el-scrollbar style="height:480px;" class="scrollbar">
            <div class="dialog-content">
                <el-form ref="ValidateForm" :model="initParams" :rules="rules" label-position="top">
                    <el-input placeholder="输入关键字进行过滤" v-model="filterText" ></el-input>
                    <el-tree ref="selecttree" node-key="id" class="filter-tree"
                        :data="treeData" 
                        :filter-node-method="filterNode"
                        :props="defaultProps">
                        <span class="custom-tree-node" slot-scope="{ node, data }">
                            <span>{{ data.label }}</span>
                            <span v-if="node.level==1" class="custom-tree-btn">
                                <i class="el-icon-plus" @click="add(node)"></i>
                                <i class="el-icon-upload2" @click="importFn(node)"></i>
                                <i class="el-icon-download" @click="exportFn(node)"></i>
                            </span>
                            <span v-else class="custom-tree-btn">
                                <i class="el-icon-plus" @click="add(node)"></i>
                                <i class="el-icon-edit" @click="edit(node)"></i>
                                <i class="el-icon-delete" @click="remove(node)"></i>
                            </span>
                        </span>
                    </el-tree>
                </el-form>
            </div>
        </el-scrollbar>
        <dialog-btn :dialogInfo="dialogInfo" @dialogSure="dialogSure()"></dialog-btn>
        <add-addr v-if="addInfo.visible" :dialogInfo="addInfo"></add-addr>
    </el-dialog>
</template>

<script>
import addAddr from './AddAddr'
export default {
    components:{addAddr},
    created() {
        
    },
    mounted() {
        
    },
    data(){
        return{
            filterText:"",
            treeData: [
                {
                    id: 0,
                    label: '平台',
                    children: [
                        {
                            id: 1,
                            label: '供配电',
                            children: [
                                {
                                    id: 1-1,
                                    label: '供配电1-1'
                                }, 
                                {
                                    id: 1-2,
                                    label: '供配电1-2'
                                }
                            ]
                        },
                        {
                            id: 2,
                            label: '温湿度',
                            children: [
                                {
                                    id: 2-1,
                                    label: '温湿度1-1'
                                }, 
                                {
                                    id: 2-2,
                                    label: '温湿度1-2'
                                }
                            ]
                        }
                    ]
                },
                {
                    id: 10,
                    label: '平台',
                    children: [
                        {
                            id: 1,
                            label: '供配电',
                            children: [
                                {
                                    id: 1-1,
                                    label: '供配电3-1'
                                }, 
                                {
                                    id: 1-2,
                                    label: '供配电1-2'
                                }
                            ]
                        },
                        {
                            id: 2,
                            label: '温湿度',
                            children: [
                                {
                                    id: 2-1,
                                    label: '温湿度1-1'
                                }, 
                                {
                                    id: 2-2,
                                    label: '温湿度1-2'
                                }
                            ]
                        }
                    ]
                }
            ],
            defaultProps: {
                children: 'children',
                label: 'label'
            },
            initParams:{
                
            },
            rules: {
                
            },
            addInfo:{
                visible:false
            }
        }
    },
	methods: {
        filterNode(value, data) {
            if (!value) return true;
            return data.label.indexOf(value) !== -1;
        },
        add:function(node){
            console.log(node)
            this.addInfo.visible=true;
        },
        edit:function(node){

        },
        remove:function(node){

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
    watch: {
        filterText(val) {
            this.$refs.selecttree.filter(val);
        }
    },
    props:["dialogInfo"]
}
</script>
<style lang="less" scoped>
.module-theme(...){
    .custom-tree-btn{
        display: none;
        margin-left: 15px;
        i{
            margin-left: 5px;
            &:hover{
                color: @activeColor
            }
        }
    } 
    .el-tree-node__content:hover{
        .custom-tree-btn{
            display: inline-block;
        }
    }
    
}
</style>