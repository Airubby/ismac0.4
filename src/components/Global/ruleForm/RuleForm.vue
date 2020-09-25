<template>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" :label-width="labelWidth" :label-position="labelPosition" class="ruleForm">
        <el-row :gutter="rowGutter">
            <template v-for="item in ruleFormOpt">
                <el-col :span="colSpan">
                    <el-form-item :label="item.label" :prop="item.field" :class="{'mb':item.type=='switch'||item.type=='radio'}">
                        <el-input v-model="ruleForm[item.field]" :placeholder="item.placeholder" v-if="item.type=='input'"></el-input>
                        <el-input type="textarea" v-model="ruleForm[item.field]" :placeholder="item.placeholder" v-if="item.type=='textarea'"></el-input>
                        <el-input type="password" v-model="ruleForm[item.field]" :placeholder="item.placeholder" v-if="item.type=='password'"></el-input>
                        <el-switch v-model="ruleForm[item.field]" v-if="item.type=='switch'"></el-switch>
                        <el-select v-model="ruleForm.region" :placeholder="item.placeholder" v-if="item.type=='select'">
                            <template v-for="selectItem in item.children">
                                <el-option :label="selectItem.label" :value="selectItem.value"></el-option>
                            </template>
                        </el-select>
                        <el-checkbox-group v-model="ruleForm[item.field]" v-if="item.type=='checkbox'">
                            <template v-for="checkboxItem in item.children">
                                <el-checkbox :label="checkboxItem.value" :name="item.field">{{checkboxItem.label}}</el-checkbox>
                            </template>
                        </el-checkbox-group>
                        <el-radio-group v-model="ruleForm[item.field]" v-if="item.type=='radio'">
                            <template v-for="radioItem in item.children">
                                <el-radio :label="radioItem.value">{{radioItem.label}}</el-radio>
                            </template>
                        </el-radio-group>
                    </el-form-item>
                </el-col>
            </template>
        </el-row>
        
    </el-form>
</template>
<style lang="less" scoped>
    .mb {
        /deep/ .el-form-item__content{
            margin-bottom: 1px;
        }
    }
    // .ruleForm{
    //     /deep/ .el-form--label-top .el-form-item__label{
    //         padding: 0;
    //     }
    // }
</style>
<script>
export default {
    name:'RuleForm',
    props:{
        ruleFormOpt:{
            type:Array,
            required: true,
            default:function(){
                return []
            }
        },
        labelWidth:{
            type: String,
            default:"100px"
        },
        labelPosition:{
            type:String,
            default:"top"  //left,right,top
        },
        rowGutter:{
            style:Number,
            default:20
        },
        colSpan:{
            style:Number,
            default:12
        }
    },
    components:{},
    created () {
        this.InitRuleForm();
    },
    mounted() {
        
    },
    data() {
        return {
            ruleForm:{
                name:"",
                region:""
            },
            rules:{

            }
       }
    },
    methods:{
        InitRuleForm:function(){
            for(let i=0;i<this.ruleFormOpt.length;i++){
                let value=this.ruleFormOpt[i].value?this.ruleFormOpt[i].value:(this.ruleFormOpt[i].type=='checkbox'?[]:"");
                this.$set(this.ruleForm,this.ruleFormOpt[i].field,value);
            }
            console.log(this.ruleForm)
        }
    },
    watch:{
        
    },
    
}
</script>

<style scoped lang="less">

</style>