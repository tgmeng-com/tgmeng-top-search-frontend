<template>
  <header
      class="fixed top-0 left-0 right-0 bg-light-bg/100 dark:bg-dark-bg/100 backdrop-blur-md transition-all duration-300 headStyle"
  >
    <div class="container mx-auto" :style="[widthPaddingStyle, topMessageHeight]">
      <div class="flex items-center justify-between h-full relative">

        <router-link
            to="/"
            @click="trackUmami('顶部左边LOGO')"
            class="flex-shrink-0 flex items-center space-x-2 sm:space-x-2.5 cursor-pointer group"
        >
          <img
              src="../../assets/image/logo.png"
              alt="糖果梦热榜 - 聚合全网热门排行榜"
              class="logo w-7 h-7 sm:w-8 sm:h-8 transition-transform duration-300 group-hover:scale-105"
          >
          <span
              class="text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 dark:from-purple-400 dark:via-pink-400 dark:to-blue-400 bg-clip-text text-transparent whitespace-nowrap tracking-tight transition-all duration-300"
          >
            糖果梦热榜
          </span>
        </router-link>

        <button
            @click="toggleSidebar"
            class="menu-btn p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200"
            aria-label="打开菜单"
        >
          <svg class="w-6 h-6 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
        </button>
      </div>
    </div>
  </header>

  <transition name="fade">
    <div
        v-if="showSidebar"
        class="fixed inset-0 bg-black bg-opacity-50 z-2000"
        @click="closeSidebar"
    ></div>
  </transition>

  <transition name="slide">
    <div
        v-if="showSidebar"
        class="fixed top-0 right-0 h-full w-80 bg-white dark:bg-gray-800 shadow-2xl z-2001 flex flex-col"
    >
      <div class="flex-shrink-0 flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
        <h2 class="text-xl font-bold text-gray-900 dark:text-gray-100">菜单</h2>
        <button
            @click="closeSidebar"
            class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label="关闭菜单"
        >
          <svg class="w-6 h-6 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>

      <div class="sidebar-content flex-1 overflow-y-auto">
        <template v-for="(group, groupIndex) in groupedButtons" :key="group.key">
          <div class="button-group">
            <template v-for="btn in group.buttons" :key="btn.key">
              <a
                  v-if="btn.href"
                  :href="btn.href"
                  target="_blank"
                  rel="noopener noreferrer"
                  @click="() => { trackUmami(btn.umamiLabel); closeSidebar() }"
                  class="sidebar-item"
              >
                <img :src="getButtonImage(btn)" :alt="btn.alt" class="sidebar-icon">
                <span class="sidebar-text">{{ btn.label }}</span>
              </a>

              <router-link
                  v-else-if="btn.to"
                  :to="btn.to"
                  @click="() => { trackUmami(btn.umamiLabel); closeSidebar() }"
                  class="sidebar-item"
              >
                <img :src="getButtonImage(btn)" :alt="btn.alt" class="sidebar-icon">
                <span class="sidebar-text">{{ btn.label }}</span>
              </router-link>

              <div
                  v-else
                  @click="() => { trackUmami(btn.umamiLabel); handleButtonClick(btn) }"
                  class="sidebar-item"
              >
                <img :src="getButtonImage(btn)" :alt="btn.alt" class="sidebar-icon">
                <span class="sidebar-text">{{ btn.label }}</span>
              </div>
            </template>
          </div>

          <div v-if="groupIndex < groupedButtons.length - 1" class="group-divider"></div>
        </template>
      </div>

      <div class="flex-shrink-0 p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
        <p class="text-sm text-center text-gray-500 dark:text-gray-400">
          糖果梦热榜 © {{ currentYear }}
        </p>
      </div>
    </div>
  </transition>
</template>

<script>
import store from "@/store"

export default {
  data() {
    return {
      isDark: true,
      showSidebar: false,
      windowWidth: window.innerWidth,
      headerButtons: [
        { key: 'search', label: '搜索', alt: '糖果梦热榜 - 搜索', icon: 'search.png', umamiLabel: '侧边栏-搜索', action: 'openSearchModal', group: 'function' },
        { key: 'settingsPanel', label: '个性化', alt: '糖果梦热榜 - 个性化', icon: 'setting.png', umamiLabel: '侧边栏-个性化', action: 'toggleSettingsPanel', group: 'function' },
        { key: 'theme', label: '主题切换', alt: '糖果梦热榜 - 主题切换', icon: 'theme', umamiLabel: '侧边栏-主题切换', action: 'toggleTheme', group: 'function' },
        { key: 'fish', label: '摸鱼模式', alt: '糖果梦热榜 - 摸鱼模式选择', icon: 'fish.png', umamiLabel: '侧边栏-摸鱼模式', action: 'clickWorkMaskExcelButton', group: 'function' },
        { key: 'subscription', label: '订阅设置', alt: '糖果梦热榜 - 推送订阅', icon: 'subcription.png', umamiLabel: '侧边栏-订阅', action: 'clickSubscriptionSettingButton', group: 'function' },
        { key: 'license', label: '密钥设置', alt: '糖果梦热榜 - 密钥', icon: 'license.png', umamiLabel: '侧边栏-密钥设置', action: 'clickLicenseButton', group: 'function' },
        { key: 'wechat', label: '微信交流群', alt: '糖果梦热榜 - 微信群', icon: 'wechat-logo.png', href: 'https://wechat.tgmeng.com', umamiLabel: '侧边栏-微信群', group: 'community' },
        { key: 'github', label: 'GitHub 仓库', alt: '糖果梦热榜 - GitHub仓库', icon: 'github-logo', href: 'https://github.com/tgmeng-com/tgmeng-top-search-frontend', umamiLabel: '侧边栏-GitHub', group: 'community' },
        { key: 'about', label: '关于我们', alt: '糖果梦热榜 - 关于我们', icon: 'about.png', to: '/about', umamiLabel: '侧边栏-关于我们', group: 'info' },
        { key: 'function', label: '功能介绍', alt: '糖果梦热榜 - 功能介绍', icon: 'function.png', to: '/function', umamiLabel: '侧边栏-功能介绍', group: 'info' },
        { key: 'donation', label: '打赏列表', alt: '糖果梦热榜 - 打赏列表', icon: 'coffee.png', to: '/donation', umamiLabel: '侧边栏-打赏列表', group: 'info' }
      ],
      buttonGroups: {
        function: { title: '功能设置', order: 1 },
        community: { title: '社区与开源', order: 2 },
        info: { title: '信息中心', order: 3 }
      }
    }
  },
  computed: {
    widthPaddingStyle() { return { width: this.widthPadding + '% !important' } },
    topMessageHeight() { return { height: this.$store.state.topMessageHeight + 'rem' } },
    widthPadding: {
      get() { return this.$store.state.widthPadding },
      set(v) { this.$store.commit('setWidthPadding', v) }
    },
    currentYear() { return new Date().getFullYear() },
    groupedButtons() {
      const grouped = {}
      this.headerButtons.forEach(btn => {
        const key = btn.group || 'other'
        if (!grouped[key]) grouped[key] = []
        grouped[key].push(btn)
      })
      return Object.keys(grouped).sort((a, b) => (this.buttonGroups[a]?.order || 999) - (this.buttonGroups[b]?.order || 999))
          .map(key => ({ key, title: this.buttonGroups[key]?.title || key, buttons: grouped[key] }))
    }
  },
  mounted() {
    this.isDark = localStorage.getItem('theme') !== 'light'
    document.documentElement.classList.toggle('dark', this.isDark)
    document.addEventListener('keydown', this.handleEscKey)
  },
  beforeUnmount() { document.removeEventListener('keydown', this.handleEscKey) },
  methods: {
    getButtonImage(btn) {
      if (btn.icon === 'theme') return this.isDark ? require('@/assets/image/sun.png') : require('@/assets/image/moon.png')
      if (btn.icon === 'github-logo') return this.isDark ? require('@/assets/image/github-logo-light.png') : require('@/assets/image/github-logo-dark.png')
      return require(`@/assets/image/${btn.icon}`)
    },
    handleButtonClick(btn) {
      if (btn.action && this[btn.action]) {
        this[btn.action]()
        if (['openSearchModal', 'clickWorkMaskExcelButton', 'clickLicenseButton', 'clickSubscriptionSettingButton'].includes(btn.action)) this.closeSidebar()
      }
    },
    toggleSidebar() {
      this.showSidebar = !this.showSidebar
      document.body.style.overflow = this.showSidebar ? 'hidden' : ''
    },
    closeSidebar() {
      this.showSidebar = false
      document.body.style.overflow = ''
    },
    handleEscKey(e) { if (e.key === 'Escape' && this.showSidebar) this.closeSidebar() },
    toggleSettingsPanel() { store.commit('setSettingsPanelExpanded', !store.state.settingsPanelExpanded) },
    openSearchModal() {
      store.commit('setHistoryDataBoardUseTitle', '')
      store.commit('setHistoryDataSearchMode', 'ZHI_WEN_PI_PEI_TODAY')
      store.commit('setHistoryDataBoardShow', true)
    },
    toggleTheme() {
      this.isDark = !this.isDark
      document.documentElement.classList.toggle('dark', this.isDark)
      localStorage.setItem('theme', this.isDark ? 'dark' : 'light')
    },
    clickWorkMaskExcelButton() { store.commit('setFishModeChooseShow', true) },
    clickLicenseButton() { store.commit('setLicenseShow', true) },
    clickSubscriptionSettingButton() { store.commit('setSubscriptionSettingShow', true) },
    trackUmami(label) { if (window.umami) window.umami.track(label) }
  }
}
</script>

<style scoped>
.headStyle { z-index: 1900 !important; }
.z-2000 { z-index: 2000; }
.z-2001 { z-index: 2001; }

.menu-btn:hover { transform: scale(1.05); }

.sidebar-content {
  padding: 0.75rem 0;
  overflow-x: hidden;
}

.button-group { padding: 0.5rem 0; }

.group-divider {
  height: 1px;
  background: linear-gradient(90deg, transparent 0%, rgba(229, 231, 235, 0.8) 10%, rgba(229, 231, 235, 0.8) 90%, transparent 100%);
  margin: 0.75rem 1.25rem;
}

.dark .group-divider {
  background: linear-gradient(90deg, transparent 0%, rgba(55, 65, 81, 0.8) 10%, rgba(55, 65, 81, 0.8) 90%, transparent 100%);
}

.sidebar-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.875rem 1.5rem;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  color: #374151;
  position: relative;
}

.dark .sidebar-item { color: #e5e7eb; }

.sidebar-item::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 3px;
  height: 0;
  background: linear-gradient(180deg, #a855f7 0%, #ec4899 100%);
  border-radius: 0 2px 2px 0;
  transition: height 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.sidebar-item:hover {
  background-color: rgba(249, 250, 251, 0.8);
  transform: translateX(4px);
  color: #111827;
}

.dark .sidebar-item:hover {
  background-color: rgba(55, 65, 81, 0.5);
  color: #f9fafb;
}

.sidebar-item:hover::before { height: 60%; }
.sidebar-item:active { transform: translateX(2px); }

.sidebar-icon {
  width: 1.25rem;
  height: 1.25rem;
  flex-shrink: 0;
  transition: transform 0.2s ease;
}

.sidebar-item:hover .sidebar-icon { transform: scale(1.1); }
.sidebar-text { font-size: 0.9375rem; font-weight: 500; letter-spacing: 0.01em; }

.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

.slide-enter-active, .slide-leave-active { transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
.slide-enter-from, .slide-leave-to { transform: translateX(100%); }

@media (max-width: 640px) {
  .sidebar-item { padding: 0.75rem 1.25rem; gap: 0.875rem; }
  .sidebar-icon { width: 1.125rem; height: 1.125rem; }
  .sidebar-text { font-size: 0.875rem; }
  .fixed.right-0.w-80 { width: 85vw; max-width: 280px; }
}
</style>