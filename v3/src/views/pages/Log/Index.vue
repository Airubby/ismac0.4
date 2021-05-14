<template>
    <div class="content">
        <el-form class="search-top" :model="initParams" :rules="rules" @submit.native.prevent ref="ValidateForm" label-position="top" >
            <div class="search">
                <el-form-item prop="alarm" label="类型">
                    <el-select v-model="initParams.alarm" placeholder="请选择">
                        <el-option
                        v-for="item in options"
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
                {value:"1",label:"操作日志"},
                {value:"2",label:"运行日志"},
                {value:"3",label:"故障日志"},
            ],
            initParams:{
                alarm:"",
                date:""
            },
            rules:{

            },
            tableData:[
                {'a':"用户登录",b:"一般",'c':"admin",d:'2020-12-12 12:12:12',e:"成功",f:"杀了烦死了书法家李师傅"}
            ],
            tableColumns:[
                { prop: 'a', label: '操作类型',minWidth:10},
                { prop: 'b', label: '级别',minWidth:10},
                { prop: 'c', label: '用户',minWidth:10},
                { prop: 'd', label: '时间',minWidth:10},
                { prop: 'e', label: '状态',minWidth:10},
                { prop: 'f', label: '详细内容',minWidth:30},
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