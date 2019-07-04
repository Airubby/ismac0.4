<template>
    <div class="bgfffcontent">
        <div class="breadcrumb">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>{{$t("navbar.control")}}</el-breadcrumb-item>
                <el-breadcrumb-item>{{$t("navbar.controlAlarmRecord")}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="public_content pd20">
            <el-row>
                <el-col :span="12"><el-input v-model="input" placeholder="请输入内容" ref="inp"></el-input></el-col>
                <el-col :span="12"><el-button type="primary" @click="copy">复制</el-button></el-col>
            </el-row>
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
            input:"123123123123123"
        }
    },
	methods: {
        copy:function(){
            this.$refs.inp.select();
            let flag=document.execCommand("copy");
            if(flag){
                this.$message.success("复制成功");
            }
        }
	},
    components: {
        
    }
}
</script>
