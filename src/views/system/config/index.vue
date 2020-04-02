<template>
    <div class="bgfffcontent">
        <div class="breadcrumb">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>{{$t("navbar.system")}}</el-breadcrumb-item>
                <el-breadcrumb-item>{{$t("navbar.systemConfig")}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="public_content" id="template-box">
           
        </div>
    </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
export default {
    created() {
        
    },
    mounted() {
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
    destroyed(){

    },
    data(){
        return{
            
        }
    },
	methods: {
        
	},
    components: {
        
    }
}
</script>
