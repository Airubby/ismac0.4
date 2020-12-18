<template>
    <div class="content">
        <div class="list-box" v-for="item in list">
            <div class="box-left">
                <div class="box-title">{{item.name}}</div>
                <div class="box-content">
                    <span>{{item.state?"已启用":"未启用"}}</span>
                    <el-divider direction="vertical"></el-divider>
                    <span>{{item.content}}</span>
                </div>
            </div>
            <div class="box-right" @click="editSet('storeSetInfo')">
                <span class="el-icon-edit-outline"></span>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    created() {
        
    },
    mounted() {
        
    },
    data(){
        return{
            list:[
                {name:"LSB接口",state:true,content:"31600,192.168.0.13"},
                {name:"SNMP接口",state:true,content:"161；162"},
                {name:"Modbus接口",state:false,content:"502"},
                {name:"运营商B接口",state:true,content:"192.168.0.12,1038"},
                {name:"MQTT接口",state:true,content:"192.168.0.12,1038"},
                {name:"声光接口",state:true,content:"通道2"},
                {name:"短信接口",state:true,content:"COM1"},
                {name:"电话接口",state:true,content:"192.168.0.14,8190"},
                {name:"邮件接口",state:true,content:"192.168.0.14,8190"},
                {name:"微信接口",state:true,content:"192.168.0.14,8190"},
                {name:"时钟同步接口",state:true,content:"31600,192.168.0.13"},
                {name:"透传服务接口",state:true,content:"31600,192.168.0.13"},
            ]
        }
    },
    computed: {
    },
	methods: {
        
	},
    components: {
        
    }
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