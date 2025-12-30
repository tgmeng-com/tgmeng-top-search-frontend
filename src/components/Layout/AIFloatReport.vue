<template>
  <div>
    <div>
      <!-- 可拖动的AI浮动按钮 -->
      <div
          ref="floatButton"
          class="fixed pointer-events-auto cursor-move z-[2100] transition-all"
          :style="buttonStyle"
          @mousedown="handleMouseDown"
          @touchstart="handleTouchStart"
      >
        <AIFloatButton1
            text="AI实时简报"
            :size="buttonSize"
            position="custom"
            @click="handleButtonClick"
        />
      </div>
    </div>

    <!-- 弹框 -->
    <div>
      <el-dialog
          v-model="showModal"
          :show-close="false"
          :close-on-click-modal="true"
          :close-on-press-escape="true"
          align-center
      >
        <!-- 简报内容 -->
        <div class="min-h-96">
          <div class="space-y-6">
            <!-- 头部标题区域 -->
            <div class="text-center space-y-4">
              <!-- 主标题 -->
              <div class="relative">
                <h1 class="text-4xl md:text-5xl font-black bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 dark:from-yellow-300 dark:via-orange-400 dark:to-pink-400 bg-clip-text text-transparent py-2">
                  AI实时简报
                </h1>
                <div
                    class="absolute -top-2 -right-2 w-20 h-20 bg-yellow-400/20 dark:bg-yellow-500/20 rounded-full blur-2xl"></div>
                <div
                    class="absolute -bottom-2 -left-2 w-16 h-16 bg-pink-400/20 dark:bg-pink-500/20 rounded-full blur-2xl"></div>
              </div>

              <!-- 第一行：时间和Token -->
              <div class="flex flex-wrap justify-center gap-2 md:gap-3">
                <div class="info-badge from-fuchsia-500 to-fuchsia-600 dark:from-fuchsia-600 dark:to-fuchsia-700">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  <span>简报数据生成时间: {{ aiData?.time || '暂无' }}</span>
                </div>

                <div class="info-badge from-rose-500 to-rose-600 dark:from-rose-600 dark:to-rose-700">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M13 10V3L4 14h7v7l9-11h-7z"/>
                  </svg>
                  <span>本次总结消耗Token: {{ aiData?.totalTokens || '暂无' }}</span>
                </div>
              </div>

              <!-- 第二行：平台、模型、来源 -->
              <div class="flex flex-wrap justify-center gap-2 md:gap-3">
                <div class="info-badge from-pink-500 to-pink-600 dark:from-pink-600 dark:to-pink-700">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"/>
                  </svg>
                  <span>使用AI平台: {{ aiData?.platform || '暂无' }}</span>
                </div>

                <div class="info-badge from-yellow-500 to-yellow-600 dark:from-yellow-600 dark:to-yellow-700">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
                  </svg>
                  <span>使用AI模型: {{ aiData?.model || '暂无' }}</span>
                </div>

                <div class="info-badge from-cyan-500 to-cyan-600 dark:from-cyan-600 dark:to-cyan-700">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                  </svg>
                  <span>模型KEY来源: {{ aiData?.from || '暂无' }}</span>
                </div>
              </div>

              <!-- 说明卡片 -->
              <div
                  class="relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-500/10 via-emerald-500/10 to-teal-500/10 dark:from-green-500/20 dark:via-emerald-500/20 dark:to-teal-500/20 p-4 backdrop-blur-sm border border-white/20 dark:border-white/10">
                <div class="flex items-start gap-3 text-left">
                  <div class="flex-shrink-0 mt-1">
                    <svg class="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor"
                         viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>
                  <p class="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                    说明: 简报数据是根据当前站内所有平台的数万个实时热点数据，经过AI分析处理总结后呈现，数据每5分钟刷新一次，数据模型KEY均由社区佬友提供，感谢各位，一起为开源助力！
                  </p>
                </div>
                <div
                    class="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-400/20 to-emerald-400/20 rounded-full blur-3xl"></div>
              </div>
            </div>

            <!-- 加载状态 -->
            <div v-if="loading" class="flex flex-col items-center justify-center py-16">
              <div class="atom-spinner">
                <div class="spinner-inner">
                  <div class="spinner-line"></div>
                  <div class="spinner-line"></div>
                  <div class="spinner-line"></div>
                  <div class="spinner-circle">&#9679;</div>
                </div>
              </div>
              <span class="mt-4 text-gray-600 dark:text-gray-400 font-medium">AI实时简报获取中...</span>
            </div>

            <!-- 内容区域 - 三列布局 -->
            <div v-if="!loading">
              <div v-if="aiData">
                <!-- 三列网格布局 -->
                <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div
                      v-for="(cat) in categoryList"
                      :key="cat.key"
                      class="group relative"
                  >
                    <!-- 分类卡片 -->
                    <div
                        :class="[
                            'relative overflow-hidden rounded-3xl p-6 transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] h-full',
                            'bg-gradient-to-br backdrop-blur-sm border',
                            getCategoryGradient(cat.colorIndex)
                          ]"
                    >
                      <!-- 装饰性背景 -->
                      <div class="absolute top-0 right-0 w-64 h-64 opacity-20 rounded-full blur-3xl"
                           :class="getBgClass(cat.colorIndex)"></div>

                      <!-- 分类标题 -->
                      <div class="relative mb-6">
                        <div class="flex items-center gap-3">
                          <div :class="['w-1.5 h-8 rounded-full', getBgClass(cat.colorIndex)]"></div>
                          <h3
                              :class="['text-2xl font-black', getTextClass(cat.colorIndex)]"
                              :style="categroiesTitleStyle"
                          >
                            {{ cat.title }}
                          </h3>
                        </div>
                      </div>

                      <!-- 内容列表 -->
                      <div class="space-y-4 relative">
                        <!-- 判断是否有数据 -->
                        <div v-if="aiData?.data?.[cat.key]?.length === 0" class="text-center py-8 text-gray-500 dark:text-gray-400">
                          暂无内容
                        </div>

                        <div
                            v-for="(itemData, dataIndex) in aiData?.data?.[cat.key]"
                            :key="dataIndex"
                            class="group/item relative overflow-hidden rounded-2xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-md p-5 border border-white/40 dark:border-gray-700/40 transition-all duration-300 hover:shadow-xl hover:scale-[1.01] hover:bg-white/80 dark:hover:bg-gray-800/80"
                        >
                          <!-- 序号标签 -->
                          <div
                              class="absolute top-4 left-3 w-8 h-8 rounded-full bg-gradient-to-br flex items-center justify-center text-white text-xs font-bold shadow-lg"
                              :class="getNumberBadgeClass(cat.colorIndex)"
                          >
                            {{ dataIndex + 1 }}
                          </div>

                          <!-- 标题 -->
                          <h4 class="text-left pl-10 font-bold text-gray-900 dark:text-white mb-3 leading-relaxed"
                              :style="cardTopStyle">
                            {{ itemData.title }}
                          </h4>

                          <!-- 内容 -->
                          <p class="text-gray-700 dark:text-gray-300 leading-loose text-left" :style="cardTitleStyle">
                            {{ itemData.content }}
                          </p>

                          <!-- 底部装饰线 -->
                          <div
                              class="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r opacity-0 group-hover/item:opacity-100 transition-opacity duration-300"
                              :class="getGradientClass(cat.colorIndex)"
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- 空状态 -->
              <div v-else>
                <EmptyData
                    :title="emptyDataTitle"
                    :description="emptyDataDescription"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- 底部操作按钮 -->
        <template #footer>
          <div class="flex justify-end">
            <button @click="showModal = false"
                    class="px-6 py-2.5 rounded-xl bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white font-medium transition-all duration-300 hover:shadow-lg hover:scale-105">
              关闭
            </button>
          </div>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {cacheSearchForAISummaryData} from "@/api/api";
import AiFloatButton from "@/components/UI/AIFloatButton.vue";
import EmptyData from "@/components/UI/EmptyData.vue";
import store from "@/store";

export default {
  components: {
    EmptyData,
    AIFloatButton1: AiFloatButton,
  },
  data() {
    return {
      emptyDataTitle: "AI模型额度已用尽，请检查",
      emptyDataDescription:
          "今天的算力小马达已经跑满啦！\n" +
          "这个项目所有的 AI 功能，都是靠社区里的大佬们偷偷塞给我的 Key 才跑起来的（感动到飞起）\n" +
          "如果您也碰巧有闲置的 Key，愿意投喂一下这个小破站，\n" +
          "我代表所有用户给您跪了！\n" +
          "哪怕只是一把 Key，也能让成千上万的人继续免费玩 AI～\n" +
          "您就是当代活雷锋！",
      loading: false,
      showModal: false,
      colors: [
        'emerald-500',
        'cyan-500',
        'pink-500',
        'teal-500',
      ],
      isDragging: false,
      dragStartX: 0,
      dragStartY: 0,
      dragStartPosX: 0,
      dragStartPosY: 0,
      position: {
        x: 120,
        y: 120
      },
      dragThreshold: 5,
      aiData: {
        "time": "🚀",
        "platform": "🚀",
        "model": "🚀",
        "from": "🚀",
        "totalTokens": "🚀",
        "data": {
          "summary": [],
          "analyze": [],
          "future": []
        }
      }
    }
  },
  mounted() {
    this.position.x = window.innerWidth - this.buttonSize - 30;
    this.position.y = 150;
    window.addEventListener('resize', this.handleResize);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.handleResize);
    window.removeEventListener('mousemove', this.handleMouseMove);
    window.removeEventListener('mouseup', this.handleMouseUp);
    window.removeEventListener('touchmove', this.handleTouchMove);
    window.removeEventListener('touchend', this.handleTouchEnd);
  },
  computed: {
    categoryList() {
      return [
        { key: 'summary', title: '内容概括', colorIndex: 0 },
        { key: 'analyze', title: '趋势分析', colorIndex: 1 },
        { key: 'future',  title: '未来预测', colorIndex: 2 }
      ];
    },
    buttonSize() {
      return window.innerWidth < 768 ? 50 : 60;
    },
    buttonStyle() {
      return {
        left: `${this.position.x}px`,
        top: `${this.position.y}px`,
        transition: this.isDragging ? 'none' : 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      };
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
    categroiesTitleFontSize: {
      get() {
        return this.$store.state.categroiesTitleFontSize;
      },
      set(value) {
        this.$store.commit('setCategroiesTitleFontSize', value);
      }
    },
    categroiesTitleStyle() {
      return {
        fontSize: this.categroiesTitleFontSize + 'rem',
        fontWeight: 900,
      }
    },
  },
  methods: {
    getCategoryGradient(index) {
      const gradients = [
        'from-emerald-50/90 to-teal-50/90 dark:from-emerald-900/30 dark:to-teal-900/30 border-emerald-200/50 dark:border-emerald-700/50',
        'from-cyan-50/90 to-blue-50/90 dark:from-cyan-900/30 dark:to-blue-900/30 border-cyan-200/50 dark:border-cyan-700/50',
        'from-pink-50/90 to-rose-50/90 dark:from-pink-900/30 dark:to-rose-900/30 border-pink-200/50 dark:border-pink-700/50',
        'from-purple-50/90 to-indigo-50/90 dark:from-purple-900/30 dark:to-indigo-900/30 border-purple-200/50 dark:border-purple-700/50',
      ];
      return gradients[index % gradients.length];
    },
    getGradientClass(index) {
      const gradients = [
        'from-emerald-400 via-teal-400 to-cyan-400',
        'from-cyan-400 via-blue-400 to-indigo-400',
        'from-pink-400 via-rose-400 to-red-400',
        'from-purple-400 via-violet-400 to-indigo-400',
      ];
      return gradients[index % gradients.length];
    },
    getNumberBadgeClass(index) {
      const classes = [
        'from-emerald-500 to-teal-600',
        'from-cyan-500 to-blue-600',
        'from-pink-500 to-rose-600',
        'from-purple-500 to-indigo-600',
      ];
      return classes[index % classes.length];
    },
    getBorderClass(index) {
      const color = this.colors[index % this.colors.length];
      return `border-${color}`;
    },
    getTextClass(index) {
      const color = this.colors[index % this.colors.length];
      return `text-${color}`;
    },
    getBgClass(index) {
      const color = this.colors[index % this.colors.length];
      return `bg-${color}`;
    },
    handleMouseDown(e) {
      e.preventDefault();
      this.startDrag(e.clientX, e.clientY);
      window.addEventListener('mousemove', this.handleMouseMove);
      window.addEventListener('mouseup', this.handleMouseUp);
    },
    handleMouseMove(e) {
      this.drag(e.clientX, e.clientY);
    },
    handleMouseUp(e) {
      this.endDrag(e.clientX, e.clientY);
      window.removeEventListener('mousemove', this.handleMouseMove);
      window.removeEventListener('mouseup', this.handleMouseUp);
    },
    handleTouchStart(e) {
      const touch = e.touches[0];
      this.startDrag(touch.clientX, touch.clientY);
      window.addEventListener('touchmove', this.handleTouchMove, {passive: false});
      window.addEventListener('touchend', this.handleTouchEnd);
    },
    handleTouchMove(e) {
      e.preventDefault();
      const touch = e.touches[0];
      this.drag(touch.clientX, touch.clientY);
    },
    handleTouchEnd(e) {
      const touch = e.changedTouches[0];
      this.endDrag(touch.clientX, touch.clientY);
      window.removeEventListener('touchmove', this.handleTouchMove);
      window.removeEventListener('touchend', this.handleTouchEnd);
    },
    startDrag(clientX, clientY) {
      this.isDragging = true;
      this.dragStartX = clientX;
      this.dragStartY = clientY;
      this.dragStartPosX = this.position.x;
      this.dragStartPosY = this.position.y;
    },
    drag(clientX, clientY) {
      if (!this.isDragging) return;
      const deltaX = clientX - this.dragStartX;
      const deltaY = clientY - this.dragStartY;
      let newX = this.dragStartPosX + deltaX;
      let newY = this.dragStartPosY + deltaY;
      const maxX = window.innerWidth - this.buttonSize;
      const maxY = window.innerHeight - this.buttonSize;
      newX = Math.max(0, Math.min(newX, maxX));
      newY = Math.max(0, Math.min(newY, maxY));
      this.position.x = newX;
      this.position.y = newY;
    },
    endDrag(clientX, clientY) {
      if (!this.isDragging) return;
      const deltaX = clientX - this.dragStartX;
      const deltaY = clientY - this.dragStartY;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      this.isDragging = false;
      if (distance < this.dragThreshold) {
        this.clickAISummaryButton();
      }
    },
    handleButtonClick() {
    },
    handleResize() {
      const maxX = window.innerWidth - this.buttonSize;
      const maxY = window.innerHeight - this.buttonSize;
      this.position.x = Math.max(0, Math.min(this.position.x, maxX));
      this.position.y = Math.max(0, Math.min(this.position.y, maxY));
    },
    clickAISummaryButton() {
      window.umami.track('AI实时简报按钮');
      this.showModal = true;
      this.loading = true;
      cacheSearchForAISummaryData()
          .then(res => {
            const data = res?.data?.data || false
            if (data && res.data.code !== 999) {
              this.aiData = data;
            } else {
              this.aiData = null
              if (res.data.code === 999) {
                // this.$message.error(res.data.message);
                store.commit('setLicenseShow', true)
              }
            }
          }).finally(() => {
        this.loading = false;
      })
    }
  }
}
</script>

<style scoped>
/* 信息徽章样式 */
.info-badge {
  @apply inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white text-sm font-semibold shadow-lg;
  @apply bg-gradient-to-r transition-all duration-300;
  @apply hover:shadow-xl hover:scale-105;
}

/* 对话框样式 */
:deep(.el-dialog) {
  width: 90% !important;
  border-radius: 1.5rem !important;
  margin-top: 2rem;
}

:deep(.dark .el-dialog) {
  width: 90% !important;
  border-radius: 1.5rem !important;
  margin-top: 2rem;
}

@media (min-width: 1025px) {
  .el-dialog {
    width: 90% !important;
  }

  .dark .el-dialog {
    width: 90% !important;
  }
}

@media (max-width: 1024px) {
  .el-dialog {
    width: 90% !important;
  }

  .dark .el-dialog {
    width: 90% !important;
  }
}

@media (max-width: 768px) {
  .el-dialog {
    width: 90% !important;
  }

  .dark .el-dialog {
    width: 90% !important;
  }
}

/* 加载动画 */
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
  top: 90%;
  left: 90%;
  transform: translate(-90%, -90%);
}

.atom-spinner .spinner-line {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 90%;
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