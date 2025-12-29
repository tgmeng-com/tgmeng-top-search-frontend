<template>
  <div class="flex flex-col" :style="topSettingHeight">
    <TopMessage v-if="topCarouselFontShow"/>
    <FishModeChoose/>
    <HotPointHistoryComponent/>
    <!--    <AdRentCards :ads="homeHeaderAdsCard"/>-->
    <WorkMaskExcel v-if="workMaskExcelShow" @handleCategoryClick="handleCategoryClick"/>
    <WorkMaskVsCode v-if="workMaskVsCodeShow" @handleCategoryClick="handleCategoryClick"/>

    <main class="flex-grow">
      <!-- 分类导航 - 同一行，按钮居中，更新时间右对齐 -->
      <div class="overflow-x-auto scrollbar-hide sticky z-50 pb-4 bg-light-bg/100 dark:bg-dark-bg/100"
           :style="topMessageHeight">
        <div class="inline-flex space-x-2 py-0.5 pb-4 justify-center mx-auto whitespace-nowrap">
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
              <div class="mr-2 last:mr-0 relative"> <!-- 保持按钮间距 -->
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
                  <h1><span class="dark:text-dark-text" :style="categroiesTitleStyle">{{ cat.name }}</span></h1>
                </button>
                <svg xmlns="http://www.w3.org/2000/svg"
                     viewBox="0 0 24 24"
                     class="absolute top-0 right-0 cursor-pointer z-10 rounded-tr-xl overflow-hidden w-3.5 h-3.5 opacity-50"
                     @click.stop="handleRssClick(cat)"
                     v-if="cat.id !== 13 && cat.id !== -1 && categroiesRssIconShow"
                >
                  <rect width="24" height="24" rx="3" ry="3" fill="#FFA500"/>
                  <circle cx="6" cy="18" r="2" fill="white"/>
                  <path d="M4 4c9.941 0 18 8.059 18 18" stroke="white" stroke-width="2" fill="none"/>
                  <path d="M4 10c6.627 0 12 5.373 12 12" stroke="white" stroke-width="2" fill="none"/>
                </svg>
              </div>
            </template>
          </draggable>
        </div>
      </div>

      <!-- 统计数据 -->
      <PageViewShow :show="pageViewsShow" />
      <!-- 设置面板 -->
      <SettingsPanel :categories="categroies"/>

      <WordCloud v-if="wordCloudShow"/>

      <div v-if="activeCategory.routerName==='sudden'">
        <SuddenHotPointComponent/>
      </div>
      <div v-else>
        <div class="mb-10 mt-4">
          <!-- 手机端：可切换横向/竖向滚动 -->
          <div
              ref="mobileScrollContainer"
              class="md:hidden"
              :class="cardHorizontalScrolling === 'horizontal' ? 'overflow-x-auto hide-scrollbar' : ''"
              @scroll="onMobileScroll"
          >
            <draggable
                v-model="activeCategory.subCategories"
                tag="div"
                item-key="title"
                :class="cardHorizontalScrolling === 'horizontal' ? 'flex gap-4 pb-4' : 'grid grid-cols-1 gap-4'"
                :animation="300"
                :handle="'.drag-handle'"
                @start="onDragStart"
                @end="onDragEnd"
                :disabled="!cardDraggable"
            >
              <template #item="{ element: p }">
                <div
                    v-show="p.isShow"
                    :class="cardHorizontalScrolling === 'horizontal' ? 'flex-shrink-0' : ''"
                    :style="cardHorizontalScrolling === 'horizontal' ? cardWidthForPhoneStyle : ''"
                >
                  <CommunityCard
                      :key="p.title"
                      :title="p.title"
                      :logo="p.logo"
                      :updateTime="p.updateTime"
                      :list="p.data"
                      :loading="p.loading"
                      :rss="p.rss"
                      v-model:isStar="p.isStar"
                      @updateCategroiesCache="updateCategroiesCache"
                      @fetchData="()=>fetchData(p)"
                  />
                </div>
              </template>
            </draggable>
          </div>

          <!-- PC端：网格布局 -->
          <draggable
              v-model="activeCategory.subCategories"
              tag="div"
              item-key="title"
              class="hidden md:grid gap-6 grid-cols-1 md:grid-cols-2"
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
                    :rss="p.rss"
                    v-model:isStar="p.isStar"
                    @updateCategroiesCache="updateCategroiesCache"
                    @fetchData="()=>fetchData(p)"
                />
              </div>
            </template>
          </draggable>
        </div>
      </div>
      <!--     主内容和评论区之间 展示广告 -->
      <GoogleAdsense v-if="$store.state.adsEnabled" ad-client="ca-pub-3286880109560525" ad-slot="9081541454"
                     ad-format="auto"
                     :full-width-responsive="true"/>
      <WalineComment/>
    </main>
  </div>
</template>

<script>
import HotPointCard from '@/components/Layout/HotPointCard.vue';
import { getLocalStorage, LOCAL_STORAGE_KEYS, setLocalStorage,} from "@/utils/localStorageUtils";
import draggable from 'vuedraggable'
import WordCloud from '@/components/Layout/WordCloud.vue'
import WorkMaskExcel from "@/components/fakeUI/WorkMaskExcel.vue";
import TopMessage from "@/components/Layout/TopMessage.vue";
import WalineComment from "@/components/Layout/WalineComment.vue";
import GoogleAdsense from "@/components/Adsense/GoogleAdsense.vue";
import WorkMaskVsCode from "@/components/fakeUI/WorkMaskVsCode.vue";
import FishModeChoose from "@/components/fakeUI/FishModeChoose.vue";
import HotPointHistoryComponent from "@/components/Layout/HotPointHistoryComponent.vue";
import SuddenHotPointComponent from "@/components/Layout/SuddenHotPointComponent.vue";
import PageViewShow from "@/components/Layout/PageViewShow.vue";
import SettingsPanel from "@/components/Layout/SettingsPanel.vue"
// import AdRentCards from "@/components/Adsense/AdRentCards.vue";

export default {
  components: {
    SuddenHotPointComponent,
    HotPointHistoryComponent,
    WorkMaskVsCode,
    // AdRentCards,
    GoogleAdsense,
    WalineComment,
    TopMessage,
    WorkMaskExcel,
    CommunityCard: HotPointCard,
    draggable,
    WordCloud,
    FishModeChoose,
    PageViewShow,
    SettingsPanel
  },
  data() {
    return {

      preDragSortList: [], // 拖动前的 sort 列表
      preDragFatherCatSortList: [], // 大分类拖动前的 sort 列表
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
    // 🆕 新增方法1：监听滚动，保存位置
    onMobileScroll() {
      if (this.$refs.mobileScrollContainer && this.cardHorizontalScrolling === 'horizontal') {
        this.categoryScrollPositions[this.activeCategory.id] = this.$refs.mobileScrollContainer.scrollLeft;
      }
    },

    // 🆕 新增方法2：恢复滚动位置
    restoreCategoryScrollPosition() {
      this.$nextTick(() => {
        if (this.$refs.mobileScrollContainer && this.cardHorizontalScrolling === 'horizontal') {
          this.$refs.mobileScrollContainer.scrollLeft = this.categoryScrollPositions[this.activeCategory.id] || 0;
        }
      });
    },
    handleResize() {
      this.windowWidth = window.innerWidth; // 更新 windowWidth
    },
    initializePlatforms() {
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
      // 把其他分类下的数据放到全部分类下
      this.initAllCategroies();
      // 如果没有设置默认值，那就用新闻作为默认分类
      this.activeCategory = this.categroies.find(cat => cat.id === this.defaultCategoryId) || this.categroies[this.defaultCategoryId];
      // 首次进入页面，检查路由参数是否合法
      this.handleRouteCategory("init");
    },

    filterByWords(texts, includeWords = [], excludeWords = [], getter = null) {
      if (!Array.isArray(texts)) return [];

      // getter 处理
      const getText = typeof getter === "function"
          ? getter
          : (item => item);

      // 处理 include / exclude：trim + 非空 + 小写
      const includes = (includeWords || [])
          .map(w => w.trim().toLowerCase())
          .filter(Boolean);

      const excludes = (excludeWords || [])
          .map(w => w.trim().toLowerCase())
          .filter(Boolean);

      return texts.filter(item => {
        let text = getText(item);

        if (text == null) return false;
        if (typeof text !== "string") text = String(text);

        const t = text.trim().toLowerCase(); // ⭐ 文本转小写
        if (!t) return false;

        // include
        const includeOK =
            includes.length === 0 || includes.some(w => t.includes(w));

        // exclude
        const excludeOK =
            excludes.length === 0 || !excludes.some(w => t.includes(w));

        return includeOK && excludeOK;
      });
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
            // 过滤掉
            subCategory.data = this.filterByWords(
                Array.isArray(data.dataInfo) ? data.dataInfo : [],
                this.includeWord,      // 必须包含
                this.unincludeWord,      // 不包含
                item => item.title   // 从 title 判断
            );
          })
          .catch((err) => {
            console.warn(`加载失败：${subCategory.name}`, err);
          })
          .finally(() => {
            subCategory.loading = false;
          });
    },

    // 处理路由 category 参数
    handleRouteCategory(from) {
      const categoryRouterName = this.$route.params.category;
      const matchedCat = this.categroies.find(c => c.routerName === categoryRouterName);

      if (matchedCat) {
        // 路由存在且是初次加载而不是click路由监听
        if (from === "init") {
          this.handleCategoryClick(matchedCat, {skipRoutePush: true});
        }
      } else if (!matchedCat) {
        // 路由不存在或非法 → 回到根路径，显示默认分类
        if (this.$route.path !== '/' && this.$route.path !== '/excel' && this.$route.path !== '/vscode') {
          // 仅当路径不是 / 时才替换 URL
          this.$router.replace({path: '/'});
        }
        this.handleCategoryClick(this.activeCategory, {skipRoutePush: true});
      }
    }
    ,
    handleRssClick(cat) {
      if (cat.id === 0) {
        window.open('https://tgmeng.com/rss.xml', '_blank');
      } else {
        window.open('https://tgmeng.com/' + cat.routerName + '/rss.xml', '_blank');
      }
      window.umami.track('点击RSS:' + cat.name);
    }
    ,

    // 分类按钮点击事件
    handleCategoryClick(cat, options = {}) {
      // skipRoutePush，防止重复推路由
      if (!options.skipRoutePush) {
        // excel页面点击分类按钮的时候，不换路由
        if (this.$route.path !== '/excel' && this.$route.path !== '/vscode') {
          this.$router.push({name: 'Category', params: {category: cat.routerName}});
        }
      }
      this.activeCategory = cat;
      // 🆕 新增：恢复该分类的滚动位置
      this.restoreCategoryScrollPosition();
      // 把全部数据下收藏的卡片方法收藏分类下
      if (cat.routerName === 'favorites') {
        // 先清空收藏分类下的卡片
        this.activeCategory.subCategories.splice(0)

        const allCategory = this.categroies.find(cat => cat.id === 0);
        if (allCategory) {
          // 清空 activeCategory 的 subCategories（避免重复添加）
          this.activeCategory.subCategories = [];
          // 把“全部”分类里标记为 isStar 的子分类添加进去
          allCategory.subCategories.forEach(subCat => {
            if (subCat.isStar) {
              this.activeCategory.subCategories.push(subCat);
            }
          });
        }
      }

      // 突发热点
      if (cat.routerName === 'sudden') {
        console.log(cat.routerName)
      }

      // 对数据进行排序，因为从缓存中拿到的用户的sort数据，我们需要根据这个sort展示
      this.sortedSubCategories();
      cat.subCategories.forEach(subCat => {
        //只加载show的数据
        if (subCat.isShow) {
          this.fetchData(subCat);
        }
      });
    }
    ,

    // 刷新当前分类下的数据
    refreshData() {
      this.activeCategory.subCategories.forEach(subCat => {
        // TODO 因为有人反馈，看着看着自动刷新了，所以这里先不写这个逻辑
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
          this.fetchData(subCat);
        }

        // 如果当前某个平台下数据为空，也主动刷新一下,这个也先不加了，防止被一些平台进行了ip限制的话，频繁请求导致一直被限制
        if (subCat.isShow && subCat.data.length === 0) {
          this.fetchData(subCat);
        }
      })
    }
    ,

    // 初始化全部分类，就是把其他分类下的东西放到全部分类下，方便展示
    initAllCategroies() {
      this.activeCategory = this.categroies.find(
          category => category.routerName === "all"
      );
      // this.activeCategory = this.categroies[0];
      this.activeCategory.subCategories = []
      this.categroies.forEach(cat => {
        cat.subCategories.forEach(subCat => {
          this.activeCategory.subCategories.push(subCat)
        });
      })
    }
    ,
    // 拖动开始时，保存当前 sort 列表
    onDragStart() {
      this.preDragSortList = this.activeCategory.subCategories.map(item => item.sort);
    }
    ,
    // 拖动大分类开始时，保存当前 sort 列表
    onDragFatherCatStart() {
      this.preDragFatherCatSortList = this.categroies.map(item => item.sort);
    }
    ,
    //保存拖动卡片后的顺序
    onDragEnd() {
      // 拖动完成后，更新每个卡片的 sort 属性
      const arr = this.activeCategory.subCategories;
      arr.forEach((item, index) => {
        item.sort = this.preDragSortList[index];
      });
      this.updateCategroiesCache();
      window.umami.track('拖拽排序')
    }
    ,
    //保存大分类拖动卡片后的顺序
    onDragFatherCatEnd() {
      // 拖动完成后，更新每个卡片的 sort 属性
      const arr = this.categroies;
      arr.forEach((item, index) => {
        item.sort = this.preDragFatherCatSortList[index];
      });
      this.updateCategroiesCache();
      window.umami.track('拖拽排序')
    }
    ,
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
    }
    ,
    sortedSubCategories() {
      this.activeCategory.subCategories.sort((a, b) => a.sort - b.sort);
    },
  },
  computed: {
    topMessageHeight() {
      if (this.isMobile) {
        return {top: this.$store.state.topMessageHeight - 1 + 'rem', paddingBottom: 0.6 + 'rem'}
      }
      return {top: this.$store.state.topMessageHeight + 'rem', paddingBottom: 1 + 'rem'}
    },
    topSettingHeight() {
      if (this.isMobile) {
        return {marginTop: -2 + 'rem'}
      }
      return {marginTop: this.$store.state.topMessageHeight - 6 + 'rem'}
    },
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
    // 自定义调整卡片列表数
    cardListLimit: {
      get() {
        return this.$store.state.cardListLimit;
      },
      set(value) {
        this.$store.commit('setCardListLimit', value);
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
    categroiesTitleFontSize: {
      get() {
        return this.$store.state.categroiesTitleFontSize;
      },
      set(value) {
        this.$store.commit('setCategroiesTitleFontSize', value);
      }
    },
    cardTopFontSize: {
      get() {
        return this.$store.state.cardTopFontSize;
      },
      set(value) {
        this.$store.commit('setCardTopFontSize', value);
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
    categroiesRssIconShow: {
      get() {
        return this.$store.state.categroiesRssIconShow;
      },
      set(value) {
        this.$store.commit('setCategroiesRssIconShow', value);
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
    cardTimeShow: {
      get() {
        return this.$store.state.cardTimeShow;
      },
      set(value) {
        this.$store.commit('setCardTimeShow', value);
      }
    },
    cardHorizontalScrolling: {
      get() {
        return this.$store.state.cardHorizontalScrolling;
      },
      set(value) {
        this.$store.commit('setCardHorizontalScrolling', value);
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
    cardTitleFull: {
      get() {
        return this.$store.state.cardTitleFull;
      },
      set(value) {
        this.$store.commit('setCardTitleFull', value);
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
    // 分类标题样式
    categroiesTitleStyle() {
      return {
        fontSize: this.categroiesTitleFontSize + 'rem',
        fontWeight: 'bold',
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
    // 边距缩放，就是屏幕两边的，主要是为了移动端i
    widthPadding: {
      get() {
        return this.$store.state.widthPadding;
      },
      set(value) {
        this.$store.commit('setWidthPadding', value);
      }
    },
    // 词云数量
    wordCloudNum: {
      get() {
        return this.$store.state.wordCloudNum;
      },
      set(value) {
        this.$store.commit('setWordCloudNum', value);
      }
    },
    adsEnabled: {
      get() {
        return this.$store.state.adsEnabled;
      },
      set(value) {
        this.$store.commit('setAdsEnabled', value);
      }
    },
    includeWord: {
      get() {
        return this.$store.state.includeWord;
      },
      set(value) {
        this.$store.commit('setIncludeWord', value);
      }
    },
    unincludeWord: {
      get() {
        return this.$store.state.unincludeWord;
      },
      set(value) {
        this.$store.commit('setUnincludeWord', value);
      }
    },
    cardWidthForPhone: {
      get() {
        return this.$store.state.cardWidthForPhone;
      },
      set(value) {
        this.$store.commit('setCardWidthForPhone', value);
      }
    },
    cardWidthForPhoneStyle() {
      return {
        width: this.cardWidthForPhone + '% !important',
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

/* 隐藏滚动条但保持滚动功能 */
.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.hide-scrollbar::-webkit-scrollbar {
  display: none;
}

/* 可选：添加滚动指示器 */
.overflow-x-auto {
  scroll-snap-type: x proximity;
  -webkit-overflow-scrolling: touch;
}

.flex-shrink-0 {
  scroll-snap-align: start;
}

/* 手机端卡片容器 - 让卡片内部可以滚动 */
.card-wrapper-mobile {
  height: 70vh; /* 固定高度，让卡片内部可以滚动 */
  overflow: visible; /* 允许卡片内部自行处理滚动 */
}

.card-wrapper-mobile > * {
  height: 100%;
  overflow-y: auto; /* 确保卡片内部可以纵向滚动 */
}

.category-nav-sticky {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05),
  0 2px 4px -1px rgba(0, 0, 0, 0.03);
}

.dark .category-nav-sticky {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3),
  0 2px 4px -1px rgba(0, 0, 0, 0.2);
}

</style>
