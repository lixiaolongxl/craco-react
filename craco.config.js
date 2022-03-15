const CracoLessPlugin = require('craco-less');
const SimpleProgressWebpackPlugin = require('simple-progress-webpack-plugin')
const { when, whenDev, whenProd, whenCI, whenTest, ESLINT_MODES, POSTCSS_MODES, loaderByName } = require("@craco/craco");
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const path = require('path')
const friendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const DashboardPlugin = require('webpack-dashboard/plugin')
const CircularDependencyPlugin = require('circular-dependency-plugin')
const webpack = require('webpack')
const {
    BundleAnalyzerPlugin
} = require('webpack-bundle-analyzer')
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin')
const lessModuleRegex = /\.module\.less$/;
const WebpackBar = require('webpackbar')
const CopyWebpackPlugin = require('copy-webpack-plugin');
module.exports = {
    reactScriptsVersion: "react-scripts",/* (default value) */
    webpack: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
            '@components': path.resolve(__dirname, 'src/components'),
            '@pages': path.resolve(__dirname, 'src/pages'),
            '@utils': path.resolve(__dirname, 'src/utils'),
            '@api': path.resolve(__dirname, 'src/api'),
            '@type': path.resolve(__dirname, 'src/type'),
            '@img': path.resolve(__dirname, 'src/static/imges')
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
            new WebpackBar({
                profile: true
            }),
            new CopyWebpackPlugin({
                patterns: [
                    {
                        from: path.join(__dirname, '/public/file'),//打包的静态资源目录地址
                        to: './file' //打包到dist下面的public
                    }
                ]

            }),
            ...whenDev(
                () => [
                    // 文件依赖
                    new CircularDependencyPlugin({
                        exclude: /node_modules/,
                        include: /src/,
                        failOnError: true,
                        allowAsyncCycles: false,
                        cwd: process.cwd()
                    }),
                    // 错误友好提示
                    new friendlyErrorsWebpackPlugin(),
                    // 显示webpack构建
                    new DashboardPlugin(),
                    // 热更新
                    new webpack.HotModuleReplacementPlugin()
                ], []
            ),

            ...whenProd( //生产环境
                () => [
                    // 清空文件
                    new CleanWebpackPlugin(),
                    // x限制js 文件大小 ?移动端开启
                    new webpack.optimize.AggressiveSplittingPlugin({
                        minSize: 30720, // 字节，分割点。默认：30720
                        maxSize: 51200, // 字节，每个文件最大字节。默认：51200
                        chunkOverhead: 0, // 默认：0
                        entryChunkMultiplicator: 1, // 默认：1
                    }),
                    // 打压缩包
                    new CompressionWebpackPlugin({
                        algorithm: 'gzip',
                        test: new RegExp('\\.(' + ['js', 'css'].join('|') + ')$'),
                        threshold: 1024,
                        minRatio: 0.8
                    }),
                    // 打包进度
                    new SimpleProgressWebpackPlugin(),
                    // 打包分析
                    new BundleAnalyzerPlugin({
                        analyzerMode: 'static', // html 文件方式输出编译分析
                        openAnalyzer: false,
                        reportFilename: path.resolve(__dirname, `analyzer/index.html`)
                    })
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
                },
                
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