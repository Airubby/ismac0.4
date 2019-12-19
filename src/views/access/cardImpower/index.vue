<template>
    <div class="bgfffcontent">
        <div class="breadcrumb">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>{{$t("navbar.access")}}</el-breadcrumb-item>
                <el-breadcrumb-item>{{$t("navbar.accessCardImpower")}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="public_content pd20">
            <el-scrollbar class="scrollbar">
                <div class="table_search" :class="{'active':search}">
                    <el-form ref="form" :model="initParams" label-width="80px">
                        <el-row :gutter="20">
                            <el-col :span="8">
                                <el-form-item label="卡号">
                                    <el-input v-model="initParams.code"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="类型">
                                    <el-select v-model="initParams.type" placeholder="请选择">
                                        <el-option label="超级卡" value="shanghai"></el-option>
                                        <el-option label="普通卡" value="beijing"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <div class="mb20">
                                    <el-button type="primary" @click="searchFN">查询</el-button>
                                    <el-button class="reset">重置</el-button>
                                    <el-button type="text" @click="changeSearch">{{$t("hint."+changeInfo)}}</el-button>
                                </div>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="领卡人">
                                    <el-input v-model="initParams.user"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="有效期">
                                    <el-date-picker
                                    v-model="initParams.time"
                                    type="datetimerange"
                                    range-separator="至"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期">
                                    </el-date-picker>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="时间组">
                                    <el-input v-model="initParams.timegroup"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        
                    </el-form>
                </div>
                <div class="table_btn">
                    <el-button type="primary" icon="el-icon-plus" @click="add">新建</el-button>
                    <el-button @click="moreDelete">批量删除</el-button>
                    <el-button @click="assignment">权限分配</el-button>
                    <el-button @click="removePermissions">权限清除</el-button>
                </div>
                <el-table-pagination
                    :url="$ajaxUrl+'/getTable'"
                    list-field="data" 
                    total-field="total"
                    method='get' 
                    :params="initParams"
                    :showPagination="true"
                    :showSelectAll="true"
                    :columns="table_columns" ref="thisRef">   
                    <el-table-column slot="prepend" type="selection"></el-table-column>
                    <template slot-scope="scope" slot="preview-handle">
                        <p class="table_handle"><span @click="edit(scope.row)">编辑</span><span @click="moreDelete(scope.row)">删除</span></p>
                        <p class="table_handle"><span @click="assignment(scope.row)">权限分配</span><span @click="removePermissions(scope.row)">清除权限</span></p>
                    </template>
                </el-table-pagination>
            </el-scrollbar>
        </div>
        <assignment v-if="assignmentInfo.visible" :dialogInfo="assignmentInfo"></assignment>
    </div>
</template>

<script>
import assignment from './components/assignment.vue'
export default {
    created() {
        
    },
    mounted() {
        
    },
    data(){
        return{
            search:false,
            changeInfo:'unfold',
            initParams:{
                code:'',
                type:'',
                user:'',
                indate:'',
                timegroup:'',
            },
            table_columns:[
              { prop: 'code', label: '卡号',minWidth:10},
              { prop: 'type', label: '类型',minWidth:10},
              { prop: 'user', label: '领卡人',minWidth:10},
              { prop: 'indate', label: '有效期',minWidth:10,sortable:true},
              { prop: 'timegroup', label: '时间组',minWidth:10},
              { prop: 'handle', label: '操作',slotName:'preview-handle',width:150},
            ],
            table_data:[],
            assignmentInfo:{
                visible:false,
                ids:'',
            }
        }
    },
	methods: {
        //查询
        searchFN:function(){
            this.$refs.thisRef.searchHandler(false);
        },
        //重置
        reset:function(){
            this.$refs['form'].resetFields();
            this.searchFN();
        },
        //批量删除
        moreDelete:function(row){
            let ids="";
            if(row!=undefined&&row.id!=undefined){
                ids=row.id;
            }else{
                ids=this.getIds();
            }
            console.log(ids)
            if(ids==""){
                this.$message.warning("请勾选需要操作的项");
                return;
            }
            this.$r.post("/delete",{model:{ids:ids}},r=>{
                console.log(r)
                if(r.err_code=='0'){
                    this.$message.success(r.err_msg);
                }else{
                    this.$message.warning(r.err_msg);
                }
            })
        },
        //清除权限
        removePermissions:function(row){
            let ids="";
            if(row!=undefined&&row.id!=undefined){
                ids=row.id;
            }else{
                ids=this.getIds();
            }
            console.log(ids)
            if(ids==""){
                this.$message.warning("请勾选需要操作的项");
                return;
            }
            this.$r.post("/remove",{model:{ids:ids}},r=>{
                console.log(r)
                if(r.err_code=='0'){
                    this.$message.success(r.err_msg);
                }else{
                    this.$message.warning(r.err_msg);
                }
            })
        },
        changeSearch:function(){
            this.changeInfo=this.search?'unfold':'shrink';
            this.search=!this.search;
        },
        //权限分配
        assignment:function(row){
            let ids="";
            if(row!=undefined&&row.id!=undefined){
                ids=row.id;
            }else{
                ids=this.getIds();
            }
            if(ids==""){
                this.$message.warning("请勾选需要操作的项");
                return;
            }
            this.assignmentInfo.ids=ids;
            this.assignmentInfo.visible=true;
        },
        getIds:function(){
            let arr=[];
            let allSelect=this.$refs.thisRef.allSelection;
            for(let i=0;i<allSelect.length;i++){
                arr.push(allSelect[i].id);
            }
            return arr.toString();
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
    components: {
        assignment
    }
}
</script>
