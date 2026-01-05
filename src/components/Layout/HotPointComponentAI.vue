<template>
  <div class="ai-hotpoint-container mt-2">
    <div v-if="loading" class="loading-container">
      <div class="atom-spinner">
        <div class="spinner-inner">
          <div class="spinner-line"></div>
          <div class="spinner-line"></div>
          <div class="spinner-line"></div>
          <div class="spinner-circle">&#9679;</div>
        </div>
      </div>
      <p class="mt-3 text-gray-600 dark:text-gray-400 mt-4">AI正在分析热点数据...</p>
    </div>

    <div v-else-if="aiData.data.length<=0">
      <EmptyState :show-action="true" action-text="去月球找找"/>
    </div>

    <div v-else class="">
      <div v-if="aiModeBigModalDesc"
          class="mb-1 overflow-x-auto scrollbar-hide flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div class="text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap overflow-x-auto scrollbar-hide">
        <span class="text-xs px-2 py-1 rounded-md text-gray-600 dark:text-gray-300 bg-gray-200 dark:bg-gray-700">
            🤖 热点数: <span class="font-medium">{{ aiData.data.length }}</span>
          </span>&nbsp;
          <span class="text-xs px-2 py-1 rounded-md text-gray-600 dark:text-gray-300 bg-gray-200 dark:bg-gray-700">
            🤖 更新时间: <span class="font-medium">{{ aiData.time }}</span>
          </span>&nbsp;
          <span class="text-xs px-2 py-1 rounded-md text-gray-600 dark:text-gray-300 bg-gray-200 dark:bg-gray-700">
            🤖 算力平台: <span class="font-medium">{{ aiData.platform }}</span>
          </span>&nbsp;
          <span class="text-xs px-2 py-1 rounded-md text-gray-600 dark:text-gray-300 bg-gray-200 dark:bg-gray-700">
            🤖 AI模型: <span class="font-medium">{{ aiData.model }}</span>
          </span>&nbsp;
          <span class="text-xs px-2 py-1 rounded-md text-gray-600 dark:text-gray-300 bg-gray-200 dark:bg-gray-700">
            🤖 消耗Token: <span class="font-medium">{{ aiData.totalTokens }}</span>
          </span>&nbsp;
          <span class="text-xs px-2 py-1 rounded-md text-gray-600 dark:text-gray-300 bg-gray-200 dark:bg-gray-700">
            🤖 提供方: <span class="font-medium">{{ aiData.from }}</span>
          </span>&nbsp;
          <span class="text-xs px-2 py-1 rounded-md text-gray-600 dark:text-gray-300 bg-gray-200 dark:bg-gray-700">
            🤖 更新频率: <span class="font-medium">每5分钟</span>
          </span>&nbsp;
        </div>
        <!--        <div-->
        <!--            class="text-xs px-2 py-1 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 whitespace-nowrap">-->
        <!--          本页面数据每5分钟更新一次-->
        <!--        </div>-->
      </div>

      <div v-if="aiModeDesc"
          class="mt-2 mb-1 overflow-x-auto scrollbar-hide flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div
            class="text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap overflow-x-auto scrollbar-hide flex items-center">
          <span class="text-xs px-2 py-1 rounded-md text-gray-600 dark:text-gray-300 bg-gray-200 dark:bg-gray-700">
            ❤️ 每条热点包含三个维度数据，从左到右依次是【概括总结】【深度分析】【趋势预测】
           </span>&nbsp;&nbsp;
          <span class="text-xs px-2 py-1 rounded-md text-gray-600 dark:text-gray-300 bg-gray-200 dark:bg-gray-700">
            ❤️ 每天消耗数亿Token，只为给各位带去最极致的新闻体验，科技不该冰冷，人性不该傲慢
           </span>&nbsp;
        </div>
      </div>

      <div
          class="mt-2 mb-8 overflow-x-auto scrollbar-hide flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div
            class="text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap overflow-x-auto scrollbar-hide flex items-center">
          <button
              @click="toggleAll"
              class="text-xs px-3 py-1 rounded-md bg-primary text-gray-200 whitespace-nowrap transition-colors duration-200 cursor-pointer"
          >
            {{ isAllCollapsed ? '全部展开' : '全部折叠' }}
          </button>&nbsp;&nbsp;
        </div>
      </div>

      <div class="hotpoint-list space-y-8">
        <div
            v-for="(item, index) in aiData.data"
            :key="'hotpoint-' + index"
            class="hotpoint-item rounded-xl px-4 bg-gray-300 dark:bg-dark-card-title"
        >
          <div
              @click="toggleItem(index)"
              class="px-2 py-2 pt-4 flex items-center drag-handle text-center mb-2 cursor-pointer hover:brightness-95 transition-all select-none"
              :style="cardTopStyle">
            <span :class="[
              'sequence-number rounded-xl flex items-center justify-center font-bold mr-3',
              index === 0 ? 'bg-red-600 text-white' :
              index === 1 ? 'bg-orange-500 text-white' :
              index === 2 ? 'bg-yellow-700 text-white' :
              'text-gray-600 dark:text-gray-300']">
              {{ index + 1 }}
            </span>

            <span class="-ml-2 mr-1 cursor-pointer" @click="clickHotPointTrend(item.summary.title)">
               &nbsp; 📈&nbsp;
            </span>

            <h1 class="font-semibold dark:text-dark-text hot-title" :class="{'card-title-full':cardTitleFull}">
              {{ item.summary.title }}
            </h1>
            <div class="ml-2 transition-transform duration-300 text-gray-500"
                 :class="{ 'rotate-180': collapsedItems.includes(index) }">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path fill-rule="evenodd"
                      d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
              </svg>
            </div>
          </div>

          <div class="collapse-transition-wrapper" :class="{ 'is-collapsed': collapsedItems.includes(index) }">
            <div class="collapse-content-inner">
              <div class="dimensions-container pt-1 pb-4">
                <div class="dimension-card summary-card">
                  <div class="">
                    <h1 class="font-semibold dark:text-dark-text hot-title" :class="{'card-title-full':cardTitleFull}"
                        :style="[cardTop2Style]">
                      📘 {{ item.summary.title }}
                    </h1>
                    <span class="dark:text-dark-text hot-title hover:underline mt-2"
                          style="line-height: 1.7;opacity: 0.8"
                          :class="{'hot-title-full':cardHotTitleFull}"
                          :title="item.summary.content"
                          :style="[cardTitleStyle]"
                    >
                      {{ item.summary.content }}
                    </span>
                  </div>
                </div>

                <div class="dimension-card analyze-card">
                  <div class="">
                    <h1 class="font-semibold dark:text-dark-text hot-title" :class="{'card-title-full':cardTitleFull}"
                        :style="[cardTop2Style]">
                      🤔 {{ item.analyze.title }}
                    </h1>
                    <span class="dark:text-dark-text hot-title hover:underline mt-2"
                          style="line-height: 1.7;opacity: 0.8"
                          :class="{'hot-title-full':cardHotTitleFull}"
                          :title="item.analyze.content"
                          :style="[cardTitleStyle]"
                    >
                      {{ item.analyze.content }}
                    </span>
                  </div>
                </div>
                <div class="dimension-card future-card">
                  <div class="">
                    <h1 class="font-semibold dark:text-dark-text hot-title" :class="{'card-title-full':cardTitleFull}"
                        :style="[cardTop2Style]">
                      🚀 {{ item.future.title }}
                    </h1>
                    <span class="dark:text-dark-text hot-title hover:underline mt-2"
                          style="line-height: 1.7;opacity: 0.8"
                          :class="{'hot-title-full':cardHotTitleFull}"
                          :title="item.future.content"
                          :style="[cardTitleStyle]"
                    >
                      {{ item.future.content }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {cacheSearchForAISummaryData} from "@/api/api";
import store from "@/store";
import EmptyState from "@/components/UI/EmptyState.vue";

export default {
  name: 'HotPointComponentAI',
  components: {EmptyState},
  data() {
    return {
      loading: false,
      aiData: {
        "data": []
      },
      collapsedItems: [] // 记录折叠的索引
    };
  },
  computed: {
    aiModeDesc: {
      get() {
        return this.$store.state.aiModeDesc;
      },
      set(value) {
        this.$store.commit('setAiModeDesc', value);
      }
    },
    aiModeBigModalDesc: {
      get() {
        return this.$store.state.aiModeBigModalDesc;
      },
      set(value) {
        this.$store.commit('setAiModeBigModalDesc', value);
      }
    },
    isAllCollapsed() {
      return this.aiData.data.length > 0 && this.collapsedItems.length === this.aiData.data.length;
    },
    activeCategory: {
      get() {
        return this.$store.state.activeCategory;
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
    cardTopStyle() {
      return {
        fontSize: this.cardTopFontSize + 'rem',
      }
    },
    cardTop2Style() {
      return {
        fontSize: this.cardTopFontSize - 0.0625 + 'rem',
        opacity: 0.9
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
    // 标题是否显示完整
    cardHotTitleFull: {
      get() {
        return this.$store.state.cardHotTitleFull;
      },
      set(value) {
        this.$store.commit('setCardHotTitleFull', value);
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
    cardTitleStyle() {
      return {
        fontSize: this.cardTitleFontSize + 'rem',
      }
    },
  },
  watch: {
    activeCategory: {
      handler(newVal, oldVal) {
        if (newVal && newVal.id !== oldVal?.id) {
          this.fetchData(newVal);
        }
      },
      immediate: true
    }
  },
  methods: {
    clickHotPointTrend(title) {
      store.commit('setHistoryDataBoardShow', true)
      store.commit('setHistoryDataSearchMode', 'ZHI_WEN_PI_PEI_TODAY')
      store.commit('setHistoryDataBoardUseTitle', title)
      this.$umami.track('📊热点历史追踪');
    },
    toggleItem(index) {
      const idx = this.collapsedItems.indexOf(index);
      if (idx > -1) {
        this.collapsedItems.splice(idx, 1);
      } else {
        this.collapsedItems.push(index);
      }
    },
    toggleAll() {
      if (this.isAllCollapsed) {
        this.collapsedItems = [];
      } else {
        this.collapsedItems = this.aiData.data.map((_, i) => i);
      }
    },
    fetchData(newVal) {
      this.loading = true;
      this.collapsedItems = []; // 重置折叠状态

      cacheSearchForAISummaryData(newVal.routerName)
          .then(res => {
            const data = res?.data?.data || false
            if (data && res.data.code !== 999) {
              this.aiData = data
              // 原始数据，转到页面需要的
              const originData = data.data
              const summaryList = Array.isArray(originData.summary) ? originData.summary : [];
              const analyzeList = Array.isArray(originData.analyze) ? originData.analyze : [];
              const futureList = Array.isArray(originData.future) ? originData.future : [];
              const maxLength = Math.max(
                  summaryList.length,
                  analyzeList.length,
                  futureList.length
              );
              const result = Array.from({length: maxLength}, (_, index) => ({
                summary: summaryList[index] || "",
                analyze: analyzeList[index] || "",
                future: futureList[index] || ""
              }));

              this.aiData.data = result;
              // 👇 添加这行：初始化时全部折叠
              this.collapsedItems = this.aiData.data.map((_, i) => i);
            } else {
              this.aiData = {"data": []}
              if (res.data.code === 999) {
                store.commit('setIsAIMode', false)
                store.commit('setLicenseShow', true)
              }
            }
          }).finally(() => {
        this.loading = false;
      })
    }
  }
};
</script>

<style scoped>
/* 新增：动画控制样式 */
.collapse-transition-wrapper {
  display: grid;
  grid-template-rows: 1fr;
  transition: grid-template-rows 0.3s ease-in-out, opacity 0.2s ease-in-out;
  overflow: hidden;
  opacity: 1;
}

.collapse-transition-wrapper.is-collapsed {
  grid-template-rows: 0fr;
  opacity: 0;
}

.collapse-content-inner {
  min-height: 0;
}

/* 保持原有样式不动 */
.ai-hotpoint-container {
}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
}

.loading-spinner {
  width: 50px;
  height: 50px;
  border: 4px solid #e5e7eb;
  border-top-color: #3b82f6;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.ai-icon {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

/* 元数据容器 */
.metadata-container {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.metadata-item {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.375rem 0.75rem;
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(8px);
  border-radius: 0.75rem;
  font-size: 0.75rem;
  border: 1px solid rgba(102, 126, 234, 0.1);
  transition: all 0.2s ease;
}

.metadata-item:hover {
  background: rgba(255, 255, 255, 0.9);
  border-color: rgba(102, 126, 234, 0.3);
  transform: translateY(-1px);
}

.dark .metadata-item {
  background: rgba(31, 41, 55, 0.6);
  border-color: rgba(139, 92, 246, 0.2);
}

.dark .metadata-item:hover {
  background: rgba(31, 41, 55, 0.9);
  border-color: rgba(139, 92, 246, 0.4);
}

.metadata-from {
  flex: 1 1 100%;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1));
}

.dark .metadata-from {
  background: linear-gradient(135deg, rgba(139, 92, 246, 0.15), rgba(59, 130, 246, 0.15));
}

.metadata-icon {
  width: 14px;
  height: 14px;
  color: #667eea;
  flex-shrink: 0;
}

.dark .metadata-icon {
  color: #8b5cf6;
}

.metadata-label {
  color: #6b7280;
  font-weight: 500;
}

.dark .metadata-label {
  color: #9ca3af;
}

.metadata-value {
  color: #1f2937;
  font-weight: 600;
}

.dark .metadata-value {
  color: #f3f4f6;
}

/* 热点项目 */
.hotpoint-item {
  position: relative;
}

.hotpoint-header {
  margin-bottom: 1.5rem;
}

.hotpoint-number {
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.25rem;
  font-weight: bold;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

.hotpoint-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1f2937;
  line-height: 1.4;
}

.dark .hotpoint-title {
  color: #f3f4f6;
}

/* 三个维度容器 */
.dimensions-container {
  display: grid;
  gap: 1.5rem;
  grid-template-columns: 1fr;
}

@media (min-width: 1024px) {
  .dimensions-container {
    grid-template-columns: repeat(3, 1fr);
  }
}

/* 维度卡片 - 统一样式 */
.dimension-card {
  background: #dddddd;
  border-radius: 16px;
  padding: 1.5rem;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  border: 1px solid rgba(99, 102, 241, 0.08);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.05);
}

.dimension-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  transition: all 0.3s ease;
}

.dimension-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 20px 40px rgba(99, 102, 241, 0.18);
}

.dark .dimension-card {
  background: #2E3641;
  border-color: rgba(99, 102, 241, 0.25);
}

/* 不同卡片的顶部颜色条 */
.summary-card::before {
}

.summary-card {
  box-shadow: 0 4px 20px rgba(59, 130, 246, 0.1);
}

.summary-card:hover {
  box-shadow: 0 8px 30px rgba(59, 130, 246, 0.2);
}

.analyze-card::before {
}

.analyze-card {
  box-shadow: 0 4px 20px rgba(139, 92, 246, 0.1);
}

.analyze-card:hover {
  box-shadow: 0 8px 30px rgba(139, 92, 246, 0.2);
}

.future-card::before {
}

.future-card {
  box-shadow: 0 4px 20px rgba(16, 185, 129, 0.1);
}

.future-card:hover {
  box-shadow: 0 8px 30px rgba(16, 185, 129, 0.2);
}

/* 维度头部 */
.dimension-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid #f3f4f6;
}

.dark .dimension-header {
  border-bottom-color: #374151;
}

.dimension-icon {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.summary-icon {
  background: linear-gradient(135deg, #dbeafe, #bfdbfe);
  color: #3b82f6;
}

.analyze-icon {
  background: linear-gradient(135deg, #ede9fe, #ddd6fe);
  color: #8b5cf6;
}

.future-icon {
  background: linear-gradient(135deg, #d1fae5, #a7f3d0);
  color: #10b981;
}

.dimension-title {
  font-size: 1rem;
  font-weight: 600;
  color: #374151;
  flex: 1;
}

.dark .dimension-title {
  color: #e5e7eb;
}

/* 维度内容 */
.dimension-content {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.analyze-title,
.future-title {
  font-size: 0.9375rem;
  font-weight: 600;
  color: #1f2937;
  line-height: 1.4;
}

.dark .analyze-title,
.dark .future-title {
  color: #f3f4f6;
}

.hot-title span,
.content-text {
  color: #475569;
}

.dark .content-text {
  color: #cbd5f5;
}

/* 分隔线 */
.hotpoint-divider {
  margin: 3rem 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, #e5e7eb 50%, transparent);
}

.dark .hotpoint-divider {
  background: linear-gradient(90deg, transparent, #374151 50%, transparent);
}

/* 响应式设计 */
@media (max-width: 1023px) {
  .ai-hotpoint-container {
  }

  .ai-intro {
    padding: 1rem;
  }

  .metadata-container {
    gap: 0.5rem;
  }

  .metadata-item {
    padding: 0.25rem 0.625rem;
    font-size: 0.6875rem;
  }

  .metadata-icon {
    width: 12px;
    height: 12px;
  }

  .hotpoint-number {
    width: 40px;
    height: 40px;
    font-size: 1.125rem;
  }

  .hotpoint-title {
    font-size: 1.125rem;
  }

  .dimension-card {
    padding: 1.25rem;
  }

  .dimensions-container {
    gap: 1rem;
  }

  .hotpoint-divider {
    margin: 2rem 0;
  }
}

.sequence-number {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.4em; /* 使用 em 单位，使其随字体大小自动放大 */
  height: 1.4em;
  border-radius: 50%; /* 保证圆形 */
  font-weight: 600;
  text-align: center;
  line-height: 1; /* 避免字体撑高 */
  flex-shrink: 0;
}

.sequence-number {
  background: linear-gradient(135deg, #6366f1, #4f46e5);
  color: white;
}

.sequence-number.bg-red-600 {
  background: linear-gradient(135deg, #f43f5e, #e11d48);
}

.sequence-number.bg-orange-500 {
  background: linear-gradient(135deg, #fb923c, #f97316);
}

.sequence-number.bg-yellow-700 {
  background: linear-gradient(135deg, #b89610, #ca9c0e);
}

.hot-title {
  flex: 1;
  text-align: left !important;
  white-space: normal;
  word-break: break-word;
  min-width: 0;
  display: -webkit-box;
  /*标题最多显示行数，0表示不限制*/
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  color: #1e293b;
}


.dark .hot-title {
  color: #e5e7eb;
}


.hot-title-full {
  display: block !important;
  -webkit-line-clamp: unset !important;
  overflow: visible !important;
  -webkit-box-orient: unset !important;
  white-space: normal !important;
  text-decoration: none;
}

.card-title-full {
  display: block !important;
  -webkit-line-clamp: unset !important;
  overflow: visible !important;
  -webkit-box-orient: unset !important;
  white-space: normal !important;
}

/* 加载动画样式*/
.atom-spinner, .atom-spinner * {
  box-sizing: border-box;
}

.atom-spinner {
  height: 3.125rem;
  width: 3.125rem;
  overflow: hidden;
}

.atom-spinner .spinner-inner {
  position: relative;
  display: block;
  height: 100%;
  width: 100%;
}

.atom-spinner .spinner-circle {
  display: block;
  position: absolute;
  color: #ff1d5e;
  font-size: calc(3.75rem * 0.24);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.atom-spinner .spinner-line {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border-left-width: calc(3.75rem / 5);
  border-top-width: calc(3.75rem / 25);
  border-left-color: #ff1d5e;
  border-left-style: solid;
  border-top-style: solid;
  border-top-color: transparent;
}

.atom-spinner .spinner-line:nth-child(1) {
  animation: atom-spinner-animation-1 1s linear infinite;
  transform: rotateZ(120deg) rotateX(66deg) rotateZ(0deg);
}

.atom-spinner .spinner-line:nth-child(2) {
  animation: atom-spinner-animation-2 1s linear infinite;
  transform: rotateZ(240deg) rotateX(66deg) rotateZ(0deg);
}

.atom-spinner .spinner-line:nth-child(3) {
  animation: atom-spinner-animation-3 1s linear infinite;
  transform: rotateZ(360deg) rotateX(66deg) rotateZ(0deg);
}

@keyframes atom-spinner-animation-1 {
  100% {
    transform: rotateZ(120deg) rotateX(66deg) rotateZ(360deg);
  }
}

@keyframes atom-spinner-animation-2 {
  100% {
    transform: rotateZ(240deg) rotateX(66deg) rotateZ(360deg);
  }
}

@keyframes atom-spinner-animation-3 {
  100% {
    transform: rotateZ(360deg) rotateX(66deg) rotateZ(360deg);
  }
}
</style>