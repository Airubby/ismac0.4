<template>
    <div class="content">
        <div class="list-box">
            <div class="box-left">
                <div class="box-title">项目信息</div>
                <div class="box-content">
                    <span>依米康.龙控微模块</span>
                    <span>0300</span>
                    <span>四川省成都高新西区科园南二路2号</span>
                </div>
            </div>
            <div class="box-right">
                <span class="el-icon-edit-outline"></span>
            </div>
        </div>
        <div class="list-box">
            <div class="box-left">
                <div class="box-title">版本信息</div>
                <div class="box-content">
                    <span>软件(B036)</span>
                    <span>内核(3.12)</span>
                    <span>配置(未知)</span>
                </div>
            </div>
            <div class="box-right">
                <span class="el-icon-edit-outline"></span>
            </div>
        </div>
        <div class="list-box">
            <div class="box-left">
                <div class="box-title">网络信息</div>
                <div class="box-content">
                    <span>192.168.0.12</span>
                    <span>255.255.255.0</span>
                    <span>192.168.0.1</span>
                </div>
            </div>
            <div class="box-right">
                <span class="el-icon-edit-outline"></span>
            </div>
        </div>
        <div class="list-box">
            <div class="box-left">
                <div class="box-title">授权信息</div>
                <div class="box-content">
                    <span>已授权</span>
                    <span>点位:3000</span>
                    <span>有效期:2020-03-20</span>
                </div>
            </div>
            <div class="box-right">
                <span class="el-icon-edit-outline"></span>
            </div>
        </div>
        <div class="list-box">
            <div class="box-left">
                <div class="box-title">供应商信息</div>
                <div class="box-content">
                    <span>厂商名称</span>
                    <span>联系人</span>
                    <span>交付日期</span>
                </div>
            </div>
            <div class="box-right">
                <span class="el-icon-edit-outline"></span>
            </div>
        </div>
        <div class="list-box">
            <div class="box-left">
                <div class="box-title">维护信息</div>
                <div class="box-content">
                    <span>2020-12-12</span>
                    <span>维护信息维护信息维护信息维护信息</span>
                </div>
            </div>
            <div class="box-right">
                <span class="el-icon-edit-outline"></span>
            </div>
        </div>
        <div>
            <el-button type="primary" plain>重启网关</el-button>
            <el-button type="primary" plain>重启服务</el-button>
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
    }
</style>