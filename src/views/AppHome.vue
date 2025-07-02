<template>
  <div class="flex flex-col">
    <main class="container mx-auto px-4 py-6 flex-grow">
      <!-- 分类导航 - 同一行，按钮居中，更新时间右对齐 -->
      <div class="mb-6 overflow-x-auto scrollbar-hide flex items-center">
        <!-- 分类按钮部分，居中，并且可换行 -->
        <div class="flex space-x-2 py-2 flex-wrap justify-center w-full">
          <button
              v-for="cat in CATEGORIES"
              :key="cat"
              :class="[
                'px-4 py-2 rounded-full',
                activeCategory === cat ? 'bg-primary text-white' : 'bg-white dark:bg-dark-card shadow-sm hover:shadow-md transition-shadow'
              ]"
              @click="activeCategory = cat"
          >
            <span class="dark:text-dark-text">{{ cat }}</span>
          </button>
        </div>
      </div>

      <div class="mb-6 overflow-x-auto scrollbar-hide flex items-center justify-end">
        <!-- 数据更新时间显示部分，放在右侧并垂直居中 -->
        <div class="text-sm text-gray-500 dark:text-gray-300 ml-4">
          数据每分钟更新一次，刷新页面获取
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
import {
  topSearchForYoutube, topSearchForBaiDu,
  topSearchForGitHubAllStars,
  topSearchForDouYin,
  topSearchForBilibili,
  topSearchForWeiBo,
  topSearchForGitHubDaystars,
  topSearchForGitHubWeekstars,
  topSearchForGitHubMonthstars,
  topSearchForGitHubYearstars,
  topSearchForGitHubThreeYearStars,
  topSearchForGitHubFiveYearStars,
  topSearchForGitHubTenYearStars, topSearchForDouBan, topSearchForTencent, topSearchForTouTiao, topSearchForWangYi
} from '@/api/api';

const PLATFORM_CONFIG = [
  {fetch: topSearchForBaiDu},
  {fetch: topSearchForBilibili},
  {fetch: topSearchForDouYin},
  {fetch: topSearchForWeiBo},
  {fetch: topSearchForGitHubAllStars},
  {fetch: topSearchForGitHubDaystars},
  {fetch: topSearchForGitHubWeekstars},
  {fetch: topSearchForGitHubMonthstars},
  {fetch: topSearchForGitHubYearstars},
  {fetch: topSearchForGitHubThreeYearStars},
  {fetch: topSearchForGitHubFiveYearStars},
  {fetch: topSearchForGitHubTenYearStars},
  {fetch: topSearchForYoutube},
  {fetch: topSearchForDouBan},
  {fetch: topSearchForTencent},
  {fetch: topSearchForTouTiao},
  {fetch: topSearchForWangYi},
];

export default {
  components: {
    CommunityCard,
  },
  data() {
    return {
      activeCategory: '全部',
      CATEGORIES: [],
      platforms: [],
      lastUpdated: '',
    };
  },
  async mounted() {
    // 初始化请求数据，确保所有请求都成功
    const results = await Promise.all(
        PLATFORM_CONFIG.map(p => p.fetch().catch(err => ({error: err})))
    );

    // 处理请求结果
    this.platforms = results.map(result => {
      if (result.error || !result.data || !result.data.data) {
        return {
          title: '默认标题',
          logo: '',
          category: '未知',
          list: [],
          updateTime: '',
        };
      }

      const {dataCardCategory, dataCardName, dataCardLogo, dataInfo, dataUpdateTime} = result.data.data;
      return {
        title: dataCardName || '默认标题',
        logo: dataCardLogo || '',
        category: dataCardCategory || '未知',
        list: Array.isArray(dataInfo) ? dataInfo : [],
        updateTime: dataUpdateTime || '',
      };
    });

    // 动态设置 CATEGORIES（确保从返回的数据中提取所有不同的 category）
    const categories = this.platforms.map(p => p.category);
    this.CATEGORIES = ['全部', ...new Set(categories.filter(Boolean))]; // 去重并排除空值

    // 更新最后更新时间
    this.lastUpdated = new Date().toLocaleString();
  },
  computed: {
    filteredPlatforms() {
      if (!Array.isArray(this.platforms)) return [];
      return this.platforms.filter(p => this.activeCategory === '全部' || p.category === this.activeCategory);
    },
  },
};
</script>

<style scoped>
/* 你可以在这里添加任何样式 */
</style>
