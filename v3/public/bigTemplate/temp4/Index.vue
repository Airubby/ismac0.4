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
                    <div class="loncom_content peidian-line-con" v-scrollBar>
                        <!-- <div v-for="item in 100">{{item}}</div> -->
                        <div class="map">
                            <div class="map1">
                                <div class="box1 box">
                                    电源输入1
                                </div>
                                <div class="box2 box">
                                    电源输入2
                                </div>
                            </div>
                            <div class="map2">
                                <div class="map2-table">
                                    <ul class="peidian-line-ul">
                                        <li><span>&nbsp;</span><span>A相</span><span>B相</span><span>C相</span></li>
                                        <li><span>电流(A)</span><span class="dianliu_a">23</span><span class="dianliu_b">33</span><span class="dianliu_c">22</span></li>
                                        <li><span>电压(V)</span><span class="dianya_a">22</span><span class="dianya_b">33</span><span class="dianya_c">33</span></li>
                                        <li><span>功率因素</span><span class="gonglvyinsu_a">23</span><span class="gonglvyinsu_b">45</span><span class="gonglvyinsu_c">23</span></li>
                                        <li><span>功率(Kw)</span><span class="gonglv_a">23</span><span class="gonglv_b">23</span><span class="gonglv_c">42</span></li>
                                    </ul>
                                </div>
                                <div class="map2-img">
                                    <div class="ats">
                                        <span class="title">ATS</span>
                                        <img :src="templateUrl+'/images/ATS.png'">
                                        <div class="switch">
                                            <div class="_switch" :class="{'_switch-open':true}">
                                                <div class="_switch-left"></div>
                                                <div class="_switch-right"></div>
                                                <div class="_switch-line"></div>
                                            </div>
                                        </div>
                                        <div class="line line1"></div>
                                    </div>
                                </div>
                                <div class="map2-spd">
                                    <div class="switch">
                                        <div class="_switch" :class="{'_switch-open':true}">
                                            <div class="_switch-left"></div>
                                            <div class="_switch-right"></div>
                                            <div class="_switch-line"></div>
                                        </div>
                                    </div>
                                    <div class="spd">
                                        <span class="title title1">SPD</span>
                                        <span class="title title2">PE</span>
                                        <img :src="templateUrl+'/images/SPD.png'">
                                    </div>
                                </div>
                            </div>
                            <div class="map3">
                                <div class="map3-top">
                                    <div class="switch">
                                        <div class="title">UPS旁路</div>
                                        <div class="_switch" :class="{'_switch-open':false}">
                                            <div class="_switch-left"></div>
                                            <div class="_switch-right"></div>
                                            <div class="_switch-line"></div>
                                        </div>
                                    </div>
                                    <div class="line line1"></div>
                                </div>
                                <div class="map3-top map3-cen">
                                    <div class="switch">
                                        <div class="title">UPS输入</div>
                                        <div class="_switch" :class="{'_switch-open':false}">
                                            <div class="_switch-left"></div>
                                            <div class="_switch-right"></div>
                                            <div class="_switch-line"></div>
                                        </div>
                                    </div>
                                    <div class="line"></div>
                                    <div class="switch">
                                        <div class="title">UPS输出</div>
                                        <div class="_switch" :class="{'_switch-open':false}">
                                            <div class="_switch-left"></div>
                                            <div class="_switch-right"></div>
                                            <div class="_switch-line"></div>
                                        </div>
                                    </div>
                                    <div class="map3-ups">
                                        <div class="ups">
                                            <span class="title">UPS</span>
                                            <img :src="templateUrl+'/images/ups.png'">
                                        </div>
                                        <div class="switch switch1">
                                            <div class="_switch" :class="{'_switch-open':true}">
                                                <div class="_switch-left"></div>
                                                <div class="_switch-right"></div>
                                                <div class="_switch-line"></div>
                                            </div>
                                        </div>
                                        <div class="dianchi">
                                            <span class="title">电池</span>
                                            <img :src="templateUrl+'/images/dianchi.png'">
                                        </div>
                                    </div>
                                    
                                </div>
                                <div class="map3-list">
                                    <div class="list-box" v-for="item in 10">
                                        <div class="switch">
                                            <div class="_switch" :class="{'_switch-open':false}">
                                                <div class="_switch-left"></div>
                                                <div class="_switch-right"></div>
                                                <div class="_switch-line"></div>
                                            </div>
                                        </div>
                                        <div class="arrows"></div>
                                        <div class="title">空调01</div>
                                    </div>
                                </div>
                            </div>
                            <div class="map4">
                                <div class="list-box" v-for="(item,index) in 30" :class="{'list-box-more':item%2==0}" :key="item" :style="{top:18*(index+1)+'px'}">
                                    <div class="switch">
                                        <div class="_switch" :class="{'_switch-open':false}">
                                            <div class="_switch-left"></div>
                                            <div class="_switch-right"></div>
                                            <div class="_switch-line"></div>
                                        </div>
                                    </div>
                                    <div class="title">机柜A01 A路</div>
                                </div>
                            </div>
                        </div>
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
    .map{
        display: flex;
        min-width: 1370px;
        .absolute{
            position: absolute;
        }
        .relative{
            position: relative;
        }
        .map1{
            width: 120px;
            min-height: 300px;
            padding-top: 80px;
            .box{
                width: 22px;
                padding: 0 12px;
                height: 130px;
                border: 2px solid #0077e9;
                display: flex;
                justify-content: center;
                align-items: center;
                text-align: center;
                margin: 40px 0;
                position: relative;
                &::after{
                    content:"";
                    width: 92px;
                    height: 2px;
                    background: #0077E9;
                    position: absolute;
                    top: 50%;
                    left: 26px;
                }
            }
        }
        .map2{
            width: 350px;
            min-height: 300px;
            .map2-table{
                border: 1px solid #02174a;
                margin: 30px 0 0 80px;
            }
            .map2-img{
                position: relative;
                padding: 30px 0 0 30px;
                width: calc(100% + 30px);
                &::before{
                    content: "";
                    position: absolute;
                    left: 0;
                    top:-47px;
                    width: 2px;
                    height: 172px;
                    background: #0077e9;
                }
                .ats{
                    position: relative;
                    display: flex;
                    align-items: center;
                    .switch{
                        width: 90px;
                    }
                    .title{
                        position: absolute;
                        top: -23px;
                        left: 17px;
                    }
                    &::before{
                        content: "";
                        position: absolute;
                        left: -30px;
                        top: 50%;
                        width: 30px;
                        height: 2px;
                        background: #0077e9;
                    }
                }
            }
            .map2-spd{
                position: relative;
                width: 80%;
                text-align: right;
                padding-top: 45px;
                .switch{
                    width: 60px;
                    height: 80px;
                    transform: rotate(90deg);
                    position: absolute;
                    right: 26px;
                    top: -32px;
                }
                .spd{
                    position: relative;
                    .title{
                        position: absolute;
                    }
                    .title1{
                        right: 42px;
                        top: 38px;
                    }
                    .title2{
                        bottom: 6px;
                        right: 42px;
                    }
                }
            }
        }
        .map3{
            width: 450px;
            min-height: 300px;
            padding: 30px 0 0 30px;
            position: relative;
            &::before{
                content:"";
                width: 2px;
                min-height: 280px;
                background: #0077E9;
                position: absolute;
                left: 30px;
            }
            .map3-top{
                width: 100%;
                display: flex;
                .switch{
                    width: 100px;
                    position: relative;
                    .title{
                        position: absolute;
                        top: -24px;
                        right: 0;
                    }
                }
                .line1{
                    width: calc(100% - 170px);
                    position: relative;
                    &::after{
                        content: "";
                        width: 2px;
                        height: 132px;
                        background: #0077E9;
                        position: absolute;
                        right: 0;

                    }
                }
            }
            .map3-cen{
                width: 100%;
                position: relative;
                top: 130px;
                .line{
                    width: calc(100% - 200px);
                }
                .map3-ups{
                    position: absolute;
                    left: 250px;
                    top: -20px;
                }
                .ups{
                    .title{
                        position: absolute;
                        top: -22px;
                        width: 100%;
                        text-align: center;
                        left: 0;
                    }
                }
                .dianchi{
                    top: 122px;
                    position: absolute;
                    left: -7px;
                    .title{
                        width: 100%;
                        text-align: center;
                        position: absolute;
                        bottom: -18px;
                    }
                }
                .switch1{
                    width: 60px;
                    height: 60px;
                    transform: rotate(90deg);
                    position: absolute;
                    right: 50%;
                    top: 60px;
                }
            }
            .map3-list{
                position: relative;
                top: 200px;
                .list-box{
                    display: flex;
                    align-items: center;
                    position: relative;
                    padding-bottom: 10px;
                    &::before{
                        content:"";
                        width: 2px;
                        height: 100%;
                        background: #0077E9;
                        position: absolute;
                        left: 0;
                        top: 0;
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
        }
        .map4{
            width: 450px;
            min-height: 300px;
            padding: 15px 0 0 30px;
            position: relative;
            &::before{
                content:"";
                width: 2px;
                min-height: 280px;
                background: #0077E9;
                position: absolute;
                left: 30px;
                top: 30px;
            }
            &::after{
                content:"";
                width: 30px;
                height: 2px;
                background: #0077E9;
                position: absolute;
                left: 0px;
                top: 162px;
            }
            .list-box{
                display: flex;
                align-items: center;
                position: absolute;
                &.list-box-more{
                    .switch{
                        width: 300px;
                    }
                }
                .switch{
                    width: 100px;
                }
                .title{
                    padding: 2px 5px;
                    border: 2px solid #0077E9;
                }
                &::before{
                    content: "";
                    width: 2px;
                    height: 100%;
                    background: #0077E9;
                    position: absolute;
                    left: 0;
                    top: 50%;
                }
            }
        }
    }
    .line{
        width: 100%;
        height: 2px;
        background: #0077E9;
    }
    .arrows{
        min-width:8px;
        height: 2px;
        width: 100%;
        display: flex;
        background: #0077E9;
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
            border-left: 10px solid #0077E9;
        }
    }
    ._switch{
        min-width:68px;
        height: 2px;
        width: 100%;
        display: flex;
        justify-content:space-between;
        position: relative;
        ._switch-left{
            width: calc(100% - 38px);
            height: 100%;
            background: #0077e9;
            position: relative;
        }
        ._switch-left::after{
            content: "";
            width: 3px;
            height: 3px;
            border: 2px solid #0077e9;
            position: absolute;
            right: -5px;
            border-radius: 50%;
            bottom: -2px;
        }
        ._switch-right{
            width: 14px;
            height: 100%;
            background: #0077e9;
            position: relative;
        }
        ._switch-right::before{
            content: "";
            width: 3px;
            height: 3px;
            border: 2px solid #0077e9;
            position: absolute;
            left: -5px;
            border-radius: 50%;
            bottom: -2px;
        }
        ._switch-line{
            width: 21px;
            height: 2px;
            background: #0077e9;
            position: absolute;
            right: 14px;
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
    .bgcontent{
        background: #00082A !important;
    }
    .peidian-line{
        width: 100%;
        height: calc(100% - 350px);
        margin:15px 0;
    }
    .peidian-line-con{
        padding: 10px 20px;
        width: 100%;
        height: 100%;
    }
    .peidian-line-left{
        width: 400px;
        height: 100%;
        position: relative;
    }
    .peidian-line-ul{
        padding: 0 15px;
        color: #B1BFF5;
        position: relative;
    }
    .peidian-line-ul li{
        height: 40px;
        line-height: 40px;
        display: flex;
    }
    .peidian-line-ul li span{
        display: block;
        width: 100px;
    }
    .peidian-line-ul li span:nth-of-type(1){
        width: 120px;
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
        height: 170px;
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
