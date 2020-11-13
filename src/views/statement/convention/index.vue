<template>
    <div class="bgfffcontent">
        <div class="breadcrumb">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>{{$t("navbar.statement")}}</el-breadcrumb-item>
                <el-breadcrumb-item>{{$t("navbar.statementConvention")}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="public_content pd20">
            
            <h4>下拉框带树形</h4>
            <div class="selectTreeDom">
                <el-select v-model="selectValue" placeholder="请选择">
                    <el-input
                    placeholder="输入关键字进行过滤"
                    v-model="filterText" style="position:absolute;top:6px;z-index:9;margin:0 auto;">
                    </el-input>
                    <el-option :value="selectValue" :label="selectLabel" class="selectTree">
                        <el-tree show-checkbox ref="tree" node-key="id" class="filter-tree"
                        :data="treedata" 
                        :filter-node-method="filterNode"
                        :props="defaultProps" @check-change="selsetchangeTree">
                        </el-tree>
                    </el-option>
                </el-select>
            </div>
        </div>
        
    </div>
</template>
<style lang="less" scoped>
    //下拉树形全局样式
    .el-select-dropdown__item.hover, .el-select-dropdown__item:hover{
        background:#fff !important;
    }
    .el-select-dropdown__item{
        height:auto;
    }
</style>
<script>

import axios from "axios"
export default {
    created() {
        
    },
    mounted() {
        this.$nextTick(function(){
            this.$el.querySelector(".selectTree").parentNode.style.paddingTop="40px";
        })
    },
    data(){
        return{
            loading:false,
            config:{
                headers:{
                    'Content-Type': 'multipart/form-data'
                }
            },
            

            filterText:"",
            selectValue:"",
            selectLabel:"",
            treedata: [{
                label: '一级 1',
                children: [{
                    label: '二级 1-1',
                    children: [{
                        label: '三级 1-1-1'
                    }]
                    }]
                }, {
                    label: '一级 2',
                    children: [{
                    label: '二级 2-1',
                    children: [{
                        label: '三级 2-1-1'
                    }]
                    }, {
                    label: '二级 2-2',
                    children: [{
                        label: '三级 2-2-1'
                    }]
                    }]
                }, {
                    label: '一级 3',
                    children: [{
                    label: '二级 3-1',
                    children: [{
                        label: '三级 3-1-1'
                    }]
                    }, {
                    label: '二级 3-2',
                    children: [{
                        label: '三级 3-2-1'
                    }]
                }]
            }],
            defaultProps: {
                children: 'children',
                label: 'label'
            },

        }
    },
	methods: {
        
        selsetchangeTree:function(data,node){
            console.log(data)
            console.log(node)
            let arrnode=this.$refs.tree.getCheckedNodes();
            let name=[];
            console.log(arrnode)
            for(var i=0;i<arrnode.length;i++){
                name.push(arrnode[i].label);
            }
            this.selectLabel=name.toString();
        },
        filterNode(value, data) {
            if (!value) return true;
            return data.label.indexOf(value) !== -1;
        }
    },
    watch: {
        filterText(val) {
            this.$refs.tree.filter(val);
        }
    },
    components:{loading},
}
</script>
