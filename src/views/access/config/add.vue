<template>
    <div class="bgfffcontent">
        <div class="breadcrumb">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>{{$t("navbar.access")}}</el-breadcrumb-item>
                <el-breadcrumb-item>{{$t("navbar.accessCardImpower")}}</el-breadcrumb-item>
                <el-breadcrumb-item>{{$t("hint."+hint)}}{{$t("access.dev")}}</el-breadcrumb-item>
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
                                <el-form-item label="设备名称">
                                    <el-input v-model="initParams.code"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="设备编码">
                                    <el-input v-model="initParams.user"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="安装位置">
                                    <el-input v-model="initParams.code"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="设备分类">
                                    <el-select v-model="initParams.type" :placeholder='$t("hint.select")'>
                                        <el-option label="运行中" value="shanghai"></el-option>
                                        <el-option label="未启用" value="beijing"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="维保期限">
                                    <el-date-picker
                                    v-model="initParams.time"
                                    type="datetimerange"
                                    range-separator="至"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期">
                                    </el-date-picker>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="负责人">
                                    <el-select v-model="initParams.type" :placeholder='$t("hint.select")'>
                                        <el-option label="23" value="shanghai"></el-option>
                                        <el-option label="234" value="beijing"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-card>
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span>通讯参数</span>
                        </div>
                        <el-row :gutter="40" v-if="tx">
                            <el-col :span="8">
                                <el-form-item label="门禁驱动">
                                    <el-select v-model="initParams.type" :placeholder='$t("hint.select")'>
                                        <el-option label="超级卡" value="shanghai"></el-option>
                                        <el-option label="普通卡" value="beijing"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="接入点">
                                    <el-select v-model="initParams.type" :placeholder='$t("hint.select")'>
                                        <el-option label="超级卡" value="shanghai"></el-option>
                                        <el-option label="普通卡" value="beijing"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="接口类型">
                                    <el-select v-model="initParams.type" :placeholder='$t("hint.select")'>
                                        <el-option label="超级卡" value="shanghai"></el-option>
                                        <el-option label="普通卡" value="beijing"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="采集通道" class="prelative">
                                    <div class="form_item">设置</div>
                                    <el-select v-model="initParams.type" :placeholder='$t("hint.select")'>
                                        <el-option label="超级卡" value="shanghai"></el-option>
                                        <el-option label="普通卡" value="beijing"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="通讯参数" class="prelative">
                                    <div class="form_item">设置</div>
                                    <el-select v-model="initParams.type" :placeholder='$t("hint.select")'>
                                        <el-option label="超级卡" value="shanghai"></el-option>
                                        <el-option label="普通卡" value="beijing"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row :gutter="40" v-if="!tx">
                            <el-col :span="8">
                                <el-form-item label="门禁驱动">
                                    <el-select v-model="initParams.type" :placeholder='$t("hint.select")'>
                                        <el-option label="超级卡" value="shanghai"></el-option>
                                        <el-option label="普通卡" value="beijing"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="IP地址">
                                    <el-input v-model="initParams.code"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="端口">
                                    <el-input v-model="initParams.code"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="设备序列号">
                                    <el-input v-model="initParams.code"></el-input>
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
            tx:true,
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
