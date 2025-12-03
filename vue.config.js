const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
    transpileDependencies: true,
    chainWebpack: config => {
        config.module
            .rule('js')
            .exclude.add(/node_modules/)
            .end()
    },
    pwa: {
        name: '糖果梦热榜',
        short_name: '糖果梦热榜',
        themeColor: '#212830',
        msTileColor: '#212830',
        manifestOptions: {
            start_url: '.',
            display: 'standalone',
            background_color: '#212830',
            icons: [
                {
                    src: 'icons/icon-192.png',
                    sizes: '192x192',
                    type: 'image/png'
                },
                {
                    src: 'icons/icon-512.png',
                    sizes: '512x512',
                    type: 'image/png'
                }
            ]
        }
    }
})
