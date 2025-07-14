<template>
  <div id="app">
    <SideBar/>
    <!-- 引入我们开发的 AppHeader、AppHome、AppFooter 等组件 -->
    <Header />
    <main class="container mx-auto px-4 py-6">
      <!-- 这里放页面主体内容，比如 AppHome 组件 -->
      <Home />
    </main>
  </div>
</template>

<script>
import AppHeader from './components/Layout/AppHeader.vue';
import AppHome from './views/AppHome.vue';
import SettingSideBar from "@/components/SettingSideBar.vue"; // 假设 AppHome 是首页视图

export default {
  name: 'App',
  components: {
    SideBar: SettingSideBar,
    Header: AppHeader,
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
  //margin-top: 30px;
}
</style>
