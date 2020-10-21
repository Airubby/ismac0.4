<template>
    <div class="content">
        <el-form class="search-top" :model="initParams" :rules="rules" @submit.native.prevent ref="ValidateForm" label-position="top" >
            <div class="search">
                <el-form-item prop="alarm" label="通知方式">
                    <el-select v-model="initParams.alarm" placeholder="请选择">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="alarm" label="状态" class="form-item">
                    <el-select v-model="initParams.alarm" placeholder="请选择">
                        <el-option
                        v-for="item in options1"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="alarm" label="查询时段" class="form-item">
                    <el-date-picker
                        v-model="initParams.date"
                        type="datetimerange"
                        range-separator="~"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item class="form-item" prop="" :label="`\u3000`">
                    <el-button type="primary" @click="submitForm()">提交</el-button>
                    <el-button type="primary" plain @click="resetForm()">重置</el-button>
                </el-form-item>
            </div>
            <div class="btn">
                <el-form-item class="form-item" prop="" :label="`\u3000`">
                    <el-button type="primary">批量导出</el-button>
                </el-form-item>
            </div>
        </el-form>
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
        
        </el-table-pagination>
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
                {value:"1",label:"短信"},
                {value:"2",label:"电话"},
                {value:"3",label:"邮件"},
                {value:"4",label:"微信"},
                {value:"5",label:"钉钉"},
            ],
            options:[
                {value:"1",label:"成功"},
                {value:"2",label:"失败"},
            ],
            initParams:{
                alarm:"",
                date:""
            },
            rules:{

            },
            tableData:[
                {code:"1",type:"告警",indate:"告警",timegroup:"告警",jieru:"成功",jieru1:"成功"},
                {code:"1",type:"告警",indate:"告警",timegroup:"告警",jieru:"成功",jieru1:"成功"},
                {code:"1",type:"告警",indate:"告警",timegroup:"告警",jieru:"成功",jieru1:"成功"},
                {code:"1",type:"告警",indate:"告警",timegroup:"告警",jieru:"成功",jieru1:"成功"},
                {code:"1",type:"告警",indate:"告警",timegroup:"告警",jieru:"成功",jieru1:"成功"},
                {code:"1",type:"告警",indate:"告警",timegroup:"告警",jieru:"成功",jieru1:"成功"},
                {code:"1",type:"告警",indate:"告警",timegroup:"告警",jieru:"成功",jieru1:"成功"},
                {code:"1",type:"告警",indate:"告警",timegroup:"告警",jieru:"成功",jieru1:"成功"},
                {code:"1",type:"告警",indate:"告警",timegroup:"告警",jieru:"成功",jieru1:"成功"},
                {code:"1",type:"告警",indate:"告警",timegroup:"告警",jieru:"成功",jieru1:"成功"},
                {code:"1",type:"告警",indate:"告警",timegroup:"告警",jieru:"成功",jieru1:"成功"},
                {code:"1",type:"告警",indate:"告警",timegroup:"告警",jieru:"成功",jieru1:"成功"},
            ],
            tableColumns:[
                { prop: 'code', label: '时间',minWidth:10},
                { prop: 'type', label: '通知方式',minWidth:10},
                { prop: 'indate', label: '目标',minWidth:10},
                { prop: 'timegroup', label: '消息内容',minWidth:30},
                { prop: 'jieru', label: '状态',minWidth:10},
            ]
        }
    },
    computed: {
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
    components: {
        
    }
}
</script>
<style lang="less" scoped>
    .module-theme(...){
        
    }
</style>