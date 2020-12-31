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
//         const o = Mock.mock({  //mockjs模拟随机生成数据，生成20条
//             email:Random.email(),
//             phone:/^1[345789]\d{9}$/,  //手机号
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
//             name1: Random.first(), // 随机生成任意名称
//             personName: Random.cname(),  //生成姓名
//             string: Random.string(10),  //min,max
//             float:Random.float(60, 100, 3, 5),  // min,max,dmin,dmax
//             integer:Random.integer(1,5),  //min,max
//             boolean:Random.boolean(),  // 1,1,true
//             number: Random.string('number', 1, 5),  //数字型字符串1-5位
//             content: Random.csentence(10, 32),
//             "arr|1":["aaa","bbb"],  //自定义展示
//             "matchID":"match1"  //自定义写死
//         })
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
                "children":[
                    {
                        "key": "deviceStatus",
                        "component": "DeviceStatus",
                        "iconfont": "",
                        "language": "DeviceStatus",
                        "relation":[
                            {"key":"deviceStatusDetail","component":"DeviceStatusDetail"}
                        ]
                    },
                    {
                        "key": "deviceLayout",
                        "component": "DeviceLayout",
                        "iconfont": "",
                        "language": "DeviceLayout",
                        "relation":[
                            {"key":"deviceLayoutEdit","component":"DeviceLayoutEdit"}
                        ]
                    },
                ]
            },
            // {
            //     "key": "ups",
            //     "component": "Ups",
            //     "iconfont": "icon-monitor",
            //     "language": "Ups",
            //     "children":[
            //         {
            //             "key": "upsSys",
            //             "component": "UpsSys",
            //             "iconfont": "",
            //             "language": "UpsSys",
            //             "relation":[]
            //         },
            //     ]
            // },
            // {
            //     "key": "cool",
            //     "component": "Cool",
            //     "iconfont": "icon-monitor",
            //     "language": "Cool",
            //     "children":[
            //         {
            //             "key": "airSys",
            //             "component": "AirSys",
            //             "iconfont": "",
            //             "language": "AirSys",
            //             "relation":[]
            //         },
            //     ]
            // },
            {
                "key": "alarm",
                "component": "Alarm",
                "iconfont": "icon-alarm",
                "language": "Alarm",
                "children":[
                    {
                        "key": "activeAlarm",
                        "component": "ActiveAlarm",
                        "iconfont": "",
                        "language": "ActiveAlarm"
                    },
                    {
                        "key": "historyAlarm",
                        "component": "HistoryAlarm",
                        "iconfont": "",
                        "language": "HistoryAlarm"
                    },
                    {
                        "key": "eventMask",
                        "component": "EventMask",
                        "iconfont": "",
                        "language": "EventMask"
                    },
                    {
                        "key": "informLog",
                        "component": "InformLog",
                        "iconfont": "",
                        "language": "InformLog"
                    }
                ]
            },
            {
                "key": "energy",
                "component": "Energy",
                "iconfont": "icon-energy",
                "language": "Energy",
                "children":[
                    {
                        "key": "energyStatus",
                        "component": "EnergyStatus",
                        "iconfont": "",
                        "language": "EnergyStatus"
                    },
                    {
                        "key": "coulometry",
                        "component": "Coulometry",
                        "iconfont": "",
                        "language": "Coulometry"
                    },
                    {
                        "key": "coolingAnalysis",
                        "component": "CoolingAnalysis",
                        "iconfont": "",
                        "language": "CoolingAnalysis"
                    },
                    {
                        "key": "energyConfig",
                        "component": "EnergyConfig",
                        "iconfont": "",
                        "language": "EnergyConfig"
                    },
                ]
            },
            {
                "key": "access",
                "component": "Access",
                "iconfont": "icon-access",
                "language": "Access",
                "children":[
                    {
                        "key": "accessStatus",
                        "component": "AccessStatus",
                        "iconfont": "",
                        "language": "AccessStatus"
                    },
                    {
                        "key": "cardAuthorize",
                        "component": "CardAuthorize",
                        "iconfont": "",
                        "language": "CardAuthorize",
                        "relation":[
                            {"key":"cardAuthorizeAdd","component":"CardAuthorizeAdd"}
                        ]
                    },
                    {
                        "key": "accessController",
                        "component": "AccessController",
                        "iconfont": "",
                        "language": "AccessController",
                        "relation":[
                            {"key":"accessControllerAdd","component":"AccessControllerAdd"}
                        ]
                    },
                    {
                        "key": "timeGroup",
                        "component": "TimeGroup",
                        "iconfont": "",
                        "language": "TimeGroup"
                    },
                ]
            },
            {
                "key": "video",
                "component": "Video",
                "iconfont": "icon-video",
                "language": "Video",
                "children":[
                    {
                        "key": "videoPreview",
                        "component": "VideoPreview",
                        "iconfont": "",
                        "language": "VideoPreview"
                    },
                    {
                        "key": "videoPlayback",
                        "component": "VideoPlayback",
                        "iconfont": "",
                        "language": "VideoPlayback"
                    },
                    {
                        "key": "videoConfig",
                        "component": "VideoConfig",
                        "iconfont": "",
                        "language": "VideoConfig",
                        "relation":[
                            {"key":"videoConfigAdd","component":"VideoConfigAdd"}
                        ]
                    },
                ]
            },
            {
                "key": "rack",
                "component": "Rack",
                "iconfont": "icon-rack",
                "language": "Rack",
                "children":[
                    {
                        "key": "dataOverview",
                        "component": "DataOverview",
                        "iconfont": "",
                        "language": "DataOverview"
                    },
                    {
                        "key": "rackInfo",
                        "component": "RackInfo",
                        "iconfont": "",
                        "language": "RackInfo"
                    },
                    {
                        "key": "inAssets",
                        "component": "InAssets",
                        "iconfont": "",
                        "language": "InAssets"
                    },
                    {
                        "key": "logInfo",
                        "component": "LogInfo",
                        "iconfont": "",
                        "language": "LogInfo"
                    },
                ]
            },
            {
                "key": "statement",
                "component": "Statement",
                "iconfont": "icon-statement",
                "language": "Statement",
                "children":[
                    {
                        "key": "eventStatement",
                        "component": "EventStatement",
                        "iconfont": "",
                        "language": "EventStatement",
                        "relation":[]
                    },
                    {
                        "key": "propertyStatement",
                        "component": "PropertyStatement",
                        "iconfont": "",
                        "language": "PropertyStatement",
                        "relation":[]
                    },
                    {
                        "key": "planStatement",
                        "component": "PlanStatement",
                        "iconfont": "",
                        "language": "PlanStatement",
                        "relation":[
                            {"key":"planStatementConfig","component":"PlanStatementConfig"},
                            {"key":"planStatementAddPlan","component":"PlanStatementAddPlan"},
                            {"key":"planStatementAddTemp","component":"PlanStatementAddTemp"},
                        ]
                    },
                    {
                        "key": "configStatement",
                        "component": "ConfigStatement",
                        "iconfont": "",
                        "language": "ConfigStatement",
                        "relation":[]
                    },
                ]
            },
            {
                "key": "system",
                "component": "System",
                "iconfont": "icon-system",
                "language": "System",
                "children":[
                    {
                        "key": "user",
                        "component": "User",
                        "iconfont": "",
                        "language": "User"
                    },
                    {
                        "key": "role",
                        "component": "Role",
                        "iconfont": "",
                        "language": "Role"
                    },
                    {
                        "key": "messageNotification",
                        "component": "MessageNotification",
                        "iconfont": "",
                        "language": "MessageNotification"
                    },
                    {
                        "key": "log",
                        "component": "Log",
                        "iconfont": "",
                        "language": "Log"
                    },
                ]
            },
            {
                "key": "assert",
                "component": "Assert",
                "iconfont": "icon-assert",
                "language": "Assert",
                "children":[
                    {
                        "key": "device",
                        "component": "Device",
                        "iconfont": "",
                        "language": "Device",
                        "relation":[
                            {"key":"deviceDetail","component":"DeviceDetail"},
                            {"key":"deviceExample","component":"DeviceExample"}
                        ]
                    },
                    {
                        "key": "interface",
                        "component": "Interface",
                        "iconfont": "",
                        "language": "Interface"
                    },
                    {
                        "key": "linkageStrategies",
                        "component": "LinkageStrategies",
                        "iconfont": "",
                        "language": "LinkageStrategies"
                    },
                    {
                        "key": "screenConfig",
                        "component": "ScreenConfig",
                        "iconfont": "",
                        "language": "ScreenConfig"
                    },
                    {
                        "key": "systemConfig",
                        "component": "SystemConfig",
                        "iconfont": "",
                        "language": "SystemConfig"
                    },
                ]
            },
        ]
    }
}

const getBigScreen=function(){
    return{
        err_code:0,
        err_msg:"成功",
        data:[
            {
                "key": "home",
                "isIndex": "true",
                "pathUrl": "/template/home",
                "pointData":[
                    {"key":"name","devid":"1","pointid":"1-1"},
                    {"key":"detail","devid":"2","pointid":"2-1"},
                ],
                "routeData":[]
            },
        ]
    }
}
Mock.mock(RegExp('/getMockData' + ".*"), /get|post/i,getdata) 
Mock.mock(RegExp('/getBigInfo' + ".*"), /get|post/i,getBigScreen) 