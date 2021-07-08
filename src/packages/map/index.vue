<template>
    <div class="content">
        <div id="centermap" class="centermap">
            <img src="./images/map.png" usemap="#map" id="mapimg">
            <map name="map" id="map">
                <div class="mapshow" :coords="item" v-for="(item,index) in coords" :key="index">
                    <div :coords="item" :title="initParams['p'+(index+1)].showName" class="maparea openair" @click="selectPoint(index)">{{index}}{{initParams["p"+(index+1)].showName}}</div>
                </div>
            </map>
        </div>
    </div>
</template>

<script>
export default {
    props:["templateData","templateUrl","dataObject"],
    created() {
        for(let i=1;i<6;i++){
            this.$set(this.initParams,"p"+i,{key:"p"+i,devid:"",pointid:"",format:"",showName:"测点绑定",value:""})
        }
    },
    mounted() {
        document.querySelector('#mapimg').addEventListener('load',  () =>{
            this.adjust();
        })
        window.onresize = ()=> {  
            clearTimeout(this.timeout);  
            this.timeout = setTimeout( () =>{ 
                this.adjust(); 
            }, 100);//页面大小变化，重新加载页面以刷新MAP  
        }  
    },
    data(){
        return{
            timeout:null,  //onresize触发次数过多，设置定时器
            //竖着排序
            coords:[
                "58,402,212,421","338,420,375,442","338,445,375,466","338,469,375,491","338,494,375,516"
            ],
            initParams:{}
        }
    },
	methods: {
        adjust:function(){
            if(!document.getElementById("mapimg").complete){
                clearTimeout(this.timeout);  
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
                    maplist[i].style.top=(domHeight-height)/2+parseFloat(newcoords[1])+parseFloat(newcoords[3])-parseFloat(newcoords[1])+"px";
                    
                    //多边形的可以设置背景块展示
                    maplist[i].querySelector(".maparea").style.width=parseFloat(newcoords[2])-parseFloat(newcoords[0])+"px";
                    maplist[i].querySelector(".maparea").style.height=parseFloat(newcoords[3])-parseFloat(newcoords[1])+"px";
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
        }
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
                bottom: 0;
                left: 0;
                overflow: hidden;
                background: rgba(0, 0, 0, 0.7);
            }
        }
    }
</style>