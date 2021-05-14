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
            <div class="peidian-line">
                <div class="loncom-box">
                    <em class="topleft"></em>
                    <em class="topright"><em class="line"></em></em>
                    <em class="bottomleft"><em class="line"></em></em>
                    <em class="bottomright"></em>
                    <div class="loncom_content peidian-line-con">
                        
                        <!-- <div class="peidian-line-left">
                            <div class="loncom-box">
                                <ul class="peidian-line-ul">
                                    <li><span>&nbsp;</span><span>A相</span><span>B相</span><span>C相</span></li>
                                    <li><span>电流(A)</span><span class="dianliu_a">23</span><span class="dianliu_b">33</span><span class="dianliu_c">22</span></li>
                                    <li><span>电压(V)</span><span class="dianya_a">22</span><span class="dianya_b">33</span><span class="dianya_c">33</span></li>
                                    <li><span>功率因素</span><span class="gonglvyinsu_a">23</span><span class="gonglvyinsu_b">45</span><span class="gonglvyinsu_c">23</span></li>
                                    <li><span>功率(Kw)</span><span class="gonglv_a">23</span><span class="gonglv_b">23</span><span class="gonglv_c">42</span></li>
                                </ul>
                            </div>
                        </div>
                        <div class="peidian-line-right">
                            
                        </div> -->
                    </div>
                </div>
            </div>
            <div class="peidian-tablebox">
                <div class="loncom-public-chartbox-title">
                    <div class="loncom-title">
                        <div class="loncom-title-con">机柜末端用电</div>
                        <div class="loncom-title-line">
                            <em class="loncom-line-em"></em>
                        </div>
                    </div>
                </div>
                <div class="peidian-tablebox-con">
                    <div class="loncom-box">
                        <em class="topleft"></em>
                        <em class="topright"><em class="line"></em></em>
                        <em class="bottomleft"><em class="line"></em></em>
                        <em class="bottomright"></em>
                        <div class="loncom_content">
                            <div class="peidian-tablecel">
                                <div class="peidian-tablecel-con">
                                    <ul>
                                        <li>
                                            <span>机柜编号</span>
                                            <span>机柜A01</span>
                                            <span>机柜A02</span>
                                            <span>机柜A03</span>
                                            <span>机柜A04</span>
                                            <span>机柜A05</span>
                                            <span>机柜A06</span>
                                            <span>机柜A07</span>
                                            <span>机柜A08</span>
                                            <span>机柜A09</span>
                                            <span>机柜A10</span>
                                            <span>机柜A11</span>
                                            <span>机柜A12</span>
                                            <span>机柜A13</span>
                                            <span>机柜A14</span>
                                        </li>
                                        <li>
                                            <span>A路</span>
                                            <span class="jgb_jigui01_a">6</span>
                                            <span class="jgb_jigui02_a">5</span>
                                            <span class="jgb_jigui03_a">4</span>
                                            <span class="jgb_jigui04_a">3</span>
                                            <span class="jgb_jigui05_a">1</span>
                                            <span class="jgb_jigui06_a">1</span>
                                            <span class="jgb_jigui07_a">2</span>
                                            <span class="jgb_jigui08_a">2</span>
                                            <span class="jgb_jigui09_a">3</span>
                                            <span class="jgb_jigui10_a">3</span>
                                            <span class="jgb_jigui11_a">4</span>
                                            <span class="jgb_jigui12_a">3</span>
                                            <span class="jgb_jigui13_a">4</span>
                                            <span class="jgb_jigui14_a">5</span>
                                        </li>
                                        <li>
                                            <span>B路</span>
                                            <span class="jgb_jigui01_a">6</span>
                                            <span class="jgb_jigui02_a">5</span>
                                            <span class="jgb_jigui03_a">4</span>
                                            <span class="jgb_jigui04_a">3</span>
                                            <span class="jgb_jigui05_a">1</span>
                                            <span class="jgb_jigui06_a">1</span>
                                            <span class="jgb_jigui07_a">2</span>
                                            <span class="jgb_jigui08_a">2</span>
                                            <span class="jgb_jigui09_a">3</span>
                                            <span class="jgb_jigui10_a">3</span>
                                            <span class="jgb_jigui11_a">4</span>
                                            <span class="jgb_jigui12_a">3</span>
                                            <span class="jgb_jigui13_a">4</span>
                                            <span class="jgb_jigui14_a">5</span>
                                        </li>
                                    </ul>
                                </div>
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
    .peidian-line{
        width: 100%;
        height: calc(100% - 350px);
        margin:20px 0;
    }
    .peidian-line-con{
        display: flex;
        padding: 10px 20px;
    }
    .peidian-line-left{
        width: 400px;
        height: 100%;
        position: relative;
    }
    .peidian-line-ul{
        padding: 0 35px 0 15px;
        color: #B1BFF5;
        position: relative;
    }
    .peidian-line-ul li{
        height: 40px;
        line-height: 40px;
        display: flex;
        padding-left: 15px;
    }
    .peidian-line-ul li span{
        display: block;
        width: 100px;
    }
    .peidian-line-ul li span:nth-of-type(1){
        width: 150px;
        color: #62749E;
    }
    .peidian-line-ul li:nth-of-type(1) span{
        color: #0077E9;
    }
    .peidian-line-ul li:nth-of-type(2n){
        background: #021446;
    }
    .peidian-line-left .loncom-box{
        width: 100%;
        height: 200px;
        position: absolute;
        top: 50%;
        margin-top: -100px;
        border-radius: 0;
    }
    .peidian-line-right{
        width: calc(100% - 400px);
        height: 100%;
        position: relative;
    }
    .peidian-line-right img{
        position: absolute;
        right: 0;
        top: 0;
        left: 0;
        bottom: 0;
        max-width: 100%;
        max-height: 100%;
    }
    .peidian-tablebox{
        width: 100%;
        height: 160px;
    }
    .peidian-tablebox-con{
        width: 100%;
        height: calc(100% - 50px);
        margin-top:10px;
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
    .peidian-tablebox-con li:nth-of-type(1) span{
        color: #62749E;
    }
    .peidian-tablecel-con li:nth-of-type(2){
        background: #021038;
    }
    .peidian-tablecel-con li span{
        display: block;
        width: 200px;
        color: #B1BFF5;
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
    }
    .loncom-public-echartbox-con{
        width: 100%;
        height: calc(100% - 50px);
    }

</style>
