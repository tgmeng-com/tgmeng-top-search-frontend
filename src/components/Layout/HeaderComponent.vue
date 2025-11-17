<template>
  <header class="sticky top-0 z-50 bg-light-bg/90 dark:bg-dark-bg/90 backdrop-blur-md transition-all duration-300">
    <div class="mx-auto" style="min-height: 5rem; margin-top: 1.875rem;">
      <div class="relative flex items-center justify-between h-16">
        <!-- 左侧 Logo -->
        <div class="flex-shrink-0">
          <a href="https://tgmeng.com" data-umami-event="顶部左边LOGO" data-umami-event-name="顶部左边LOGO">
            <img src="../../assets/image/logo.png" alt="糖果梦热榜 - 聚合全网热门排行榜" class="logo w-12 h-12">
          </a>
        </div>

        <!-- 右侧图标，桌面端显示 -->
        <div class="hidden sm:flex space-x-6 items-center"> <!-- 关键修改点：加入 items-center 保证垂直居中 -->
          <!-- 交流群 -->
          <div style="width: 2.5rem;">
            <a href="https://wechat.htgmeng.com" target="_blank" data-umami-event="顶部右边交流群"
               data-umami-event-name="顶部右边交流群">
              <el-tooltip placement="bottom" effect="light">
                <template #content>
                  <div style="text-align: center"><span style="color: #212830">微信交流社区</span></div>
                </template>
                <div style="width: 2.0625rem">
                  <img src="../../assets/image/wechat-logo.png" alt="糖果梦热榜 - 社区交流中心">
                </div>
              </el-tooltip>
            </a>
          </div>
          <!-- 论坛 -->
          <div style="width: 2.5rem;">
            <a href="https://bbs.tgmeng.com" target="_blank" data-umami-event="顶部右边论坛"
               data-umami-event-name="顶部右边论坛">
              <el-tooltip placement="bottom" effect="light">
                <template #content>
                  <div style="text-align: center"><span style="color: #212830">论坛</span></div>
                </template>
                <div style="width: 1.875rem">
                  <img src="../../assets/image/bbs.png" alt="糖果梦热榜 - 论坛交流中心">
                </div>
              </el-tooltip>
            </a>
          </div>

          <!-- 明暗主题 -->
          <div>
            <ThemeToggle />
          </div>

          <!-- 设置 -->
          <div style="width: 2.5rem;">
            <el-tooltip placement="bottom" effect="light">
              <template #content>
                <div style="text-align: center"><span style="color: #212830">设置</span></div>
              </template>
              <button
                  @click="drawerClick"
                  class="setting-btn"
                  aria-label="设置"
                  data-umami-event="顶部右边设置"
                  data-umami-event-name="顶部右边设置"
              >
                <div style="width: 1.875rem">
                  <img src="../../assets/image/setting.png" alt="糖果梦热榜 - 设置中心">
                </div>
              </button>
            </el-tooltip>
          </div>
        </div>

        <!-- 移动端汉堡菜单 -->
        <div class="sm:hidden">
          <button @click="toggleMenu" class="text-gray-300 hover:text-white focus:outline-none">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- 移动端菜单（折叠） -->
    <div v-if="menuOpen" class="sm:hidden text-white">
      <!-- 交流群 -->
      <div style="width: 2.5rem;">
        <a href="https://wechat.htgmeng.com" target="_blank" data-umami-event="顶部右边交流群"
           data-umami-event-name="顶部右边交流群">
          <el-tooltip placement="bottom" effect="light">
            <template #content>
              <div style="text-align: center"><span style="color: #212830">微信交流社区</span></div>
            </template>
            <div style="width: 2.0625rem">
              <img src="../../assets/image/wechat-logo.png" alt="糖果梦热榜 - 社区交流中心">
            </div>
          </el-tooltip>
        </a>
      </div>
      <!-- 论坛 -->
      <div style="width: 2.5rem;">
        <a href="https://bbs.tgmeng.com" target="_blank" data-umami-event="顶部右边论坛"
           data-umami-event-name="顶部右边论坛">
          <el-tooltip placement="bottom" effect="light">
            <template #content>
              <div style="text-align: center"><span style="color: #212830">论坛</span></div>
            </template>
            <div style="width: 1.875rem">
              <img src="../../assets/image/bbs.png" alt="糖果梦热榜 - 论坛交流中心">
            </div>
          </el-tooltip>
        </a>
      </div>

      <!-- 明暗主题 -->
      <div>
        <ThemeToggle />
      </div>

      <!-- 设置 -->
      <div style="width: 2.5rem;">
        <el-tooltip placement="bottom" effect="light">
          <template #content>
            <div style="text-align: center"><span style="color: #212830">设置</span></div>
          </template>
          <button
              @click="drawerClick"
              class="setting-btn"
              aria-label="设置"
              data-umami-event="顶部右边设置"
              data-umami-event-name="顶部右边设置"
          >
            <div style="width: 1.875rem">
              <img src="../../assets/image/setting.png" alt="糖果梦热榜 - 设置中心">
            </div>
          </button>
        </el-tooltip>
      </div>
    </div>
  </header>

  <!-- Drawer 设置 -->
  <el-drawer v-model="drawer" :with-header="false" :direction="'ttb'">
    <div style="margin-bottom: 1.25rem">
      <el-button class="resetButton" type="danger" @click="cleanLocalStorage">重置设置</el-button>
    </div>

    <div>
      <el-tabs v-model="activeName" stretch=false>
        <el-tab-pane
            v-for="cat in categroies"
            :key="cat.name"
            :name="cat.name"
            :label="cat.name">
          <div class="flex flex-wrap">
            <div style="width: 15rem; display: flex; align-items: center; margin-bottom: 0.5rem;"
                 v-for="p in cat.subCategories"
                 :key="p.title"
            >
              <el-switch
                  v-model="p.isShow"
                  active-color="#13ce66"
                  inactive-color="#C0CCDA"
                  @change="changeCategroyStatus">
              </el-switch>
              <img :src="p.logo" style="width: 1.25rem; margin-left: 0.5rem; margin-right: 0.5rem;" :alt="p.title">
              <span>{{ p.title }}</span>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </el-drawer>
</template>

<script>

import {
  LOCAL_STORAGE_KEYS,
  setLocalStorage,
  clearAllLocalStorage,
} from "@/utils/localStorageUtils";
import ThemeToggle from "@/components/Theme/ThemeToggle.vue";
// 默认暗色模式

export default {
  components: {ThemeToggle},
  mounted() {
    // ✅✅✅✅✅✅ 顶部通知
    // this.notificationMessage()

    const savedTheme = localStorage.getItem('theme')
    // 优先使用用户保存的主题
    if (savedTheme) {
      this.isDark = savedTheme === 'dark'
    } else {
      // 没有保存时，默认暗色（无需检查系统偏好）
      this.isDark = true
    }
  },
  data() {
    return {
      menuOpen: false, // 控制移动端菜单的显示与隐藏
      isDark: true,
      drawer: false,
      activeName: '全部',
      categroies: this.$store.state.categroies
    };
  },
  computed: {},
  methods: {
    notificationMessage() {
      this.$notify({
        title: '支持自定义拖拽排序啦！',
        // message: '‼️目前已知问题：<br>1:优酷接口返回的是海外用户的排行榜<br>其余数据全都正常，请尽情享用',
        message: '拖拽卡片即可改变位置，数据保存在本地缓存中，任意时间进来网站都能保持您的设置<br/>如果想要恢复默认设置，点击右上角设置中的重置即可',
        duration: 10000,
        type: 'success',
        position: 'top-left',
        dangerouslyUseHTMLString: true
      });
    },
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
    },
    drawerClick() {
      this.drawer = true
    },
    changeCategroyStatus() {
      const clonedForStorage = JSON.parse(JSON.stringify(this.categroies));
      //只保存title和isShow的数据，其余数据全部设置为null，减少缓存
      clonedForStorage.forEach(categroy => {
        categroy.subCategories.forEach(subCategroy => {
          subCategroy.data = null
          subCategroy.api = null
          subCategroy.logo = null
          subCategroy.updateTime = ''
          subCategroy.loading = true
        })
      });
      setLocalStorage(LOCAL_STORAGE_KEYS.CATEGORIES, clonedForStorage);
    },
    cleanLocalStorage() {
      this.$confirm('此操作将清除所有历史个人设置，包括排序、收藏、隐藏/展示、自定义样式等等所有个人设置', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        clearAllLocalStorage(LOCAL_STORAGE_KEYS.CATEGORIES);
        this.$message({
          type: 'success',
          message: '已重置，请刷新页面获取全部数据!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });
      });
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

.icon {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.sun-icon {
  opacity: 0;
  transform: scale(0.8);
}

.moon-icon {
  opacity: 1;
  transform: scale(1.1);
}

.dark .sun-icon {
  opacity: 1;
  transform: scale(1.1);
}

.dark .moon-icon {
  opacity: 0;
  transform: scale(0.8);
}

.theme-toggle-btn:hover .icon {
  transform: scale(1.1);
}

.theme-toggle-btn:active .icon {
  transform: scale(0.95);
}

.resetButton {
  background-color: #f56c6c !important;
}

:deep(.el-button+.el-button) {
  background-color: #409eff !important;
}

:deep(.el-tabs) {
  background-color: #c9c9c9;
  padding: 0.625rem;
  border-radius: 1.875rem;
}

:deep(.el-tabs__item) {
  font-weight: 700 !important;
  color: #004c4d !important;
  font-size: 1.1rem !important;
}
</style>
