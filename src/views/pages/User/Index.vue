<template>
    <div class="content">
        <el-form class="search-top" :model="initParams" :rules="rules" @submit.native.prevent ref="ValidateForm" label-position="top" >
            <div class="search">
                <el-form-item prop="alarm" label="角色">
                    <el-select v-model="initParams.alarm" placeholder="请选择">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item class="form-item" prop="" :label="`\u3000`">
                    <el-button type="primary" @click="submitForm()">提交</el-button>
                    <el-button type="primary" plain @click="resetForm()">重置</el-button>
                </el-form-item>
            </div>
            <div class="btn">
                <el-form-item class="form-item" prop="" :label="`\u3000`">
                    <el-button type="primary" @click="handleUser()">创建用户</el-button>
                    <el-button type="primary" plain @click="handleSet()">安全策略</el-button>
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
            <template v-slot:preview-handle="scope">
                <p class="table_handle">
                    <span>重置密码</span>
                    <span>解锁</span>
                    <span>停用</span>
                    <span @click="handleUser(scope.row)">编辑</span>
                    <span>删除</span>
                </p>
            </template>
        </el-table-pagination>
        <add :dialogInfo="addInfo" v-if="addInfo.visible" @backInfo="backInfo"></add>
        <set :dialogInfo="setInfo" v-if="setInfo.visible"></set>
    </div>
</template>
<script>
import Add from './component/Add'
import Set from './component/Set'
export default {
    components: {
        Add,Set
    },
    created() {
        
    },
    mounted() {
        
    },
    data(){
        return{
            options:[
                {value:"1",label:"管理员"},
                {value:"2",label:"运维员"},
                {value:"3",label:"一般用户"},
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
                { prop: 'a', label: '用户名',minWidth:10},
                { prop: 'b', label: '角色',minWidth:10},
                { prop: 'c', label: '有效期',minWidth:10},
                { prop: 'd', label: '手机',minWidth:10},
                { prop: 'e', label: '邮箱',minWidth:10},
                { prop: 'f', label: '使用状态',minWidth:10},
                { prop: 'g', label: '在线状态',minWidth:10},
                { prop: 'h', label: '登录源',minWidth:10},
                { prop: 'handle', label: '操作',slotName:'preview-handle',width:240},
            ],
            addInfo:{
                visible:false,
                id:"",
            },
            setInfo:{
                visible:false,
            }
        }
    },
    computed: {
    },
	methods: {
        handleUser:function(info){
            if(info){
                this.addInfo.id=info.id;
            }else{
                this.addInfo.id="";
            }
            this.addInfo.visible=true;
        },
        handleSet:function(){
            this.setInfo.visible=true;
        },
        backInfo:function(){

        },
        resetForm:function() {
            this.$refs['ValidateForm'].resetFields();
        },
        submitForm:function() {
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
        
    }
</style>