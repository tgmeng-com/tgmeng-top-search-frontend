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
            <div class="text-left ml-4">
              <div class="card-title">{{ member.name }}</div>
              <div class="card-desc">{{ member.role }}</div>
              <div class="card-desc">{{ member.work }}</div>
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
                        ·&nbsp;{{ d }}
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
        {
          name: '🔒 隐私优先',
          desc: '坚持“隐私即人权”的理念，绝不追踪用户行为，个性化自定义配置都在浏览器缓存，保障用户数据安全'
        },
        {name: '🛠️ 开源友好', desc: '专为开发者设计，支持灵活的二次开发与自定义扩展，提供丰富的API接口和插件机制'},
        {
          name: '🎨 高度样式自定义',
          desc: '提供全面的自定义功能，用户可以根据个人需求，调整主题色、字体、布局等，打造专属界面，极致符合个性化需求'
        },
        {
          name: '🤖 AI总结分析与预测',
          desc: '利用人工智能和机器学习算法，从海量数据中提炼出关键信息，自动生成趋势分析报告，为用户提供精准的未来趋势预测'
        },
        {
          name: '🔔 订阅推送',
          desc: '支持多平台订阅推送（如 钉钉、飞书、telegram 等），实时接收个性化的通知和更新，确保用户随时获取感兴趣的信息，提升信息获取效率'
        }
      ],
      teamAndContributors:
          [
            {
              avatar: require('@/assets/avatars/project/tgmeng.png'),
              name: '糖果梦',
              role: '先生',
              work: '糖果梦热榜缔造者',
              link: ''
            },
            {
              avatar: require('@/assets/avatars/project/Jhhgiyv.png'),
              name: 'Jhhgiyv',
              role: '热心佬友',
              work: '优酷Cookie获取方式提供',
              link: ''
            },
            {
              avatar: require('@/assets/avatars/project/xi.png'),
              name: '希',
              role: 'Fluid群友',
              work: '热点列表样式处理',
              link: ''
            },
            {
              avatar: require('@/assets/avatars/project/jiangxinbixin.png'),
              name: '将心比心',
              role: '糖果梦群友',
              work: '提供AI实时简报功能开发过程中DeepSeek的deepseek-chat模型的key测试。提供Gotify测试期间的Gotify服务',
              link: ''
            },
            {
              avatar: require('@/assets/avatars/project/ouyangqiqi.png'),
              name: '欧阳淇淇',
              role: '黑与白公益站站长',
              work: '提供大语言模型Key源解决方案;提供公益站【黑与白】大模型免费调用',
              link: ''
            },
            {
              avatar: require('@/assets/avatars/project/alvaishanglexiaohong.png'),
              name: '阿绿爱上了小红',
              role: '糖果梦群友',
              work: '提供移动端UI设计思路：热点列表横向滚动，极大提升了移动端用户体验',
              link: ''
            },
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
              date: '2025/12/18 23:00',
              events: [{
                id: 1, title: '新增功能', desc: ['新增智源社区、量子位、新智元、NodeLoc'], tag: 'Feat'
              }]
            },
            {
              date: '2025/12/18 02:00',
              events: [{
                id: 1, title: '新增功能', desc: ['新增21个游戏平台'], tag: 'Feat'
              }]
            },
            {
              date: '2025/12/15 13:00',
              events: [{
                id: 1, title: '优化功能', desc: ['卡片时间更改为动态相对时间'], tag: 'Feat'
              }]
            },
            {
              date: '2025/12/15 06:55',
              events: [{
                id: 1, title: '新增功能', desc: ['新增阿里云社区、腾讯云社区、美团社区'], tag: 'Feat'
              }]
            },
            {
              date: '2025/12/09 08:30',
              events: [{
                id: 1, title: '新增功能', desc: ['新增企业微信订阅推送'], tag: 'Feat'
              }]
            },
            {
              date: '2025/12/09 02:20',
              events: [{
                id: 1, title: '新增功能', desc: ['移动端卡片横向/竖向滚动可以自定义切换；横向滚动每次记住滚动的位置，切换分类后会回到原来的位置'], tag: 'Feat'
              }]
            },
            {
              date: '2025/12/08 18:20',
              events: [{
                id: 1, title: '新增优化', desc: ['移动端卡片改为左右滑动;移动端卡片可以调整宽度;顶部滚动字体可关闭显示'], tag: 'Feat'
              }]
            },
            {
              date: '2025/12/08 08:20',
              events: [{
                id: 1, title: '新增功能', desc: ['新增订阅推送：支持飞书、钉钉、TG'], tag: 'Feat'
              }]
            },
            {
              date: '2025/12/06 08:20',
              events: [{
                id: 1, title: '新增功能', desc: ['新增词云可直接点击触发搜索'], tag: 'Feat'
              }]
            },
            {
              date: '2025/12/06 07:20',
              events: [{
                id: 1, title: '新增功能', desc: ['搜索框添加历史记录功能，点击可直接进行搜索'], tag: 'Feat'
              }]
            },
            {
              date: '2025/12/06 06:20',
              events: [{
                id: 1, title: '新增功能', desc: ['新增数个财经类'], tag: 'Feat'
              }]
            },
            {
              date: '2025/12/06 00:20',
              events: [{
                id: 1, title: '新增功能', desc: ['新增数个新闻、媒体、游戏平台'], tag: 'Feat'
              }]
            },
            {
              date: '2025/12/05 08:20',
              events: [{
                id: 1, title: '新增功能', desc: ['新增20个科技社区'], tag: 'Feat'
              }]
            },
            {
              date: '2025/12/05 02:20',
              events: [{
                id: 1, title: '新增功能', desc: ['新增13个社区：吾爱破解、水木社区、虫部落、先知社区、宽带山、看雪、通信人家园、Emacs China、Ruby China、凯迪网、We Are Seller、开源资讯、经管之家'], tag: 'Feat'
              }]
            },
            {
              date: '2025/12/04 02:50',
              events: [{
                id: 1, title: '新增功能', desc: ['新增支持客户端安装，新增支持一键屏蔽广告'], tag: 'Feat'
              }]
            },
            {
              date: '2025/11/29 18:10',
              events: [{
                id: 1, title: '新增功能', desc: ['实时简报按钮可拖动'], tag: 'Feat'
              }]
            },
            {
              date: '2025/11/29 10:10',
              events: [{
                id: 1, title: '新增功能', desc: ['新增vscode摸鱼模式'], tag: 'Feat'
              }]
            },
            {
              date: '2025/11/27 21:15',
              events: [{
                id: 1, title: '新增功能', desc: ['新增自定义设置：边距缩进、词云数量、词云展示、访问量展示'], tag: 'Feat'
              }]
            },
            {
              date: '2025/11/26 23:40',
              events: [{
                id: 1, title: '新增功能', desc: ['新增支持RSS，支持全部、分类、平台单独订阅'], tag: 'Feat'
              }]
            },
            {
              date: '2025/11/25 22:16',
              events: [{
                id: 1, title: '新增功能', desc: ['新增Excel摸鱼模式可以进行页面样式自定义，包括字体大小、粗细等'], tag: 'Feat'
              }]
            },
            {
              date: '2025/11/25 06:45',
              events: [{
                id: 1, title: '新增功能', desc: ['新增Excel摸鱼模式', '前端样式调整'], tag: 'Feat'
              }]
            },
            {
              date: '2025/11/23 14:01',
              events: [{
                id: 1, title: '新增功能', desc: ['新增AI实时简报', '重构整套缓存逻辑'], tag: 'Feat'
              }]
            },
            {
              date: '2025/11/20 11:18',
              events: [{
                id: 1, title: '新增功能', desc: ['新增全网实时热点词云', '新增全网实时热点检索功能'], tag: 'Feat'
              }]
            },
            {
              date: '2025/11/19 06:15',
              events: [{
                id: 1,
                title: '整体布局重构',
                desc: ['设置方式重构', '新增关于我们页面', '新增基础设置页面', '新增加群交流页面'],
                tag: 'Feat'
              }]
            },
            {
              date: '2025/11/17 23:28',
              events: [{
                id: 1, title: '新增平台', desc: ['新增澎湃新闻'], tag: 'Feat'
              }]
            },
            {
              date: '2025/11/17 20:36',
              events: [{
                id: 2, title: '新增自定义', desc: ['增加分类名称在内的诸多可自定义项'], tag: 'Feat'
              }]
            },
            {
              date: '2025/11/17 02:45',
              events: [{id: 3, title: '路由方式改变', desc: ['整体路由方式重写，方便后续新页面添加'], tag: 'Feat'}]
            },
            {
              date: '2025/11/16 11:02',
              events: [{id: 4, title: '新增功能', desc: ['支持自定义分类排序', '支持自定义默认分类'], tag: 'Feat'}]
            },
            {
              date: '2025/11/16 06:42',
              events: [{id: 4, title: '新增平台', desc: ['增加8个健康平台'], tag: 'Feat'}]
            },
            {
              date: '2025/11/16 06:42',
              events: [{id: 4, title: '新增功能', desc: ['新增可自定义标题是否完整显示'], tag: 'Feat'}]
            },
            {
              date: '2025/11/15 21:34',
              events: [{id: 5, title: '新增平台', desc: ['新增几个游戏平台'], tag: 'Feat'}]
            },
            {
              date: '2025/11/14 20:19',
              events: [{id: 6, title: '样式调整', desc: ['小屏幕下自动覆盖已有的列数设置'], tag: 'Style'}]
            },
            {
              date: '2025/11/13 21:31',
              events: [{id: 6, title: '样式调整', desc: ['调整生活分类下排序'], tag: 'Style'}]
            },
            {
              date: '2025/11/13 20:50',
              events: [{
                id: 6,
                title: '功能修改',
                desc: ['豆瓣数据刷新时间改为2-10分钟，因为引入了很多豆瓣榜单，导致瞬时会请求50个接口左右，所以分散一下'],
                tag: 'Feat'
              }]
            },
            {
              date: '2025/11/13 20:29',
              events: [{id: 6, title: '新增平台', desc: ['添加生活分区', '生活分区下新增多个平台'], tag: 'Feat'}]
            },
            {
              date: '2025/11/13 18:40',
              events: [{id: 6, title: '新增功能', desc: ['添加回到顶部按钮'], tag: 'Feat'}]
            },
            {
              date: '2025/11/13 16:02',
              events: [{
                id: 6,
                title: '新增功能',
                desc: ['新增单个卡片可主动刷新获取数据', '整体样式调整'],
                tag: 'Feat'
              }]
            },
            {
              date: '2025/11/13 14:00',
              events: [{id: 6, title: '样式调整', desc: ['自定义卡片样式调整框宽度调整'], tag: 'Style'}]
            },
            {
              date: '2025/11/12 07:05',
              events: [{
                id: 6,
                title: '功能修复',
                desc: ['修复部署时没有JIT模式导致grid列数被tree-shake掉'],
                tag: 'Fix'
              }]
            },
            {
              date: '2025/11/12 06:37',
              events: [{
                id: 6,
                title: '新增功能',
                desc: ['新增自定义卡片列数', '新增自定义卡片高度', '新增自定义标题字体大小'],
                tag: 'Feat'
              }]
            },
            {
              date: '2025/11/11 18:24',
              events: [{id: 6, title: '新增平台', desc: ['新增羊毛分类', '新增羊毛分类下多个平台'], tag: 'Feat'}]
            },
            {
              date: '2025/11/11 15:33',
              events: [{
                id: 6,
                title: '功能回滚',
                desc: ['取消每分钟自动刷新，改成每5秒钟只刷新没有请求成功的数据'],
                tag: 'Fix'
              }]
            },
            {
              date: '2025/11/11 02:47',
              events: [{id: 6, title: '新增功能', desc: ['增加定时器，前端定时自动刷新数据'], tag: 'Feat'}]
            },
            {
              date: '2025/11/10 15:33',
              events: [{id: 6, title: '新增功能', desc: ['新增收藏分类'], tag: 'Feat'}]
            },
            {
              date: '2025/11/08 21:43',
              events: [{id: 6, title: '新增平台', desc: ['新增几个论坛平台'], tag: 'Feat'}]
            },
            {
              date: '2025/11/08 11:51',
              events: [{id: 6, title: '功能修改', desc: ['修改卡片为只有顶部可以拖动，卡片内容部分不可拖'], tag: 'Feat'}]
            },
            {
              date: '2025/11/05 00:19',
              events: [{id: 6, title: '新增功能', desc: ['新增支持自定义排序'], tag: 'Feat'}]
            },
            {
              date: '2025/11/04 20:00',
              events: [{id: 6, title: '功能修复', desc: ['修复设置中的全部分类一开始没有加载的问题'], tag: 'Fix'}]
            },
            {
              date: '2025/10/31 0:26',
              events: [{id: 6, title: '新增平台', desc: ['添加8个体育平台'], tag: 'Feat'}]
            },
            {
              date: '2025/10/29 19:21',
              events: [{id: 6, title: '新增平台', desc: ['添加5个科技类型平台'], tag: 'Feat'}]
            },
            {
              date: '2025/10/28 21:44',
              events: [{id: 6, title: '新增平台', desc: ['添加16个设计类平台'], tag: 'Feat'}]
            },
            {
              date: '2025/10/25 20:36',
              events: [{id: 6, title: '新增平台', desc: ['添加4个新闻平台'], tag: 'Feat'}]
            },
            {
              date: '2025/10/24 18:08',
              events: [{id: 6, title: '新增平台', desc: ['添加8个金融平台'], tag: 'Feat'}]
            },
            {
              date: '2025/10/11 14:16',
              events: [{id: 6, title: '功能修复', desc: ['修复猫眼平台数据展示异常问题'], tag: 'Fix'}]
            },
            {
              date: '2025/08/09 19:35',
              events: [{id: 6, title: '新增平台', desc: ['新增猫眼排行榜'], tag: 'Feat'}]
            },
            {
              date: '2025/08/06 17:49',
              events: [{id: 6, title: '新增功能', desc: ['网易云歌单添加作者信息'], tag: 'Feat'}]
            },
            {
              date: '2025/07/20 00:23',
              events: [{id: 6, title: '新增功能', desc: ['新增评论功能'], tag: 'Feat'}]
            },
            {
              date: '2025/07/17 02:25',
              events: [{
                id: 6,
                title: '新增平台',
                desc: ['新增腾讯视频、爱奇艺、优酷、芒果tv四个平台的电视剧 、电影、动漫、综艺的排行榜以及总榜'],
                tag: 'Feat'
              }]
            },
            {
              date: '2025/07/15 18:52',
              events: [{id: 6, title: '新增平台', desc: ['新增网易云飙升榜、新歌榜、原创榜、热歌榜'], tag: 'Feat'}]
            },
            {
              date: '2025/07/14 21:28',
              events: [{
                id: 6,
                title: '功能优化',
                desc: ['优化分类按钮组在移动端显示，现在改为同行可滚动方案'],
                tag: 'Style'
              }]
            },
            {
              date: '2025/07/08 04:45',
              events: [{id: 6, title: '新增功能', desc: ['网易云支持直接播放'], tag: 'Feat'}]
            },
            {
              date: '2025/07/07 23:11',
              events: [{id: 6, title: '新增平台', desc: ['新增知乎'], tag: 'Feat'}]
            },
            {
              date: '2025/07/07 17:34',
              events: [{id: 6, title: '新增功能', desc: ['新增支持隐藏显示部分平台'], tag: 'Feat'}]
            },
            {
              date: '2025/07/05 20:30',
              events: [{id: 6, title: '新增平台', desc: ['添加hugging face'], tag: 'Feat'}]
            },
            {
              date: '2025/07/05 15:27',
              events: [{id: 6, title: '新增平台', desc: ['添加游戏、汽车、民生、财经、热梗'], tag: 'Feat'}]
            },
            {
              date: '2025/070/3 17:53',
              events: [{id: 6, title: '新增平台', desc: ['新增电影、小说、电视剧'], tag: 'Feat'}]
            },
            {
              date: '2025/07/03 15:21',
              events: [{id: 6, title: '样式调整', desc: ['loading样式美化'], tag: 'Style'}]
            },
            {
              date: '2025/07/03 02:43',
              events: [{
                id: 6,
                title: '新增平台',
                desc: ['新增少数派、百度贴吧、网易云、网易新闻、头条、豆瓣、youtube'],
                tag: 'Feat'
              }]
            },
            {
              date: '2025/07/02 00:06',
              events: [{id: 6, title: '新增平台', desc: ['新增github8个榜单'], tag: 'Feat'}]
            },
            {
              date: '2025/06/30 14:40',
              events: [{id: 6, title: '项目创建', desc: ['项目初始创建'], tag: 'Feat'}]
            }
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
        {name: '已接入平台', desc: this.platformsData.length / 2},
        {name: '日均抓取热点', desc: this.platformsData.length * 50 * 60 * 24 + '+'},
        {name: '更新频率', desc: '分钟级'},
      ];
    },
    visibleTimeline() {
      return this.timelineFolded ? this.timeline.slice(0, 8) : this.timeline
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
      window.scrollTo({top: 0, behavior: 'smooth'});
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
  @apply p-4 rounded-xl bg-gradient-to-r from-indigo-600/30 to-pink-600/30 border border-transparent
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
