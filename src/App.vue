<template>
  <div class="container mx-auto px-8 py-24" :style="widthPaddingStyle">
    <HeaderComponent/>
    <NotificationComponent/>
    <!-- 友链 -->
    <!--      <AdRentCards :ads="homeHeaderAdsCard"/>-->
    <!-- 这里放页面主体内容，比如 AppHome 组件 -->
    <!--      <Home/>-->
    <router-view/>
    <!-- 主内容和评论区之间 展示Ads广告 -->
<!--    <GoogleAdsense ad-client="ca-pub-3286880109560525" ad-slot="9081541454" ad-format="auto"-->
<!--                   :full-width-responsive="true"/>-->
    <!-- 页面底部 多重Ads广告-->
<!--    <GoogleAdsense ad-client="ca-pub-3286880109560525" ad-slot="7002721768" ad-format="autorelaxed"/>-->
<!--    <GoogleAdsense ad-client="ca-pub-3286880109560525" ad-slot="7002721768" ad-format="autorelaxed"/>-->
<!--    <GoogleAdsense ad-client="ca-pub-3286880109560525" ad-slot="7002721768" ad-format="autorelaxed"/>-->
<!--    <GoogleAdsense ad-client="ca-pub-3286880109560525" ad-slot="7002721768" ad-format="autorelaxed"/>-->
    <el-backtop :right="100" :bottom="100"/>
  </div>
</template>

<script>
import HeaderComponent from "@/components/Layout/HeaderComponent.vue";
import NotificationComponent from "@/components/Layout/NotificationComponent.vue";
// import GoogleGoogleAdsense from "./components/Adsense/GoogleAdsense.vue";
// import AdRentCards from "./components/Card/AdRentCards.vue";

export default {
  name: 'App',
  components: {
    NotificationComponent,
    HeaderComponent: HeaderComponent,
    // GoogleAdsense: GoogleGoogleAdsense,
    // AdRentCards: AdRentCards,
  },
  data() {
    return {
      homeHeaderAdsCard: this.$store.state.homeHeaderAdsCard
    }
  },
  computed: {
    widthPaddingStyle() {
      return {
        width: this.widthPadding + '% !important',
      }
    },
    // 边距缩放，就是屏幕两边的，主要是为了移动端i
    widthPadding: {
      get() {
        return this.$store.state.widthPadding;
      },
      set(newPadding) {
        this.$store.commit('setWidthPadding', newPadding);
      }
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
</style>
