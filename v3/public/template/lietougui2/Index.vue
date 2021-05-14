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
                    <div class="table-box-span">功率因子</div>
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
                    <div class="table-box-span">功率因子(KW)</div>
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
            </div>
        </div>
        <div class="censwitch">
            <div class="switch switch1">
                <div class="_switch" :class="{'_switch-open':true}">
                    <div class="_switch-left">
                        <span>3p</span>
                    </div>
                    <div class="_switch-right">
                        <span></span>
                    </div>
                    <div class="_switch-line"></div>
                </div>
            </div>
            <div class="switch switch2">
                <div class="_switch" :class="{'_switch-open':true}">
                    <div class="_switch-left"></div>
                    <div class="_switch-right"></div>
                    <div class="_switch-line"></div>
                </div>
            </div>
        </div>
        <div class="centerimg">
            <img :src="templateUrl+'/images/lietougui.png'">
            <div class="centerimg-line"></div>
        </div>
        <div class="center-box">
            <div class="list-box">
                <div class="switch">
                    <div class="_switch" :class="{'_switch-open':false}">
                        <div class="_switch-left">
                            <span>3p</span>
                        </div>
                        <div class="_switch-right">
                            <span>0.82kw</span>
                        </div>
                        <div class="_switch-line"></div>
                    </div>
                </div>
                <div class="arrows"></div>
                <div class="title">UPS旁路</div>
            </div>
            <div class="list-box">
                <div class="switch">
                    <div class="_switch" :class="{'_switch-open':true}">
                        <div class="_switch-left">
                            <span>3p</span>
                        </div>
                        <div class="_switch-right">
                            <span>0.82kw</span>
                        </div>
                        <div class="_switch-line"></div>
                    </div>
                </div>
                <div class="arrows"></div>
                <div class="title">UPS输入</div>
            </div>
            <div class="list-box" v-for="(item,index) in 10" :key="index">
                <div class="switch">
                    <div class="_switch" :class="{'_switch-open':false}">
                        <div class="_switch-left">
                            <span>3p</span>
                        </div>
                        <div class="_switch-right">
                            <span>0.82kw</span>
                        </div>
                        <div class="_switch-line"></div>
                    </div>
                </div>
                <div class="arrows"></div>
                <div class="title">空调01</div>
            </div>
            <div class="list-box" v-for="(item,index) in 3" :key="'i'+index">
                <div class="switch">
                    <div class="_switch" :class="{'_switch-open':false}">
                        <div class="_switch-left">
                            <span>3p</span>
                        </div>
                        <div class="_switch-right">
                            <span>0.82kw</span>
                        </div>
                        <div class="_switch-line"></div>
                    </div>
                </div>
                <div class="arrows"></div>
                <div class="title">预留</div>
            </div>
        </div>
        <div class="right-box">
            <div class="list-box" v-for="(item,index) in 30" :class="{'list-box-more':item%2==0}" :key="item" :style="{top:18*(index+1)+'px'}">
                <div class="switch">
                    <div class="_switch" :class="{'_switch-open':false}">
                        <div class="_switch-left">
                            <span>1p</span>
                        </div>
                        <div class="_switch-right">
                            <span>0.93kw</span>
                        </div>
                        <div class="_switch-line"></div>
                    </div>
                </div>
                <div class="title">机柜A01 A路</div>
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
        min-width: 800px;
        min-height: 500px;
        display: flex;
        flex-wrap: wrap;
    }
    .left-info{
        width: 335px;
        height:auto;
        padding-top: 15px;
        .table-box{
            border: 1px solid #258BC0;
            border-radius: 5px;
            position: relative;
            &:nth-of-type(1){
                margin-bottom: 110px;
            }
            
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
    }
    .censwitch{
        width: 130px;
        height: auto;
        padding-right: 10px;
        padding-top: 25px;
        .switch{
            width: 100%;
            position: relative;
            &.switch1{
                top: 110px;
            }
            &.switch1::after{
                content: "";
                width: 332px;
                height: 2px;
                background: #258BC0;
                position: absolute;
                left: 100%;
                bottom: 0px;
            }
            &.switch2{
                top: 430px;
            }
            &.switch2::after{
                content: "";
                width: 570px;
                height: 2px;
                background: #258BC0;
                position: absolute;
                left: 100%;
                bottom: 0px;
            }
        }
    }
    .center-box{
        padding-left: 120px;
        padding-top: 15px;
        .list-box{
            display: flex;
            align-items: center;
            position: relative;
            padding-bottom: 6px;
            
            &::before{
                content:"";
                width: 2px;
                height: 100%;
                background: #258BC0;
                position: absolute;
                left: 0;
                top: 10px;
            }
            &:nth-last-of-type(1)::before{
                background: none;
            }
        }
        .arrows{
            width: 8px;
        }
        .switch{
            width: 100px;
        }
        .title{
            padding-left: 15px;
        }
    }
    .centerimg{
        text-align: center;
        position: relative;
        padding-top: 60px;
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
    .right-box{
        padding-left: 60px;
        .list-box{
            display: flex;
            align-items: center;
            position: absolute;
            &.list-box-more{
                .switch{
                    width: 360px;
                }
            }
            .switch{
                width: 120px;
            }
            .title{
                padding: 2px 5px;
                border: 2px solid #258BC0;
                min-width: 110px;
                border-radius: 20px;
                text-align: center;
            }
            &::before{
                content: "";
                width: 2px;
                height: 100%;
                background: #258BC0;
                position: absolute;
                left: 0;
                top: 50%;
            }
            &:nth-last-of-type(1)::before{
                background: none;
            }
        }
    }
    ._switch{
        min-width:110px;
        height: 2px;
        width: 100%;
        display: flex;
        justify-content:space-between;
        position: relative;
        ._switch-left{
            width: calc(100% - 80px);
            height: 100%;
            background: #258BC0;
            position: relative;
            span{
                position: relative;
                top: -18px;
                font-size: 12px;
                display: block;
                text-align: right;
                padding-right: 8px;
            }
        }
        ._switch-left::after{
            content: "";
            width: 3px;
            height: 3px;
            border: 2px solid #258BC0;
            position: absolute;
            right: -5px;
            border-radius: 50%;
            bottom: -2px;
        }
        ._switch-right{
            width: 55px;
            height: 100%;
            background: #258BC0;
            position: relative;
            span{
                position: relative;
                top: -18px;
                font-size: 12px;
                width: 100%;
                text-align: center;
                display: block;
            }
        }
        ._switch-right::before{
            content: "";
            width: 3px;
            height: 3px;
            border: 2px solid #258BC0;
            position: absolute;
            left: -5px;
            border-radius: 50%;
            bottom: -2px;
        }
        ._switch-line{
            width: 21px;
            height: 2px;
            background: #258BC0;
            position: absolute;
            right: 55px;
            bottom: 3px;
            transform-origin: left center;
        }
    }
    ._switch-open{
        ._switch-line{
            background:#F75B49;
            transform: rotate(-20deg);
        }
        ._switch-left::after{
            border-color: #F75B49;
        }
        ._switch-right::before{
            border-color: #F75B49;
        }
    }
    .line{
        width: 100%;
        height: 2px;
        background: #258BC0;
    }
    .arrows{
        min-width:8px;
        height: 2px;
        width: 100%;
        display: flex;
        background: #258BC0;
        justify-content:space-between;
        position: relative;
        &::after{
            content: "";
            position: absolute;
            right: -10px;
            top: -4px;
            width: 0;
            height: 0;
            border-top: 5px solid transparent;
            border-bottom: 5px solid transparent;
            border-left: 10px solid #258BC0;
        }
    }
</style>
