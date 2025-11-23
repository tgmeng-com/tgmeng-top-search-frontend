<template>
  <div class="container mx-auto px-8 py-6">
    <!-- 引入我们开发的 TopMessage、AppHome、AppFooter 等组件 -->
    <HeaderComponent/>
    <TopMessage/>
    <!-- 友链 -->
    <!--      <AdRentCards :ads="homeHeaderAdsCard"/>-->
    <!-- 这里放页面主体内容，比如 AppHome 组件 -->
    <!--      <Home/>-->
    <router-view/>
    <!-- 主内容和评论区之间 展示Ads广告 -->
<!--    <GoogleAdsense ad-client="ca-pub-3286880109560525" ad-slot="9081541454" ad-format="auto"-->
<!--                   :full-width-responsive="true"/>-->
    <WalineComment/>
    <!-- 页面底部 多重Ads广告-->
<!--    <GoogleAdsense ad-client="ca-pub-3286880109560525" ad-slot="7002721768" ad-format="autorelaxed"/>-->
<!--    <GoogleAdsense ad-client="ca-pub-3286880109560525" ad-slot="7002721768" ad-format="autorelaxed"/>-->
<!--    <GoogleAdsense ad-client="ca-pub-3286880109560525" ad-slot="7002721768" ad-format="autorelaxed"/>-->
<!--    <GoogleAdsense ad-client="ca-pub-3286880109560525" ad-slot="7002721768" ad-format="autorelaxed"/>-->
    <el-backtop :right="100" :bottom="100"/>
    <AIFloatReport/>
  </div>
</template>

<script>
import HeaderComponent from "@/components/Layout/HeaderComponent.vue";
import WalineComment from "./components/Layout/WalineComment.vue";
import AIFloatReport from "@/components/Layout/AIFloatReport.vue";
import TopMessage from "@/components/Layout/TopMessage.vue";
// import GoogleGoogleAdsense from "./components/Adsense/GoogleAdsense.vue";
// import AdRentCards from "./components/Card/AdRentCards.vue";

export default {
  name: 'App',
  components: {
    TopMessage,
    AIFloatReport,
    HeaderComponent: HeaderComponent,
    WalineComment: WalineComment
    // GoogleAdsense: GoogleGoogleAdsense,
    // AdRentCards: AdRentCards,
  },
  data() {
    return {
      homeHeaderAdsCard: this.$store.state.homeHeaderAdsCard
    }
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
  height: 100% !important;
  width: 100%;
  margin: 0;
  padding: 0;
}
.container{
  width: 95% !important;
}
</style>
