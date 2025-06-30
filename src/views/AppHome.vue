<template>
  <div class="min-h-screen flex flex-col">
    <main class="container mx-auto px-4 py-6 flex-grow">
      <!-- 分类导航 - 已居中 -->
      <div class="mb-6 overflow-x-auto scrollbar-hide flex justify-center">
        <div class="flex space-x-2 py-2 min-w-max">

          <button
              v-for="cat in CATEGORIES"
              :key="cat"
              :class="[
              'px-4 py-2 rounded-full',
              activeCategory === cat
                ? 'bg-primary text-white'
                : 'bg-white dark:bg-dark-card shadow-sm hover:shadow-md transition-shadow'
            ]"
                        @click="activeCategory = cat"
                    >
            <span class="dark:text-dark-text">{{ cat }}</span>
          </button>
        </div>
      </div>

      <section class="mb-10">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <CommunityCard
              v-for="p in filteredPlatforms"
              :key="p.title"
              :title="p.title"
              :logo="p.logo"
              :updateTime="p.updateTime"
              :list="p.list"
          />
        </div>
      </section>
    </main>
  </div>
</template>

<script>
import CommunityCard from '@/components/Card/CommunityCard.vue';
import {topSearchForBaiDu} from "@/api/api";
import {topSearchForDouYin} from "@/api/api";
import {topSearchForBilibili} from "@/api/api";
import {topSearchForWeiBo} from "@/api/api";
const baiduLogo = require('@/assets/image/baidu.png');
const bilibiliLogo = require('@/assets/image/bilibili.png');
const douyinLogo = require('@/assets/image/douyin.png');
const weiboLogo = require('@/assets/image/weibo.png');
/**
 * 平台对应的分类，也就是属于那个tab
 *
 * 每次添加新的接口时，就在CATEGORY_MAP和PLATFORM_CONFIG中添加新的平台信息，其他所有东西不用动
 */
const CATEGORY_MAP = {
  BAIDU: '缺德',
  BILIBILI: '娱乐',
  DOUYIN: '娱乐',
  WEIBO: '综合'
}
/**
 * 平台配置,是一些已知的元信息，后面通过请求再加一些数据，给到一个新对象，然后用于页面展示
 */
const PLATFORM_CONFIG = [
  {
    title: '百度',
    logo: baiduLogo,
    category: CATEGORY_MAP.BAIDU,
    fetch: topSearchForBaiDu
  },
  {
    title: 'Bilibili',
    logo: bilibiliLogo,
    category: CATEGORY_MAP.BILIBILI,
    fetch: topSearchForBilibili
  },
  {
    title: '抖音',
    logo: douyinLogo,
    category: CATEGORY_MAP.DOUYIN,
    fetch: topSearchForDouYin
  },
  {
    title: '微博',
    logo: weiboLogo,
    category: CATEGORY_MAP.WEIBO,
    fetch: topSearchForWeiBo
  }
]
export default {
  components: {
    CommunityCard,
  },
  data() {
    return {
      activeCategory: '全部',
      CATEGORIES: ['全部', ...new Set(PLATFORM_CONFIG.map(p => p.category))],
      platforms: []
    }
  },
  methods: {
    getUpdateTime(){
      const now = new Date()
      return `更新于 ${now.toLocaleString()}`
    },
  },
  async mounted() {
    //初始化请求数据，全程就只有初始化的时候才会请求后台（刷新页面）
    const results = await Promise.all(PLATFORM_CONFIG.map(p => p.fetch()))
    //把请求到的热点信息组装到页面展示的对象中去
    this.platforms = PLATFORM_CONFIG.map((cfg, index) => ({
      title: cfg.title,
      logo: cfg.logo,
      category: cfg.category,
      list: Array.isArray(results[index].data) ? results[index].data : [],
      updateTime: this.getUpdateTime(),
    }))
  },
  computed: {
    //从 platforms 中筛选出属于当前分类，且有数据的卡片,是给页面画卡片用的（点击tab会触发）
    filteredPlatforms() {
      if (!Array.isArray(this.platforms)) return []
      return this.platforms.filter(p => {
        const match = this.activeCategory === '全部' || p.category === this.activeCategory
        return (
            match &&
            Array.isArray(p.list) &&
            p.list.length > 0
        )
      })
    }
  }
}
</script>