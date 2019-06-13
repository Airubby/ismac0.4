<template>
    <div class="bgfffcontent">
        <div class="breadcrumb">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>{{$t("navbar.access")}}</el-breadcrumb-item>
                <el-breadcrumb-item>{{$t("navbar.accessStatus")}}</el-breadcrumb-item>
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
                <div class="pd20 ">
                    <div class="card_title">
                        <span>门状态</span>
                        <div style="width:150px" class="fr">
                            <el-select v-model="initParams.type" :placeholder='$t("hint.select")'>
                                <el-option label="23" value="shanghai"></el-option>
                                <el-option label="234" value="beijing"></el-option>
                            </el-select>
                        </div>
                    </div>
                    <el-search-table-pagination
                        :url="$ajaxUrl+'/getTable'"
                        list-field="data" 
                        total-field="total"
                        method='get' 
                        :showPagination="true"
                        :params="initParams"
                        :columns="table_columns" ref="thisRef">   
                        <template slot-scope="scope" slot="preview-handle">
                            <p class="table_handle"><span @click="openDoor(scope.row)">开门</span><span @click="closeDoor(scope.row)">关门</span></p>
                        </template>
                    </el-search-table-pagination>
                    <el-tabs v-model="activeName">
                        <el-tab-pane label="进出记录" name="first">
                            <record></record>
                        </el-tab-pane>
                        <el-tab-pane label="异常事件" name="second">
                            <event></event>
                        </el-tab-pane>
                    </el-tabs>
                </div>
            </el-scrollbar>
        </div>
    </div>
</template>

<script>
import event from './event.vue'
import record from './record.vue'
export default {
    created() {
        
    },
    mounted() {
        
    },
    data(){
        return{
            activeName:'first',
            initParams:{
                type:"",
            },
            table_columns:[
              { prop: 'code', label: '编号',minWidth:10},
              { prop: 'type', label: '名称',minWidth:10},
              { prop: 'indate', label: '状态',minWidth:10},
              { prop: 'timegroup', label: '所属设备',minWidth:10},
              { prop: 'handle', label: '操作',slotName:'preview-handle',width:150},
            ],
            table_data:[],
        }
    },
	methods: {
        openDoor:function(row){
            this.$r.get("/open",{model:{id:row.id}},r=>{
                console.log(r)
                if(r.err_code=='0'){
                    this.$message.success(r.err_msg);
                }else{
                    this.$message.warning(r.err_msg);
                }
            })
        },
        closeDoor:function(row){
            this.$r.get("/close",{model:{id:row.id}},r=>{
                console.log(r)
                if(r.err_code=='0'){
                    this.$message.success(r.err_msg);
                }else{
                    this.$message.warning(r.err_msg);
                }
            })
        },
	},
    components: {
        event,record
    }
}
</script>
