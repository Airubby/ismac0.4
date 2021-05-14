<template>
    <div class="content">
        <div class="centermap">
            <div id="centermap">
                <img src="./config/images/ups-tuopu.png" usemap="#map" id="mapimg">
                <map name="map" id="map">
                    <div class="mapshow" coords="1080,45,100">
                        <div class="maparea maparea-title">
                            主路逆变供电
                        </div>
                    </div>
                    <div class="mapshow" coords="160,65,100">
                        <div class="maparea">
                            <div class="table-box">
                                <div class="table-box-list">
                                    <div class="table-box-span table-box-span-title">UPS旁路</div>
                                    <div class="table-box-span border-left"><span>A</span></div>
                                    <div class="table-box-span border-left"><span>B</span></div>
                                    <div class="table-box-span border-left"><span>C</span></div>
                                </div>
                                <div class="table-box-list border-top">
                                    <div class="table-box-span table-box-span-title">输出电流(A)</div>
                                    <div class="table-box-span border-left">5.0</div>
                                    <div class="table-box-span border-left">5.0</div>
                                    <div class="table-box-span border-left">5.0</div>
                                </div>
                                <div class="table-box-list border-top">
                                    <div class="table-box-span table-box-span-title">输出电压(V)</div>
                                    <div class="table-box-span border-left">220</div>
                                    <div class="table-box-span border-left">220</div>
                                    <div class="table-box-span border-left">220</div>
                                </div>
                                <div class="table-box-list border-top">
                                    <div class="table-box-span table-box-span-title">输出频率(Hz)</div>
                                    <div class="table-box-span border-left">5.0</div>
                                    <div class="table-box-span border-left">5.0</div>
                                    <div class="table-box-span border-left">5.0</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="mapshow" coords="-180,325,100">
                        <div class="maparea">
                            <div class="table-box">
                                <div class="table-box-list">
                                    <div class="table-box-span table-box-span-title">UPS输入</div>
                                    <div class="table-box-span border-left"><span>A</span></div>
                                    <div class="table-box-span border-left"><span>B</span></div>
                                    <div class="table-box-span border-left"><span>C</span></div>
                                </div>
                                <div class="table-box-list border-top">
                                    <div class="table-box-span table-box-span-title">输出电压(V)</div>
                                    <div class="table-box-span border-left">220</div>
                                    <div class="table-box-span border-left">220</div>
                                    <div class="table-box-span border-left">220</div>
                                </div>
                                <div class="table-box-list border-top">
                                    <div class="table-box-span table-box-span-title">输出电流(A)</div>
                                    <div class="table-box-span border-left">5.0</div>
                                    <div class="table-box-span border-left">5.0</div>
                                    <div class="table-box-span border-left">5.0</div>
                                </div>
                                <div class="table-box-list border-top">
                                    <div class="table-box-span table-box-span-title">输入频率(Hz)</div>
                                    <div class="table-box-span border-left">15</div>
                                    <div class="table-box-span border-left">15</div>
                                    <div class="table-box-span border-left">15</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="mapshow" coords="380,425,100">
                        <div class="maparea">
                            <div class="table-box">
                                <div class="table-box-list">
                                    <div class="table-box-span table-box-span-title">蓄电池</div>
                                    <div class="table-box-span border-left"></div>
                                </div>
                                <div class="table-box-list border-top">
                                    <div class="table-box-span table-box-span-title">电池电压(V)</div>
                                    <div class="table-box-span border-left">110</div>
                                    <div class="table-box-span table-box-span-title border-left">电流(A)</div>
                                    <div class="table-box-span border-left">2.0</div>
                                </div>
                                <div class="table-box-list border-top">
                                    <div class="table-box-span table-box-span-title">运行状态</div>
                                    <div class="table-box-span border-left">浮充</div>
                                    <div class="table-box-span table-box-span-title border-left">剩余容量(%)</div>
                                    <div class="table-box-span border-left">20</div>
                                </div>
                                <div class="table-box-list border-top">
                                    <div class="table-box-span table-box-span-title">后备时间(min)</div>
                                    <div class="table-box-span border-left">60</div>
                                    <div class="table-box-span table-box-span-title border-left"></div>
                                    <div class="table-box-span border-left"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="mapshow" coords="950,325,100">
                        <div class="maparea">
                            <div class="table-box">
                                <div class="table-box-list">
                                    <div class="table-box-span table-box-span-title">UPS输出</div>
                                    <div class="table-box-span border-left"><span>A</span></div>
                                    <div class="table-box-span border-left"><span>B</span></div>
                                    <div class="table-box-span border-left"><span>C</span></div>
                                </div>
                                <div class="table-box-list border-top">
                                    <div class="table-box-span table-box-span-title">输出电压(V)</div>
                                    <div class="table-box-span border-left">220</div>
                                    <div class="table-box-span border-left">220</div>
                                    <div class="table-box-span border-left">220</div>
                                </div>
                                <div class="table-box-list border-top">
                                    <div class="table-box-span table-box-span-title">输出电流(A)</div>
                                    <div class="table-box-span border-left">5.0</div>
                                    <div class="table-box-span border-left">5.0</div>
                                    <div class="table-box-span border-left">5.0</div>
                                </div>
                                <div class="table-box-list border-top">
                                    <div class="table-box-span table-box-span-title">输入频率(Hz)</div>
                                    <div class="table-box-span border-left">15</div>
                                    <div class="table-box-span border-left">15</div>
                                    <div class="table-box-span border-left">15</div>
                                </div>
                            </div>
                        </div>
                    </div>
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
        this.adjust();
        window.onresize = ()=> {  
            this.flushAdjust();
        }  
    },
    data(){
        return{
            timeout:null
        }
    },
    computed: {
    },
	methods: {
        flushAdjust:function(){
            clearTimeout(this.timeout);  
            this.timeout = setTimeout( () =>{ 
                this.adjust(); 
            }, 400);//页面大小变化，重新加载页面以刷新MAP  
        },
        adjust(){
            //这样判断解决刷新有时候不执行的问题
            if(!document.getElementById("mapimg").complete){
                this.flushAdjust();
                return;
            }
            let maplist=document.getElementById("map").getElementsByClassName('mapshow');
            console.log(maplist)
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
            if(xdom<ydom){   //高度有多的 
                rate=mapWidth/width;  ////高度有多的 按宽度缩放比例
                number=domHeight-mapHeight;
            }
            if(width<=domWidth&&height<=domHeight){
                for(let i=0;i<maplist.length;i++){
                    let oldCoords = maplist[i].getAttribute("coords"); //定义一个初始化的coords 改变浏览器用这个值去计算
                    let newcoords = this.adjustPosition(oldCoords,rate);  
                    maplist[i].querySelector(".maparea").setAttribute("coords", newcoords.toString());  
                    maplist[i].style.left=(domWidth-width)/2+parseFloat(newcoords[0])+"px";
                    maplist[i].style.top=(domHeight-height)/2+parseFloat(newcoords[1])+"px";
                    
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
        adjustPosition(position,rate){
            let each = position.split(",");  
            for (let i = 0; i < each.length; i++) { 
                each[i] = Math.round(parseFloat(each[i]) * rate).toString();//坐标  
            }  
            return each;  
        }

	},
    components: {
        
    }
}
</script>
<style lang="less" scoped>
    .module-theme(...){
        .centermap{
            padding: 0px 200px 100px;
            width: 100%;
            height: 100%;
            position: relative;
        }
        #centermap{
            text-align: center;
            width: 100%;
            height: 100%;
            position: relative;
        }
        .maparea-title{
            background: #0077E9;
            color: #021742;
            min-width: 130px;
            padding: 15px 20px;
            border-radius: 5px;
        }
        #centermap img{
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            margin: auto;
            max-width: 100%;
            max-height: 100%;
        }
        #centermap img{
            max-width: 100%;
            max-height: 100%;
        }
        #centermap .mapshow{
            position: absolute;
            color: @color;
            text-align: center;
        }
        .table-box{
            border: 1px solid @lineColor;
        }
        .table-box-list{
            display: flex;
        }
        .table-box-list .table-box-span{
            width: 60px;
            min-height: 30px;
            line-height: 30px;
            text-align: center;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .table-box-list .table-box-span.table-box-span-title{
            width: 120px;
        }
        .table-box-list .table-box-span span{
            color: #086BCD;
            border: 2px solid #086BCD;
            background: #031944;
            width: 28px;
            height: 28px;
            line-height: 24px;
            display: inline-block;
            margin: 5px 0;
            font-size: 18px;
        }
        .border-top{
            border-top: 1px solid @lineColor;
        }
        .border-left{
            border-left: 1px solid @lineColor;
        }
    }
</style>