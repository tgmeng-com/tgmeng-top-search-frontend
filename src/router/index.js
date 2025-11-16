import { createRouter, createWebHistory } from 'vue-router'
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

export default router
