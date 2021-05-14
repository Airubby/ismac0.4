<template>
    <div class="content">
        <el-button type="primary" plain @click="$router.back(-1)">返回</el-button>
        <el-form ref="ValidateForm" :model="initParams" :rules="rules" label-position="top" class="form-box">
            <div class="card_title">
                <div class="title">基本信息</div>
            </div>
            <el-row :gutter="30">
                <el-col :span="7">
                    <el-form-item :label="$t('access.userID')" prop="userid">
                        <el-input v-model="initParams.userid" :disabled="hint=='edit'" placeholder="100"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="7">
                    <el-form-item :label="$t('access.cardReg')" prop="accesscard">
                        <el-checkbox v-model="accessdataFlag" style="width:26px;margin-right:0;"></el-checkbox>
                        <el-input v-model="initParams.accesscard" style="width:calc(100% - 26px)" :disabled="!accessdataFlag"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="7">
                    <el-form-item :label="$t('access.passReg')" prop="accesspassword">
                        <el-checkbox v-model="accesspasswordFlag" style="width:26px;margin-right:0;"></el-checkbox>
                        <el-input v-model="initParams.accesspassword" style="width:calc(100% - 26px)" type="password" :disabled="!accesspasswordFlag"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="7">
                    <el-form-item :label="$t('access.cardPerson')" prop="username">
                        <el-input v-model="initParams.username"></el-input>
                        <!-- <el-checkbox v-model="check" style="width:80px;margin:0 0 0 10px;">{{$t("access.nowCard")}}</el-checkbox> style="width:calc(100% - 90px)"-->
                        <!-- <span type="text" style="width:70px;cursor:pointer;color:#4A78FF" @click="fingerFn">登记指纹</span> -->
                    </el-form-item>
                </el-col>
            </el-row>
            <div class="card_title">
                <div class="title">通讯参数</div>
            </div>
            <el-row :gutter="30">
                <el-col :span="7">
                    <el-form-item :label="$t('public.category')" prop="roleid">
                        <el-select v-model="initParams.roleid">
                            <el-option
                                v-for="item in $store.getters.accessType"
                                :key="item.id"
                                :label='$t(item.name)'
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item :label="$t('public.lifeDate')" prop="time">
                        <el-date-picker
                        v-model="time"
                        type="daterange"
                        format="yyyy-MM-dd"
                        value-format="yyyy-MM-dd"
                        :range-separator='$t("hint.to")'
                        :start-placeholder='$t("hint.startTime")'
                        :end-placeholder='$t("hint.endTime")'
                        align="center">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item :label="$t('access.timeGroup')" prop="timegroupname">
                        <el-input v-model="initParams.timegroupname" readonly @focus="getTime()"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="14">
                    <el-form-item :label="$t('access.doorRange')" prop="authdoorsdata">
                        <el-tree
                        :data="tree_data"
                        node-key="id"
                        show-checkbox
                        check-strictly
                        :default-checked-keys="checkKey"
                        ref="tree"
                        @check-change="handleCheckChange">
                        <span slot-scope="{ node, data }">
                            <span v-if="data.map.comstate">
                                <em v-if="node.disabled" class="infocolor">{{node.label}} ({{$t('public.communicationStop')}})</em>
                                <em v-else>{{node.label}} ({{$t('public.commstateNormal')}})</em>
                            </span>
                            <span v-else :class="{'infocolor':node.disabled}">{{node.label}}</span>
                        </span>
                        </el-tree>
                        <el-input v-model="initParams.authdoorsdata" style="display:none;"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <handle-btn @handleClick="handleSure()" class="box-btn"></handle-btn>
        </el-form>
        <user v-if="getUserInfo.visible" :dialogInfo="getUserInfo" v-on:backInfo="backUserInfo"></user>
        <time-group v-if="getTimeInfo.visible" :dialogInfo="getTimeInfo" v-on:backInfo="backTimeInfo"></time-group>
        <finger v-if="fingerInfo.visible" :dialog-info="fingerInfo"></finger>
    </div>
</template>
<script>
import User from './component/User'
import TimeGroup from './component/TimeGroup'
import Finger from './component/Finger'
export default {
    components: {User,TimeGroup,Finger},
    mixins:[],
    filters:{
        
    },
    created() {
        let params = this.$route.query.params;
        console.log(params)
        if(params){
            console.log(1)
            this.hint="edit";
            this.getInfo(JSON.parse(params).id)
        }else{
            console.log(2)
            this.getTree();
        }
    },
    mounted() {
        
    },
    data(){
        let passRange=(rules,value,callback)=>{
            if(!value) {
                if(rules.required) {
                    callback(new Error(this.$t('access.controlHas')))
                }
            }else{
                callback()
            }
        };
        let passTime=(rules,value,callback)=>{
            if(this.initParams.begintime&&this.initParams.endtime) {
                callback()
            }else{
                callback(new Error(this.$t('hint.nonEmpty')))
            }
        };
        let checkpw = (rules,value,callback) =>{
            if(this.accesspasswordFlag){
                if(value===""){
                    callback(new Error(this.$t('hint.nonEmpty')));
                }else{
                    if(value.length>6){
                        callback(this.$t('access.accessCardPw'));
                    }else{
                        callback();
                    } 
                }
            }else{
                callback();
            }
        };
        let checkuserId = (rules,value,callback) =>{
            if(value===""){
                callback(new Error(this.$t('hint.nonEmpty')));
            }else{
                if(this.hint=="add"){
                    let regPos = /^([1-9]{1,1}[0-9]{0,4})$/;
                    if(regPos.test(value)){
                        this.$r.post('/access/mode/aysnmodeuserid', {"userid":value}, r => {
                            console.log(r)
                            if(r.err_code=="0"){
                                if(r.data=="true"){
                                    callback();
                                }else{
                                    callback(new Error(this.$t('public.codeRepeat')));
                                }
                            }else{
                                callback(new Error(r.err_msg));
                            }
                        });
                    }else{
                        callback(this.$t('access.accessNumberRange'));
                    } 
                    
                }else{

                    callback();
                }
            }
        };
        let checkName = (rules,value,callback) =>{
            if(value===""){
                callback(new Error(this.$t('hint.nonEmpty')));
            }else{
                //门禁控制器同步只支持最大8字节
                let sum=0;
                for(let i=0;i<value.length;i++){
                    if ((value.charCodeAt(i)>=0) && (value.charCodeAt(i)<=255)) {
                        sum=sum+1;
                    }else {
                        sum=sum+2;
                    }
                }
                if(sum>8){
                    callback(new Error(this.$t('access.nameLength')));
                }else{
                    callback();
                }
            }
        };
        return{
            hint:'add',
            loading:false,
            check:false,
            checkKey:[],
            time:'',
            accessdataFlag:false,
            accesspasswordFlag:false,
            initParams:{
                accesscard:'', //卡号
                accesspassword:'', //密码
                userid:'',
                username:'',
                roleid:"",  //角色
                fingerlist:[],  //指纹[{Fingerid:1;accessdata:1}]Fingerid手指编号 accessdata 指纹串
                timegroupid:'',
                timegroupname:'',
                authdoors:[],  //[{devid:1;pointid:1}{devid:1;pointid:1}]
                authdoorsdata:'', 
                begintime:'',
                endtime:'',
                isenable:'1',  //
                syncaccess:"",  //同步的门禁id逗号分隔
            },
            rules:{
                userid: [
                    { required: true, trigger: 'blur',validator:checkuserId }
                ],
                roleid: [
                    { required: true, trigger: 'change',message:this.$t("hint.nonEmpty")  }
                ],
                accesspassword: [
                    { required: false, trigger: 'change',validator:checkpw }
                ],
                username: [
                    { required: true, trigger: 'change',validator:checkName   }
                ],
                authdoorsdata:[
                    { required: true, trigger: 'change',validator:passRange }
                ],
                timegroupname: [
                    { required: true, trigger: 'change',message:this.$t("hint.nonEmpty")  }
                ],
                time:[
                    { required: true, trigger: 'change',validator:passTime }
                ]
            },
            tree_data:[],
            getUserInfo:{
                visible:false,
                id:'', //是一条信息的id
            },
            getTimeInfo:{
                visible:false,
                id:''
            },
            fingerInfo:{
                visible:false,
                id:""
            }
        }
    },
    computed: {
    },
	methods: {
        getUser:function(){
            this.getUserInfo.visible=true;
            this.getUserInfo.id=this.initParams.userid;
        },
        backUserInfo:function(info){
            this.initParams.userid=info.id;
            this.initParams.username=info.userid;
        },
        getTime:function(){
            this.getTimeInfo.visible=true;
            this.getTimeInfo.id=this.initParams.timegroupid;
        },
        backTimeInfo:function(info){
            console.log(info)
            this.initParams.timegroupid=info.groupid;
            this.initParams.timegroupname=info.groupname;
        },
        getTree:function(){
            this.$r.post('/control/dev/ioservertree',{devtype:'40100'}, r => {
                if(r.err_code=="0"){
                    this.tree_data=r.data;
                }else{
                    this.$message.warning(r.err_msg);
                }
            });
        },
        async getInfo(id){
            await this.getTree();
            this.$r.post("/access/mode/getaccessmode",{id:id},r=>{
                console.log(r)
                if(r.err_code=='0'){
                    let obj=r.data.items[0];
                    this.initParams=Object.assign(this.initParams,obj);
                    this.initParams.authdoors=obj.authdoors?JSON.parse(obj.authdoors):[];
                    this.initParams.fingerlist=obj.fingerlist?JSON.parse(obj.fingerlist):[];
                    this.accessdataFlag=this.initParams.accesscard?true:false;
                    this.accesspasswordFlag=this.initParams.accesspassword?true:false;
                    if(this.initParams.authdoors.length>0){
                        let arr=[];
                        for(let i=0;i<this.initParams.authdoors.length;i++){
                            arr.push(this.initParams.authdoors[i].devid+"_"+this.initParams.authdoors[i].pointid);
                        }
                        this.checkKey=arr;
                        // this.initParams.authdoorsdata="true";  //编辑的时候 也要勾选门禁控制器才可以了
                    }
                    if(obj.begintime&&obj.endtime){
                        this.time=[obj.begintime,obj.endtime];
                    }
                    // //userid为空就是临时卡
                    // if(!obj.userid){
                    //     this.initParams.username=this.$t("access.nowCard");
                    //     this.check=true;
                    // }
                }else{
                    this.$message.warning(r.err_msg);
                }
            })
        },
        handleCheckChange:function(node,checked){
            this.initParams.authdoors=[];
            let nodes=this.$refs.tree.getCheckedNodes();
            let arr=[];
            if(nodes.length>0){
                let flag=false;
                for(let i=0;i<nodes.length;i++){
                    if(!nodes[i].map.comstate){
                        this.initParams.authdoors.push({
                            devid:nodes[i].map.devid,
                            pointid:nodes[i].map.pointid
                        })
                    }else{
                        flag=true;
                        arr.push(nodes[i].id);
                    }
                }
                this.initParams.syncaccess=arr.toString();
                if(flag){
                    // this.initParams.syncaccess=Array.from(new Set(arr)).toString();
                    this.initParams.authdoorsdata="true";
                }else{
                    this.initParams.authdoorsdata="";
                }
            }else{
                this.initParams.authdoorsdata="";
            }
        },
        
        handleSure:function(){
            this.$refs['ValidateForm'].validate((valid) => {
                if(valid){ //验证通过
                    let url=this.hint=="edit"?"/access/mode/modifyaccessmode":"/access/mode/addaccessmode";
                    this.initParams.accesscard=this.accessdataFlag?this.initParams.accesscard:"";
                    this.initParams.accesspassword=this.accesspasswordFlag?this.initParams.accesspassword:"";
                    if(this.initParams.accesscard===""&&this.initParams.accesspassword===""){
                        this.$message.warning(this.$t("access.hasOneInfo"));
                        return;
                    }
                    this.$r.post(url,this.initParams, r => {
                        console.log(r)
                        if(r.err_code=="0"){
                            this.$message.success(r.err_msg);
                            this.$router.push({name:'accessCardImpower'});
                        }else{
                            this.$message.warning(r.err_msg);
                        }
                    });
                }
            })
        },
        fingerFn:function(){
            this.fingerInfo.visible=true;
        },
    },
    watch:{
        time:function(val){
            if(val){
                this.initParams.begintime=val[0];
                this.initParams.endtime=val[1];
            }else{
                this.initParams.begintime="";
                this.initParams.endtime="";
            }
        },
        check:function(val){
            if(val){
                this.initParams.username=this.$t("access.nowCard");
            }else{
                this.initParams.username="";
            }
            this.initParams.userid="";
        },
    }
    
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