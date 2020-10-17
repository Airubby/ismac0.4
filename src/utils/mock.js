import store from '@/store/index'
import Mock from 'mockjs' //引入mockjs，npm已安装
import { Random } from 'mockjs' // 引入random对象,随机生成数据的对象，（与占位符@一样）
const requireMock = require.context(
    // 其组件目录的相对路径
    "@/views/pages",
    // 是否查询其子目录
    true,
    // 匹配基础组件文件名的正则表达式
    /(Mock)+\.(js)$/
)
requireMock.keys().forEach(filePath => {
    import("@/views/pages"+filePath.substring(1));
})

Mock.setup({
	timeout:1000  //设置请求延时时间
})

// const getdata = function(){
//     let datalist = []
// 	for (let i = 0; i < 20; i += 1) {
//         const o = {  //mockjs模拟随机生成数据，生成20条
//             email:Random.email(),
//             ip:Random.ip(),
//             city:Random.city(),  //城市  传 prefix 参数 表示 带省前缀
//             county:Random.county(),   //县城  传 prefix 参数 表示 带省前缀
//             id:Random.id(),  
//             guid: Random.guid(),
//             img:Random.image(),  // 生成图片  '200x100', '#50B347', '#FFF', 'Mock.js'
//             Date:Random.date('yyyy-MM-dd'),  
//             datatime:Random.datetime(), //传参 yy-MM-dd a HH:mm:ss
//             time:Random.time('A HH:mm:ss'),
//             name: Random.cword(4, 16), // 随机生成任意名称
//             personName: Random.cname(),  //生成姓名
//             string: Random.string(10),  //min,max
//             float:Random.float(60, 100, 3, 5),  // min,max,dmin,dmax
//             integer:Random.integer(1,5),  //min,max
//             boolean:Random.boolean(),  // 1,1,true
//             number: Random.string('number', 1, 5),  //数字型字符串1-5位
//             content: Random.csentence(10, 32),
//             "matchID":"match1"  //自定义写死
//         }
//         datalist.push(o)
//     }
// 	return{
//         err_code:0,
//         err_msg:"成功",
//         data:datalist
//     }
// }

const getdata = function(){
	return{
        err_code:0,
        err_msg:"成功",
        data:[
            {
                "key": "monitor",
                "component": "Monitor",
                "iconfont": "icon-monitor",
                "language": "Monitor",
                "children":[]
            },
            {
                "key": "alarm",
                "component": "Alarm",
                "iconfont": "icon-alarm",
                "language": "Alarm",
                "children":[
                    {
                        "key": "activeAlarm",
                        "component": "ActiveAlarm",
                        "iconfont": "icon-alarm",
                        "language": "ActiveAlarm"
                    },
                    {
                        "key": "historyAlarm",
                        "component": "HistoryAlarm",
                        "iconfont": "icon-alarm",
                        "language": "HistoryAlarm"
                    },
                    {
                        "key": "eventMask",
                        "component": "EventMask",
                        "iconfont": "icon-alarm",
                        "language": "EventMask"
                    },
                    {
                        "key": "informLog",
                        "component": "InformLog",
                        "iconfont": "icon-alarm",
                        "language": "InformLog"
                    }
                ]
            },
            {
                "key": "energy",
                "component": "Energy",
                "iconfont": "icon-energy",
                "language": "Energy",
                "children":[]
            },
            {
                "key": "access",
                "component": "Access",
                "iconfont": "icon-access",
                "language": "Access",
                "children":[]
            },
            {
                "key": "video",
                "component": "Video",
                "iconfont": "icon-video",
                "language": "Video",
                "children":[]
            },
            {
                "key": "rack",
                "component": "Rack",
                "iconfont": "icon-rack",
                "language": "Rack",
                "children":[]
            },
            {
                "key": "statement",
                "component": "Statement",
                "iconfont": "icon-statement",
                "language": "Statement",
                "children":[]
            },
            {
                "key": "system",
                "component": "System",
                "iconfont": "icon-system",
                "language": "System",
                "children":[]
            },
            {
                "key": "assert",
                "component": "Assert",
                "iconfont": "icon-assert",
                "language": "Assert",
                "children":[]
            },
        ]
    }
}

Mock.mock(RegExp('/getMockData' + ".*"), /get|post/i,getdata) 