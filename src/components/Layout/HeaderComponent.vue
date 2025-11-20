<template>
  <header class="sticky top-0 z-50 bg-light-bg/90 dark:bg-dark-bg/90 backdrop-blur-md transition-all duration-300">
    <div class="mx-auto" style="min-height: 5rem;">
      <div class="flex items-center justify-between h-16 px-4 relative">

        <!-- 左侧 Logo -->
        <div class="flex-shrink-0">
          <router-link to="/" @click="trackUmami('顶部左边LOGO')">
            <img src="../../assets/image/logo.png" alt="糖果梦热榜 - 聚合全网热门排行榜" class="logo w-12 h-12">
          </router-link>
        </div>

        <!-- 搜索框 -->
        <div class="flex-1 relative flex justify-center z-50 mx-4">
          <input
              v-model="input"
              type="text"
              placeholder="实时热点、一搜即达"
              @keyup.enter="handleEnter"
              :disabled="inputSearchDisable"
              class="w-full max-w-md px-4 py-2 rounded-full border border-gray-300 dark:border-gray-600
                   bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500
                   text-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
          />

          <!-- 搜索结果 -->
          <div
              v-if="showResults"
              :class="[
              'bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl shadow-lg overflow-y-auto z-50',
              'md:absolute md:top-full md:left-1/2 md:-translate-x-1/2',
              'fixed top-16 left-0 w-full p-2 md:p-0 mt-2'
            ]"
              :style="mobileResultStyle"
          >
            <!-- 关闭按钮 -->
            <div class="flex justify-end p-2">
              <button @click="showResults = false" :disabled="loading"
                      class="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 text-xl">&times;
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

              <!-- 搜索结果 -->
              <template v-else v-for="(group, gIndex) in searchResults" :key="gIndex">
                <li v-if="group.groupTitle" class="px-4 py-2 text-xs text-gray-500 dark:text-gray-400">
                  {{ group.groupTitle }}
                </li>

                <li v-for="(item, index) in group.dataInfo" :key="`${gIndex}-${index}`"
                    class="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                  <a :href="item.url" target="_blank" rel="noopener noreferrer"
                     class="flex items-start justify-between w-full gap-4">

                    <!-- 左侧：序号 + logo + 标题 -->
                    <div class="flex items-center flex-1 min-w-0">
                      <span class="mr-2 text-gray-500 dark:text-gray-400 flex-shrink-0">
                        {{ getGlobalIndex(gIndex, index) }}.
                      </span>
                      <!--                      TODO 后续看图片这块怎么弄，是备份一份到图床，还是说搞个映射表-->
                      <!--                      <img v-if="group.dataCardLogo" :src="group.dataCardLogo" alt="logo"-->
                      <!--                           class="w-4 h-4 mr-2 flex-shrink-0"/>-->
                      <span class="text-gray-900 dark:text-gray-100 break-words">
                        {{ item.keyword }}
                      </span>
                    </div>

                    <!-- 右侧：站点名 -->
                    <span class="ml-2 text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
                      {{ group.dataCardName }}
                    </span>
                  </a>
                </li>
              </template>

              <!-- 无结果提示 -->
              <li v-if="!loading && (!searchResults || searchResults.length === 0)"
                  class="px-4 py-2 text-gray-500 dark:text-gray-400 text-center">
                暂无结果
              </li>
            </ul>
          </div>
        </div>

        <!-- 右侧设置按钮 -->
        <div class="flex items-center space-x-6">
          <div style="width: 2.5rem;">
            <router-link to="/setting" @click="trackUmami('顶部右边设置')">
              <div class="setting-btn" aria-label="设置">
                <div style="width: 1.875rem">
                  <img src="../../assets/image/setting.png" alt="糖果梦热榜 - 设置中心">
                </div>
              </div>
            </router-link>
          </div>
        </div>

      </div>
    </div>
  </header>
</template>

<script>
import {cacheSearchForAllByWord} from "@/api/api";

export default {
  data() {
    return {
      input: '',
      showResults: false,
      inputSearchDisable: false,
      searchResults: [],
      loading: false,
      isDark: true, // 保留
    };
  },
  mounted() {
    // 只读取 localStorage，不重置默认亮暗
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      this.isDark = savedTheme === 'dark';
      document.documentElement.classList.toggle('dark', this.isDark);
    }
  },
  methods: {
    getGlobalIndex(groupIndex, itemIndex) {
      const beforeGroupsCount = this.searchResults
          .slice(0, groupIndex)
          .reduce((sum, g) => sum + g.dataInfo.length, 0);
      return beforeGroupsCount + itemIndex + 1;
    },
    handleEnter() {
      window.umami.track('🔎热点检索:' + this.input)
      if (!this.input.trim()) return;

      this.inputSearchDisable = true;
      this.showResults = true;
      this.loading = true;
      this.searchResults = [];

      cacheSearchForAllByWord(this.input)
          .then(res => {
            this.searchResults = res?.data?.data || [];
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
    mobileResultStyle() {
      if (window.innerWidth < 640) {
        return {
          maxHeight: '60vh',
          overflowY: 'auto',
          textAlign: 'left' // 🔹 强制移动端内容左对齐
        };
      }
      return {};
    }
  }
};
</script>

<style scoped>
.setting-btn {
  background: transparent;
  border: none;
  cursor: pointer;
  transition: transform 0.2s ease;
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
