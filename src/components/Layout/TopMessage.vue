<template>
  <div class="top-0 z-50 bg-light-bg/90 dark:bg-dark-bg/90 backdrop-blur-md transition-all duration-300">
    <div class="py-2 pb-8 flex flex-col items-center text-lg space-y-1">

      <!--      &lt;!&ndash; 第一行可横向滑动 &ndash;&gt;-->
      <!--      <div class="overflow-x-auto whitespace-nowrap scrollbar-hide w-full text-center">-->
      <!--        <div class="inline-block font-semibold dark:text-dark-text py-1">-->
      <!--          🎉本项目前后端在GitHub上均已100%开源&nbsp;&nbsp;&nbsp;-->
      <!--          <a data-umami-event="前端" data-umami-event-name="前端" target="_blank"  href="https://github.com/CandyDream6/tgmeng-top-search-frontend" class="cursor-pointer">👉前端</a>&nbsp;&nbsp;&nbsp;-->
      <!--          <a data-umami-event="后端" data-umami-event-name="后端" target="_blank"  href="https://github.com/CandyDream6/tgmeng-api" class="cursor-pointer">👉后端</a>-->
      <!--        </div>-->
      <!--      </div>-->

      <!--      &lt;!&ndash; 第二行可横向滑动 &ndash;&gt;-->
      <!--      <div class="overflow-x-auto whitespace-nowrap scrollbar-hide w-full text-center">-->
      <!--        <div class="inline-block font-semibold dark:text-dark-text py-1">-->
      <!--          项目用到的所有接口均是官方接口，无任何第三方中转，主打无情铁手-->
      <!--        </div>-->
      <!--      </div>-->

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
        '分钟级实时更新 · 永远快人一步',
        '全网热点聚合 · 数百家平台一站搞定',
        '官方API直连 · 数据真实零中转',
        '超强自定义 · 打造专属你的热榜风格',
        '100%开源透明 · GitHub全代码可查',
        '活跃开发者社区 · 一起交流共同进化'
      ]
    }
  }
}
</script>

<style scoped>


</style>