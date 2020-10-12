<template>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" :label-width="labelWidth" :label-position="labelPosition" class="ruleForm">
        <el-row :gutter="rowGutter">
            <template v-for="item in ruleFormOpt">
                <el-col :span="colSpan">
                    <el-form-item :label="changeLanguage(item,'label')" :prop="item.field" :class="{'mb':item.type=='switch'||item.type=='radio'}">
                        <el-input v-model="ruleForm[item.field]" :placeholder="changeLanguage(item,'placeholder')" v-if="item.type=='input'"></el-input>
                        <el-input type="textarea" v-model="ruleForm[item.field]" :placeholder="changeLanguage(item,'placeholder')" v-if="item.type=='textarea'"></el-input>
                        <el-input type="password" v-model="ruleForm[item.field]" :placeholder="changeLanguage(item,'placeholder')" v-if="item.type=='password'"></el-input>
                        <el-switch v-model="ruleForm[item.field]" v-if="item.type=='switch'"></el-switch>
                        <el-select v-model="ruleForm.region" :placeholder="changeLanguage(item,'placeholder')" v-if="item.type=='select'">
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
                        <el-time-picker
                            v-if="item.type=='timePicker'"
                            v-model="ruleForm[item.field]"
                            :is-range="item.options.isRange"
                            :picker-options="item.options.pickerOptions"
                            :placeholder="changeLanguage(item,'placeholder')">
                        </el-time-picker>
                    </el-form-item>
                </el-col>
            </template>
        </el-row>
        <slot></slot>
    </el-form>
</template>
<style lang="less" scoped>
    .mb {
        /deep/ .el-form-item__content{
            margin-bottom: 1px;
        }
    }
</style>
<script>
import { mapGetters } from 'vuex'
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
    computed:{
        ...mapGetters([
            'language'
        ]),
    },
    created () {
        this.InitRuleForm();
    },
    mounted() {
        
    },
    data() {
        return {
            ruleForm:{},
            rules:{}
       }
    },
    methods:{
        InitRuleForm:function(){
            for(let i=0;i<this.ruleFormOpt.length;i++){
                if(this.ruleFormOpt[i].options){
                    this.ruleFormOpt[i].options.api&&this.getFormData(this.ruleFormOpt[i]);
                    if(this.ruleFormOpt[i].options.rules){
                        this.$set(this.rules,this.ruleFormOpt[i].field,JSON.parse(JSON.stringify(this.ruleFormOpt[i].options.rules)));
                        if(this.ruleFormOpt[i].options.languageChange){
                            for(let j=0;j<this.rules[this.ruleFormOpt[i].field].length;j++){
                                this.rules[this.ruleFormOpt[i].field][j].message&&( this.rules[this.ruleFormOpt[i].field][j].message=this.$t(this.ruleFormOpt[i].options.rules[j].message));
                                this.rules[this.ruleFormOpt[i].field][j].reqMessage&&(this.rules[this.ruleFormOpt[i].field][j].reqMessage=this.$t(this.ruleFormOpt[i].options.rules[j].reqMessage));
                                this.rules[this.ruleFormOpt[i].field][j].ruleMessage&&(this.rules[this.ruleFormOpt[i].field][j].ruleMessage=this.$t(this.ruleFormOpt[i].options.rules[j].ruleMessage));
                            }
                        }
                    }
                }
                let value="";
                if(this.ruleFormOpt[i].value){
                    value=this.ruleFormOpt[i].value;
                }else{
                    if(this.ruleFormOpt[i].type=='checkbox'){
                        value=[];
                    }
                    if(this.ruleFormOpt[i].type=='timePicker'&&this.ruleFormOpt[i].options&&this.ruleFormOpt[i].options.isRange){
                        value=null;
                    }
                }
                this.$set(this.ruleForm,this.ruleFormOpt[i].field,value);
                
            }
        },
        getFormData:function(opt){
            let params=opt.options.params?opt.options.params:{}
            this.$api.post(opt.options.api,params).then(res=>{
                if(res.code==200){
                    this.$set(opt,"children",res.data)
                }
            })
        },
        changeLanguage:function(opt,key){
            if(opt.options&&opt.options.languageChange){
                return this.$t(opt[key])
            }
            return opt[key];
        },
        resetRule:function(){
            for(let i=0;i<this.ruleFormOpt.length;i++){
                if(this.ruleFormOpt[i].options&&this.ruleFormOpt[i].options.rules&&this.ruleFormOpt[i].options.languageChange){
                    for(let j=0;j<this.rules[this.ruleFormOpt[i].field].length;j++){
                        this.rules[this.ruleFormOpt[i].field][j].message&&( this.rules[this.ruleFormOpt[i].field][j].message=this.$t(this.ruleFormOpt[i].options.rules[j].message));
                        this.rules[this.ruleFormOpt[i].field][j].reqMessage&&(this.rules[this.ruleFormOpt[i].field][j].reqMessage=this.$t(this.ruleFormOpt[i].options.rules[j].reqMessage));
                        this.rules[this.ruleFormOpt[i].field][j].ruleMessage&&(this.rules[this.ruleFormOpt[i].field][j].ruleMessage=this.$t(this.ruleFormOpt[i].options.rules[j].ruleMessage));
                    }
                }
            }
        }
    },
    watch:{
        language:function(){
            this.resetRule();
        }
    },
    
}
</script>

<style scoped lang="less">

</style>