<template>
    <div class="bgfffcontent">
        <div class="breadcrumb" id="template-box">
            <!-- <breadcrumb class="breadcrumb-container" /> -->
            <component :is="currentView"></component>
            <!-- <el-breadcrumb separator="/">
                <el-breadcrumb-item>{{$t("navbar.control")}}</el-breadcrumb-item>
                <el-breadcrumb-item>{{$t("navbar.controlDevState")}}</el-breadcrumb-item>
            </el-breadcrumb> -->
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
                            <div class="lc-data-value"><span class="dataValue test">8</span>个</div>
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div class="lc-data-con last-con">
                            <span class="lc-data-title">通讯不上的设备</span>
                            <div class="lc-data-value"><span class="dataValue test">8</span>个</div>
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
                    <el-table-pagination
                        :url="$ajaxUrl+'/getTable'"
                        list-field="data" 
                        total-field="total"
                        method='get' 
                        max-height="250"
                        :show-pagination="true"
                        :show-select-all="false"
                        :params="initParams"
                        @selection-change="selectChange"
                        @select-all="selectAll"
                        :webSocketInfo="table_data"
                        @resultData="resultData"
                        select-id="id"
                        :columns="table_columns" ref="thisRef">   
                        <el-table-column slot="prepend" type="selection"></el-table-column>
                        <template slot-scope="scope" slot="preview-name">
                            <p class="table_handle"><span @click="detail(scope.row)">{{scope.row.code}}</span></p>
                        </template>
                        <template slot-scope="scope" slot="preview-handle">
                            <p class="table_handle"><span @click="eyeon(scope.row,scope.$index)">关注</span><span @click="maintain(scope.row)">维护</span></p>
                        </template>
                    </el-table-pagination>
                </div>
            </el-scrollbar>
        </div>
        <WebSocket :wsInfo="table_data" :sendInfo="{cmd:'alarm',changeSend:true}" :matchInfo="['value:state','isalarm:alarmstyle']"></WebSocket>
    </div>
</template>

<script>
import WebSocket from '@/components/WebSocket.vue'
export default {
    created() {
        
    },
    mounted() {
        let temp="breadcrumb"
        this.$refs.thisRef.setSelect([{id:'2'}])
        this.currentView=temp;
    },
    data(){
        return{
            currentView:"",
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
            table_data:[{code:"13"}],
            backSelect:{},
        }
    },
	methods: {
        eyeon:function(row){
            this.$refs.thisRef.setSelect([this.backSelect])
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
            this.$refs.thisRef.searchHandler(true);
        },
        detail:function(row){
            this.$router.push({name:'controlDevStateDetail',query:{
                params:JSON.stringify({"id":row.id})
            }});
        },
        selectChange:function(selection){
            if(selection.length>0){
                if(this.backSelect&&JSON.stringify(this.backSelect)!="{}"){
                    for(let i=0;i<selection.length;i++){
                        if(this.backSelect.id!=selection[i].id){
                            this.$refs.thisRef.clearSelect();
                            this.$refs.thisRef.setRowSelection(selection[i],true)
                            this.backSelect=selection[i];
                        }
                    }
                }else{
                    this.backSelect=selection[0];
                }
                
            }else{
                this.backSelect={};
            }
        },
        selectAll:function(selection){
            console.log(selection)
        },
        resultData:function(info){
            this.table_data=info.data;
        },

	},
    components: {
        WebSocket
    },
    watch: {
        'initParams.type':function(val){
            this.searchFn();
        },
    },
}
</script>
