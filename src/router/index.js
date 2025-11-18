import { createRouter, createWebHistory } from 'vue-router'
import { getSeoByPath  } from '@/utils/seo.js'
import settingRoutes from './setting';
import Home from '../views/AppHome.vue'

const routes = [
    { path: '/', name: 'Home', component: Home },
    ...settingRoutes,
    { path: '/:category', name: 'Category', component: Home },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
    // 路由时，滚动到顶部
    scrollBehavior(to, from, savedPosition) {
        // 确保每次路由跳转时都滚动到页面顶部
        if (savedPosition) {
            return savedPosition;
        }
        if (to.hash) {
            return { selector: to.hash }; // 如果有 hash 则跳转到某个元素
        }
        return { top: 0, left: 0, behavior: 'smooth' }; // 否则返回顶部
    }
})

// 全局导航守卫设置 SEO
router.afterEach((to) => {
    const seo = getSeoByPath(to.path)

    // useHead 只能在 setup 里用，如果要全局更新，需要用 head 管理器
    // 推荐使用 @vueuse/head 的 head.push
    import('@vueuse/head').then(({ useHead }) => {
        useHead({
            title: seo.title,
            link: [
                {
                    rel: 'canonical',
                    href: seo.canonical
                }
            ],
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

