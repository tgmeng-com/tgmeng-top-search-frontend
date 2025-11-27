const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})

module.exports = {
  chainWebpack: config => {
    config.module
        .rule('js')
        .exclude.add(/node_modules/)
        .end()
  }
}