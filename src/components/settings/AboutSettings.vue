<!-- 关于我们 -->
<template>
  <div class="min-h-screen pb-16 bg-transparent">
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- HERO -->
      <header class="relative text-center">

        <h1 class="main-title">
          糖果梦热榜 — 聚合全网、洞察趋势
        </h1>

        <div class="main-desc">
          <p class="mt-1">实时聚合多平台热榜、智能排序与清晰呈现，帮助你在信息洪流中快速抓取价值与趋势</p>
          <p class="mt-1">项目用到的所有接口均是官方接口，无任何第三方中转，主打无情铁手</p>
          <p class="mt-1">🎉本项目前后端在GitHub上均已100%开源
            <a class="inline-flex items-center gap-2 px-4 rounded-lg bg-white/5 border border-white/10 text-gray-900 dark:text-gray-100 hover:bg-white/10 transition"
               href="https://github.com/CandyDream6/tgmeng-top-search-frontend" target="_blank" rel="noopener">
              👉开源仓库
            </a>
          </p>
        </div>
        <div class="mt-10 flex justify-center gap-3 flex-wrap">

        </div>
      </header>

      <!-- 数据特性 -->
      <section>
        <!--        <h2 class="text-xl font-bold text-gray-900 dark:text-gray-100">数据特性</h2>-->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
          <div v-for="feature in dataFeatures" :key="feature.name" class="card-bg">
            <p class="card-title">{{ feature.name }}</p>
            <p class="card-title-special">{{ feature.desc }}</p>
          </div>
        </div>
      </section>

      <!-- 平台特性 -->
      <section class="mt-16">
        <h2 class="text-xl font-bold text-gray-900 dark:text-gray-100">平台特性</h2>
        <div class="grid grid-cols-1 md:grid-cols-4 gap-3 mt-8">
          <div v-for="feature in platformFeatures" :key="feature.name" class="card-bg">
            <h3 class="card-title">{{ feature.name }}</h3>
            <p class="card-desc">{{ feature.desc }}</p>
          </div>
        </div>
      </section>

      <!-- 团队与贡献者 -->
      <section class="mt-16">
        <h2 class="text-xl font-bold text-gray-900 dark:text-gray-100">团队与贡献者</h2>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
          <div v-for="member in teamAndContributors" :key="member.name" class="card-bg flex">
            <img class="w-12 h-12 rounded-full" :src="member.avatar" alt="member.name"/>
            <div>
              <div class="card-title">{{ member.name }}</div>
              <div class="card-desc ml-2">{{ member.role }}</div>
            </div>
          </div>
        </div>
      </section>

      <!-- Contact -->
      <section id="contact" class="mt-16">
        <h2 class="text-xl font-bold text-gray-900 dark:text-gray-100">联系与支持</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
          <router-link to="/setting/community" @click="scrollToTop">
            <div class="card-bg">
              <h4 class="card-title">加入交流社区</h4>
              <p class="card-desc">欢迎加入我们的交流社区，与其他用户分享、讨论和交流。</p>
            </div>
          </router-link>
          <a href="https://github.com/CandyDream6/tgmeng-top-search-frontend" target="_blank" rel="noopener">
            <div class="card-bg">
              <h4 class="card-title">技术支持</h4>
              <p class="card-desc">遇到问题或想贡献代码？欢迎到 GitHub 提交 PR 或 Issue。</p>
            </div>
          </a>
        </div>
      </section>

      <!-- 已接入平台横向滚动展示（3行无限循环） -->
      <section class="mt-16">
        <h2 class="text-xl font-bold text-gray-900 dark:text-gray-100">已接入平台</h2>
        <div class="space-y-2 mt-8">
          <div
              v-for="rowIndex in 3"
              :key="rowIndex"
              class="overflow-hidden relative h-24"
              @mouseenter="pauseScroll(rowIndex)"
              @mouseleave="resumeScroll(rowIndex)"
          >
            <div
                class="flex gap-4 flex-nowrap absolute"
                :ref="'platformWrapper' + rowIndex"
                :style="{ transform: `translateX(-${scrollPos[rowIndex - 1]}px)` }"
            >
              <div
                  v-for="(platform,index) in duplicatedPlatforms"
                  :key="rowIndex + '-' + index"
                  class="p-4 flex-shrink-0 w-24 h-24 bg-white dark:bg-dark-card rounded-xl flex items-center justify-center   shadow-sm"
              >
                <img :src="platform.icon" :alt="platform.name" class="object-contain rounded-xl"/>
              </div>
            </div>
          </div>
        </div>
      </section>


      <!-- Timeline 最底部 -->
      <section class="mt-16">
        <h2 class="text-xl font-bold text-gray-900 dark:text-gray-100">项目日志</h2>

        <div class="relative mt-10">
          <div
              class="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-blue-400 to-indigo-500 opacity-60"></div>
          <ul class="space-y-8 pl-12">
            <li v-for="group in visibleTimeline" :key="group.date" class="relative">
              <div
                  class="absolute -left-8 top-1 w-4 h-4 rounded-full bg-white border-2 border-blue-500 shadow-sm"></div>

              <div v-for="item in group.events" :key="item.id" class="card-bg">
                <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                  <div>
                    <div class="text-gray-900 dark:text-gray-100 font-bold text-lg" style="text-align: left">
                      <span class="text-green-600">{{ group.date }}</span>
                      <span class="ml-4 card-title">{{ item.title }}</span>
                    </div>
                    <ul class="mt-1 space-y-1 text-left">
                      <li v-for="(d, i) in item.desc" :key="i" class="card-desc">
                        - {{ d }}
                      </li>
                    </ul>
                  </div>
                  <div class="text-sm text-gray-400 mt-2 sm:mt-0">{{ item.tag }}</div>
                </div>
              </div>
            </li>

            <!-- 展开全部按钮作为最后一个 li -->
            <li class="relative flex justify-start">
              <button @click="toggleTimeline" class="card-desc">
                {{ timelineFolded ? `展开全部 (${timeline.length})` : '折叠' }}
              </button>
            </li>
          </ul>
        </div>
      </section>

    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      platformFeatures: [
        {name: '🚨 实时聚合', desc: '覆盖全网热门平台，实时推送全球最前沿的趋势和事件，确保用户快速获取信息'},
        {name: '🌐 多维度平台覆盖', desc: '支持新闻、社交、媒体、GitHub 等多平台内容聚合，为用户带来全方位的信息洞察'},
        {name: '📊 智能排序', desc: '结合大数据分析和多维度指标，精准输出更具可信度的热度排名，帮助用户更快抓取关键信息'},
        {name: '📱 跨平台响应式设计', desc: '打造极致的跨设备体验，提供完美适配桌面与移动端的界面，随时随地畅享流畅浏览'},
        {name: '⚡ 超高性能', desc: '采用前沿技术优化，提供极速加载和秒级更新，确保任何时刻都流畅不卡顿'},
        {name: '🔒 隐私优先', desc: '坚持“隐私即人权”的理念，绝不追踪用户行为，个性化自定义配置都在浏览器缓存，保障用户数据安全'},
        {name: '🛠️ 开源友好', desc: '专为开发者设计，支持灵活的二次开发与自定义扩展，提供丰富的API接口和插件机制'},
        {name: '🎨 高度样式自定义', desc: '提供全面的自定义功能，用户可以根据个人需求，调整主题色、字体、布局等，打造专属界面，极致符合个性化需求'}
      ],
      teamAndContributors:
          [
            {avatar: require('@/assets/avatars/project/tgmeng.png'), name: '糖果梦', role: '创始人 · 全栈工程师'},
            {avatar: require('@/assets/avatars/project/Jhhgiyv.png'), name: 'Jhhgiyv', role: '优酷Cookie获取方式提供'},
            {avatar: require('@/assets/avatars/project/xi.png'), name: '希', role: '热点列表样式处理'},
          ],
      scrollPos:
          [0, 0, 0], // 每行的滚动位置
      scrollPaused:
          [false, false, false],
      scrollSpeed:
          [2, 1.5, 2.5], // 每行速度可不同
      timelineFolded:
          true,
      // TODO每次更新，这里写一下事件数据
      timeline:
          [
            {
              date: '2025-09-12',
              events: [{
                id: 1,
                title: '接入游戏热榜模块',
                desc: ['新增游戏类数据源（Steam、TapTap）', '支持实时榜单推送。', '支持实时榜单推送。', '支持实时榜单推送。'],
                tag: 'Feature'
              }]
            },
            {
              date: '2025-06-03',
              events: [{
                id: 2,
                title: '样式与深色模式重构',
                desc: ['全站样式重构', '支持更精细的暗黑主题及用户自定义样式。'],
                tag: 'UI'
              }]
            },
            {
              date: '2024-11-20',
              events: [{id: 3, title: '上线 v2.0', desc: ['性能优化', '缓存策略与多源聚合逻辑重写。'], tag: 'Release'}]
            },
            {
              date: '2024-07-01',
              events: [{id: 4, title: '数据源拓展', desc: ['新增微博、Bilibili、知乎等多个内容源。'], tag: 'Data'}]
            },
            {
              date: '2024-07-01',
              events: [{id: 4, title: '数据源拓展', desc: ['新增微博、Bilibili、知乎等多个内容源。'], tag: 'Data'}]
            },
            {
              date: '2024-07-01',
              events: [{id: 4, title: '数据源拓展', desc: ['新增微博、Bilibili、知乎等多个内容源。'], tag: 'Data'}]
            },
            {
              date: '2023-12-10',
              events: [{id: 5, title: '项目启动', desc: ['从一个小工具成长为公开可用的热榜聚合站点。'], tag: 'Init'}]
            },
            {
              date: '2023-05-15',
              events: [{id: 6, title: '首次公开测试', desc: ['邀请首批用户体验并给出反馈。'], tag: 'Beta'}]
            },
          ],
    }
  },
  computed: {
    platforms() {
      return this.platformsData
          .filter((item, index, arr) =>
              arr.findIndex(i => i.icon === item.icon) === index
          );
    },
    platformsData() {
      return this.$store.state.categroies
          .flatMap(c => c.subCategories || [])
          .map(p => ({
            name: p.title,
            icon: p.logo
          }));
    },
    dataFeatures() {
      return [
        {name: '已接入平台', desc: this.platformsData.length/2},
        {name: '日均抓取热点', desc: this.platformsData.length * 50 * 60 * 24 + '+'},
        {name: '更新频率', desc: '分钟级'},
      ];
    },
    visibleTimeline() {
      return this.timelineFolded ? this.timeline.slice(0, 4) : this.timeline
    },
    duplicatedPlatforms() {
      return [...this.platforms, ...this.platforms, ...this.platforms]
    }
  },
  mounted() {
    this.startScroll()
  },
  methods: {
    toggleTimeline() {
      this.timelineFolded = !this.timelineFolded
    },
    startScroll() {
      const step = () => {
        for (let i = 0; i < 3; i++) {
          if (!this.scrollPaused[i]) {
            this.scrollPos[i] += this.scrollSpeed[i];
            const wrapper = this.$refs['platformWrapper' + (i + 1)][0];
            if (wrapper) {
              const firstWidth = wrapper.children[0].offsetWidth + parseInt(getComputedStyle(wrapper.children[0]).marginRight);
              // 确保横向滚动达到平台总宽度后从头开始滚动
              if (this.scrollPos[i] >= firstWidth * this.platforms.length) {
                this.scrollPos[i] = 0;
              }
            }
          }
        }
        requestAnimationFrame(step);
      }
      requestAnimationFrame(step)
    },
    pauseScroll(rowIndex) {
      this.scrollPaused[rowIndex - 1] = true
    },
    resumeScroll(rowIndex) {
      this.scrollPaused[rowIndex - 1] = false
    },
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
}
</script>

<style scoped>
@keyframes blob {
  0% {
    transform: translateY(0) scale(1);
  }
  33% {
    transform: translateY(-8px) scale(1.03);
  }
  66% {
    transform: translateY(4px) scale(0.98);
  }
  100% {
    transform: translateY(0) scale(1);
  }
}

.animate-blob {
  animation: blob 8s infinite ease-in-out;
}

.animation-delay-2000 {
  animation-delay: 2s;
}

:root {
  --dark-card: #0b1220;
}

.dark .dark\:bg-dark-card {
  background-color: var(--dark-card);
}

.relative > ul > li {
  list-style: none;
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.main-title {
  @apply mt-6 text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight text-gray-900 dark:text-gray-100
}

.main-desc {
  @apply mt-6 max-w-3xl mx-auto text-gray-600 dark:text-gray-300
}

.card-bg {
  @apply p-4 rounded-xl bg-gradient-to-r from-indigo-600/10 to-pink-600/10 border border-transparent
  dark:border-transparent shadow-sm hover:shadow-lg transition transform hover:-translate-y-1;
}

.card-title {
  @apply font-semibold text-gray-900 dark:text-gray-100
}

.card-title-special {
  @apply text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mt-2
}

.card-desc {
  @apply text-sm text-gray-500 dark:text-gray-400 mt-1
}
</style>
