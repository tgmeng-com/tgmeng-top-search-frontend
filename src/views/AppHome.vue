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
              @click="handleCategoryClick(cat)"
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
              :logo="getLogoByName(p.title)"
              :updateTime="p.updateTime"
              :list="p.list"
              :loading="p.loading"
          />
        </div>
      </section>
    </main>
  </div>
</template>

<script>
import CommunityCard from '@/components/Card/CommunityCard.vue';
import { getLogoByName } from '@/utils/logoMap.js';
import {
  topSearchForYoutube,
  topSearchForBaiDu,
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
  topSearchForGitHubTenYearStars,
  topSearchForDouBan,
  topSearchForTencent,
  topSearchForTouTiao,
  topSearchForWangYi,
  topSearchForWangYiYun, topSearchForBaiDuTieBa, topSearchForShaoShuPai
} from '@/api/api';

const API_MAP = {
  '百度': topSearchForBaiDu,
  'B站': topSearchForBilibili,
  '抖音': topSearchForDouYin,
  '微博': topSearchForWeiBo,
  'Star总榜': topSearchForGitHubAllStars,
  '近一日新仓库Star榜': topSearchForGitHubDaystars,
  '近一周新仓库Star榜': topSearchForGitHubWeekstars,
  '近一月新仓库Star榜': topSearchForGitHubMonthstars,
  '近一年新仓库Star榜': topSearchForGitHubYearstars,
  '近三年新仓库Star榜': topSearchForGitHubThreeYearStars,
  '近五年新仓库Star榜': topSearchForGitHubFiveYearStars,
  '近十年新仓库Star榜': topSearchForGitHubTenYearStars,
  'Youtube': topSearchForYoutube,
  '豆瓣': topSearchForDouBan,
  '腾讯': topSearchForTencent,
  '头条': topSearchForTouTiao,
  '网易': topSearchForWangYi,
  '网易云': topSearchForWangYiYun,
  '百度贴吧': topSearchForBaiDuTieBa,
  '少数派': topSearchForShaoShuPai,
};

export default {
  components: {
    CommunityCard,
  },
  data() {
    return {
      activeCategory: '全部',
      CATEGORIES: ['全部', '新闻', '社交', '媒体', 'GitHub'],
      CATEGORIEMAPS: {
        "新闻": ['腾讯', '头条', '网易', '百度'],
        "社交": ['微博', '百度贴吧', '豆瓣', '少数派'],
        "媒体": ['B站', '抖音', 'Youtube', '网易云'],
        "GitHub": ['Star总榜', '近一日新仓库Star榜', '近一周新仓库Star榜',
          '近一月新仓库Star榜', '近一年新仓库Star榜', '近三年新仓库Star榜',
          '近五年新仓库Star榜', '近十年新仓库Star榜']
      },
      platforms: [],
      lastUpdated: '',
    };
  },
  async mounted() {
    this.initializePlatforms();
  },
  methods: {
    getLogoByName,
    initializePlatforms() {
      Object.entries(this.CATEGORIEMAPS).forEach(([category, titles]) => {
        titles.forEach((title) => {
          this.platforms.push({
            title,
            category,
            logo: '',
            list: [],
            updateTime: '',
            loading: true,
          });
          this.fetchData(title);
        });
      });
    },
    fetchData(title) {
      const fetchFunc = API_MAP[title];
      if (!fetchFunc) return;

      fetchFunc()
          .then((res) => {
            const data = res?.data?.data || {};
            const platform = this.platforms.find((p) => p.title === title);
            if (platform) {
              platform.logo = data.dataCardLogo || '';
              platform.updateTime = data.dataUpdateTime || '';
              platform.list = Array.isArray(data.dataInfo) ? data.dataInfo : [];
            }
          })
          .catch((err) => {
            console.warn(`加载失败：${title}`, err);
          })
          .finally(() => {
            const platform = this.platforms.find((p) => p.title === title);
            if (platform) platform.loading = false;
          });
    },
    handleCategoryClick(cat) {
      this.activeCategory = cat;

      if (cat === '全部') return;
      const titles = this.CATEGORIEMAPS[cat] || [];
      titles.forEach((title) => {
        const platform = this.platforms.find((p) => p.title === title);
        platform.loading = true;
        this.fetchData(title);
      });
    },
  },
  computed: {
    filteredPlatforms() {
      if (this.activeCategory === '全部') return this.platforms;
      return this.platforms.filter(p => p.category === this.activeCategory);
    },
  },
};
</script>

<style scoped>
/* 你可以在这里添加任何样式 */
</style>
