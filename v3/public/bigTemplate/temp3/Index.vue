<template>
    <div class="content bgcontent">
	    <div class="loncom-pubcon">
            <div class="loncom-public-top">
                <div class="loncom-public-topnav">
                    <ul class="scroll_con" id="sysmenu">
                        <li @click="enterPage('url1')">
                            <a>
                                <img :src="templateUrl+'/images/home-pd.png'">
                                <div>主页</div>
                            </a>
                        </li>
                        <li @click="enterPage('url2')">
                            <img :src="templateUrl+'/images/home-kt.png'">
                            <div>配电系统</div>
                        </li>
                        <li @click="enterPage('url3')">
                            <img :src="templateUrl+'/images/home-it.png'">
                            <div>暖通系统</div>
                        </li>
                        <li @click="enterPage('url4')">
                            <img :src="templateUrl+'/images/home-hj.png'">
                            <div>安防系统</div>
                        </li>
                        <li @click="enterPage('url4')">
                            <img :src="templateUrl+'/images/home-hj.png'">
                            <div>IT系统</div>
                        </li>
                    </ul>
                </div>
                <div class="loncom-public-topbox">
                    <div class="loncom-box">
                        <em class="topleft"></em>
                        <em class="topright"><em class="line"></em></em>
                        <em class="bottomleft"><em class="line"></em></em>
                        <em class="bottomright"></em>
                        <ul class="loncom-public-topul loncom-public-topul4">
                            <li>
                                <div class="loncom-block">
                                    <div class="loncom-block-con">
                                        <div class="num"><span class="numspan">4</span></div>
                                        <div>服务器机柜数量</div>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div class="loncom-block">
                                    <div class="loncom-block-con">
                                        <div class="num"><span class="numspan">4</span></div>
                                        <div>总U位数</div>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div class="loncom-block">
                                    <div class="loncom-block-con">
                                        <div class="num"><span class="numspan">4</span></div>
                                        <div>资产数量</div>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div class="loncom-block">
                                    <div class="loncom-block-con">
                                        <div class="num alarm"><span class="numspan">23.2</span></div>
                                        <div>U位剩余容量(%)</div>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div class="loncom-block">
                                    <div class="loncom-block-con">
                                        <div class="num alarm"><span class="numspan">15</span></div>
                                        <div>电力剩余容量(%)</div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="loncom-public-chartbox chartflex">
                <div class="two-box">
                    <div class="loncom-public-chartbox-title">
                        <div class="loncom-title">
                            <div class="loncom-title-con">送回风温度柱状图</div>
                            <div class="loncom-title-line">
                                <em class="loncom-line-em"></em>
                            </div>
                        </div>
                    </div>
                    <div class="loncom-public-echartbox-con">
                        <div class="loncom-box">
                            <em class="topleft"></em>
                            <em class="topright"><em class="line"></em></em>
                            <em class="bottomleft"><em class="line"></em></em>
                            <em class="bottomright"></em>
                            <div class="content">
                                <div class="peidian-tablecel">
                                    <div class="peidian-tablecel-con">
                                        <ul>
                                            <li class="title">
                                                <span>时间</span>
                                                <span>事件</span>
                                                <span>人员</span>
                                                <span>卡号</span>
                                                <span>位置</span>
                                            </li>
                                            <li v-for="(item,index) in 10" :key="index">
                                                <span>234</span>
                                                <span>234</span>
                                                <span>人员fe</span>
                                                <span>卡号wr</span>
                                                <span>位e置</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="two-box">
                    <div class="loncom-public-chartbox-title">
                        <div class="loncom-title">
                            <div class="loncom-title-con">电力容量统计</div>
                            <div class="loncom-title-line">
                                <em class="loncom-line-em"></em>
                            </div>
                        </div>
                    </div>
                    <div class="loncom-public-echartbox-con">
                        <div class="loncom-box">
                            <em class="topleft"></em>
                            <em class="topright"><em class="line"></em></em>
                            <em class="bottomleft"><em class="line"></em></em>
                            <em class="bottomright"></em>
                            <div class="content">

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="loncom-public-chartbox chartflex">
                <div class="two-box">
                    <div class="loncom-public-chartbox-title">
                        <div class="loncom-title">
                            <div class="loncom-title-con">送回风温度柱状图</div>
                            <div class="loncom-title-line">
                                <em class="loncom-line-em"></em>
                            </div>
                        </div>
                    </div>
                    <div class="loncom-public-echartbox-con">
                        <div class="loncom-box">
                            <em class="topleft"></em>
                            <em class="topright"><em class="line"></em></em>
                            <em class="bottomleft"><em class="line"></em></em>
                            <em class="bottomright"></em>
                            <div class="content">
                                <div class="peidian-tablecel">
                                    <div class="peidian-tablecel-con">
                                        <ul>
                                            <li class="title">
                                                <span>时间</span>
                                                <span>事件</span>
                                                <span>人员</span>
                                                <span>卡号</span>
                                                <span>位置</span>
                                            </li>
                                            <li v-for="(item,index) in 10" :key="index">
                                                <span>234</span>
                                                <span>234</span>
                                                <span>人员fe</span>
                                                <span>卡号wr</span>
                                                <span>位e置</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="two-box">
                    <div class="loncom-public-chartbox-title">
                        <div class="loncom-title">
                            <div class="loncom-title-con">电力容量统计</div>
                            <div class="loncom-title-line">
                                <em class="loncom-line-em"></em>
                            </div>
                        </div>
                    </div>
                    <div class="loncom-public-echartbox-con">
                        <div class="loncom-box">
                            <em class="topleft"></em>
                            <em class="topright"><em class="line"></em></em>
                            <em class="bottomleft"><em class="line"></em></em>
                            <em class="bottomright"></em>
                            <div class="content">

                            </div>
                        </div>
                    </div>
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
            
        }
    },
	methods: {
        
    },
    watch:{
        // dataObject:{
        //     handler:function(val){
        //         this.initParams=Object.assign(this.initParams,val)
        //     },
        //     deep: true, 
        //     immediate: true
        // }
    }
}
</script>
<style lang="less" scoped>
    .bgcontent{
        background: #00082A !important;
    }
    .loncom-title{
        width: 100%;
        height: 40px;
        line-height: 50px;
        color: #B1BFF5;
        font-size: 16px;
        position: relative;
    }
    .loncom-title .loncom-title-con{
            width: calc(80% - 10px);
            height: 100%;
            position: relative;
            text-indent: 18px;
            float: left;
        }
    .loncom-title .loncom-title-con::before{
            content: "";
            width: 16px;
            height: 2px;
            position: absolute;
            left: -2px;
            bottom: 5px;
            transform: rotate(45deg);
            background: #243966;
        }
    .loncom-title .loncom-title-con::after{
            content: "";
            width: calc(100% - 10px);
            height: 2px;
            position: absolute;
            left: 10px;
            bottom: 0;
            background: #243966;
        }
    .loncom-title .loncom-title-line::before{
            content: "";
            width: 16px;
            height: 2px;
            position: absolute;
            left: -3px;
            bottom: 5px;
            transform: rotate(-45deg);
            background: #243966;
        }
    .loncom-title .loncom-title-line::after{
            content: "";
            width: 100%;
            height: 2px;
            position: absolute;
            left: 10px;
            bottom: 10px;
            background: #243966;
        }
    .loncom-title .loncom-title-line{
            width: 20%;
            height: 100%;
            position: relative;
            float: left;
        }
    .loncom-title .loncom-title-line .loncom-line-em{
            position: absolute;
            bottom: 3px;
            left: -67px;
            transform: skew(-45deg);
            width: 70px;
            height: 9px;
            background: linear-gradient(to right,#4E6490 50%, transparent 0%);
            background-size: 6px 100%;
    }
    .loncom-box{
        width: 100%;
        height: 100%;
        box-shadow: inset 0px 0px 2px #103c86;
        background: rgba(2, 17, 71, 0.25);
        position: relative;
        overflow: hidden;
        border-radius: 0 20px 0 20px;
        
    }
    .loncom-box .topleft{
        width: 10px;
        height: 10px;
        border-top: 2px solid #277BDB;
        border-left: 2px solid #277BDB;
        position: absolute;
        left: 0;
        top: 0;
    }
    .loncom-box .bottomright{
            width: 10px;
            height: 10px;
            border-bottom: 2px solid #277BDB;
            border-right: 2px solid #277BDB;
            position: absolute;
            right: 0;
            bottom: 0;
        }
    .loncom-box .topright{
            width: 25px;
            height: 25px;
            position: absolute;
            right: 0;
            top: 0;
        }
    .loncom-box .topright .line::before{
        content: "";
        width: 10px;
        height: 2px;
        top: 0;
        left: 0;
        background: #277BDB;
        position: absolute;
    }
    .loncom-box .topright .line::after{
        content: "";
        width: 2px;
        height: 10px;
        bottom: 0;
        right: 0;
        background: #277BDB;
        position: absolute;
    }
    .loncom-box .topright::before{
            content: "";
            position: absolute;
            right: -2px;
            top: -2px;
            width: 0;
            height: 0;
            border-top: 16px solid transparent;
            border-left: 16px solid transparent;
        }
    .loncom-box .topright::after{
            content: "";
            width: 70px;
            height: 9px;
            position: absolute;
            right: -30px;
            top: 11px;
            box-shadow: inset 0px 2px 0px #277bdb;
            transform: rotate(45deg);
        }
    .loncom-box .bottomleft{
            width: 25px;
            height: 25px;
            position: absolute;
            left: 0;
            bottom: 0;
        }
    .loncom-box .bottomleft .line::before{
                content: "";
                width: 10px;
                height: 2px;
                bottom: 0;
                right: 0;
                background: #277BDB;
                position: absolute;
            }
    .loncom-box .bottomleft .line::after{
                content: "";
                width: 2px;
                height: 10px;
                top: 0;
                left: 0;
                background: #277BDB;
                position: absolute;
            }
    .loncom-box .bottomleft::before{
            content: "";
            position: absolute;
            left: -2px;
            bottom: -2px;
            width: 0;
            height: 0;
            border-bottom: 16px solid #000d46;
            border-right: 16px solid transparent;
        }
    .loncom-box .bottomleft::after{
        content: "";
        width: 70px;
        height: 9px;
        position: absolute;
        right: -12px;
        top: 11px;
        box-shadow: inset 0px 2px 0px #277bdb;
        transform: rotate(45deg);
    }
    


    .loncom-block{
        width: 100%;
        height: 100%;
        display:flex;
        font-size: 12px;
        text-align: center;
        background: #030E31;
        color: #5B6A93;
        align-items: center;
        justify-content: center;
    }   
    .loncom-block .num{
        color: #B1BFF5;
        font-size: 28px;
        font-weight: bold;
    }
    .loncom-block .num .numspan{
        position: relative;
        display: inline-block;
    }
    .loncom-block .num .numspan::before{
        content:"";
        display: block;
        width: 4px;
        height: 16px;
        position: absolute;
        right: -11px;
        bottom:12px;
    }
    .loncom-block .num .numspan::after{
        content: "";
        width: 0;
        height: 0;
        border-left: 5px solid transparent;
        border-right: 5px solid transparent;
        position: absolute;
        right: -14px;
    }
    .loncom-block .up,
    .loncom-block .alarm{
        color: #EB8500;
    }
    .loncom-block .normal{
        color: #118913;
    }
    .loncom-block .up .numspan::before{
        background: #EB8500;
    }
    .loncom-block .up .numspan::after{
        border-bottom: 8px solid #eb8513;
        bottom: 22px;
    }
    .loncom-block .down .numspan::before{
        background: #007DF3;
    }
    .loncom-block .down .numspan::after{
        border-top: 8px solid #007DF3;
        bottom: 10px;
    }

    .loncom-pubcon{
        padding: 0 20px;
        height: 100%;
    }
    .loncom-public-top{
        width: 100%;
        height: 130px;
        padding-top: 20px;
        display: flex;
    }
    .loncom-public-topnav{
        width: 430px;
        height: 100%;
    }
    .loncom-public-topnav ul{
        display: flex;
    }
    .loncom-public-topnav ul li{
        width: 66px;
        margin-right: 30px;
        text-align:center;
    }
    .loncom-public-topnav ul li img{
        height: 66px;
        margin-top: 10px;
    }
    .loncom-public-topnav li div{
        color: #B1BFF5;
        height: 25px;
        line-height: 25px;
    }
    .loncom-public-topbox{
        width: calc(100% - 450px);
        height: 100%;
        margin-left:20px;
    }
    .loncom-public-topul{
        display: flex;
        width: 100%;
        height: 100%;
        padding: 10px 0 10px 10px;
    }
    .loncom-public-topul li{
        width: calc(20% - 10px);
        height: 100%;
        margin-right: 10px;
    }
    .loncom-public-topul4 li{
        width: calc(25% - 10px);
    }
    .loncom-public-topul .loncom-block{
        background: #031751;
    }


    .loncom-public-chartbox-title{
        width: 320px;
        margin-bottom:10px;
    }
    .loncom-public-chartbox{
        width: 100%;
        height: calc(50% - 75px);
        &.chartflex{
            display: flex;
            justify-content: space-between;
        }
        .two-box{
            width: calc(50% - 10px);
            height: 100%;
        }
    }
    .loncom-public-echartbox-con{
        width: 100%;
        height: calc(100% - 50px);
        margin-bottom: 15px;
        
    }
    .peidian-tablecel{
        width: 100%;
        height: 100%;
        padding: 0 20px;
    }
    .peidian-tablecel-con{
        width: 100%;
        height: 50%;
    }
    .peidian-tablecel-con ul{
        width: 100%;
        height: 100%;
        padding-top: 10px;
    }
    .peidian-tablecel-con li{
        width: 100%;
        display: flex;
        height: 35px;
        line-height: 35px;
        padding: 0 20px;
    }
    .peidian-tablebox-con li.title span{
        color: #62749E;
    }
    .peidian-tablecel-con li.title{
        background: #021038;
    }
    .peidian-tablecel-con li span{
        display: block;
        width: 200px;
        color: #B1BFF5;
    }
</style>
