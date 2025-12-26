<template>
  <header
      class="fixed top-0 left-0 right-0 bg-light-bg/100 dark:bg-dark-bg/100 backdrop-blur-md transition-all duration-300 headStyle">
    <div class="container mx-auto" :style="[widthPaddingStyle,topMessageHeight]">
      <div class="flex items-center justify-between h-full relative">

        <!-- 左侧 Logo 和网站名称 - 整体可点击 -->
        <router-link to="/" @click="trackUmami('顶部左边LOGO')"
                     class="flex-shrink-0 flex items-center space-x-2 sm:space-x-3 cursor-pointer">
          <img src="../../assets/image/logo.png" alt="糖果梦热榜 - 聚合全网热门排行榜"
               class="logo w-10 h-10 sm:w-12 sm:h-12">
          <span v-if="!isMobile"
                class="text-xl sm:text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 dark:from-purple-400 dark:via-pink-400 dark:to-blue-400 bg-clip-text text-transparent whitespace-nowrap tracking-wide">
            糖果梦热榜
          </span>
        </router-link>

        <!-- 搜索框 + 内嵌模式选择下拉 -->
        <div class="flex-1 relative flex justify-center z-50 mx-4">
          <div class="relative w-full max-w-lg">
            <!-- 搜索框容器（flex 实现内容居中 + 右内侧下拉框） -->
            <div class="relative flex items-center">
              <input
                  v-model="input"
                  type="text"
                  placeholder="一搜即达"
                  @keyup.enter="handleEnter"
                  @focus="handleInputFocus"
                  @input="handleInputChange"
                  :disabled="inputSearchDisable"
                  class="search-input flex-1 text-center pr-44"
              />

              <!-- 模式选择下拉框（绝对定位右内侧，显示选中值） -->
              <div class="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-16">
                <el-select
                    v-model="searchMode"
                    class="mode-select"
                    popper-class="mode-select-popper"
                >
                  <el-option
                      v-for="item in modeOptions"
                      :key="item.value"
                      :label="item.icon"
                      :value="item.value"
                  >
                    <el-tooltip
                        :content="item.tip"
                        placement="top"
                        effect="dark"
                        :disabled="!isPc"
                    >
                      <span class="block truncate">{{ item.label }}</span>
                    </el-tooltip>
                  </el-option>
                </el-select>
              </div>
            </div>
          </div>

          <!-- 历史搜索记录 -->
          <div
              v-if="showHistory"
              data-history-panel
              :class="[
              'bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl shadow-lg overflow-y-auto z-50',
              'md:absolute md:top-full md:left-1/2 md:-translate-x-1/2',
              'fixed top-16 left-0 w-full p-2 md:p-0 mt-2'
            ]"
              :style="mobileResultStyle"
          >
            <div class="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-700">
              <span class="text-sm font-medium text-gray-700 dark:text-gray-300">历史搜索</span>
              <button
                  @click="clearHistory"
                  class="text-sm text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 transition-colors"
              >
                清空
              </button>

              <div class="flex justify-end p-2">
                <button @click="showHistory = false"
                        class="text-red-700 hover:text-red-500 dark:hover:text-red-500 text-3xl">&times;
                </button>
              </div>
            </div>

            <ul class="divide-y divide-gray-200 dark:divide-gray-700 max-h-[60vh] overflow-y-auto">
              <li
                  v-for="(item, index) in searchHistory"
                  :key="index"
                  @click="selectHistory(item)"
                  class="px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer flex items-center justify-between group"
              >
                <div class="flex items-center flex-1 min-w-0">
                  <svg class="w-4 h-4 mr-3 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor"
                       viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  <span class="text-gray-900 dark:text-gray-100 truncate">{{ item }}</span>
                </div>
                <button
                    @click.stop="deleteHistoryItem(item)"
                    class="ml-2 opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-all flex-shrink-0"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                </button>
              </li>
            </ul>
          </div>

          <!-- 搜索结果 -->
          <div
              v-if="showResults"
              data-result-panel
              :class="[
              'bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl shadow-lg overflow-y-auto z-50',
              'md:absolute md:top-full md:left-1/2 md:-translate-x-1/2',
              'fixed top-16 left-0 w-full p-2 md:p-0 mt-2'
            ]"
              :style="mobileResultStyle"
          >
            <div class="flex justify-end p-2">
              <button @click="showResults = false" :disabled="loading"
                      class="text-red-700 hover:text-red-500 dark:hover:text-red-500 text-3xl">&times;
              </button>
            </div>

            <ul class="divide-y divide-gray-200 dark:divide-gray-700 max-h-[60vh] overflow-y-auto">
              <div v-if="loading" class="flex flex-col items-center justify-center text-gray-400" style="height: 80px;">
                <div class="atom-spinner">
                  <div class="spinner-inner">
                    <div class="spinner-line"></div>
                    <div class="spinner-line"></div>
                    <div class="spinner-line"></div>
                    <div class="spinner-circle">&#9679;</div>
                  </div>
                </div>
                <span class="mt-2 mb-4">全网实时热点获取中...</span>
              </div>

              <template v-else>
                <li v-for="(item, index) in searchResults" :key="`${index}`"
                    class="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                  <a :href="item.url" target="_blank" rel="noopener noreferrer"
                     class="flex items-start justify-between w-full gap-4">
                    <div class="flex items-center flex-1 min-w-0">
                      <span class="mr-2 text-gray-500 dark:text-gray-400 flex-shrink-0">
                        {{ index + 1 }}.
                      </span>
                      <span class="ml-1 mr-1 cursor-pointer" @click.stop.prevent="clickHotPointTrend(item.title)">
                          📈
                      </span>
                      <span class="text-gray-900 dark:text-gray-100 break-words text-left">
                        {{ item.title }}
                      </span>
                    </div>
                    <span class="ml-2 text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
                      {{ item.platformName }}
                    </span>
                  </a>
                </li>
              </template>

              <li v-if="!loading && (!searchResults || searchResults.length === 0)"
                  class="px-4 py-2 text-gray-500 dark:text-gray-400 text-center">
                暂无结果
              </li>
            </ul>
          </div>
        </div>

        <!-- 右侧设置按钮 - 桌面端显示全部 -->
        <div class="hidden md:flex items-center space-x-6">
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
              <div @click="() => { trackUmami('顶部右边主题切换');toggleTheme()}">
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
            <el-tooltip content="推送订阅" placement="bottom">
              <div @click="() => { trackUmami('顶部右边订阅');clickSubscriptionSettingButton()}">
                <div class="setting-btn" aria-label="推送订阅">
                  <div style="width: 1.875rem">
                    <img src="../../assets/image/subcription.png" alt="糖果梦热榜 - 推送订阅">
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

    <!-- 移动端下拉菜单 -->
    <transition name="slide-fade">
      <div v-if="showMobileMenu"
           class="md:hidden bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 shadow-lg">
        <div class="container mx-auto px-8 py-4" :style="widthPaddingStyle">
          <div class="flex flex-col space-y-4">
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
                @click="() => { trackUmami('移动端菜单-主题切换');toggleTheme(); toggleMobileMenu()}"
                class="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
              <img :src="isDark ? require('@/assets/image/sun.png') : require('@/assets/image/moon.png')"
                   alt="糖果梦热榜 - 主题切换" class="w-8 h-8">
              <span class="text-gray-900 dark:text-gray-100 font-medium">主题切换</span>
            </div>

            <div
                @click="() => { trackUmami('移动端菜单-订阅');clickSubscriptionSettingButton(); toggleMobileMenu()}"
                class="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
              <img src="../../assets/image/subcription.png" alt="糖果梦热榜 - 订阅设置" class="w-8 h-8">
              <span class="text-gray-900 dark:text-gray-100 font-medium">订阅设置</span>
            </div>

            <a @click="() => { trackUmami('移动端菜单-摸鱼模式'); clickWorkMaskExcelButton(); toggleMobileMenu() }"
               class="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer">
              <img src="../../assets/image/fish.png" alt="摸鱼模式" class="w-8 h-8">
              <span class="text-gray-900 dark:text-gray-100 font-medium">摸鱼模式</span>
            </a>

            <div
                @click="() => { trackUmami('移动端菜单-密钥设置');clickLicenseButton(); toggleMobileMenu()}"
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
  </header>
</template>

<script>
import {cacheSearchForAllByWord} from "@/api/api";
import store from "@/store";
import {clearLocalStorage, getLocalStorage, LOCAL_STORAGE_KEYS, setLocalStorage} from "@/utils/localStorageUtils";

export default {
  data() {
    return {
      input: '',
      showResults: false,
      inputSearchDisable: false,
      searchResults: [],
      loading: false,
      isDark: true,
      showMobileMenu: false,
      showHistory: false,
      searchHistory: [],
      maxHistoryItems: 20,
      windowWidth: window.innerWidth,
      searchMode: 'MO_HU_PI_PEI_FIVE_MINUTES',
      isPc: window.innerWidth >= 768,
      modeOptions: [
        {
          value: 'MO_HU_PI_PEI_FIVE_MINUTES',
          icon: '🤖',
          label: '🤖模糊匹配(1分钟)',
          tip: '【数据范围:1分钟】【匹配模式:模糊匹配】(热点标题包含输入内容：建议输入短文本)'
        },
        {
          value: 'MO_HU_PI_PEI_TODAY',
          icon: '🤖',
          label: '🤖模糊匹配(今日)',
          tip: '【数据范围:今日】【匹配模式:模糊匹配】(热点标题包含输入内容：建议输入短文本)'
        },
        {
          value: 'MO_HU_PI_PEI_HISTORY',
          icon: '🤖',
          label: '🤖模糊匹配(历史)',
          tip: '【数据范围:历史】【匹配模式:模糊匹配】(热点标题包含输入内容：建议输入短文本)'
        },
        {
          value: 'ZHI_WEN_PI_PEI_TODAY',
          icon: '🤖',
          label: '🤖指纹匹配(今日)',
          tip: '【数据范围:今日】【匹配模式:指纹匹配】(热点标题与输入内容存在关联：建议输入长文本)'
        },
        {
          value: 'ZHI_WEN_PI_PEI_HISTORY',
          icon: '🤖',
          label: '🤖指纹匹配(历史)',
          tip: '【数据范围:历史】【匹配模式:指纹匹配】(热点标题与输入内容存在关联：建议输入长文本)'
        },
      ]
    };
  },

  watch: {
    '$store.state.searchTrigger'() {
      const keyword = this.$store.state.searchKeyword;
      if (keyword) {
        this.input = keyword;
        this.handleEnter();
        window.scrollTo({top: 0, behavior: 'smooth'});
      }
    }
  },

  mounted() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      this.isDark = savedTheme === 'dark'
    } else {
      this.isDark = true
    }
    document.documentElement.classList.toggle('dark', this.isDark)

    this.loadSearchHistory();

    window.addEventListener('resize', () => {
      this.windowWidth = window.innerWidth;
      this.isPc = window.innerWidth >= 768;
    });
  },

  beforeUnmount() {
    window.removeEventListener('resize', () => {
      this.windowWidth = window.innerWidth;
      this.isPc = window.innerWidth >= 768;
    });
  },

  methods: {
    clickHotPointTrend(title) {
      store.commit('setHistoryDataBoardShow', true)
      store.commit('setHistoryDataBoardUseTitle', title)
      window.umami.track('📊热点历史追踪');
    },
    loadSearchHistory() {
      const history = getLocalStorage(LOCAL_STORAGE_KEYS.SEARCH_HISTORY);
      if (history) {
        try {
          this.searchHistory = JSON.parse(history);
        } catch (e) {
          this.searchHistory = [];
        }
      }
    },
    saveSearchHistory(keyword) {
      if (!keyword || !keyword.trim()) return;

      this.searchHistory = this.searchHistory.filter(item => item !== keyword);
      this.searchHistory.unshift(keyword);

      if (this.searchHistory.length > this.maxHistoryItems) {
        this.searchHistory = this.searchHistory.slice(0, this.maxHistoryItems);
      }

      setLocalStorage(LOCAL_STORAGE_KEYS.SEARCH_HISTORY, JSON.stringify(this.searchHistory));
    },
    deleteHistoryItem(keyword, event) {
      event.stopPropagation();
      this.searchHistory = this.searchHistory.filter(item => item !== keyword);
      setLocalStorage(LOCAL_STORAGE_KEYS.SEARCH_HISTORY, JSON.stringify(this.searchHistory));
    },
    clearHistory(event) {
      if (event) event.stopPropagation();
      this.searchHistory = [];
      clearLocalStorage(LOCAL_STORAGE_KEYS.SEARCH_HISTORY)
    },
    selectHistory(keyword) {
      this.input = keyword;
      this.showHistory = false;
      this.handleEnter();
    },
    handleInputFocus() {
      if (this.searchHistory.length > 0 && !this.input.trim()) {
        this.showHistory = true;
        this.showResults = false;
      }
    },
    handleInputChange() {
      if (this.input.trim()) {
        this.showHistory = false;
      } else if (this.searchHistory.length > 0) {
        this.showHistory = true;
        this.showResults = false;
      }
    },
    toggleTheme() {
      this.isDark = !this.isDark
      document.documentElement.classList.toggle('dark', this.isDark)
      localStorage.setItem('theme', this.isDark ? 'dark' : 'light')
    },
    toggleMobileMenu() {
      this.showMobileMenu = !this.showMobileMenu;
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
    handleEnter() {
      const currentMode = this.modeOptions.find(opt => opt.value === this.searchMode);
      const modeLabel = currentMode ? currentMode.label : '未知模式';
      window.umami.track('🔎热点检索' + ' | ' + modeLabel + ' | ' + this.input)
      if (!this.input.trim()) return;

      this.saveSearchHistory(this.input.trim());

      this.inputSearchDisable = true;
      this.showResults = true;
      this.showHistory = false;
      this.loading = true;
      this.searchResults = [];

      cacheSearchForAllByWord(this.input.trim(), this.searchMode)
          .then(res => {
            const result = res?.data?.data || false;
            if (result && res.data.code !== 999) {
              this.searchResults = result;
            } else {
              if (res.data.code === 999){
                this.$message.error(res.data.message);
              }
              this.showResults = false;
            }
          })
          .finally(() => {
            this.inputSearchDisable = false;
            this.loading = false;
          });
    },
    trackUmami(label) {
      if (window.umami) window.umami.track(label);
    }
  },

  computed: {
    isMobile() {
      return this.windowWidth < 768;
    },
    mobileResultStyle() {
      if (window.innerWidth < 640) {
        return {
          maxHeight: '60vh',
          overflowY: 'auto',
          textAlign: 'left'
        };
      }
      return {};
    },
    workMaskExcelShow: {
      get() {
        return this.$store.state.workMaskExcelShow;
      },
      set(value) {
        this.$store.commit('setWorkMaskExcelShow', value);
      }
    },
    workMaskVsCodeShow: {
      get() {
        return this.$store.state.workMaskVsCodeShow;
      },
      set(value) {
        this.$store.commit('setWorkMaskVsCodeShow', value);
      }
    },
    fishModeChooseShow: {
      get() {
        return this.$store.state.fishModeChooseShow;
      },
      set(value) {
        this.$store.commit('setFishModeChooseShow', value);
      }
    },
    subscriptionSettingShow: {
      get() {
        return this.$store.state.subscriptionSettingShow;
      },
      set(value) {
        this.$store.commit('setSubscriptionSettingShow', value);
      }
    },
    widthPaddingStyle() {
      return {
        width: this.widthPadding + '% !important',
      }
    },
    topMessageHeight() {
      if (this.isMobile) {
        return {height: this.$store.state.topMessageHeight - 1 + 'rem'}
      }
      return {height: this.$store.state.topMessageHeight + 'rem'}
    },
    widthPadding: {
      get() {
        return this.$store.state.widthPadding;
      },
      set(newPadding) {
        this.$store.commit('setWidthPadding', newPadding);
      }
    }
  }
};
</script>

<style scoped>
/* 你原来的所有样式保持不变 */

/* 搜索框内容居中 + 右内侧下拉框布局 */
.search-input {
  width: 100%;
  padding: 0.75rem 1.5rem;
  border-radius: 9999px;
  border: 2px solid transparent;
  background: linear-gradient(rgba(255, 255, 255, 0.85), rgba(255, 255, 255, 0.84)) padding-box,
  linear-gradient(135deg, #3d4a9a 0%, #3f2d5c 50%, #a84db8 100%) border-box;
  color: #1f2937;
  text-align: center;
  font-size: 0.9375rem;
  transition: all 0.3s ease;
  outline: none;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.15);
}

.dark .search-input {
  background: linear-gradient(#1f2937, #1f2937) padding-box,
  linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%) border-box;
  color: #f3f4f6;
}

.search-input::placeholder {
  color: #9ca3af;
  transition: opacity 0.3s ease;
}

.dark .search-input::placeholder {
  color: #6b7280;
}

/* 聚焦效果 */
.search-input:focus {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3),
  0 0 0 4px rgba(102, 126, 234, 0.1);
}

.search-input:focus::placeholder {
  opacity: 0.5;
}

/* 悬停效果 */
.search-input:hover:not(:focus) {
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.2);
}

/* 呼吸动画 */
@keyframes breathe {
  0%, 100% {
    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.15);
  }
  50% {
    box-shadow: 0 4px 20px rgba(102, 126, 234, 0.25);
  }
}

.search-input:not(:focus):not(:hover) {
  animation: breathe 3s ease-in-out infinite;
}

/* 禁用状态 */
.search-input:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  animation: none;
}

/* 模式选择下拉框样式（嵌入式，显示选中值） */
.mode-select :deep(.el-input__inner) {
  height: 40px !important;
  line-height: 40px !important;
  padding: 0 32px 0 16px !important;
  background: rgba(255, 255, 255, 0.6) !important;
  border-radius: 9999px !important;
  border: none !important;
  color: #1f2937 !important;
  font-weight: 600;
  font-size: 0.9375rem;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.dark .mode-select :deep(.el-input__inner) {
  background: rgba(55, 65, 81, 0.6) !important;
  color: #f3f4f6 !important;
}

/* 下拉箭头 */
.mode-select :deep(.el-input__suffix-inner) {
  right: 10px;
}

/* 下拉面板 */
.mode-select-popper {
  background: rgba(255, 255, 255, 0.98) !important;
  backdrop-filter: blur(12px);
  border: 1px solid rgba(102, 126, 234, 0.3) !important;
  border-radius: 12px !important;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  min-width: 160px !important;
}

.dark .mode-select-popper {
  background: rgba(31, 41, 55, 0.98) !important;
}

/* 选项悬停 */
.mode-select-popper .el-select-dropdown__item.hover,
.mode-select-popper .el-select-dropdown__item:hover {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
  color: white !important;
}

/* 其他原有样式保持不变 */
.setting-btn {
  background: transparent;
  border: none;
  cursor: pointer;
  transition: transform 0.2s ease;
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

.headStyle {
  z-index: 1900 !important;
}

:deep(.el-select__wrapper) {
  background-color: unset;
  box-shadow: unset;
}
</style>