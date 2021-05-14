<template>
    <div class="centermap">
        <div id="centermap">
            <img :src="templateUrl+'/images/bg.png'" usemap="#map" id="mapimg">
            <map name="map" id="map">
                <div class="mapshow" coords="-100,65,100">
                    <div class="maparea">
                        <div class="table-box">
                            <div class="table-box-list">
                                <div class="table-box-span">
                                    <img :src="templateUrl+'/images/panglu.png'" class="img">UPS旁路
                                </div>
                                <div class="table-box-span"><span>A</span></div>
                                <div class="table-box-span"><span>B</span></div>
                                <div class="table-box-span"><span>C</span></div>
                            </div>
                            <div class="table-box-list border-top">
                                <div class="table-box-span">旁路电压(V)</div>
                                <div class="table-box-span"><span class="table-value">220</span></div>
                                <div class="table-box-span"><span class="table-value">220</span></div>
                                <div class="table-box-span"><span class="table-value">220</span></div>
                            </div>
                            <div class="table-box-list border-top">
                                <div class="table-box-span">旁路电流(A)</div>
                                <div class="table-box-span"><span class="table-value">5.0</span></div>
                                <div class="table-box-span"><span class="table-value">5.0</span></div>
                                <div class="table-box-span"><span class="table-value">5.0</span></div>
                            </div>
                            <div class="table-box-list border-top">
                                <div class="table-box-span">旁路频率(Hz)</div>
                                <div class="table-box-span"><span class="table-value">5.0</span></div>
                                <div class="table-box-span"><span class="table-value">5.0</span></div>
                                <div class="table-box-span"><span class="table-value">5.0</span></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="mapshow" coords="-100,370,100">
                    <div class="maparea">
                        <div class="table-box">
                            <div class="table-box-list">
                                <div class="table-box-span">
                                    <img :src="templateUrl+'/images/shuru.png'" class="img">UPS输入
                                </div>
                                <div class="table-box-span"><span>A</span></div>
                                <div class="table-box-span"><span>B</span></div>
                                <div class="table-box-span"><span>C</span></div>
                            </div>
                            <div class="table-box-list border-top">
                                <div class="table-box-span">旁路电压(V)</div>
                                <div class="table-box-span"><span class="table-value">220</span></div>
                                <div class="table-box-span"><span class="table-value">220</span></div>
                                <div class="table-box-span"><span class="table-value">220</span></div>
                            </div>
                            <div class="table-box-list border-top">
                                <div class="table-box-span">旁路电流(A)</div>
                                <div class="table-box-span"><span class="table-value">5.0</span></div>
                                <div class="table-box-span"><span class="table-value">5.0</span></div>
                                <div class="table-box-span"><span class="table-value">5.0</span></div>
                            </div>
                            <div class="table-box-list border-top">
                                <div class="table-box-span">旁路频率(Hz)</div>
                                <div class="table-box-span"><span class="table-value">5.0</span></div>
                                <div class="table-box-span"><span class="table-value">5.0</span></div>
                                <div class="table-box-span"><span class="table-value">5.0</span></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="mapshow" coords="480,425,100">
                    <div class="maparea">
                        <div class="table-box">
                            <div class="table-box-list">
                                <div class="table-box-span">
                                    <img :src="templateUrl+'/images/xudianchi.png'" class="img">蓄电池
                                </div>
                                <div class="table-box-span"><span></span></div>
                            </div>
                            <div class="table-box-list border-top">
                                <div class="table-box-span">电池电压(V)</div>
                                <div class="table-box-span"><span class="table-value">220</span></div>
                            </div>
                            <div class="table-box-list border-top">
                                <div class="table-box-span">剩余容量(%)</div>
                                <div class="table-box-span"><span class="table-value">5.0</span></div>
                            </div>
                            <div class="table-box-list border-top">
                                <div class="table-box-span">后备时间(Min)</div>
                                <div class="table-box-span"><span class="table-value">5.0</span></div>
                            </div>
                            <div class="table-box-list border-top">
                                <div class="table-box-span">电池电流(A)</div>
                                <div class="table-box-span"><span class="table-value">5.0</span></div>
                            </div>
                            <div class="table-box-list border-top">
                                <div class="table-box-span">运行状态</div>
                                <div class="table-box-span"><span>浮充</span></div>
                            </div>

                        </div>
                    </div>
                </div>
                <div class="mapshow" coords="920,370,100">
                    <div class="maparea">
                        <div class="table-box">
                            <div class="table-box-list">
                                <div class="table-box-span">
                                    <img :src="templateUrl+'/images/shuru.png'" class="img">UPS输出
                                </div>
                                <div class="table-box-span"><span>A</span></div>
                                <div class="table-box-span"><span>B</span></div>
                                <div class="table-box-span"><span>C</span></div>
                            </div>
                            <div class="table-box-list border-top">
                                <div class="table-box-span">旁路电压(V)</div>
                                <div class="table-box-span"><span class="table-value">220</span></div>
                                <div class="table-box-span"><span class="table-value">220</span></div>
                                <div class="table-box-span"><span class="table-value">220</span></div>
                            </div>
                            <div class="table-box-list border-top">
                                <div class="table-box-span">旁路电流(A)</div>
                                <div class="table-box-span"><span class="table-value">5.0</span></div>
                                <div class="table-box-span"><span class="table-value">5.0</span></div>
                                <div class="table-box-span"><span class="table-value">5.0</span></div>
                            </div>
                            <div class="table-box-list border-top">
                                <div class="table-box-span">旁路频率(Hz)</div>
                                <div class="table-box-span"><span class="table-value">5.0</span></div>
                                <div class="table-box-span"><span class="table-value">5.0</span></div>
                                <div class="table-box-span"><span class="table-value">5.0</span></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="mapshow" coords="1060,40,100">
                    <div class="maparea">
                        <div class="table-box table-text">
                            主路逆变供电
                        </div>
                    </div>
                </div>
            </map>
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
        this.adjust();
        window.onresize = ()=> {
            clearTimeout(this.timeout);
            this.timeout = setTimeout( () =>{ 
                this.adjust(); 
            }, 100);
        }
    },
    data(){
        return{
            timeout:null,
            initParams:{
                wendu:"5",
                shidu:"7",
            }
        }
    },
	methods: {
        adjust(){
            //这样判断解决刷新有时候不执行的问题
            if(!document.getElementById("mapimg").complete){
                clearTimeout(this.timeout);
                this.timeout = setTimeout( () =>{ 
                    this.adjust(); 
                }, 400);
                return;
            }
            let maplist=document.getElementById("map").getElementsByClassName('mapshow');
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
        },
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
    .centermap{
        width: 100%;
        height: 100%;
        min-width: 800px;
        min-height: 500px;
        padding: 20px 100px 170px 100px;
    }
    #centermap{
        text-align: center;
        width: 100%;
        height: 100%;
        position: relative;
    }
    #centermap #mapimg{
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        max-width: 100%;
        max-height: 100%;
    }
    #centermap #mapimg{
        max-width: 100%;
        max-height: 100%;
    }
    #centermap .mapshow{
        position: absolute;
        color: #8b9ed4;
        text-align: center;
    }
    .table-box{
        border: 1px solid #258BC0;
        border-radius: 5px;
        min-width: 130px;
        min-height: 60px;
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
    }
    .table-box-list .table-value{
        border: 1px solid #258BC0;
        border-radius: 20px;
        padding: 0 10px;
    }
</style>
