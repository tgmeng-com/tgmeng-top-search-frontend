<template>
  <section class="px-4 py-6">
    <div class="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-8 gap-2">
      <template v-for="(ad,index) in activeAds" :key="index">
        <div
            class="relative w-full aspect-[16/9] overflow-hidden shadow cursor-pointer hover:-translate-y-1 transition-transform"
            @click="clickAds(ad.name)"
        >
          <a :href="ad.url || '#'" target="_blank" rel="noopener noreferrer">
            <img v-if="ad.logo" :src="ad.logo" :alt="ad.desc" class="h-full w-auto object-contain mx-auto rounded-lg"/>
          </a>
        </div>
      </template>
    </div>
  </section>
</template>

<script>
export default {
  name: 'AdRentCards',
  props: {
    ads: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    clickAds(adsName) {
      window.umami.track('广告位点击：' + adsName)
    }
  },
  computed: {
    activeAds() {
      const now = new Date();
      return this.ads.filter(ad => {
        return ad.show
            && now >= new Date(ad.startTime)
            && now <= new Date(ad.expireTime)
            && ad.status === 'active';
      });
    }
  }
}
</script>

<style scoped>
/* hover 动画 */
.relative:hover {
  transform: translateY(-3px);
  transition: transform 0.2s;
}
</style>
