<template>
    <div class="content">
        <el-form class="search-top" :model="initParams" :rules="rules" @submit.native.prevent ref="ValidateForm" label-position="top" >
            <div class="search">
                <el-form-item prop="accesscard" label="卡号">
                    <el-input v-model.trim="initParams.accesscard"></el-input>
                </el-form-item>
                <el-form-item prop="username" class="form-item" label="姓名">
                    <el-input v-model.trim="initParams.username"></el-input>
                </el-form-item>
                <el-form-item class="form-item" prop="" :label="`\u3000`">
                    <el-button type="primary" @click="submitForm()">提交</el-button>
                    <el-button type="primary" plain @click="resetForm()">重置</el-button>
                </el-form-item>
            </div>
            <div class="btn">
                <el-form-item class="form-item" prop="" :label="`\u3000`">
                    <el-button type="primary" @click="handleUser()">新建</el-button>
                </el-form-item>
            </div>
        </el-form>
        <el-table-pagination
            :url="$ajaxUrl+'/access/mode/getaccessmode'"
            list-field="data.items" 
            total-field="data.count"
            method='post' 
            type="local"
            :data="tableData"
            :params="initParams"
            :columns="tableColumns" ref="thisRef">   
            <template v-slot:preview-indate="scope">
                <span>{{scope.row.begintime}}-{{scope.row.endtime}}</span>
            </template>
            <template v-slot:preview-roleid="scope">
                <span v-if="scope.row.roleid=='0'">系统用户</span>
                <span v-else>普通用户</span>
            </template>
            <template v-slot:preview-isenable="scope">
                <span v-if="scope.row.isenable=='1'" class="normal">启用</span>
                <span v-else class="alarm">停用</span>
            </template>
            <template v-slot:preview-timegroupid="scope">
                <span>{{getShow(scope.row.timegroupid)}}</span>
            </template>
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
    created() {
        // this.getList();
        this.getGroup();
    },
    mounted() {
        
    },
    data(){
        return{
            loading:false,
            initParams:{
                accesscard:'',
                username:"",
            },
            tableColumns:[
                { prop: 'id', label: "用户编号",minWidth:10},   
                { prop: 'username', label: "姓名",minWidth:10},
                { prop: 'accesscard', label: "卡号",minWidth:15},
                { prop: 'indate', label: "有效期",slotName:'preview-indate',minWidth:20},
                { prop: 'timegroupid', label: "时间组",slotName:'preview-timegroupid',minWidth:10},

                // { prop: 'roleid', label: this.$t("public.category"),slotName:'preview-roleid',minWidth:10},
                // { prop: 'isenable', label: this.$t("hint.status"),slotName:'preview-isenable',minWidth:10},
                { prop: 'handle', label: "操作",slotName:'preview-handle',width:120},
            ],
            tableData:[],
            timeGroup:[],
            rules:{

            }
        }
    },
	methods: {
        getList:function(){
            this.$r.post("/access/mode/getaccessmode",{},r=>{
                console.log(r)
                if(r.err_code=='0'){
                    if(r.data&&r.data.length>0){
                        this.tableData=r.data;
                    }else{
                        this.tableData=[];
                    }
                }else{
                    this.$message.warning(r.err_msg);
                }
            })
        },
        //获取时间组
        getGroup:function(){
            this.$r.post("/access/timegroup/gettimegroup",{grouptype:'2'},r=>{
                console.log(r)
                if(r.err_code=='0'){
                    this.timeGroup=r.data?r.data:[];
                }else{
                    this.$message.warning(r.err_msg);
                }
            })
        },
        getShow:function(timegroupid){
            for(let i=0;i<this.timeGroup.length;i++){
                if(this.timeGroup[i].groupid==timegroupid){
                    return this.timeGroup[i].groupname;
                }
            }
        },
        //查询
        searchFN:function(){
            this.$refs.thisRef.searchHandler(true);
        },
        //重置
        reset:function(){
            for(let item in this.initParams){
                this.initParams[item]="";
            }
            this.searchFN();
        },
        //批量删除
        moreDelete:function(row){
            this.$confirm("确定删除", "提示", {
				confirmButtonText: "确定",
				cancelButtonText: "取消",
				type: 'warning'
			}).then(() => {
				
                this.$r.post("/access/mode/deleteaccessmode",{id:row.id},r=>{
                    console.log(r)
                    if(r.err_code=='0'){
                        this.$message.success(r.err_msg);
                        this.$refs.thisRef.searchHandler(true);
                    }else{
                        this.$message.warning(r.err_msg);
                    }
                    
                })
			});
            
        },
        //新建
        add:function(){
            this.$router.push({name:'accessCardImpowerAdd'});
        },
        edit:function(row){
            this.$router.push({name:'accessCardImpowerAdd',query:{
                params:JSON.stringify({"id":row.id})
            }});
        }
	},
}
</script>
<style lang="less" scoped>
    .module-theme(...){
        
    }
</style>