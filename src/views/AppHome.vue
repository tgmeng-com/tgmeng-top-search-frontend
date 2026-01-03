<template>
  <div class="flex flex-col" :style="topSettingHeight">
    <TopMessage v-if="topCarouselFontShow"/>
    <FishModeChoose/>
    <SearchModal/>
    <HotPointHistoryComponent/>
    <!--    <AdRentCards :ads="homeHeaderAdsCard"/>-->
    <WorkMaskExcel v-if="workMaskExcelShow" @handleCategoryClick="handleCategoryClick"/>
    <WorkMaskVsCode v-if="workMaskVsCodeShow" @handleCategoryClick="handleCategoryClick"/>

    <main class="flex-grow main-content">
      <!-- 分类导航 -->
      <CategoryNavigation
          @categoryClick="handleCategoryClick"
          :class="{ 'mobile-bottom-nav': isMobile }"
      />

      <!-- 统计数据 -->
      <PageViewShow :show="pageViewsShow" />
      <!-- 设置面板 -->
      <SettingsPanel :categories="categroies"/>

      <WordCloud v-if="wordCloudShow"/>

      <!-- AI模式 -->
      <div v-if="isAIMode">
        <HotPointComponentAI/>
      </div>
      <!-- 普通模式 -->
      <div v-else>
        <div v-if="activeCategory.routerName==='sudden'">
          <HotPointComponentSudden/>
        </div>
        <div v-else>
          <HotPointComponentNormal
              :categoryScrollPositions="categoryScrollPositions"
              @updateScrollPosition="updateScrollPosition"
          />
        </div>
      </div>

      <!-- 模式切换按钮 -->
      <ModeSwitcher/>

      <!--     主内容和评论区之间 展示广告 -->
      <GoogleAdsense v-if="$store.state.adsEnabled"
                     ad-client="ca-pub-3286880109560525"
                     ad-slot="9081541454"
                     ad-format="auto"
                     :full-width-responsive="true"/>
      <WalineComment/>

    </main>
  </div>
</template>

<script>
import { getLocalStorage, LOCAL_STORAGE_KEYS, setLocalStorage } from "@/utils/localStorageUtils";
import WordCloud from '@/components/Layout/WordCloud.vue';
import WorkMaskExcel from "@/components/fakeUI/WorkMaskExcel.vue";
import TopMessage from "@/components/Layout/TopMessage.vue";
import WalineComment from "@/components/Layout/WalineComment.vue";
import GoogleAdsense from "@/components/Adsense/GoogleAdsense.vue";
import WorkMaskVsCode from "@/components/fakeUI/WorkMaskVsCode.vue";
import FishModeChoose from "@/components/fakeUI/FishModeChoose.vue";
import HotPointHistoryComponent from "@/components/Layout/HotPointHistoryComponent.vue";
import HotPointComponentSudden from "@/components/Layout/HotPointComponentSudden.vue";
import HotPointComponentNormal from "@/components/Layout/HotPointComponentNormal.vue";
import PageViewShow from "@/components/Layout/PageViewShow.vue";
import SettingsPanel from "@/components/Layout/SettingsPanel.vue";
import CategoryNavigation from "@/components/Layout/CategoryNavigation.vue";
import HotPointComponentAI from "@/components/Layout/HotPointComponentAI.vue";
import ModeSwitcher from "@/components/Layout/ModeSwitcher.vue";
import SearchModal from "@/components/Layout/SearchModal.vue";
// import AdRentCards from "@/components/Adsense/AdRentCards.vue";

export default {
  components: {
    SearchModal,
    ModeSwitcher,
    HotPointComponentAI,
    CategoryNavigation,
    HotPointComponentSudden,
    HotPointComponentNormal,
    HotPointHistoryComponent,
    WorkMaskVsCode,
    // AdRentCards,
    GoogleAdsense,
    WalineComment,
    TopMessage,
    WorkMaskExcel,
    WordCloud,
    FishModeChoose,
    PageViewShow,
    SettingsPanel,
  },
  data() {
    return {
      refreshTimer: null, // 定时器 ID
      windowWidth: window.innerWidth, // 屏幕大小
      homeHeaderAdsCard: this.$store.state.homeHeaderAdsCard,
      categoryScrollPositions: {}, // 存储每个分类横向的滚动位置
    };
  },
  async mounted() {
    this.initializePlatforms();
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
    // 更新滚动位置（从子组件接收）
    updateScrollPosition(categoryId, scrollLeft) {
      this.categoryScrollPositions[categoryId] = scrollLeft;
    },

    handleResize() {
      this.windowWidth = window.innerWidth; // 更新 windowWidth
    },

    initializePlatforms() {
      // 用缓存里的isShow、sort、isStar替换一下全部数据里的
      const cacheCategroies = getLocalStorage(LOCAL_STORAGE_KEYS.CATEGORIES);
      if (cacheCategroies) {
        cacheCategroies.forEach(cacheCat => {
          // 找到真实分类，也就是缓存中的分类名称如果在真实分类中存在（没有被站长移除的情况下，再去替换他和他里面各个平台的数据）
          const realCat = this.categroies.find(cat => cat.name === cacheCat.name);
          if (!realCat) return;
          // 先替换各个大分类的排序顺序
          realCat.sort = cacheCat.sort;
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
          this.updateCategroiesCache();
        });
      }
      // 把其他分类下的数据放到全部分类下
      this.initAllCategroies();
      // 如果没有设置默认值，那就用新闻作为默认分类
      this.activeCategory = this.categroies.find(cat => cat.id === this.defaultCategoryId) || this.categroies[this.defaultCategoryId];
      // 首次进入页面，检查路由参数是否合法
      this.handleRouteCategory("init");
    },

    // 处理路由 category 参数
    handleRouteCategory(from) {
      const categoryRouterName = this.$route.params.category;
      const matchedCat = this.categroies.find(c => c.routerName === categoryRouterName);

      if (matchedCat) {
        // 路由存在且是初次加载而不是click路由监听
        if (from === "init") {
          this.handleCategoryClick(matchedCat, { skipRoutePush: true });
        }
      } else if (!matchedCat) {
        // 路由不存在或非法 → 回到根路径，显示默认分类
        if (this.$route.path !== '/' && this.$route.path !== '/excel' && this.$route.path !== '/vscode') {
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
        // excel页面点击分类按钮的时候，不换路由
        if (this.$route.path !== '/excel' && this.$route.path !== '/vscode') {
          this.$router.push({ name: 'Category', params: { category: cat.routerName } });
        }
      }
      this.activeCategory = cat;

      // 把全部数据下收藏的卡片方法收藏分类下
      if (cat.routerName === 'favorites') {
        // 先清空收藏分类下的卡片
        this.activeCategory.subCategories.splice(0);

        const allCategory = this.categroies.find(cat => cat.id === 0);
        if (allCategory) {
          // 清空 activeCategory 的 subCategories（避免重复添加）
          this.activeCategory.subCategories = [];
          // 把"全部"分类里标记为 isStar 的子分类添加进去
          allCategory.subCategories.forEach(subCat => {
            if (subCat.isStar) {
              this.activeCategory.subCategories.push(subCat);
            }
          });
        }
      }

      // 突发热点
      if (cat.routerName === 'sudden') {
        console.log(cat.routerName);
      }

      // 对数据进行排序，因为从缓存中拿到的用户的sort数据，我们需要根据这个sort展示
      this.sortedSubCategories();
    },

    // 初始化全部分类，就是把其他分类下的东西放到全部分类下，方便展示
    initAllCategroies() {
      this.activeCategory = this.categroies.find(
          category => category.routerName === "all"
      );
      this.activeCategory.subCategories = [];
      this.categroies.forEach(cat => {
        cat.subCategories.forEach(subCat => {
          this.activeCategory.subCategories.push(subCat);
        });
      });
    },

    updateCategroiesCache() {
      // 放到缓存里
      const clonedForStorage = JSON.parse(JSON.stringify(this.categroies));
      // 只保存title和isShow、sort、isStar的数据，其余数据全部设置为null，减少缓存
      clonedForStorage.forEach(category => {
        category.subCategories.forEach(subCategory => {
          subCategory.data = null;
          subCategory.api = null;
          subCategory.logo = null;
          subCategory.updateTime = '';
          subCategory.loading = true;
        });
      });
      setLocalStorage(LOCAL_STORAGE_KEYS.CATEGORIES, clonedForStorage);
    },

    sortedSubCategories() {
      this.activeCategory.subCategories.sort((a, b) => a.sort - b.sort);
    },
  },
  computed: {
    topSettingHeight() {
      if (this.isMobile) {
        return { marginTop: -2 + 'rem' };
      }
      return { marginTop: this.$store.state.topMessageHeight - 6 + 'rem' };
    },
    isMobile() {
      return this.windowWidth < 768; // 手机屏幕宽度
    },
    defaultCategoryId: {
      get() {
        return this.$store.state.defaultCategoryId;
      },
      set(value) {
        this.$store.commit('setDefaultCategoryId', value);
      }
    },
    workMaskExcelShow: {
      get() {
        return this.$store.state.workMaskExcelShow;
      },
      set(value) {
        this.$store.commit('setWorkMaskExcelShow', value);
      }
    },
    workMaskVsCodeShow: {
      get() {
        return this.$store.state.workMaskVsCodeShow;
      },
      set(value) {
        this.$store.commit('setWorkMaskVsCodeShow', value);
      }
    },
    categroies: {
      get() {
        return this.$store.state.categroies;
      },
      set(value) {
        this.$store.commit('setCategroies', value);
      }
    },
    activeCategory: {
      get() {
        return this.$store.state.activeCategory;
      },
      set(value) {
        this.$store.commit('setActiveCategory', value);
      }
    },
    topCarouselFontShow: {
      get() {
        return this.$store.state.topCarouselFontShow;
      },
      set(value) {
        this.$store.commit('setTopCarouselFontShow', value);
      }
    },
    wordCloudShow: {
      get() {
        return this.$store.state.wordCloudShow;
      },
      set(value) {
        this.$store.commit('setWordCloudShow', value);
      }
    },
    pageViewsShow: {
      get() {
        return this.$store.state.pageViewsShow;
      },
      set(value) {
        this.$store.commit('setPageViewsShow', value);
      }
    },
    isAIMode: {
      get() {
        return this.$store.state.isAIMode;
      },
      set(value) {
        this.$store.commit('setIsAIMode', value);
      }
    },
  },
  watch: {
    /// 监听路由变化，切换分类
    '$route.params.category'() {
      this.handleRouteCategory("watch");
    }
  },
};
</script>

<style scoped>
/* 移动端导航固定在底部 */
.mobile-bottom-nav {
  position: fixed !important;
  bottom: 0 !important;
  left: 0;
  right: 0;
  top: auto !important;
  z-index: 999;
}

/* 主内容区域在移动端时添加底部内边距 */
.main-content.mobile-with-nav {
  padding-bottom: 0;
}

/* 自定义样式的数字加减输入框 */
:deep(.el-input__wrapper) {
  background-color: transparent !important;
  box-shadow: none !important;
  border: 0 solid rgba(255, 255, 255, 0.2);
}

/* 自定义样式的数字加减减号框 */
:deep(.el-input-number__decrease) {
  background-color: transparent !important;
  box-shadow: none !important;
  border: 0 solid rgba(255, 255, 255, 0);
  color: inherit;
}

/* 自定义样式的数字加减加号框 */
:deep(.el-input-number__increase) {
  background-color: transparent !important;
  box-shadow: none !important;
  border: 0 solid rgba(255, 255, 255, 0);
  color: inherit;
}

/* 输入文字颜色（根据主题自调） */
:deep(.el-input__inner) {
  color: inherit;
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

:deep(.el-collapse) {
  border: none !important;
}

:deep(.el-collapse-item__header) {
  border: none !important;
}

:deep(.el-icon.el-collapse-item__arrow) {
  display: none !important;
}

:deep(.el-collapse-item__header) {
  background-color: #ffffff00 !important;
}

:deep(.el-collapse-item__wrap) {
  border: none !important;
  background-color: #ffffff00 !important;
}

:deep(.el-collapse-item__content) {
  padding: 0 !important;
}

:deep(.el-input-tag) {
  background-color: unset !important;
  box-shadow: unset !important;
  min-height: 1rem !important;
}

:deep(.el-input-tag--small) {
  --el-input-tag-padding: 0px !important;
  line-height: normal !important;
}

:deep(.el-tag--small) {
  height: 14px !important;
}

:deep(.el-input-tag__input-wrapper) {
  height: 14px !important;
}

:deep(.el-icon.mr-1) {
  display: none !important;
}

:deep(.el-tag__content) {
  line-height: unset !important;
}

:deep(.el-select__wrapper) {
  background-color: unset !important;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}

.stats-updating {
  animation: pulse 0.5s ease-in-out;
}
</style>