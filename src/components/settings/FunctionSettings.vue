<template>
  <div class="min-h-screen">

    <header class="relative text-center mb-10">
      <h1 class="main-title">
        详细了解网站功能
      </h1>
      <div class="main-desc">
        <p class="mt-1">网站内有各种各样使用的功能和设置等，可以瞅瞅有没有自己没发现的</p>
      </div>
    </header>

    <!-- 头部 -->
    <div
        class="sticky top-0 z-50 backdrop-blur-xl">
      <div class="max-w-6xl mx-auto px-6 py-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-3">
            <div class="flex items-center space-x-1">
              <button
                  v-for="tab in tabs"
                  :key="tab.id"
                  @click="activeTab = tab.id"
                  class="px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200"
                  :class="activeTab === tab.id
                ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'"
              >
                {{ tab.name }}
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>

    <!-- 内容区域 -->
    <div class="max-w-6xl mx-auto px-6 py-8">

      <!-- 核心功能 -->
      <div v-if="activeTab === 'advanced'" class="space-y-8">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
              v-for="feature in advancedFeatures"
              :key="feature.id"
              class="card-bg group p-8 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-2xl hover:shadow-2xl transition-all duration-500 border border-gray-200 dark:border-gray-700"
          >
            <div class="flex items-start justify-between mb-6">
              <div class="flex items-center space-x-4 flex-1">
                <div
                    class="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-2xl shadow-lg">
                  {{ feature.icon }}
                </div>
                <div class="flex items-center justify-between flex-1">
                  <h3 class="text-xl font-bold text-gray-900 dark:text-white">
                    {{ feature.title }}
                  </h3>
                  <span
                      class="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 text-sm font-medium rounded-full ml-4">
                      {{ feature.status }}
                  </span>
                </div>
              </div>
            </div>

            <div class="grid grid-cols-1 gap-6">
              <div>
                <div class="space-y-3">
                  <div
                      v-for="(step, index) in feature.usage"
                      :key="index"
                      class="flex items-start space-x-3"
                  >
                    <div
                        class="w-6 h-6 bg-blue-500 text-white text-xs rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      {{ index + 1 }}
                    </div>
                    <p class="text-sm text-gray-600 dark:text-gray-400 text-left">{{ step }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 个性化设置 -->
      <div v-if="activeTab === 'customization'" class="space-y-8">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
              v-for="setting in customizationSettings"
              :key="setting.id"
              class="card-bg group p-6 bg-white dark:bg-gray-800 rounded-2xl hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
          >
            <div class="flex items-start justify-between mb-6">
              <div class="flex items-center space-x-4 flex-1">
                <div
                    class="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white text-lg ">
                  {{ setting.icon }}
                </div>
                <div class="flex items-center justify-between flex-1">
                  <h3 class="text-xl font-bold text-gray-900 dark:text-white">
                    {{ setting.title }}
                  </h3>
                </div>
              </div>
            </div>
            <div class="grid grid-cols-1 gap-6">
              <div>
                <div class="space-y-3">
                  <div class="flex items-start space-x-3">
                    <p class="text-sm text-gray-600 dark:text-gray-400 text-left">{{ setting.description }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 使用技巧 -->
      <div v-if="activeTab === 'tips'" class="space-y-8">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
              v-for="tip in usageTips"
              :key="tip.id"
              class="card-bg group p-6 bg-white dark:bg-gray-800 rounded-2xl hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
          >
            <div class="flex items-start justify-between mb-6">
              <div class="flex items-center space-x-4 flex-1">
                <div
                    class="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white text-lg ">
                  {{ tip.icon }}
                </div>
                <div class="flex items-center justify-between flex-1">
                  <h3 class="text-xl font-bold text-gray-900 dark:text-white">
                    {{ tip.title }}
                  </h3>
                </div>
              </div>
            </div>
            <div class="grid grid-cols-1 gap-6">
              <div>
                <div class="space-y-3">
                  <div class="flex items-start space-x-3">
                    <p class="text-sm text-gray-600 dark:text-gray-400 text-left">{{ tip.description }}</p>
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
export default {
  name: 'FeatureIntroduction',
  data() {
    return {
      activeTab: 'advanced',
      tabs: [
        {id: 'advanced', name: '核心功能'},
        {id: 'customization', name: '个性化设置'},
        {id: 'tips', name: '使用技巧'}
      ],
      customizationSettings: [
        {
          id: 1,
          icon: '🎨',
          title: '平台管理',
          description: '在右上角的设置里面的基础设置里，可以选择隐藏某些你觉得不想看或者碍眼的平台，这样他们就不会出现在主页列表中'
        },
        {
          id: 2,
          icon: '📐',
          title: '平台布局',
          description: '主页的自定义设置，可以对平台(卡片)进行布局调整，比如调整列数、高度、排序以及平台名称在内的字体等的调整'
        },
        {
          id: 3,
          icon: '⚙️',
          title: '分类管理',
          description: '可以对分类进行排序、字体等调整，也可以设置默认分类，也就是每次打开根域名时自动选择某个分类'
        },
        {
          id: 4,
          icon: '🔔',
          title: '词云管理',
          description: '可以选择词云中的数量，数量越大词云越密集，同时带来的渲染压力也大一点。也可以直接选择隐藏词云，如果你觉得没用的话。'
        },
        {
          id: 5,
          icon: '🎯',
          title: '系统管理',
          description: '可以设置页面的左右边距，这个功能主要是在移动端的时候，为了在向下滚动时误触卡片内容，可以选择性缩小边距'
        },
        {
          id: 6,
          icon: '💾',
          title: '主题管理',
          description: '支持明暗主题的切换'
        }
      ],
      advancedFeatures: [
        {
          id: 5,
          icon: '🌐',
          title: '多平台聚合',
          status: '稳定',
          usage: [
            '涵盖全网数百+热点平台的内容，我写这个文档的时候，一共有178个平台，包含各种领域，而且还在不断增加',
          ],
        },
        {
          id: 6,
          icon: '🔍',
          title: '收藏功能',
          status: '稳定',
          usage: [
            '你可以点击平台卡片图标附近的星星按钮，就可以收藏卡片，然后可以在收藏分类中查看，这样就可以集中查看自己感兴趣的内容',
          ],
        },
        {
          id: 7,
          icon: '⚡',
          title: '评论功能',
          status: '稳定',
          usage: [
            '主页的底部，有评论区域，支持登录评论或者匿名评论。如果你对网站有建议或者意见，都可以在下面提，目前大家在里面提到的痛点或者希望的功能等等，现在基本都已经实现了。我看到大家的评论，基本都会回复并且实现相应的功能',
          ],
        },
        {
          id: 7,
          icon: '⚡',
          title: '检索功能',
          status: '稳定',
          usage: [
            '顶部导航栏中间，有个搜索框，里面的搜索逻辑是这样：把你的搜索词，去和后台所有内存缓存里的热榜数据做比对，匹配到之后，返回给你列表，其实这个配合词云用是比较好的，你在词云中发现某个东西当下热度特别高的时候，就可以在搜索框里去搜索他对应的东西',
          ],
        },
        {
          id: 1,
          icon: '🤖',
          title: 'AI实时简报',
          status: 'Beta',
          usage: [
            '实时简报生成逻辑是，后台每五分钟循环一次，将所有平台的热点信息，提交给语言大模型处理，让他总结出五个热度最高的话题，然后再去分析、预测及建议。从这里是很容易看出最近的市场趋势的，还能看到大模型给我们的建议，很有用还是',
          ],
        },
        {
          id: 2,
          icon: '📊',
          title: '全网热点词云',
          status: '稳定',
          usage: [
            '这块是后台每分钟循环一次，将当前这一分钟内的所有热点标题进行分词，然后统计频率。他的好处就是一眼就看到当下最最最热点的东西、最顶流的话题',
          ],
        },
        {
          id: 3,
          icon: '📡',
          title: 'RSS订阅功能',
          status: '稳定',
          usage: [
            '我们支持全方位的RSS功能，你可以全站、按分类、按平台去订阅，在卡片或者分类上都有黄色的RSS小图标，点击就能拿到RSS地址，然后你就可以在喜欢的RSS阅读器里订阅了。我们的RSS数据也是做的实时的，你每次RSS拉取到的，同样是最近1分钟内的全网最新的数据',
          ],
        },
        {
          id: 3,
          icon: '📡',
          title: 'Excel摸鱼模式',
          status: '稳定',
          usage: [
            '在主页右上角有个小鱼，点击后就会进入一个和Excel几乎一样的画面，他是完全由HTML生成的，里面的数据也是实时更新的，不论数据或者更新频率，都是和主页同步的。里面顶部的自定义设置，可以设置Excel里各种字体的大小、粗细，同时里面还有小彩蛋，点一点就会发现哈',
          ],
        },
        {
          id: 4,
          icon: '📱',
          title: '数据更新原理',
          status: '稳定',
          usage: [
            '这一块的逻辑改了好几版。一开始是后台定时爬取数据(每分钟1次)，然后放到高速内存缓存中，有效期1分钟，用户前端请求的时候，后台先查缓存，缓存里不存在的话，主动去官网拉取。这样一开始是很好的，但是随着平台增加，' +
            '请求越来越频繁，这种用户有权主动去爬取数据的逻辑带来的弊端就出来了，太容易引发风控，会到底服务器被大量平台拉入黑名单，然后页面上一刷一个没数据。之后一直改来改去，到现在是' +
            '服务器定时爬数据(每分钟1次)，有效期48小时，期间每分钟的定时任务，如果拉取到数据，就覆盖旧缓存，用户前端请求，永远只能拿后台缓存中的数据，无权直接去爬数据，这样带来的好处就是，' +
            '爬取速率等问题完全由后端控制，用户前端看到的永远是近1分钟最新的数据。即使某些平台因为各种问题暂时没数据，用户也能拿到一定时间段前的存在于缓存中的数据，不论从体验还是安全性方面都做到了平衡' +
            '',
          ],
        }
      ],
      usageTips: [
        {
          id: 1,
          icon: '💡',
          title: '合理选择平台数量',
          description: '建议选择5-10个核心平台，避免信息过载，专注于高质量内容。'
        },
        {
          id: 2,
          icon: '💡',
          title: '善用搜索功能',
          description: '使用关键词搜索快速定位内容，结合筛选条件精确查找，这样才能看到最最最热点的信息'
        },
        {
          id: 3,
          icon: '💡',
          title: '定期调整布局',
          description: '根据使用场景调整显示列数和卡片大小，获得最佳阅读体验。'
        },
        {
          id: 4,
          icon: '💡',
          title: '利用收藏功能',
          description: '收藏重要热点内容，建立个人知识库，方便后续查阅。'
        },
        {
          id: 5,
          icon: '💡',
          title: '关注数据更新',
          description: '了解各平台数据更新频率，合理安排查看时间。'
        },
        // {
        //   id: 6,
        //   icon: '📱',
        //   title: '备份个人设置',
        //   description: '定期导出配置备份，防止浏览器数据丢失导致设置重置。'
        // }
      ]
    }
  }
}
</script>

<style scoped>

.main-title {
  @apply mt-6 text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight text-gray-900 dark:text-gray-100
}

.main-desc {
  @apply mt-6 max-w-3xl mx-auto text-gray-600 dark:text-gray-300
}


/* 自定义滚动条 */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: #d1d5db;
  border-radius: 3px;
}

.dark ::-webkit-scrollbar-thumb {
  background: #4b5563;
}

.card-bg {
  @apply p-4 rounded-xl bg-gradient-to-r from-indigo-600/30 to-pink-600/30 border border-transparent
  dark:border-transparent shadow-sm hover:shadow-lg transition transform hover:-translate-y-1;
}

</style>