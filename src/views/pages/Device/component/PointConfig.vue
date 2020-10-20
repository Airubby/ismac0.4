<template>
    <el-dialog title='配置设置' :visible.sync="dialogInfo.visible" width="900px" v-dialogDrag :close-on-click-modal="false" :append-to-body="true">
        <el-scrollbar style="height:460px;" class="scrollbar">
            <div class="dialog-content">
                <el-form :model="ruleForm" :rules="rules" ref="ValidateForm" label-width="120px" label-position="top">
                    <el-row :gutter="30">
                        <el-col :span="12">
                            <el-form-item label='是否告警'>
                                <el-radio-group v-model='ruleForm.alarmenable'>
                                    <el-radio :label='true'>告警</el-radio>
                                    <el-radio :label='false'>不告警</el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </el-col>
                        <!-- <el-col :span="12">
                            <el-form-item :label='$t("control.pointStatus")'>
                                <el-radio-group v-model='ruleForm.pointstate'>
                                    <el-radio label='0'>{{$t("public.normal")}}</el-radio>
                                    <el-radio label='1'>{{$t("public.preserve")}}</el-radio>
                                    <el-radio label='2'>{{$t("public.stop")}}</el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </el-col> -->
                        <el-col :span="24" class="mb10">
                            <div class="mb10">
                                设置阀值
                            </div>
                            <template  v-for="(item,index) in ruleForm.alarmList">
                                <el-row :gutter="10">
                                    <el-col :span="4">
                                        <el-form-item label=''>
                                            <el-checkbox :value="checkList[index]" :key="checkList[index]" v-model="checkList[index]" :disabled="!ruleForm.alarmenable">
                                            {{item.name}}
                                            </el-checkbox>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="6">
                                        <el-form-item label=''>
                                            <el-select v-model="item.alarmlevel" placeholder='' :disabled="!ruleForm.alarmenable||!checkList[index]">
                                                <template v-for="initem in alarm_info">
                                                    <el-option :label='initem.name' :value="initem.numbervalue"></el-option>
                                                </template>
                                            </el-select>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="6">
                                        <el-form-item label='' :prop="'alarmList['+index+'].threshold'">
                                            <el-input v-model="item.threshold" :placeholder='placeholder' :disabled="!ruleForm.alarmenable||!checkList[index]"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="8">
                                        <el-form-item label='' :prop="'alarmList['+index+'].eventbm'">
                                            <el-select v-model="item.eventbm" :disabled="index=='1'||index=='3'||!ruleForm.alarmenable||!checkList[index]">
                                                <template v-for="initem in bmroup">
                                                    <el-option :label="initem.content" :value="initem.eventcode"></el-option>
                                                </template>
                                            </el-select>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                            </template>
                            <el-row :gutter="10" v-if="checkType!='1'">
                                <el-col :span="4">
                                    <el-form-item label=''>
                                       死区
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <el-form-item label='' prop="alarmdead">
                                        <el-input v-model="ruleForm.alarmdead" :placeholder='placeholder'></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </el-col>
                        <el-col :span="24" class="mb10">
                            <div class="mb10">
                                变化告警
                            </div>
                            <el-row :gutter="10">
                                <el-col :span="4">
                                    <el-form-item label=''>
                                        <el-checkbox value="" key="" v-model="changeCheck" :disabled="!ruleForm.alarmenable">
                                        触发
                                        </el-checkbox>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="5">
                                    <el-form-item label='' prop="changeObj.id">
                                        <el-select v-model="ruleForm.changeObj.id" :disabled="!ruleForm.alarmenable||!changeCheck">
                                            <template v-for="item in changeList">
                                                <el-option :label='item.name' :value="item.id" v-if="checkType==item.showType"></el-option>
                                            </template>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="5">
                                    <el-form-item label='' prop="changeObj.threshold">
                                        <el-input v-model="ruleForm.changeObj.threshold" :placeholder='placeholder' :disabled="!ruleForm.alarmenable||!changeCheck"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="5">
                                    <el-form-item label=''>
                                        <el-select v-model="ruleForm.changeObj.alarmlevel" :disabled="!ruleForm.alarmenable||!changeCheck">
                                            <template v-for="item in alarm_info">
                                                    <el-option :label='item.name' :value="item.numbervalue"></el-option>
                                            </template>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="5">
                                    <el-form-item label='' prop="changeObj.eventbm">
                                        <el-select v-model="ruleForm.changeObj.eventbm" :disabled="!ruleForm.alarmenable||!changeCheck">
                                            <template v-for="initem in bmroup">
                                                <el-option :label="initem.content" :value="initem.eventcode"></el-option>
                                            </template>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </el-col>
                        <el-col :span="24">
                            <div class="mb10">
                                存储规则
                            </div>
                            <el-row :gutter="10">
                                <el-col :span="9">
                                    <el-form-item label=''>
                                        <el-select v-model="ruleForm.storeObj.storagetype">
                                            <template v-for="item in storeList">
                                                <el-option :label='item.name' :value="item.id"></el-option>
                                            </template>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="15" v-if="ruleForm.storeObj.storagetype=='1'">
                                    <el-form-item label='' prop="storeObj.changerang">
                                        <el-input v-model="ruleForm.storeObj.changerang" placeholder='变化值'></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="15" v-if="ruleForm.storeObj.storagetype=='2'">
                                    <el-form-item label='' prop="storeObj.interval">
                                        <el-input v-model="ruleForm.storeObj.interval" placeholder='单位:秒'></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="15" v-if="ruleForm.storeObj.storagetype=='3'">
                                    <el-col :span="9">
                                        <el-form-item label='' prop="storeObj.changerang">
                                            <el-input v-model="ruleForm.storeObj.changerang" placeholder='变化值'></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="15">
                                        <el-form-item label='' prop="storeObj.interval">
                                            <el-input v-model="ruleForm.storeObj.interval" placeholder='单位:秒'></el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-col>
                                <el-col :span="15" v-if="ruleForm.storeObj.storagetype=='4'">
                                    <el-form-item label='' prop="storeObj.fixedtime">
                                        <el-time-select
                                            v-model="ruleForm.storeObj.fixedtime"
                                            :picker-options="{
                                                start:'00:00',
                                                step:'01:00',
                                                end:'23:00'
                                            }">
                                        </el-time-select>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
        </el-scrollbar>
        <dialog-btn :dialogInfo="dialogInfo" @dialogSure="dialogSure()"></dialog-btn>
    </el-dialog>
</template>

<script>
export default {
    created() {
        // this.init();
    },
    mounted() {
        
    },
    computed:{
        eventbm:function(){
            return this.ruleForm.alarmList[0].eventbm;
        },
        eventbm1:function(){
            return this.ruleForm.alarmList[2].eventbm;
        },
        hivalue:function(){
            return this.ruleForm.alarmList[0].threshold;
        },
        hhivalue:function(){
            return this.ruleForm.alarmList[1].threshold;
        },
        lowvalue:function(){
            return this.ruleForm.alarmList[3].threshold;
        },
        llowvalue:function(){
            return this.ruleForm.alarmList[4].threshold;
        },
    },
    data(){
        let regPos = /(^[\-0-9][0-9]*(.[0-9]+)?)$/;
        let hiPass = (rule, value, callback) => {
            if(this.checkList[0]){
                if(value!==""){
                    if(regPos.test(value)&&parseFloat(value)>=parseFloat(this.startValue)&&parseFloat(value)<=parseFloat(this.endValue)){
                        if(this.ruleForm.alarmList[1].threshold&&parseFloat(this.ruleForm.alarmList[1].threshold)<=parseFloat(value)){
                            callback(new Error(this.$t("control.lehhalarmthreshold")));
                        }
                        if(this.ruleForm.alarmList[2].threshold&&parseFloat(this.ruleForm.alarmList[2].threshold)>=parseFloat(value)){
                            callback(new Error(this.$t("control.gtlalarmthreshold")));
                        }
                        if(this.ruleForm.alarmList[3].threshold&&parseFloat(this.ruleForm.alarmList[3].threshold)>=parseFloat(value)){
                            callback(new Error(this.$t("control.gtllalarmthreshold")));
                        }
                        callback();
                    }else{
                        callback(new Error(this.$t("public.numberRange")));
                    }
                }else{
                    callback(new Error("非空项"));
                }
            }else{
                callback();
            }
        };
        let hhiPass = (rule, value, callback) => {
            if(this.checkList[1]){
                if(value!==""){
                    if(regPos.test(value)&&parseFloat(value)>=parseFloat(this.startValue)&&parseFloat(value)<=parseFloat(this.endValue)){
                        if(this.ruleForm.alarmList[0].threshold&&parseFloat(this.ruleForm.alarmList[0].threshold)>=parseFloat(value)){
                            callback(new Error(this.$t("control.gthalarmthreshold")));
                        }
                        if(this.ruleForm.alarmList[2].threshold&&parseFloat(this.ruleForm.alarmList[2].threshold)>=parseFloat(value)){
                            callback(new Error(this.$t("control.gtlalarmthreshold")));
                        }
                        if(this.ruleForm.alarmList[3].threshold&&parseFloat(this.ruleForm.alarmList[3].threshold)>=parseFloat(value)){
                            callback(new Error(this.$t("control.gtllalarmthreshold")));
                        }
                        callback();
                    }else{
                        callback(new Error(this.$t("public.numberRange")));
                    }
                }else{
                    callback(new Error("非空项"));
                }
            }else{
                callback();
            }
        };
        let llowPass = (rule, value, callback) => {
            if(this.checkList[3]){
                if(value!==""){
                    if(regPos.test(value)&&parseFloat(value)>=parseFloat(this.startValue)&&parseFloat(value)<=parseFloat(this.endValue)){
                        if(this.ruleForm.alarmList[2].threshold&&parseFloat(this.ruleForm.alarmList[2].threshold)<=parseFloat(value)){
                            callback(new Error(this.$t("control.lelalarmthreshold")));
                        }
                        if(this.ruleForm.alarmList[0].threshold&&parseFloat(this.ruleForm.alarmList[0].threshold)<=parseFloat(value)){
                            callback(new Error(this.$t("control.lehalarmthreshold")));
                        }
                        if(this.ruleForm.alarmList[1].threshold&&parseFloat(this.ruleForm.alarmList[1].threshold)<=parseFloat(value)){
                            callback(new Error(this.$t("control.lehhalarmthreshold")));
                        }
                        callback();
                    }else{
                        callback(new Error(this.$t("public.numberRange")));
                    }
                }else{
                    callback(new Error("非空项"));
                }
            }else{
                callback();
            } 
        };
        let lowPass = (rule, value, callback) => {
            if(this.checkList[2]){
                if(value!==""){
                    if(regPos.test(value)&&parseFloat(value)>=parseFloat(this.startValue)&&parseFloat(value)<=parseFloat(this.endValue)){
                        if(this.ruleForm.alarmList[3].threshold&&parseFloat(this.ruleForm.alarmList[3].threshold)>=parseFloat(value)){
                            callback(new Error(this.$t("control.gtllalarmthreshold")));
                        }
                        if(this.ruleForm.alarmList[0].threshold&&parseFloat(this.ruleForm.alarmList[0].threshold)<=parseFloat(value)){
                            callback(new Error(this.$t("control.lehalarmthreshold")));
                        }
                        if(this.ruleForm.alarmList[1].threshold&&parseFloat(this.ruleForm.alarmList[1].threshold)<=parseFloat(value)){
                            callback(new Error(this.$t("control.lehhalarmthreshold")));
                        }
                        callback();
                    }else{
                        callback(new Error(this.$t("public.numberRange")));
                    }
                }else{
                    callback(new Error("非空项"));
                }
            }else{
                callback();
            }
        };
        let hiPassevent = (rule, value, callback) => {
            //this.ruleForm.alarmList[0].threshold==""
            if(!this.checkList[0]){
                callback();
            }else{
                if(value!==""){
                    callback();
                }else{
                    callback(new Error("非空项"));
                }
            }
        };
        let lowPassevent = (rule, value, callback) => {
            //this.ruleForm.alarmList[2].threshold==""
            if(!this.checkList[2]){
                callback();
            }else{
                if(value!==""){
                    callback();
                }else{
                    callback(new Error("非空项"));
                }
            }
        };
        let numberPass=(rule, value, callback) => {
            if(value!==""){
                if(regPos.test(value)){
                    callback();
                }else{
                    callback(new Error(this.$t("hint.patternErr")));
                }
            }else{
                callback(new Error("非空项"));
            }
        };
        let changeAlarmPass = (rule, value, callback) => {
            //this.ruleForm.changeObj.threshold==""
            if(!this.changeCheck){
                callback();
            }else{
                if(value!==""){
                    callback();
                }else{
                    callback(new Error("非空项"));
                }
            }
        };
        let changeAlarmthresholdPass = (rule, value, callback) => {
            //this.ruleForm.changeObj.threshold==""  
            if(!this.changeCheck){
                callback();
            }else{
                if(value!==""){
                    if(regPos.test(value)&&parseFloat(value)>=parseFloat(this.startValue)&&parseFloat(value)<=parseFloat(this.endValue)){
                        callback();
                    }else{
                        callback(new Error(this.$t("public.numberRange")));
                    }
                }else{
                    callback(new Error("非空项"));
                }
            }
        };
        let changeEventbmPass = (rule, value, callback) => {
            //this.ruleForm.changeObj.threshold==""
            if(!this.changeCheck){
                callback();
            }else{
                if(value!==""){
                    callback();
                }else{
                    callback(new Error("非空项"));
                }
            }
        };
        
        return{
            alarm_info:[
                {name:'紧急',value:'5',numbervalue:5,class:"icon-alarm-jinji",number:0,data:[]},
                {name:'严重',value:'4',numbervalue:4,class:"icon-alarm-yanzhong",number:0,data:[]},
                {name:'重要',value:'3',numbervalue:3,class:"icon-alarm-zhongyao",number:0,data:[]},
                {name:'次要',value:'2',numbervalue:2,class:"icon-alarm-yiban",number:0,data:[]},
                {name:'提示',value:'1',numbervalue:1,class:"icon-alarm-tishi",number:0,data:[]},
            ],
            startValue:"", //设置阀值的范围
            endValue:"", //设置阀值的范围
            placeholder:"",  //设置阀值的范围
            bmroup:[],
            //超限告警
            checkList:[false,false,false,false],
            //变化告警
            changeCheck:false,
            checkType:'1',
            changeList:[
                //0模拟量；1状态量
                {id:5,name:"改变量",showType:"0"},
                {id:6,name:"改变率",showType:"0"},
                {id:7,name:"上升沿告警",showType:"1"},
                {id:8,name:"下降沿告警",showType:"1"},
                {id:9,name:"动作告警",showType:"1"}
            ],
            //变化存储
            storeList:[
                {id:0,name:"不存储"},
                {id:1,name:"变化存储"},
                {id:2,name:"周期存储"},
                {id:3,name:"变化+周期存储"},
                {id:4,name:"定点存储"},
            ],
            ruleForm: {
                alarmenable:true,
                pointstate:'',
                alarmList:[
                    {"id":1,"threshold":"","alarmlevel":1,"eventbm":"","name":"上限告警"},
                    {"id":2,"threshold":"","alarmlevel":1,"name":"上上限告警"},
                    {"id":3,"threshold":"","alarmlevel":1,"eventbm":"","name":"下限告警"},
                    {"id":4,"threshold":"","alarmlevel":1,"name":"下下限告警"},
                ],
                changeObj:{
                    id:7,
                    threshold:"",
                    alarmlevel:1,
                    eventbm:"",
                },
                alarmdead:"",
                storeObj:{
                    storagetype:0,  //存储类型 0不存储，1变化存储，2周期存储，3变化+周期存储，4定点存储、存储周期/定点时间，相对滤波值，绝对滤波值
                    filterrang:0,  //异常滤波范围 --数值类型
                    filterfrequency:0, //异常滤波频率 --数值类型
                    changerang:0,  //变化范围 --数值类型（变化存储）
                    interval:0,  //间隔时间，单位秒 --数值类型（周期存储）
                    fixedtime:"",  ////定点存储  12:00  整点
                },
            },
            rules:{
                'alarmList[0].threshold':[
                    { validator: hiPass, trigger: 'change' },
                ],
                'alarmList[1].threshold':[
                    { validator: hhiPass, trigger: 'change' },
                ],
                'alarmList[2].threshold':[
                    { validator: lowPass, trigger: 'change' },
                ],
                'alarmList[3].threshold':[
                    { validator: llowPass, trigger: 'change' },
                ],
                'alarmList[0].eventbm':[
                    { validator: hiPassevent, trigger: 'change' },
                ],
                'alarmList[2].eventbm':[
                    { validator: lowPassevent, trigger: 'change' },
                ],
                'changeObj.id':[
                    { validator: changeAlarmPass, trigger: 'change' },
                ],
                'changeObj.threshold':[
                    { validator: changeAlarmthresholdPass, trigger: 'change' },
                ],
                'changeObj.eventbm':[
                    { validator: changeEventbmPass, trigger: 'change' },
                ],
                'storeObj.changerang':[
                    { required:true,validator: numberPass, trigger: 'change' },
                ],
                'storeObj.interval':[
                    { required:true,validator: numberPass, trigger: 'change' },
                ],
                'storeObj.fixedtime':[
                    { required:true,message:this.$t('hint.nonEmpty'), trigger: 'change' },
                ]
            },
            
        }
    },
	methods: {
        async init(){
            await this.getBM();
            console.log(this.dialogInfo);
            this.checkType=this.dialogInfo.pointtype;
            this.ruleForm.pointstate=this.dialogInfo.pointstate;  //点位状态
            this.ruleForm.changeObj.id=this.checkType=="1"?7:5;  //设置选中一个
            this.ruleForm.alarmdead=this.dialogInfo.alarmdead;
            if(this.dialogInfo.alarmpara){
                this.ruleForm.alarmenable=this.dialogInfo.alarmpara.alarmenable;
                let thresholds=this.dialogInfo.alarmpara.thresholds;
                if(thresholds&&thresholds.length>0){
                    for(let i=0;i<thresholds.length;i++){
                        if(Number(thresholds[i].id)<=4){
                            this.ruleForm.alarmList[Number(thresholds[i].id)-1]=Object.assign(this.ruleForm.alarmList[Number(thresholds[i].id)-1],thresholds[i]);
                            this.checkList[Number(thresholds[i].id)-1]=true;
                        }else{
                            this.ruleForm.changeObj=Object.assign(this.ruleForm.changeObj,thresholds[i]);
                            this.changeCheck=true;
                        }
                    }
                }
            }
            if(this.dialogInfo.hislogpara){
                this.ruleForm.storeObj=Object.assign(this.ruleForm.storeObj,this.dialogInfo.hislogpara);
            }
            if(this.dialogInfo.valuerange){
                let val=this.dialogInfo.valuerange.split(","); 
                if(val&&val.length==2){
                    this.startValue=val[0];
                    this.endValue=val[1];
                    this.placeholder=val[0]+" ~ "+val[1];
                }
            }
        },
        getBM:function(){
            return new Promise((resolve, reject) => {
                this.$api.post("/control/eventdir/query",{pageIndex:0,pageSize:10000},r=>{
                    if(r.err_code=="0"){
                        if(r.data.items&&r.data.items.length>0){
                            this.bmroup=r.data.items;
                            this.ruleForm.alarmList[0].eventbm=r.data.items[0].eventcode;
                            this.ruleForm.alarmList[2].eventbm=r.data.items[0].eventcode;
                            this.ruleForm.changeObj.eventbm=r.data.items[0].eventcode;
                        }
                    }else{
                        this.$message.warning(r.err_msg);
                    }
                    resolve();
                })
            });
        },
        //保存的操作
        dialogSure:function(){
            this.$refs['ValidateForm'].validate((valid) => {
                if(valid){ //验证通过
                    let thresholds=[];
                    for(let i=0;i<this.checkList.length;i++){
                        if(this.checkList[i]){
                            this.ruleForm.alarmList[i].threshold=Number(this.ruleForm.alarmList[i].threshold);
                            thresholds.push(this.ruleForm.alarmList[i]);
                        }
                    }
                    if(this.changeCheck){
                        this.ruleForm.changeObj.threshold=Number(this.ruleForm.changeObj.threshold);
                        thresholds.push(this.ruleForm.changeObj);
                    }
                    // for(let i=0;i<this.ruleForm.alarmList.length;i++){
                    //     if(this.ruleForm.alarmList[i].threshold){
                    //         this.ruleForm.alarmList[i].threshold=Number(this.ruleForm.alarmList[i].threshold);
                    //         thresholds.push(this.ruleForm.alarmList[i]);
                    //     }
                    // }
                    // if(this.ruleForm.changeObj.threshold){
                    //     this.ruleForm.changeObj.threshold=Number(this.ruleForm.changeObj.threshold);
                    //     thresholds.push(this.ruleForm.changeObj);
                    // }
                    let obj={
                        devid:this.dialogInfo.devid,
                        pointid:this.dialogInfo.pointid,
                        alarmdead:this.ruleForm.alarmdead,
                        alarmpara:{
                            alarmenable:this.ruleForm.alarmenable,
                            thresholds:thresholds,
                        },
                        pointstate:this.ruleForm.pointstate,  //点位状态
                        hislogpara:this.ruleForm.storeObj
                    }

                    this.$api.post('/control/alarm/updatethreshold',obj, r => {
                        console.log(r)
                        if(r.err_code=="0"){
                            this.$message.success(r.err_msg);
                            this.$emit("backInfo",obj)
                            this.dialogInfo.visible=false;
                        }else{
                            this.$message.warning(r.err_msg);
                        }
                    });
                }
            })
        },
        handleCheckChange:function(){
            
        }
	},
    watch: {
        eventbm:function(val){
            this.ruleForm.alarmList[1].eventbm=val;
        },
        eventbm1:function(val){
            this.ruleForm.alarmList[3].eventbm=val;
        },
        // hivalue:function(){
        //     let hhi=this.ruleForm.alarmList[1].threshold;
        //     let low=this.ruleForm.alarmList[2].threshold;
        //     let llow=this.ruleForm.alarmList[3].threshold;
        //     this.ruleForm.alarmList[1].threshold="";
        //     this.ruleForm.alarmList[2].threshold="";
        //     this.ruleForm.alarmList[3].threshold="";
        //     this.$nextTick(function(){
        //         this.ruleForm.alarmList[1].threshold=hhi;
        //         this.ruleForm.alarmList[2].threshold=low;
        //         this.ruleForm.alarmList[3].threshold=llow;
        //     })
        // },
        // hhivalue:function(){
        //     let hi=this.ruleForm.alarmList[0].threshold;
        //     let low=this.ruleForm.alarmList[2].threshold;
        //     let llow=this.ruleForm.alarmList[3].threshold;
        //     this.ruleForm.alarmList[0].threshold="";
        //     this.ruleForm.alarmList[2].threshold="";
        //     this.ruleForm.alarmList[3].threshold="";
        //     this.$nextTick(function(){
        //         this.ruleForm.alarmList[0].threshold=hi;
        //         this.ruleForm.alarmList[2].threshold=low;
        //         this.ruleForm.alarmList[3].threshold=llow;
        //     })
        // },
        // lowvalue:function(){
        //     let hi=this.ruleForm.alarmList[0].threshold;
        //     let hhi=this.ruleForm.alarmList[1].threshold;
        //     let llow=this.ruleForm.alarmList[3].threshold;
        //     this.ruleForm.alarmList[1].threshold="";
        //     this.ruleForm.alarmList[0].threshold="";
        //     this.ruleForm.alarmList[3].threshold="";
        //     this.$nextTick(function(){
        //         this.ruleForm.alarmList[1].threshold=hhi;
        //         this.ruleForm.alarmList[0].threshold=hi;
        //         this.ruleForm.alarmList[3].threshold=llow;
        //     })
        // },
        // llowvalue:function(){
        //     let hi=this.ruleForm.alarmList[0].threshold;
        //     let hhi=this.ruleForm.alarmList[1].threshold;
        //     let low=this.ruleForm.alarmList[2].threshold;
        //     this.ruleForm.alarmList[1].threshold="";
        //     this.ruleForm.alarmList[0].threshold="";
        //     this.ruleForm.alarmList[2].threshold="";
        //     this.$nextTick(function(){
        //         this.ruleForm.alarmList[1].threshold=hhi;
        //         this.ruleForm.alarmList[0].threshold=hi;
        //         this.ruleForm.alarmList[2].threshold=low;
        //     })
        // },
    },
    props:["dialogInfo"]
}
</script>
