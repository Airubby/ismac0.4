<template>
    <el-dialog title='时段配置' :visible.sync="dialogInfo.visible" width="900px" v-dialogDrag :close-on-click-modal="false" :append-to-body="true">
        <el-scrollbar style="height:480px;" class="scrollbar">
            <div class="dialog-content">
                <el-form ref="ValidateForm" :model="ruleForm" :rules="rules" label-width="0px">
                    <div class="box-margin">
                        <el-row :gutter="10">
                            <el-col :span="8">
                                <div class="btn-margin">名称</div>
                                <el-form-item label="" prop="groupname">
                                    <el-input v-model="ruleForm.groupname"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="16">
                                <div class="btn-margin"><el-checkbox v-model="check">限定有效期</el-checkbox></div>
                                <el-date-picker
                                    v-model="time"
                                    type="datetimerange"
                                    value-format="yyyy-MM-dd HH:mm:ss"
                                    format="yyyy-MM-dd HH:mm:ss"
                                    range-separator='~'
                                    start-placeholder='开始日期'
                                    end-placeholder='结束日期'
                                    align="center">
                                </el-date-picker>
                            </el-col>
                        </el-row>
                    </div>
                    <div class="box-margin" v-for="(item,index) in week">
                        <div class="btn-margin"><el-checkbox :value="item.value" :key="item.value" v-model="item.check">{{item.name}}</el-checkbox></div>
                        <el-row :gutter="10">
                            <el-col :span="8">
                                <el-time-picker
                                    v-model="week[index].time.time1"
                                    value-format="HH:mm:ss"
                                    format="HH:mm:ss"
                                    is-range
                                    range-separator='~'
                                    start-placeholder='开始时间'
                                    end-placeholder='结束时间'>
                                </el-time-picker>
                            </el-col>
                            <el-col :span="8">
                                <el-time-picker
                                    v-model="week[index].time.time2"
                                    value-format="HH:mm:ss"
                                    format="HH:mm:ss"
                                    is-range
                                    range-separator='~'
                                    start-placeholder='开始时间'
                                    end-placeholder='结束时间'>
                                </el-time-picker>
                            </el-col>
                            <el-col :span="8">
                                <el-time-picker
                                    v-model="week[index].time.time3"
                                    value-format="HH:mm:ss"
                                    format="HH:mm:ss"
                                    is-range
                                    range-separator='~'
                                    start-placeholder='开始时间'
                                    end-placeholder='结束时间'>
                                </el-time-picker>
                            </el-col>
                        </el-row>
                    </div>
                </el-form>
            </div>
        </el-scrollbar>
        <dialog-btn :dialogInfo="dialogInfo" @dialogSure="dialogSure()"></dialog-btn>
    </el-dialog>
</template>

<script>
export default {
    created() {
        if(this.dialogInfo.groupid){
            this.ruleForm.groupid=this.dialogInfo.groupid;
            this.getInfo();
        }
    },
    mounted() {
        
    },
    data(){
        return{
            test:{
                time:{
                    time1:""
                }
            },
            loading:false,
            check:false,
            time:'',
            week:[
                {value:'1',name:'Monday',check:false,time:{time1:"",time2:"",time3:""}},
                {value:'2',name:'Tuesday',check:false,time:{time1:'',time2:'',time3:''}},
                {value:'3',name:'Wednesday',check:false,time:{time1:'',time2:'',time3:''}},
                {value:'4',name:'Thursday',check:false,time:{time1:'',time2:'',time3:''}},
                {value:'5',name:'Friday',check:false,time:{time1:'',time2:'',time3:''}},
                {value:'6',name:'Saturday',check:false,time:{time1:'',time2:'',time3:''}},
                {value:'7',name:'Sunday',check:false,time:{time1:'',time2:'',time3:''}}
            ],
            ruleForm:{
                groupid:'',
                grouptype:"1",   //2 门禁时间组，1告警设置时间组
                groupdesc:"",  //时间组描述
                groupname:'',
                begintime:'',
                endtime:'',
                monday:'',
                tuesday:"",
                wednesday:"",
                thursday:"",
                friday:"",
                saturday:"",
                sunday:"",
            },
            rules: {
                groupname: [
                    { required: true, trigger: 'change',message:"非空" }
                ],
            },
        }
    },
	methods: {
        getInfo:function(){
            
            this.$r.post('/control/timegroup/details',{groupid:this.dialogInfo.groupid}, r => {
                console.log(r)
                
                if(r.err_code=="0"){
                    this.ruleForm=r.data;
                    if(r.data.begintime&&r.data.endtime){
                        this.check=true;
                        this.time=[r.data.begintime,r.data.endtime];
                    }
                    debugger
                    for(let i=0;i<this.week.length;i++){
                        let week=r.data[this.week[i].name.toLocaleLowerCase()];
                        if(week){
                            this.week[i].check=true;
                            let arr=week.split(";");
                            for(let j=0;j<arr.length;j++){
                                if(arr[j].split("-").length>0){
                                    (!this.week[i].time.time1&&(this.week[i].time.time1=[arr[j].split("-")[0],arr[j].split("-")[1]]))||
                                    (!this.week[i].time.time2&&(this.week[i].time.time2=[arr[j].split("-")[0],arr[j].split("-")[1]]))||
                                    (!this.week[i].time.time3&&(this.week[i].time.time3=[arr[j].split("-")[0],arr[j].split("-")[1]]));
                                }
                            }
                            console.log(this.week)
                        }
                    }
                }else{
                    this.$message.warning(r.err_msg);
                }
            });
        },
        //保存的操作
        dialogSure:function(){
            console.log(this.ruleForm.list)
            this.$refs['ValidateForm'].validate((valid) => {
                if(valid){ //验证通过
                    
                    let url=this.dialogInfo.groupid?'/control/timegroup/update':'/control/timegroup/add';
                    for(let i=0;i<this.week.length;i++){
                        if(this.week[i].check){
                            let str="";
                            for(let item in this.week[i].time){
                                if(this.week[i].time[item]){
                                    str+=this.week[i].time[item][0]+"-"+this.week[i].time[item][1]+";";
                                }
                            }
                           this.ruleForm[this.week[i].name.toLocaleLowerCase()]= str.slice(0,str.length-1);
                        }else{
                            this.ruleForm[this.week[i].name.toLocaleLowerCase()]="";
                        }
                    }
                    if(this.check&&this.time){
                        this.ruleForm.begintime=this.time[0];
                        this.ruleForm.endtime=this.time[1];
                    }else{
                        this.ruleForm.begintime="";
                        this.ruleForm.endtime="";
                    }
                    console.log(this.ruleForm);
                    this.$r.post(url,this.ruleForm, r => {
                        console.log(r)
                        
                        if(r.err_code=="0"){
                            this.$message.success(r.err_msg);
                            if(this.dialogInfo.groupid){
                                this.$emit("backInfo",false);
                            }else{
                                this.$emit("backInfo",true);
                            }
                            this.dialogInfo.visible=false;
                        }else{
                            this.$message.warning(r.err_msg);
                        }
                    });
                }
            })
        },
	},
    props:["dialogInfo"]
}
</script>
<style lang="less" scoped>
    .module-theme(...){
        .btn-margin{
            margin-bottom: @btnMargin;
        }
        .box-margin{
            margin-bottom: @boxMargin;
        }
    }
</style>