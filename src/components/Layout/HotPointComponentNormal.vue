<template>
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
</template>

<script>
import HotPointCard from '@/components/Layout/HotPointCard.vue';
import draggable from 'vuedraggable';
import { setLocalStorage, LOCAL_STORAGE_KEYS } from "@/utils/localStorageUtils";

export default {
  name: 'HotPointComponentNormal',
  components: {
    CommunityCard: HotPointCard,
    draggable,
  },
  props: {
    categoryScrollPositions: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      preDragSortList: [], // 拖动前的 sort 列表
      windowWidth: window.innerWidth, // 屏幕大小
    };
  },
  mounted() {
    window.addEventListener('resize', this.handleResize);
    this.restoreCategoryScrollPosition();
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.handleResize);
  },
  methods: {
    handleResize() {
      this.windowWidth = window.innerWidth;
    },

    // 监听滚动，保存位置
    onMobileScroll() {
      if (this.$refs.mobileScrollContainer && this.cardHorizontalScrolling === 'horizontal') {
        const scrollLeft = this.$refs.mobileScrollContainer.scrollLeft;
        this.$emit('updateScrollPosition', this.activeCategory.id, scrollLeft);
      }
    },

    // 恢复滚动位置
    restoreCategoryScrollPosition() {
      this.$nextTick(() => {
        if (this.$refs.mobileScrollContainer && this.cardHorizontalScrolling === 'horizontal') {
          this.$refs.mobileScrollContainer.scrollLeft = this.categoryScrollPositions[this.activeCategory.id] || 0;
        }
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
            // 过滤
            subCategory.data = this.filterByWords(
                Array.isArray(data.dataInfo) ? data.dataInfo : [],
                this.includeWord,
                this.unincludeWord,
                item => item.title
            );
          })
          .catch((err) => {
            console.warn(`加载失败：${subCategory.name}`, err);
          })
          .finally(() => {
            subCategory.loading = false;
          });
    },

    filterByWords(texts, includeWords = [], excludeWords = [], getter = null) {
      if (!Array.isArray(texts)) return [];

      const getText = typeof getter === "function" ? getter : (item => item);
      const includes = (includeWords || []).map(w => w.trim().toLowerCase()).filter(Boolean);
      const excludes = (excludeWords || []).map(w => w.trim().toLowerCase()).filter(Boolean);

      return texts.filter(item => {
        let text = getText(item);
        if (text == null) return false;
        if (typeof text !== "string") text = String(text);

        const t = text.trim().toLowerCase();
        if (!t) return false;

        const includeOK = includes.length === 0 || includes.some(w => t.includes(w));
        const excludeOK = excludes.length === 0 || !excludes.some(w => t.includes(w));

        return includeOK && excludeOK;
      });
    },

    // 拖动开始时，保存当前 sort 列表
    onDragStart() {
      this.preDragSortList = this.activeCategory.subCategories.map(item => item.sort);
    },

    // 保存拖动卡片后的顺序
    onDragEnd() {
      const arr = this.activeCategory.subCategories;
      arr.forEach((item, index) => {
        item.sort = this.preDragSortList[index];
      });
      this.updateCategroiesCache();
      window.umami.track('拖拽排序');
    },

    updateCategroiesCache() {
      const clonedForStorage = JSON.parse(JSON.stringify(this.categroies));
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
    isMobile() {
      return this.windowWidth < 768;
    },
    isMediumScreen() {
      return this.windowWidth >= 768 && this.windowWidth < 1024;
    },
    gridStyle() {
      return {
        gridTemplateColumns: `repeat(${this.isMobile ? 1 : this.isMediumScreen ? 2 : this.cardCols}, minmax(0, 1fr))`
      };
    },
    cardCols: {
      get() {
        return this.$store.state.cardCols;
      },
      set(value) {
        this.$store.commit('setCardCols', value);
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
    cardHorizontalScrolling: {
      get() {
        return this.$store.state.cardHorizontalScrolling;
      },
      set(value) {
        this.$store.commit('setCardHorizontalScrolling', value);
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
      };
    },
  },
  watch: {
    activeCategory: {
      handler(newVal, oldVal) {
        // 恢复滚动位置
        this.restoreCategoryScrollPosition();

        // 当分类切换时，加载数据
        if (newVal && newVal.id !== oldVal?.id) {
          newVal.subCategories.forEach(subCat => {
            if (subCat.isShow) {
              this.fetchData(subCat);
            }
          });
        }
      },
      deep: true,
      immediate: true
    }
  }
};
</script>

<style scoped>
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
  height: 70vh;
  overflow: visible;
}

.card-wrapper-mobile > * {
  height: 100%;
  overflow-y: auto;
}
</style>