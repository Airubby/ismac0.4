<template>
    <app-con>
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
                <span class="coma"><span class="comp">动态组件切换</span></span>
                <div style="width:150px" class="fr">
                    <el-select v-model="initParams.type" :placeholder='$t("hint.select")'>
                        <el-option label="event组件" value="event"></el-option>
                        <el-option label="record组件" value="record"></el-option>
                    </el-select>
                </div>
            </div>
            <div>
                <span>这是个本地组件</span>
                <DynamicComponent :pathUrl="`/access/status/${initParams.type}.vue`" pathType="local"></DynamicComponent>
            </div>
            <div>
                <DynamicComponent :pathUrl="`/template/${initParams.type}.vue`" :templateData="initParams" templateUrl="/template"></DynamicComponent>
                <DynamicCompileComponent :pathUrl="`/template/${initParams.type}.js`" :templateData="initParams" templateUrl="/template"></DynamicCompileComponent>
            </div>
        </div>
    </app-con>
</template>
<style lang="less" scoped>
    .coma{
        .comp{
            color: #f00;
        }
    }
</style>
<script>
import DynamicComponent from '@/components/DynamicComponent'
import DynamicCompileComponent from '@/components/DynamicCompileComponent'
export default {
    components: {
        DynamicComponent,DynamicCompileComponent
    },
    created() {
        
    },
    mounted() {
        
    },
    data(){
        return{
            activeName:'first',
            initParams:{
                type:"event",
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
       
    },
    watch:{
        
    }
    
}
</script>
