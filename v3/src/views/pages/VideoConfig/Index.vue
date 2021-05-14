<template>
    <div class="content">
        <el-form class="search-top" :model="initParams" @submit.native.prevent ref="ValidateForm" label-position="top" >
            <div class="search">
                <el-form-item prop="servename" label="名称">
                    <el-input v-model.trim="initParams.servename"></el-input>
                </el-form-item>
                <el-form-item class="form-item" prop="ip" label="接入点">
                    <el-input v-model.trim="initParams.ip"></el-input>
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
            :url="$ajaxUrl+'/video/videoserver/query'"
            list-field="data.items"
            total-field="data.count"
            method='post'
            type="local"
            :data="tableData"
            :params="initParams"
            :columns="tableColumns" ref="thisRef">  
            <template v-slot:preview-handle="scope">
                <p class="table_handle">
                    <span @click="edit(scope.row)">编辑</span>
                    <span @click="moreDelete(scope.row)">删除</span>
                </p>
            </template>
        </el-table-pagination>
    </div>
</template>
<script>
export default {
    components:{},
    created() {
        
    },
    mounted() {
        
    },
    data(){
        return{
            initParams:{
                servename:'',
                ip:'',
            },
            tableColumns:[
                { prop: 'servername', label: "名称",minWidth:10},   
                { prop: 'devtypename', label: "品牌",minWidth:10},
                {prop: 'videotypename', label: "设备分类",minWidth:10},
                { prop: 'addrid', label: "位置",minWidth:10},
                { prop: 'ip', label: "接入点",minWidth:10},
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
        add:function(item){
            this.$router.push({name:'videoConfigAdd'});
        },
        edit:function(item){
            this.$router.push({name:'videoConfigAdd',query:{params:JSON.stringify({"id":item.id})}});
        },
        moreDelete:function(row){
            this.$confirm(this.$t('layer.sure'), this.$t('layer.tips'), {
				confirmButtonText: this.$t('layer.ok'),
				cancelButtonText: this.$t('layer.cancel'),
				type: 'warning'
			}).then(() => {
				this.$api.post("",{id:row.id}).then(res=>{
                    if(res.err_code=='0'){
                        this.$message.success(res.err_msg);
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