<template>
    <div class="content">
        <div class="addplan-top">
            <div><span class="title">新建模板</span><el-button type="primary" plain @click="$router.back(-1)">返回</el-button></div>
            <div>
                <el-button type="primary" plain>取消</el-button>
                <el-button type="primary">提交</el-button>
            </div>
        </div>
        <div class="card_title">
            <div class="title">基本信息</div>
        </div>
        <el-form ref="ValidateForm" :model="initParams" :rules="rules" label-position="top" class="form-box">
            <el-row :gutter="30">
                <el-col :span="8">
                    <el-form-item label='模板名称' prop="name">
                        <el-input v-model="initParams.name"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label='模板格式' prop="name">
                        <el-select v-model="initParams.name" placeholder="请选择">
                            <el-option key="1" label="EXCEL" value="1"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label='描述' prop="name">
                        <el-input v-model="initParams.name"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <div class="card_title">
            <div class="title">基本信息</div>
            <el-button type="primary" plain @click="handlePoint()">新增测点</el-button>
        </div>
        <el-table-pagination
            :url="$ajaxUrl+'/getTable'"
            list-field="data" 
            total-field="total"
            type="local"
            :data="tableData"
            method='get' 
            :params="initParams"
            :columns="tableColumns" ref="thisRef">   
            <el-table-column slot="prepend" type="selection"></el-table-column>
            <template v-slot:preview-handle="scope">
                <p class="table_handle">
                    <span @click="handlePoint(scope.row)">编辑</span>
                    <span>删除</span>
                </p>
            </template>
        </el-table-pagination>
        <add-point :dialogInfo="pointInfo" v-if="pointInfo.visible"></add-point>
    </div>
</template>
<script>
import AddPoint from './component/AddPoint'
export default {
    components:{AddPoint},
    created() {
        
    },
    mounted() {
        
    },
    data(){
        return{
            options:[
                {value:"1",label:"设备"},
            ],
            initParams:{
                search:"",
                name:""
            },
            rules:{

            },
            tableData:[
                {code:"1",type:"告警",indate:"告警",timegroup:"平均值",jieru:"2020-12",jieru1:"2020-12"},
                {code:"1",type:"告警",indate:"告警",timegroup:"平均值",jieru:"2020-12",jieru1:"2020-12"},
                {code:"1",type:"告警",indate:"告警",timegroup:"平均值",jieru:"2020-12",jieru1:"2020-12"},
                {code:"1",type:"告警",indate:"告警",timegroup:"平均值",jieru:"2020-12",jieru1:"2020-12"},
            ],
            tableColumns:[
                { prop: 'code', label: '名称',minWidth:10},
                { prop: 'type', label: '引用测点',minWidth:10},
                { prop: 'indate', label: '统计方法',minWidth:10},
                { prop: 'handle', label: '操作',slotName:'preview-handle',width:100},
            ],
            pointInfo:{
                visible:false,
                data:{}
            }
        }
    },
	methods: {
        handlePoint:function(item){
            this.pointInfo.data=item?item:{};
            this.pointInfo.visible=true;
        },
        resetForm() {
            this.$refs['ValidateForm'].resetFields();
        },
        submitForm() {
            this.$refs['ValidateForm'].validate((valid) => {
                if (valid) {
                    
                }
            });
        },
	},
    watch: {
        
    }
}
</script>
<style lang="less" scoped>
    .module-theme(...){
        .addplan-top{
            display: flex;
            justify-content: space-between;
            margin-bottom: @boxMargin;
            .title{
                margin-right: @btnMargin;
                font-size: 16px;
            }
        }
        .card_title{
            display: flex;
            justify-content: space-between;
            margin-bottom: @boxMargin;
        }
    }
</style>