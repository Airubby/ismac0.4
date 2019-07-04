<template>
    <div class="bgfffcontent">
        <div class="breadcrumb">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>{{$t("navbar.control")}}</el-breadcrumb-item>
                <el-breadcrumb-item>{{$t("navbar.controlDevState")}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="public_content">
            <el-scrollbar class="scrollbar">
                <el-row>
                    <el-col :span="8">
                        <div class="lc-data-con">
                            <span class="lc-data-title">接入设备总数</span>
                            <div class="lc-data-value"><span class="dataValue">8</span>个</div>
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div class="lc-data-con">
                            <span class="lc-data-title">告警中的设备</span>
                            <div class="lc-data-value"><span class="dataValue">8</span>个</div>
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div class="lc-data-con last-con">
                            <span class="lc-data-title">通讯不上的设备</span>
                            <div class="lc-data-value"><span class="dataValue">8</span>个</div>
                        </div>
                    </el-col>
                </el-row>
                <div class="color-mg20"></div>
                <div class="pd20">
                    <div class="card_title">
                        <span>设备列表</span>
                        <div class="fr">
                            <div style="width:150px" class="fl ml10">
                                <el-select v-model="initParams.guanzhu" :placeholder='$t("hint.select")'>
                                    <el-option label="23" value="shanghai"></el-option>
                                    <el-option label="234" value="beijing"></el-option>
                                </el-select>
                            </div>
                            <div style="width:150px" class="fl ml10">
                                <el-select v-model="initParams.type" :placeholder='$t("hint.select")'>
                                    <el-option label="23" value="shanghai"></el-option>
                                    <el-option label="234" value="beijing"></el-option>
                                </el-select>
                            </div>
                            <div style="width:250px" class="fl ml10">
                                <el-input v-model="initParams.search">
                                    <i slot="suffix" class="el-input__icon el-icon-search" @click="searchFn"></i>
                                </el-input>
                            </div>
                            
                        </div>
                    </div>
                    <el-search-table-pagination
                        :url="$ajaxUrl+'/getTable'"
                        list-field="data" 
                        total-field="total"
                        method='get' 
                        :showPagination="true"
                        :showSelectAll="true"
                        :params="initParams"
                        :columns="table_columns" ref="thisRef">   
                        <el-table-column slot="prepend" type="selection"></el-table-column>
                        <template slot-scope="scope" slot="preview-name">
                            <p class="table_handle"><span @click="detail(scope.row)">{{scope.row.code}}</span></p>
                        </template>
                        <template slot-scope="scope" slot="preview-handle">
                            <p class="table_handle"><span @click="eyeon(scope.row)">关注</span><span @click="maintain(scope.row)">维护</span></p>
                        </template>
                    </el-search-table-pagination>
                </div>
            </el-scrollbar>
        </div>
        
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
            search:'',
            initParams:{
                guanzhu:'',
                type:"",
                name:'',
            },
            table_columns:[
              { prop: 'code', label: '设备名称',slotName:'preview-name',minWidth:10},
              { prop: 'type', label: '设备类型',minWidth:10},
              { prop: 'indate', label: '位置',minWidth:10},
              { prop: 'timegroup', label: '监控状态',minWidth:10},
              { prop: 'jieru', label: '告警状态',minWidth:10},
              { prop: 'handle', label: '操作',slotName:'preview-handle',width:120},
            ],
            table_data:[],
        }
    },
	methods: {
        eyeon:function(row){
            this.$r.post("/eyeon",{model:{id:row.id}},r=>{
                console.log(r)
            })
        },
        maintain:function(row){
            this.$r.post("/maintain",{model:{id:row.id}},r=>{
                console.log(r)
            })
        },
        searchFn:function(){
            this.$refs.thisRef.searchHandler(false);
        },
        detail:function(row){
            this.$router.push({name:'controlDevStateDetail',query:{
                params:JSON.stringify({"id":row.id})
            }});
        },

	},
    components: {
        
    },
    watch: {
        'initParams.type':function(val){
            this.searchFn();
        },
    },
}
</script>
