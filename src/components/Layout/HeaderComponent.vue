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
              class="logo w-10 h-10 sm:w-12 sm:h-12"
          >
          <span
              v-if="!isMobile"
              class="text-xl sm:text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 dark:from-purple-400 dark:via-pink-400 dark:to-blue-400 bg-clip-text text-transparent whitespace-nowrap tracking-wide"
          >
            糖果梦热榜
          </span>
        </router-link>

        <!-- 右侧设置按钮 - 桌面端显示全部 -->
        <div class="hidden md:flex items-center space-x-6">

          <div>
            <el-tooltip content="搜索" placement="bottom">
              <div @click="() => { trackUmami('顶部右边搜索'); openSearchModal()}">
                <div class="setting-btn" aria-label="搜索">
                  <div style="width: 1.875rem">
                    <img src="../../assets/image/search.png" alt="糖果梦热榜 - 搜索">
                  </div>
                </div>
              </div>
            </el-tooltip>
          </div>


          <div>
            <el-tooltip content="加入微信群" placement="bottom">
              <a href="https://wechat.tgmeng.com" target="_blank" rel="noopener noreferrer"
                 @click="() => { trackUmami('顶部右边微信群')}">
                <div class="setting-btn" aria-label="微信群">
                  <div style="width: 1.875rem">
                    <img src="../../assets/image/wechat-logo.png" alt="糖果梦热榜 - 微信群">
                  </div>
                </div>
              </a>
            </el-tooltip>
          </div>

          <div>
            <el-tooltip content="GitHub源码" placement="bottom">
              <a href="https://github.com/tgmeng-com/tgmeng-top-search-frontend" target="_blank"
                 rel="noopener noreferrer"
                 @click="() => { trackUmami('顶部右边github')}">
                <div class="setting-btn" aria-label="GitHub仓库">
                  <div style="width: 1.875rem">
                    <img
                        :src="isDark ? require('@/assets/image/github-logo-light.png') : require('@/assets/image/github-logo-dark.png')"
                        alt="糖果梦热榜 - GitHub仓库">
                  </div>
                </div>
              </a>
            </el-tooltip>
          </div>

          <div>
            <el-tooltip content="主题切换" placement="bottom">
              <div @click="() => { trackUmami('顶部右边主题切换'); toggleTheme()}">
                <div class="setting-btn" aria-label="主题切换">
                  <div style="width: 1.875rem">
                    <img :src="isDark ? require('@/assets/image/sun.png') : require('@/assets/image/moon.png')"
                         alt="糖果梦热榜 - 主题切换">
                  </div>
                </div>
              </div>
            </el-tooltip>
          </div>

          <div>
            <el-tooltip content="摸鱼模式" placement="bottom">
              <a @click="() => { trackUmami('顶部右边小鱼'); clickWorkMaskExcelButton() }">
                <div class="setting-btn" aria-label="摸鱼模式">
                  <div style="width: 1.875rem">
                    <img src="../../assets/image/fish.png" alt="糖果梦热榜 - 摸鱼模式选择">
                  </div>
                </div>
              </a>
            </el-tooltip>
          </div>

          <div>
            <el-tooltip content="推送订阅" placement="bottom">
              <div @click="() => { trackUmami('顶部右边订阅'); clickSubscriptionSettingButton()}">
                <div class="setting-btn" aria-label="推送订阅">
                  <div style="width: 1.875rem">
                    <img src="../../assets/image/subcription.png" alt="糖果梦热榜 - 推送订阅">
                  </div>
                </div>
              </div>
            </el-tooltip>
          </div>

          <div>
            <el-tooltip content="密钥" placement="bottom">
              <a @click="() => { trackUmami('顶部右边密钥'); clickLicenseButton() }">
                <div class="setting-btn" aria-label="密钥">
                  <div style="width: 1.875rem">
                    <img src="../../assets/image/license.png" alt="糖果梦热榜 - 密钥">
                  </div>
                </div>
              </a>
            </el-tooltip>
          </div>

          <div>
            <el-tooltip content="设置" placement="bottom">
              <router-link to="/setting" @click="trackUmami('顶部右边设置')">
                <div class="setting-btn" aria-label="设置">
                  <div style="width: 1.875rem">
                    <img src="../../assets/image/setting.png" alt="糖果梦热榜 - 设置中心">
                  </div>
                </div>
              </router-link>
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

    <!-- 移动端下拉菜单（保持不变） -->
    <transition name="slide-fade">
      <div v-if="showMobileMenu"
           class="md:hidden bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 shadow-lg">
        <div class="container mx-auto px-8 py-4" :style="widthPaddingStyle">
          <div class="flex flex-col space-y-4">

            <div
                @click="() => { trackUmami('移动端菜单-搜索'); openSearchModal(); toggleMobileMenu()}"
                class="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
              <img src="../../assets/image/search.png" alt="糖果梦热榜 - 搜索" class="w-8 h-8">
              <span class="text-gray-900 dark:text-gray-100 font-medium">搜索</span>
            </div>

            <a href="https://wechat.tgmeng.com" target="_blank" rel="noopener noreferrer"
               @click="() => { trackUmami('移动端菜单-微信群'); toggleMobileMenu() }"
               class="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
              <img src="../../assets/image/wechat-logo.png" alt="微信群" class="w-8 h-8">
              <span class="text-gray-900 dark:text-gray-100 font-medium">加入微信群</span>
            </a>

            <a href="https://github.com/tgmeng-com/tgmeng-top-search-frontend" target="_blank" rel="noopener noreferrer"
               @click="() => { trackUmami('移动端菜单-GitHub'); toggleMobileMenu() }"
               class="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
              <img
                  :src="isDark ? require('@/assets/image/github-logo-light.png') : require('@/assets/image/github-logo-dark.png')"
                  alt="糖果梦热榜 - GitHub仓库" class="w-8 h-8">
              <span class="text-gray-900 dark:text-gray-100 font-medium">GitHub仓库</span>
            </a>

            <div
                @click="() => { trackUmami('移动端菜单-主题切换'); toggleTheme(); toggleMobileMenu()}"
                class="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
              <img :src="isDark ? require('@/assets/image/sun.png') : require('@/assets/image/moon.png')"
                   alt="糖果梦热榜 - 主题切换" class="w-8 h-8">
              <span class="text-gray-900 dark:text-gray-100 font-medium">主题切换</span>
            </div>

            <a @click="() => { trackUmami('移动端菜单-摸鱼模式'); clickWorkMaskExcelButton(); toggleMobileMenu() }"
               class="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer">
              <img src="../../assets/image/fish.png" alt="摸鱼模式" class="w-8 h-8">
              <span class="text-gray-900 dark:text-gray-100 font-medium">摸鱼模式</span>
            </a>

            <div
                @click="() => { trackUmami('移动端菜单-订阅'); clickSubscriptionSettingButton(); toggleMobileMenu()}"
                class="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
              <img src="../../assets/image/subcription.png" alt="糖果梦热榜 - 订阅设置" class="w-8 h-8">
              <span class="text-gray-900 dark:text-gray-100 font-medium">订阅设置</span>
            </div>

            <div
                @click="() => { trackUmami('移动端菜单-密钥设置'); clickLicenseButton(); toggleMobileMenu()}"
                class="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
              <img src="../../assets/image/license.png" alt="糖果梦热榜 - 密钥设置" class="w-8 h-8">
              <span class="text-gray-900 dark:text-gray-100 font-medium">密钥设置</span>
            </div>

            <router-link to="/setting"
                         @click="() => { trackUmami('移动端菜单-设置'); toggleMobileMenu() }"
                         class="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
              <img src="../../assets/image/setting.png" alt="设置" class="w-8 h-8">
              <span class="text-gray-900 dark:text-gray-100 font-medium">设置中心</span>
            </router-link>
          </div>
        </div>
      </div>
    </transition>

    <!-- 引入独立的搜索模态框组件 -->
    <SearchModal ref="searchModal" />
  </header>
</template>

<script>
import SearchModal from '@/components/Layout/SearchModal.vue' // 请确保路径正确
import store from "@/store"

export default {
  components: {
    SearchModal
  },
  data() {
    return {
      isDark: true,
      showMobileMenu: false,
      windowWidth: window.innerWidth,
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
    openSearchModal() {
      store.commit('setSearchShow', true)
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

/* 搜索触发按钮样式 */
.search-trigger-btn {
  display: flex;
  align-items: center;
  padding: 10px 24px;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(12px);
  border-radius: 9999px;
  border: 2px solid transparent;
  background-clip: padding-box, border-box;
  background-origin: padding-box, border-box;
  background-image: linear-gradient(rgba(255, 255, 255, 0.85), rgba(255, 255, 255, 0.85)),
  linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  color: #4b5563;
  font-size: 0.9375rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.15);
}

.dark .search-trigger-btn {
  background: linear-gradient(#1f2937, #1f2937),
  linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  color: #f3f4f6;
}

.search-trigger-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
}

.search-trigger-btn svg {
  color: #667eea;
  flex-shrink: 0;
}

/* 原有的设置按钮样式保持不变 */
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