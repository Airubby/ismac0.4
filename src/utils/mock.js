import store from '@/store/index'
import Mock from 'mockjs' //引入mockjs，npm已安装
import { Random } from 'mockjs' // 引入random对象,随机生成数据的对象，（与占位符@一样）
const requireMock = require.context(
    // 其组件目录的相对路径
    "@/views",
    // 是否查询其子目录
    true,
    // 匹配基础组件文件名的正则表达式
    /(mock)+\.(js)$/
)
requireMock.keys().forEach(filePath => {
    import("@/views"+filePath.substring(1));
})

Mock.setup({
	timeout:1000  //设置请求延时时间
})

// const getdata = function(){
//     let datalist = []
// 	for (let i = 0; i < 20; i += 1) {
//         const o = {  //mockjs模拟随机生成数据，生成20条
//             recipeId: Random.guid(),
//             billId: Random.string(10),
//             value: Random.string('number', 8, 10),
//             Date:Random.date('yyyy-MM-dd'),
//             time:Random.time('A HH:mm:ss'),
//             adress:Random.county(),
//             name: Random.cword(4, 16), // 随机生成任意名称
//             personName: Random.cname(),
//             content: Random.csentence(10, 32),
//             "matchID":"match1"
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