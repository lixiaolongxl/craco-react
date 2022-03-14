const CracoLessPlugin = require('craco-less');
const SimpleProgressWebpackPlugin = require('simple-progress-webpack-plugin')
const { when, whenDev, whenProd, whenCI, whenTest, ESLINT_MODES, POSTCSS_MODES } = require("@craco/craco");
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const path = require('path')
const lessModuleRegex = /\.module\.less$/;
module.exports = {
    reactScriptsVersion: "react-scripts",/* (default value) */
    webpack: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
            '@components': path.resolve(__dirname, 'src/components'),
            '@pages': path.resolve(__dirname, 'src/pages'),
            '@utils': path.resolve(__dirname, 'src/utils')
        },
        //抽离公用模块
        optimization: {
            splitChunks: {
                cacheGroups: {
                    commons: {
                        chunks: 'initial',
                        minChunks: 2,
                        maxInitialRequests: 5,
                        minSize: 0
                    },
                    vendor: {
                        test: /node_modules/,
                        chunks: 'initial',
                        name: 'vendor',
                        priority: 10,
                        enforce: true
                    }
                }
            }
        },
        configure: {
            // output: {
            //     path: path.resolve(__dirname, "dist")
            // },
            //这段代码在2020-08-06的时候仅仅修改public文件的打包目录
        },
        configure: (webpackConfig, { env, paths }) => {
            webpackConfig.output.path = path.resolve(__dirname, "dist")//ts和less编译后的文件
            // webpackConfig.output.publicPath = './';
            paths.appBuild = path.resolve(__dirname, "dist");//public中的文件
            return webpackConfig;
        },
        plugins: [
            ...whenProd( //生产环境
                () => [
                    // 打压缩包
                    new CompressionWebpackPlugin({
                        algorithm: 'gzip',
                        test: new RegExp('\\.(' + ['js', 'css'].join('|') + ')$'),
                        threshold: 1024,
                        minRatio: 0.8
                    }),
                    new SimpleProgressWebpackPlugin(),
                ], []
            )
        ]
    },
    plugins: [
        // 
        {
            plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        modifyVars: { '@primary-color': '#1DA57A' },
                        javascriptEnabled: true,
                    },
                }
            },
        },
    ],
    devServer: {
        port: 9000,
    },
    babel: {
        presets: [
            [
                '@babel/preset-env',
                {
                    modules: false, // 对ES6的模块文件不做转化，以便使用tree shaking、sideEffects等
                    useBuiltIns: 'entry', // browserslist环境不支持的所有垫片都导入
                    corejs: {
                        version: 3, // 使用core-js@3
                        proposals: true,
                    },
                },
            ],
        ],
    }
};