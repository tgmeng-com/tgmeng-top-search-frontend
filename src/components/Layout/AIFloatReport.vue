<template>
  <div>
    <div>
      <!-- 风格1: 旋转光环 -->
      <AIFloatButton1
          text="AI实时简报"
          :size="60"
          position="top-right"
          :offset="100"
          @click="clickAISummaryButton"

      />
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
          <div class="space-y-6 categroyTitle">
            <div class="text-center">
              <div class="overflow-x-auto whitespace-nowrap scrollbar-hide w-full text-center">
                <div class="text-3xl text-yellow-600 dark:text-yellow-500 inline-block font-semibold py-1">
                  <span>AI实时简报</span>
                </div>
              </div>
              <div
                  class="overflow-x-auto scrollbar-hide flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <!-- 左侧：统计数据（移动端换行显示） -->
                <div
                    class="mt-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap overflow-x-auto scrollbar-hide">
                  <span
                      class="text-sm px-2 py-1 rounded-md bg-gray-300 dark:bg-gray-600 text-gray-600 dark:text-gray-300">
                    简报数据生成时间: <span class="font-medium">{{ aiData?.time || '暂无' }}</span>
                  </span>&nbsp;
                </div>
              </div>
              <div
                  class="overflow-x-auto scrollbar-hide flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <!-- 左侧：统计数据（移动端换行显示） -->
                <div
                    class="mt-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap overflow-x-auto scrollbar-hide">
                  <span
                      class="text-sm px-2 py-1 rounded-md bg-gray-300 dark:bg-gray-600 text-gray-600 dark:text-gray-300">
                    使用AI平台: <span class="font-medium">{{ aiData?.platform || '暂无' }}</span>
                  </span>&nbsp;
                  <span
                      class="text-sm px-2 py-1 rounded-md bg-gray-300 dark:bg-gray-600 text-gray-600 dark:text-gray-300">
                    使用AI模型: <span class="font-medium">{{ aiData?.model || '暂无' }}</span>
                  </span>&nbsp;
                  <span
                      class="text-sm px-2 py-1 rounded-md bg-gray-300 dark:bg-gray-600 text-gray-600 dark:text-gray-300">
                    模型KEY来源: <span class="font-medium">{{ aiData?.from || '暂无' }}</span>
                  </span>&nbsp;
                </div>
              </div>

              <div
                  class="overflow-x-auto scrollbar-hide flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <!-- 左侧：统计数据（移动端换行显示） -->
                <div
                    class="mt-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap overflow-x-auto scrollbar-hide">
                  <span
                      class="text-sm px-2 py-1 rounded-md bg-gray-300 dark:bg-gray-600 text-gray-600 dark:text-gray-300">
                    说明: 简报数据是根据当前站内所有平台的数万个实时热点数据，经过AI分析处理总结后呈现，数据每5分钟刷新一次，数据模型KEY均由社区佬友提供，感谢各位，一起为开源助力！
                  </span>&nbsp;
                </div>
              </div>
            </div>
            <div v-if="loading" class="flex flex-col items-center justify-center text-gray-400">
              <div class="atom-spinner">
                <div class="spinner-inner">
                  <div class="spinner-line"></div>
                  <div class="spinner-line"></div>
                  <div class="spinner-line"></div>
                  <div class="spinner-circle">&#9679;</div>
                </div>
              </div>
              <span>AI实时简报获取中...</span>
            </div>
            <div v-if="!loading">
              <div v-if="aiData && aiData.length">
                <div
                    v-for="(itemCat, index) in aiData.result"
                    :key="index"
                    :class="[
                          'mb-8 bg-gray-300 dark:bg-gray-700 rounded-2xl p-6 shadow-sm border-l-4',
                          getBorderClass(index)
                        ]"
                >
                  <h3
                      :class="[
                        'text-lg font-semibold  mb-4 flex items-center',
                        getTextClass(index)]"
                      :style="categroiesTitleStyle">
                    {{ itemCat.categroy }}
                  </h3>
                  <div class="space-y-2">
                    <div
                        v-for="(itemData, dataIndex) in itemCat.data"
                        :key="dataIndex"
                        class="bg-gray-200 dark:bg-gray-600 p-4 rounded-2xl border border-gray-200 dark:border-gray-600"
                    >
                      <h4 class="font-semibold text-gray-900 dark:text-white mb-2 text-sm" :style="cardTopStyle">
                        {{ itemData.title }}
                      </h4>
                      <p class="text-gray-600 dark:text-gray-300 text-xs leading-relaxed" :style="cardTitleStyle">
                        {{ itemData.content }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
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
            <el-button @click="showModal = false">关闭</el-button>
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
        // 'sky-500',
      ],
      // 模拟 AI 简报数据
      aiData: {
        "time": "2020/7/8 20:20:20",
        "platform": "deepseek",
        "model": "3.5",
        "from": "群友",
        "result": [{
          "categroy": "内容概括",
          "data": [
            {
              "title": "OpenAI发布新一代GPT-5模型",
              "content": "OpenAI正式发布GPT-5，I正式发布GPT-5，在推理能力、多模态理解和创造性方面有显著提升I正式发布GPT-5，在推理能力、多模态理解和创造性方面有显著提升I正式发布GPT-5，在推理能力、多模态理解和创造性方面有显著提升在推理能力、多模态理解和创造性方面有显著提升，引发行业广泛关注。",
            },
            {
              "title": "全球人工智能安全峰会召开",
              "content": "多国代表齐聚伦敦，讨论AI安全治I正式发布GPT-5，在推理能力、多模态理解和创造性方面有显著提升I正式发布GPT-5，在推理能力、多模态理解和创造性方面有显著提升I正式发布GPT-5，在推理能力、多模态理解和创造性方面有显著提升理框架，就AI风险评估和监管达成初步共识。",
            },
            {
              "title": "全球人工智能安全峰会召开",
              "content": "多国代表齐聚伦敦，讨论AI安全治理框架，就AI风险评估和监管达成初步共识。",
            },
            {
              "title": "全球人工智能安全峰会召开",
              "content": "多国代表齐聚伦敦，讨论AI安全I正式发布GPT-5，在推理能力、多模态理解和创造性方面有显著提升I正式发布GPT-5，在推理能力、多模态理解和创造性方面有显著提升治理框架，就AI风险评估和监管达成初步共识。",
            },
            {
              "title": "全球人工智能安全峰会召开",
              "content": "多国代表齐聚伦敦，讨论AI安全治理框架，就AI风险评估和监管达成初步共识。",
            },
          ]
        }],
      }
    }
  },
  methods: {
    getBorderClass(index) {
      const color = this.colors[index % this.colors.length]
      return `border-${color}`
    }
    ,
    getTextClass(index) {
      const color = this.colors[index % this.colors.length]
      return `text-${color}`
    },
    getBgClass(index) {
      const color = this.colors[index % this.colors.length]
      return `bg-${color}`
    },
    clickAISummaryButton() {
      window.umami.track('🔎AI实时简报按钮')
      this.showModal = true;
      this.loading = true;
      cacheSearchForAISummaryData()
          .then(res => {
            this.aiData = typeof res?.data?.data === "string" ? JSON.parse(res.data.data) : (res?.data?.data || [])
          }).finally(() => {
        this.loading = false;
      })
    }
  }
  ,
  computed: {
    cardTopFontSize: {
      get() {
        return this.$store.state.cardTopFontSize;
      }
      ,
      set(value) {
        this.$store.commit('setCardTopFontSize', value);
      }
    }
    ,
    cardTopStyle() {
      return {
        fontSize: this.cardTopFontSize + 'rem',
      }
    }
    ,
    cardTitleFontSize: {
      get() {
        return this.$store.state.cardTitleFontSize;
      }
      ,
      set(value) {
        this.$store.commit('setCardTitleFontSize', value);
      }
    }
    ,
    cardTitleStyle() {
      return {
        fontSize: this.cardTitleFontSize + 'rem',
      }
    }
    ,
    categroiesTitleFontSize: {
      get() {
        return this.$store.state.categroiesTitleFontSize;
      }
      ,
      set(value) {
        this.$store.commit('setCategroiesTitleFontSize', value);
      }
    }
    ,
    categroiesTitleStyle() {
      return {
        fontSize: this.categroiesTitleFontSize + 'rem',
        fontWeight: 900,
      }
    }
    ,
  }
}
</script>

<style>

.el-dialog {
  width: 50% !important;
  background-color: rgb(230 230 230);
  border-radius: 1rem;
  margin-top: 2rem;
}

.dark .el-dialog {
  width: 50% !important;
  background-color: rgb(36 47 65);
  border-radius: 1rem;
  margin-top: 2rem;
}

/* 大屏幕保持 60% */
@media (min-width: 1025px) {
  .el-dialog {
    width: 50% !important;
    border-radius: 1rem !important;
    margin-top: 2rem !important;
  }
}

@media (min-width: 1025px) {
  .dark .el-dialog {
    width: 50% !important;
    border-radius: 1rem !important;
    margin-top: 2rem !important;
  }
}

/* 平板 80% */
@media (max-width: 1024px) {
  .el-dialog {
    width: 70% !important;
    border-radius: 1rem !important;
    margin-top: 2rem !important;
  }
}

@media (max-width: 1024px) {
  .dark .el-dialog {
    width: 70% !important;
    border-radius: 1rem !important;
    margin-top: 2rem !important;
  }
}

/* 手机 95% */
@media (max-width: 768px) {
  .el-dialog {
    width: 90% !important;
    border-radius: 1rem !important;
    margin-top: 2rem !important;
  }
}

@media (max-width: 768px) {
  .dark .el-dialog {
    width: 90% !important;
    border-radius: 1rem !important;
    margin-top: 2rem !important;
  }
}

.categroyTitle {
  text-align: left;
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