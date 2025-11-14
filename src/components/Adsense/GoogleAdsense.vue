<template>
  <ins class="adsbygoogle"
       :style="style"
       :data-ad-client="adClient"
       :data-ad-slot="adSlot"
       :data-ad-format="adFormat"
       :data-ad-layout-key="addLayoutKey"
       :data-full-width-responsive="fullWidthResponsive"></ins>
</template>
<script>
export default {
  name: "GoogleAdsense",
  props: {
    adClient: {type: String, default: "ca-pub-3286880109560525"},
    adSlot: {type: String, required: true, default: "9081541454"},
    adFormat: {type: String, default: "auto"},
    style: {type: String, default: 'display:block'},
    addLayoutKey: { type: String, default: "" },
    fullWidthResponsive: { type: Boolean, default: false }
  },
  mounted() {
    // 确保脚本加载完成后再 push
    this.$nextTick(() => {
      if (window.adsbygoogle && window.adsbygoogle.push) {
        try {
          window.adsbygoogle.push({});
        } catch (e) {
          console.warn("Adsense error:", e);
        }
      }
    });
  }
};
</script>
<style scoped>

</style>