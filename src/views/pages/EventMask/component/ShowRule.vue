<template>
    <el-dialog title='屏蔽规则' :visible.sync="dialogInfo.visible" width="1200px" v-dialogDrag :close-on-click-modal="false" :append-to-body="true">
        <el-scrollbar class="scrollbar" style="height:480px;">
            <div class="dialog-content">
                <el-row class="row">
                    <el-col :span="20" class="row-col">
                        <div class="title">规则描述</div>
                        <div>屏蔽【**机房1/1号温湿度】的所有事件**********</div>
                    </el-col>
                    <el-col :span="4" class="row-col row-col-btn">
                        <el-button type="primary" plain>取消规则</el-button>
                    </el-col>
                    <el-col :span="8" class="row-col">
                        <div class="title">屏蔽处理</div>
                        <div>不发送消息通知</div>
                    </el-col>
                    <el-col :span="8" class="row-col">
                        <div class="title">生效时段</div>
                        <div>2020-12-12~2020-12-22</div>
                    </el-col>
                    <el-col :span="8" class="row-col">
                        <div class="title">屏蔽缘由</div>
                        <div>设备在维护</div>
                    </el-col>
                    <el-col :span="8" class="row-col">
                        <div class="title">创建人</div>
                        <div>呆呆呆</div>
                    </el-col>
                    <el-col :span="8" class="row-col">
                        <div class="title">创建时间</div>
                        <div>2020-1-11</div>
                    </el-col>
                </el-row>
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
                </el-table-pagination>
            </div>
        </el-scrollbar>
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