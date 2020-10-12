import Mock from 'mockjs' //引入mockjs，npm已安装
import { Random } from 'mockjs' // 引入random对象,随机生成数据的对象，（与占位符@一样）
import Vue from 'vue'
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'
const mockArr=[];
const requireMock = require.context(
  // 其组件目录的相对路径
  '@/views',
  // 是否查询其子目录
  true,
  // 匹配基础组件文件名的正则表达式
  /(mock)+\.(js)$/
)
console.log(requireMock)
requireMock.keys().forEach(filePath => {
    console.log(filePath)
    mockArr.push(filePath)
})

console.log(mockArr)

import '@/views/home/mock.js'
import '@/views/control/alarmRecord/mock.js'
