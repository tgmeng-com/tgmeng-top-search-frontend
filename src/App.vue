<template>
  <div id="app">
    <SideBar/>
    <!-- 引入我们开发的 AppHeader、AppHome、AppFooter 等组件 -->
    <Header/>
    <main class="container mx-auto px-4 py-6">
      <!-- 这里放页面主体内容，比如 AppHome 组件 -->
      <Home/>
      <!-- 主内容和评论区之间 展示Ads -->
      <GoogleAdsense ad-client="ca-pub-3286880109560525" ad-slot="9081541454" ad-format="auto"
                     :full-width-responsive="true"/>
      <a href="https://www.effectivegatecpm.com/uziswdxdh?key=8e13f2a493aefc682e6e4e25b0dd969e" target="_blank">111测试测试测试测试测试</a>
      <WalineComment/>
      <!-- 页面底部 多重Ads-->
      <GoogleAdsense ad-client="ca-pub-3286880109560525" ad-slot="7002721768" ad-format="autorelaxed"/>
      <GoogleAdsense ad-client="ca-pub-3286880109560525" ad-slot="7002721768" ad-format="autorelaxed"/>
      <GoogleAdsense ad-client="ca-pub-3286880109560525" ad-slot="7002721768" ad-format="autorelaxed"/>
      <GoogleAdsense ad-client="ca-pub-3286880109560525" ad-slot="7002721768" ad-format="autorelaxed"/>
      <el-backtop :right="100" :bottom="100"/>
    </main>
  </div>
</template>

<script>
import AppHeader from './components/Layout/AppHeader.vue';
import AppHome from './views/AppHome.vue';
import SettingSideBar from "@/components/SettingSideBar.vue"; // 假设 AppHome 是首页视图
import WalineComment from "./components/WalineComment.vue";
import GoogleGoogleAdsense from "./components/Adsense/GoogleAdsense.vue";

export default {
  name: 'App',
  components: {
    SideBar: SettingSideBar,
    Header: AppHeader,
    Home: AppHome,
    WalineComment: WalineComment,
    GoogleAdsense: GoogleGoogleAdsense,
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
}
</style>
