import Mock from 'mockjs' //引入mockjs，npm已安装
import { Random } from 'mockjs' // 引入random对象,随机生成数据的对象，（与占位符@一样）
import Api from './Api'

const getTable = function(){
    let datalist = [];
    let total=20;
	for (let i = 0; i < 20; i += 1) {
        const o = {  //mockjs模拟随机生成数据，生成20条
            type:Random.integer(1,5),
            name:Random.cword(4, 16),
            content:Random.csentence(10, 32),
            addr:Random.csentence(10, 16),
            time:Random.datetime("yyyy-MM-dd HH:mm:ss"),
            time1:Random.datetime("yyyy-MM-dd HH:mm:ss"),
        }
        datalist.push(o)
    }
	return{
        err_code:0,
        err_msg:"成功",
        data:{
            item:datalist,
            total:total
        }
    }
}

const getList = function(){
    let datalist = [];
    let total=20;
	for (let i = 0; i < 20; i += 1) {
        const o = {  //mockjs模拟随机生成数据，生成20条
            type:Random.integer(1,5),
            name:Random.cword(4, 16),
            content:Random.csentence(10, 32),
            addr:Random.csentence(10, 16),
            time:Random.datetime("yyyy-MM-dd HH:mm:ss"),
            time1:Random.datetime("yyyy-MM-dd HH:mm:ss"),
        }
        datalist.push(o)
    }
	return{
        err_code:0,
        err_msg:"成功",
        data:{
            item:datalist,
            total:total
        }
    }
}

//这个要放函数定义后
Mock.mock(RegExp(Api.GetTable + ".*"), /get|post/i,getTable) 
Mock.mock(RegExp(Api.GetList + ".*"), /get|post/i,getList) 