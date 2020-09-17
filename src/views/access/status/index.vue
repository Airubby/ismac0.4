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
                <span>动态组件切换</span>
                <div style="width:150px" class="fr">
                    <el-select v-model="initParams.type" :placeholder='$t("hint.select")'>
                        <el-option label="event组件" value="event"></el-option>
                        <el-option label="record组件" value="record"></el-option>
                    </el-select>
                </div>
            </div>
            <div>
                <component is="currentTabComponent"></component>
            </div>
        </div>
    </app-con>
</template>

<script>
import Vue from 'vue'
export default {
    components: {
        
    },
    created() {
        this.getComponent()
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
        getComponent(){
            let _this=this;
            // Vue.component('currentTabComponent', function (resolve) {
            //     // 这个特殊的 `require` 语法将会告诉 webpack
            //     // 自动将你的构建代码切割成多个包，这些包
            //     // 会通过 Ajax 请求加载
            //     require(['./'+_this.initParams.type], resolve)
            // })
            Vue.component(
                'currentTabComponent',
                // 这个动态导入会返回一个 `Promise` 对象。
                () => import('./'+_this.initParams.type)
            )
        }
    },
    watch:{
        'initParams.type':function(val){
            this.getComponent();
        }
    }
    
}
</script>
