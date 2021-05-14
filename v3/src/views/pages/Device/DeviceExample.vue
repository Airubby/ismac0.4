<template>
    <div class="content">
        <el-button type="primary" plain @click="$router.back(-1)">返回</el-button>
        <el-form ref="ValidateForm" :model="initParams" :rules="rules" label-position="top" class="form-box">
            <div class="card_title">
                <div class="title">基本信息</div>
            </div>
            <el-row :gutter="30">
                <el-col :span="8">
                    <el-form-item label='设备模板' prop="name">
                        <el-input v-model="initParams.name" disabled></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label='设备名' prop="name">
                        <el-input v-model="initParams.name" placeholder="设备名称"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label='设备编码' prop="name">
                        <el-input v-model="initParams.name"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label='安装位置' prop="name">
                        <el-input v-model="initParams.name"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label='维保期限' prop="name">
                        <el-date-picker
                            type="datetimerange"
                            v-model="initParams.name"
                            format="yyyy-MM-dd HH:mm:ss"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            range-separator='~'
                            start-placeholder='开始时间'
                            end-placeholder='结束时间'
                            >
                        </el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label='负责人' prop="name">
                        <el-input v-model="initParams.name"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <div class="card_title">
                <div class="title">通讯参数</div>
            </div>
            <el-row :gutter="30">
                <el-col :span="8">
                    <el-form-item label='接入点' prop="name">
                        <el-select v-model="initParams.name" placeholder="请选择">
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label='接口类型' prop="name">
                        <el-select v-model="initParams.name" placeholder="请选择">
                            <el-option key="1" label="类型" value="1"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label='协议驱动' prop="name">
                        <el-select v-model="initParams.name" placeholder="请选择">
                            <el-option key="1" label="类型" value="1"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label='通道参数' prop="name">
                        <el-input v-model="initParams.name"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label='通讯地址' prop="name">
                        <el-input v-model="initParams.name"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <handle-btn @handleClick="handleSure()" class="box-btn"></handle-btn>
        </el-form>
    </div>
</template>
<script>
export default {
    components: {},
    mixins:[],
    filters:{
        
    },
    created() {
        
    },
    mounted() {
        
    },
    data(){
        return{
            initParams:{
                name:""
            },
            rules:{

            }
        }
    },
    computed: {
    },
	methods: {
        //保存的操作
        handleSure:function(){
            this.$refs['ValidateForm'].validate((valid) => {
                if(valid){ //验证通过
                    
                }
            })
        },
	},
    
}
</script>
<style lang="less" scoped>
    .module-theme(...){
        .card_title{
            margin-top: @boxMargin;
            margin-bottom: @itemMargin;
        }
        .box-btn{
            margin-bottom: @boxMargin;
            float: right;
        }
        .relative-content{
            width: 100%;
            height: 100%;
            position: relative;
        }
    }
</style>