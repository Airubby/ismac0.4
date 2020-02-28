<template>
    <div class="bgfffcontent">
        <div class="breadcrumb">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>{{$t("navbar.control")}}</el-breadcrumb-item>
                <el-breadcrumb-item>{{$t("navbar.controlAlarmRecord")}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="public_content pd20">
            <el-row>
                <el-col :span="12"><el-input v-model="input" placeholder="请输入内容" ref="inp"></el-input></el-col>
                <el-col :span="12"><el-button type="primary" @click="copy">复制</el-button></el-col>
            </el-row>
            <el-checkbox v-model="check">测试computed属性写入store</el-checkbox>
            <el-button type="primary" @click="treeInfo.visible=true">弹窗$emit方式返回数据</el-button>
            <el-tree
            :data="treedata"
            show-checkbox
            node-key="id"
            ref="tree"
            check-strictly
            @check-change="checkChange"
            :default-checked-keys="checkedKeys"
            :props="defaultProps">
            <span class="custom-tree-node" slot-scope="{ node, data }">
                <span>{{ node.label }}</span>
                <span v-if="node.id==1" style="color:#f00;">
                    我是第一个
                </span>
            </span>
            </el-tree>
            <div style="width:200px;height:200px;" id="echart"></div>
        </div>
        <treeShow v-if="treeInfo.visible" :dialogInfo="treeInfo" v-on:backInfo="backTreeInfo"></treeShow>
        
    </div>
</template>

<script>
import treeShow from '@/components/dialogShow.vue'
import echarts from 'echarts';
import 'echarts-liquidfill';
export default {
    created() {
        
    },
    mounted() {
        this.initEchart()
    },
    computed: {
        check: {
            get() {
                return this.$store.getters.isview
            },
            set(val){
                console.log(val)
                this.$store.dispatch('setIsview',val);
            }
        }
    },
    data(){
        return{
            input:"a345435345aa",
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
            checkedKeys:[5],
            checkRadio:true,  //单选
            treeInfo:{
                visible:false,
            }
        }
    },
	methods: {
        initEchart:function(){
            // 基于准备好的dom，初始化echarts实例
            var myChart = echarts.init(document.getElementById('echart'));
            // 绘制图表
            var option = {
                series: [{
                    type: 'liquidFill',
                    radius: '95%',
                    waveAnimation: true,
                    backgroundStyle: {
                        color: 'transparent',
                        borderColor: '#709CFD',
                        borderWidth: 5,
                    },
                    itemStyle: {
                        normal: {
                            shadowBlur: 0
                        }
                    },
                    outline: {
                        borderDistance: 0,
                        itemStyle: {
                            borderWidth: 10,
                            borderColor: "transparent",
                        }
                    },
                    label: {
                        normal: {
                            show: true,
                            textStyle: {
                                color: "#709CFD",
                                fontSize: 12,
                                align: 'center',
                                baseline: 'middle'
                            },
                            position: 'inside'
                        }
                    },
                    data: [
                    {
                        value: 0.7,
                        itemStyle: {
                            normal: {
                                color: "#709CFD"
                            }
                        }
                    }
                    ]
                }]
            };
            myChart.setOption(option);
        },
        copy:function(){
            this.$refs.inp.select();
            let flag=document.execCommand("copy");
            if(flag){
                this.$message.success("复制成功");
            }
        },
        checkChange:function(node,flag,data){
            console.log(node)
            console.log(flag)
            console.log(this.$refs.tree.getCheckedNodes())
            if(this.checkRadio){
                if(this.$refs.tree.getCheckedNodes().length%2===0){
                    if(flag){
                        this.$refs.tree.setCheckedNodes([node]);
                    }else{
                        this.$refs.tree.setCheckedNodes([]);
                    }
                }
            }else{
                console.log(this.$refs.tree.getCheckedKeys());
            }
        },
        getCheckedKeys() {
            console.log(this.$refs.tree.getCheckedKeys());
        },
        setCheckedKeys() {
            this.$refs.tree.setCheckedKeys([3]);
        },
        backTreeInfo:function(info){
            this.input=info.times+"--"+info.treeid+"--"+info.treename;
        },
	},
    components: {
        treeShow
    }
}
</script>
