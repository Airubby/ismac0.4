import echarts from 'echarts'
import Vue from 'vue'
import axios from 'axios'

//时间格式化
function FormatDate(fmt,value){
  let date=value?new Date(value):new Date();
  let o = {
      "M+": date.getMonth() + 1, //月份 
      "d+": date.getDate(), //日 
      "H+": date.getHours(), //小时 
      "m+": date.getMinutes(), //分 
      "s+": date.getSeconds(), //秒 
      "q+": Math.floor((date.getMonth() + 3) / 3), //季度 
      "S": date.getMilliseconds() //毫秒 
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (let k in o)
      if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}
//获取时间前一段时间  json:{key:"标识",value:2}  标识：y年 m月 d日 h时；value给数字
function GetBeforeDate(json,tdate){
    let date=tdate?new Date(tdate):new Date();
    if(json&&json.key){
        switch (json.key) {
            case "y":
                date=new Date(date.setFullYear(date.getFullYear()-json.value));
                break;
            case "m":
                date=new Date(date.setMonth(date.getMonth()-json.value));
                break;
            case "d":
                date=new Date(date.setDate(date.getDate()-json.value));
                break;
            case "h":
                date=new Date(date.setHours(date.getHours()-json.value));
                break;
            default:
                break;
        }
    }
    return date;
}
function arrayContains(v,arr){
  if(arr.indexOf(v)==-1){
    return false;
  }else{
    return true;
  }
}
/*
普通列表转真树形结构
listToTree(list,{idKey:"id",parentKey:"pid",childrenKey:"children"})
 */
function listToTree(data,option){
    if(data&&data.length>0){
        let options=option||{};
        let ID_KEY=options.idKey||"id";
        let PARENT_KEY=options.parentKey||"pid";
        let CHILDREN_KEY=options.childrenKey||"children";
        let tree=[],childrenOf={};
        for(let i=0;i<data.length;i++){
            var item,id,parentId;
            item=data[i];
            id=item[ID_KEY];
            parentId=item[PARENT_KEY]||"0";
            //每行数据都可能存在子类
            childrenOf[id]=childrenOf[id]||[];
            //初始化子类
            item[CHILDREN_KEY]=childrenOf[id];
            if(parentId!="0"){
                //初始化其父的子节点
                childrenOf[parentId]=childrenOf[parentId]||[];
                //把它推到父类下的children
                childrenOf[parentId].push(item);
            }else{
                tree.push(item);
            }
        }
        return tree;
    }else{
        return [];
    }
}
//全屏切换
let isFullScreen=false;//是否是全屏状态
function switcFullScreen(){
    if(isFullScreen){//是全屏就退出全屏
        if(document.exitFullscreen) {
            document.exitFullscreen();
        } else if(document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if(document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }
    }else{//不是就全屏
        var element=document.documentElement;
        if(element.requestFullscreen) {
            element.requestFullscreen();
        } else if(element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
        } else if(element.webkitRequestFullscreen) {
            element.webkitRequestFullscreen();
        } else if(element.msRequestFullscreen) {
            element.msRequestFullscreen();
        }
    }
    isFullScreen=!isFullScreen;
}
function echartfn(ID,xData,yData){
    // 基于准备好的dom，初始化echarts实例
    let myChart = echarts.init(document.getElementById(ID))
    // 绘制图表
    myChart.setOption({
        title: { text: '在Vue中使用echarts' },
        tooltip: {},
        xAxis: {
            data: xData
        },
        yAxis: {},
        series: [{
            name: '销量',
            type: 'bar',
            data: yData
        }]
    });
    window.addEventListener("resize", () => { 
        setTimeout(function(){
            myChart.resize();
        },0)
    });
    return myChart;
}

function exportFile(fileUrl,params,filename){
    //fileUrl 是给的流文件接口地址；"/export/hisalarm?level="+level;

    // let link = document.createElement('a')
    // link.style.display = 'none'
    // link.href = fileUrl
    // link.setAttribute('download', filename)

    // document.body.appendChild(link)
    // link.click();
    // window.URL.revokeObjectURL(link.href); // 释放URL 对象
    // document.body.removeChild(link);

    //以上是GET请求导出,以下POST导出
    //responseType:blob或者arraybuffer
    axios.post(fileUrl,params,{responseType:"blob"}).then(function(res){
        let blob=new Blob([response.data],{type: "application/vnd.ms-excel;charset=utf-8"})
        let objectUrl = window.URL.createObjectURL(blob);
        let link = document.createElement('a');
        let name= filename + ".csv";
        link.href=objectUrl;
        link.download=name;
        document.body.appendChild(link);
        link.click();
        window.URL.revokeObjectURL(link.href); // 释放URL 对象
        document.body.removeChild(link);// 下载完成移除元素
    })
    


}
function downFile(fileUrl){
    //fileUrl:/static/test.pdf
    axios.post(fileUrl, {
        responseType: 'blob', //重要
    }).then(response => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        let fname = fileUrl.split("/").length>1?fileUrl.split("/")[fileUrl.split("/").length-1]:fileUrl;
        link.href = url;
        link.setAttribute('download', fname);
        document.body.appendChild(link);
        link.click();
        window.URL.revokeObjectURL(link.href); // 释放URL 对象
        document.body.removeChild(link);
    })
}
//判断两个对象是否相等
function equalsObj(objOne,objTwo){
    if(Object.keys(objOne).length!=Object.keys(objTwo).length){
        return false;
    }
    for (let key in objOne) {
        if(objOne[key]!==objTwo[key]){
            return false;
        }
    }
    return true;
}
export default {
    arrayContains,
    FormatDate,
    GetBeforeDate,
    listToTree,
    switcFullScreen,
    echartfn,
    exportFile,
    downFile,
    equalsObj
}