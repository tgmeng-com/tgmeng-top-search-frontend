<template>
  <div>
  </div>
</template>

<script>
import {ElNotification} from 'element-plus'

export default {
  components: {},
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
  },
  methods: {
    notification() {
      ElNotification({
        title: '新功能',
        message: '新增了摸鱼模式，点击右上方小鱼即可体验',
        type: 'success',
        position: "top-left",
        duration: 10000
      })
    }
  },
  mounted() {
    const isBefore = (target) => Date.now() < new Date(target);
    if (isBefore('2025-11-25')) {
      this.notification()
    }
  }
}
</script>

<style scoped>


</style>