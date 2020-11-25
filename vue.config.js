const isProduction = process.env.NODE_ENV === 'production';
const TerserPlugin = require('terser-webpack-plugin')
module.exports = {
    // 基本路径
    publicPath: '/',
    // 输出主文件名称
    indexPath: './index.html',
    // 输出文件目录
    outputDir: 'dist',
    // eslint-loader 是否在保存的时候检查
    lintOnSave: false,
    chainWebpack: config => {
        // 压缩代码
        config.optimization.minimize(true);
        // 分割代码
        config.optimization.splitChunks({
            chunks: 'all'
        })
    },
    //公共代码抽离
    configureWebpack: config => {
        const myConfig = {}
        if (isProduction) {
            //3.js代码整合
            let optimization= {
                //去掉打印console信息
                minimizer: [new TerserPlugin({ terserOptions: { compress: { drop_console: true } } })],
                //整合代码
                splitChunks: {
                    cacheGroups: {
                        vendor:{
                            chunks:"all",
                            test: /node_modules/,
                            name:"vendor",
                            minChunks: 1,
                            maxInitialRequests: 5,
                            minSize: 0,
                            priority:100,
                        },
                        common: {
                            chunks:"all",
                            test:/[\\/]src[\\/]js[\\/]/,
                            name: "common",
                            minChunks: 2,
                            maxInitialRequests: 5,
                            minSize: 0,
                            priority:60
                        },
                        styles: {
                            name: 'styles',
                            test: /\.(le|sa|sc|c)ss$/,
                            chunks: 'all',
                            enforce: true,
                        },
                        runtimeChunk: {
                            name: 'manifest'
                        }
                    } 
                },
                
            }
            Object.assign(config, {
                optimization
            })

        }
        if (!isProduction) {
            /**
             * 关闭host check，方便使用ngrok之类的内网转发工具
             */
            myConfig.devServer = {
                disableHostCheck: true
            }
            let optimization={
                minimizer:[
                    new TerserPlugin({
                        cache: true,
                        // 将多线程关闭  webpack会92%卡住的问题
                        parallel: false
                    })
                ]
            }
            Object.assign(config, {
                optimization
            })
        }
        return myConfig
    },
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