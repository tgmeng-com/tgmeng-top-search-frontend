const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
    transpileDependencies: true,
    productionSourceMap: false,
    // 其他你之前加的优化配置也可以继续放这里
})