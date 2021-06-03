<template>
    <el-dialog title='通知时段' :visible.sync="dialogInfo.visible" width="900px" v-dialogDrag :close-on-click-modal="false" :append-to-body="true">
        <el-scrollbar class="scrollbar" style="height:480px;">
            <div class="dialog-content">
                <div class="topbtn">
                    <el-button type="primary" plain @click="handleTime()">新增</el-button>
                </div>
                <el-table-pagination
                    :url="$ajaxUrl+'/control/timegroup/query'"
                    list-field="data.items" 
                    total-field="data.count"
                    method="post"
                    :data="tableData"
                    type="local"
                    :params="initParams"
                    :showPagination="true"
                    :columns="tablecolumns" ref="thisRef">   
                    <template v-slot:preview-time="scope">
                        <span>{{scope.row.begintime}}-{{scope.row.endtime}}</span>
                    </template>
                    <template v-slot:preview-handle="scope">
                        <p class="table_handle">
                            <span @click="handleTime(scope.row)">编辑</span>
                            <span @click="remove(scope.row)">删除</span>
                        </p>
                    </template>
                </el-table-pagination>
            </div>
        </el-scrollbar>
        <dialog-btn :dialogInfo="dialogInfo" @dialogSure="dialogSure()"></dialog-btn>
        <time-add v-if="addInfo.visible" :dialogInfo="addInfo" @backInfo="backInfo"></time-add>
    </el-dialog>
</template>

<script>
import TimeAdd from './TimeAdd'
export default {
    components: {
        TimeAdd
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
            },
            tablecolumns:[
                { prop: 'groupname', label: "名称",minWidth:10},
                { prop: 'timerange', label: "有效时间范围",slotName:'preview-time',minWidth:30},
                { prop: 'handle', label: "操作",slotName:'preview-handle',width:100},
            ],
            tableData: [
                {groupname:"12321",begintime:"2021",endtime:"2023"},
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
        remove:function(row){
            this.$confirm("确定删除", "提示", {
				confirmButtonText: "确定",
				cancelButtonText: "取消",
				type: 'warning'
			}).then(() => {
                this.$r.post('/control/timegroup/delete',{groupid:row.groupid}, r => {
                    console.log(r)
                    
                    if(r.err_code=="0"){
                        this.$message.success(r.err_msg);
                        this.$refs.thisRef.searchHandler(false);
                    }else{
                        this.$message.warning(r.err_msg);
                    }
                });
			});
            
        }
	},
    
}
</script>
<style lang="less" scoped>
    .module-theme(...){
        .topbtn{
            margin-bottom: @boxMargin;
        }
    }
</style>