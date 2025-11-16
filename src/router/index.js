import { createRouter, createWebHistory } from 'vue-router'
import { getSeoByPath  } from '@/utils/seo.js'
import Home from '../views/AppHome.vue'
// import About from '../views/About.vue'
// import News from '../views/News.vue'

const routes = [
    { path: '/', name: 'Home', component: Home },
    // 可以后续添加不同路由页面
    // { path: '/category/:id', name: 'Category', component: Home },
    { path: '/:category', name: 'Category', component: Home },
    // 这里用同一个组件 Home，但通过 route params 渲染不同分类
    // { path: '/about', name: 'About', component: About },
    // { path: '/news', name: 'News', component: News }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

// 全局导航守卫设置 SEO
router.afterEach((to) => {
    const seo = getSeoByPath(to.path)

    // useHead 只能在 setup 里用，如果要全局更新，需要用 head 管理器
    // 推荐使用 @vueuse/head 的 head.push
    import('@vueuse/head').then(({ useHead }) => {
        useHead({
            title: seo.title,
            meta: [
                { name: 'description', content: seo.description },
                { property: 'og:title', content: seo.og.title },
                { property: 'og:description', content: seo.og.description },
                { property: 'og:image', content: seo.og.image },
                { property: 'og:url', content: seo.og.url },
                { property: 'og:type', content: seo.og.type },
                { name: 'twitter:card', content: seo.twitter.card },
                { name: 'twitter:title', content: seo.twitter.title },
                { name: 'twitter:description', content: seo.twitter.description },
                { name: 'twitter:image', content: seo.twitter.image }
            ],
            script: seo.jsonLd.map(json => ({
                type: 'application/ld+json',
                children: JSON.stringify(json)
            }))
        })
    })
})

export default router

