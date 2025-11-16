<template>
  <section class="container mx-auto px-4 pb-6">
    <div class="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2">
      <a v-for="(ad, index) in ads" :key="index"
         :href="ad.url || '#'" target="_blank" rel="noopener noreferrer"
         class="relative w-full aspect-[16/9] overflow-hidden rounded-lg shadow cursor-pointer hover:-translate-y-1 transition-transform">
        <img v-if="ad.logo" :src="ad.logo" alt="卡片图"
             class="h-full w-auto object-contain mx-auto"/>
      </a>
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
