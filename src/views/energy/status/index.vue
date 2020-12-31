<template>
    <div class="bgfffcontent">
        <div class="breadcrumb">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>{{$t("navbar.energy")}}</el-breadcrumb-item>
                <el-breadcrumb-item>{{$t("navbar.energyStatus")}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="public_content">
            <el-scrollbar class="scrollbar">
            <div class="pd20">
                <h2>form表单中循环展示的验证问题及监听问题</h2>
                <el-form :model="dynamicValidateForm" :rules="rules" @submit.native.prevent ref="ValidateForm" label-width="100px" class="demo-dynamic">
                    <el-form-item prop="obj.email" label="邮箱">
                        <el-input v-model="dynamicValidateForm.obj.email"></el-input>
                    </el-form-item>
                    <el-form-item
                        v-for="(item, index) in dynamicValidateForm.other.domains"
                        :label="'域名' + index"
                        :key="item.key"
                        :prop="'other.domains[' + index + '].value'"
                        >
                        <el-input v-model="item.value"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm()">提交</el-button>
                        <el-button @click="resetForm()">重置(要给prop属性才可以重置)</el-button>
                    </el-form-item>
                </el-form>
                <div class="pt20">监听多个属性任意一个改变都去验证其它的属性问题；用computed中return多个属性，watch中this.$refs['ValidateForm'].validate();</div>
                <div class="pt20">@submit.native.prevent解决el-input回车刷新页面;@click.stop 阻止点击冒泡</div>
                <div class="pt20">
                    <h2>组件管道</h2>
                    {{message | capitalize(thisVue)}}
                </div>
                <div class="pt20">
                    <h2>webSocket及验证封装</h2>
                    <el-form :model="ValidateForm" :rules="rulesForm" ref="Form">
                        <el-form-item prop="phone" label="手机验证">
                            <el-input v-model="ValidateForm.phone"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="submitFormT()">提交</el-button>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="pt20">
                    <h2>属性问题</h2>
                    <div>
                        <p>判断对象是否有某个属性：obj.hasOwnProperty('name')  //true 自身属性</p>
                        <p>获取dom距离浏览器左侧及头部的距离：document.getElementById(ID).getBoundingClientRect()</p>
                        <p>说明：width:dom宽度；left:dom左侧距离浏览器左边的距离；right:dom右侧距离浏览左边的距离；x:距离浏览器左边的距离</p>
                    </div>
                </div>
                <div class="pt20">
                    <h2>时间间隔内连续变化不刷新</h2>
                    <div>
                        <pre>
                            flush:function(){
                                let _this=this;
                                clearTimeout(timer);
                                this.timer=null;
                                if(this.lastTime==null){
                                    console.log("刷新")
                                }else{
                                    let lastTime=new Date();
                                    if(lastTime.getTime()-this.lastTime.getTime()>1000){ //时间超过了一秒
                                        console.log("刷新")
                                    }else{
                                        this.timer=setTimeout(() => {
                                            _this.flush();
                                        }, 1000);
                                    }
                                }
                                this.lastTime=new Date();
                            }
                        </pre>
                    </div>
                </div>
            </div>
            </el-scrollbar>
        </div>
        <WebSocket :wsInfo="wsData" :sendInfo='{cmd:"subdata",returnFn:true,changeSend:true}' @backInfo="backInfo"></WebSocket>
    </div>
</template>

<script>
import Rules from "@/utils/Rules"
import WebSocket from "@/components/WebSocket"
export default {
    components: {
        WebSocket
    },
    filters:{
        capitalize: function (value,_this) {
            if (!value) return ''
            value = value.toString()
            return value.charAt(0).toUpperCase() + value.slice(1)+"-----"+_this.filtersInfo
        }
    },
    created() {
        
    },
    mounted() {
        this.wsData=[{"devid":"01"}]
    },
    computed:{
        email:function(){
            return this.dynamicValidateForm.other.domains[0].value;
        },
        changeValue:function(){
            return {
                value:this.initParams.value,
                number:this.initParams.number,
                index:this.initParams.index,
            }
        }
    },
    data(){
        return{
            //多个属性同时监听的问题；
            initParams:{
                value:"",
                number:"",
                index:"",
            },
            thisVue:this,
            message:"assasas",
            filtersInfo:"filters中获取this属性",
            dynamicValidateForm: {
                other:{
                    flag:true,
                    domains: [
                        {value: ''},{value: ''}
                    ],
                },
                obj:{
                    email: ''
                }
            },
            rules:{
                // type: 'array'；type:"date";type:"email"
                'obj.email':[
                    { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                    { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
                ],
                'other.domains[1].value':[
                    {required: true, message: '域名不能为空', trigger: 'blur'}
                ],
                'other.domains[0].value':[
                    {required: true, message: '域名不能为空', trigger: 'blur'}
                ]
            },
            ValidateForm:{
                phone:"",   
            },
            rulesForm:{
                phone:[
                    { required: true, trigger: ['blur', 'change'] ,reqMessage:"不能为空",ruleMessage:"手机格式错误",validator: Rules.checkPhone},
                ],
            },
            wsData:[],
            timer:null,
            lastTime:null,
        }
    },
	methods: {
        submitFormT:function(){
            this.$refs['Form'].validate((valid) => {
                if (valid) {
                    console.log(this.dynamicValidateForm)
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs['ValidateForm'].resetFields();
        },
        submitForm(formName) {
            this.$refs['ValidateForm'].validate((valid) => {
                if (valid) {
                    console.log(this.dynamicValidateForm)
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        backInfo:function(info){
            console.log(info)
        },
        flush:function(){
            let _this=this;
            clearTimeout(timer);
            this.timer=null;
            if(this.lastTime==null){
                console.log("刷新")
            }else{
                let lastTime=new Date();
                if(lastTime.getTime()-this.lastTime.getTime()>1000){ //时间超过了一秒
                    console.log("刷新")
                }else{
                    this.timer=setTimeout(() => {
                        _this.flush();
                    }, 1000);
                }
            }
            this.lastTime=new Date();
        }
	},
    watch:{
        //computed 中的email函数的值变化
        email:function(val){
            this.dynamicValidateForm.other.domains[1].value=val;
        },
        //监听多个属性任意一个改变都去验证其它的属性问题；
        changeValue:function(val){
            this.$refs['ValidateForm'].validate();
        },
        'ValidateForm.phone':function(val){
            this.wsData=[{devid:"01",pointid:val}]
        }
    },
}
</script>
