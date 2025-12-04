<template>
  <ins class="adsbygoogle"
       :style="style"
       :data-ad-client="adClient"
       :data-ad-slot="adSlot"
       :data-ad-format="adFormat"
       :data-ad-layout-key="adLayoutKey"
       :data-full-width-responsive="fullWidthResponsive"></ins>
</template>
<script>
export default {
  name: "GoogleAdsense",
  data() {
    return {
    }
  },
  props: {
    adClient: {type: String, default: "ca-pub-3286880109560525"},
    adSlot: {type: String, required: true, default: "9081541454"},
    adFormat: {type: String, default: "auto"},
    style: {type: String, default: 'display:block'},
    adLayoutKey: { type: String, default: "" },
    fullWidthResponsive: { type: Boolean, default: false }
  },
  methods:{
    loadAdsScript() {
      return new Promise((resolve) => {
        if (document.getElementById('adsbygoogle-script')) {
          resolve();
          return;
        }
        const script = document.createElement('script');
        script.id = 'adsbygoogle-script';
        script.async = true;
        script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=' + this.adClient;
        script.crossOrigin = 'anonymous';
        script.onload = resolve;  // 脚本加载完成后 resolve
        document.head.appendChild(script);
      });
    }
  },
  mounted() {
    // 加载广告脚本
    this.loadAdsScript().then(() => {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {
        console.warn("Adsense error:", e);
      }
    });
  }
};
</script>
<style scoped>

</style>