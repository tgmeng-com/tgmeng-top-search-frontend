<template>
  <div class="container mx-auto px-8 py-24" :style="widthPaddingStyle">
    <HeaderComponent/>
    <NotificationComponent/>
    <AIFloatReport/>
    <SubscriptionConfigModal/>
    <ClientInstall/>
    <!-- 友链 -->
    <!-- 这里放页面主体内容，比如 AppHome 组件 -->
    <!--      <Home/>-->
    <router-view/>
    <!-- 页面底部 多重广告-->
    <GoogleAdsense v-if="$store.state.adsEnabled" ad-client="ca-pub-3286880109560525" ad-slot="7002721768" ad-format="autorelaxed"/>
    <el-backtop :right="100" :bottom="100"/>
  </div>
</template>

<script>
import HeaderComponent from "@/components/Layout/HeaderComponent.vue";
import NotificationComponent from "@/components/Layout/NotificationComponent.vue";
import GoogleGoogleAdsense from "./components/Adsense/GoogleAdsense.vue";
import AIFloatReport from "@/components/Layout/AIFloatReport.vue";
import SubscriptionConfigModal from "@/components/Layout/SubscriptionConfigModal.vue";
import ClientInstall from "@/components/UI/ClientInstall.vue";

export default {
  name: 'App',
  components: {
    AIFloatReport,
    NotificationComponent,
    HeaderComponent: HeaderComponent,
    GoogleAdsense: GoogleGoogleAdsense,
    ClientInstall: ClientInstall,
    SubscriptionConfigModal,
  },
  data() {
    return {
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
