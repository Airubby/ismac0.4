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
                                <el-select v-model="initParams.guanzhu" clearable :placeholder='$t("hint.select")'>
                                    <el-option label="23" value="shanghai"></el-option>
                                    <el-option label="234" value="beijing"></el-option>
                                </el-select>
                            </div>
                            <div style="width:150px" class="fl ml10">
                                <el-select v-model="initParams.type" clearable :placeholder='$t("hint.select")'>
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
                        v-scrollBar="'table'"
                        :url="$ajaxUrl+'/getTable'"
                        list-field="data" 
                        total-field="total"
                        method='get' 
                        :highlight-current-row="true"
                        max-height="650"
                        :show-pagination="true"
                        :show-select-all="true"
                        :params="initParams"
                        @selection-change="selectChange"
                        @current-change="handleCurrentChange"
                        @select-all="selectAll"
                        :webSocketInfo="table_data"
                        :data="table_data"
                        @resultData="resultData"
                        row-key='id'
                        :columns="table_columns" ref="thisRef">   
                        <el-table-column slot="prepend" type="selection" align="center" :reserve-selection="true"></el-table-column>
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
        <!-- 本地数据设置v-if="table_data.length>0" -->
        <!-- <WebSocket :wsInfo="table_data" :sendInfo="{cmd:'alarm',changeSend:true}" :matchInfo="['value:state','isalarm:alarmstyle']"></WebSocket> -->
    </div>
</template>

<script>
import WebSocket from '@/components/WebSocket.vue'
export default {
    created() {
        
    },
    mounted() {
        let temp="breadcrumb"
        this.$nextTick(()=>{
            //异步默认设置勾选需写在$nextTick中
            this.$refs.thisRef.setSelect([{id:'2'},{id:'11'},{id:'23'}])
        })
        
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
              { prop: 'code', label: '设备名称',slotName:'preview-name'},
              { prop: 'type', label: '设备类型',sortable:true,width:"500px"},
              { prop: 'indate', label: '位置'},
              { prop: 'timegroup', label: '监控状态'},
              { prop: 'jieru', label: '告警状态'},
              { prop: 'handle', label: '操作',fixed:"right",slotName:'preview-handle',width:120},
            ],
            table_data:[
                // {code:"13",id:"1"},{code:"13",id:"2"},{code:"13",id:"3"},{code:"13",id:"4"},{code:"13",id:"5"},
                // {code:"13",id:"6"},{code:"13",id:"7"},{code:"13",id:"8"},{code:"13",id:"9"},{code:"13",id:"10"},
                // {code:"13",id:"11"},{code:"13",id:"12"},{code:"13",id:"13"},{code:"13",id:"14"},{code:"13",id:"15"},
                // {code:"13",id:"16"},{code:"13",id:"17"},{code:"13",id:"18"},{code:"13",id:"19"},{code:"13",id:"20"},
                // {code:"13",id:"21"},{code:"13",id:"22"},{code:"13",id:"23"},{code:"13",id:"24"},{code:"13",id:"25"}
            ],
            backSelect:{},
        }
    },
	methods: {
        //勾选框设置了 :reserve-selection="true"  就要绑定这个
        getRowKey:function(row){
            return row.id
        },
        
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
            console.log(selection)
            // if(selection.length>0){
            //     if(this.backSelect&&JSON.stringify(this.backSelect)!="{}"){
            //         for(let i=0;i<selection.length;i++){
            //             if(this.backSelect.id!=selection[i].id){
            //                 this.$refs.thisRef.clearSelect();
            //                 this.$refs.thisRef.setRowSelection(selection[i],true)
            //                 this.backSelect=selection[i];
            //             }
            //         }
            //     }else{
            //         this.backSelect=selection[0];
            //     }
                
            // }else{
            //     this.backSelect={};
            // }
        },
        handleCurrentChange(val){
            console.log(val)
            this.currentRow = val;
        },
        selectAll:function(selection){
            console.log(selection)
        },
        resultData:function(info){
            // this.$nextTick(()=>{
            //     this.$refs.thisRef.setSelect([{id:'2'},{id:'11'},{id:'23'}])
            // })
            //异步获取的时候用得到
            // this.table_data=info.data;
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
