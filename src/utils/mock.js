import store from '@/store/index'
import Mock from 'mockjs' //引入mockjs，npm已安装
import { Random } from 'mockjs' // 引入random对象,随机生成数据的对象，（与占位符@一样）
Mock.setup({
	timeout:1000  //设置请求延时时间
})
const getdata = function(){
    let datalist = []
	for (let i = 0; i < 20; i += 1) {
        const o = {  //mockjs模拟随机生成数据，生成20条
            recipeId: Random.guid(),
            billId: Random.string(10),
            value: Random.string('number', 8, 10),
            Date:Random.date('yyyy-MM-dd'),
            time:Random.time('A HH:mm:ss'),
            adress:Random.county(),
            name: Random.cword(4, 16), // 随机生成任意名称
            personName: Random.cname(),
            content: Random.csentence(10, 32),
            "matchID":"match1"
        }
        datalist.push(o)
    }
	return{
        code:200,
        data:datalist
    }
}
//后台给出导航菜单时，自己可以任意更改导航子栏目所在栏目下；但name,component,是固定的不可变
const getinfo = function(){
	return{
        code:200,
        data:[
            {
                path:'/loncom/index',
                name:'index',
                meta: { show:true, type:'nav',limits:['add','delete','detail'],icon:'control.png'},
                component: 'home/index.vue',
            },
            {
                path: '/loncom/control',
                name:'control',
                meta: { type:'nav',show:true,limits:['add','delete','detail'],icon:'control.png'},
                component: 'control/index.vue',
                children:[
                    {
                        path: '/loncom/control/devState',
                        name:'controlDevState',
                        meta: { show:true,type:'nav',limits: ['add','delete','detail']},
                        component: 'control/devState/index.vue'
                    },
                    {
                        path: '/loncom/control/devState/add',
                        name:'controlDevStateAdd',
                        meta: { show:true,type:'fun',limits: ['add','delete','detail']},
                        component: 'control/devState/add.vue'
                    },
                    {
                        path: '/loncom/control/alarmRecord',
                        name:'controlAlarmRecord',
                        meta: {show:true,type:'nav',limits: ['add','delete','detail']},
                        component: 'control/alarmRecord/index.vue'
                    },
                    {
                        path: '/loncom/control/config',
                        name:'controlConfig',
                        meta: { show:true,type:'nav',limits: ['add','delete','detail']},
                        component: 'control/config/index.vue'
                    },
                ]
            },
            {
                path: '/loncom/access',
                name:'access',
                meta: {show:true,type:'nav',limits: ['add','delete','detail'],icon:'control.png'},
                component: 'access/index.vue',
                children:[
                    {
                        path: '/loncom/access/status',
                        name:'accessStatus',
                        meta: {show:true,type:'nav',limits: ['add','delete','detail']},
                        component: 'access/status/index.vue'
                    },
                    {
                        path: '/loncom/access/cardImpower',
                        name:'accessCardImpower',
                        meta: { show:true,type:'nav',limits: ['add','delete','detail']},
                        component: 'access/cardImpower/index.vue'
                    },
                    {
                        path: '/loncom/access/config',
                        name:'accessConfig',
                        meta: {show:true,type:'nav',limits: ['add','delete','detail']},
                        component: 'access/config/index.vue'
                    },
                ]
            },
            {
                path: '/loncom/video',
                name:'video',
                meta: {show:true,type:'nav',limits: ['add','delete','detail'],icon:'control.png'},
                component: 'video/index.vue',
                children:[
                    {
                        path: '/loncom/video/preview',
                        name:'videoPreview',
                        meta: {show:true,type:'nav',limits: ['add','delete','detail']},
                        component: 'video/preview/index.vue'
                    },
                    {
                        path: '/loncom/video/playback',
                        name:'videoPlayback',
                        meta: {show:true,type:'nav',limits: ['add','delete','detail']},
                        component: 'video/playback/index.vue'
                    },
                    {
                        path: '/loncom/video/config',
                        name:'videoConfig',
                        meta: {show:true,type:'nav',limits: ['add','delete','detail']},
                        component: 'video/config/index.vue'
                    },
                ]
            },
            {
                path: '/loncom/energy',
                name:'energy',
                meta: {show:true,type:'nav',limits: ['add','delete','detail'],icon:'control.png'},
                component: 'energy/index.vue',
                children:[
                    {
                        path: '/loncom/energy/status',
                        name:'energyStatus',
                        meta: {show:true,type:'nav',limits: ['add','delete','detail']},
                        component: 'energy/status/index.vue'
                    },
                    {
                        path: '/loncom/energy/config',
                        name:'energyConfig',
                        meta: {show:true,type:'nav',limits: ['add','delete','detail']},
                        component: 'energy/config/index.vue'
                    },
                ]
            },
            {
                path: '/loncom/statement',
                name:'statement',
                meta: {show:true,type:'nav',limits: ['add','delete','detail'],icon:'control.png'},
                component: 'statement/index.vue',
                children:[
                    {
                        path: '/loncom/statement/convention',
                        name:'statementConvention',
                        meta: {show:true,type:'nav',limits: ['add','delete','detail']},
                        component: 'statement/convention/index.vue'
                    },
                    {
                        path: '/loncom/statement/plan',
                        name:'statementPlan',
                        meta: {show:true,type:'nav',limits: ['add','delete','detail']},
                        component: 'statement/plan/index.vue'
                    },
                    {
                        path: '/loncom/statement/config',
                        name:'statementConfig',
                        meta: {show:true,type:'nav',limits: ['add','delete','detail']},
                        component: 'statement/config/index.vue'
                    },
                ]
            },
            {
                path: '/loncom/system',
                name:'system',
                meta: {show:true,type:'nav',limits: ['add','delete','detail'],icon:'control.png'},
                component: 'system/index.vue',
                children:[
                    {
                        path: '/loncom/system/user',
                        name:'systemUser',
                        meta: {show:true,type:'nav',limits: ['add','delete','detail']},
                        component: 'system/user/index.vue'
                    },
                    {
                        path: '/loncom/system/information',
                        name:'systemInformation',
                        meta: {show:true,type:'nav',limits: ['add','delete','detail']},
                        component: 'system/information/index.vue'
                    },
                    {
                        path: '/loncom/system/config',
                        name:'systemConfig',
                        meta: {show:true,type:'nav',limits: ['add','delete','detail']},
                        component: 'system/config/index.vue'
                    },
                ]
            },
            {
                path: '/loncom/assets',
                name:'assets',
                meta: {show:true,type:'nav',limits: ['add','delete','detail'],icon:'control.png'},
                component: 'assets/index.vue',
                children:[
                    {
                        path: '/loncom/assets/cabinet',
                        name:'assetsCabinet',
                        meta: {show:true,type:'nav',limits: ['add','delete','detail']},
                        component: 'assets/cabinet/index.vue'
                    },
                    {
                        path: '/loncom/assets/inassets',
                        name:'assetsInassets',
                        meta: {show:true,type:'nav',limits: ['add','delete','detail']},
                        component: 'assets/inassets/index.vue'
                    },
                    {
                        path: '/loncom/assets/config',
                        name:'assetsConfig',
                        meta: {show:true,type:'nav',limits: ['add','delete','detail']},
                        component: 'assets/config/index.vue'
                    },
                ]
            },
        ]
    }
}

Mock.mock(store.getters.AjaxUrl+'/getMockData', /post/i,getdata) //调用模拟数据方法
Mock.mock(RegExp(store.getters.AjaxUrl+'/getInfo' + ".*"), /get/i,getinfo) 