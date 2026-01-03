<template>
  <header
      class="fixed top-0 left-0 right-0 bg-light-bg/100 dark:bg-dark-bg/100 backdrop-blur-md transition-all duration-300 headStyle"
  >
    <div class="container mx-auto" :style="[widthPaddingStyle, topMessageHeight]">
      <div class="flex items-center justify-between h-full relative">

        <!-- 左侧 Logo 和网站名称 - 整体可点击 -->
        <router-link
            to="/"
            @click="trackUmami('顶部左边LOGO')"
            class="flex-shrink-0 flex items-center space-x-2 sm:space-x-3 cursor-pointer"
        >
          <img
              src="../../assets/image/logo.png"
              alt="糖果梦热榜 - 聚合全网热门排行榜"
              class="logo w-7 h-7 sm:w-9 sm:h-9"
          >
          <span
              class="text-xl sm:text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 dark:from-purple-400 dark:via-pink-400 dark:to-blue-400 bg-clip-text text-transparent whitespace-nowrap tracking-wide"
          >
            糖果梦热榜
          </span>
        </router-link>

        <!-- 右侧设置按钮 - 桌面端显示全部 -->
        <div class="hidden md:flex items-center space-x-6">
          <div v-for="btn in headerButtons" :key="btn.key">
            <el-tooltip :content="btn.tooltip" placement="bottom">
              <!-- 外部链接 -->
              <a
                  v-if="btn.href"
                  :href="btn.href"
                  target="_blank"
                  rel="noopener noreferrer"
                  @click="() => { trackUmami(btn.umamiLabel) }"
              >
                <div class="setting-btn" :aria-label="btn.ariaLabel">
                  <div style="width: 1.875rem">
                    <img :src="getButtonImage(btn)" :alt="btn.alt">
                  </div>
                </div>
              </a>
              <!-- 路由链接 -->
              <router-link
                  v-else-if="btn.to"
                  :to="btn.to"
                  @click="trackUmami(btn.umamiLabel)"
              >
                <div class="setting-btn" :aria-label="btn.ariaLabel">
                  <div style="width: 1.875rem">
                    <img :src="getButtonImage(btn)" :alt="btn.alt">
                  </div>
                </div>
              </router-link>
              <!-- 点击事件 -->
              <div
                  v-else
                  @click="() => { trackUmami(btn.umamiLabel); handleButtonClick(btn) }"
              >
                <div class="setting-btn" :aria-label="btn.ariaLabel">
                  <div style="width: 1.875rem">
                    <img :src="getButtonImage(btn)" :alt="btn.alt">
                  </div>
                </div>
              </div>
            </el-tooltip>
          </div>
        </div>

        <!-- 移动端汉堡菜单按钮 -->
        <div class="md:hidden flex items-center">
          <button @click="toggleMobileMenu" class="p-2 text-gray-600 dark:text-gray-300" aria-label="菜单">
            <svg v-if="!showMobileMenu" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
            <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- 移动端下拉菜单 -->
    <transition name="slide-fade">
      <div v-if="showMobileMenu"
           class="md:hidden bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 shadow-lg">
        <div class="container mx-auto px-8 py-4" :style="widthPaddingStyle">
          <div class="flex flex-col space-y-4">
            <template v-for="btn in headerButtons" :key="btn.key">
              <!-- 外部链接 -->
              <a
                  v-if="btn.href"
                  :href="btn.href"
                  target="_blank"
                  rel="noopener noreferrer"
                  @click="() => { trackUmami(btn.mobileUmamiLabel); toggleMobileMenu() }"
                  class="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <img :src="getButtonImage(btn)" :alt="btn.alt" class="w-8 h-8">
                <span class="text-gray-900 dark:text-gray-100 font-medium">{{ btn.label }}</span>
              </a>

              <!-- 路由链接 -->
              <router-link
                  v-else-if="btn.to"
                  :to="btn.to"
                  @click="() => { trackUmami(btn.mobileUmamiLabel); toggleMobileMenu() }"
                  class="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <img :src="getButtonImage(btn)" :alt="btn.alt" class="w-8 h-8">
                <span class="text-gray-900 dark:text-gray-100 font-medium">{{ btn.label }}</span>
              </router-link>

              <!-- 点击事件 -->
              <div
                  v-else
                  @click="() => { trackUmami(btn.mobileUmamiLabel); handleButtonClick(btn); toggleMobileMenu() }"
                  class="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer"
              >
                <img :src="getButtonImage(btn)" :alt="btn.alt" class="w-8 h-8">
                <span class="text-gray-900 dark:text-gray-100 font-medium">{{ btn.label }}</span>
              </div>
            </template>
          </div>
        </div>
      </div>
    </transition>

  </header>
</template>

<script>
import store from "@/store"

export default {
  components: {
  },
  data() {
    return {
      isDark: true,
      showMobileMenu: false,
      windowWidth: window.innerWidth,
      // 按钮配置数据
      headerButtons: [
        {
          key: 'search',
          tooltip: '搜索',
          label: '搜索',
          ariaLabel: '搜索',
          alt: '糖果梦热榜 - 搜索',
          icon: 'search.png',
          umamiLabel: '顶部右边搜索',
          mobileUmamiLabel: '移动端菜单-搜索',
          action: 'openSearchModal'
        },
        {
          key: 'wechat',
          tooltip: '加入微信群',
          label: '加入微信群',
          ariaLabel: '微信群',
          alt: '糖果梦热榜 - 微信群',
          icon: 'wechat-logo.png',
          href: 'https://wechat.tgmeng.com',
          umamiLabel: '顶部右边微信群',
          mobileUmamiLabel: '移动端菜单-微信群'
        },
        {
          key: 'github',
          tooltip: 'GitHub源码',
          label: 'GitHub仓库',
          ariaLabel: 'GitHub仓库',
          alt: '糖果梦热榜 - GitHub仓库',
          icon: 'github-logo', // 特殊处理,需要根据主题切换
          href: 'https://github.com/tgmeng-com/tgmeng-top-search-frontend',
          umamiLabel: '顶部右边github',
          mobileUmamiLabel: '移动端菜单-GitHub'
        },
        {
          key: 'theme',
          tooltip: '主题切换',
          label: '主题切换',
          ariaLabel: '主题切换',
          alt: '糖果梦热榜 - 主题切换',
          icon: 'theme', // 特殊处理,需要根据主题切换
          umamiLabel: '顶部右边主题切换',
          mobileUmamiLabel: '移动端菜单-主题切换',
          action: 'toggleTheme'
        },
        {
          key: 'fish',
          tooltip: '摸鱼模式',
          label: '摸鱼模式',
          ariaLabel: '摸鱼模式',
          alt: '糖果梦热榜 - 摸鱼模式选择',
          icon: 'fish.png',
          umamiLabel: '顶部右边小鱼',
          mobileUmamiLabel: '移动端菜单-摸鱼模式',
          action: 'clickWorkMaskExcelButton'
        },
        {
          key: 'subscription',
          tooltip: '推送订阅',
          label: '订阅设置',
          ariaLabel: '推送订阅',
          alt: '糖果梦热榜 - 推送订阅',
          icon: 'subcription.png',
          umamiLabel: '顶部右边订阅',
          mobileUmamiLabel: '移动端菜单-订阅',
          action: 'clickSubscriptionSettingButton'
        },
        {
          key: 'license',
          tooltip: '密钥',
          label: '密钥设置',
          ariaLabel: '密钥',
          alt: '糖果梦热榜 - 密钥',
          icon: 'license.png',
          umamiLabel: '顶部右边密钥',
          mobileUmamiLabel: '移动端菜单-密钥设置',
          action: 'clickLicenseButton'
        },
        {
          key: 'setting',
          tooltip: '设置',
          label: '设置中心',
          ariaLabel: '设置',
          alt: '糖果梦热榜 - 设置中心',
          icon: 'setting.png',
          to: '/setting',
          umamiLabel: '顶部右边设置',
          mobileUmamiLabel: '移动端菜单-设置'
        }
      ]
    }
  },
  computed: {
    isMobile() {
      return this.windowWidth < 768
    },
    widthPaddingStyle() {
      return {
        width: this.widthPadding + '% !important',
      }
    },
    topMessageHeight() {
      if (this.isMobile) {
        return { height: this.$store.state.topMessageHeight - 1 + 'rem' }
      }
      return { height: this.$store.state.topMessageHeight + 'rem' }
    },
    widthPadding: {
      get() {
        return this.$store.state.widthPadding
      },
      set(newPadding) {
        this.$store.commit('setWidthPadding', newPadding)
      }
    }
  },
  mounted() {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      this.isDark = savedTheme === 'dark'
    } else {
      this.isDark = true
    }
    document.documentElement.classList.toggle('dark', this.isDark)

    window.addEventListener('resize', () => {
      this.windowWidth = window.innerWidth
    })
  },
  beforeUnmount() {
    window.removeEventListener('resize', () => {
      this.windowWidth = window.innerWidth
    })
  },
  methods: {
    // 根据按钮配置获取图片路径
    getButtonImage(btn) {
      if (btn.icon === 'theme') {
        return this.isDark ? require('@/assets/image/sun.png') : require('@/assets/image/moon.png')
      }
      if (btn.icon === 'github-logo') {
        return this.isDark ? require('@/assets/image/github-logo-light.png') : require('@/assets/image/github-logo-dark.png')
      }
      return require(`@/assets/image/${btn.icon}`)
    },
    // 处理按钮点击事件
    handleButtonClick(btn) {
      if (btn.action && this[btn.action]) {
        this[btn.action]()
      }
    },
    openSearchModal() {
      // store.commit('setSearchShow', true)
      store.commit('setHistoryDataBoardUseTitle', '')
      store.commit('setHistoryDataBoardShow', true)
    },
    toggleTheme() {
      this.isDark = !this.isDark
      document.documentElement.classList.toggle('dark', this.isDark)
      localStorage.setItem('theme', this.isDark ? 'dark' : 'light')
    },
    toggleMobileMenu() {
      this.showMobileMenu = !this.showMobileMenu
    },
    clickWorkMaskExcelButton() {
      store.commit('setFishModeChooseShow', true)
    },
    clickLicenseButton() {
      store.commit('setLicenseShow', true)
    },
    clickSubscriptionSettingButton() {
      store.commit('setSubscriptionSettingShow', true)
    },
    trackUmami(label) {
      if (window.umami) window.umami.track(label)
    }
  }
}
</script>

<style scoped>
.headStyle {
  z-index: 1900 !important;
}

.setting-btn {
  background: transparent;
  border: none;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.setting-btn:hover {
  transform: scale(1.1);
}

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from {
  transform: translateY(-10px);
  opacity: 0;
}

.slide-fade-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}
</style>