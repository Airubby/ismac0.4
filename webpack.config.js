const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const CopyWebpackPlugin=require('copy-webpack-plugin');
const Webpackbar = require('webpackbar');
const glob = require('glob');
//glob.sync('./src/packages/**/*.vue')  /**/是packages下面所有的文件夹；/*/是packages下面一级的文件夹
const files = glob.sync('./src/packages/*/*.vue');
let entry={},assets=[];

if(files.length>0){
    files.forEach(str => {
        // str './src/packages/rack/index.vue',  element:rack;comname:index
        let matchstr=str.match(/\.\/src\/packages\/(\S*)\/(\S*)\.vue/)
        let element = matchstr[1];
        let comname = matchstr[2];
        entry[element+"/"+comname]=str
        const images = glob.sync(`./src/packages/${element}/images/`);
        if(images.length>0){
            assets.push({
                from: path.resolve(__dirname, `./src/packages/${element}/images`),
                to: `./${element}/images`,
                ignore: ['.*']
            })
        }
    });
}

module.exports = {
    mode: 'production',
    // entry: {
    //     [name]:`./src/packages/${name}/index.vue`,
    //     [name1]:`./src/packages/${name1}/index.vue`,
    //     [name2]:`./src/packages/${name2}/index.vue`
    // },
    entry: entry,
    output: {
        path: path.resolve(__dirname, `lib`),
        // path: __dirname,
        filename: `./[name].js`,  //[name]:  test/index
        library: '[name]',
        libraryTarget:'commonjs-module'  //"var" | "assign" | "this" | "window" | "self" | "global" | "commonjs" | "commonjs2" | "commonjs-module" | "amd" | "amd-require" | "umd" | "umd2" | "jsonp" | "system"
        // jsonpFunction:'webpackJsonp'
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            '@': path.resolve(__dirname, './src')
        },
        modules: ['node_modules']
    },
    plugins: [
        new VueLoaderPlugin(),
        new Webpackbar({color: 'green'}), //打包进度条
        new CopyWebpackPlugin(assets)
        // new CopyWebpackPlugin([
        //     {
        //         from: path.resolve(__dirname, `./src/packages/${name1}/images`),
        //         to: `./lib/${name1}/images`,
        //         ignore: ['.*']
        //     },
        //     {
        //         from: path.resolve(__dirname, `./src/packages/${name2}/images`),
        //         to: `./lib/${name2}/images`,
        //         ignore: ['.*']
        //     }
        // ])
    ],
    module: {
        rules: [
            {//vue 解析
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {//css 解析
                test: /\.(le|sa|sc|c)ss$/,
                use: ['vue-style-loader', 'css-loader','less-loader']
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/,
                use: [{
                    loader:'file-loader',
                    options:{
                        limit: 1,
                        name: `./[name][hash].[ext]`,
                        outputPath: `./.buffercache`
                    }
                }],
                // exclude:  [path.resolve(__dirname,'./src/packages')]
            },
            // {
            //     test: /\.(png|jpe?g|gif|webp)(\?.*)?$/,
            //     use: [
            //         {
            //             loader: 'url-loader',
            //             options: {
            //                 limit: 1,
            //                 // name: `./[name].[ext]`,
            //                 // publicPath:"./"
            //                 esModule: false,
            //                 fallback: {
            //                     loader: require.resolve('file-loader'),
            //                     options: {
            //                         name: `[name].[ext]`,
            //                         outputPath: `./${__dirname}`,
            //                     }
            //                 }
            //             }
            //         }
            //     ]
            // },
        ]
    }
}
