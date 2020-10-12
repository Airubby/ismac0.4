import Mock from 'mockjs' //引入mockjs，npm已安装
import { Random } from 'mockjs' // 引入random对象,随机生成数据的对象，（与占位符@一样）
const getHomeMock=function(){
    return {
        err_code:0,
        err_msg:"成功",
        data:"首页调用了mock数据"
    }
}
Mock.mock(RegExp('/gethomemock' + ".*"), /post/i,getHomeMock) //调用模拟数据方法