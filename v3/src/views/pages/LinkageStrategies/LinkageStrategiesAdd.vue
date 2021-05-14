<template>
    <div class="content">
        <div class="relative-content">
            <el-scrollbar class="scrollbar">
                <div class="scrollbar-content">
                    <el-button type="primary" plain @click="$router.back(-1)">返回</el-button>
                    <el-form ref="ValidateForm" :model="initParams" :rules="rules" label-position="top" class="form-box">
                        <div class="card_title">
                            <div class="title">基本信息</div>
                        </div>
                        <el-row :gutter="30">
                            <el-col :span="8">
                                <el-form-item label='策略名称' prop="name">
                                    <el-input v-model="initParams.name"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label='有效期' prop="name">
                                    <el-date-picker
                                    v-model="initParams.name"
                                    type="datetimerange"
                                    format="yyyy-MM-dd HH:mm:ss"
                                    value-format="yyyy-MM-dd HH:mm:ss"
                                    range-separator="~"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期">
                                    </el-date-picker>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label='状态' prop="type">
                                    <el-radio-group v-model="initParams.type">
                                        <el-radio :label="1">启用</el-radio>
                                        <el-radio :label="2">停用</el-radio>
                                    </el-radio-group>
                                </el-form-item>
                            </el-col>
                            <el-col :span="16">
                                <el-form-item label='描述' prop="name">
                                    <el-input v-model="initParams.name"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label='触发类型' prop="type">
                                    <el-radio-group v-model="initParams.type">
                                        <el-radio :label="1">定时</el-radio>
                                        <el-radio :label="2">实时</el-radio>
                                    </el-radio-group>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <div class="card_title" v-if="initParams.type==1">
                            <div class="title">触发器参数</div>
                        </div>
                        <div class="type-more" v-if="initParams.type==1">
                            <span>每隔：</span>
                            <el-form-item prop="name" class="type-item">
                                <el-input v-model="initParams.name"></el-input>
                            </el-form-item>
                            <el-form-item prop="name" class="type-item">
                                <el-select v-model="initParams.name" placeholder="请选择">
                                    <el-option label="秒" value="1"></el-option>
                                    <el-option label="分钟" value="2"></el-option>
                                    <el-option label="小时" value="3"></el-option>
                                    <el-option label="日" value="4"></el-option>
                                    <el-option label="周" value="5"></el-option>
                                </el-select>
                            </el-form-item>
                            <span>
                                触发一次，首次执行时间：
                            </span>
                            <div>
                                <el-date-picker
                                    v-model="initParams.name"
                                    type="datetime"
                                    format="yyyy-MM-dd HH:mm:ss"
                                    value-format="yyyy-MM-dd HH:mm:ss">
                                </el-date-picker>
                            </div>
                        </div>
                    </el-form>
                    <el-tabs v-model="activeName" class="content">
                        <el-tab-pane label='事件' name="first" class="content">
                            <event v-if="activeName=='first'"></event>
                        </el-tab-pane>
                        <el-tab-pane label='动作' name="second" class="content">
                            <action v-if="activeName=='second'"></action>
                        </el-tab-pane>
                    </el-tabs>
                </div>
            </el-scrollbar>
        </div>
        <handle-btn @handleClick="handleSure()" class="box-btn"></handle-btn>
    </div>
</template>
<script>
import Event from './component/Event'
import Action from './component/Action'
export default {
    components: {Event,Action},
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
                name:"",
                type:1,
            },
            rules:{

            },
            activeName:"first"
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
            margin-right: @boxMargin;
            float: right;
        }
        .content{
            padding: 0;
        }
        .relative-content{
            width: 100%;
            height: calc(100% - 45px);
            position: relative;
            .scrollbar-content{
                padding: 15px 15px 0;
            }
        }
        .form-box{
            margin-bottom: @boxMargin;
        }
        .type-more{
            display: flex;
            align-items: center;
            .type-item{
                width:100px;
                margin-right:5px;
                margin-bottom: 0;
            }
        }
    }
</style>