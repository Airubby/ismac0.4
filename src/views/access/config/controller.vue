<template>
    <div class="bgfffcontent">
        <el-scrollbar class="scrollbar">
            <div class="table_search" :class="{'active':search}">
                <el-form ref="form" :model="initParams" label-width="80px">
                    <el-row :gutter="20">
                        <el-col :span="8">
                            <el-form-item label="编号">
                                <el-input v-model="initParams.code"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="状态">
                                <el-select v-model="initParams.type" placeholder="请选择">
                                    <el-option label="运行中" value="shanghai"></el-option>
                                    <el-option label="未启用" value="beijing"></el-option>
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
                            <el-form-item label="名称">
                                <el-input v-model="initParams.user"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="设备分类">
                                <el-input v-model="initParams.timegroup"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    
                </el-form>
            </div>
            <div class="table_btn">
                <el-button type="primary" icon="el-icon-plus" @click="add">新建</el-button>
                <el-button @click="moreDelete">批量删除</el-button>
                <el-button @click="timeSync">时间同步</el-button>
                <el-button @click="removePermissions">权限清除</el-button>
                <el-button @click="initialize">初始化</el-button>
            </div>
            <el-search-table-pagination
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
                    <p class="table_handle"><span @click="disable(scope.row)">禁用</span><span @click="edit(scope.row)">编辑</span><span @click="moreDelete(scope.row)">删除</span></p>
                    <p class="table_handle"><span @click="removePermissions(scope.row)">门参数</span><span @click="removePermissions(scope.row)">通讯测试</span></p>
                </template>
            </el-search-table-pagination>
        </el-scrollbar>
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
            search:false,
            changeInfo:'unfold',
            initParams:{
                code:'',
                type:'',
                user:'',
                indate:'',
                timegroup:'',
                jieru:''
            },
            table_columns:[
              { prop: 'code', label: '编号',minWidth:10},
              { prop: 'type', label: '名称',minWidth:10},
              { prop: 'user', label: '设备分类',minWidth:10},
              { prop: 'indate', label: '状态',minWidth:10},
              { prop: 'timegroup', label: '位置',minWidth:10},
              { prop: 'jieru', label: '接入点',minWidth:10},
              { prop: 'handle', label: '操作',slotName:'preview-handle',width:150},
            ],
            table_data:[],
        }
    },
	methods: {
        changeSearch:function(){
            this.changeInfo=this.search?'unfold':'shrink';
            this.search=!this.search;
        },
        //查询
        searchFN:function(){
            this.$refs.thisRef.searchHandler(false);
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
            })
        },
        //时间同步
        timeSync:function(){

        },
        //初始化
        initialize:function(){

        },
        //禁用
        disable:function(){

        },
        //新建
        add:function(){
            this.$router.push({name:'accessConfigAdd'});
        },
        edit:function(row){
            this.$router.push({name:'accessConfigAdd',query:{
                params:JSON.stringify({"id":row.id})
            }});
        },
        getIds:function(){
            let arr=[];
            let allSelect=this.$refs.thisRef.allSelection;
            for(let i=0;i<allSelect.length;i++){
                arr.push(allSelect[i].id);
            }
            return arr.toString();
        },
	},
    components: {
        
    }
}
</script>
