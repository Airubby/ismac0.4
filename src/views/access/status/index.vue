<template>
    <app-con>
        <div id="template-box"></div>
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
import axios from 'axios'
import DynamicComponent from '@/components/DynamicComponent'
import DynamicCompileComponent from '@/components/DynamicCompileComponent'
export default {
    components: {
        DynamicComponent,DynamicCompileComponent
    },
    created() {
        //动态获取模板展示
        axios.get('/template/test.html').then(data => {
            console.log(data);
            console.log(data.data)
            let res=data.data;
            let arr=res.split("<script>")
            let dom=document.querySelector("#template-box");
            dom.innerHTML=arr[0];
            if(arr.length>1){
                let js=arr[1].split("<\/script>")[0];
                let script = document.createElement('script')
                script.type = "text/javascript"
                script.id = "template-script"
                script.text = js
                document.getElementsByTagName('body')[0].appendChild(script)
            }
        })
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
