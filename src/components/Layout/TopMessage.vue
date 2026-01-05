<template>
  <div class="top-0 z-50 bg-light-bg/90 dark:bg-dark-bg/90 backdrop-blur-md transition-all duration-300">
    <div class="flex flex-col items-center text-lg space-y-1" :style="topMessageHeight">
      <div style="min-height: 100px; width: 100%;">
        <TextCarousel
            fontSize="clamp(1.5rem, 5vw, 3rem)"
            :textList="messages"
            :interval="5000"
            :fontWeight="900"
            :fontFamily="'Helvetica'"
            :letterSpacing="2"
            :duration="800"
            :sparkleInterval="150"
            :sparkleColors="['#A07CFE', '#FE8FB5', '#3b82f6']"
        />
      </div>

    </div>
  </div>
</template>

<script>
import TextCarousel from "@/components/UI/TextCarousel.vue";

export default {
  components: {
    TextCarousel: TextCarousel
  },
  data() {
    return {
      messages: [
        '糖果梦热榜 · 你的最后一款热榜',
        'AI深度分析 · 不只看热点更能预见趋势',
        '极致UI美学 · 视觉盛宴般的浏览体验',
        '订阅推送 · 实时获取感兴趣的信息',
        '分钟级实时更新 · 永远快人一步',
        '全网热点聚合 · 数百家平台一站搞定',
        '官方API直连 · 数据真实零中转',
        '超强自定义 · 打造专属你的热榜风格',
        '100%开源透明 · GitHub全代码可查',
        '活跃开发者社区 · 一起交流共同进化'
      ],
      windowWidth: window.innerWidth, // 屏幕大小
    }
  },
  computed: {
    isMobile() {
      return this.windowWidth < 768; // 手机屏幕宽度
    },
    topMessageHeight() {
      if (this.isMobile) {
        return {paddingBottom: 0 + 'rem'}
      }
      return {paddingBottom: 2 + 'rem'}
    },
  }
}
</script>

<style scoped>


</style>