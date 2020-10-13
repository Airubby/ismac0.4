
import Mock from 'mockjs' //引入mockjs，npm已安装
import { Random } from 'mockjs' 
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
