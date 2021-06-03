<template>
    <div class="centermap">
        <div class="top">
            <div class="top-box">
                <p>冷机运行百分比(%)</p>
                <p class="number">26.8</p>
            </div>
            <div class="top-box">
                <p>冷机运行频率(Hz)</p>
                <p class="number">26.8</p>
            </div>
            <div class="top-box">
                <p>冷机运行功率(Kw)</p>
                <p class="number">26.8</p>
            </div>
        </div>
        <div class="centerimg">
            <img :src="templateUrl+'/images/shuileng.png'">
            <div class="info info1">
                <p class="number">26.8</p>
                <p>出水温度(℃)</p>
            </div>
            <div class="info info2">
                <p class="number">26.8</p>
                <p>进水温度(℃)</p>
            </div>
            <div class="info info3">
                <p class="number">26.8</p>
                <p>蒸发压力(Pa)</p>
            </div>
            <div class="info info4">
                <p class="number">26.8</p>
                <p>冷凝压力(Pa)</p>
            </div>
            <div class="info info5">
                <p class="number">26.8</p>
                <p>出水温度(℃)</p>
            </div>
            <div class="info info6">
                <p class="number">26.8</p>
                <p>进水温度(℃)</p>
            </div>
        </div>
        <div class="bottom">
            <div class="table-box">
                <div class="table-box-list">
                    <div class="table-box-span"></div>
                    <div class="table-box-span border-left">机组</div>
                    <div class="table-box-span border-left">压机1</div>
                    <div class="table-box-span border-left">压机2</div>
                    <div class="table-box-span border-left">压机3</div>
                </div>
                <div class="table-box-list border-top">
                    <div class="table-box-span">运行时间(h)</div>
                    <div class="table-box-span border-left table-value">220</div>
                    <div class="table-box-span border-left table-value">220</div>
                    <div class="table-box-span border-left table-value">220</div>
                    <div class="table-box-span border-left table-value">220</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
module.exports = {
    props:["templateData","templateUrl","dataObject"],
    components:{
        
    },
    created() {
        
    },
    mounted() {
        
    },
    data(){
        return{
            initParams:{
                wendu:"5",
                shidu:"7",
            }
        }
    },
	methods: {
        
    },
    watch:{
        dataObject:{
            handler:function(val){
                this.initParams=Object.assign(this.initParams,val)
            },
            deep: true, 
            immediate: true
        }
    }
}
</script>
<style lang="less" scoped>
    .centermap{
        width: 100%;
        height: 100%;
        min-width: 1000px;
        min-height: 500px;
    }
    .top{
        width: 100%;
        height: 94px;
        display: flex;
        .top-box{
            padding: 15px;
            background: #0A3B79;
            margin-right: 15px;
            .number{
                color: #DDE4F6;
                font-size: 26px;
                margin-top: 10px;
            }
        }
    }
    
    .centerimg{
        width: 1000px;
        padding: 0 100px;
        position: relative;
        margin: 30px auto;
        img{
            max-width: 100%;
        }
        .info{
            position: absolute;
            .number{
                color: #DDE4F6;
                font-size: 26px;
            }
            &.info1{
                left: 0;
                top: 56px;
            }
            &.info2{
                left: 0;
                top: 128px;
            }
            &.info3{
                left: 270px;
                top: 140px;
            }
            &.info4{
                right: 315px;
                top: 76px;
            }
            &.info5{
                right: 180px;
                top: 22px;
            }
            &.info6{
                right: 180px;
                top: 130px;
            }
        }
    }
    .table-box{
        margin: 0 auto;
        width: 519px;
        border: 1px solid #0A3B79;
    }
    .table-box-list{
        display: flex;
    }
    .table-box-list .table-box-span{
        width: 100px;
        min-height: 36px;
        line-height: 36px;
        text-align: center;
    }
    .table-box-list .table-box-span:nth-of-type(1){
        width: 120px;
    }
    .border-top{
        border-top: 1px solid #0A3B79;
    }
    .border-left{
        border-left: 1px solid #0A3B79;
    }
    .table-value{
        background: #0D4C9A;
        color: #DDE4F6;
    }
</style>
