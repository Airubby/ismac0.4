const webpack = require('webpack');
const path = require('path');
const isProduction = process.env.NODE_ENV === 'production';
const TerserPlugin = require('terser-webpack-plugin')
module.exports = {
    // 基本路径
    publicPath: '/',
    // 输出主文件名称
    indexPath: './index.html',
    // 输出文件目录
    outputDir: 'dist',
    filenameHashing: false, // 生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存 想要去除hash 值，置为false
    lintOnSave: false, // eslint-loader 是否在保存的时候检查
    productionSourceMap: false, // 生产环境是否生成 sourceMap 文件
    chainWebpack: config => {
        //加载svg
        const svgRule = config.module.rule('svg')   
        svgRule.uses.clear()    
        svgRule        
            .test(/\.svg$/)        
            .include.add(path.resolve(__dirname, './src/icons'))
            .end()        
            .use('svg-sprite-loader')        
            .loader('svg-sprite-loader')        
            .options({  symbolId: 'icon-[name]'  })    
        const fileRule = config.module.rule('file')  
        fileRule.uses.clear()    
        fileRule        
            .test(/\.svg$/)        
            .exclude.add(path.resolve(__dirname, './src/icons'))        
            .end()        
            .use('file-loader')        
            .loader('file-loader')
        
        // config.output.filename('js/[name].js').end()
        // config.output.chunkFilename('js/[name].js').end();
        // // 压缩代码
        // config.optimization.minimize(true);
        // // 分割代码
        // config.optimization.splitChunks({
        //     chunks: 'all'
        // })
    },
    //公共代码抽离
    configureWebpack: config => {
        // config.output.filename = 'js/[name].js';
        // config.output.chunkFilename = 'js/[name].js';
        config.optimization={
            namedChunks: true,
            moduleIds: 'hashed',
            minimizer: [new TerserPlugin({ terserOptions: { 
                // compress: { 
                //     drop_console: true,
                //     drop_debugger: true,
                // },
                // output:{
                //     comments: false
                // } 
            } })],
            splitChunks: {
                chunks: 'all', //initial
                cacheGroups: {
                    'vue-relation': {
                        name: 'vue-relation',
                        enforce: true,
                        test: /[\\/]node_modules[\\/](vue|vuex|vue-router|axios|vue-i18n|js-cookie)[\\/]/,
                    },
                    'element-ui': {
                        name: 'element-ui',
                        enforce: true,
                        test: /[\\/]node_modules[\\/]element-ui[\\/]/,
                    },
                    echarts: {
                        name: 'echarts',
                        enforce: true,
                        test: /[\\/]node_modules[\\/](echarts|echarts-liquidfill)[\\/]/,
                    },
                    video:{
                        name: 'video',
                        enforce: true,
                        test: /[\\/]node_modules[\\/](flv.js|video.js|videojs-contrib-hls|videojs-contrib-hls.js|videojs-flash|vue-video-player)[\\/]/,
                    },
                    'el-table-pagination': {
                        name: 'el-table-pagination',
                        enforce: true,
                        test: /[\\/]node_modules[\\/]el-table-pagination[\\/]/,
                    },
                    'mockjs':{
                        name:'mockjs',
                        enforce: true,
                        test: /[\\/]node_modules[\\/]mockjs[\\/]/,
                    },
                    'vendors': {
                        name: 'vendors',
                        enforce: true,
                        test: /[\\/]node_modules[\\/]/,
                        priority: -20,
                    },
                    styles: {
                        name: 'styles',
                        test: /\.(le|sa|sc|c)ss$/,
                        enforce: true,
                    }
                }
            },
            runtimeChunk: {
                name: 'manifest'
            },
        }
    },
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
                    hack: 'true; @import \'~@/assets/css/common.less\';'
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
            //  当出现编译器错误或警告时，在浏览器中显示全屏覆盖层
            warnings: true,
            errors: true
        },
        host: '0.0.0.0',
        port: 8081,
        https: false,
        hotOnly: false, //热更新
        // 设置代理
        proxy: {
            '/api': {
                target: 'http://127.0.0.1:8090', // 你接口的域名
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