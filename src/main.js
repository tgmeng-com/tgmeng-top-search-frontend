import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import App from './App.vue'
import './assets/main.css'  // 引入 main.css
import store from './store';

// 导入 Font Awesome 核心
import { library } from '@fortawesome/fontawesome-svg-core'
// 导入需要的图标
import { faNewspaper, faSearch, faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// 添加图标到库
library.add(faNewspaper, faSearch, faMoon, faSun);

const app = createApp(App)

// 全局注册 Font Awesome 组件
app.component('font-awesome-icon', FontAwesomeIcon)
app.use(ElementPlus)
app.use(store)
app.mount('#app')