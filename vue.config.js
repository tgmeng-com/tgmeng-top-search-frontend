const { defineConfig } = require('@vue/cli-service')
const CompressionPlugin = require('compression-webpack-plugin')
const webpack = require('webpack')

module.exports = defineConfig({
    transpileDependencies: true,

    // ⚡ 禁用 source map (减少 30-40% 文件大小)
    productionSourceMap: false,

    configureWebpack: {
        optimization: {
            splitChunks: {
                chunks: 'all',
                minSize: 20000,
                maxSize: 200000,
                cacheGroups: {
                    // ⚡ 分离 Vue 全家桶
                    vue: {
                        test: /[\\/]node_modules[\\/](vue|vue-router|vuex|@vueuse)[\\/]/,
                        name: 'chunk-vue',
                        priority: 20
                    },
                    // ⚡ 分离 Element Plus
                    elementPlus: {
                        test: /[\\/]node_modules[\\/]element-plus[\\/]/,
                        name: 'chunk-element-plus',
                        priority: 15
                    },
                    // ⚡ 其他第三方库
                    vendors: {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'chunk-vendors',
                        priority: 10
                    },
                    // ⚡ 公共代码
                    common: {
                        minChunks: 2,
                        priority: 5,
                        reuseExistingChunk: true
                    }
                }
            }
        },
        plugins: [
            // ⚡ Gzip 压缩
            new CompressionPlugin({
                algorithm: 'gzip',
                test: /\.(js|css|html|svg)$/,
                threshold: 10240, // 只压缩大于 10KB 的文件
                minRatio: 0.8,
                deleteOriginalAssets: false // 保留原文件
            }),

            // ⚡ 忽略 moment.js 的语言包 (减少 ~160KB)
            new webpack.IgnorePlugin({
                resourceRegExp: /^\.\/locale$/,
                contextRegExp: /moment$/
            })
        ]
    },

    chainWebpack: config => {
        // ⚡ 生产环境移除 console
        if (process.env.NODE_ENV === 'production') {
            config.optimization.minimizer('terser').tap(args => {
                Object.assign(args[0].terserOptions.compress, {
                    drop_console: true,
                    drop_debugger: true,
                    pure_funcs: ['console.log', 'console.info']
                })
                return args
            })
        }

        // ⚡ 移除不必要的 prefetch (减少初始网络请求)
        config.plugins.delete('prefetch')

        // ⚡ Vue CLI 5+ 内置了资源处理,不需要手动配置
        // 小于 4KB 的图片会自动转为 base64
        // 无需额外配置 url-loader 或 file-loader
    },

    // 开发服务器配置
    devServer: {
        port: 8080,
        open: true,
        hot: true
    }
})