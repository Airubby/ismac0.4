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
                <el-col :span="12">
                    <div>{{$t("testLanguage")}}</div>
                    <el-checkbox v-model="check">测试computed属性写入store</el-checkbox>
                    <el-button type="primary" @click="treeDialog">弹窗$emit方式返回数据</el-button>
                    <el-tree
                    :data="treedata"
                    show-checkbox
                    node-key="id"
                    ref="tree"
                    check-strictly
                    @node-click="nodeClick"
                    @check-change="checkChange"
                    :default-checked-keys="checkedKeys"
                    :props="defaultProps">
                    <span class="custom-tree-node" slot-scope="{ node, data }">
                        <span :class="{'active':data.id==activeId}">{{ data.label }}</span>
                        <span v-if="node.id==1" style="color:#f00;">
                            判断展示
                        </span>
                        <span v-else style="color:#09c;">
                            绑定图标按钮
                        </span>
                    </span>
                    </el-tree>
                    <div style="width:200px;height:200px;" id="echart"></div>
                </el-col>
                <el-col :span="12">
                    <h2>下拉框带树形</h2>
                    <el-select v-model="value6" placeholder="请选择">
                        <el-input
                        placeholder="输入关键字进行过滤"
                        v-model="filterText" style="position:absolute;top:6px;z-index:9;margin:0 auto;">
                        </el-input>
                        <el-option :value="value6" :label="value7" class="selectTree">
                            <el-tree show-checkbox ref="selecttree" node-key="id" class="filter-tree"
                            :data="data" 
                            :filter-node-method="filterNode"
                            :props="defaultProps" @check-change="selsetchangeTree">
                            </el-tree>
                        </el-option>
                    </el-select>
                </el-col>
            </el-row>
        </div>
        <treeShow v-if="treeInfo.visible" :dialogInfo="treeInfo" v-on:backInfo="backTreeInfo"></treeShow>
        
    </div>
</template>

<script>
import treeShow from '@/components/dialogShow.vue'
import echarts from 'echarts';
import 'echarts-liquidfill';
import LangMixins from './language'
export default {
    mixins:[LangMixins],
    created() {
        this.$r.post("/getalarmmock",{},r=>{
            console.log(r)
        })
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
            treedata: [
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
            defaultProps: {
                children: 'children',
                label: 'label'
            },
            checkedKeys:[5],
            checkRadio:true,  //单选
            treeInfo:{
                visible:false,
            },
            //下拉框带树形
            filterText: '',
            value6:'',
            value7:'',
            data: [{
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
            activeId:""
        }
    },
	methods: {
        //懒加载  :load="loadNode"  lazy
        loadNode(node, resolve) {
            if (node.level === 0) {
                return resolve([{ name: 'region' }]);
            }
            this.$r.post("",{},r=>{
                if(r.data){
                    return resolve(r.data);
                }else{
                    return resolve([]);
                }
            })
        },
        initEchart:function(){
            let value=0.015;
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
                                fontSize: 26,
                                align: 'center',
                                baseline: 'middle'
                            },
                            formatter:function(param) {
                                return 'Value:' + (param.value*100).toFixed(2)+"%";
                            },
                            position: 'inside'
                        }
                    },
                    data: [
                    {
                        value: value,
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
            this.$prompt('复制理由', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                inputPattern: /\S/,
                inputErrorMessage: '不能为空'
            }).then(({ value }) => {
                this.$refs.inp.select();
                let flag=document.execCommand("copy");
                if(flag){
                    this.$message.success("复制成功");
                }
            });
            
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
        nodeClick:function(data,node){
            this.activeId=data.id;
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
        treeDialog:function(){
            this.$confirm("确定测试这个玩意儿？","提示",{
                confirmButtonText:"确定",
                cancelButtonText:"取消",
                type:"warning"
            }).then(()=>{
                this.treeInfo.visible=true
            })
            
        },
        //下拉框带树形
        selsetchangeTree:function(data,node){
            console.log(data)
            console.log(node)
            let arrnode=this.$refs.tree.getCheckedNodes();
            let name=[];
            console.log(arrnode)
            for(var i=0;i<arrnode.length;i++){
                name.push(arrnode[i].label);
            }
            this.value7=name.toString();
        },
        filterNode(value, data) {
            if (!value) return true;
            return data.label.indexOf(value) !== -1;
        },
        
	},
    components: {
        treeShow
    },
    watch: {
        filterText(val) {
            this.$refs.selecttree.filter(val);
        }
    },
}
</script>
<style lang="less" scoped>
    .custom-tree-node .active{
        color: #f00;
    }
</style>