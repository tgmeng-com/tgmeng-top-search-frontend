<template>
  <div class="flex flex-col">
    <main class="container mx-auto px-4 flex-grow">
      <!-- 分类导航 - 同一行，按钮居中，更新时间右对齐 -->
      <div class="mb-6 overflow-x-auto scrollbar-hide">
        <div class="inline-flex space-x-2 py-2 justify-center mx-auto whitespace-nowrap">
          <button
              v-show="cat.isShow"
              v-for="cat in categroies"
              :data-umami-event="cat.name"
              :data-umami-event-name="cat.name"
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

      <div
          class="mb-6 overflow-x-auto scrollbar-hide flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <!-- 左侧：统计数据（移动端换行显示） -->
        <div class="text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap overflow-x-auto scrollbar-hide">
          <!-- 总访问量 -->
          <span class="text-xs px-2 py-1 rounded-md bg-gray-300 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
            总访问量: <span class="font-medium">{{ umamiAllViews }}</span>
          </span>&nbsp;
          <!-- 总访问时长 -->
          <span class="text-xs px-2 py-1 rounded-md bg-gray-300 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
            总时长: <span class="font-medium">{{ umamiAllTime }}</span>
          </span>&nbsp;
          <!-- 今日访问量 -->
          <span class="text-xs px-2 py-1 rounded-md bg-gray-300 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
            今日访问量: <span class="font-medium">{{ umamiTodayViews }}</span>
          </span>&nbsp;
          <!-- 今日访问时长 -->
          <span class="text-xs px-2 py-1 rounded-md bg-gray-300 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
            今日时长: <span class="font-medium">{{ umamiTodayTime }}</span>
          </span>&nbsp;
          <!-- 实时在线人数 -->
          <span class="text-xs px-2 py-1 rounded-md bg-green-300 dark:bg-green-900 text-green-900 dark:text-green-300">
            在线: <span class="font-medium">{{ umamiActive }}</span>
          </span>
        </div>
        <!-- 右侧：更新时间（移动端换行显示） -->
        <div
            class="text-xs px-2 py-1 rounded-md bg-gray-300 dark:bg-gray-700 text-gray-600 dark:text-gray-300 whitespace-nowrap">
          数据每分钟更新一次（GitHub20-40分钟，网易云音乐10-15分钟）
        </div>
      </div>

      <section class="mb-10">
        <draggable
            v-model="activeCategory.subCategories"
            tag="div"
            item-key="title"
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            :animation="300"
            :handle="'.drag-handle'"
            @start="onDragStart"
            @end="onDragEnd"
        >
          <template #item="{ element: p }">
            <div v-show="p.isShow">
              <CommunityCard
                  :key="p.title"
                  :title="p.title"
                  :logo="p.logo"
                  :updateTime="p.updateTime"
                  :list="p.data"
                  :loading="p.loading"
                  v-model:isStar="p.isStar"
                  @updateCache="updateCache"
              />
            </div>
          </template>
        </draggable>
      </section>
    </main>
  </div>
</template>

<script>
import CommunityCard from '@/components/Card/CommunityCard.vue';
import {getCategroiesFromLocalStorage, updateCategroiesInLocalStorage} from "@/utils/localStorageUtils";
import {umamiActive, umamiStatsToday, umamiStatsAll} from "@/api/apiForUmami";
import {formatSecondsToHMS} from "@/utils/timeUtils";
import draggable from 'vuedraggable'

export default {
  components: {
    CommunityCard,
    draggable
  },
  data() {
    return {
      categroies: this.$store.state.categroies,
      activeCategory: {},
      umamiActive: this.$store.state.umamiActive,
      umamiTodayViews: this.$store.state.umamiTodayViews,
      umamiTodayTime: this.$store.state.umamiTodayTime,
      umamiAllViews: this.$store.state.umamiAllViews,
      umamiAllTime: this.$store.state.umamiAllTime,
      preDragSortList: [], // 拖动前的 sort 列表
      refreshTimer: null, // 定时器 ID
    };
  },
  async mounted() {
    this.initializePlatforms();
    // 定时刷新数据
    this.refreshTimer = setInterval(() => {
      this.refreshData();
    }, 60 * 1000); // 每60秒钟刷新一次，然后里面函数里判断数据是否是1分钟之前的
  },
  // 离开页面或者切换路由的时候，关闭定时器，避免造成内存泄露
  beforeUnmount() {
    if (this.refreshTimer) {
      clearInterval(this.refreshTimer);
      this.refreshTimer = null;
    }
  },
  methods: {
    initializePlatforms() {
      this.initUmami();
      const cacheCategroies = getCategroiesFromLocalStorage('categroies');
      //用缓存里的isShow替换一下全部数据里的
      if (cacheCategroies) {
        cacheCategroies.forEach(cacheCat => {
          // 找到真实分类
          const realCat = this.categroies.find(cat => cat.name === cacheCat.name);
          if (!realCat) return;
          // 1️⃣ 替换 isShow 状态
          realCat.subCategories.forEach(subCat => {
            const cacheSub = cacheCat.subCategories.find(c => c.title === subCat.title);
            if (cacheSub) {
              subCat.isShow = cacheSub.isShow;
              subCat.sort = cacheSub.sort;
              subCat.isStar = cacheSub.isStar;
            }
          });
          this.updateCache()
        });
      }
      this.initAllCategroies();
      // 默认第二个分类为首页
      this.activeCategory = this.categroies[1];
      this.handleCategoryClick(this.activeCategory)
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
      // 把全部数据下收藏的卡片方法收藏分类下
      if (cat.name === '收藏') {
        // 先清空收藏分类下的卡片
        this.activeCategory.subCategories.splice(0)
        this.categroies[0].subCategories.forEach(subCat => {
          if (subCat.isStar) {
            this.activeCategory.subCategories.push(subCat)
          }
        })
      }
      // 对数据进行排序，因为从缓存中拿到的用户的sort数据，我们需要根据这个sort展示
      this.sortedSubCategories();
      cat.subCategories.forEach(subCat => {
        //只加载show的数据
        if (subCat.isShow) {
          subCat.loading = true;
          this.fetchData(subCat);
        }
      });
    },

    // 刷新当前分类下的数据
    refreshData() {
      this.activeCategory.subCategories.forEach(subCat => {
        // 不同平台的时间不同，例如后台github数据是每20-40分钟刷新，那么前端就是判断github数据时间和当前时间相差40分钟的时候，再去主动更新
        let singleUpdateTime = 60 * 1000;
        switch (true) {
          case subCat.title.includes('Star总榜') || subCat.title.includes('新仓库Star'):
            singleUpdateTime = 40 * 60 * 1000; // 40分钟
            break;
          case subCat.title.includes('网易云'):
            singleUpdateTime = 15 * 60 * 1000; // 15分钟
            break;
          default:
            singleUpdateTime = 60 * 1000; // 默认1分钟
        }
        // 检查是否超过60秒没有更新
        const updateTimestamp = new Date(subCat.updateTime.replace(/-/g, '/')).getTime();
        if (subCat.isShow && new Date() - new Date(updateTimestamp) > singleUpdateTime) {
          subCat.loading = true;
          this.fetchData(subCat);
        }
        // 如果当前某个平台下数据为空，也主动刷新一下
        if (subCat.isShow && subCat.data.length === 0) {
          subCat.loading = true;
          this.fetchData(subCat);
        }
      })
    },

    // 初始化全部分类，就是把其他分类下的东西放到全部分类下，方便展示
    initAllCategroies() {
      this.activeCategory = this.categroies[0];
      this.activeCategory.subCategories = []
      this.categroies.forEach(cat => {
        cat.subCategories.forEach(subCat => {
          this.activeCategory.subCategories.push(subCat)
        });
      })
    },
    // 拖动开始时，保存当前 sort 列表
    onDragStart() {
      this.preDragSortList = this.activeCategory.subCategories.map(item => item.sort);
    },
    //保存拖动卡片后的顺序
    onDragEnd() {
      // 拖动完成后，更新每个卡片的 sort 属性
      const arr = this.activeCategory.subCategories;
      arr.forEach((item, index) => {
        item.sort = this.preDragSortList[index];
      });
      this.updateCache();
      window.umami.track('拖拽排序')
    },
    updateCache() {
      // 放到缓存里
      const clonedForStorage = JSON.parse(JSON.stringify(this.categroies));
      //只保存title和isShow、sort、isStar的数据，其余数据全部设置为null，减少缓存
      clonedForStorage.forEach(categroy => {
        categroy.subCategories.forEach(subCategroy => {
          subCategroy.data = null
          subCategroy.api = null
          subCategroy.logo = null
          subCategroy.updateTime = ''
          subCategroy.loading = true
        })
      });
      updateCategroiesInLocalStorage(clonedForStorage);
    },
    sortedSubCategories() {
      this.activeCategory.subCategories.sort((a, b) => a.sort - b.sort);
    },
    initUmami() {
      umamiActive()
          .then((res) => {
            this.umamiActive = res?.data?.visitors || 1;
          })
          .catch((err) => {
            console.warn(`umami实时在线人数加载失败`, err);
          })
          .finally(() => {
          });
      umamiStatsToday()
          .then((res) => {
            this.umamiTodayViews = res?.data?.pageviews?.value || '加载失败';
            this.umamiTodayTime = formatSecondsToHMS(res?.data?.totaltime?.value || '加载失败');
          })
          .catch((err) => {
            console.warn(`umami近24小时统计数据加载失败`, err);
          })
          .finally(() => {
          });
      umamiStatsAll()
          .then((res) => {
            this.umamiAllViews = res?.data?.pageviews?.value || '加载失败';
            this.umamiAllTime = formatSecondsToHMS(res?.data?.totaltime?.value || '加载失败');
          })
          .catch((err) => {
            console.warn(`umami历史统计数据加载失败`, err);
          })
          .finally(() => {
          });
    }
  },
  computed: {},
};
</script>

<style scoped>
/* 你可以在这里添加任何样式 */
</style>
