<template>
    <div class="content content-flex">
        <div class="config-left">
            <div class="config-left-search">
                <el-input placeholder="请输入内容" v-model="search">
                    <i slot="suffix" class="el-input__icon el-icon-search"></i>
                </el-input>
            </div>
            <el-scrollbar class="config-left-scrollbar">
                <div class="config-left-con">
                    <el-tree :data="data" :props="defaultProps" ref="tree" :filter-node-method="filterNode" @node-click="nodeClick">
                        <span class="custom-tree-node" slot-scope="{ node, data }">
                            <span :class="{'active':data.id==activeId}">{{ data.label }}</span>
                            <span class="tree-icon">
                                <i class="el-icon-circle-plus-outline" @click="add(node)"></i>
                                <i class="el-icon-delete" @click="Remove(node)" v-if="node.childNodes.length==0"></i>
                            </span>
                        </span>
                    </el-tree>
                </div>
            </el-scrollbar>
        </div>
        <div class="config-right">
            <el-scrollbar class="config-right-scrollbar">
                <div class="config-right-con">
                    <div class="card_title"><div class="title">概要</div></div>
                    <div class="config-form">
                        <el-form ref="ValidateForm" :model="initParams" :rules="rules" label-position="top">
                            <el-row :gutter="30">
                                <el-col :span="24">
                                    <el-form-item label='名称' prop="name">
                                        <el-input v-model="initParams.name"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="24">
                                    <el-form-item label='' prop="name">
                                        <el-checkbox v-model="initParams.checked">用电配额管理</el-checkbox>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="24">
                                    <el-form-item label='瞬时限值' prop="name">
                                        <el-input v-model="initParams.name"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="24">
                                    <el-form-item label='日用电限值' prop="name">
                                        <el-input v-model="initParams.name"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="24">
                                    <el-form-item label='月用电限值' prop="name">
                                        <el-input v-model="initParams.name"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="24">
                                    <el-form-item label='' prop="name">
                                        <handle-btn @handleClick="sureHandle()" btnName="保存"></handle-btn>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </el-form>
                    </div>
                    <div class="card_title card-mt"><div class="title">测量模型</div></div>
                    <div class="content">
                        <el-tabs v-model="activeName">
                            <el-tab-pane label='电量计算' name="first">
                                <battery-model-table></battery-model-table>
                            </el-tab-pane>
                            <el-tab-pane label='瞬时用电' name="second">
                                <battery-model-table></battery-model-table>
                            </el-tab-pane>
                            <div class="tabs-btn">
                                <el-button type="text">清空</el-button>
                                <el-divider direction="vertical"></el-divider>
                                <el-button type="text">公式编辑器</el-button>
                            </div>
                        </el-tabs>
                    </div>
                </div>
            </el-scrollbar>
        </div>
        <add v-if="addInfo.visible" :dialogInfo="addInfo" @backInfo="addBack()"></add>
    </div>
</template>
<script>
import BatteryModelTable from './BatteryModelTable'
import Add from './Add'
export default {
    components: {
        BatteryModelTable,Add
    },
    created() {
        let arr=[
            {id:"1",label:"一级 1",extpara:{pid:"0"}},
            {id:"2",label:"一级 2",extpara:{pid:"0"}},
            {id:"4",label:"二级 1-1",extpara:{pid:"1"}},
            {id:"5",label:"二级 2-1",extpara:{pid:"2"}},
            {id:"6",label:"二级 2-2",extpara:{pid:"2"}},
            {id:"9",label:"三级 1-1-1",extpara:{pid:"4"}},
            {id:"10",label:"三级 1-1-2",extpara:{pid:"4"}},
        ];
        if(arr&&arr.length>0){
            let ID_KEY="id";
            let PARENT_KEY="pid";
            let CHILDREN_KEY="children";
            let tree=[],childrenOf={};
            for(let i=0;i<arr.length;i++){
                var item,id,parentId;
                item=arr[i];
                id=item[ID_KEY];
                parentId=item["extpara"][PARENT_KEY]||"0";
                //每行数据都可能存在子类
                childrenOf[id]=childrenOf[id]||[];
                //初始化子类
                item[CHILDREN_KEY]=childrenOf[id];
                if(parentId!="0"){
                    //初始化其父的子节点
                    childrenOf[parentId]=childrenOf[parentId]||[];
                    //把它推到父类下的children
                    childrenOf[parentId].push(item);
                }else{
                    tree.push(item);
                }
            }
            this.data=tree;
        }
    },
    mounted() {
        
    },
    data(){
        return{
            search:"",
            initParams:{
                name:"",
                checked:true,
            },
            data:[],
            // data: [
            //     {
            //         id: 1,
            //         label: '一级 1',
            //         children: [
            //             {
            //                 id: 4,
            //                 label: '二级 1-1',
            //                 children: [
            //                     {
            //                         id: 9,
            //                         label: '三级 1-1-1'
            //                     }, 
            //                     {
            //                         id: 10,
            //                         label: '三级 1-1-2'
            //                     }
            //                 ]
            //             }
            //         ]
            //     }, 
            //     {
            //         id: 2,
            //         label: '一级 2',
            //         children: [
            //             {
            //                 id: 5,
            //                 label: '二级 2-1'
            //             }, 
            //             {
            //                 id: 6,
            //                 label: '二级 2-2'
            //             }
            //         ]
            //     }
            // ],
            defaultProps: {
                children: 'children',
                label: 'label'
            },
            rules:{

            },
            addInfo:{
                visible:false, 
                id:"0",
            },
            activeName:"first",
            activeId:"" //判断点击的对象
        }
    },
	methods: {
        exportConfig:function(){
            console.log("model 导出")
        },
        add:function(node){
            if(node){
                this.addInfo.id=node.id;
            }else{
                this.addInfo.id="0";
            }
            console.log(node)
            this.addInfo.visible=true;
        },
        Remove:function(node){
            console.log(node)
            if(node.childNodes.length>0){
                this.$message.warning("该节点下面有设备不能删除");
                return;
            }
            this.$confirm("确定删除","提示",{
                confirmButtonText:"确定",
                cancelButtonText:"取消",
                type:"warning"
            }).then(()=>{
                
            })
        },
        nodeClick:function(data,node){
            this.activeId=data.id;
        },
        filterNode(value, data) {
            if (!value) return true;
            return data.label.indexOf(value) !== -1;
        },

	},
    watch:{
        search(val) {
            this.$refs.tree.filter(val);
        }
    },
}
</script>
<style lang="less" scoped>
    .module-theme(...){
        .content-flex{
            padding: 0;
            display: flex;
            justify-content: space-between;
        }
        .config-left{
            width: 250px;
            height: 100%;
            .config-left-search{
                width: 100%;
                height: 40px;
            }
            .config-left-scrollbar{
                width: calc(100% + 10px);
                height: calc(100% - 40px);
            }
            .config-left-con{
                width: 100%;
                padding-right: 10px;
            }
        }
        .config-right{
            width: calc(100% - 300px);
            height: 100%;
            .card-mt{
                margin-top: @boxMargin;
            }
            .config-right-scrollbar{
                width: calc(100% + 10px);
                height: 100%;
            }
            .config-right-con{
                width: 100%;
                padding-right: 10px;
            }
            .config-form{
                width: 400px;
            }
            .tabs-btn{
                position: absolute;
                top: -50px;
                right: 0;
            }
        }
        .custom-tree-node{
            width: 100%;
            .tree-icon{
                float:right;
                i{
                    margin-right: @itemMargin;
                    &:hover{
                        color: @activeColor;
                    }
                }
            }
            .active{
                color: @activeColor;
            }
        }
    }
</style>