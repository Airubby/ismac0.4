<template>
    <div class="content">
        <div class="list-box" v-for="(item,index) in list" :key="index">
            <div class="box-left">
                <div class="box-title">{{item.name}}</div>
                <div class="box-content">
                    <span>{{item.state?"已启用":"未启用"}}</span>
                    <el-divider direction="vertical"></el-divider>
                    <span>{{item.content}}</span>
                </div>
            </div>
            <div class="box-right" @click="editSet(item)">
                <span class="el-icon-edit-outline"></span>
            </div>
        </div>
        <Lsb v-if="setInfo.LSB.visible" :dialogInfo="setInfo.LSB"></Lsb>
        <Snmp v-if="setInfo.SNMP.visible" :dialogInfo="setInfo.SNMP"></Snmp>
        <Modbus v-if="setInfo.Modbus.visible" :dialogInfo="setInfo.Modbus"></Modbus>
        <BInterface v-if="setInfo.BInterface.visible" :dialogInfo="setInfo.BInterface"></BInterface>
        <Mqtt v-if="setInfo.MQTT.visible" :dialogInfo="setInfo.MQTT"></Mqtt>
        <Acousto v-if="setInfo.Acousto.visible" :dialogInfo="setInfo.Acousto"></Acousto>
        <Message v-if="setInfo.Message.visible" :dialogInfo="setInfo.Message"></Message>
        <Phone v-if="setInfo.Phone.visible" :dialogInfo="setInfo.Phone"></Phone>
        <Email v-if="setInfo.Email.visible" :dialogInfo="setInfo.Email"></Email>
        <Cloudoc v-if="setInfo.Cloudoc.visible" :dialogInfo="setInfo.Cloudoc"></Cloudoc>
        <Clock v-if="setInfo.Clock.visible" :dialogInfo="setInfo.Clock"></Clock>
        <SeriaNet v-if="setInfo.SeriaNet.visible" :dialogInfo="setInfo.SeriaNet"></SeriaNet>
    </div>
</template>
<script>
import Lsb from './component/Lsb'
import Snmp from './component/Snmp'
import Modbus from './component/Modbus'
import BInterface from './component/BInterface'
import Mqtt from './component/Mqtt'
import Acousto from './component/Acousto'
import Message from './component/Message'
import Phone from './component/Phone'
import Email from './component/Email'
import Cloudoc from './component/Cloudoc'
import Clock from './component/Clock'
import SeriaNet from './component/SeriaNet'
export default {
    components: {Lsb,Snmp,Modbus,BInterface,Mqtt,Acousto,Message,Phone,Email,Cloudoc,Clock,SeriaNet},
    created() {
        
    },
    mounted() {
        
    },
    data(){
        return{
            list:[
                {name:"LSB接口",type:"LSB",state:true,content:"31600,192.168.0.13"},
                {name:"SNMP接口",type:"SNMP",state:true,content:"161；162"},
                {name:"Modbus接口",type:"Modbus",state:false,content:"502"},
                {name:"运营商B接口",type:"BInterface",state:true,content:"192.168.0.12,1038"},
                {name:"MQTT接口",type:"MQTT",state:true,content:"192.168.0.12,1038"},
                {name:"声光接口",type:"Acousto",state:true,content:"通道2"},
                {name:"短信接口",type:"Message",state:true,content:"COM1"},
                {name:"电话接口",type:"Phone",state:true,content:"192.168.0.14,8190"},
                {name:"邮件接口",type:"Email",state:true,content:"192.168.0.14,8190"},
                // {name:"微信接口",type:"WeChat",state:true,content:"192.168.0.14,8190"},
                {name:"云盒设置",type:"Cloudoc",state:true,content:"192.168.0.14,8190"},
                {name:"时钟同步接口",type:"Clock",state:true,content:"31600,192.168.0.13"},
                {name:"透传服务接口",type:"SeriaNet",state:true,content:"31600,192.168.0.13"},
            ],
            setInfo:{
                LSB:{
                    visible:false,
                    data:{}
                },
                SNMP:{
                    visible:false,
                    data:{}
                },
                Modbus:{
                    visible:false,
                    data:{}
                },
                BInterface:{
                    visible:false,
                    data:{}
                },
                MQTT:{
                    visible:false,
                    data:{}
                },
                Acousto:{
                    visible:false,
                    data:{}
                },
                Message:{
                    visible:false,
                    data:{}
                },
                Phone:{
                    visible:false,
                    data:{}
                },
                Email:{
                    visible:false,
                    data:{}
                },
                WeChat:{
                    visible:false,
                    data:{}
                },
                Cloudoc:{
                    visible:false,
                    data:{}
                },
                Clock:{
                    visible:false,
                    data:{}
                },
                SeriaNet:{
                    visible:false,
                    data:{}
                },
            }
        }
    },
    computed: {
    },
	methods: {
        editSet:function(item){
            console.log(item)
            this.setInfo[item.type].data=item;
            this.setInfo[item.type].visible=true;
        }
	},
    
}
</script>
<style lang="less" scoped>
    .module-theme(...){
        .list-box{
            width: 100%;
            display: flex;
            padding-bottom: @boxMargin;
            margin-bottom: @boxMargin;
            border-bottom: 1px solid @lineColor;
            .box-left{
                width: calc(100% - 60px);
                .box-title{
                    font-size: 16px;
                    color: @activeColor;
                    margin-bottom: @itemMargin;
                }
            }
            .box-right{
                width: 60px;
                display: flex;
                align-items: center;
                font-size: 22px;
                justify-content: center;
                cursor: pointer;
                color: @activeColor;
            }
            /deep/ .el-divider{
                background-color:@color;
            }
        }
    }
</style>