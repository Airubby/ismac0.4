<template>
    <div class="centermap">
        <div class="left-info">
            <div class="table-box">
                <div class="table-box-list">
                    <div class="table-box-span">
                        主路1 自UPS1-1
                    </div>
                    <div class="table-box-span"><span>A</span></div>
                    <div class="table-box-span"><span>B</span></div>
                    <div class="table-box-span"><span>C</span></div>
                </div>
                <div class="table-box-list border-top">
                    <div class="table-box-span">电压(V)</div>
                    <div class="table-box-span"><span class="table-value">220</span></div>
                    <div class="table-box-span"><span class="table-value">220</span></div>
                    <div class="table-box-span"><span class="table-value">220</span></div>
                </div>
                <div class="table-box-list border-top">
                    <div class="table-box-span">电流(A)</div>
                    <div class="table-box-span"><span class="table-value">5.0</span></div>
                    <div class="table-box-span"><span class="table-value">5.0</span></div>
                    <div class="table-box-span"><span class="table-value">5.0</span></div>
                </div>
                <div class="table-box-list border-top">
                    <div class="table-box-span">功率(KW)</div>
                    <div class="table-box-span"><span class="table-value">5.0</span></div>
                    <div class="table-box-span"><span class="table-value">5.0</span></div>
                    <div class="table-box-span"><span class="table-value">5.0</span></div>
                </div>
                <div class="table-box-list border-top">
                    <div class="table-box-span">总功率(KW)</div>
                    <div class="table-box-span"></div>
                    <div class="table-box-span"><span class="table-value">5.0</span></div>
                    <div class="table-box-span"></div>
                </div>
                <div class="table-box-list border-top">
                    <div class="table-box-span">总电度(KW.h)</div>
                    <div class="table-box-span"></div>
                    <div class="table-box-span"><span class="table-value">5.0</span></div>
                    <div class="table-box-span"></div>
                </div>
            </div>
            <div class="table-box">
                <div class="table-box-list">
                    <div class="table-box-span">
                        主路2 自UPS1-2
                    </div>
                    <div class="table-box-span"><span>A</span></div>
                    <div class="table-box-span"><span>B</span></div>
                    <div class="table-box-span"><span>C</span></div>
                </div>
                <div class="table-box-list border-top">
                    <div class="table-box-span">电压(V)</div>
                    <div class="table-box-span"><span class="table-value">220</span></div>
                    <div class="table-box-span"><span class="table-value">220</span></div>
                    <div class="table-box-span"><span class="table-value">220</span></div>
                </div>
                <div class="table-box-list border-top">
                    <div class="table-box-span">电流(A)</div>
                    <div class="table-box-span"><span class="table-value">5.0</span></div>
                    <div class="table-box-span"><span class="table-value">5.0</span></div>
                    <div class="table-box-span"><span class="table-value">5.0</span></div>
                </div>
                <div class="table-box-list border-top">
                    <div class="table-box-span">功率(KW)</div>
                    <div class="table-box-span"><span class="table-value">5.0</span></div>
                    <div class="table-box-span"><span class="table-value">5.0</span></div>
                    <div class="table-box-span"><span class="table-value">5.0</span></div>
                </div>
                <div class="table-box-list border-top">
                    <div class="table-box-span">总功率(KW)</div>
                    <div class="table-box-span"></div>
                    <div class="table-box-span"><span class="table-value">5.0</span></div>
                    <div class="table-box-span"></div>
                </div>
                <div class="table-box-list border-top">
                    <div class="table-box-span">总电度(KW.h)</div>
                    <div class="table-box-span"></div>
                    <div class="table-box-span"><span class="table-value">5.0</span></div>
                    <div class="table-box-span"></div>
                </div>
            </div>
        </div>
        <div class="centerimg">
            <img :src="templateUrl+'/images/lietougui.png'">
            <div class="centerimg-line"></div>
        </div>
        <div class="box-con">
            <div class="box-info">A01机柜</div>
            <div class="box-info">A02机柜</div>
            <div class="box-info">A03机柜</div>
            <div class="box-info">A04机柜</div>
            <div class="box-info">A05机柜</div>
            <div class="box-info">A06机柜</div>
            <div class="box-info">A07机柜</div>
            <div class="box-info">A08机柜</div>
            <div class="box-info">A09机柜</div>
            <div class="box-info">A10机柜</div>
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
        min-width: 800px;
        min-height: 500px;
        display: flex;
        justify-content: space-between;
    }
    .table-box{
        border: 1px solid #258BC0;
        border-radius: 5px;
        margin-bottom: 50px;
        position: relative;
        &::after{
            content: "";
            width: 60px;
            height: 2px;
            background: #258BC0;
            position: absolute;
            top: 50%;
            right: -60px;
        }
        &::before{
            content: "";
            height: 100%;
            width: 2px;
            background: #258BC0;
            position: absolute;
            top: 50%;
            right: -60px;
        }
        &:nth-last-of-type(1)::before{
            top: auto;
            bottom: 50%;
        }
    }
    
    .table-text{
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .table-box-list{
        display: flex;
        margin: 5px 0;
    }
    .table-box-list .table-box-span{
        width: 70px;
        min-height: 30px;
        line-height: 30px;
        text-align: center;
    }
    .table-box-list .table-box-span img{
        max-width: 20px;
        max-height: 20px;
        margin-right: 5px;
    }
    .table-box-list .table-box-span:nth-of-type(1){
        width: 120px;
        display: flex;
        justify-content: center;
        align-items: center;
        line-height: 22px;
    }
    .table-box-list .table-value{
        border: 1px solid #258BC0;
        border-radius: 20px;
        padding: 0 10px;
    }
    .centerimg{
        width: 100%;
        text-align: center;
        position: relative;
        .centerimg-line{
            width: 100%;
            height: 100%;
            position: absolute;
            left: 0;
            top: 0;
            &::after{
                content: "";
                width: calc(100% - 88px);
                height: 2px;
                background: #258BC0;
                position: absolute;
                left: 58px;
                top: 50%;
            }
        }
        img{
            max-width: 100%;
            position: relative;
            z-index: 9;
        }
    }
    .box-con{
        .box-info{
            background: #0A3B79;
            color: #8b9ed4;
            min-width: 120px;
            height: 32px;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            text-align: center;
            margin-bottom: 15px;
        }
        .box-info::before{
            content: "";
            width: 30px;
            height: 2px;
            display: block;
            background: #258BC0;
            position: absolute;
            left: -30px;
            top: 16px;
        }
        .box-info::after{
            content: "";
            width: 2px;
            height: 47px;
            display: block;
            background: #258BC0;
            position: absolute;
            left: -30px;
            top: 16px;
        }
        .box-info:nth-last-child(1)::after{
            background: none;
        }
    }
</style>
