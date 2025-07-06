<template>
  <div class="flex flex-col">
    <main class="container mx-auto px-4 py-6 flex-grow">
      <!-- 分类导航 - 同一行，按钮居中，更新时间右对齐 -->
      <div class="mb-6 overflow-x-auto scrollbar-hide flex items-center">
        <!-- 分类按钮部分，居中，并且可换行 -->
        <div class="flex space-x-2 py-2 flex-wrap justify-center w-full">
          <button
              v-for="cat in categroies"
              :key="cat.name"
              :class="[
                'px-4 py-2 rounded-full',
                activeCategory.name === cat.name ? 'bg-primary text-white' : 'bg-white dark:bg-dark-card shadow-sm hover:shadow-md transition-shadow'
              ]"
              @click="handleCategoryClick(cat)"
          >
            <span class="dark:text-dark-text">{{ cat.name }}</span>
          </button>
        </div>
      </div>

      <div class="mb-6 overflow-x-auto scrollbar-hide flex items-center justify-end">
        <!-- 数据更新时间显示部分，放在右侧并垂直居中 -->
        <div class="text-sm text-gray-500 dark:text-gray-300 ml-4">
          数据每分钟更新一次（GitHub数据每20-40分钟更新一次）
        </div>
      </div>

      <section class="mb-10">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <CommunityCard
              v-for="p in activeCategory.subCategories"
              v-show="p.isShow"
              :key="p.title"
              :title="p.title"
              :logo="p.logo"
              :updateTime="p.updateTime"
              :list="p.data"
              :loading="p.loading"
          />
        </div>
      </section>
    </main>
  </div>
</template>

<script>
import CommunityCard from '@/components/Card/CommunityCard.vue';

export default {
  components: {
    CommunityCard,
  },
  data() {
    return {
      categroies: this.$store.state.categroies,
      activeCategory: {},
    };
  },
  async mounted() {
    this.initializePlatforms();
  },
  methods: {
    initializePlatforms() {
      this.activeCategory = this.categroies[0];
      this.categroies.forEach(cat => {
        cat.subCategories.forEach(subCat => {
          subCat.loading = true;
          this.fetchData(subCat);
          this.activeCategory.subCategories.push(subCat)
        });
      })
    },

    // 访问接口拿数据
    fetchData(subCategory) {
      const fetchFunc = subCategory.api;
      if (!fetchFunc) return;
      fetchFunc()
          .then((res) => {
            const data = res?.data?.data || {};
            subCategory.updateTime = data.dataUpdateTime || '';
            subCategory.data = Array.isArray(data.dataInfo) ? data.dataInfo : [];
          })
          .catch((err) => {
            console.warn(`加载失败：${subCategory.name}`, err);
          })
          .finally(() => {
            subCategory.loading = false;
          });
    },

    // 分类按钮点击事件
    handleCategoryClick(cat) {
      this.activeCategory = cat;

      // let titles;
      // if (cat.name === '全部') {
      //   // 全部分类时，加载所有平台
      //   titles = this.platforms.map(p => p.title);
      // } else {
      //   titles = this.CATEGORIEMAPS[cat] || [];
      // }
      cat.subCategories.forEach(subCat => {
        subCat.loading = true;
        this.fetchData(subCat);
      });
    },
  },
  computed: {},
};
</script>

<style scoped>
/* 你可以在这里添加任何样式 */
</style>
