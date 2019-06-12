<template>
    <div class="bgfffcontent">
        <div class="breadcrumb">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>{{$t("navbar.access")}}</el-breadcrumb-item>
                <el-breadcrumb-item>{{$t("navbar.accessCardImpower")}}</el-breadcrumb-item>
                <el-breadcrumb-item>{{$t("hint."+hint)}}{{$t("access.card")}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="public_addcontent pd20">
            <el-scrollbar class="scrollbar">
                <el-form ref="form" :model="initParams" :rules="rules" label-width="80px" label-position="top">
                    <el-card class="box-card mb20">
                        <div slot="header" class="clearfix">
                            <span>基本信息</span>
                        </div>
                        <el-row :gutter="40">
                            <el-col :span="8">
                                <el-form-item label="卡号">
                                    <el-input v-model="initParams.code"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="领卡人">
                                    <el-input v-model="initParams.user"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="有效期">
                                    <el-date-picker
                                    v-model="initParams.time"
                                    type="datetimerange"
                                    range-separator="至"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期">
                                    </el-date-picker>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-card>
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span>权限分配</span>
                        </div>
                        <el-row :gutter="40">
                            <el-col :span="8">
                                <el-form-item label="类型">
                                    <el-select v-model="initParams.type" placeholder="请选择">
                                        <el-option label="超级卡" value="shanghai"></el-option>
                                        <el-option label="普通卡" value="beijing"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="时间组">
                                    <el-input v-model="initParams.timegroup"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="16">
                                <el-form-item label="开门范围" prop="range">
                                    <el-tree
                                    props="{
                                        label: 'name',
                                        children: 'children'
                                    }"
                                    :data="data"
                                    node-key="id"
                                    show-checkbox
                                    @check-change="handleCheckChange">
                                    </el-tree>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-card>
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span>权限分配</span>
                        </div>
                        <el-row :gutter="40">
                            <el-col :span="8">
                                <el-form-item label="类型">
                                    <el-select v-model="initParams.type" placeholder="请选择">
                                        <el-option label="超级卡" value="shanghai"></el-option>
                                        <el-option label="普通卡" value="beijing"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="时间组">
                                    <el-input v-model="initParams.timegroup"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="16">
                                <el-form-item label="开门范围" prop="range">
                                    <el-tree
                                    props="{
                                        label: 'name',
                                        children: 'children'
                                    }"
                                    :data="data"
                                    node-key="id"
                                    show-checkbox
                                    @check-change="handleCheckChange">
                                    </el-tree>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-card>
                </el-form>
            </el-scrollbar>
        </div>
        <publicBtnInfo v-on:publicSure="publicSure()"></publicBtnInfo>
    </div>
</template>

<script>
import publicBtnInfo from '@/components/publicBtnInfo.vue'
export default {
    created() {
        let params = this.$route.query.params;
        if(params){
            console.log(JSON.parse(params))
            this.hint="edit";
            this.getInfo(JSON.parse(params).id)
            console.log('编辑')
        }
    },
    mounted() {
        
    },
    data(){
        return{
            hint:'add',
            initParams:{
                code:'',
                type:'',
                user:'',
                indate:'',
                timegroup:'',
            },
            rules:{

            },
            data: [{
                id: 1,
                label: '一级 1',
                children: [{
                    id: 4,
                    label: '二级 1-1',
                    children: [{
                    id: 9,
                    label: '三级 1-1-1'
                    }, {
                    id: 10,
                    label: '三级 1-1-2'
                    }]
                }]
                }, {
                id: 2,
                label: '一级 2',
                children: [{
                    id: 5,
                    label: '二级 2-1'
                }, {
                    id: 6,
                    label: '二级 2-2'
                }]
            }],
        }
    },
	methods: {
        getInfo:function(id){
            console.log(id)
            this.$r.get("/getInfo",{model:{id:id}},r=>{
                console.log(r)
                if(r.err_code=='0'){
                    this.initParams=r.data;
                }else{
                    this.$message.warning(r.err_msg);
                }
            })
        },
        handleCheckChange:function(){
            
        },
        publicSure:function(){
            this.$refs['form'].validate((valid) => {
                if(valid){ //验证通过
                    this.loading=true;
                    this.$r.post('/update',{model:this.initParams}, r => {
                        console.log(r)
                        this.loading=false;
                        if(r.err_code=="0"){
                            this.$message.success(r.err_msg);
                        }else{
                            this.$message.warning(r.err_msg);
                        }
                    });
                }
            })
        }
	},
    components: {
        publicBtnInfo
    }
}
</script>
