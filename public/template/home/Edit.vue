<template>
    <div class="loncom_content">
        <div class="loncom-index-body">
            <div class="header">
                <div class="header-con">
	                <div class="row-side">
	                    <div class="wk-xz">
	                        <div class="wk-sj-right"></div>
	                        <em class="wk-sbx"></em>
	                        <em class="wk-sbx" style="right:-68px"></em>
	                        <em class="wk-tix"></em>
	                        <a class="header-home"><img :src="templateUrl+'/images/logo.png'"></a>
	                    </div>
	                </div>
	                <div class="row-cen">
	                    <div class="title">
	                        <em class="title-left"></em>
	                        <div class="title-con">微模块设施监控系统<span class="title-bg"></span></div>
	                        <em class="title-right"></em>
	                    </div>
	                </div>
	                <div class="row-side" style="padding: 0 0 0 50px">
	                    <div class="wk-xz" style="transform:scalex(-1)">
	                        <div class="wk-sj-right"></div>
	                        <em class="wk-sbx"></em>
	                        <em class="wk-sbx" style="right:-68px"></em>
	                        <em class="wk-tix"></em>
	                        <ul>
	                            <li id="fullscreen" @click="switcFullScreen()"><img :src="templateUrl+'/images/fullscreen.png'"></li>
	                            <li @click="showAlarm()"><img :src="templateUrl+'/images/alarm.png'"></li>
	                            <li><img :src="templateUrl+'/images/account.png'"></li>
	                        	<li @click="enterOld()"><img :src="templateUrl+'/images/manage.png'"></li>
	                        </ul>
	                    </div>
	                </div>
	            </div>
            </div>
            <div class="main" id="main">
	            <div class="main-left">
	                <div class="loncom-index-box loncom-index-box-left">
	                    <div class="loncom-title">
	                        <div class="loncom-title-con">PUE</div>
	                        <div class="loncom-title-line">
	                            <em class="loncom-line-em"></em>
	                        </div>
	                    </div>
	                    <div class="loncom-index-con loncom-index-con-left">
	                        <div class="loncom-box">
	                            <em class="topleft"></em>
	                            <em class="topright"><em class="line"></em></em>
	                            <em class="bottomleft"><em class="line"></em></em>
	                            <em class="bottomright"></em>
	                            <div class="loncom-box-con" id="optionsPUE" style="width:100%; height: 100%"></div>
	                        </div>
	                    </div>
	                </div>
	                <div class="loncom-index-box loncom-index-box-left">
	                    <div class="loncom-title">
	                        <div class="loncom-title-con">能效分布占比</div>
	                        <div class="loncom-title-line">
	                            <em class="loncom-line-em"></em>
	                        </div>
	                    </div>
	                    <div class="loncom-index-con loncom-index-con-left">
	                        <div class="loncom-box">
	                            <em class="topleft"></em>
	                            <em class="topright"><em class="line"></em></em>
	                            <em class="bottomleft"><em class="line"></em></em>
	                            <em class="bottomright"></em>
	                            <div class="loncom-box-con" id="optionsNX" style="width:100%; height: 100%"></div>
	                        </div>
	                    </div>
	                </div>
	                <div class="loncom-index-box">
	                    <div class="loncom-title">
	                        <div class="loncom-title-con">机柜功耗排行</div>
	                        <div class="loncom-title-line">
	                            <em class="loncom-line-em"></em>
	                        </div>
	                    </div>
	                    <div class="loncom-index-con" style="height:210px;">
	                        <div class="loncom-box" style="border-radius: 0;">
	                        	<ul class="loncom-index-gh loncom-index-gh-title">
	                        		<li>
	                                    <div class="name">机柜</div><div class="value">功耗</div>
	                                </li>
	                        	</ul>
	                        	<div class="loncom-index-gh-con scroll_con">
	                        		<ul class="loncom-index-gh" id="devPower">
		                                <li>
		                                    <div class="name">机柜01</div>
		                                    <div class="value">
		                                        <div class="loncom-progress">
		                                            <div class="loncom-progress-con" style="width: 65%;"></div>
		                                        </div>
		                                        <span>65%</span>
		                                    </div>
		                                </li>
		                                <li>
		                                    <div class="name">机柜02</div>
		                                    <div class="value">
		                                        <div class="loncom-progress">
		                                            <div class="loncom-progress-con" style="width: 85%;"></div>
		                                        </div>
		                                        <span>85%</span>
		                                    </div>
		                                </li>
		                                <li>
		                                    <div class="name">机柜03</div>
		                                    <div class="value">
		                                        <div class="loncom-progress">
		                                            <div class="loncom-progress-con" style="width: 35%;"></div>
		                                        </div>
		                                        <span>35%</span>
		                                    </div>
		                                </li>
		                                <li>
		                                    <div class="name">机柜04</div>
		                                    <div class="value">
		                                        <div class="loncom-progress">
		                                            <div class="loncom-progress-con" style="width: 45%;"></div>
		                                        </div>
		                                        <span>45%</span>
		                                    </div>
		                                </li>
		                                <li>
		                                    <div class="name">机柜05</div>
		                                    <div class="value">
		                                        <div class="loncom-progress">
		                                            <div class="loncom-progress-con" style="width: 90%;"></div>
		                                        </div>
		                                        <span>90%</span>
		                                    </div>
		                                </li>
		                                <li>
		                                    <div class="name">机柜06</div>
		                                    <div class="value">
		                                        <div class="loncom-progress">
		                                            <div class="loncom-progress-con" style="width: 95%;"></div>
		                                        </div>
		                                        <span>95%</span>
		                                    </div>
		                                </li>
		                            </ul>
	                        	</div>
	                        </div>
	                    </div>
	                </div>
	            </div>
	            <div class="main-cen">
	                <div class="cen-img"><div class="cen-img-con"><img :src="templateUrl+'/images/home.png'"></div></div>
	                <div class="cen-bottom">
	                    <ul id="sysMenu">
	                        <li @click="enterPage('hj')"><img :src="templateUrl+'/images/home-hj.png'"><div>环境系统</div></li>
	                        <li @click="enterPage('kt')"><img :src="templateUrl+'/images/home-kt.png'"><div>空调系统</div></li>
	                        <li @click="enterPage('pd')"><img :src="templateUrl+'/images/home-pd.png'"><div>配电系统</div></li>
	                        <li @click="enterPage('af')"><img :src="templateUrl+'/images/home-it.png'"><div>安防系统</div></li>
	                    </ul>
	                </div>
	            </div>
	            <div class="main-right">
	                <div class="loncom-index-box loncom-index-box-right">
	                    <div class="loncom-title">
	                        <div class="loncom-title-con">告警状态</div>
	                        <div class="loncom-title-line">
	                            <em class="loncom-line-em"></em>
	                        </div>
	                    </div>
	                    <div class="loncom-index-con loncom-index-con-right">
	                        <div class="loncom-box-con" id="loncom-box-radar" style="width:100%; height: 100%">
	                        	<div class="loncom-radar" id="loncom-radar">
	                        		<div class="radar" id="radar"></div>
	                        		<em class="one alarm_em"></em>
	                        		<em class="two alarm_em"></em>
	                        	</div>
	                        	<div style="width:100%;height:35px;line-height:30px;text-align:center;color:#5B6A93;font-size:12px">正在扫描中...</div>
	                        </div>
	                    </div>
	                </div>
	                <div class="loncom-index-box">
	                    <div class="loncom-boxpic">
	                        <ul id="devIsAlarm">
	                            <li>
	                                <img :src="templateUrl+'/images/wenshidu_alarm.png'">
	                                <div>温湿度</div>
	                            </li>
	                            <li>
	                                <img :src="templateUrl+'/images/loushui.png'">
	                                <div>漏水</div>
	                            </li>
	                            <li>
	                                <img :src="templateUrl+'/images/kongtiao.png'">
	                                <div>空调</div>
	                            </li>
	                            <li>
	                                <img :src="templateUrl+'/images/ups_alarm.png'">
	                                <div>UPS</div>
	                            </li>
	                            <li>
	                                <img :src="templateUrl+'/images/dianchi.png'">
	                                <div>电池</div>
	                            </li>
	                        </ul>
	                    </div>
	                </div>
	                <div class="loncom-index-box" style="margin-bottom: 20px;">
	                    <div class="loncom-index-con" style="height: 200px;">
	                        <div class="loncom-box">
	                            <em class="topleft"></em>
	                            <em class="topright"><em class="line"></em></em>
	                            <em class="bottomleft"><em class="line"></em></em>
	                            <em class="bottomright"></em>
	                            <div class="loncom-alarmbox scroll_con">
	                                <ul id="devAlarm">
	                                    <li class="loncom-pdlr20"><span>2019-01-10 10:10:00</span>环境温度过高</li>
	                                    <li class="loncom-pdlr20"><span>2019-01-10 10:10:00</span>室内环境温度过高</li>
	                                    <li class="loncom-pdlr20"><span>2019-01-10 10:10:00</span>空调环境温度过高</li>
	                                    <li class="loncom-pdlr20"><span>2019-01-10 10:10:00</span>设备管道漏水严重</li>
	                                    <li class="loncom-pdlr20"><span>2019-01-10 10:10:00</span>环境温度过高环境温度过高</li>
	                                    <li class="loncom-pdlr20"><span>2019-01-10 10:10:00</span>环境温度过低</li>
	                                    <li class="loncom-pdlr20"><span>2019-01-10 10:10:00</span>环境温度过高</li>
	                                    <li class="loncom-pdlr20"><span>2019-01-10 10:10:00</span>室内环境温度过高</li>
	                                    <li class="loncom-pdlr20"><span>2019-01-10 10:10:00</span>空调环境温度过高</li>
	                                    <li class="loncom-pdlr20"><span>2019-01-10 10:10:00</span>设备管道漏水严重</li>
	                                    <li class="loncom-pdlr20"><span>2019-01-10 10:10:00</span>环境温度过高环境温度过高</li>
	                                    <li class="loncom-pdlr20"><span>2019-01-10 10:10:00</span>环境温度过低</li>
	                                </ul>
	                            </div>
	                        </div>
	                    </div>
	                </div>
	                <div class="loncom-index-box">
	                    <div class="loncom-index-con">
	                        <div class="loncom-box">
	                            <em class="topleft"></em>
	                            <em class="topright"><em class="line"></em></em>
	                            <em class="bottomleft"><em class="line"></em></em>
	                            <em class="bottomright"></em>
	                            <div class="loncom-numbox">
	                                <ul>
	                                    <li>
	                                        <div class="loncom-block">
	                                        	<div class="loncom-block-con">
	                                        		<div class="num mainwd">
                                                        <span class="numspan" id="mainwd" @click="selectPoint('wendu')">
                                                            {{initParams.wendu}}
                                                        </span>
                                                    </div>
	                                        		<div>温度</div>
	                                        	</div>
	                                        </div>
	                                    </li>
	                                    <li>
	                                    	<div class="loncom-block">
	                                        	<div class="loncom-block-con">
	                                        		<div class="num mainsd">
                                                        <span class="numspan" id="mainsd" @click="selectPoint('shidu')">{{initParams.shidu}}</span>
                                                    </div>
	                                        		<div>湿度</div>
	                                        	</div>
	                                        </div>
	                                    </li>
	                                    <li>
	                                    	<div class="loncom-block">
	                                        	<div class="loncom-block-con">
	                                        		<div class="num" id="szwd">23.5</div>
	                                        		<div>空调设定温度</div>
	                                        	</div>
	                                        </div>
	                                    </li>
	                                    <li>
	                                    	<div class="loncom-block">
	                                        	<div class="loncom-block-con">
	                                        		<div class="num" id="szsd">22.5</div>
                                        			<div>空调设定湿度</div>
	                                        	</div>
	                                        </div>
	                                    </li>
	                                </ul>
	                            </div>
	                        </div>
	                    </div>
	                </div>
	            </div>
	        </div>
        </div>
        <div class="side-alarm" id="sideAlarm">
			<div class="loncom-box">
				<em class="topleft"></em>
				<em class="topright"><em class="line"></em></em>
				<em class="bottomleft"><em class="line"></em></em>
				<em class="bottomright"></em>
				<div class="loncom-box-con loncom-box-content">
					<div class="side-alarm-box">
						<div class="side-alarm-box-top">
							<div class="title">
								<img src="images/gaojing.png" class="img">室内温度过高告警
							</div>
							<div class="sure">确定</div>
						</div>
						<div class="side-alarm-content">
							1号温度，湿度，值=30
						</div>
						<div class="side-alrm-time">
							2019-12-12
						</div>
					</div>
					<div class="side-alarm-box">
						<div class="side-alarm-box-top">
							<div class="title">
								<img src="images/gaojing.png" class="img">室内温度过高告警
							</div>
							<div class="sure">确定</div>
						</div>
						<div class="side-alarm-content">
							1号温度，湿度，值=30
						</div>
						<div class="side-alrm-time">
							2019-12-12
						</div>
					</div>
					<div class="side-alarm-box">
						<div class="side-alarm-box-top">
							<div class="title">
								<img src="images/gaojing.png" class="img">室内温度过高告警
							</div>
							<div class="sure">确定</div>
						</div>
						<div class="side-alarm-content">
							1号温度，湿度，值=30
						</div>
						<div class="side-alrm-time">
							2019-12-12
						</div>
					</div>
					<div class="side-alarm-box">
						<div class="side-alarm-box-top">
							<div class="title">
								<img src="images/gaojing.png" class="img">室内温度过高告警
							</div>
							<div class="sure">确定</div>
						</div>
						<div class="side-alarm-content">
							1号温度，湿度，值=30
						</div>
						<div class="side-alrm-time">
							2019-12-12
						</div>
					</div>
					<div class="side-alarm-box">
						<div class="side-alarm-box-top">
							<div class="title">
								<img src="images/gaojing.png" class="img">室内温度过高告警
							</div>
							<div class="sure">确定</div>
						</div>
						<div class="side-alarm-content">
							1号温度，湿度，值=30
						</div>
						<div class="side-alrm-time">
							2019-12-12
						</div>
					</div>
					<div class="side-alarm-box">
						<div class="side-alarm-box-top">
							<div class="title">
								<img src="images/gaojing.png" class="img">室内温度过高告警
							</div>
							<div class="sure">确定</div>
						</div>
						<div class="side-alarm-content">
							1号温度，湿度，值=30
						</div>
						<div class="side-alrm-time">
							2019-12-12
						</div>
					</div>
					<div class="side-alarm-box">
						<div class="side-alarm-box-top">
							<div class="title">
								<img src="images/gaojing.png" class="img">室内温度过高告警
							</div>
							<div class="sure">确定</div>
						</div>
						<div class="side-alarm-content">
							1号温度，湿度，值=30
						</div>
						<div class="side-alrm-time">
							2019-12-12
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
        this.radarSize();
        let _this=this;
        const s = document.createElement('script');
        s.type = 'text/javascript';
        s.src = _this.templateUrl+'/js/echarts.min.js';
        document.head.appendChild(s);
        var oPUE,oNX,radar;
        s.onload=function(){
            var data=[
                {value:56, name:'总负载'},
                {value:49, name:'IT负载'},
            ];
            oNX=_this.optionsNX("optionsNX",data);
            oPUE=_this.optionsPUE("optionsPUE");
            radar=_this.radarChar("radar");
        }
        window.onresize=()=>{
            this.radarSize();
			oPUE&&oPUE.resize();
			oNX&&oNX.resize();
			radar&&radar.resize();
        }
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
        //设置雷达图的宽高
		radarSize(){
			var radarW=document.getElementById("loncom-box-radar").offsetWidth;
			var radarH=document.getElementById("loncom-box-radar").offsetHeight;
            var radarSize=radarW>radarH?(radarH-35):(radarW-35);
            console.log(radarSize)
			document.getElementById("loncom-radar").style.width=radarSize+"px";
			document.getElementById("loncom-radar").style.height=radarSize+"px";
		},
        optionsPUE(ID,xData,yData) {
			var xData=["03/08","03/09","03/10","03/11","03/12","03/13","03/14"];
			var yData=[1.5, 1.8, 1.3, 1.2, 2.0, 1.3, 1.9]; 
		    var myChart = echarts.init(document.getElementById(ID));
		    var option={
		            color:["#0082FB"],
		            tooltip : {
		                trigger: 'axis'
		            },
		            grid: {
		                left: '15px',
		                right: '25px',
		                top:'15%',
		                bottom: '15%',
		                containLabel: true
		            },
		            xAxis : [
		                {
		                    type : 'category',
		                    boundaryGap : false,
		                    axisLine:{
		                        lineStyle:{
		                            color:"#13254F",
		                            width:1,
		                        }
		                    },
		                    axisTick:{
		                        show:false
		                    },
		                    axisLabel:{
		                        color:"#4B5880",
		                        formatter: function (value, index) {
		                            // 格式化成月/日，只在第一个刻度显示年份
		                            return value;
		                        }
		                    },                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
		                    data :xData
		                }
		            ],
		            yAxis : [
		                {
		                    type : 'value',
		                    axisLine:{
		                        lineStyle:{
		                            color:"#13254F",
		                            width:1,
		                        }
		                    },
		                    splitLine:{
		                        show:true,
		                        lineStyle:{
		                            color:"#1c3042",
		                            width:1,
		                            type:"dashed",
		                        }
		                    },
		                    axisTick:{
		                        show:false
		                    },
		                    axisLabel:{
		                        color:"#4B5880",
		                        formatter: '{value}'
		                    }
		                }
		            ],
		            series : [
		              {
		                  name:'PUE',
		                  type:'line',
		                  areaStyle: {
		                    color:{
		                      type: 'linear',
		                      x: 0,
		                      y: 0,
		                      x2: 0,
		                      y2: 1,
		                      colorStops: [{
		                          offset: 0, color: '#033072' // 0% 处的颜色
		                      }, {
		                          offset: 1, color: '#021143' // 100% 处的颜色
		                      }],
		                    }
		                  },
		                  smooth:"true", //平滑
		                  //symbol:"line", //不要圆圈
		                  symbolSize:4, //平滑的时候设置为0
		                  data:yData
		              },
		          ]
	        };
		    myChart.setOption(option, true);
		    return myChart; 
		},
		optionsNX(ID,data) {
		    var myChart = echarts.init(document.getElementById(ID));
		    var option={
    	      color:["#0077E9","#7B2DD8","#2BBBCE","#108912"],
    	      tooltip: {
    	          trigger: 'item',
    	          formatter: "{b}: {c} ({d}%)"
    	      },
    	      series: [
    	          {
    	              type:'pie',
    	              radius: ['80%', '85%'],
    	              silent:true,  //不触发鼠标事件，及鼠标放上去无效果
    	              // tooltip:{textStyle:{color:"transparent"},backgroundColor:"transparent"},
    	              data:[
    	                  {value:1, name:'one'},
    	                  {value:1, name:'two'},
    	                  {value:1, name:'three'},
    	                  {value:1, name:'four'},
    	                  {value:1, name:'five'},
    	                  {value:1, name:'six'}
    	              ],
    	              label: {
    	                  normal: {
    	                      show: false,
    	                      position: 'center'
    	                  },
    	              },
    	              itemStyle:{
    	                  normal:{
    	                      color: function(params){
    	                          var index_color = params.name;
    	                          if(index_color=="one"||index_color=='three'||index_color=='five'){
    	                              return 'transparent';
    	                          }else if(index_color=='two'||index_color=='four'||index_color=='six') {
    	                              return '#1E4F79';
    	                          }
    	                      } 
    	                  }
    	              }
    	          },
    	          {
    	              type:'pie',
    	              radius: ['50%', '65%'],
    	              label: {
    	                  normal: {
    	                      formatter: '{b|{b}}{per|{d}%} ',
    	                      rich: {
    	                          b: {
    	                              fontSize: 12,
    	                              lineHeight: 33
    	                          },
    	                          per: {
    	                              color: '#fff',
    	                              fontSize: 14,
    	                              padding: [2, 4],
    	                              borderRadius: 2
    	                          }
    	                      }
    	                  }
    	              },
    	              data:data
    	          }
    	      ]
    	    }
		    myChart.setOption(option, true);
		    return myChart; 
		},
		radarChar(ID){
		    var myChart = echarts.init(document.getElementById(ID));
		    var option={
		        tooltip: {
		            trigger: 'item',
		            formatter: "{b}: {c} ({d}%)"
		        },
		        series: [
		                {
		                    type:'pie',
		                    radius: ['25%', '26%'],
		                    silent:true,  
		                    data:[
		                        {value:1, name:'one'},
		                    ],
		                    label: {
		                        normal: {
		                            show: false,
		                            position: 'center'
		                        },
		                    },
		                    itemStyle:{
		                        normal:{
		                            color: '#1E4F79'
		                        }
		                    }
		                },
		                {
		                    type:'pie',
		                    radius: ['45%', '46%'],
		                    silent:true,  
		                    data:[
		                        {value:1, name:'one'},
		                    ],
		                    label: {
		                        normal: {
		                            show: false,
		                            position: 'center'
		                        },
		                    },
		                    itemStyle:{
		                        normal:{
		                            color: '#1E4F79'
		                        }
		                    }
		                },
		                {
		                    type:'pie',
		                    radius: ['65%', '66%'],
		                    silent:true,  
		                    data:[
		                        {value:1, name:'one'},
		                    ],
		                    label: {
		                        normal: {
		                            show: false,
		                            position: 'center'
		                        },
		                    },
		                    itemStyle:{
		                        normal:{
		                            color: '#1E4F79'
		                        }
		                    }
		                },
		                {
		                    type:'pie',
		                    radius: ['85%', '86%'],
		                    silent:true,  
		                    data:[
		                        {value:1, name:'one'},
		                    ],
		                    label: {
		                        normal: {
		                            show: false,
		                            position: 'center'
		                        },
		                    },
		                    itemStyle:{
		                        normal:{
		                            color: '#1E4F79'
		                        }
		                    }
		                },
		                {
		                    type:'pie',
		                    radius: ['89%', '91%'],
		                    silent:true,  
		                    data:[
		                        {value:1, name:'one'},
		                        {value:1, name:'two'},
		                        {value:1, name:'three'},
		                        {value:1, name:'four'},
		                        {value:1, name:'five'},
		                        {value:1, name:'six'},
		                        {value:1, name:'seven'},
		                        {value:1, name:'eight'}
		                    ],
		                    label: {
		                        normal: {
		                            show: false,
		                            position: 'center'
		                        },
		                    },
		                    itemStyle:{
		                        normal:{
		                            color: function(params){
		                                var index_color = params.name;
		                                if(index_color=="one"||index_color=='three'||index_color=='five'||index_color=='seven'){
		                                    return '#1E4F79';
		                                }else if(index_color=='two'||index_color=='four'||index_color=='six'||index_color=='eight') {
		                                    return 'transparent';
		                                }
		                            } 
		                        }
		                    }
		                },
		                {
		                    type:'pie',
		                    radius: ['94%', '95%'],
		                    silent:true,  
		                    data:[
		                        {value:1, name:'one'},
		                        {value:1, name:'two'},
		                        {value:1, name:'one'},
		                        {value:1, name:'two'},
		                        {value:1, name:'one'},
		                        {value:1, name:'two'},
		                        {value:1, name:'one'},
		                        {value:1, name:'two'},
		                        {value:1, name:'one'},
		                        {value:1, name:'two'},
		                        {value:1, name:'one'},
		                        {value:1, name:'two'},
		                        {value:1, name:'one'},
		                        {value:1, name:'two'},
		                        {value:1, name:'one'},
		                        {value:1, name:'two'},
		                        {value:1, name:'one'},
		                        {value:1, name:'two'},
		                        {value:1, name:'one'},
		                        {value:1, name:'two'},
		                        {value:1, name:'one'},
		                        {value:1, name:'two'},
		                        {value:1, name:'one'},
		                        {value:1, name:'two'},
		                        {value:1, name:'one'},
		                        {value:1, name:'two'},
		                        {value:1, name:'one'},
		                        {value:1, name:'two'},
		                        {value:1, name:'one'},
		                        {value:1, name:'two'},
		                        {value:1, name:'one'},
		                        {value:1, name:'two'},
		                        {value:1, name:'one'},
		                        {value:1, name:'two'},
		                        {value:1, name:'one'},
		                        {value:1, name:'two'},
		                        {value:1, name:'one'},
		                        {value:1, name:'two'},
		                        {value:1, name:'one'},
		                        {value:1, name:'two'},
		                        {value:1, name:'one'},
		                        {value:1, name:'two'},
		                        {value:1, name:'one'},
		                        {value:1, name:'two'},
		                        {value:1, name:'one'},
		                        {value:1, name:'two'},
		                        {value:1, name:'one'},
		                        {value:1, name:'two'},
		                        {value:1, name:'one'},
		                        {value:1, name:'two'},
		                        {value:1, name:'one'},
		                        {value:1, name:'two'},
		                        {value:1, name:'one'},
		                        {value:1, name:'two'},
		                        {value:1, name:'one'},
		                        {value:1, name:'two'},
		                        {value:1, name:'one'},
		                        {value:1, name:'two'},
		                        {value:1, name:'one'},
		                        {value:1, name:'two'},
		                        {value:1, name:'one'},
		                        {value:1, name:'two'},
		                        {value:1, name:'one'},
		                        {value:1, name:'two'},
		                        {value:1, name:'one'},
		                        {value:1, name:'two'},
		                        {value:1, name:'one'},
		                        {value:1, name:'two'},
		                        {value:1, name:'one'},
		                        {value:1, name:'two'},
		                        {value:1, name:'one'},
		                        {value:1, name:'two'},
		                        {value:1, name:'one'},
		                        {value:1, name:'two'},
		                        {value:1, name:'one'},
		                        {value:1, name:'two'},
		                        {value:1, name:'one'},
		                        {value:1, name:'two'},
		                        {value:1, name:'one'},
		                        {value:1, name:'two'},
		                        {value:1, name:'one'},
		                        {value:1, name:'two'},
		                        {value:1, name:'one'},
		                        {value:1, name:'two'},
		                        {value:1, name:'one'},
		                        {value:1, name:'two'},
		                        {value:1, name:'one'},
		                        {value:1, name:'two'},
		                        {value:1, name:'one'},
		                        {value:1, name:'two'},
		                        {value:1, name:'one'},
		                        {value:1, name:'two'},
		                        {value:1, name:'one'},
		                        {value:1, name:'two'},
		                        {value:1, name:'one'},
		                        {value:1, name:'two'},
		                        {value:1, name:'one'},
		                        {value:1, name:'two'},
		                        {value:1, name:'one'},
		                        {value:1, name:'two'},
		                        {value:1, name:'one'},
		                        {value:1, name:'two'},
		                        {value:1, name:'one'},
		                        {value:1, name:'two'},
		                        {value:1, name:'one'},
		                        {value:1, name:'two'},
		                        {value:1, name:'one'},
		                        {value:1, name:'two'},
		                        {value:1, name:'one'},
		                        {value:1, name:'two'},
		                        {value:1, name:'one'},
		                        {value:1, name:'two'},
		                        {value:1, name:'one'},
		                        {value:1, name:'two'},
		                        {value:1, name:'one'},
		                        {value:1, name:'two'},
		                        {value:1, name:'one'},
		                        {value:1, name:'two'},
		                        {value:1, name:'one'},
		                        {value:1, name:'two'},
		                        {value:1, name:'one'},
		                        {value:1, name:'two'},
		                        {value:1, name:'one'},
		                        {value:1, name:'two'},
		                        {value:1, name:'one'},
		                        {value:1, name:'two'},
		                        {value:1, name:'one'},
		                        {value:1, name:'two'},
		                        {value:1, name:'one'},
		                        {value:1, name:'two'},
		                        {value:1, name:'one'},
		                        {value:1, name:'two'},
		                        {value:1, name:'one'},
		                        {value:1, name:'two'},
		                        {value:1, name:'one'},
		                        {value:1, name:'two'},
		                        {value:1, name:'one'},
		                        {value:1, name:'two'},
		                        {value:1, name:'one'},
		                        {value:1, name:'two'},
		                        {value:1, name:'one'},
		                        {value:1, name:'two'},
		                        {value:1, name:'one'},
		                        {value:1, name:'two'},
		                        
		                    ],
		                    label: {
		                        normal: {
		                            show: false,
		                            position: 'center'
		                        },
		                    },
		                    itemStyle:{
		                        normal:{
		                            color: function(params){
		                                var index_color = params.name;
		                                if(index_color=="one"){
		                                    return '#092A50';
		                                }else if(index_color=='two') {
		                                    return 'transparent';
		                                }
		                            } 
		                        }
		                    }
		                },
		                
		            ]
		        }
		        myChart.setOption(option, true);
		        return myChart;
		},
        
        switcFullScreen:function(){

        },
        enterOld:function(){},
        showAlarm:function(){},
        selectPoint:function(key){
            this.$emit("selectPoint",key)
        },
        enterPage:function(key){
            this.$emit("selectUrl",key)
        }
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
    .loncom_content{
    width: 100%;
    height: 100%;
    min-width: 1200px;
    min-height: 760px;
    overflow: hidden;
    position: relative;
    .loncom-index-body{
        width: 100%;
        height: 100%;
        overflow: hidden;
        background: url(./images/homebg.png) no-repeat center 100px;
        background-size: contain;
        .header{
            width: 100%;
            height: 80px;
            background: #000D46;
        }
        .header .header-con {
            display: flex;
            flex-wrap: wrap;
            width:100%;
        }
        .header .row-side{
            width: calc(50% - 250px);
            padding-right: 50px;
        }
        .header .row-side .wk-xz{
            height:60px;
            width: 100%;
            background: #072567; 
            position:relative;
            border-bottom: 1px solid #103c86;
        }
        .header .row-side .wk-xz a.header-home{
            display:block;
            padding:8px 0 0 15px;
        }
        .header .row-side .wk-xz .wk-sj-right{
            position: absolute;
            top: 0;
            right: -23px;
            border-top: 37px solid transparent;
            border-bottom: 24px solid transparent;
            border-left: 24px solid #072567;
        }
        .header .row-side .wk-xz .wk-sj-right:before{
            content: "";
            width: 47px;
            height: 1px;
            position: absolute;
            right: -11px;
            top: -20px;
            background: #103c86;
            transform: rotate(57deg);
        }
        .header .row-side .wk-xz .wk-sj-right:after{
            content: "";
            width: 34px;
            height: 1px;
            position: absolute;
            right: -4px;
            bottom: -12px;
            background: #103c86;
            transform: rotate(-44deg);
        }
        .header .row-side .wk-xz .wk-sbx{
            width: 70px;
            height: 8px;
            position: absolute;
            right: -50px;
            top: 2px;
            background: #072567;
            transform: rotate(54deg) skew(-35deg); 
        }
        .header .row-side .wk-xz .wk-tix{
            position: absolute;
            bottom: 0px;
            right: -78px;
            width: 68px;
            height: 0;
            border-bottom: 20px solid #072567;
            border-left: 18px solid transparent;
            border-right: 15px solid transparent;
        }
        .header .row-side .wk-xz ul{
            position: absolute;
            top: 0;
            right: 0;
            width: 100%;
            
        }
        .header .row-side .wk-xz ul li{
            float: left;
            margin:15px 0 0 45px;
            cursor: pointer;
        }
        .header .row-side .wk-xz ul li img{
            width: 30px;
        }


        .header .row-cen{
            width: 500px;
            height: 100%;
            overflow: hidden; 
        }
        .header .row-cen .title{
            width:calc(100% - 100px);
            margin:0 auto;
            height:100%;
            line-height: 76px;
            text-align: center;
            background: #072567;
            position: relative;
        }
        .header .row-cen .title .title-con{
            color:#E3F0FF;
            font-size:28px;
            display: block;
            height:100%;
            width:100%;
        }
        .header .row-cen .title .title-bg{
            display: block;
            width: 60%;
            left: 20%;
            height: 4px;
            bottom: 0;
            position: relative;
            bottom: -1px;
            box-shadow: 0 0 24px #ffffff, inset -0.25rem 0 0 0.5rem rgba(14, 10, 10, 0.1);
        }
        .header .row-cen .title .title-con:before{
            content:"";
            width: 51%;
            height: 3px;
            position: absolute;
            left: 0;
            bottom: 0;
            z-index: 9;
            background: linear-gradient(to left, #4170F9, #0C3C7F);
        }
        .header .row-cen .title .title-con:after{
            content:"";
            width: 51%;
            height: 3px;
            position: absolute;
            right: 0;
            bottom: 0;
            z-index: 9;
            background: linear-gradient(to right, #4170F9, #0C3C7F);
        }
        .header .row-cen .title .title-left{
            height: 0;
            position: absolute;
            left: -52px;
            top: 0;
            width: 0;
            border-top: 80px solid #072567;
            border-left: 52px solid transparent;
        }
        .header .row-cen .title .title-left:before{
            content: "";
            width: 20px;
            height: 4px;
            position: absolute;
            background: #3469BA;
            z-index: 99;
            bottom: 0;
            right: -20px;
        }
        .header .row-cen .title .title-left:after{
            content: "";
            width: 40px;
            height: 4px;
            position: absolute;
            background: #3469BA;
            z-index: 99;
            bottom: 0;
            right: -19px;
            transform: rotate(54deg);
        }
        .header .row-cen .title .title-right{
            height:0;
            position:absolute;
            right:-52px;
            top:0;
            width:0;
            border-top:80px solid #072567;
            border-right:52px solid transparent;
        }
        .header .row-cen .title .title-right:before{
            content: "";
            width: 20px;
            height: 4px;
            position: absolute;
            background: #3469BA;
            z-index: 99;
            bottom: 0;
            right: -1px;
        }
        .header .row-cen .title .title-right:after{
            content: "";
            width: 40px;
            height: 4px;
            position: absolute;
            background: #3469BA;
            z-index: 99;
            bottom: 0;
            right: -21px;
            transform: rotate(-54deg);
        }
        .header .row-cen .title:before{
            content: "";
            width: 1px;
            height: 100px;
            background: #103c86;
            position: absolute;
            left: 0;
            bottom: 0;
            left: -33px;
            bottom: 0;
            transform: rotate(-33deg);
            z-index: 9;
        }
        .header .row-cen .title:after{
            content: "";
            width: 1px;
            height: 100px;
            background: #103c86;
            position: absolute;
            right: 0;
            bottom: 0;
            right: -33px;
            bottom: 0;
            transform: rotate(33deg);
            z-index: 9;
        }
        .main{
            padding: 0 20px;
            width: 100%;
            height: calc(100% - 80px);
            display: block;
            overflow: hidden;
        }
        .main .main-left,.main .main-right{
            height: 100%;
            width: 22%;
            float: left;
            display: block;
        }
        .main .loncom-index-con{
            width: 100%;
            height: 190px;
            margin-top:10px;
        }
        .main .loncom-index-box-left{
            height: calc(50% - 135px);
        }
        .main .loncom-index-con-left,
        .main .loncom-index-con-right{
            height: calc(100% - 50px);
        }
        .main .loncom-index-box-right{
            height: calc(100% - 485px);
        }
        .main .main-cen{
            width: 56%;
            height: 100%;
            float: left;
            padding: 0 20px;
        }
        .main .main-cen .cen-img{
            width: 100%;
            height: calc(100% - 165px);
            padding: 20px 0 10px 0;
            display: table;
        }
        .main .main-cen .cen-img .cen-img-con{
            display: table-cell;
            vertical-align: middle;
        }
        .main .main-cen .cen-img .cen-img-con img{
            width: 100%;
            max-height: 100%;
            max-width: 100%;
        }
        .main .main-cen .cen-bottom{
            width: 100%;
            overflow: hidden;
        }
        .main .main-cen .cen-bottom ul{
            margin: 0;
            width: 100%;
            display: flex;
            justify-content: center;
        }
        .main .main-cen .cen-bottom ul li{
            text-align: center;
            margin: 0 10px;
        }
        .main .main-cen .cen-bottom ul li img{
            height: 130px;
        }
        .main .main-cen .cen-bottom ul li div{
            color: #B1BFF5;
            height: 25px;
            line-height: 25px;
        }
        .main .loncom-index-gh-title{
            width: 100%;
            padding: 5px 20px 0;
            margin: 0;
        }
        .main .loncom-index-gh li{
            width: 100%;
            color: #0086FF;
            font-size: 14px;
            height: 34px;
            line-height: 34px;
        }
        .main .loncom-index-gh li .name{
            width: 85px;
            text-indent: 10px;
            float: left;
            color: #B1BFF5;
        }
        .main .loncom-index-gh li .value{
            width: calc(100% - 85px);
            float: left;
        }
        .main .loncom-index-gh li .value span{
            width: 50px;
            text-indent: 5px;
            float:left;
        }
        .main .loncom-index-gh li .value .loncom-progress{
            width: calc(100% - 50px);
            height: 11px;
            background: #021645;
            float:left;
            margin-top: 12px;
        }
        .main .loncom-index-gh li .value .loncom-progress-con{
            height:100%;
            background: linear-gradient(to right,#008EFF 50%, transparent 0%);
            background-size: 4px 100%;
        }
        .main .loncom-index-gh li .value .loncom-progress em{
            width: 2px;
            height: 100%;
            background: #008EFF;
            margin: 0 1px;
            display: block;
            float: left;
        }
        .main .loncom-index-gh-title li .name{
            color: #0086FF;
        }
        .main .loncom-index-gh-title li .value{
            text-align: center;
        }
        .main .loncom-index-gh li:nth-of-type(2n){
            background: #000B2C;
        }
        .main .loncom-index-gh-con{
            height:calc(100% - 39px);
        }
        .main .loncom-boxpic{
            overflow: hidden;
            color: #5B6A93;
        }
        .main .loncom-boxpic li{
            width: 20%;
            text-align: center;
            float: left;
            font-size: 12px;
        }
        .main .loncom-boxpic li img{
            width: 30px;
            height: 30px;
        }
        .main .loncom-boxpic div{
            margin-top: 6px;
        }
        .main .loncom-alarmbox{
            color: #EC8603;
            font-size: 14px;
            height: 100%;
            line-height: 32px;
        }
        .main .loncom-alarmbox ul{
            margin: 5px 0 0 0;
        }
        .main .loncom-alarmbox ul li{
            height: 32px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
        .main .loncom-alarmbox ul li span{
            float: right;
            color: #5B6A93;
        }
        .main .loncom-alarmbox ul li.loncom-pdlr20:nth-of-type(2n){
            background: #020B32;
        }
        .main .loncom-numbox{
            width: calc(100% - 10px);
            height: calc(100% - 10px);
            top: 0;
            position: absolute;
        }
        .main .loncom-numbox ul{
            width: 100%;
            height: 100%;
        }
        .main .loncom-numbox ul li{
            width: calc(50% - 10px);
            height: calc(50% - 10px);
            margin: 10px 0 0 10px;
            float: left;
        }
        
        .loncom-radar {
            position: relative;
            margin:0 auto;
        }
        .loncom-radar em{
            position: absolute;
            width: 5%;
            height: 5%;
            background: #026BCE;
            border-radius: 50%;
        }
        .loncom-radar em.one{
            top: 30%;
            left: 30%;
        }
        .loncom-radar em.two{
            top: 60%;
            left: 30%;
        }
        .loncom-radar em.active{
            background:#C7445A;
            animation: anm0 1.5s infinite ease-in-out 0s; 
        }
        @keyframes anm0 {
            0% {
                transform: scale(1);
            }
            50% {
                transform: scale(1.5);
            }
            100% {
                transform: scale(1);
            }
        }
        .radar{
            width:100%;
            height:100%;
            position: relative;
        }
        .loncom-radar:after {
            content: ' ';
            display: block;
            background-image: linear-gradient(45deg, rgba(0, 255, 51, 0) 50%, #026BCE 100%);
            width: 41%;
            height: 41%;
            position: absolute;
            top: 9%;
            left: 9%;
            animation: radar-beam 5s infinite;
            animation-timing-function: linear;
            transform-origin: bottom right;
            border-radius: 100% 0 0 0;
        }

        @keyframes radar-beam {
            0% {
                transform: rotate(0deg);
            }
            100% {
                transform: rotate(360deg);
            }
        }
        @keyframes blips {
        
            26% {
                background: radial-gradient(2vmin circle at 75% 70%, #ffffff 10%, #026BCE 30%, rgba(255, 255, 255, 0) 100%), radial-gradient(2vmin circle at 63% 72%, #ffffff 10%, #026BCE 30%, rgba(255, 255, 255, 0) 100%), radial-gradient(2vmin circle at 56% 86%, #ffffff 10%, #026BCE 30%, rgba(255, 255, 255, 0) 100%);
                opacity: 1;
            }
            100% {
                background: radial-gradient(2vmin circle at 75% 70%, #ffffff 10%, #026BCE 30%, rgba(255, 255, 255, 0) 100%), radial-gradient(2vmin circle at 63% 72%, #ffffff 10%, #026BCE 30%, rgba(255, 255, 255, 0) 100%), radial-gradient(2vmin circle at 56% 86%, #ffffff 10%, #026BCE 30%, rgba(255, 255, 255, 0) 100%);
                opacity: 0;
            }
        }

    }
    .loncom-box-con{
        width: 100%;
        height: 100%;
    }
    .side-alarm{
        width: 280px;
        height: calc(100% - 70px);
        position: absolute;
        right: -300px;
        transition: All 0.4s ease-in-out;
        bottom: 0;
        color: #C0CFF5;
        background: linear-gradient(to left, rgba(0, 0, 0, 0.8) 0%,rgba(0, 13, 69, 0.8) 100%);
    }
    .side-alarm-box{
        padding: 15px;
        border-bottom: 1px solid #101B4A;
    }
    .side-alarm-box-top{
        display: flex;
        justify-content: space-between;
    }
    .side-alarm-box-top .title{
        display: flex;
        align-items: center;
        font-size: 16px;
        width: calc(100% - 35px);
    }
    .side-alarm-box-top .title .img{
        margin-right: 5px;
    }
    .side-alarm-box-top .sure{
        color: #0086FF;
        width: 35px;
        text-align: right;
    }
    .side-alarm-content{
        color: #8499C0;
        margin: 10px 0 5px 0;
    }
    .side-alrm-time{
        color: #8499C0;
    }
    .loncom-pdlr20{
        padding: 0 20px 0 20px;
    }
    .loncom-pd20{
        padding: 20px;
    }
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
.newTheme .layui-layer-title,
.newTheme .layui-layer-btn{
background-color: #072567;
border-color: #103c86;
color: #B1BFF5;
}
.newTheme .layui-layer-content{
background:#000C41;
color:#fff;
}
.newTheme .layui-layer-btn .layui-layer-btn0{
border-color: #3D81E2;
background-color: #3D81E2;
color: #B1BFF5;
}
.newTheme .layui-layer-btn a{
color: #B1BFF5;
border-color: #3D81E2;
}
</style>
