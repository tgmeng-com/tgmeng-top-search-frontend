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

      <div class="mb-6 overflow-x-auto scrollbar-hide flex items-center">
        <div class="flex space-x-2 py-2 flex-grow justify-center">
        </div>
        <!-- 数据更新时间显示部分，放在右侧并垂直居中 -->
        <div class="text-sm text-gray-500 dark:text-gray-300 ml-4">
          数据每10秒更新一次
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
import {topSearchForBaiDu, topSearchForGitHubAllStars} from '@/api/api';
import { topSearchForDouYin } from '@/api/api';
import { topSearchForBilibili } from '@/api/api';
import { topSearchForWeiBo } from '@/api/api';

/**
 * 平台配置,是一些已知的元信息，后面通过请求再加一些数据，给到一个新对象，然后用于页面展示
 */
const PLATFORM_CONFIG = [
  {
    fetch: topSearchForBaiDu,
  },
  {
    fetch: topSearchForBilibili,
  },
  {
    fetch: topSearchForDouYin,
  },
  {
    fetch: topSearchForWeiBo,
  },
  {
    fetch: topSearchForGitHubAllStars,
  }
];

export default {
  components: {
    CommunityCard,
  },
  data() {
    return {
      activeCategory: '全部',
      CATEGORIES: [], // 这里稍后会动态填充所有去重后的分类
      platforms: [],
      lastUpdated: '', // 添加字段记录最后更新时间
    };
  },
  methods: {},
  async mounted() {
    // 初始化请求数据，确保所有请求都成功
    const results = await Promise.all(
        PLATFORM_CONFIG.map((p) =>
            p.fetch().catch((err) => ({error: err})) // 捕获每个请求的错误
        )
    );

    // 处理请求结果
    this.platforms = PLATFORM_CONFIG.map((_, index) => {
      const result = results[index];
      console.log('结果:', result); // 调试输出

      // 如果结果无效，返回默认值
      if (result.error || !result.data || !result.data.data) {
        console.warn(`请求平台 ${PLATFORM_CONFIG[index].name} 失败`);
        return {
          title: '默认标题',
          logo: '',
          category: '未知', // 默认值
          list: [],
          updateTime: '',
        };
      }

      // 正常处理数据，确保 category 存在并提供默认值
      const category = result.data.data.dataCardCategory || '未知'; // 防止 category 为 null 或 undefined

      return {
        title: result.data.data.dataCardName || '默认标题', // 如果没有 title，使用默认值
        logo: result.data.data.dataCardLogo || '', // 如果没有 logo，使用空字符串
        category: category, // 确保 category 不为 null 或 undefined
        list: Array.isArray(result.data.data.dataInfo) ? result.data.data.dataInfo : [],
        updateTime: result.data.data.dataUpdateTime || '',
      };
    });

    // 动态设置 CATEGORIES（确保从返回的数据中提取所有不同的 category）
    const categories = this.platforms.map((p) => p.category);
    this.CATEGORIES = ['全部', ...new Set(categories.filter(Boolean))]; // 去重并排除空值

    // 更新最后更新时间
    this.lastUpdated = new Date().toLocaleString(); // 格式化时间为本地时间字符串
  },
  computed: {
    // 从 platforms 中筛选出属于当前分类，且有数据的卡片
    filteredPlatforms() {
      if (!Array.isArray(this.platforms)) return [];
      return this.platforms.filter((p) => {
        const match = this.activeCategory === '全部' || p.category === this.activeCategory;
        return match;
      });
    },
  },
};
</script>

<style scoped>
/* 你可以在这里添加任何样式 */
</style>
