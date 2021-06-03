<template>
    <el-dialog title='SNMP接口' :visible.sync="dialogInfo.visible" width="1200px" v-dialogDrag :close-on-click-modal="false" :append-to-body="true">
        <el-scrollbar style="height:480px;" class="scrollbar">
            <div class="dialog-content">
                <el-form ref="ValidateForm" :model="initParams" :rules="rules" label-position="top">
                    <div class="card_title">
                        <div class="title">基本信息</div>
                    </div>
                    <el-row :gutter="30">
                        <el-col :span="8">
                            <el-form-item label='是否启用' prop="name">
                                <el-checkbox v-model="initParams.name">启用</el-checkbox>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label='数据端口' prop="name">
                                <el-input v-model="initParams.name"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label='数据中心地址' prop="name">
                                <el-input v-model="initParams.name"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label='TRAP 端口' prop="name">
                                <el-input v-model="initParams.name"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label='TRAP IP' prop="name">
                                <el-input v-model="initParams.name"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-row :gutter="5">
                                <el-col :span="5">
                                    <el-form-item label='是否绑定网卡' prop="name" class="ifbind" label-width="200px">
                                        <el-checkbox v-model="initParams.name">绑定</el-checkbox>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="19">
                                    <el-form-item prop="name" :label="`\u3000`">
                                        <el-select v-model="initParams.name" clearable>
                                            <el-option key="1" label="网卡1" value="1"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label='读团体字' prop="name">
                                <el-input v-model="initParams.name"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label='写团体字' prop="name">
                                <el-input v-model="initParams.name"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label='协议版本' prop="name">
                                <el-input v-model="initParams.name"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <div class="card_title">
                        <div class="title">SNMP V3参数</div>
                    </div>
                    <el-row :gutter="30">
                        <el-col :span="8">
                            <el-form-item label='用户名' prop="name">
                                <el-input v-model="initParams.name"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label='安全级别' prop="name">
                                <el-select v-model="initParams.name" clearable>
                                    <el-option key="1" label="1" value="1"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label='加密方式' prop="name">
                                <el-select v-model="initParams.name" clearable>
                                    <el-option key="1" label="1" value="1"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label='认证密码' prop="name">
                                <el-input v-model="initParams.name"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label='加密密码' prop="name">
                                <el-input v-model="initParams.name"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label='认证方式' prop="name">
                                <el-select v-model="initParams.name" clearable>
                                    <el-option key="1" label="1" value="1"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <div class="card_title">
                        <div class="title">发布对象</div>
                        <div class="more-info">
                            <el-checkbox v-model="initParams.name">白名单认证</el-checkbox>
                            <el-button type="primary" @click="add()" class="btn">添加</el-button>
                        </div>
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
                        <template v-slot:preview-handle="scope">
                            <p class="table_handle">
                                <span>编辑</span>
                                <span>删除</span>
                            </p>
                        </template>
                    </el-table-pagination>
                </el-form>
            </div>
        </el-scrollbar>
        <dialog-btn :dialogInfo="dialogInfo" @dialogSure="dialogSure()"></dialog-btn>
        <obj-add v-if="addInfo.visible" :dialogInfo="addInfo"></obj-add>
    </el-dialog>
</template>

<script>
import ObjAdd from './component/ObjAdd'
export default {
    components:{ObjAdd},
    created() {
        
    },
    mounted() {
        
    },
    data(){
        return{
            initParams:{
                name:"",
            },
            rules: {
                
            },
            tableData:[
                {a:'1522',b:"sfs"}
            ],
            tableColumns:[
                { prop: 'a', label: 'IP',minWidth:10},
                { prop: 'b', label: 'MAC',minWidth:10},
                { prop: 'c', label: '描述',minWidth:10},
                { prop: 'handle', label: '操作',slotName:'preview-handle',width:100},
            ],
            addInfo:{
                visible:false
            }
        }
    },
	methods: {
        add:function(){
            this.addInfo.visible=true;
        },
        //保存的操作
        dialogSure:function(){
            this.$refs['ValidateForm'].validate((valid) => {
                if(valid){ //验证通过
                    this.$emit("backInfo")
                }
            })
        },
	},
    props:["dialogInfo"]
}
</script>
<style lang="less" scoped>
.module-theme(...){
    .ifbind{
        /deep/ .el-form-item__label{
            width: 200px;
        }
    }
    .more-info{
        .btn{
            margin-left: 10px;
        }
    }
}
</style>