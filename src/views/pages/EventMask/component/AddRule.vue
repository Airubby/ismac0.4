<template>
    <el-dialog title='屏蔽规则' :visible.sync="dialogInfo.visible" width="1200px" v-dialogDrag :close-on-click-modal="false" :append-to-body="true">
        <el-scrollbar class="scrollbar" style="height:480px;">
            <div class="dialog-content">
                <el-form ref="ValidateForm" :model="initParams" :rules="rules" label-position="top">
                    <el-row :gutter="30">
                        <el-col :span="12">
                            <el-form-item label='屏蔽规则' prop="name">
                                <el-select v-model="initParams.name" placeholder="请选择">
                                    <el-option key="1" label="该事件" value="1"></el-option>
                                    <el-option key="2" label="该事件所属属性的所有事件" value="2"></el-option>
                                    <el-option key="3" label="该事件所属设备的所有事件" value="3"></el-option>
                                    <el-option key="3" label="该事件所属网关的所有事件" value="3"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label='规则描述' prop="name">
                                <el-input v-model="initParams.name"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label='屏蔽缘由' prop="name">
                                <el-select v-model="initParams.name" placeholder="请选择">
                                    <el-option key="1" label="误报警" value="1"></el-option>
                                    <el-option key="2" label="设备在维护" value="2"></el-option>
                                    <el-option key="3" label="不影响运行" value="3"></el-option>
                                    <el-option key="3" label="其它原因" value="3"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label='屏蔽时间' prop="name">
                                <el-date-picker
                                    v-model="initParams.name"
                                    type="datetimerange"
                                    format="yyyy-MM-dd HH:mm:ss"
                                    value-format="yyyy-MM-dd HH:mm:ss"
                                    range-separator="~"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label='屏蔽处理' prop="name">
                                <el-select v-model="initParams.name" placeholder="请选择">
                                    <el-option key="1" label="不发送消息通知" value="1"></el-option>
                                    <el-option key="2" label="不转发" value="2"></el-option>
                                    <el-option key="3" label="不显示" value="3"></el-option>
                                    <el-option key="3" label="不记录入库" value="3"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
        </el-scrollbar>
        <dialog-btn :dialogInfo="dialogInfo" @dialogSure="dialogSure()"></dialog-btn>
    </el-dialog>
</template>

<script>
export default {
    components: {
        
    },
    props:["dialogInfo"],
    created() {
        
    },
    mounted() {
        
    },
    data(){
        return{
            loading:false,
            initParams:{
                grouptype:'1',
                name:""
            },
            tablecolumns:[
                { prop: 'a', label: "等级",minWidth:10},
                { prop: 'b', label: "事件名称",minWidth:10},
                { prop: 'c', label: "事件定位",minWidth:30},
                { prop: 'd', label: "产生原因",minWidth:30},
                { prop: 'e', label: "产生时间",minWidth:10},
            ],
            tableData: [
                {a:"12321",b:"2021",c:"2023",d:"24234",e:"234243"},
            ],
            addInfo:{
                visible:false,
                groupid:"",
            }
        }
    },
	methods: {
        handleTime:function(item){
            if(item){
                this.addInfo.groupid=item.id
            }else{
                this.addInfo.groupid=""
            }
            this.addInfo.visible=true;
        },
        backInfo:function(info){
            this.$refs.thisRef.searchHandler(info);
        },
        dialogSure:function(){
            this.$refs['ValidateForm'].validate((valid) => {
                if(valid){ //验证通过
                    this.$emit("backInfo")
                }
            })
        },
	},
    
}
</script>
<style lang="less" scoped>
    .module-theme(...){
        .row{
            margin-bottom: @boxMargin;
        }
        .row-col{
            display: flex;
            height: 32px;
            align-items: center;
            &.row-col-btn{
                justify-content: flex-end;
            }
            .title{
                min-width: 60px;
                text-align: right;
                margin-right: @boxMargin;
            }
        }
    }
</style>