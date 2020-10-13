const isProduction = process.env.NODE_ENV === 'production';
module.exports = {
    // 基本路径
    publicPath: '/',
    // 输出主文件名称
    indexPath: './index.html',
    // 输出文件目录
    outputDir: 'dist',
    // eslint-loader 是否在保存的时候检查
    lintOnSave: false,
    chainWebpack: config => {},
    //公共代码抽离
    configureWebpack: config => {},
    // 生产环境是否生成 sourceMap 文件
    productionSourceMap: false,
    // css相关配置
    css: {
        // 是否使用css分离插件 ExtractTextPlugin
        extract: true,
        // 开启 CSS source maps?
        sourceMap: false,
        // css预设器配置项
        loaderOptions: { 
            //为每个css引入公共需要引入的样式vue-cli3
            // less:{
            //     // data:`@import "~@/assets/css/common.less"`
            //     // import:path.resolve("src/assets/css/common.less")
            // }
            //vue-cli4中使用less全局变量 为每个css引入公共需要引入的样式 无需安装style-resources-loader
            less:{
                globalVars: {
                    hack: `true; @import '~@/assets/css/common.less';`
                }
            }
        },
        // 启用 CSS modules for all css / pre-processor files.
        modules: false
    },
    // use thread-loader for babel & TS in production build
    // enabled by default if the machine has more than 1 cores
    parallel: require('os').cpus().length > 1,
    // webpack-dev-server 相关配置
    devServer: {
        open: true, 
        compress: false, // 开启压缩
        overlay: {
            warnings: true,
            errors: true
        },
        host: '0.0.0.0',
        port: 8081,
        https: false,
        hotOnly: false,
        // 设置代理
        proxy: {
            '/api': {
            target: 'http://192.168.16.6:8090', // 你接口的域名
                secure: false, // 如果是https接口，需要配置这个参数
                changeOrigin: true, // 如果接口跨域，需要进行这个参数配置
                ws:false,
                pathRewrite:{
                '^/api':'/api'
                }
		    }
        },
        before: app => {
        }
    },
    // 第三方插件配置
    pluginOptions: {}
}