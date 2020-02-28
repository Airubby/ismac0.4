<template>
    <div class="bgfffcontent">
        <div class="breadcrumb">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>{{$t("navbar.control")}}</el-breadcrumb-item>
                <el-breadcrumb-item>{{$t("navbar.controlAlarmRecord")}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="public_content">
            <div id="centermap" class="centermap">
                <img src="/images/school.png" usemap="#map" id="mapimg">
                <map name="map" id="map">
                    <el-popover
                        class="mapshow" coords="675,405,50"
                        placement="top"
                        width="260"
                        trigger="hover">
                        <div slot="reference" coords="675,405,50" class="maparea openair" @click="enterInfo"></div>
                        <div class="mapcon loncom_index_publicbox">
                            <h2>1#楼</h2>
                            <div class="info">
                                <p>
                                    <span class="txt">总能耗</span>
                                    <span class="number">
                                        <em>126335.65</em>kw
                                    </span>
                                </p>
                                <p>
                                    <span class="txt">今日用电</span>
                                    <span class="number">
                                        <em>126</em>kwh
                                    </span>
                                </p>
                            </div>
                            <div class="echarts" id="myChart5"></div>
                        </div>
                    </el-popover>
                    <el-popover
                        class="mapshow" coords="550,735,50"
                        placement="top"
                        width="260"
                        trigger="hover">
                        <area shape="circle" slot="reference" coords="550,735,50" class="maparea" @click="enterInfo"></area>
                        <div class="mapcon loncom_index_publicbox">
                            <h2>2#楼</h2>
                            <div class="info">
                                <p>
                                    <span class="txt">总能耗</span>
                                    <span class="number">
                                        <em>126335.65</em>kw
                                    </span>
                                </p>
                                <p>
                                    <span class="txt">今日用电</span>
                                    <span class="number">
                                        <em>126</em>kwh
                                    </span>
                                </p>
                            </div>
                            <div class="echarts" id="myChart4"></div>
                        </div>
                    </el-popover>
                    <el-popover
                        class="mapshow" coords="885,240,50"
                        placement="top"
                        width="260"
                        trigger="hover">
                        <area shape="circle" slot="reference" coords="885,240,50" class="maparea" @click="enterInfo"></area>
                        <div class="mapcon loncom_index_publicbox">
                            <h2>3#楼</h2>
                            <div class="info">
                                <p>
                                    <span class="txt">总能耗</span>
                                    <span class="number">
                                        <em>126335.65</em>kw
                                    </span>
                                </p>
                                <p>
                                    <span class="txt">今日用电</span>
                                    <span class="number">
                                        <em>126</em>kwh
                                    </span>
                                </p>
                            </div>
                            <div class="echarts" id="myChart3"></div>
                        </div>
                    </el-popover>
                </map>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    created() {
        
    },
    mounted() {
        document.querySelector('#mapimg').addEventListener('load',  () =>{
            this.adjust();
        })
        window.onresize = ()=> {  
            clearTimeout(timeout);  
            this.timeout = setTimeout( () =>{ 
                this.adjust(); 
            }, 100);//页面大小变化，重新加载页面以刷新MAP  
        }  
    },
    data(){
        return{
            timeout:null  //onresize触发次数过多，设置定时器
        }
    },
	methods: {
        adjust:function(){
            if(!document.getElementById("mapimg").complete){
                clearTimeout(timeout);  
                this.timeout = setTimeout( () =>{ 
                    this.adjust(); 
                }, 400);//页面大小变化，重新加载页面以刷新MAP  
                return;
            }
            let maplist=document.getElementById("map").children;
            let mapimg=document.getElementById("mapimg");
            let centermap=document.getElementById("centermap");
            let domWidth=centermap.offsetWidth;
            let domHeight=centermap.offsetHeight;
            let mapWidth=mapimg.offsetWidth;
            let mapHeight=mapimg.offsetHeight;
            let img=new Image();
            img.src=mapimg.getAttribute("src");
            let width=img.width;
            let height=img.height;

            
            let xdom=domWidth/mapWidth;
            let ydom=domHeight/mapHeight;
            let rate=mapHeight/height;  ////宽度有多的 按高度缩放比例
            let number=domWidth-mapWidth;
            if(xdom<ydom){   //高度有多的 ,宽度填满了dom元素
                rate=mapWidth/width;  ////高度有多的 按宽度缩放比例
                number=domHeight-mapHeight;
            }
            console.log("imgk:"+width+";imgh:"+height+";domk:"+domWidth+";domh:"+domHeight+";mapk:"+mapWidth+";maph:"+mapHeight+";rate:"+rate)
            if(width<=domWidth&&height<=domHeight){
                for(let i=0;i<maplist.length;i++){
                    let oldCoords = maplist[i].getAttribute("coords"); //定义一个初始化的coords 改变浏览器用这个值去计算
                    let newcoords = this.adjustPosition(oldCoords,rate);  
                    maplist[i].querySelector(".maparea").setAttribute("coords", newcoords.toString());  
                    maplist[i].style.left=(domWidth-width)/2+parseFloat(newcoords[0])+"px";
                    maplist[i].style.top=(domHeight-height)/2+parseFloat(newcoords[1])+"px";
                    
                    //多边形的可以设置背景块展示
                    // maplist[i].querySelector(".maparea").style.width=parseFloat(newcoords[2])-parseFloat(newcoords[0])+"px";
                    // maplist[i].querySelector(".maparea").style.height=parseFloat(newcoords[3])-parseFloat(newcoords[1])+"px";
                }
            }else{
                for(let i=0;i<maplist.length;i++){
                    let oldCoords = maplist[i].getAttribute("coords"); //定义一个初始化的coords 改变浏览器用这个值去计算
                    let newcoords = this.adjustPosition(oldCoords,rate);  
                    maplist[i].querySelector(".maparea").setAttribute("coords", newcoords.toString());  
                    if(xdom>ydom){  //宽度有多的
                        maplist[i].style.left=number/2+parseFloat(newcoords[0])+"px";
                        maplist[i].style.top=newcoords[1]+"px";
                    }else{  //高度有多的
                        maplist[i].style.left=newcoords[0]+"px";
                        maplist[i].style.top=number/2+parseFloat(newcoords[1])+"px";
                    }
                }
            }
            

        },
        adjustPosition:function(position,rate){
            let each = position.split(",");  
            for (let i = 0; i < each.length; i++) { 
                each[i] = Math.round(parseFloat(each[i]) * rate).toString();//坐标  
            }  
            return each;  
        },
        //如果图片宽高拉伸填充满dom；
        adjust1:function(){
            let maplist=document.getElementById("map").children;
            let mapimg=document.getElementById("mapimg");
            let centermap=document.getElementById("centermap");
            let domWidth=centermap.offsetWidth;
            let domHeight=centermap.offsetHeight;
            let img=new Image();
            img.src=mapimg.getAttribute("src");
            let width=img.width;
            let height=img.height;

            let xrate=domWidth/width;
            let yrate=domHeight/height;

            for(let i=0;i<maplist.length;i++){
                let oldCoords = maplist[i].getAttribute("coords"); //定义一个初始化的coords 改变浏览器用这个值去计算
                let newcoords = this.adjustPosition(oldCoords,xrate,yrate); 
                maplist[i].style.left=parseFloat(newcoords[0])+"px";
                maplist[i].style.top=parseFloat(newcoords[1])+"px";
                if(newcoords.length>4){  //1栋311,704,806；2栋603-604有异形多边形的
                    maplist[i].querySelector(".maparea").style.width=parseFloat(newcoords[8])-parseFloat(newcoords[0])+"px";
                    maplist[i].querySelector(".maparea").style.height=parseFloat(newcoords[9])-parseFloat(newcoords[1])+"px";
                    maplist[i].querySelector(".othermap-top").style.width=parseFloat(newcoords[2])-parseFloat(newcoords[0])+"px";
                    maplist[i].querySelector(".othermap-top").style.height=parseFloat(newcoords[5])-parseFloat(newcoords[1])+"px";
                    maplist[i].querySelector(".othermap-bottom").style.width=parseFloat(newcoords[6])-parseFloat(newcoords[0])+"px";
                    maplist[i].querySelector(".othermap-bottom").style.height=parseFloat(newcoords[9])-parseFloat(newcoords[7])+"px";
                }else{
                    maplist[i].querySelector(".maparea").style.width=parseFloat(newcoords[2])-parseFloat(newcoords[0])+"px";
                    maplist[i].querySelector(".maparea").style.height=parseFloat(newcoords[3])-parseFloat(newcoords[1])+"px";
                }
            }
        },
        adjustPosition1:function(position,xrate,yrate){
            let each = position.split(",");  
            for (let i = 0; i < each.length; i++) {
                let rate=xrate; 
                if(i%2==1){
                    rate=yrate;
                }
                each[i] = Math.round(parseFloat(each[i]) * rate).toString();//坐标  
            }  
            return each;  
        },
        enterInfo:function(){
            console.log("点击了进入详情页面")
        }
	},
    components: {
        
    }
}
</script>
<style lang="less" scoped>
    .centermap{
        width: 100%;
        height: 100%;
        text-align: center;
        position: relative;
        img{
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            margin: auto;
            max-width: 100%;
            max-height: 100%;
        }
        .mapshow{
            position: absolute;
            .maparea{
                cursor: pointer;
                display: block;
                position: absolute;
                bottom: 36px;
                left: -11px;
                &.openair{
                    background: rgba(138, 110, 35, 0.6);
                }
                &:before{
                    content: "";
                    width: 0;
                    height: 0;
                    display: block;
                    position: absolute;
                    border-left: 0px solid transparent;
                    border-right: 22px solid transparent;
                    border-top: 36px solid #4A78FF;
                    transform: rotate(-31deg);
                }
                &:after{
                    content: "";
                    width: 0;
                    height: 0;
                    display: block;
                    position: absolute;
                    border-right: 0px solid transparent;
                    border-left: 22px solid transparent;
                    border-top: 36px solid #6060E2;
                    transform: rotate(31deg);
                }
            }
            .maparea:hover{
                &:before{
                    border-top: 36px solid #E79626;
                }
                &:after{
                    border-top: 36px solid #ED7818;
                }
            }
        }
    }
</style>