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

        /**
         * 删除懒加载模块的prefetch，降低带宽压力
         * https://cli.vuejs.org/zh/guide/html-and-static-assets.html#prefetch
         * 而且预渲染时生成的prefetch标签是modern版本的，低版本浏览器是不需要的
         */
        config.plugins.delete('prefetch')
        config.plugins.delete('preload');
        
    },
    //公共代码抽离
    configureWebpack: config => {
        const plugins = config.plugins;
        for(let i=0;i<plugins.length;i++){
            if(plugins[i] instanceof webpack.HashedModuleIdsPlugin){
                plugins.splice(i,1)
            }else if(plugins[i] instanceof webpack.NamedChunksPlugin){
                plugins.splice(i,1)
            }
        }
        plugins.push(new webpack.HashedModuleIdsPlugin({//生成稳定的模块id
            hashFunction: 'sha256',
            hashDigest: 'hex',
            hashDigestLength: 20
        }));
        
        config.optimization={
            namedChunks: true,
            moduleIds: 'hashed', //"natural" | "named" | "hashed" | "size" | "total-size" | false
            minimize: isProduction,
            minimizer: [
                new TerserPlugin({ 
                    terserOptions: { 
                        compress: { 
                            drop_console: true,
                            drop_debugger: true,
                        },
                        output:{
                            comments: false
                        } 
                    } 
                })
            ],
            splitChunks: {
                chunks: 'all', // chunks: 'async',//默认只作用于异步模块，为`all`时对所有模块生效,`initial`对同步模块有效
                cacheGroups: {
                    'vue-relation': {
                        name: 'chunk-vue-relation',
                        enforce: true,
                        test: /[\\/]node_modules[\\/](vue|vuex|vue-router|axios|vue-i18n|js-cookie)[\\/]/,
                    },
                    'element-ui': {
                        name: 'chunk-element-ui',
                        enforce: true,
                        test: /[\\/]node_modules[\\/]element-ui[\\/]/,
                    },
                    echarts: {
                        name: 'chunk-echarts',
                        enforce: true,
                        test: /[\\/]node_modules[\\/](echarts|echarts-liquidfill)[\\/]/,
                    },
                    video:{
                        name: 'chunk-video',
                        enforce: true,
                        test: /[\\/]node_modules[\\/](flv.js|video.js|videojs-contrib-hls|videojs-contrib-hls.js|videojs-flash|vue-video-player)[\\/]/,
                    },
                    'el-table-pagination': {
                        name: 'chunk-el-table-pagination',
                        enforce: true,
                        test: /[\\/]node_modules[\\/]el-table-pagination[\\/]/,
                    },
                    'mockjs':{
                        name:'chunk-mockjs',
                        enforce: true,
                        test: /[\\/]node_modules[\\/]mockjs[\\/]/,
                    },
                    'vendors': {
                        name: 'chunk-vendors',
                        enforce: true,
                        test: /[\\/]node_modules[\\/]/,
                        priority: -20,
                    },
                    styles: {
                        name: 'chunk-styles',
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