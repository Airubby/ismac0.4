<template>
    <div class="content">
        <el-form class="search-top" :model="initParams" :rules="rules" @submit.native.prevent ref="ValidateForm" label-position="top" >
            <div class="search">
                <el-form-item prop="alarm" label="设备">
                    <el-select v-model="initParams.alarm" placeholder="请选择">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="alarm" label="时间类型" class="form-item">
                    <el-select v-model="initParams.type" placeholder="请选择">
                        <el-option key="hour" label="时报" value="hour"></el-option>
                        <el-option key="day" label="日报" value="day"></el-option>
                        <el-option key="month" label="月报" value="month"></el-option>
                        <el-option key="year" label="年报" value="year"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="alarm" label="查询时段" class="form-item" style="max-width:340px;">
                    <!-- <el-time-picker
                        v-show="initParams.type=='hour'"
                        class="timerpicker"
                        v-model="initParams.time"
                        value-format="HH:00"
                        format="HH:00"
                        :picker-options="hourDisabled"
                        placeholder="选择时间范围">
                    </el-time-picker> -->
                    <el-date-picker
                        v-show="initParams.type=='day'"
                        class="timerpicker"
                        v-model="initParams.time"
                        type="date"
                        :picker-options="dayDisabled"
                        placeholder="结束日期">
                    </el-date-picker>
                    <el-date-picker
                        v-show="initParams.type=='month'"
                        v-model="initParams.time"
                        class="timerpicker"
                        value-format="yyyy-MM"
                        format="yyyy-MM"
                        :picker-options="monthDisabled"
                        type="month"
                        placeholder="选择月">
                    </el-date-picker>
                    <el-date-picker
                        v-show="initParams.type=='year'"
                        v-model="initParams.time"
                        class="timerpicker"
                        :picker-options="yearDisabled"
                        type="year"
                        placeholder="选择年">
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
        this.dayDisabled.disabledDate=function(time){
            return  time.getTime() < Date.now() - 30 * 24 * 3600 * 1000 || time.getTime() > Date.now()  //30天
        }
        this.monthDisabled.disabledDate=function(time){
            return time.getTime() < Date.now() - 365*2 * 24 * 3600 * 1000 || time.getTime() > Date.now() 
        }
        this.yearDisabled.disabledDate=function(time){
            return time.getTime() < Date.now() - 365*10 * 24 * 3600 * 1000 || time.getTime() > Date.now() 
        }
    },
    mounted() {
        
    },
    data(){
        return{
            hourDisabled:{},  //时限制条件
            dayDisabled:{},  //日限制条件
            monthDisabled:{},  //月限制条件
            yearDisabled:{},  //年限制条件
            options:[
                {value:"1",label:"设备"},
            ],
            initParams:{
                type:"day",
                time:"",
                alarm:"",
                date:""
            },
            rules:{

            },
            tableData:[
                {code:"1",type:"告警",indate:"告警",timegroup:"告警",jieru:"2020-12",jieru1:"2020-12"},
                {code:"1",type:"告警",indate:"告警",timegroup:"告警",jieru:"2020-12",jieru1:"2020-12"},
                {code:"1",type:"告警",indate:"告警",timegroup:"告警",jieru:"2020-12",jieru1:"2020-12"},
                {code:"1",type:"告警",indate:"告警",timegroup:"告警",jieru:"2020-12",jieru1:"2020-12"},
                {code:"1",type:"告警",indate:"告警",timegroup:"告警",jieru:"2020-12",jieru1:"2020-12"},
                {code:"1",type:"告警",indate:"告警",timegroup:"告警",jieru:"2020-12",jieru1:"2020-12"},
                {code:"1",type:"告警",indate:"告警",timegroup:"告警",jieru:"2020-12",jieru1:"2020-12"},
                {code:"1",type:"告警",indate:"告警",timegroup:"告警",jieru:"2020-12",jieru1:"2020-12"},
                {code:"1",type:"告警",indate:"告警",timegroup:"告警",jieru:"2020-12",jieru1:"2020-12"},
                {code:"1",type:"告警",indate:"告警",timegroup:"告警",jieru:"2020-12",jieru1:"2020-12"},
                {code:"1",type:"告警",indate:"告警",timegroup:"告警",jieru:"2020-12",jieru1:"2020-12"},
                {code:"1",type:"告警",indate:"告警",timegroup:"告警",jieru:"2020-12",jieru1:"2020-12"},
            ],
            tableColumns:[
                { prop: 'code', label: '等级',minWidth:10},
                { prop: 'type', label: '告警事件',minWidth:10},
                { prop: 'indate', label: '定位',minWidth:10},
                { prop: 'timegroup', label: '触发原因',minWidth:10},
                { prop: 'jieru', label: '产生时间',minWidth:10},
                { prop: 'jieru1', label: '解除时间',minWidth:10},
                { prop: 'jieru1', label: '确认时间',minWidth:10},
                { prop: 'jieru1', label: '确认人',minWidth:10},
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
        'initParams.type':function(val){
            this.initParams.time=null;
        },
        'initParams.time':function(val){
            if(this.initParams.type=='month'){
                this.getMonth(val);
            }
        },
    }
}
</script>
<style lang="less" scoped>
    .module-theme(...){
        
    }
</style>