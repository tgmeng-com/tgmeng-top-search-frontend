const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
    transpileDependencies: true,

    productionSourceMap: false,

    configureWebpack: {
        // 不要分太多 chunk
        optimization: {
            splitChunks: {
                chunks: "all",
                minSize: 100000, // ≥ 100kb 再拆包
                maxAsyncRequests: 5,
                maxInitialRequests: 3,
                cacheGroups: {
                    vendors: {
                        test: /[\\/]node_modules[\\/]/,
                        name: "chunk-vendors",
                        priority: -10
                    }
                }
            }
        }
    },

    chainWebpack: config => {
        // 保留 prefetch，加速首页
        // config.plugins.delete('prefetch') // ❌ 注释掉，不删除！

        // 删除 console（轻量安全）
        if (process.env.NODE_ENV === "production") {
            config.optimization.minimizer("terser").tap(args => {
                args[0].terserOptions.compress.drop_console = true
                args[0].terserOptions.compress.drop_debugger = true
                return args
            })
        }
    }
})
