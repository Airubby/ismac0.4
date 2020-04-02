import echarts from 'echarts'
import CryptoJS from 'crypto-js/crypto-js'
import Vue from 'vue'
import axios from 'axios'

// 默认的 KEY 与 iv 如果没有给
const KEY = "loncom";//""中与后台一样  密码
const keySize=128;
const fillKey = (key) => { 
    const filledKey = Buffer.alloc(keySize / 8); 
    const keys = Buffer.from(key); 
    if (keys.length < filledKey.length) { 
        filledKey.map((b, i) => filledKey[i] = keys[i]); 
    }
    return filledKey; 
}
/**
 * AES加密 ：字符串 key iv  返回base64
 */
function Encrypt(word, keyStr) {
    let key = keyStr ? CryptoJS.enc.Utf8.parse(fillKey(keyStr)):CryptoJS.enc.Utf8.parse(fillKey(KEY));
    let srcs = CryptoJS.enc.Utf8.parse(word);
    var encrypted = CryptoJS.AES.encrypt(srcs, key, {
        mode: CryptoJS.mode.ECB,  //mode 为ECB  不需要iv
        padding: CryptoJS.pad.Pkcs7
    });
    // console.log("-=-=-=-", encrypted.ciphertext)
    return CryptoJS.enc.Base64.stringify(encrypted.ciphertext);
}

/**
 * AES 解密 ：字符串 key iv  返回base64
 *
 */
function Decrypt(word, keyStr, ivStr) {
    let key = keyStr ? CryptoJS.enc.Utf8.parse(fillKey(keyStr)):CryptoJS.enc.Utf8.parse(fillKey(KEY));
    let base64 = CryptoJS.enc.Base64.parse(word);
    let src = CryptoJS.enc.Base64.stringify(base64);
    var decrypt = CryptoJS.AES.decrypt(src, key, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    });
    var decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
    return decryptedStr.toString();
}

function Format(fmt,value){
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

function arrayContains(v,arr){
  if(arr.indexOf(v)==-1){
    return false;
  }else{
    return true;
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
function wsConnection(sendMsg, callback,addr) {
  try {
      //var SOCKECT_ADDR = "ws://" + url +":"+ port;
      //let host=window.document.location.host;
      //let SOCKECT_ADDR=addr?addr:"ws://"+host+"/ws"
      let SOCKECT_ADDR=addr?addr:"ws://echo.websocket.org"
      let ws = new WebSocket(SOCKECT_ADDR);
      Vue.prototype.$ws=ws;
      ws.onopen = function (event) {
        //   console.log(event)
          console.log("已经与服务器建立了连接\r\n当前连接状态：" + event);
          if(sendMsg!=""){
            ws.send(sendMsg);
          }
          
      };
    
      ws.onmessage = callback;
      ws.onclose = function (event) {
        // console.log(event)
      };
      ws.onerror = function (event) {
        console.log("WebSocket异常！" + event.toString());
      };
      Vue.prototype.$ws=ws;

  } catch (ex) {
      console.log(ex);
  }
}
function checkPORT(obj) {
    console.log(obj);
    // if (!obj.value) {
    //     if(obj.rules.required){
    //         obj.callback(new Error('不能为空'))
    //     }else{
    //         obj.callback()
    //     }
    // } else if (Math.round(Number(obj.value)) !== Number(obj.value)) {
    //     obj.callback(new Error('必须为整数数字'))
    // } else {
    //     if(Number(obj.value)>65535||Number(obj.value)<1){
    //         obj.callback("端口范围在1-65535之间")
    //     }else{
    //         obj.callback()
    //     }
    // }
    //双语验证问题
    if (!obj.value) {
        if(obj.rules.required){
            return 'hint.noEmpty';
        }else{
            return '';
        }
    } else if (Math.round(Number(obj.value)) !== Number(obj.value)) {
        return 'hint.isInteger';
    } else {
        if(Number(obj.value)>65535||Number(obj.value)<1){
            return 'hint.rangeInteger';
        }else{
            return '';
        }
    }
}
// function checkIP(obj) {
//     if (!obj.value) {
//         if(obj.rules.required){
//             obj.callback(new Error('不能为空'))
//         }else{
//             obj.callback()
//         }
//     } else {
//       var reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/
//         if(reg.test(obj.value)){
//             obj.callback()
//         }else{
//             obj.callback("ip格式错误")
//         }
//     }
    
// }
function checkIP(obj) {
    if (!obj.value) {
        if(obj.rules.required){
            return 'hint.noEmpty';
        }else{
            return '';
        }
    } else {
      var reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/
        if(reg.test(obj.value)){
            return '';
        }else{
            return 'hint.formatErr';
        }
    }
    
}
//身份证号验证
function checkIDCard(obj) {
    if (!obj.value) {
        if(obj.rules.required){
            return 'hint.noEmpty';
        }else{
            return '';
        }
    } else {
      var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
        if(reg.test(obj.value)){
            return '';
        }else{
            return 'hint.formatErr';
        }
    }
    
}
function checkEMAIL(obj) {
    if (!obj.value) {
        if(obj.rules.required){
            obj.callback(new Error('不能为空'))
        }else{
            obj.callback()
        }
    } else {
      var reg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
        if(reg.test(obj.value)){
            obj.callback()
        }else{
            obj.callback("邮箱格式错误")
        }
    }
    
}
function checkPHONE(obj) {
    if (!obj.value) {
        if(obj.rules.required){
            obj.callback(new Error('不能为空'))
        }else{
            obj.callback()
        }
    } else {
      var reg = /^1[345789]\d{9}$/
        if(reg.test(obj.value)){
            obj.callback()
        }else{
            obj.callback("手机格式错误")
        }
    }
    
}
function checkNumber(obj) {
    if (!obj.value) {
        if(obj.rules.required){
            obj.callback(new Error('不能为空'))
        }else{
            obj.callback()
        }
    } else {
        //中文：var a=/[\u4e00-\u9fa5+！@#￥……&*（）——【】，；。？‘’“”]/;  
        let regPos = /^\d+(\.\d+)?$/; //非负浮点数
        //let regPos = /^[1-9]\d*$/;  //大于0的正整数
        // let regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; //负浮点数
        // let regA=/(^[\-0-9][0-9]*(.[0-9]+)?)$/;  //正负整数，浮点数  /^(\-|\+)?\d+(\.\d+)?$/   /^[-+]?\d+(\.\d+)?$/
        if(regPos.test(obj.value)){
            obj.callback()
        }else{
            obj.callback('请输入正数数值')
        }
    }
    
}
function checkPasspord(obj) {
    if (!obj.value) {
        if(obj.rules.required){
            obj.callback(new Error('不能为空'))
        }else{
            obj.callback()
        }
    } else {
        // let regPos= /^([a-z_A-Z-.+0-9]{6,20})$/;   //. - _ 也可以包含包含
        let regPos = /^[A-Za-z0-9]{6,20}$/; 
        ///[a-z]/.test(value) && /[A-Z]/.test(value) && /[0-9]/.test(value)&& value.length>7    包含数字字母大小写，且至少8位
        if(regPos.test(obj.value)){
            obj.callback()
        }else{
            obj.callback('密码6到20位且只能为数字和字母')
        }
    } 
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
    Encrypt,
    Decrypt,
    arrayContains,
    Format,
    switcFullScreen,
    echartfn,
    exportFile,
    downFile,
    wsConnection,
    checkPORT,
    checkIP,
    checkIDCard,
    checkEMAIL,
    checkPHONE,
    checkNumber,
    checkPasspord,
    equalsObj
}