<template>
    <div class="content">
        <el-form class="search-top" :model="initParams" :rules="rules" @submit.native.prevent ref="ValidateForm" label-position="top" >
            <div class="search">
                <el-form-item prop="accesscard" label="名称">
                    <el-input v-model.trim="initParams.accesscard"></el-input>
                </el-form-item>
                <el-form-item class="form-item" prop="" :label="`\u3000`">
                    <el-button type="primary" @click="submitForm()">提交</el-button>
                    <el-button type="primary" plain @click="resetForm()">重置</el-button>
                </el-form-item>
            </div>
            <div class="btn">
                <el-form-item class="form-item" prop="" :label="`\u3000`">
                    <el-button type="primary" @click="add()">新建</el-button>
                </el-form-item>
            </div>
        </el-form>
        <el-table-pagination
            :url="$ajaxUrl+'/control/devstate/query'"
            list-field="data.items" 
            total-field="data.count"
            method='post' 
            type="local"
            :data="tableData"
            :params="initParams"
            :columns="tableColumns" ref="thisRef">  
            <template v-slot:preview-week="scope">
                {{getWeek(scope.row)}}
            </template> 
            <template v-slot:preview-handle="scope">
                <p class="table_handle">
                    <span @click="add(scope.row)">编辑</span>
                    <span @click="moreDelete(scope.row)">删除</span>
                </p>
            </template>
        </el-table-pagination>
        <time-add v-if="addInfo.visible" :dialogInfo="addInfo" @backInfo="backInfo"></time-add>
    </div>
</template>
<script>
import TimeAdd from './component/TimeAdd'
export default {
    components:{TimeAdd},
    created() {
        // this.getList();
    },
    mounted() {
        
    },
    data(){
        return{
            initParams:{
                groupname:'',
                grouptype:'2',
            },
            tableColumns:[
                { prop: 'devname', label: "名称",minWidth:10},   
                { prop: 'week', label: "周范围",slotName:'preview-week',minWidth:10},
                { prop: 'groupdesc', label: "描述",minWidth:10},
                { prop: 'handle', label: "操作",slotName:'preview-handle',width:120},
            ],
            tableData:[],
            addInfo:{
                visible:false,
                groupid:"",
            }
        }
    },
	methods: {
        submitForm:function(){
            this.$refs.thisRef.searchHandler();
        },
        resetForm:function(){
            this.$refs['ValidateForm'].resetFields();
            this.submitForm();
        },
        getList:function(){
            this.$api.post(this.$Api.GetList,this.initParams).then(res=>{
                if(res.err_code=='0'){
                    if(res.data&&r.data.length>0){
                        this.tableData=res.data;
                    }else{
                        this.tableData=[];
                    }
                }else{
                    this.$message.warning(res.err_msg);
                }
            })
        },
        getWeek:function(row){
            let arr=[];
            row.monday&&arr.push("Monday");
            row.tuesday&&arr.push("Tuesday");
            row.wednesday&&arr.push("Wednesday");
            row.thursday&&arr.push("Thursday");
            row.friday&&arr.push("Friday");
            row.saturday&&arr.push("Saturday");
            row.sunday&&arr.push("Sunday");
            return arr.toString();
        },
        add:function(item){
            if(item){
                this.addInfo.groupid=item.id
            }else{
                this.addInfo.groupid=""
            }
            this.addInfo.visible=true;
        },
        moreDelete:function(row){
            this.$confirm(this.$t('layer.sure'), this.$t('layer.tips'), {
				confirmButtonText: this.$t('layer.ok'),
				cancelButtonText: this.$t('layer.cancel'),
				type: 'warning'
			}).then(() => {
				this.$api.post("/access/timegroup/deletetimegroup",{groupid:row.groupid}).then(res=>{
                    if(res.err_code=='0'){
                        this.$message.success(res.err_msg);
                        this.getList();
                    }else{
                        this.$message.warning(res.err_msg);
                    }
                    
                })
			});
            
        },
	},
}
</script>
<style lang="less" scoped>
    .module-theme(...){
        
    }
</style>