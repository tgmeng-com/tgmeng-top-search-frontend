<template>
  <ins class="adsbygoogle"
       style="display:block"
       :data-ad-client="adClient"
       :data-ad-slot="adSlot"
       data-ad-format="auto"
       data-full-width-responsive="true"></ins>
</template>
<script>
export default {
  name: "GoogleAdsense",
  props: {
    adClient: {
      type: String,
      default: "ca-pub-3286880109560525"
    },
    adSlot: {
      type: String,
      required: true
    }
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