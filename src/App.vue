<template>
  <div id="app">
    <!-- 引入我们开发的 AppHeader、AppHome、AppFooter 等组件 -->
    <Header />
    <main class="container mx-auto px-4 py-6">
      <!-- 这里放页面主体内容，比如 AppHome 组件 -->
      <Home />
    </main>
    <Footer />
  </div>
</template>

<script>
import AppHeader from './components/Layout/AppHeader.vue';
import AppFooter from './components/Layout/AppFooter.vue';
import AppHome from './views/AppHome.vue'; // 假设 AppHome 是首页视图

export default {
  name: 'App',
  components: {
    Header: AppHeader,
    Footer: AppFooter,
    Home: AppHome
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
