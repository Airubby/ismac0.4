<template>
    <div class="content">
        <div class="addplan-top">
            <div><span class="title">新建计划</span><el-button type="primary" plain @click="$router.back(-1)">返回</el-button></div>
            <div>
                <el-button type="primary" plain>取消</el-button>
                <el-button type="primary">提交</el-button>
            </div>
        </div>
        <el-form ref="ValidateForm" :model="initParams" :rules="rules" label-position="top" class="form-box">
            <el-row :gutter="30">
                <el-col :span="8">
                    <el-form-item label='计划名称' prop="name">
                        <el-input v-model="initParams.name"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label='报表模板' prop="name">
                        <el-select v-model="initParams.name" placeholder="请选择">
                            <el-option key="1" label="EXCEL" value="1"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label='状态' prop="name">
                        <el-input v-model="initParams.name"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label='报表类型' prop="name">
                        <el-select v-model="initParams.name" placeholder="请选择">
                            <el-option key="1" label="日报" value="1"></el-option>
                            <el-option key="2" label="周报" value="2"></el-option>
                            <el-option key="3" label="月报" value="3"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label='时间范围' prop="name">
                        <el-date-picker
                            v-model="initParams.date"
                            type="datetimerange"
                            range-separator="~"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label='生成时间' prop="name">
                        <el-date-picker
                            v-model="initParams.time"
                            type="datetime"
                            range-separator="~"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label='是否推送' prop="name">
                        <el-checkbox v-model="initParams.checked">启用邮件推送</el-checkbox>
                    </el-form-item>
                </el-col>
                <el-col :span="16">
                    <el-form-item label='推送对象' prop="name">
                        <el-input v-model="initParams.name"></el-input>
                        <p>邮箱地址以分号隔开</p>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
    </div>
</template>
<script>
export default {
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
                name:"",
                date:"",
                time:"",
                checked:false,
            },
            rules:{

            },
            tableData:[
                {code:"1",type:"告警",indate:"告警",timegroup:"告警",jieru:"2020-12",jieru1:"2020-12"},
                {code:"1",type:"告警",indate:"告警",timegroup:"告警",jieru:"2020-12",jieru1:"2020-12"},
                {code:"1",type:"告警",indate:"告警",timegroup:"告警",jieru:"2020-12",jieru1:"2020-12"},
                {code:"1",type:"告警",indate:"告警",timegroup:"告警",jieru:"2020-12",jieru1:"2020-12"},
            ],
            tableColumns:[
                { prop: 'code', label: '计划名称',minWidth:10},
                { prop: 'type', label: '类型',minWidth:10},
                { prop: 'indate', label: '描述',minWidth:20},
                { prop: 'timegroup', label: '订阅用户',minWidth:20},
                { prop: 'handle', label: '操作',slotName:'preview-handle',width:100},
            ]
        }
    },
	methods: {
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
    }
</style>