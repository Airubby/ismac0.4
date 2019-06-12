<template>
    <div class="bgfffcontent">
        <div class="breadcrumb">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>{{$t("navbar.access")}}</el-breadcrumb-item>
                <el-breadcrumb-item>{{$t("navbar.accessCardImpower")}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="public_content pd20">
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
                                    <el-option label="区域一" value="shanghai"></el-option>
                                    <el-option label="区域二" value="beijing"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <div class="md20">
                                <el-button type="primary">查询</el-button>
                                <el-button>重置</el-button>
                                <el-button type="text" @click="changeSearch">{{changeInfo}}</el-button>
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
                            <el-form-item label="领卡人">
                                <el-input v-model="initParams.timegroup"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    
                </el-form>
            </div>
            <div class="table_btn">
                <el-button type="primary" icon="el-icon-plus">新建</el-button>
                <el-button>批量删除</el-button>
                <el-button @click="assignment">权限分配</el-button>
                <el-button>权限清除</el-button>
            </div>
            <el-search-table-pagination
                :url="$ajaxUrl+'/getTable'"
                list-field="data" 
                total-field="total"
                method='get' 
                :params="initParams"
                :showPagination="false"
                :showSelectAll="true"
                :columns="table_columns" ref="thisRef">   
                <el-table-column slot="prepend" type="selection"></el-table-column>
                <template slot-scope="scope" slot="preview-handle">
                    <span @click="postFn">post提交</span>
                </template>
            </el-search-table-pagination>
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
            changeInfo:'展开',
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
              { prop: 'indate', label: '有效期',minWidth:10},
              { prop: 'timegroup', label: '时间组',minWidth:10},
              { prop: 'handle', label: '操作',slotName:'preview-handle',width:100},
            ],
            table_data:[],
            assignmentInfo:{
                visible:false
            }
        }
    },
	methods: {
        changeSearch:function(){
            this.changeInfo=this.search?'展开':'收缩';
            this.search=!this.search;
        },
        //权限分配
        assignment:function(){
            this.assignmentInfo.visible=true;
        },
	},
    components: {
        assignment
    }
}
</script>
