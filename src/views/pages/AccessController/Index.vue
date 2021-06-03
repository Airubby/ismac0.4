<template>
    <div class="content">
        <el-form class="search-top" :model="initParams" :rules="rules" @submit.native.prevent ref="ValidateForm" label-position="top" >
            <div class="search">
                <el-form-item prop="accesscard" label="名称">
                    <el-input v-model.trim="initParams.accesscard"></el-input>
                </el-form-item>
                <el-form-item prop="username" class="form-item" label="编码">
                    <el-input v-model.trim="initParams.username"></el-input>
                </el-form-item>
                <el-form-item prop="username" class="form-item" label="状态">
                    <el-select v-model="initParams.devstate">
                        <el-option
                            v-for="item in devInfo"
                            :key="item.devcode"
                            :label='item.devname'
                            :value="item.devcode">
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
                    <el-button type="primary" @click="add()">新建</el-button>
                    <el-button type="primary" plain @click="controlerSynchro()">控制器同步</el-button>
                    <el-button type="primary" plain @click="timeSynchro()">时间同步</el-button>
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
            <template v-slot:preview-devstate="scope">
                <span v-if="scope.row.scope=='1'">维护</span>
                <span v-else-if="scope.row.scope=='0'" class="normal">正常</span>
                <span v-else class="alarm">停用</span>
            </template>
            <template v-slot:preview-isenable="scope">
                <span v-if="scope.row.commstate=='0'" class="normal">通讯正常</span>
                <span v-else-if="scope.row.commstate=='1'" class="alarm">通信中断</span>
                <span v-else="scope.row.commstate=='2'" class="alarm">未启用</span>
            </template>
            <template v-slot:preview-handle="scope">
                <p class="table_handle">
                    <span @click="usersyn(scope.row)" v-if="scope.row.devstate==='0'&&scope.row.commstate==='0'">人员同步</span>
                    <span @click="forbidden(scope.row)">
                        {{scope.row.devstate==='0'?"停用":"启用"}}
                    </span>
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

    },
    mounted() {
        
    },
    data(){
        return{
            devInfo:[
                {devcode:'0',devname:"正常"},
                {devcode:'1',devname:"维护"},
                {devcode:'2',devname:"停用"},
            ],
            initParams:{
                devname:'',
                devid:'',
                devstate:'',
                devtype:"40100",
            },
            tableColumns:[
                { prop: 'devname', label: "名称",minWidth:10},   
                { prop: 'devid', label: "编码",minWidth:10},
                { prop: 'devtypename', label: "设备分类",minWidth:15},
                { prop: 'addrname', label: "位置",minWidth:20},
                { prop: 'devstate', label: "状态",slotName:'preview-devstate',minWidth:10},
                { prop: 'commstate', label: "通讯状态",slotName:'preview-commstate',minWidth:10},
                { prop: 'handle', label: "操作",slotName:'preview-handle',width:120},
            ],
            tableData:[],
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
        //时间同步
        timeSynchro:function(){
            let selection=this.$refs.thisRef.getSelect();
            if(selection.length==0){
                this.$message.warning("请勾选需要操作的项");
                return;
            }
            let arr=[],number=0;
            for(let i=0;i<selection.length;i++){
                if(selection[i].devstate==='0'&&selection[i].commstate==='0'){
                    arr.push(selection[i].devid);
                    number+=1;
                }
            }
            if(number!=selection.length){
                this.$message.warning("未启用或者通讯中断的设备无法同步");
                return;
            }
            this.$confirm(this.$t('layer.sure'), this.$t('layer.tips'), {
				confirmButtonText: this.$t('layer.ok'),
				cancelButtonText: this.$t('layer.cancel'),
				type: 'warning'
			}).then(() => {
                
                this.$api.post("/access/record/synchrotime",{devid:arr.toString()}).then(res=>{
                    if(res.err_code=='0'){
                        this.$message.success(res.err_msg);
                    }else{
                        this.$message.warning(res.err_msg);
                    }
                    
                })
			});
        },
        //控制器同步
        controlerSynchro:function(){
            let selection=this.$refs.thisRef.getSelect();
            if(selection.length==0){
                this.$message.warning("请勾选需要操作的项");
                return;
            }
            let arr=[],number=0;
            for(let i=0;i<selection.length;i++){
                if(selection[i].devstate==='0'&&selection[i].commstate==='0'){
                    arr.push(selection[i].devid);
                    number+=1;
                }
            }
            if(number!=selection.length){
                this.$message.warning("未启用或者通讯中断的设备无法同步");
                return;
            }
            this.$confirm(this.$t('layer.sure'), this.$t('layer.tips'), {
				confirmButtonText: this.$t('layer.ok'),
				cancelButtonText: this.$t('layer.cancel'),
				type: 'warning'
			}).then(() => {
                
                this.$api.post("/access/record/synchroaccess",{devid:arr.toString()}).then(res=>{
                    if(res.err_code=='0'){
                        this.$message.success(res.err_msg);
                    }else{
                        this.$message.warning(res.err_msg);
                    }
                    
                })
			});
        },
        //人员同步
        usersyn:function(row){
             this.$confirm(this.$t('layer.sure'), this.$t('layer.tips'), {
				confirmButtonText: this.$t('layer.ok'),
				cancelButtonText: this.$t('layer.cancel'),
				type: 'warning'
			}).then(() => {
                this.$api.post("/access/record/synchrouser",{id:row.devid}).then(res=>{
                    if(res.err_code=='0'){
                        this.$message.success(res.err_msg);
                    }else{
                        this.$message.warning(res.err_msg);
                    }
                    
                })
			});
            
        },
        //禁用
        forbidden:function(row){
            this.$confirm(this.$t('layer.sure'), this.$t('layer.tips'), {
				confirmButtonText: this.$t('layer.ok'),
				cancelButtonText: this.$t('layer.cancel'),
				type: 'warning'
			}).then(() => {
                
                //0正常，1维护，2停用
                let devstate=row.devstate=="0"?"2":"0";
				this.$r.post("/control/dev/update",{devid:row.devid,devstate:devstate}).then(res=>{
                    if(res.err_code=='0'){
                        this.$message.success(res.err_msg);
                        this.$refs.thisRef.searchHandler(false);
                    }else{
                        this.$message.warning(res.err_msg);
                    }
                    
                })
			});
        },
        add:function(item){
            this.$router.push({name:'accessControllerAdd'});
        },
        edit:function(item){
            this.$router.push({name:'accessControllerAdd',query:{params:JSON.stringify({"id":item.id})}});
        },
	},
}
</script>
<style lang="less" scoped>
    .module-theme(...){
        
    }
</style>