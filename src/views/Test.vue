<template>
	<div class="content">
	    <div class="loncom-pubcon">
            <div class="loncom-public-top">
                <div class="loncom-public-topnav">
                    <ul class="scroll_con" id="sysmenu">
                        <li onclick="enterPage('url1')">
                            <a><img src="images/home-pd.png">
                                <div>首页</div>
                            </a>
                        </li>
                        <li onclick="enterPage('url2')">
                            <img src="images/home-kt.png">
                            <div>空调系统</div>
                        </li>
                        <li onclick="enterPage('url3')">
                            <img src="images/home-it.png">
                            <div>配电系统</div>
                        </li>
                        <li onclick="enterPage('url4')">
                            <img src="images/home-hj.png">
                            <div>安防系统</div>
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
                                        <div class="num"><span class="numspan" id="zrdwd">4</span></div>
                                        <div>最热点温度</div>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div class="loncom-block">
                                    <div class="loncom-block-con">
                                        <div class="num alarm"><span class="numspan" id="pjwd">23.2</span></div>
                                        <div>平均温度</div>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div class="loncom-block">
                                    <div class="loncom-block-con">
                                        <div class="num alarm"><span class="numspan" id="ltdwd">15</span></div>
                                        <div>冷通道温度</div>
                                    </div>
                                </div>

                            </li>
                            <li>
                                <div class="loncom-block">
                                    <div class="loncom-block-con">
                                        <div class="num"><span class="numspan" id="ltdsd">10</span></div>
                                        <div>冷通道湿度</div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="loncom-public-chartbox" style="margin-bottom: 15px;">
                <div class="loncom-public-chartbox-title">
                    <div class="loncom-title">
                        <div class="loncom-title-con">温度柱状图</div>
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
                        <div id="wendu" class="content" v-scrollBar>
                            <div v-for="item in 100">{{item}}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="loncom-public-chartbox">
                <div class="loncom-public-chartbox-title">
                    <div class="loncom-title">
                        <div class="loncom-title-con">湿度柱状图</div>
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
                        <div id="shidu" class="content"></div>
                    </div>
                </div>
            </div>
        
        </div>
	</div>
</template>

<script>
export default {
	created () {
        
	},
	mounted() {
        
    },
	data(){
		return{
            templateUrl:"/template/peidian",
            timeout:null,
        }
	},
	methods:{
        
	},
	watch:{
			
	},
}
</script>

<style scoped lang="less">
	.module-theme(...){
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
    .loncom-title .loncom-title-con:before{
            content: "";
            width: 16px;
            height: 2px;
            position: absolute;
            left: -2px;
            bottom: 5px;
            transform: rotate(45deg);
            background: #243966;
        }
    .loncom-title .loncom-title-con:after{
            content: "";
            width: calc(100% - 10px);
            height: 2px;
            position: absolute;
            left: 10px;
            bottom: 0;
            background: #243966;
        }
    .loncom-title .loncom-title-line:before{
            content: "";
            width: 16px;
            height: 2px;
            position: absolute;
            left: -3px;
            bottom: 5px;
            transform: rotate(-45deg);
            background: #243966;
        }
    .loncom-title .loncom-title-line:after{
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
    .loncom-box .topright .line:before{
        content: "";
        width: 10px;
        height: 2px;
        top: 0;
        left: 0;
        background: #277BDB;
        position: absolute;
    }
    .loncom-box .topright .line:after{
        content: "";
        width: 2px;
        height: 10px;
        bottom: 0;
        right: 0;
        background: #277BDB;
        position: absolute;
    }
    .loncom-box .topright:before{
            content: "";
            position: absolute;
            right: -2px;
            top: -2px;
            width: 0;
            height: 0;
            border-top: 16px solid transparent;
            border-left: 16px solid transparent;
        }
    .loncom-box .topright:after{
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
    .loncom-box .bottomleft .line:before{
                content: "";
                width: 10px;
                height: 2px;
                bottom: 0;
                right: 0;
                background: #277BDB;
                position: absolute;
            }
    .loncom-box .bottomleft .line:after{
                content: "";
                width: 2px;
                height: 10px;
                top: 0;
                left: 0;
                background: #277BDB;
                position: absolute;
            }
    .loncom-box .bottomleft:before{
            content: "";
            position: absolute;
            left: -2px;
            bottom: -2px;
            width: 0;
            height: 0;
            border-bottom: 16px solid #000d46;
            border-right: 16px solid transparent;
        }
    .loncom-box .bottomleft:after{
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
        .loncom-block .num .numspan:before{
            content:"";
            display: block;
            width: 4px;
            height: 16px;
            position: absolute;
            right: -11px;
            bottom:12px;
        }
        .loncom-block .num .numspan:after{
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
        .loncom-block .up .numspan:before{
            background: #EB8500;
        }
        .loncom-block .up .numspan:after{
            border-bottom: 8px solid #eb8513;
            bottom: 22px;
        }
        .loncom-block .down .numspan:before{
            background: #007DF3;
        }
        .loncom-block .down .numspan:after{
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
        }
        .loncom-public-echartbox-con{
            width: 100%;
            height: calc(100% - 50px);
        }



    }
</style>