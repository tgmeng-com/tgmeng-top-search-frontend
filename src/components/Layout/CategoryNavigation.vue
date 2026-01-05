<template>
  <!-- 分类导航 - 同一行，按钮居中，更新时间右对齐 -->
  <div class="overflow-x-auto scrollbar-hide sticky z-50 px-2 bg-light-bg/100 dark:bg-dark-bg/100"
       :class="isMobile ? 'py-3' : 'py-4'"
       :style="topMessageHeight">
    <div class="inline-flex space-x-2 justify-center mx-auto whitespace-nowrap">
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
          <div class="mr-2 last:mr-0 relative" v-show="cat.isShow && !(isAIMode && isHiddenCategory(cat))">
            <button
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
                 v-if="cat.id !== 13 && cat.id !== -1 && categroiesRssIconShow && !(isAIMode && isHiddenCategory(cat))"
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
</template>

<script>
import draggable from 'vuedraggable';
import {setLocalStorage, LOCAL_STORAGE_KEYS} from "@/utils/localStorageUtils";

export default {
  name: 'CategoryNavigation',
  components: {
    draggable,
  },
  data() {
    return {
      preDragFatherCatSortList: [], // 大分类拖动前的 sort 列表
      windowWidth: window.innerWidth
    };
  },
  mounted() {
    window.addEventListener('resize', this.handleResize);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.handleResize);
  },
  methods: {
    handleResize() {
      this.windowWidth = window.innerWidth;
    },

    handleRssClick(cat) {
      if (cat.id === 0) {
        window.open('https://tgmeng.com/rss.xml', '_blank');
      } else {
        window.open('https://tgmeng.com/' + cat.routerName + '/rss.xml', '_blank');
      }
      this.$umami.track('点击RSS:', {name: cat.name});
    },

    // 分类按钮点击事件
    handleCategoryClick(cat) {
      this.$emit('categoryClick', cat);
      this.$umami.track('分类点击', {name: cat.name});
    },

    // 保存大分类拖动卡片后的顺序
    onDragFatherCatStart() {
      this.preDragFatherCatSortList = this.categroies.map(item => item.sort);
    },

    onDragFatherCatEnd() {
      // 拖动完成后，更新每个卡片的 sort 属性
      const arr = this.categroies;
      arr.forEach((item, index) => {
        item.sort = this.preDragFatherCatSortList[index];
      });
      this.updateCategroiesCache();
      this.$umami.track('拖拽排序');
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
  },
  computed: {
    isAIMode() {
      return this.$store.state.isAIMode;
    },
    // 判断是否是需要隐藏的分类（收藏 或 突发）
    isHiddenCategory() {
      return (cat) => {
        return cat.routerName === 'sudden' || cat.routerName === 'favorites';
      };
    },
    isMobile() {
      return this.windowWidth < 768;
    },

    topMessageHeight() {
      if (this.isMobile) {
        return {
          top: this.$store.state.topMessageHeight - 1 + 'rem'
        };
      }
      return {
        top: this.$store.state.topMessageHeight + 'rem',
      };
    },

    categroiesTitleStyle() {
      if (this.isMobile) {
        return {
          fontSize: this.categroiesTitleFontSize - 0.125 + 'rem',
          fontWeight: 'bold',
        };
      }
      return {
        fontSize: this.categroiesTitleFontSize + 'rem',
        fontWeight: 'bold',
      };
    },

    categroiesTitleFontSize: {
      get() {
        return this.$store.state.categroiesTitleFontSize;
      },
      set(value) {
        this.$store.commit('setCategroiesTitleFontSize', value);
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
  },
};
</script>

<style scoped>
.category-nav-sticky {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05),
  0 2px 4px -1px rgba(0, 0, 0, 0.03);
}

.dark .category-nav-sticky {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3),
  0 2px 4px -1px rgba(0, 0, 0, 0.2);
}
</style>