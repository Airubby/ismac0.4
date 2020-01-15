<template>
    <div class="bgfffcontent">
        <div class="breadcrumb">
            <breadcrumb class="breadcrumb-container" />
        </div>
        <div class="public_content pd20">
            <el-scrollbar class="scrollbar">
                <div class="card_title">
                    <span>基本信息</span>
                </div>
                <div class="mb20">
                    <el-form ref="form" :model="initParams" label-width="80px">
                        <el-row>
                            <el-col :span="8">
                                <el-form-item label="设备名称">
                                    是的法拉利
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="状态">
                                    是的法拉利
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="位置">
                                    是的法拉利
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="类型">
                                    是的法拉利
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="负责人">
                                    是的法拉利
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="维保期限">
                                    是的法拉利
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form>
                </div>
                <div class="card_title">
                    <span>监控信息</span>
                    <div class="fr">
                        <el-radio-group v-model="radio" size="mini">
                        <el-radio label="1" border>遥测</el-radio>
                        <el-radio label="2" border>遥信</el-radio>
                        <el-radio label="3" border>遥控</el-radio>
                        <el-radio label="4" border>遥调</el-radio>
                        </el-radio-group>
                    </div>
                </div>
                <el-table-pagination
                    :url="$ajaxUrl+'/getTable'"
                    list-field="data" 
                    total-field="total"
                    method='get' 
                    :showPagination="true"
                    :params="initParams"
                    :columns="table_columns" ref="thisRef">   
                    <template slot-scope="scope" slot="preview-name">
                        <p class="table_handle"><span @click="detail(scope.row)">{{scope.row.code}}</span></p>
                    </template>
                    <template slot-scope="scope" slot="preview-handle">
                        <p class="table_handle"><span @click="eyeon(scope.row)">关注</span><span @click="maintain(scope.row)">维护</span></p>
                    </template>
                </el-table-pagination>
            </el-scrollbar>
        </div>
        
    </div>
</template>

<script>
export default {
    created() {
        console.log(this.$route.params)
        let metaInfo= {
            title: "详情title",
            keywords: "详情keywords",
            description: "详情description"
        }
        this.$store.dispatch('changeMetaInfo',metaInfo)
    },
    mounted() {
        
    },
    data(){
        return{
            radio:"1",
            initParams:{
                guanzhu:'',
                type:"",
                name:'',
            },
            table_columns:[
              { prop: 'code', label: '测点名称',slotName:'preview-name',minWidth:10},
              { prop: 'type', label: '当前值',minWidth:10},
              { prop: 'indate', label: '有效值范围',minWidth:10},
              { prop: 'timegroup', label: '单位',minWidth:10},
              { prop: 'jieru', label: '描述',minWidth:10},
              { prop: 'zw', label: '测点分类',minWidth:10},
              { prop: 'handle', label: '操作',slotName:'preview-handle',width:120},
            ],
            table_data:[],
        }
    },
	methods: {
        

	},
    components: {
        
    },
    watch: {
        
    },
}
</script>
