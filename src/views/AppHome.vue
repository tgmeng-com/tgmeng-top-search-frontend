<template>
  <div class="flex flex-col">
    <main class="container mx-auto px-4 flex-grow">
      <!-- 分类导航 - 同一行，按钮居中，更新时间右对齐 -->
      <div class="mb-8 overflow-x-auto scrollbar-hide">
        <div class="inline-flex space-x-2 py-0.5 justify-center mx-auto whitespace-nowrap">
          <draggable
              v-model="categroies"
              tag="div"
              item-key="name"
              class="overflow-x-auto scrollbar-hide inline-flex justify-center mx-auto whitespace-nowrap"
              :animation="300"
              :handle="'.drag-handle'"
              @start="onDragFatherCatStart"
              @end="onDragFatherCatEnd"
              :disabled="!categroiesDraggable"
          >
            <template #item="{ element: cat }">
              <div class="mr-2 last:mr-0"> <!-- 保持按钮间距 -->
                <button
                    v-show="cat.isShow"
                    :data-umami-event="cat.name"
                    :data-umami-event-name="cat.name"
                    :key="cat.name"
                    :class="[
              'px-4 py-1.5 rounded-xl drag-handle',
              activeCategory.name === cat.name
                ? 'bg-primary text-white'
                : 'bg-gray-200 dark:bg-gray-700 hover:shadow-md transition-shadow'
            ]"
                    @click="handleCategoryClick(cat)"
                >
                  <span class="dark:text-dark-text">{{ cat.name }}</span>
                </button>
              </div>
            </template>
          </draggable>
        </div>
      </div>

      <div
          class="mb-4 overflow-x-auto scrollbar-hide flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <!-- 左侧：统计数据（移动端换行显示） -->
        <div class="text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap overflow-x-auto scrollbar-hide">
          <!-- 总访问量 -->
          <span class="text-xs px-2 py-1 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
            总访问量: <span class="font-medium">{{ umamiAllViews }}</span>
          </span>&nbsp;
          <!-- 总访问时长 -->
          <span class="text-xs px-2 py-1 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
            总时长: <span class="font-medium">{{ umamiAllTime }}</span>
          </span>&nbsp;
          <!-- 今日访问量 -->
          <span class="text-xs px-2 py-1 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
            今日访问量: <span class="font-medium">{{ umamiTodayViews }}</span>
          </span>&nbsp;
          <!-- 今日访问时长 -->
          <span class="text-xs px-2 py-1 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
            今日时长: <span class="font-medium">{{ umamiTodayTime }}</span>
          </span>&nbsp;
          <!-- 实时在线人数 -->
          <span class="text-xs px-2 py-1 rounded-md bg-green-200 dark:bg-green-900 text-green-900 dark:text-green-300">
            在线: <span class="font-medium">{{ umamiActive }}</span>
          </span>
        </div>
        <!-- 右侧：更新时间（移动端换行显示） -->
        <div
            class="text-xs px-2 py-1 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 whitespace-nowrap">
          数据每分钟更新一次（GitHub20-40分钟，网易云音乐10-15分钟，豆瓣2-10分钟）
        </div>
      </div>

      <!-- 用户样式自定义调整   -->
      <div
          class="mb-4 overflow-x-auto scrollbar-hide flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <!-- 左侧：统计数据（移动端换行显示） -->
        <div class="text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap overflow-x-auto scrollbar-hide">
          <!-- 用户自定义样式 -->
          <span class="text-xs px-2 py-1 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
            自定义样式
          </span>&nbsp;
          <!-- 自定义列 -->
          <span class="text-xs px-2 py-1 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
            列：<el-input-number class="input-cols" v-model="cardCols" :min="1" :max="6" size="small"
                                @change="changeCardCols"/>
          </span>&nbsp;
          <!-- 自定义高-->
          <span class="text-xs px-2 py-1 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
            高：<el-input-number class="input-height" v-model="cardHeight" :min="1" :max="500" size="small"
                                @change="changeCardHeight"/>
          </span>&nbsp;
          <!-- 自定义标题字体大小-->
          <span class="text-xs px-2 py-1 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
            标题：<el-input-number class="input-title" v-model="cardTitleFontSize" :min="0.1" :max="2" size="small"
                                  :precision="3" :step="0.025" @change="changeCardTitleFontSize"/>
          </span>&nbsp;
          <!-- 自定义分类是否可以拖动-->
          <span class="text-xs px-2 py-1 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
            分类可拖动：<el-switch
              v-model="categroiesDraggable"
              size="small"
              @change="changeCategroiesDraggable"/>
          </span>&nbsp;
          <!-- 自定义卡片是否可以拖动-->
          <span class="text-xs px-2 py-1 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
            卡片可拖动：<el-switch
              v-model="cardDraggable"
              size="small"
              @change="changeCardDraggable"/>
          </span>&nbsp;
          <!-- 自定义卡片标题是否完整显示-->
          <span class="text-xs px-2 py-1 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
            标题完整：<el-switch
              v-model="cardHotTitleFull"
              size="small"
              @change="changeCardHotTitleFull"/>
          </span>&nbsp;
          <!-- 自定义卡片热度值是否显示-->
          <span class="text-xs px-2 py-1 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
            热度值显示：<el-switch
              v-model="cardHotScoreShow"
              size="small"
              @change="changeCardHotScoreShow"/>
          </span>&nbsp;
          <!-- 自定义默认分类-->
          <span class="text-xs px-2 py-1 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
            默认分类：<el-select v-model="defaultCategoryId" placeholder="Select" style="width: 3.5rem" size="small" @change="changeDefaultActiveCategroyId">
                      <el-option
                          v-for="item in categroies"
                          :key="item.id"
                          :label="item.name"
                          :value="item.id"
                      />
                    </el-select>
          </span>&nbsp;
        </div>
        <!-- 右侧：更新时间（移动端换行显示） -->
        <div>
        </div>
      </div>

      <section class="mb-10 mt-8">
        <draggable
            v-model="activeCategory.subCategories"
            tag="div"
            item-key="title"
            class="grid gap-6 cols-1 md:grid-cols-2"
            :style="gridStyle"
            :animation="300"
            :handle="'.drag-handle'"
            @start="onDragStart"
            @end="onDragEnd"
            :disabled="!cardDraggable"
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
                  @updateCategroiesCache="updateCategroiesCache"
                  @fetchData="()=>fetchData(p)"
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
import {
  LOCAL_STORAGE_KEYS,
  getLocalStorage,
  setLocalStorage,
} from "@/utils/localStorageUtils";
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
      preDragFatherCatSortList: [], // 大分类拖动前的 sort 列表
      refreshTimer: null, // 定时器 ID
      windowWidth: window.innerWidth, // 屏幕大小
    };
  },
  async mounted() {
    this.initializePlatforms();
    // 定时刷新数据
    this.refreshTimer = setInterval(() => {
      this.refreshData();
    }, 120 * 1000); // 每2分钟刷新一次，然后里面函数里判断数据是否是1分钟之前的

    window.addEventListener('resize', this.handleResize);
  },
  // 离开页面或者切换路由的时候，关闭定时器，避免造成内存泄露
  beforeUnmount() {
    if (this.refreshTimer) {
      clearInterval(this.refreshTimer);
      this.refreshTimer = null;
    }
    window.removeEventListener('resize', this.handleResize);
  },
  methods: {
    handleResize() {
      this.windowWidth = window.innerWidth; // 更新 windowWidth
    },
    initializePlatforms() {
      this.initUmami();
      //用缓存里的isShow、sort、isStar替换一下全部数据里的
      const cacheCategroies = getLocalStorage(LOCAL_STORAGE_KEYS.CATEGORIES)
      if (cacheCategroies) {
        cacheCategroies.forEach(cacheCat => {
          // 找到真实分类，也就是缓存中的分类名称如果在真实分类中存在（没有被站长移除的情况下，再去替换他和他里面各个平台的数据）
          const realCat = this.categroies.find(cat => cat.name === cacheCat.name);
          if (!realCat) return;
          // 先替换各个大分类的排序顺序
          realCat.sort = cacheCat.sort
          this.categroies.sort((a, b) => a.sort - b.sort);
          // 再替换各个子平台的 isShow、sort、isStar 状态
          realCat.subCategories.forEach(subCat => {
            const cacheSub = cacheCat.subCategories.find(c => c.title === subCat.title);
            if (cacheSub) {
              subCat.isShow = cacheSub.isShow;
              subCat.sort = cacheSub.sort;
              subCat.isStar = cacheSub.isStar;
            }
          });
          this.updateCategroiesCache()
        });
      }
      // 用缓存里的自定义样式替换一下全部数据里的自定义样式
      const cacheCardCols = getLocalStorage(LOCAL_STORAGE_KEYS.CARD_COLS)
      const cacheCardHeight = getLocalStorage(LOCAL_STORAGE_KEYS.CARD_HEIGHT)
      const cacheCcardTitleFontSize = getLocalStorage(LOCAL_STORAGE_KEYS.CARD_TITLE_FONT_SIZE)
      const cacheCardDraggable = getLocalStorage(LOCAL_STORAGE_KEYS.CARD_DRAGGABLE)
      const cacheCategroiesDraggable = getLocalStorage(LOCAL_STORAGE_KEYS.CATEGORIES_DRAGGABLE)

      const cacheCardHotScoreShow = getLocalStorage(LOCAL_STORAGE_KEYS.CARD_HOT_SCORE_SHOW)
      const cacheCardHotTitleFull = getLocalStorage(LOCAL_STORAGE_KEYS.CARD_HOT_TITLE_FULL)
      const cacheDefaultCategoryId = getLocalStorage(LOCAL_STORAGE_KEYS.DEFAULT_CATEGORY_ID)

      this.cardCols = cacheCardCols ?? this.cardCols;
      this.cardHeight = cacheCardHeight ?? this.cardHeight;
      this.cardTitleFontSize = cacheCcardTitleFontSize ?? this.cardTitleFontSize;
      this.cardDraggable = cacheCardDraggable ?? this.cardDraggable;
      this.categroiesDraggable = cacheCategroiesDraggable ?? this.categroiesDraggable;
      this.cardHotScoreShow = cacheCardHotScoreShow ?? this.cardHotScoreShow;
      this.cardHotTitleFull = cacheCardHotTitleFull ?? this.cardHotTitleFull;
      this.defaultCategoryId = cacheDefaultCategoryId ?? this.defaultCategoryId;
      // 把其他分类下的数据放到全部分类下
      this.initAllCategroies();
      // 如果没有设置默认值，那就用第一个作为默认分类
      this.activeCategory = this.categroies.find(cat => cat.id === this.defaultCategoryId) || this.categroies[0];
      // 首次进入页面，检查路由参数是否合法
      this.handleRouteCategory();
    },

    // 访问接口拿数据
    fetchData(subCategory) {
      const fetchFunc = subCategory.api;
      if (!fetchFunc) return;
      subCategory.loading = true;
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

    // 处理路由 category 参数
    handleRouteCategory() {
      const categoryRouterName = this.$route.params.category;
      const matchedCat = this.categroies.find(c => c.routerName === categoryRouterName);

      if (matchedCat && matchedCat.id !== this.activeCategory.id) {
        // 路由存在且不是当前激活分类 → 点击分类
        this.handleCategoryClick(matchedCat, { skipRoutePush: true });
      } else if (!matchedCat) {
        // 路由不存在或非法 → 回到根路径，显示默认分类
        if (this.$route.path !== '/') {
          // 仅当路径不是 / 时才替换 URL
          this.$router.replace({ path: '/' });
        }
        this.handleCategoryClick(this.activeCategory, { skipRoutePush: true });
      }
    },

    // 分类按钮点击事件
    handleCategoryClick(cat, options = {}) {
      // skipRoutePush，防止重复推路由
      if (!options.skipRoutePush) {
        this.$router.push({ name: 'Category', params: { category: cat.routerName } });
      }
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
          this.fetchData(subCat);
        }
      });
    },

    // 刷新当前分类下的数据
    refreshData() {
      this.activeCategory.subCategories.forEach(subCat => {
        // TODO 因为有人反馈，看着看着自动刷新了，所以这里先不写这个逻辑
        // // 不同平台的时间不同，例如后台github数据是每20-40分钟刷新，那么前端就是判断github数据时间和当前时间相差40分钟的时候，再去主动更新
        // let singleUpdateTime = 60 * 1000;
        // switch (true) {
        //   case subCat.title.includes('Star总榜') || subCat.title.includes('新仓库Star'):
        //     singleUpdateTime = 40 * 60 * 1000; // 40分钟
        //     break;
        //   case subCat.title.includes('网易云'):
        //     singleUpdateTime = 15 * 60 * 1000; // 15分钟
        //     break;
        //   default:
        //     singleUpdateTime = 60 * 1000; // 默认1分钟
        // }
        // // 检查是否超过60秒没有更新
        // const updateTimestamp = new Date(subCat.updateTime.replace(/-/g, '/')).getTime();
        // if (subCat.isShow && new Date() - new Date(updateTimestamp) > singleUpdateTime) {
        //   this.fetchData(subCat);
        // }
        // 如果当前某个平台下数据为空，也主动刷新一下
        if (subCat.isShow && subCat.data.length === 0) {
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
    // 拖动大分类开始时，保存当前 sort 列表
    onDragFatherCatStart() {
      this.preDragFatherCatSortList = this.categroies.map(item => item.sort);
    },
    //保存拖动卡片后的顺序
    onDragEnd() {
      // 拖动完成后，更新每个卡片的 sort 属性
      const arr = this.activeCategory.subCategories;
      arr.forEach((item, index) => {
        item.sort = this.preDragSortList[index];
      });
      this.updateCategroiesCache();
      window.umami.track('拖拽排序')
    },
    //保存大分类拖动卡片后的顺序
    onDragFatherCatEnd() {
      // 拖动完成后，更新每个卡片的 sort 属性
      const arr = this.categroies;
      arr.forEach((item, index) => {
        item.sort = this.preDragFatherCatSortList[index];
      });
      this.updateCategroiesCache();
      window.umami.track('拖拽排序')
    },
    updateCategroiesCache() {
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
      setLocalStorage(LOCAL_STORAGE_KEYS.CATEGORIES, clonedForStorage);
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
    },
    // 自定义调整卡片列数
    changeCardCols() {
      setLocalStorage(LOCAL_STORAGE_KEYS.CARD_COLS, this.cardCols);
      window.umami.track('自定义卡片列数')
    },
    // 自定义调整卡片高度
    changeCardHeight() {
      setLocalStorage(LOCAL_STORAGE_KEYS.CARD_HEIGHT, this.cardHeight);
      window.umami.track('自定义卡片高度')
    },
    // 自定义标题字体大小
    changeCardTitleFontSize() {
      setLocalStorage(LOCAL_STORAGE_KEYS.CARD_TITLE_FONT_SIZE, this.cardTitleFontSize);
      window.umami.track('自定义标题字体大小')
    },
    // 自定义调整卡片是否可以拖动
    changeCardDraggable() {
      setLocalStorage(LOCAL_STORAGE_KEYS.CARD_DRAGGABLE, this.cardDraggable);
      window.umami.track('自定义卡片是否可以拖动')
    },
    // 自定义调整分类是否可以拖动
    changeCategroiesDraggable() {
      setLocalStorage(LOCAL_STORAGE_KEYS.CATEGORIES_DRAGGABLE, this.categroiesDraggable);
      window.umami.track('自定义分类是否可以拖动')
    },
    // 自定义调整卡片标题是否完整显示
    changeCardHotTitleFull() {
      setLocalStorage(LOCAL_STORAGE_KEYS.CARD_HOT_TITLE_FULL, this.cardHotTitleFull);
      window.umami.track('自定义卡片标题是否完整显示')
    },
    // 自定义调整卡片热度值是否显示
    changeCardHotScoreShow() {
      setLocalStorage(LOCAL_STORAGE_KEYS.CARD_HOT_SCORE_SHOW, this.cardHotScoreShow);
      window.umami.track('自定义卡片热度值是否显示')
    },
    // 自定义调整默认选中的分类id
    changeDefaultActiveCategroyId() {
      setLocalStorage(LOCAL_STORAGE_KEYS.DEFAULT_CATEGORY_ID, this.defaultCategoryId);
      window.umami.track('自定义默认选中的分类id')
    },
  },
  computed: {
    isMobile() {
      return this.windowWidth < 768; // 手机屏幕宽度
    },
    isMediumScreen() {
      return this.windowWidth >= 768 && this.windowWidth < 1024; // 中等屏幕宽度
    },
    gridStyle() {
      return {
        gridTemplateColumns: `repeat(${this.isMobile ? 1 : this.isMediumScreen ? 2 : this.cardCols}, minmax(0, 1fr))`
      };
    },
    cardHeight: {
      get() {
        return this.$store.state.cardHeight;
      },
      set(value) {
        this.$store.commit('setCardHeight', value);
      }
    },
    cardCols: {
      get() {
        return this.$store.state.cardCols;
      },
      set(value) {
        this.$store.commit('setCardCols', value);
      }
    },
    cardTitleFontSize: {
      get() {
        return this.$store.state.cardTitleFontSize;
      },
      set(value) {
        this.$store.commit('setCardTitleFontSize', value);
      }
    },
    cardDraggable: {
      get() {
        return this.$store.state.cardDraggable;
      },
      set(value) {
        this.$store.commit('setCardDraggable', value);
      }
    },
    categroiesDraggable: {
      get() {
        return this.$store.state.categroiesDraggable;
      },
      set(value) {
        this.$store.commit('setCategroiesDraggable', value);
      }
    },
    cardHotScoreShow: {
      get() {
        return this.$store.state.cardHotScoreShow;
      },
      set(value) {
        this.$store.commit('setCardHotScoreShow', value);
      }
    },
    cardHotTitleFull: {
      get() {
        return this.$store.state.cardHotTitleFull;
      },
      set(value) {
        this.$store.commit('setCardHotTitleFull', value);
      }
    },
    defaultCategoryId: {
      get() {
        return this.$store.state.defaultCategoryId;
      },
      set(value) {
        this.$store.commit('setDefaultCategoryId', value);
      }
    },
  },
  watch: {
    /// 监听路由变化，切换分类
    '$route.params.category'() {
      this.handleRouteCategory();
    }
  },
};
</script>

<style scoped>
/* 自定义样式的数字加减输入框 */
:deep(.el-input__wrapper) {
  background-color: transparent !important;
  box-shadow: none !important; /* 去掉输入框的阴影 */
  border: 0 solid rgba(255, 255, 255, 0.2); /* 可选：轻微边框以区分 */
}

/* 自定义样式的数字加减减号框 */
:deep(.el-input-number__decrease) {
  background-color: transparent !important;
  box-shadow: none !important; /* 去掉输入框的阴影 */
  border: 0 solid rgba(255, 255, 255, 0); /* 可选：轻微边框以区分 */
  color: inherit; /* 跟随父元素颜色 */
}

/* 自定义样式的数字加减加号框 */
:deep(.el-input-number__increase) {
  background-color: transparent !important;
  box-shadow: none !important; /* 去掉输入框的阴影 */
  border: 0 solid rgba(255, 255, 255, 0); /* 可选：轻微边框以区分 */
  color: inherit; /* 跟随父元素颜色 */
}

/* 输入文字颜色（根据主题自调） */
:deep(.el-input__inner) {
  color: inherit; /* 跟随父元素颜色 */
}

:deep(.input-cols.el-input-number--small) {
  width: 4.3rem !important;
}

:deep(.input-height.el-input-number--small) {
  width: 5.1rem !important;
}

:deep(.input-title.el-input-number--small) {
  width: 5.75rem !important;
}

:deep(.el-select__wrapper.el-tooltip__trigger.el-tooltip__trigger) {
  min-height: 1rem !important;
  width: 4rem !important;
  font-size: 0.75rem !important;
  box-shadow: none !important;
}

</style>
