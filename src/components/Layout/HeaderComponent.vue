<template>
  <header class="sticky top-0 z-50 bg-light-bg/90 dark:bg-dark-bg/90 backdrop-blur-md transition-all duration-300">
    <div class="mx-auto" style="min-height: 5rem; ">
      <div class="relative flex items-center justify-between h-16">
        <!-- 左侧 Logo -->
        <div class="flex-shrink-0">
          <router-link to="/" @click="trackUmami('顶部左边LOGO')">

            <img src="../../assets/image/logo.png" alt="糖果梦热榜 - 聚合全网热门排行榜" class="logo w-12 h-12" >
          </router-link>
        </div>


        <!-- 右侧图标，桌面端显示 -->
        <div class="sm:flex space-x-6 items-center"> <!-- 关键修改点：加入 items-center 保证垂直居中 -->
          <!-- 设置 -->
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

import {
  LOCAL_STORAGE_KEYS,
  clearAllLocalStorage,
} from "@/utils/localStorageUtils";
// 默认暗色模式

export default {
  components: {},
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
    document.documentElement.classList.toggle('dark', this.isDark)
  },
  data() {
    return {
      menuOpen: false, // 控制移动端菜单的显示与隐藏
      isDark: true,
      activeName: '全部',
      categroies: this.$store.state.categroies
    };
  },
  computed: {},
  methods: {
    trackUmami(label) {
      if (window.umami) {
        window.umami.track(label);
      }
    },
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
