import {createRouter, createWebHistory} from 'vue-router'
import {getSeoByPath} from '@/utils/seo.js'
import {useHead} from '@vueuse/head'
import settingRoutes from './setting';
import store from "@/store";

// ⚡ 关键优化: 懒加载主组件
// webpackChunkName 会把这个组件单独打包成 home.js
const Home = () => import(/* webpackChunkName: "home" */ '../views/AppHome.vue')

const routes = [
    {path: '/', name: 'Home', component: Home},
    {path: '/excel', name: 'Excel', component: Home},
    ...settingRoutes,
    {path: '/:category', name: 'Category', component: Home},
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
            return { el: to.hash, behavior: 'smooth' } // 如果有 hash 则跳转到某个元素
        }
        return {top: 0, left: 0, behavior: 'smooth'}; // 否则返回顶部
    }
})

// 在路由跳转之前进行 Vuex 状态设置（beforeEach）
router.beforeEach((to, from, next) => {
    // 如果访问的是 Excel 页面，设置 Vuex 状态
    if (to.name === 'Excel') {
        // 路由为 'Excel' 时，设置 Vuex 状态
        store.commit('setWorkMaskExcelShow', true)
    } else {
        store.commit('setWorkMaskExcelShow', false)
    }
    next()  // 跳转到目标路由
})


// 全局导航守卫设置 SEO
router.afterEach((to) => {
    const seo = getSeoByPath(to.path)

    // useHead 只能在 setup 里用，如果要全局更新，需要用 head 管理器
    // 推荐使用 @vueuse/head 的 head.push
    useHead({
        title: seo.title,
        link: [
            {
                rel: 'canonical',
                href: seo.canonical
            }
        ],
        meta: [
            {name: 'description', content: seo.description},
            {property: 'og:title', content: seo.og.title},
            {property: 'og:description', content: seo.og.description},
            {property: 'og:image', content: seo.og.image},
            {property: 'og:url', content: seo.og.url},
            {property: 'og:type', content: seo.og.type},
            {name: 'twitter:card', content: seo.twitter.card},
            {name: 'twitter:title', content: seo.twitter.title},
            {name: 'twitter:description', content: seo.twitter.description},
            {name: 'twitter:image', content: seo.twitter.image}
        ],
        script: seo.jsonLd.map(json => ({
            type: 'application/ld+json',
            children: JSON.stringify(json)
        }))
    })
})

export default router

