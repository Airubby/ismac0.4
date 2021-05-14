<template>
    <el-dialog title="测点信息" :visible.sync="dialogInfo.visible" width="900px" v-dialogDrag :close-on-click-modal="false" :append-to-body="true">
        <el-scrollbar style="height:400px;" class="scrollbar">
            <div class="dialog-content">
                <el-table-pagination 
                    type="local" 
                    :showPagination="true"
                    :showSelectAll="true"
                    :data="tableData"
                    :columns="tableColumns" ref="thisRef" >
                    <el-table-column slot="prepend" type="selection"></el-table-column>
                    <template slot-scope="scope" slot="preview-datachar">
                        <span v-if="scope.row.pointtype=='1'">
                            {{$t("control.Analogy")}}
                        </span>
                        <span v-else-if="scope.row.pointtype=='2'">
                            {{$t("control.Digital")}}
                        </span>
                        <span v-else-if="scope.row.pointtype=='3'">
                            {{$t("control.CommStatus")}}
                        </span>
                    </template>
                    <template slot-scope="scope" slot="preview-unit">
                        <span>
                            <el-input v-model="scope.row.units"></el-input>
                        </span>
                    </template>
                    <template slot-scope="scope" slot="preview-state">
                        <span style="height:40px">
                            <el-select v-model="scope.row.pointstate">
                                <el-option
                                    v-for="item in $store.getters.devInfo"
                                    :key="item.devcode"
                                    :label='$t("public."+item.devname)'
                                    :value="item.devcode">
                                </el-option>
                            </el-select>
                        </span>
                    </template>
                    <template slot-scope="scope" slot="preview-hisenable">
                        <span style="height:40px">
                            <el-switch
                                style="display: block"
                                v-model="scope.row.hisenable"
                                active-color="#4A78FF"
                                inactive-color="#6C7A8C"
                                active-value="1"
                                inactive-value="0"
                                :active-text='$t("hint.yes")'
                                :inactive-text='$t("hint.no")'>
                            </el-switch>
                        </span>
                    </template>
                </el-table-pagination>
            </div>
        </el-scrollbar>
        <dialog-btn :dialogInfo="dialogInfo" @dialogSure="dialogSure()"></dialog-btn>
    </el-dialog>
</template>

<script>
export default {
    created() {
        this.getInfo()
    },
    mounted() {
        
    },
    data(){
        return{
            loading:false,
            initParams:{
                id:""
            },
            tableColumns:[
                { prop: 'pointname', label: "测点名称",minWidth:10},
                { prop: 'pointtype', label: "测点类型",minWidth:10,slotName:'preview-datachar'},
                { prop: 'units', label: "单位",minWidth:10,slotName:'preview-unit'},
                { prop: 'pointstate', label:  "状态",minWidth:10,slotName:'preview-state'},
            ],
            tableData:[],
        }
    },
	methods: {
        getInfo:function(){
            
            this.$r.post('/control/templte/querypoint',{id:this.dialogInfo.tempid}, r => {
                console.log(r)
                if(r.err_code=="0"){
                    this.tableData=r.data;
                }else{
                    this.$message.warning(r.err_msg);
                }
            });
        },
        selectChange:function(selection){
            console.log(selection)
        },
        //保存的操作
        dialogSure:function(){
            if(this.$refs.thisRef.allSelection.length>0){
                this.$emit("backInfo",this.$refs.thisRef.allSelection);
                this.dialogInfo.visible=false;
            }else{
                this.$message.warning(this.$t("hint.select"));
            }
        },
        handleCheckChange:function(){
            
        }
	},
    props:["dialogInfo"]
}
</script>
