<template>
    <el-dialog title='透传服务接口' :visible.sync="dialogInfo.visible" width="1200px" v-dialogDrag :close-on-click-modal="false" :append-to-body="true">
        <el-scrollbar style="height:480px;" class="scrollbar">
            <div class="dialog-content">
                <el-form ref="ValidateForm" :model="initParams" :rules="rules" label-position="top">
                    <div class="card_title">
                        <div class="title">基本信息</div>
                    </div>
                    <el-row :gutter="30">
                        <el-col :span="8">
                            <el-form-item label='是否启用透传通道' prop="name">
                                <el-checkbox v-model="initParams.name">
                                    启用 <span class="info">设置透传通道的端口将不可作为本采集器用途！请谨慎使用</span>
                                </el-checkbox>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <div class="card_title">
                        <div class="title">通道配置</div>
                        <div class="more-info">
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
        <seria-net-add v-if="addInfo.visible" :dialogInfo="addInfo"></seria-net-add>
    </el-dialog>
</template>

<script>
import SeriaNetAdd from './component/SeriaNetAdd'
export default {
    components:{SeriaNetAdd},
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
                { prop: 'a', label: '声光名称',minWidth:10},
                { prop: 'b', label: '声光控制测点',minWidth:10},
                { prop: 'c', label: '告警下发控制内容',minWidth:10},
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
    .info{
        margin-left: 30px;
        color: @alarmColor;
    }
    .more-info{
        .btn{
            margin-left: 10px;
        }
    }
}
</style>