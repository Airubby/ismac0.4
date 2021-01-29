<template>
    <div class="content">
        <div class="list-box">
            <div class="box-left">
                <div class="box-title">地点配置</div>
                <div class="box-content">
                    <span>数据中心(2)</span>
                    <span>机房(101)</span>
                </div>
            </div>
            <div class="box-right" @click="addrConfig">
                <span class="el-icon-edit-outline"></span>
            </div>
        </div>
        <div class="list-box">
            <div class="box-left">
                <div class="box-title">设备分类</div>
                <div class="box-content">
                    <span>UPS(2)</span>
                    <span>温湿度(101)</span>
                </div>
            </div>
            <div class="box-right" @click="devtypeConfig">
                <span class="el-icon-edit-outline"></span>
            </div>
        </div>
        <devtype v-if="devtypeInfo.visible" :dialogInfo="devtypeInfo"></devtype>
        <addr v-if="addrInfo.visible" :dialogInfo="addrInfo"></addr>
    </div>
</template>
<script>
import Devtype from './component/Devtype'
import Addr from './component/Addr'
export default {
    components: {Devtype,Addr},
    created() {
        
    },
    mounted() {
        
    },
    data(){
        return{
            devtypeInfo:{
                visible:false,
            },
            addrInfo:{
                visible:false
            }
        }
    },
    computed: {
    },
	methods: {
        devtypeConfig:function(){
            this.devtypeInfo.visible=true;
        },
        addrConfig:function(){
            this.addrInfo.visible=true;
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
                .box-content{
                    span{
                        margin-right: @boxMargin;
                    }
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
        }
        .list-btn{
            margin-bottom: @boxMargin;
        }
    }
</style>