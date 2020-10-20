<template>
    <div class="content">
        <el-form class="search-top" :model="initParams" :rules="rules" @submit.native.prevent ref="ValidateForm" label-position="top" >
            <div class="search">
                <el-form-item prop="alarm" label="事件类型">
                    <el-select v-model="initParams.alarm" placeholder="请选择">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="alarm" label="事件编号" class="form-item">
                    <el-input v-model="initParams.alarm" placeholder="请输入内容"></el-input>
                </el-form-item>
                <el-form-item class="form-item" prop="" :label="`\u3000`">
                    <el-button type="primary" @click="submitForm()">提交</el-button>
                    <el-button type="primary" plain @click="resetForm()">重置</el-button>
                </el-form-item>
            </div>
            <div class="btn">
                <el-form-item class="form-item" prop="" :label="`\u3000`">
                    <el-button type="primary">创建</el-button>
                    <el-button type="primary" plain>更新目录</el-button>
                    <el-dropdown trigger="click" class="dropdown-btn">
                        <el-button type="primary" plain>
                            更多菜单<i class="el-icon-arrow-down el-icon--right"></i>
                        </el-button>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item><el-button type="primary" plain @click="handleTime()">通知时段</el-button></el-dropdown-item>
                            <el-dropdown-item><el-button type="primary" plain @click="handleRule()">确认规则</el-button></el-dropdown-item>
                            <el-dropdown-item><el-button type="primary" plain>通知记录</el-button></el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
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
            <template slot-scope="scope" slot="preview-handle">
                <p class="table_handle">
                    <span>配置</span>
                </p>
            </template>
        </el-table-pagination>
        <time-component :dialogInfo="timeInfo" v-if="timeInfo.visible" @backInfo="backTime"></time-component>
        <rule-component :dialogInfo="ruleInfo" v-if="ruleInfo.visible"></rule-component>
    </div>
</template>
<script>
import TimeComponent from './component/Time'
import RuleComponent from './component/Rule'
export default {
    components: {
        TimeComponent,RuleComponent
    },
    created() {
        
    },
    mounted() {
        
    },
    data(){
        return{
            options:[
                {value:"1",label:"告警事件"},
            ],
            initParams:{
                alarm:"",
                date:""
            },
            rules:{

            },
            tableData:[
                {'a':"admin",b:"管理员",'c':"2020-3-10~2021-2-22",d:'15225252525',e:"123@qq.com",f:"正常",g:"在线",h:'WEB'}
            ],
            tableColumns:[
                { prop: 'a', label: '事件编号',minWidth:10},
                { prop: 'b', label: '事件名称',minWidth:10},
                { prop: 'c', label: '事件类型',minWidth:10},
                { prop: 'd', label: '级别',minWidth:10},
                { prop: 'e', label: '触发类型',minWidth:10},
                { prop: 'f', label: '是否需要确认',minWidth:10},
                { prop: 'g', label: '处理建议',minWidth:10},
                { prop: 'handle', label: '操作',slotName:'preview-handle',width:80},
            ],
            timeInfo:{
                visible:false
            },
            ruleInfo:{
                visible:false
            }
        }
    },
	methods: {
        handleTime:function(){
            this.timeInfo.visible=true;
        },
        handleRule:function(){
            this.ruleInfo.visible=true;
        },
        backTime:function(){

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
    
}
</script>
<style lang="less" scoped>
    .module-theme(...){
        .dropdown-btn{
            margin-left: @btnMargin;
        }
    }
</style>