const webpack = require('webpack');
const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const TerserPlugin = require('terser-webpack-plugin');
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const Webpackbar = require('webpackbar');
const glob = require('glob');
//glob.sync('./src/packages/**/*.vue')  /**/是packages下面所有的文件夹；/*/是packages下面一级的文件夹
const files1 = glob.sync('./src/views/pages/DeviceStatus/**/*.vue');
const files2 = glob.sync('./src/views/pages/User/**/*.vue');
let entry={};
console.log(files1,files2,"1!!!!!!!!!!!!!!!!!!")
let files=files1.concat(files2)

if(files.length>0){
    files.forEach(str => {
        // str './src/packages/rack/index.vue',  element:rack;comname:index
        let matchstr=str.match(/\.\/src\/(\S*)\/(\S*)\.vue/)
        let element = matchstr[1].replace(/\//g,"-");
        let comname= matchstr[2];
        element=element+"-"+comname;
        entry[element]=str
    });
}

module.exports = {
    mode: 'production',
    entry:entry,
    output: {
        path: path.resolve(__dirname, './packages'),
        // path: __dirname,
        filename: `[name].js`,  //[name]:  test/index
        // libraryTarget:'commonjs-module'  //"var" | "assign" | "this" | "window" | "self" | "global" | "commonjs" | "commonjs2" | "commonjs-module" | "amd" | "amd-require" | "umd" | "umd2" | "jsonp" | "system"
        jsonpFunction:'webpackJsonp'
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            '@': path.resolve(__dirname, './src')
        },
        modules: ['node_modules']
    },
    optimization: {
        namedChunks: true,
        moduleIds: 'named', //"natural" | "named" | "hashed" | "size" | "total-size" | false
        minimize: false,
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
        splitChunks:{
            chunks: 'all', // chunks: 'async',//默认只作用于异步模块，为`all`时对所有模块生效,`initial`对同步模块有效
            // cacheGroups: {
            //     'vendors': {
            //         name: 'chunk-vendors',
            //         enforce: true,
            //         test: /[\\/]node_modules[\\/]/,
            //         priority: -20,
            //     },
            // }
        },
        runtimeChunk: {
            name: 'manifest'
        },
    },
    module: {
        rules: [
            {//vue 解析
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {//css 解析
                test: /\.(le|sa|sc|c)ss$/,
                use: [
                    'vue-style-loader', 'css-loader',
                    {
                        loader: 'less-loader',
                        options: {
                            globalVars: {
                                hack: 'true; @import \'~@/assets/css/common.less\';'
                            },
                        }
                    }
                ]
            },
            {
                test: /\.svg$/,
                loader:'svg-sprite-loader',
                include:[path.resolve(__dirname,'./src/icons')],
                options:{  symbolId: 'icon-[name]'  }   
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/,
                use: [
                    {
                        loader:'file-loader',
                        options: {
                            esModule: false, // 这里设置为false
                            name: '[name].[ext]',
                            outputPath: './img',
                            limit: 8192,
                        },
                    }
                ],
                exclude:  [path.resolve(__dirname,'./src/icons')]
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
                loader: 'file-loader'
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new CleanWebpackPlugin(),
        new Webpackbar({color: 'green'}), //打包进度条
        new webpack.HashedModuleIdsPlugin({//生成稳定的模块id
            hashFunction: 'sha256',
            hashDigest: 'hex',
            hashDigestLength: 20
        })
    ]
}
